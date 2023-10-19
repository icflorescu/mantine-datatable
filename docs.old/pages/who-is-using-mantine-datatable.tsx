import { Code, Container } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { AUTHOR_LINK, REPO_LINK } from '~/config';

const PATH = 'who-is-using-mantine-datatable';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine DataTable is used by thousands of developers, startups and community projects around the world; some of
        them were kind enough to let me know about it, offered sponsorship or asked for private support, and gave me
        permission to list them in the footer of this website.
      </PageText>
      <PageText>
        If you are using Mantine DataTable in your project and would like to be listed here, please let me know by
        replying to <ExternalLink to={`${REPO_LINK}/discussions/329`}>this thread on GitHub</ExternalLink> or by sending
        me an email at the address listed in <ExternalLink to={AUTHOR_LINK}>my GitHub profile</ExternalLink>.
      </PageText>
      <PageText>
        As some of you you may already know, Mantine DataTable is one of my dearest open-source projects.
        <br />
        That’s why I am trying to raise as much awareness as possible, in order to increase its user-base and keep
        maintaining the project, keep it up-to-date with Mantine core and come up with new features when possible.
      </PageText>
      <PageText>
        Building and maintaining a project like this is a lot of work, and since GitHub stars and <Code>npm</Code>{' '}
        downloads alone don’t pay bills, I’d like to mention that I’m open for collaborations.
        <br />
        So if you like my work and you’d like to <InternalLink to="/hire-the-author">hire my services</InternalLink>,
        feel free to drop me a line!
        <br />
        This would greatly contribute to the overall long-term stability of the project.
      </PageText>
      <PageText>
        Thank you all for being part of the Mantine DataTable community,
        <br />
        <ExternalLink to={AUTHOR_LINK}>Ionut-Cristian Florescu</ExternalLink>
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
