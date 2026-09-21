import Link from 'next/link';
import React from 'react';

/** Internal links use next/link (soft navigation + prefetch); everything else is a plain anchor. */
export function AppLink({ href, children, ...rest }: React.ComponentPropsWithoutRef<'a'> & { prefetch?: boolean }) {
  if (href && href.startsWith('/')) {
    return (
      <Link href={href} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
