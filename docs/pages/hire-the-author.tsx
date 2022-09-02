import { Container, createStyles } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { AUTHOR_LINK } from '~/config';

const PATH = 'hire-the-author';

const useStyles = createStyles((theme) => ({
  intro: {
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      display: 'flex',
      gap: theme.spacing.xl,
      alignItems: 'center',
    },
  },
  picture: {
    maxWidth: 160,
    display: 'block',
    margin: '0 auto',
    borderRadius: '50%',
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      borderRadius: theme.radius.md,
    },
  },
}));

export default function Page() {
  const { classes } = useStyles();
  return (
    <Container>
      <PageTitle of={PATH} />
      <div className={classes.intro}>
        <ExternalLink to={AUTHOR_LINK}>
          <img className={classes.picture} src="https://avatars.githubusercontent.com/u/581999" alt="@icflorescu" />
        </ExternalLink>
        <div>
          <PageText>Hi there!</PageText>
          <PageText>
            I’m Ionut-Cristian Florescu, a full-stack developer with more than 20 years of experience from Bucharest,
            Romania, EU.
            <br />
            Mantine DataTable is one of my dearest open-source projects.
          </PageText>
        </div>
      </div>
      <PageText>
        You can learn more about what I do by visiting my profiles on{' '}
        <ExternalLink to={AUTHOR_LINK}>GitHub</ExternalLink> or{' '}
        <ExternalLink to="https://www.linkedin.com/in/icflorescu">LinkedIn</ExternalLink>, but since you are on this
        page, you probably have a pretty good idea of how my skills could help you.
      </PageText>
      <PageText>
        So, if you want to hire my services don’t hesitate to drop me a line on the email address listed in my GitHub
        profile. Since I’m currently getting a constant flow of approaches (some of them relevant, others not so much),{' '}
        <em>mentioning Mantine DataTable in your text would help me prioritize your message.</em>
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
