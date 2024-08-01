import {
  MapPinIcon,
  SunIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";

import { PrismaClient } from "@prisma/client";
import type { information } from "@prisma/client";

const prisma = new PrismaClient();


async function GetAllInformationsAsync(): Promise<information[]> {
  return prisma
    .information
    .findMany({
                where: {
                  hide: 0
                }
              });
}

export default async function Page() {
  const infos = await GetAllInformationsAsync();

  return (
    <div className="px-10">
      {infos.map(i =>
                   <div key={ i.id }>
                     <div className="text-xl">{ i.title }</div>
                     <div className="text-sm">
                       <br/>
                       <p>
                         { i.content }
                       </p>
                     </div>
                     <hr className="my-10"/>
                   </div>
      ) }

      <div className="flex text-xl">
        <MapPinIcon className="w-6 text-amber-700 mr-1"/>
        Informationen
      </div>

      <div className="text-sm">
        <br/>

        <p>
          Freigericht liegt im Main-Kinzig-Kreis, unmittelbar an der hessisch-bayrischen Grenze.
        </p>

        <br/>

        <p>
          <b>Folgende Autobahnanbindungen stehen zur Verfügung:</b><br/>
          Anschlussstelle Langenselbold (A66, A45): 11 km<br/>
          Anschlussstelle Gelnhausen (A66): 9 km<br/>
          Anschlussstelle Hanau (A3): 30 km<br/>
          Anschlussstelle Hösbach (A3): 23 km<br/>
          Anschlussstelle Alzenau (A45): 12 km<br/>
        </p>

        <br/>

        <p>
          <b>Entfernungen Stadtzentren:</b><br/>
          Gelnhausen Zentrum: 10km<br/>
          Hanau Zentrum: 24 km<br/>
          Aschaffenburg Zentrum: 30km<br/>
          Frankfurt/Main Zentrum: ca. 45 km<br/>
          Frankfurt/Main Messe: ca. 47 bis 63 km<br/>
          Fulda Zentrum: 70 km<br/>
        </p>

        <br/>

        <p>
          Mit öffentlichen Verkehrsmitteln erreichen Sie das Zentrum von Frankfurt/Main in ca. 35
          Minuten und das Messegelände in ca. 45 Minuten.
          Bahnhöfe befinden sich in Langenselbold (10 km) und Gelnhausen (10 km).
        </p>
      </div>

      <hr className="my-10"/>

      <div className="flex text-xl">
        <SunIcon className="w-6 text-amber-700 mr-1"/>
        Freizeit
      </div>

      <div className="text-sm">
        <br/>

        <p>
          <b>Wanderer</b> und <b>Radfahrer</b> willkommen. Horbach, der kleinste Ortsteil in <Link
          className="text-amber-700 underline" target="_blank"
          href="https://www.freigericht.de">Freigericht</Link>, staatlich anerkannter Erholungsort
          und das optimale Etappenziel am <Link className="text-amber-700 underline" target="_blank"
                                                href="https://www.spessartbogen.de/spessartbogen/">Spessartbogen</Link>.
          Weiter gibt es eine Vielzahl an Möglichkeiten zum Wandern, Walken, Joggen oder
          Mountain-Biken. Fahrräder können in der Garage abgestellt werden.<br/>
        </p>

        <br/>

        <p>
          <b>Golfplätze</b><br/>
          Golfplatz <Link className="text-amber-700 underline" target="_blank"
                          href="https://www.golf-absolute.de/freigericht/">Trages</Link> in
          Freigericht (7 km)<br/>
          Goldplatz <Link className="text-amber-700 underline" target="_blank"
                          href="https://www.gut-huehnerhof.de">Gut Hühnerhof</Link> in Gründau (16
          km)
        </p>

        <br/>

        <p>
          <b>Hallenbäder</b><br/>
          Hallenbad <Link className="text-amber-700 underline" target="_blank"
                          href="https://platsch-freigericht.de">Platsch</Link> in Freigericht (4 km)<br/>
          <Link className="text-amber-700 underline" target="_blank"
                href="https://toskanaworld.net/toskana-therme-bad-orb-de/">Toskana Therme</Link> in
          Bad Orb (23 km)<br/>
          <Link className="text-amber-700 underline" target="_blank"
                href="https://hallenbad-gelnhausen.de">Hallenbad</Link> in Gelnhausen (9 km)<br/>
        </p>

        <br/>

        <p>
          <b>Freibäder / Badeseen</b><br/>
          Freibäder in Gelnhausen, Langenselbold, Alzenau, Schöllkrippen (jeweils ca. 10 km)<br/>
          Badeseen in Alzenau, Langenselbold, Rodenbach, Großkrotzenburg, Kahl (12 - 16km)<br/>
        </p>
      </div>

      <hr className="my-10"/>

      <div className="flex text-xl">
        <ShieldCheckIcon className="w-6 text-amber-700 mr-1"/>
        Richtlinien
      </div>

      <div className="text-sm">
        <br/>
        <p>
          Die Zahlung erbeten wir bei Schlüsselübergabe in bar, oder im Voraus per Überweisung.<br/>
          Bei Zahlung per PayPal berechnen wir einen Aufschlag von 4% des Gesamtbetrages.<br/>
          Waschmaschine oder Trockner können auf Anfrage gegen Gebühr von 5 EUR genutzt werden.<br/>
          Die Anreise ist in der Regel ab 15 Uhr bis 22 Uhr möglich. Wir bitten um Ankündigung Ihrer
          ungefähren Ankunftszeit, telefonisch oder per Mail. Die Abreise bitte bis 11 Uhr
          einplanen.<br/>
          Vor der Abreise bitte das genutzte Geschirr spülen und die Wohnung besenrein
          verlassen.<br/>
          Den Schlüssel bitte persönlich zurückgeben oder in der Schlüsselbox ablegen.
        </p>
      </div>
    </div>
  );
}
