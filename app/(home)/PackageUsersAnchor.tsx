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
    <Anchor className={className} role="button" onClick={handlePackageUsersLinkClick}>
      {children}
    </Anchor>
  );
}
