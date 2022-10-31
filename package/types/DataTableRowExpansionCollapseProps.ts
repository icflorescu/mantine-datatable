import type { CollapseProps } from '@mantine/core';

export type DataTableRowExpansionCollapseProps = Pick<
  CollapseProps,
  'animateOpacity' | 'transitionDuration' | 'transitionTimingFunction'
>;
