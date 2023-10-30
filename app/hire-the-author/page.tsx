import type { Route } from 'next';
import {
  AUTHOR_LINK,
  AUTHOR_NAME,
  MANTINE_CONTEXTMENU_LINK,
  MANTINE_CONTEXTMENU_PRODUCT_NAME,
  PRODUCT_NAME,
} from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { getRouteMetadata } from '~/lib/utils';
import classes from './page.module.css';

const PATH: Route = '/hire-the-author';
export const metadata = getRouteMetadata(PATH);

export default function HireTheAuthorPage() {
  return (
    <>
      <ExternalLink to={AUTHOR_LINK} rel="author">
        <img
          className={classes.picture}
          src="https://avatars.githubusercontent.com/u/581999"
          alt={`@icflorescu - author of ${PRODUCT_NAME}`}
        />
      </ExternalLink>
      <PageTitle of={PATH} />
      <Txt>
        Hey, I’m <ExternalLink to={AUTHOR_LINK}>{AUTHOR_NAME}</ExternalLink> &mdash; the creator of {PRODUCT_NAME},{' '}
        <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink> and other
        open-source projects.
      </Txt>
      <Txt>
        I’m a full-stack developer (with a strong affinity for front-end) from Bucharest, Romania, EU, with more than
        two decades of experience in building commercial web applications and open-source projects.
      </Txt>
      <Txt>
        {PRODUCT_NAME} is one of my dearest open-source projects and I have dedicated countless hours to its development
        and maintenance.
      </Txt>
      <Txt>
        You can learn more about who I am, what I do, what my current top skills are and how I like to put them to use
        by visiting my profiles on <ExternalLink to={AUTHOR_LINK}>GitHub</ExternalLink>{' '}
        <img className={classes.badge} src="https://img.shields.io/github/stars/icflorescu" alt="GitHub stars" />{' '}
        <img
          className={classes.badge}
          src="https://img.shields.io/github/followers/icflorescu"
          alt="GitHub followers"
        />{' '}
        or <ExternalLink to="https://www.linkedin.com/in/icflorescu">LinkedIn</ExternalLink>, though &mdash; since
        you’re reading this page &mdash; I believe you already have something in mind for me and a pretty good idea of
        how my skills could assist you in your endeavors.
      </Txt>
      <Txt>
        So if you want to hire my services, don’t hesitate to <strong>drop me a line</strong> at the email address
        listed in my <ExternalLink to={AUTHOR_LINK}>GitHub profile</ExternalLink>.
        <br />I won’t list it here to avoid spam, but it’s easy to find.
      </Txt>
      <Txt idea>
        I’m getting a constant flow of approaches, some of them relevant, others not so relevant.
        <br />
        Mentioning <strong>“{PRODUCT_NAME}”</strong> or <strong>“{MANTINE_CONTEXTMENU_PRODUCT_NAME}”</strong> in your
        message will help me <strong>prioritize your message</strong> and get back to you faster.
      </Txt>
      <Txt>
        Thank you for your interest in my work and I’m looking forward to hearing from you,
        <br />
        <ExternalLink to={AUTHOR_LINK}>{AUTHOR_NAME}</ExternalLink>
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
