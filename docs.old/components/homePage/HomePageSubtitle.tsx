import { Anchor, Text, createStyles } from '@mantine/core';
import { IconArrowDown, IconDiscountCheck, IconExclamationCircle } from '@tabler/icons-react';
import InternalLink from '../InternalLink';

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: '2em',
  },
  line: {
    display: 'flex',
    gap: '.5em',
    alignItems: 'flex-start',
  },
  lineIcon: {
    marginTop: 1,
  },
  checkIcon: {
    color: theme.colors.green[6],
  },
  warningIcon: {
    color: theme.colors.red[6],
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

export default function HomePageSubtitle() {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.line}>
        <IconDiscountCheck className={cx(classes.lineIcon, classes.checkIcon)} size={18} />
        <Text color="dimmed" size="sm">
          trusted by <br className={classes.break} />
          <Anchor className={classes.link} onClick={handleLinkClick}>
            awesome companies and developers <IconArrowDown className={classes.linkIcon} size={14} />
          </Anchor>
        </Text>
      </div>
      <div className={classes.line}>
        <IconExclamationCircle className={cx(classes.lineIcon, classes.warningIcon)} size={18} />
        <Text color="dimmed" size="sm">
          supports <strong>Mantine V6</strong>; support for <strong>Mantine V7</strong> is{' '}
          <InternalLink to="/mantine-v7-support">under development</InternalLink> ⏳
        </Text>
      </div>
    </div>
  );
}
