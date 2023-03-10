import { Box, createStyles, Text } from '@mantine/core';
import { Prism, PrismProps } from '@mantine/prism';

type ColdeBlockProps = Pick<PrismProps, 'language' | 'noCopy'> & { fileName?: string; content: string };

const useStyles = createStyles((theme) => ({
  text: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]}`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.fn.rgba(theme.colors.gray[0], 0.65),
    borderTopLeftRadius: theme.radius.sm,
    borderTopRightRadius: theme.radius.sm,
    borderBottom: 0,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    lineHeight: '34px',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 500,
    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      fontSize: 14,
    },
  },
}));

export default function CodeBlock({ content, fileName, ...otherProps }: ColdeBlockProps) {
  const { classes } = useStyles();
  return (
    <Box my="xl">
      {fileName && <Text className={classes.text}>{fileName}</Text>}
      <Prism {...otherProps}>{content}</Prism>
    </Box>
  );
}
