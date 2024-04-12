import {
  Button,
  Group,
  MantineColor,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  rem,
  type MantineSize,
} from '@mantine/core';
import clsx from 'clsx';
import { getPaginationCssVariables } from './cssVariables';
import { IconSelector } from './icons/IconSelector';

type DataTablePageSizeSelectorComponentProps = {
  size: MantineSize;
  label: string;
  values: number[];
  value: number;
  activeTextColor: MantineColor | { dark: MantineColor; light: MantineColor } | undefined;
  activeBackgroundColor: MantineColor | { dark: MantineColor; light: MantineColor } | undefined;
  onChange: (value: number) => void;
};

const HEIGHT: Record<MantineSize, string> = { xs: rem(22), sm: rem(26), md: rem(32), lg: rem(38), xl: rem(44) };

export function DataTablePageSizeSelector({
  size,
  label,
  values,
  value,
  activeTextColor,
  activeBackgroundColor,
  onChange,
}: DataTablePageSizeSelectorComponentProps) {
  return (
    <Group gap="xs">
      <Text component="div" size={size}>
        {label}
      </Text>
      <Menu withinPortal withArrow classNames={{ arrow: 'mantine-datatable-page-size-selector-menu-arrow' }}>
        <MenuTarget>
          <Button
            size={size}
            variant="default"
            classNames={{ section: 'mantine-datatable-page-size-selector-button-icon' }}
            rightSection={<IconSelector />}
            style={[
              { fontWeight: 'normal' },
              (theme) => ({
                height: HEIGHT[size],
                paddingLeft: theme.spacing[size],
                paddingRight: theme.spacing[size],
              }),
            ]}
          >
            {value}
          </Button>
        </MenuTarget>
        <MenuDropdown>
          {values.map((v) => {
            const isCurrent = v === value;
            return (
              <MenuItem
                key={v}
                className={clsx({ 'mantine-datatable-page-size-selector-active': isCurrent })}
                style={[
                  { height: HEIGHT[size] },
                  isCurrent && (activeTextColor || activeBackgroundColor)
                    ? (theme) =>
                        getPaginationCssVariables({
                          theme,
                          paginationActiveTextColor: activeTextColor,
                          paginationActiveBackgroundColor: activeBackgroundColor,
                        })
                    : undefined,
                ]}
                disabled={isCurrent}
                onClick={() => onChange(v)}
              >
                <Text component="div" size={size}>
                  {v}
                </Text>
              </MenuItem>
            );
          })}
        </MenuDropdown>
      </Menu>
    </Group>
  );
}
