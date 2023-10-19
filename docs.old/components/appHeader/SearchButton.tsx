import { DocSearch } from '@docsearch/react';
import { createStyles } from '@mantine/core';
import { DOCSEARCH_API_KEY, DOCSEARCH_APP_ID, DOCSEARCH_INDEX_NAME, NAVBAR_BREAKPOINT } from '~/config';
import SearchHit from './SearchHit';

const useStyles = createStyles((theme) => {
  const actionIconColor = theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7];
  return {
    root: {
      '.DocSearch-Button': {
        width: '28px',
        height: '28px',
        marginLeft: 0,
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: `1px solid ${theme.fn[theme.colorScheme === 'dark' ? 'darken' : 'lighten'](actionIconColor, 0.25)}`,
        padding: '0 6px',
        ['@media (min-width: 769px)']: {
          width: 'auto',
        },
        [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`]: {
          padding: '0 8px',
          height: '32px',
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        },
      },
      '.DocSearch-Button-Placeholder': {
        fontSize: '0.875rem',
        paddingTop: '2px',
      },
      '.DocSearch-Search-Icon': {
        width: '0.875rem',
        height: '0.875rem',
      },

      '.DocSearch-Button-Keys': {
        justifyContent: 'flex-end',
      },

      '.DocSearch-Button-Key': {
        fontSize: '11px',
        paddingTop: '3px',
      },
      '.DocSearch-Button-Key:last-child': {
        marginRight: 0,
      },
      '.DocSearch-Control-Key-Icon': {
        margin: '-1px 0 0 1px',
      },
    },
  };
});

export default function SearchButton() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <DocSearch
        appId={DOCSEARCH_APP_ID}
        indexName={DOCSEARCH_INDEX_NAME}
        apiKey={DOCSEARCH_API_KEY}
        hitComponent={SearchHit}
      />
    </div>
  );
}
