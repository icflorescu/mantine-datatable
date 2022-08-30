import { Prism, PrismProps } from '@mantine/prism';

type ColdeBlockProps = Pick<PrismProps, 'language' | 'noCopy'> & { content: string };

export default function CodeBlock({ content, ...otherProps }: ColdeBlockProps) {
  return (
    <Prism my="xl" {...otherProps}>
      {content}
    </Prism>
  );
}
