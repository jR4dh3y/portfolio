import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ClientProviders from '@/components/common/client-providers';

export const metadata: Metadata = {
  title: 'Portfolio | Radhey Kalra',
  description: 'Computer Science student specializing in full-stack development, ML/audio processing, and DevOps. Building innovative projects with React, Node.js, Python, and more.',
  keywords: ['Radhey Kalra', 'Full-Stack Developer', 'Computer Science', 'Web Development', 'Machine Learning', 'DevOps', 'Portfolio'],
  authors: [{ name: 'Radhey Kalra' }],
  creator: 'Radhey Kalra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://radhey.dev',
    title: 'Radhey Kalra | Full-Stack Developer',
    description: 'Computer Science student building full-stack applications and ML solutions.',
    siteName: 'Radhey Kalra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radhey Kalra | Full-Stack Developer',
    description: 'Computer Science student building full-stack applications and ML solutions.',
    creator: '@jr4dh3y',
  },
  icons: {
    icon: '/assets/favicon.png',
  },
  metadataBase: new URL('https://radhey.dev'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
