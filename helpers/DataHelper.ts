export class DataHelper {
  static randomEmail(): string {
    return `testuser_${Date.now()}@mailtest.com`;
  }

  static randomName(): string {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    return names[Math.floor(Math.random() * names.length)] ?? 'Alice';
  }

  static randomString(length = 8): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }
}
