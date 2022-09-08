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
      <a id={`${kebabCase(value)}`}>{value}</a>
    </Title>
  );
}
