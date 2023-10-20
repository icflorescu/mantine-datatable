import { Center, Loader, rgba, type DefaultMantineColor, type MantineLoader, type MantineSize } from '@mantine/core';
import clsx from 'clsx';

type DataTableLoaderProps = {
  pt: number;
  pb: number;
  fetching: boolean | undefined;
  customContent: React.ReactNode | undefined;
  backgroundBlur: number | undefined;
  size: MantineSize | (string & NonNullable<unknown>) | number | undefined;
  type: MantineLoader | undefined;
  color: DefaultMantineColor | undefined;
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
      style={[
        { backdropFilter: backgroundBlur ? `blur(${backgroundBlur}px)` : undefined },
        (theme) => ({
          '--mantine-datatable-loader-backdrop-background-light': rgba(theme.white, 0.75),
          '--mantine-datatable-loader-backdrop-background-dark': rgba(theme.colors.dark[8], 0.75),
        }),
      ]}
    >
      {fetching && (customContent || <Loader size={size} type={type} color={color} />)}
    </Center>
  );
}
