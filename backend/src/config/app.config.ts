export interface AppConfig {
  port: number;
  env: 'development' | 'production' | 'test';
}

export const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 5000,
  env: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
};
