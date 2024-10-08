export const one = 1
export const two = 2

export class KeyValueStorage {
  private storage: Map<string, Uint8Array>

  constructor() {
    this.storage = new Map()
  }

  // Helper method to generate a unique string key from Uint8Array
  private toKeyString(key: Uint8Array): string {
    // Using a more direct way to stringify Uint8Array as keys
    return key.toString()
  }

  // Set a key-value pair where both are Uint8Array
  set(key: Uint8Array, value: Uint8Array): void {
    const keyString = this.toKeyString(key)
    this.storage.set(keyString, value)
  }

  // Get the value associated with a Uint8Array key
  get(key: Uint8Array): Uint8Array | undefined {
    const keyString = this.toKeyString(key)
    return this.storage.get(keyString)
  }

  // Check if a key exists
  has(key: Uint8Array): boolean {
    const keyString = this.toKeyString(key)
    return this.storage.has(keyString)
  }

  // Delete a key-value pair
  delete(key: Uint8Array): boolean {
    const keyString = this.toKeyString(key)
    return this.storage.delete(keyString)
  }

  // Clear the entire storage
  clear(): void {
    this.storage.clear()
  }
}

export class MerkleTree {
  private storage: KeyValueStorage

  constructor(storage: KeyValueStorage, data: Uint8Array[]) {
    // receive the data as uint8array
    this.storage = storage

    // if the data lengh is not a power of 2, fill the data with zeroes
    if (data.length !== 2 ** Math.ceil(Math.log2(data.length))) {
      const zeroes: Uint8Array[] = generateUint8ArraysWithZeroes(data.length)
      data.push(...zeroes)
    }

    // now that the data is full of zeroes, we can start to generate the leafs
    // the leafs will be store at the storage, with keys like 1xxxx
    // hence the first leaf is 1000, second 1001, thrid 1010, and so on (we are using binary numbers)
    // the number the bytes are defined by the number of leaves
    // hence, when received a data with 10 items, it will be
    // filled with zeroes untill 16, then to represent this 16 leafs we will
    // use the keys 10000, 10001, 10010, 10011, 10100, 10101, 10110, 10111, 11000, 11001, 11010, 11011, 11100, 11101, 11110, 11111
    // whith means that the number of bytes is 5 bytes to represent the full tree
    // and the bytes for 10000 to 11111 will represent the leafs
  }
}

export function generateUint8ArraysWithZeroes(n: number): Uint8Array[] {
  const arrays = []
  for (let i = 0; i < n; i++) {
    arrays.push(new Uint8Array())
  }
  return arrays
}
