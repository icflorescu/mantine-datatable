import { Box, Container } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { AUTHOR_LINK, REPO_LINK } from '~/config';

const PATH = 'contribute-and-support';

export default function Page() {
  const [contributorCols, setContributorCols] = useState(12);

  const adjustContributorCols = () => {
    setContributorCols(window.innerWidth < 400 ? 4 : window.innerWidth < 800 ? 8 : 12);
  };

  useWindowEvent('resize', adjustContributorCols);
  useEffect(adjustContributorCols, []);

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        I’ve dedicated a sizeable amount of my own free time to build this project because:
        <ul>
          <li>
            I think <ExternalLink to="https://mantine.dev/">Mantine</ExternalLink> is currently the best React UI
            Framework; however people were{' '}
            <ExternalLink to="https://github.com/mantinedev/mantine/discussions/195">constantly</ExternalLink>{' '}
            <ExternalLink to="https://github.com/mantinedev/mantine/discussions/1057">asking</ExternalLink> in the
            community for a component with Data Table / Data Grid functionality;
          </li>
          <li>
            I’m a keen advocate of open-source and{' '}
            <ExternalLink to="https://medium.com/@icflorescu/open-source-capitalism-and-democracy-c71f025b6eba">
              I believe in its power to make our world a better place.
            </ExternalLink>
          </li>
        </ul>
      </PageText>
      <PageSubtitle value="Contribute" />
      <PageText>
        If you find a bug please don’t hesitate to{' '}
        <ExternalLink to={`${REPO_LINK}/issues`}>raise an issue</ExternalLink>.
        <br />
        If you have an idea about a new or missing feature, let’s discuss it{' '}
        <ExternalLink to={`${REPO_LINK}/discussions`}>here</ExternalLink>.
        <br />
        If you’re willing to put your effort into it, coming up with a pull-request would be fantastic.
        <br />
        Code contributions are more than welcome.
      </PageText>
      <PageSubtitle value="List of code contributors" />
      <Box my="xl">
        <ExternalLink to={`${REPO_LINK}/graphs/contributors`}>
          <img
            src={`https://contrib.rocks/image?repo=icflorescu/mantine-datatable&columns=${contributorCols}`}
            alt="Mantine DataTable contributors"
          />
        </ExternalLink>
      </Box>
      <PageSubtitle value="Supporting the project" />
      <PageText>
        If you find this project useful, it would help a lot to{' '}
        <strong>
          <ExternalLink to={REPO_LINK}>star the repository</ExternalLink>
        </strong>
        ,{' '}
        <ExternalLink to="https://twitter.com/share?text=Build%20data-rich%20React%20applications%20with%20Mantine%20DataTable&url=https%3A%2F%2Fgithub.com%2Ficflorescu%2Fmantine-datatable&hashtags=mantine%2Cdatatable%2Cdatagrid%2Creact&via=icflorescu">
          spread the word
        </ExternalLink>
        , and <ExternalLink to="https://www.linkedin.com/in/icflorescu">endorse me on LinkedIn</ExternalLink>.
      </PageText>
      <PageSubtitle value="Why do repository stars matter" />
      <PageText>
        The more stars this repository gets, the more visibility it gains among the Mantine users community. The more
        users it gets, the more chances that some of those users will become active code contributors willing to put
        their effort into bringing new features to life and/or fixing bugs.
        <br />
        As the repository gain awareness, my chances of getting hired to work on Mantine-based projects will increase,
        which in turn will help maintain my vested interest in keeping the project alive.
      </PageText>
      <PageText>
        Thank you for your support,
        <br />
        <ExternalLink to={AUTHOR_LINK}>Ionut-Cristian Florescu</ExternalLink>
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
