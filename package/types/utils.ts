export type WithOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type WithRequired<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
