'use client';

import {
  CalendarDaysIcon,
  HomeIcon,
  InformationCircleIcon,
  PhotoIcon,
  CurrencyEuroIcon,
  UserCircleIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import clsx from 'clsx';
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: '', href: '/', icon: HomeIcon},
  { name: 'Kalender', href: '/calendar', icon: CalendarDaysIcon },
  { name: 'Informationen', href: '/informations', icon: InformationCircleIcon },
  { name: 'Bilder', href: '/images', icon: PhotoIcon },
  { name: 'Preise', href: '/prices', icon: CurrencyEuroIcon },
  { name: 'Kontakt', href: '/contact', icon: UserCircleIcon },
  { name: 'Impressum', href: '/legal', icon: DocumentMagnifyingGlassIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-700 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-amber-100 text-amber-700": pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
