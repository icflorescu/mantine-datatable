import { useResizeObserver } from '@mantine/hooks';

export function useElementOuterSize<T extends HTMLElement>() {
  const [ref] = useResizeObserver<T>();
  const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };
  return { ref, width, height };
}
