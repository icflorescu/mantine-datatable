import {
  Button,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  type MantineColor,
  type MantineSize,
} from '@mantine/core';

type DataTablePageSizeSelectorComponentProps = {
  size: MantineSize;
  label: string;
  values: number[];
  value: number;
  onChange: (value: number) => void;
  color: MantineColor | undefined;
};

const HEIGHT: Record<MantineSize, number> = { xs: 22, sm: 26, md: 32, lg: 38, xl: 44 };

export function DataTablePageSizeSelector({
  size,
  label,
  values,
  value,
  onChange,
  color,
}: DataTablePageSizeSelectorComponentProps) {
  return (
    <Group gap="xs">
      <Text size={size}>{label}</Text>
      <Menu withinPortal withArrow>
        <MenuTarget>
          <Button
            size={size}
            variant="default"
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
                style={[
                  { height: HEIGHT[size] },
                  (theme) => ({
                    color: isCurrent ? theme.white : undefined,
                    background: isCurrent ? theme.colors[color || theme.primaryColor][6] : undefined,
                  }),
                ]}
                disabled={isCurrent}
                onClick={() => onChange(v)}
              >
                <Text size={size}>{v}</Text>
              </MenuItem>
            );
          })}
        </MenuDropdown>
      </Menu>
    </Group>
  );
}
