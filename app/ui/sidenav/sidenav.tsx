import NavLinks from '@/app/ui/sidenav/nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-amber-700 shadow-md">
      <div className="flex grow flex-row justify-between md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
