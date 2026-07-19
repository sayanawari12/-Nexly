export interface HashProvider {
  /**
   * Hashes a plaintext payload (e.g. password) securely.
   * 
   * @param payload Plaintext string
   */
  hash(payload: string): Promise<string>;

  /**
   * Compares a plaintext payload with a hashed string.
   * 
   * @param payload Plaintext string
   * @param hashed Cryptographical hash representation
   */
  compare(payload: string, hashed: string): Promise<boolean>;
}
