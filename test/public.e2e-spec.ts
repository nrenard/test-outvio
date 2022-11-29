import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import variables from 'src/variables';
import { cache } from 'src/utils/cache';

import { AppModule } from '../src/app.module';

describe('Public', () => {
  let app: INestApplication;
  const cacheKey = 'rate-limit:::ffff:127.0.0.1-GET-/public';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/public (GET)', () => {
    const route = '/public';

    it('should request with success', async () => {
      const getMock = jest.fn().mockReturnValue(0);
      const setMock = jest.fn();

      jest.spyOn(cache, 'get').mockImplementation(getMock);
      jest.spyOn(cache, 'set').mockImplementation(setMock);

      const { status, body } = await request(app.getHttpServer())
        .get(route)
        .send();

      expect(status).toBe(HttpStatus.OK);
      expect(body).toMatchObject({ message: 'Public' });

      expect(getMock).toHaveBeenCalledWith(cacheKey);
      expect(setMock).toHaveBeenCalledWith({ key: cacheKey, value: 1 });
    });

    it('should request with error "limit rached"', async () => {
      const getMock = jest.fn().mockReturnValue(200);
      const takeDuration = jest.fn().mockReturnValue({ hours: 1 });

      jest.spyOn(cache, 'get').mockImplementation(getMock);
      jest.spyOn(cache, 'takeDuration').mockImplementation(takeDuration);

      const { status, body } = await request(app.getHttpServer())
        .get(route)
        .set('Authorization', `Bearer ${variables.STATIC_JWT}`);

      expect(status).toBe(HttpStatus.TOO_MANY_REQUESTS);
      expect(body).toMatchObject({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message:
          'You have reached the request limit, your requests will be unlocked in 1h',
      });

      expect(getMock).toHaveBeenCalledWith(cacheKey);
      expect(takeDuration).toHaveBeenCalledWith(cacheKey);
    });

    it('should request with error "limit rached" and after success', async () => {
      const getLimitRachedMock = jest.fn().mockReturnValueOnce(200);
      const takeDuration = jest.fn().mockReturnValue({ hours: 1 });
      const setMock = jest.fn();

      jest.spyOn(cache, 'get').mockImplementation(getLimitRachedMock);
      jest.spyOn(cache, 'takeDuration').mockImplementation(takeDuration);

      const { status, body } = await request(app.getHttpServer()).get(route);

      expect(status).toBe(HttpStatus.TOO_MANY_REQUESTS);
      expect(body).toMatchObject({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message:
          'You have reached the request limit, your requests will be unlocked in 1h',
      });

      const getMock = jest.fn().mockReturnValueOnce(2);

      jest.spyOn(cache, 'get').mockImplementation(getMock);
      jest.spyOn(cache, 'set').mockImplementation(setMock);

      const successResponse = await request(app.getHttpServer()).get(route);

      expect(successResponse.status).toBe(HttpStatus.OK);
      expect(successResponse.body).toMatchObject({ message: 'Public' });
      expect(setMock).toHaveBeenCalledWith({ key: cacheKey, value: 3 });
    });
  });
});
