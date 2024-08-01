import Link from "next/link";

export default function Page() {
  return (
    <div className="px-2 md:px-10">
      <h1 className="mb-4 text-xl"><b>Kontaktdaten</b></h1>

      <table className="w-full">
        <tbody>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Ansprechpartner</td>
          <td>Peter und Elke Grimm</td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Telefonnummer</td>
          <td>06055 6302</td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Mobil<br/>&nbsp;</td>
          <td>0151 56105170<br/>0151 70081260</td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">E-Mail</td>
          <td><Link className="text-amber-700 underline"
                    href="mailto:info@fewogrimm.de">info@fewogrimm.de</Link></td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Ort</td>
          <td>63579 Freigericht - Horbach</td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Parken und Anmeldung</td>
          <td>Mühlstraße 4</td>
        </tr>
        <tr className="border-b-amber-100 border-b-[1px]">
          <td className="py-3">Reservierungsanfrage</td>
          <td>
            <Link href="mailto:info@fewogrimm.de?subject=Reservierungsanfrage%20Ferienwohnung%20Grimm&body=Bitte%20ausf%C3%BCllen%20und%20absenden%0A%0AVorname%3A%20%0AName%3A%20%0AStra%C3%9Fe%20Hausnummer%3A%20%0APlz%20und%20Ort%3A%20%0ALand%3A%20%0ATelefon%3A%20%0A%0AAnreise%3A%20%0AAbreise%3A%20%0A%0APersonenzahl%20gesamt%3A%20%0ADavon%20Kinder%20bitte%20mit%20Altersangabe%3A%20%0A%0ASonstige%20Angaben%20oder%20Fragen%3A%20%0A">
              <button
                className="bg-amber-100 py-1 px-5 border border-amber-700 rounded-3xl hover:bg-amber-700 hover:border-amber-100 hover:text-amber-100">Reservieren
              </button>
            </Link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
);
}
