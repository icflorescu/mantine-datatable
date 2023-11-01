import { Box, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavbarButton, type NavbarButtonProps } from './NavbarButton';
import classes from './NavbarExamples.module.css';

const EXPANSION_STATE_STORAGE_KEY = `${process.env.PACKAGE_NAME}-examples-expanded`;

export type NavbarExamplesProps = {
  items: NavbarButtonProps[];
};

const COLOR = 'green';

export function NavbarExamples({ items }: NavbarExamplesProps) {
  const [expanded, { toggle, open }] = useDisclosure(false, {
    onOpen: () => localStorage.setItem(EXPANSION_STATE_STORAGE_KEY, 'true'),
    onClose: () => localStorage.removeItem(EXPANSION_STATE_STORAGE_KEY),
  });

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/examples/') || localStorage.getItem(EXPANSION_STATE_STORAGE_KEY)) {
      open();
    }
    // open should not be a dependency...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [didExpand, setDidExpand] = useState(false);

  return (
    <>
      <NavbarButton
        title="Examples"
        color={COLOR}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        expanded={expanded}
      />
      <Collapse in={expanded} onTransitionEnd={() => setDidExpand(expanded)} pos="relative">
        <Box
          bg={COLOR}
          className={clsx(classes.line, { [classes.lineVisible]: didExpand })}
          style={{ transitionDuration: `${30 * items.length}ms` }}
        />
        {items.map((item) => (
          <NavbarButton key={item.href} {...item} />
        ))}
      </Collapse>
    </>
  );
}
