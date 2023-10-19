export type WithOptionalProperty<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
