'use client';

import { Anchor } from '@mantine/core';

export type PackageUsersAnchorProps = React.PropsWithChildren<{
  className?: string;
}>;

export function PackageUsersAnchor({ children, className }: PackageUsersAnchorProps) {
  const handlePackageUsersLinkClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Anchor className={className} onClick={handlePackageUsersLinkClick}>
      {children}
    </Anchor>
  );
}
