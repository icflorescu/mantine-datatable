'use client';

import { type CodeHighlightAdapter, CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import type { PropsWithChildren } from 'react';

// Mantine's built-in dark theme renders some tokens (type names, generics...) in a dark red
// that's barely readable against the dark background, so we're using a bundled Shiki theme instead
const DARK_THEME = 'github-dark-default';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['ts', 'tsx', 'js', 'json', 'css', 'shell', 'md'],
    themes: [DARK_THEME],
  });

  return shiki;
}

const mantineShikiAdapter = createShikiAdapter(loadShiki);

// Mantine's adapter maps the `light` and `dark` color schemes to its own themes and passes any other value
// through to Shiki as a theme name, so we only swap the dark one and keep Mantine's light theme
const shikiAdapter: CodeHighlightAdapter = {
  ...mantineShikiAdapter,
  getHighlighter: (ctx) => {
    const highlight = mantineShikiAdapter.getHighlighter(ctx);
    return (input) =>
      highlight(
        input.colorScheme === 'dark' ? { ...input, colorScheme: DARK_THEME as typeof input.colorScheme } : input
      );
  },
};

export function ShikiCodeHighlightProvider({ children }: PropsWithChildren) {
  return <CodeHighlightAdapterProvider adapter={shikiAdapter}>{children}</CodeHighlightAdapterProvider>;
}
