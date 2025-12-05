export {}

declare global {
  interface ReadonlyArray<T> {
    includes(
      searchElement: T extends string ? string : T,
      fromIndex?: number
    ): boolean
  }
}
