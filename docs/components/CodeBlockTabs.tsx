import { createStyles } from '@mantine/core';
import { Prism, PrismProps } from '@mantine/prism';
import { Braces, Terminal2 } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  tab: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
    fontSize: 12,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: 'initial',
    },
  },
}));

type CodeBlockTabsProps = {
  items: (Pick<PrismProps, 'language' | 'noCopy'> & {
    title: string;
    content: string;
  })[];
};

export default function CodeBlockTabs({ items }: CodeBlockTabsProps) {
  const { classes } = useStyles();
  return (
    <Prism.Tabs my="xl" defaultValue={items[0].title}>
      <Prism.TabsList>
        {items.map(({ title, language }) => {
          const Icon = language === 'bash' ? Terminal2 : Braces;
          return (
            <Prism.Tab key={title} className={classes.tab} value={title} icon={<Icon width={16} height={16} />}>
              {title}
            </Prism.Tab>
          );
        })}
      </Prism.TabsList>
      {items.map(({ title, content, ...otherProps }) => (
        <Prism.Panel key={title} value={title} {...otherProps}>
          {content}
        </Prism.Panel>
      ))}
    </Prism.Tabs>
  );
}
