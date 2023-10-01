import { Code, Container } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { AUTHOR_LINK, MANTINE_LINK, SPONSOR_LINK } from '~/config';

const PATH = 'mantine-v7-support';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText idea>
        Mantine DataTable v6.x supports <ExternalLink to="https://v6.mantine.dev/">Mantine v6.x</ExternalLink>.
        <br />
        <ExternalLink to={MANTINE_LINK}>Mantine v7.x</ExternalLink> support is on the roadmap. You can help speed up the
        process by <ExternalLink to={SPONSOR_LINK}>sponsoring me on GitHub</ExternalLink>.
      </PageText>
      <PageText>
        As most of you already know, Mantine v7 came up with{' '}
        <ExternalLink to="https://mantine.dev/changelog/7-0-0/">
          a significant number of breaking changes, most of them referring to how styling is implemented
        </ExternalLink>
        .
      </PageText>
      <PageText>
        As some of you know, Mantine-DataTable is one of my dearest open-source projects. I’ve dedicated a sizeable
        amount of my own free time to build it and I’m doing my best to maintain it.
      </PageText>
      <PageText>
        While this library has over 650 GitHub stars and 35k <Code>npm</Code> downloads per month (as of October 1st
        2023) and is being used by lots of startups and developers worldwide, I’m still struggling with raising enough
        funds to be able to dedicate as much time as I’d like to the project.
      </PageText>
      <PageText>
        To put it bluntly, building and maintaining successful open-source projects doesn’t pay my bills, or maybe I’m
        simply not yet good enough at raising awareness and converting it into sponsorship income.
      </PageText>
      <PageText>
        Also, I’d like to mention that this is not the only open-source project I’m working on. I’m also the author of{' '}
        <ExternalLink to="https://icflorescu.github.io/mantine-contextmenu">Mantine-ContextMenu</ExternalLink>,{' '}
        <ExternalLink to="https://pocketbase-uml.github.io/">PocketBaseUML</ExternalLink>,{' '}
        <ExternalLink to="https://icflorescu.github.io/trpc-sveltekit">tRPC-SvelteKit</ExternalLink>,{' '}
        <ExternalLink to="https://github.com/icflorescu/expose-wsl">Expose-WSL</ExternalLink> and{' '}
        <ExternalLink to={AUTHOR_LINK}>others</ExternalLink>. But I can’t be a full-time open-source developer; I wasn’t
        born rich (on the contrary). Therefore, I have to make a living, so I have to spend most of my time working on
        commercial projects as a <InternalLink to="/hire-the-author">freelancer or contractor</InternalLink>.
      </PageText>
      <PageText>
        Please understand that this is not a rant, but a simple explanation of why I can’t dedicate as much time as I
        (and you) would like to this project.
      </PageText>
      <PageText warning>
        To sum it up, Mantine V7 support is on the roadmap, but it will take a while to get there.
        <br />
        I’m doing my best to keep this project alive, but I can’t do it alone.
        <br />
        I need <ExternalLink to={SPONSOR_LINK}>your help</ExternalLink>.
      </PageText>
      <PageText>
        Thank you for your support and understanding,
        <br />
        <ExternalLink to={AUTHOR_LINK}>Ionut-Cristian Florescu</ExternalLink>
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
