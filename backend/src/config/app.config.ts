import { config } from './index';

export interface AppConfig {
  port: number;
  env: 'development' | 'production' | 'test';
}

export const appConfig: AppConfig = {
  port: config.app.port,
  env: config.app.env as 'development' | 'production' | 'test',
};
