import { Title, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: '.75em',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    '@media (min-width: 320px)': {
      fontSize: 28,
    },
    '@media (min-width: 360px)': {
      fontSize: 30,
    },
    '@media (min-width: 400px)': {
      fontSize: 34,
    },
    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      marginTop: '.5em',
      marginBottom: '1em',
      lineHeight: 1.1,
      fontSize: 50,
    },
    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      fontSize: 60,
    },
    [`@media (min-width: ${theme.breakpoints.md})`]: {
      marginTop: '.66em',
    },
  },
  gradientText: {
    background: theme.fn.gradient({ from: theme.colors.blue[6], to: theme.colors.cyan[6] }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

export default function HomePageTitle() {
  const { classes } = useStyles();
  return (
    <Title className={classes.root} order={2}>
      A table component
      <br />
      for your Mantine
      <br />
      <span className={classes.gradientText}>data-rich applications.</span>
    </Title>
  );
}
