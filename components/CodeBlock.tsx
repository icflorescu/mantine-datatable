import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { IconBrandCss3, IconBrandTypescript, IconFileTypeTsx, IconJson, IconTerminal } from '@tabler/icons-react';

const ICON_PROPS = { size: 16 };

const ICONS = {
  tsx: <IconFileTypeTsx {...ICON_PROPS} />,
  ts: <IconBrandTypescript {...ICON_PROPS} />,
  css: <IconBrandCss3 {...ICON_PROPS} />,
  shell: <IconTerminal {...ICON_PROPS} />,
  json: <IconJson {...ICON_PROPS} />,
};

function getLanguage(fileName: string) {
  return fileName.split('.').pop() as keyof typeof ICONS;
}

export type CodeBlockProps<T extends Record<string, string>> =
  | {
      language?: keyof typeof ICONS;
      fileName?: never;
      code: string;
      tabs?: never;
    }
  | {
      language?: never;
      fileName: string;
      code: string;
      tabs?: never;
    }
  | {
      language?: never;
      fileName?: never;
      code?: never;
      tabs:
        | {
            language?: keyof typeof ICONS;
            fileName: string;
            code: string;
          }[]
        | { code: T; keys: (keyof T)[] };
    };

export function CodeBlock<T extends Record<string, string>>({ fileName, language, code, tabs }: CodeBlockProps<T>) {
  if (tabs) {
    if (Array.isArray(tabs)) {
      return (
        <CodeHighlightTabs
          code={tabs.map(({ language, fileName, code }) => {
            language = language || getLanguage(fileName);
            return {
              language,
              fileName,
              code,
              icon: ICONS[language] || undefined,
            };
          })}
        />
      );
    } else {
      const { code, keys } = tabs;
      return (
        <CodeHighlightTabs
          code={keys.map((key) => {
            const language = getLanguage(key as string);
            return {
              language,
              fileName: key as string,
              code: code[key] as string,
              icon: ICONS[language] || undefined,
            };
          })}
        />
      );
    }
  } else {
    return <CodeHighlight language={fileName ? getLanguage(fileName) : language || 'tsx'} code={code} />;
  }
}
