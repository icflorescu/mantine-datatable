import {
  Center,
  Loader,
  type DefaultMantineColor,
  type MantineTheme,
  MantineSize,
} from '@mantine/core';
import type { ReactNode } from 'react';
import classes from './styles/DataTableLoader.css';
import cx from 'clsx';


type DataTableLoaderProps = {
  pt: number;
  pb: number;
  fetching: boolean | undefined;
  customContent: ReactNode | undefined;
  backgroundBlur: number | undefined;
  size: MantineSize | undefined;
  variant: MantineTheme['loader'] | undefined;
  color: DefaultMantineColor | undefined;
};

export default function DataTableLoader({
  pt,
  pb,
  fetching,
  customContent,
  backgroundBlur,
  size,
  variant,
  color,
}: DataTableLoaderProps) {
  return (
    <Center
      pt={pt}
      pb={pb}
      className={cx(classes.root, { [classes.fetching]: fetching })}
      style={backgroundBlur ? { backdropFilter: `blur(${backgroundBlur}px)` } : undefined}
    >
      {fetching && (customContent || <Loader size={size} type={variant} color={color} />)}
    </Center>
  );
}
