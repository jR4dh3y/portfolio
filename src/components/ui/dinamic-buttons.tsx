import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface SocialButtonsProps {
  links: SocialLink[];
}

const SocialButtons = ({ links }: SocialButtonsProps) => {
  return (
    <>
      {links.map(({ icon: Icon, href, label }) => (
        <Button
          key={label}
          variant="outline"
          size="icon"
          className="group relative h-12 w-12 flex-shrink-0 overflow-hidden px-0 transition-all duration-300 ease-out hover:w-32 hover:text-black focus-visible:ring-primary"
          asChild
        >
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <Icon
              aria-hidden
              className="h-5 w-5 transform transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-75"
            />
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm font-medium text-black opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            >
              {label}
            </span>
            <span className="sr-only">{label}</span>
          </Link>
        </Button>
      ))}
    </>
  );
};

export default SocialButtons;
