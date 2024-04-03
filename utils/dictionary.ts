/**
 * dictionary.ts
 * 字典中保存鑑值對的數據
 * 1. 字典中的鍵是唯一的
 * 2. 字典中的值是唯一的
 * 3. 字典中的值可以是任何數據類型
 * 4. 所有的鑑類型相同,所有的值類型相同
 * 字典中對鑑值對的操作
 *  1. 添加鑑值對
 *  2. 刪除鑑值對
 *  3. 查找鑑值對
 *  4. 修改鑑值對
 *  5. 判斷鑑值對是否存在
 *	6. 重新設置鑑對應的值，如果鑑不存在，則添加鑑值對
 */

export class Dictionary<K, V> {
  private items: Record<string, V> = {};
  private count: number = 0;
  /**
   * 添加鑑值對
   * @param key 鑑
   * @param value 值
   */
  set(key: K, value: V): void {
    this.items[key as string] = value;
    this.count++;
  }
  /**
   * 刪除鑑值對
   * @param key 鑑
   */
  remove(key: K): void {
    if (this.has(key)) {
      delete this.items[key as string];
      this.count--;
    }
  }
  /**
   * 查找鑑值對
   * @param key 鑑
   * @returns 值
   */
  get(key: K): V | undefined {
    return this.items[key as string];
  }
  /**
   * 修改鑑值對
   * @param key 鑑
   * @param value 值
   */
  update(key: K, value: V): void {
    if (this.has(key)) {
      this.items[key as string] = value;
    }
  }
  /**
   * 判斷鑑值對是否存在
   * @param key 鑑
   * @returns 是否存在
   */
  has(key: K): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, key as string);
  }
  /**
   * 獲取所有的鑑
   * @returns 鑑的數組
   */
  keys(): K[] {
    return Object.keys(this.items) as K[];
  }
  /**
   * 獲取所有的值
   * @returns 值的數組
   */
  values(): V[] {
    return Object.values(this.items);
  }
  /**
   * 獲取所有的鑑值對
   * @returns 鑑值對的數組
   */
  entries(): [K, V][] {
    return Object.entries(this.items) as [K, V][];
  }
  /**
   * 獲取字典的大小
   * @returns 字典的大小
   */
  size(): number {
    return this.count;
  }
  /**
   * 清空字典
   */
  clear(): void {
    this.items = {};
    this.count = 0;
  }
  delete(key: K): void {
    this.remove(key);
  }
  /**
   * 將字典轉換為字符串
   * @returns 字符串
   */
  toString(): string {
    return JSON.stringify(this.items);
  }
}

const dictionary = new Dictionary<string, number>();
dictionary.set("a", 1);
dictionary.set("b", 2);
dictionary.set("c", 3);
dictionary.has("a"); // true
dictionary.size(); // 3
dictionary.get("a"); // 1
dictionary.remove("a");
dictionary.size(); // 2
