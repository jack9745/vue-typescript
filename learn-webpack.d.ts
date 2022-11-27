declare module 'learn-webpack' {
  // 这个包有两个函数，导出这个包的两个函数的声明
  export function numToWord(num: number): string

  export function wordToNum(word: string): number

  export default function add(a: number, b: number): number

  // 声明了两个泛型，
  export function filterListByNameField<V, T extends { name: V }>(
    name: V,
    list: T[]
  ): T[]
}
