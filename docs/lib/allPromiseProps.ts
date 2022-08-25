export default function allPromiseProps<T>(object: { [K in keyof T]: Promise<T[K]> | T[K] }): Promise<T> {
  return Promise.all(Object.values(object)).then((results) =>
    Object.keys(object).reduce((fulfilledObject, key, index) => {
      fulfilledObject[key as keyof T] = results[index] as T[keyof T];
      return fulfilledObject;
    }, {} as T)
  );
}
