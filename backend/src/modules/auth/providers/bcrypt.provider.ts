import bcrypt from 'bcrypt';
import { HashProvider } from './hash.provider';

export class BcryptProvider implements HashProvider {
  private readonly saltRounds = 10;

  public async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.saltRounds);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
