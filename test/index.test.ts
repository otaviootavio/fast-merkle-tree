import { describe, expect, it } from 'vitest'
import { KeyValueStorage, MerkleTree } from '../src'

describe('keyValueStorage', () => {
  it('should set and get values using Uint8Array keys', () => {
    const storage = new KeyValueStorage()

    const key = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
    const value = new Uint8Array([255, 254, 253, 252])

    // Set the value with Uint8Array key
    storage.set(key, value)

    // Get the value using the same Uint8Array key
    const retrievedValue = storage.get(key)
    expect(retrievedValue).toEqual(value) // Uint8Array values are compared element-wise
  })

  it('should return undefined for non-existing Uint8Array keys', () => {
    const storage = new KeyValueStorage()
    const key = new Uint8Array([9, 10, 11, 12])

    // Get value for a non-existing Uint8Array key
    const retrievedValue = storage.get(key)
    expect(retrievedValue).toBeUndefined()
  })

  it('should check if a Uint8Array key exists', () => {
    const storage = new KeyValueStorage()

    const key = new Uint8Array([1, 2, 3, 4])
    const value = new Uint8Array([5, 6, 7, 8])

    // Initially, the Uint8Array key should not exist
    expect(storage.has(key)).toBe(false)

    // Set the value with Uint8Array key
    storage.set(key, value)

    // Now, the Uint8Array key should exist
    expect(storage.has(key)).toBe(true)
  })

  it('should delete a Uint8Array key', () => {
    const storage = new KeyValueStorage()

    const key = new Uint8Array([1, 2, 3, 4])
    const value = new Uint8Array([9, 10, 11, 12])

    // Set the value with Uint8Array key
    storage.set(key, value)
    expect(storage.has(key)).toBe(true)

    // Delete the Uint8Array key
    storage.delete(key)

    // Now, the Uint8Array key should no longer exist
    expect(storage.has(key)).toBe(false)

    // Getting the value should return undefined
    expect(storage.get(key)).toBeUndefined()
  })

  it('should clear the storage of all Uint8Array keys', () => {
    const storage = new KeyValueStorage()

    const key1 = new Uint8Array([1, 2, 3, 4])
    const value1 = new Uint8Array([5, 6, 7, 8])

    const key2 = new Uint8Array([9, 10, 11, 12])
    const value2 = new Uint8Array([13, 14, 15, 16])

    // Set multiple Uint8Array values
    storage.set(key1, value1)
    storage.set(key2, value2)

    // Verify both Uint8Array keys exist
    expect(storage.has(key1)).toBe(true)
    expect(storage.has(key2)).toBe(true)

    // Clear the storage
    storage.clear()

    // Verify storage is empty
    expect(storage.has(key1)).toBe(false)
    expect(storage.has(key2)).toBe(false)
    expect(storage.get(key1)).toBeUndefined()
    expect(storage.get(key2)).toBeUndefined()
  })
})

describe('merkleTree', () => {
  it('should create a MerkleTree with a KeyValueStorage', () => {
    const storage = new KeyValueStorage()
    const tree = new MerkleTree(storage)

    expect(tree).toBeInstanceOf(MerkleTree)
  })
})
