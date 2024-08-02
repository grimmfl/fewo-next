'use client'

import Calendar from "@/app/ui/calendar/calendar";
import { information, price, PrismaClient, type reservation } from "@prisma/client";
import { useState } from "react";
import clsx from "clsx";
import Reservations from "@/app/ui/admin/reservations/reservations";
import Prices from "@/app/ui/admin/prices/prices";
import Informations from "@/app/ui/admin/informations/informations";
import Login from "@/app/ui/admin/login/login";
import { getLocalStorage, removeLocalStorage } from "@/app/lib/utils";

const prisma = new PrismaClient();

const ReservationsTab = "reservations";
const PricesTab = "prices";
const InformationsTab = "informations";


function isExpired(token?: string) {
  if (token == null) return true;

  const timestamp = parseInt(token.split(":")[1], 10);

  const now = Date.now();

  return now > timestamp;
}


export default function AdminDashboard({ reservations, prices, informations }: {
  reservations: reservation[],
  prices: price[],
  informations: information[]
}) {
  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
  }

  let [selectedTab, setSelectedTab] = useState(ReservationsTab);

  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = getLocalStorage("token");

  if (token != null && isExpired(token)) {
    setIsLoggedIn(false);
    removeLocalStorage("token");
  }

  if (token != null && !isLoggedIn) setIsLoggedIn(true);

  if (token == null && isLoggedIn) setIsLoggedIn(false);

  isExpired(token!);

  return (
    <div className="px-2 md:px-10">
      { isLoggedIn ?
        <div>
          <div className="text-right">

            <button type="button" onClick={logout}
              className="border border-amber-500 py-2 rounded mb-2 w-52 hover:bg-amber-100">Abmelden
            </button>

          </div>
          <Calendar reservations={ reservations }/>

          <div className="flex">
            <div onClick={ () => setSelectedTab(ReservationsTab) } className={ clsx(
              "py-4 w-52 text-center hover:cursor-pointer px-2",
              {
                "border-b border-gray-300": selectedTab != ReservationsTab,
                "border-b-2 border-amber-500": selectedTab === ReservationsTab,
              }
            )
            }>Reservierungen
            </div>
            <div onClick={ () => setSelectedTab(PricesTab) } className={ clsx(
              "py-4 w-52 text-center hover:cursor-pointer px-2",
              {
                "border-b border-gray-300": selectedTab != PricesTab,
                "border-b-2 border-amber-500": selectedTab === PricesTab,
              }
            )
            }>Preise
            </div>
            <div onClick={ () => setSelectedTab(InformationsTab) } className={ clsx(
              "py-4 w-52 text-center hover:cursor-pointer px-2",
              {
                "border-b border-gray-300": selectedTab != InformationsTab,
                "border-b-2 border-amber-500": selectedTab === InformationsTab,
              }
            )
            }>Informationen
            </div>
          </div>

          <div className="mt-4">
            {
              selectedTab === ReservationsTab
                ? <Reservations reservations={ reservations }></Reservations>
                : selectedTab === PricesTab
                  ? <Prices prices={ prices }></Prices>
                  : <Informations informations={ informations }></Informations>
            }
          </div>
        </div>
        : <Login onLogin={() => setIsLoggedIn(true)}/> }
    </div>
  );
}
