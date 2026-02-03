'use client';

import dynamic from 'next/dynamic';
import GSAPProvider from '@/components/common/gsap-provider';

const MagneticCursor = dynamic(
  () => import('@/components/common/magnetic-cursor'),
  { ssr: false }
);

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <GSAPProvider>
      <MagneticCursor />
      {children}
    </GSAPProvider>
  );
}
