import { Anchor, Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, WEBSITE_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { getLlmsTxt } from '~/lib/llms';
import { getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/llms-txt';
export const metadata = getRouteMetadata(PATH);

const BASE_PATH = process.env.GITHUB_PAGES === 'TRUE' ? `/${process.env.PACKAGE_NAME}` : '';

function FileLink({ name }: { name: string }) {
  return (
    <Anchor inherit href={`${BASE_PATH}/${name}`} target="_blank">
      <Code>{name}</Code>
    </Anchor>
  );
}

export default function LlmsTxtPage() {
  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If you’re using AI assistants or coding agents (such as Claude, ChatGPT, Cursor or GitHub Copilot) to build your
        application, you can point them to the {PRODUCT_NAME} documentation in a format they can easily read, following
        the <ExternalLink to="https://llmstxt.org">LLMs.txt standard</ExternalLink>.
      </Txt>
      <Txt>Two files are generated from this website’s content every time it’s published:</Txt>
      <UnorderedList>
        <li>
          <FileLink name="llms.txt" /> - a concise overview: the most important facts about using {PRODUCT_NAME},
          followed by links to every documentation page and example;
        </li>
        <li>
          <FileLink name="llms-full.txt" /> - the complete documentation in a single file, including all code examples
          and the full type definitions.
        </li>
      </UnorderedList>
      <PageSubtitle value="How to use them" />
      <UnorderedList>
        <li>
          Paste <Code>{`${WEBSITE_LINK}/llms-full.txt`}</Code> in a chat with your AI assistant and ask it to read the
          file before answering your questions;
        </li>
        <li>
          Add <Code>{`${WEBSITE_LINK}/llms.txt`}</Code> as a documentation source in your AI-powered editor (for
          instance, with the <Code>@Docs</Code> feature in Cursor);
        </li>
        <li>
          Tell your coding agent to fetch <Code>{`${WEBSITE_LINK}/llms-full.txt`}</Code>, or download the file and
          reference it from your project’s agent instructions (<Code>CLAUDE.md</Code>, <Code>AGENTS.md</Code>,{' '}
          <Code>.cursor/rules</Code> etc.).
        </li>
      </UnorderedList>
      <Txt idea title="Tip">
        Use <Code>llms-full.txt</Code> when your tool can handle a larger context and you want the most accurate
        answers; use <Code>llms.txt</Code> when your tool can follow links and fetch only the pages it needs.
      </Txt>
      <PageSubtitle value="What’s inside LLMs.txt" />
      <CodeBlock language="md" code={getLlmsTxt()} />
      <PageNavigation of={PATH} />
    </>
  );
}
