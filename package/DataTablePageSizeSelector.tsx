import { Button, Group, Menu, Text, type MantineColor, type MantineSize, useMantineTheme } from '@mantine/core';

type DataTablePageSizeSelectorComponentProps = {
  size: MantineSize;
  label: string;
  values: number[];
  value: number;
  onChange: (value: number) => void;
  color?: MantineColor;
};

const HEIGHT: Record<MantineSize, number> = { xs: 22, sm: 26, md: 32, lg: 38, xl: 44 };

export default function DataTablePageSizeSelector({
  size,
  label,
  values,
  value,
  onChange,
  color,
}: DataTablePageSizeSelectorComponentProps) {
  const theme = useMantineTheme();
  return (
    <Group gap="xs">
      <Text size={size}>{label}</Text>
      <Menu withinPortal withArrow>
        <Menu.Target>
          <Button
            size={size}
            variant="default"
            style={[
              { fontWeight: 'normal' },
              {
                height: HEIGHT[size],
                paddingLeft: theme.spacing[size],
                paddingRight: theme.spacing[size],
              },
            ]}
          >
            {value}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {values.map((v) => {
            const isCurrent = v === value;
            return (
              <Menu.Item
                key={v}
                style={[
                  { height: HEIGHT[size] },
                  {
                    color: isCurrent ? theme.white : undefined,
                    background: isCurrent ? theme.colors[color || theme.primaryColor][6] : undefined,
                  },
                ]}
                disabled={isCurrent}
                onClick={() => onChange(v)}
              >
                <Text size={size}>{v}</Text>
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
