import { MantineNumberSize, Title } from '@mantine/core';
import kebabCase from 'lodash/kebabCase';

export default function PageSubtitle({
  value,
  mt = 'xl',
  mb = 'xl',
}: {
  value: string;
  mt?: MantineNumberSize;
  mb?: MantineNumberSize;
}) {
  return (
    <Title
      mt={mt}
      mb={mb}
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[8],
        fontSize: '1.25rem',
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          fontSize: '1.375rem',
        },
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          fontSize: '1.5rem',
        },
      })}
      order={3}
    >
      <a id={`${kebabCase(value)}`}>{value}</a>
    </Title>
  );
}
