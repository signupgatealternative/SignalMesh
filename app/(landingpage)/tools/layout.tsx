import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Security Tools - SignalMesh',
  description: 'Free tools to test your signup form security: vulnerability checker, bot simulator, email risk checker, and more.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
