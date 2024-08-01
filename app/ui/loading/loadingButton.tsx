import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function LoadingButton({ type, isLoading, buttonClassName, children, onClick }: { type?: string, isLoading: boolean, buttonClassName: string, children: any, onClick?: (x: any) => void }) {
  type = type ?? "button";

  return (
    <button className={ buttonClassName } onClick={ onClick }>
      <div className="flex justify-center">

        <svg className={clsx(
          "animate-spin w-6 h-6 text-gray-600 mr-2",
          { "hidden": !isLoading}
        )} xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                  strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        { children }
      </div>

    </button>
  )
}
