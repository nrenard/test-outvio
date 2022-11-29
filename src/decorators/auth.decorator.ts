import { SetMetadata } from '@nestjs/common';

export const AUTH_KEY = 'auth';

export const AuthDecorator = (auth = true) => SetMetadata(AUTH_KEY, auth);
