import { HashProvider } from '../providers/hash.provider';
import { BcryptProvider } from '../providers/bcrypt.provider';

export class PasswordService {
  private readonly hashProvider: HashProvider;

  constructor(hashProvider: HashProvider = new BcryptProvider()) {
    this.hashProvider = hashProvider;
  }

  /**
   * Hashes a plaintext password string.
   */
  public async hashPassword(password: string): Promise<string> {
    return this.hashProvider.hash(password);
  }

  /**
   * Compares a plaintext password with a database hash.
   */
  public async comparePassword(password: string, hashed: string): Promise<boolean> {
    return this.hashProvider.compare(password, hashed);
  }
}
