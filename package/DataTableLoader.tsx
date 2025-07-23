import { Center, Loader, type MantineColor, type MantineLoader, type MantineSize } from '@mantine/core';
import clsx from 'clsx';

type DataTableLoaderProps = {
  fetching: boolean | undefined;
  customContent: React.ReactNode | undefined;
  backgroundBlur: number | undefined;
  size: MantineSize | (string & NonNullable<unknown>) | number | undefined;
  type: MantineLoader | undefined;
  color: MantineColor | undefined;
};

export function DataTableLoader({ fetching, customContent, backgroundBlur, size, type, color }: DataTableLoaderProps) {
  return (
    <Center
      className={clsx('mantine-datatable-loader', { 'mantine-datatable-loader-fetching': fetching })}
      style={[{ backdropFilter: backgroundBlur ? `blur(${backgroundBlur}px)` : undefined }]}
    >
      {fetching && (customContent || <Loader size={size} type={type} color={color} />)}
    </Center>
  );
}
