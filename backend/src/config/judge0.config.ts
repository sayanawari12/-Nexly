export interface Judge0Config {
  apiUrl: string;
  callbackUrl: string;
}

export const judge0Config: Judge0Config = {
  apiUrl: process.env.JUDGE0_API_URL || '',
  callbackUrl: process.env.JUDGE0_CALLBACK_URL || '',
};
