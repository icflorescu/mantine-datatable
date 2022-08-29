export type DelayOptions = { min: number; max: number };

export default function delay({ min, max }: DelayOptions) {
  return new Promise((resolve) => {
    setTimeout(resolve, min + Math.round(Math.random() * (max - min)));
  });
}
