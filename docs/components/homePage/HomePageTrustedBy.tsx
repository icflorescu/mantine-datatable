import { Anchor, Text, createStyles } from '@mantine/core';
import { IconArrowDown, IconDiscountCheck } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: '2em',
    display: 'flex',
    gap: '.5em',
    alignItems: 'flex-start',
  },
  checkIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.green[6],
    marginTop: 1,
  },
  break: {
    [`@media (min-width: 370px)`]: {
      display: 'none',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[5]}`,
    },
  },
  linkIcon: {
    verticalAlign: -2,
  },
}));

function handleLinkClick() {
  window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
}

export default function HomePageTrustedBy() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <IconDiscountCheck className={classes.checkIcon} size={18} />
      <Text color="dimmed" size="sm">
        trusted by <br className={classes.break} />
        <Anchor className={classes.link} onClick={handleLinkClick}>
          awesome companies and developers <IconArrowDown className={classes.linkIcon} size={14} />
        </Anchor>
      </Text>
    </div>
  );
}
