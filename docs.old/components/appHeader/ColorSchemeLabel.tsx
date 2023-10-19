import { Box, Center } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function ColorSchemeLabel({ value }: { value: 'Dark' | 'Light' }) {
  const Icon = value === 'Dark' ? IconMoon : IconSun;
  return (
    <Center>
      <Icon size={14} />
      <Box ml={10} mb={-2}>
        {value}
      </Box>
    </Center>
  );
}
