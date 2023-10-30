import { Center, Loader, type MantineColor, type MantineLoader, type MantineSize } from '@mantine/core';
import clsx from 'clsx';

type DataTableLoaderProps = {
  pt: number;
  pb: number;
  fetching: boolean | undefined;
  customContent: React.ReactNode | undefined;
  backgroundBlur: number | undefined;
  size: MantineSize | (string & NonNullable<unknown>) | number | undefined;
  type: MantineLoader | undefined;
  color: MantineColor | undefined;
};

export function DataTableLoader({
  pt,
  pb,
  fetching,
  customContent,
  backgroundBlur,
  size,
  type,
  color,
}: DataTableLoaderProps) {
  return (
    <Center
      pt={pt}
      pb={pb}
      className={clsx('mantine-datatable-loader', { 'mantine-datatable-loader-fetching': fetching })}
      style={[{ backdropFilter: backgroundBlur ? `blur(${backgroundBlur}px)` : undefined }]}
    >
      {fetching && (customContent || <Loader size={size} type={type} color={color} />)}
    </Center>
  );
}
