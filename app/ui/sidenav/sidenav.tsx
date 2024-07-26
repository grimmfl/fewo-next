import NavLinks from '@/app/ui/sidenav/nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-amber-700 shadow-md">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-700 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Admin</div>
          </button>
        </form>
      </div>
    </div>
  );
}
