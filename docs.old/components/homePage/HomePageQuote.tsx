import { Stack, Text, createStyles } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';

const useStyles = createStyles((theme) => ({
  root: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: theme.spacing.xl,
  },
  quote: {
    fontStyle: 'italic',
    margin: 0,
  },
  divider: {
    marginLeft: -2,
    height: 1,
    width: 50,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
  },
  author: {
    fontSize: '0.875em',
  },
}));

export default function HomePageQuote() {
  const { classes } = useStyles();
  // todo: make this dynamic when we have more quotes
  return (
    <Stack spacing="sm" my="xl" className={classes.root}>
      <Text component="blockquote" className={classes.quote}>
        Mantine DataTable is a great component that’s core to our web app – it saves us a ton of time and comes with
        great styling and features out of the box
      </Text>
      <div className={classes.divider} />
      <Text className={classes.author}>
        Emil Sorensen, <ExternalLink to="https://kapa.ai">kapa.ai</ExternalLink>
      </Text>
    </Stack>
  );
}
