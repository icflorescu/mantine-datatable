import { Box, Text, UnstyledButton, type MantineColor } from '@mantine/core';
import type { ReactNode } from 'react';
import classes from './styles/DataTableRowMenuItem.css';
import cx from 'clsx';

type DataTableRowMenuItemProps = {
  icon?: ReactNode;
  title: ReactNode;
  color?: MantineColor;
  disabled?: boolean;
  onClick: () => void;
};

export default function DataTableRowMenuItem({ icon, title, color, disabled, onClick }: DataTableRowMenuItemProps) {
  return (
    <UnstyledButton className={cx(classes.root)} style={{color: color}} disabled={disabled} onClick={onClick}>
      {icon && <Box className={cx(classes.icon)}>{icon}</Box>}
      <Text className={cx(classes.title)} size="sm">
        {title}
      </Text>
    </UnstyledButton>
  );
}
