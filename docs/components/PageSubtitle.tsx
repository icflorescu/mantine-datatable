import { Box, Title } from '@mantine/core';
import { kebabCase } from 'lodash';

export default function PageSubtitle({ value }: { value: string }) {
  return (
    <Title
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[8],
        fontSize: '1.15rem',
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          fontSize: '1.2rem',
        },
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
          fontSize: '1.25rem',
        },
      })}
      order={3}
    >
      <Box component="a" sx={{ display: 'none' }} id={`#${kebabCase(value)}`} />
      {value}
    </Title>
  );
}
