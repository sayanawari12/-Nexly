import { config } from './index';

export interface AuthConfig {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtAccessExpiry: string;
  jwtRefreshExpiry: string;
}

export const authConfig: AuthConfig = {
  jwtAccessSecret: config.auth.jwtAccessSecret,
  jwtRefreshSecret: config.auth.jwtRefreshSecret,
  jwtAccessExpiry: config.auth.jwtAccessExpiry,
  jwtRefreshExpiry: config.auth.jwtRefreshExpiry,
};
