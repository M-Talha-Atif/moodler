// services/storageService.ts - IN-MEMORY STORAGE
class InMemoryStorage {
  private storage: { [key: string]: string } = {};

  async setItem(key: string, value: string): Promise<void> {
    this.storage[key] = value;
    console.log('📦 Stored:', key);
  }

  async getItem(key: string): Promise<string | null> {
    return this.storage[key] || null;
  }

  async removeItem(key: string): Promise<void> {
    delete this.storage[key];
  }

  async clear(): Promise<void> {
    this.storage = {};
  }
}

export const storageService = new InMemoryStorage();