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
        I’m a hands-on fractional CTO, product builder and open-source author from Bucharest, Romania, EU, building for
        the web since 1998. I take software products from a blank repo to production, and stay to run them for a decade.
        I still write production code; I’ve also learned which code isn’t worth writing.
      </Txt>
      <Txt>
        {PRODUCT_NAME} is one of my dearest open-source projects and I have dedicated countless hours to its development
        and maintenance. It now gets hundreds of thousands of npm downloads every month and is used by companies such as
        Microsoft and Namecheap.
      </Txt>
      <Txt>
        Besides open-source work (I’m also the author of{' '}
        <ExternalLink to="https://icflorescu.github.io/trpc-sveltekit">tRPC-SvelteKit</ExternalLink> and{' '}
        <ExternalLink to="https://pocketbase-uml.github.io">PocketBaseUML</ExternalLink>, and a contributor to Mantine
        and tRPC), I’ve been the technical partner and fractional CTO behind{' '}
        <ExternalLink to="https://www.leasingsh.ro">LeasingSH.ro</ExternalLink> since 2013, and I’m the founder of{' '}
        <ExternalLink to="https://swapp.ro">swapp.ro</ExternalLink>, an invoicing and accounting app for Romanian
        freelancers, which I rebuilt from scratch, solo, in 2026. Earlier in my career, I built enterprise software at
        Allianz-Țiriac and Garanta (National Bank of Greece Group). I’m at home in rule-heavy domains (insurance,
        leasing, tax), where “almost right” means wrong.
      </Txt>
      <Txt>
        These days, I’m open to <strong>fractional CTO and technical partner roles</strong> for early-stage products,{' '}
        <strong>sweat-equity partnerships</strong> where I own the technical side, and{' '}
        <strong>selected hands-on work</strong> in TypeScript, React, TanStack / Next.js, Node.js and PostgreSQL.
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
        So if you’re building something, don’t hesitate to <strong>drop me a line</strong> at the email address listed
        in my <ExternalLink to={AUTHOR_LINK}>GitHub profile</ExternalLink> (I won’t list it here to avoid spam, but it’s
        easy to find) or <strong>book a call</strong> at{' '}
        <ExternalLink to="https://cal.com/icflorescu">cal.com/icflorescu</ExternalLink>.
      </Txt>
      <Txt idea>
        I’m getting a constant flow of approaches, some of them relevant, others not so relevant.
        <br />
        Mentioning <strong>“{PRODUCT_NAME}”</strong> or <strong>“{MANTINE_CONTEXTMENU_PRODUCT_NAME}”</strong> in your
        message will help me <strong>prioritize your message</strong> and get back to you faster.
      </Txt>
      <Txt>
        My code is public and used by developers and companies worldwide, so I skip coding tests and multi-stage hiring
        processes. Instead, we’ll talk about your project: its value proposition, its challenges and how to overcome
        them, and how I can help make it happen.
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
