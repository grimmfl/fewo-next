import Image from "next/image";
import Carousel from "@/app/ui/carousel/carousel";
import Calendar from "@/app/ui/calendar/calendar";
import { PrismaClient, Prisma } from '@prisma/client'
import type { reservation } from "@prisma/client";

import BedIcon from "@mui/icons-material/Bed";
import ChairIcon from "@mui/icons-material/Chair";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShowerIcon from "@mui/icons-material/Shower";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import HotelIcon from "@mui/icons-material/Hotel";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import GroupsIcon from "@mui/icons-material/Groups";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import PetsIcon from "@mui/icons-material/Pets";

const prisma = new PrismaClient();

async function GetReservationsAsync(): Promise<reservation[]> {
  return prisma
    .reservation
    .findMany();
}

export default async function Home() {
  const reservations = await GetReservationsAsync();
  return (
    <main className="flex min-h-screen justify-center p-6">
      <div className="bg-amber-50 min-w-full text-center">
        <div className="flex justify-center">
          <Carousel/>
        </div>
        <hr className="my-10"/>

        <div className="flex flex-col md:flex-row">
          <div className="text-sm mb-5 mt-16 px-5">
            <p>Hier sehen sie unseren Kalender.</p><br/>
            <p>Ist ein Datum <span className="text-red-700">rot</span> markiert, ist die
              Ferienwohnung an diesem Tag bereits belegt.</p><br/>
            <p>Ist ein Datum <span className="text-amber-500">orange</span> markiert, findet die An-
              bwz. Abreise der Reservierung statt.</p>
            <br/>
          </div>
          <Calendar reservations={ reservations }></Calendar>
        </div>

        <hr className="my-10"/>

        <h1 className="text-xl">Ihr Zuhause auf Zeit</h1>

        <hr className="my-10"/>

        <h2 className="text-lg">Zimmer</h2>
        <div className="text-sm">Für 1-4 Personen</div>

        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <BedIcon></BedIcon><br/>
              Schlafzimmer mit Doppelbett
              <div className="text-xs">Kinderbett auf Nachfrage</div>
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <ChairIcon></ChairIcon><br/>
              Wohnzimmer mit zwei einzelnen Bettsofas
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <LocalCafeIcon></LocalCafeIcon><br/>
              Vollausgestattete Küche
              <div className="text-xs">mit Herd, Backofen, Kühlschrank, Kaffeemaschine, Mikrowelle,
                Wasserkocher, Toaster, Geschirr</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <RestaurantIcon></RestaurantIcon><br/>
              Esszimmer
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <ShowerIcon></ShowerIcon><br/>
              Bad mit Dusche und WC
            </div>
          </div>
        </div>

        <hr className="my-10"/>

        <h2 className="text-lg">Ausstattung</h2>

        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <WifiIcon></WifiIcon><br/>
              WLAN
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <LocalLaundryServiceIcon></LocalLaundryServiceIcon><br/>
              Waschmaschine und Trockner
              <div className="text-xs">gegen Gebühr und auf Anfrage</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <DesktopWindowsIcon></DesktopWindowsIcon><br/>
              TV
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <HotelIcon></HotelIcon><br/>
              Bettwäsche, Handtücher, etc.
            </div>
          </div>
        </div>

        <hr className="my-10"/>

        <h2 className="text-lg">Weitere Informationen</h2>

        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <SmokeFreeIcon></SmokeFreeIcon><br/>
              Nichtraucherwohnung
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <GroupsIcon></GroupsIcon><br/>
              Überdachter Raucherbereich und Sitzmöglichkeit im Freien
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <OutdoorGrillIcon></OutdoorGrillIcon><br/>
              Grillmöglichkeit
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-center w-80 text-sm mt-10">
              <DoorFrontIcon></DoorFrontIcon><br/>
              Separater Zugang zur Erdgeschosswohnung
            </div>
            <div className="text-center w-80 text-sm mt-10">
              <PetsIcon></PetsIcon><br/>
              Haustiere auf Anfrage
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
