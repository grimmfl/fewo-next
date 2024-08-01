import Link from "next/link";

export default function Page() {
  return (
    <div className="px-10">
      <h1 className="text-lg mb-4"><b>Impressum / Disclaimer</b></h1>

      <h2 className="text-lg text-amber-700">Impressum</h2>
      <div className="text-sm mb-4">
        Elke und Peter Grimm<br/>
        Mühlstraße 4<br/>
        63579 Freigericht<br/>
        Telefon: +49 (0)6055-6302<br/>
        E-Mail: info@fewogrimm.de
      </div>

      <h2 className="text-lg text-amber-700">Disclaimer - rechtliche Hinweise</h2>

      § 1 Warnhinweis zu Inhalten<br/>
      <div className="text-sm mb-4">
        Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher
        Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die
        Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen
        journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die
        Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch
        den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis
        zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des
        Anbieters.
      </div>

      § 2 Externe Links<br/>
      <div className="text-sm mb-4">
        Diese Website enthält Verknüpfungen zu Websites Dritter (&quot;externe Links&quot;). Diese Websites
        unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen
        Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
        Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der
        Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die
        Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der
        Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige
        Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße
        nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links
        unverzüglich gelöscht.
      </div>

      § 3 Urheber- und Leistungsschutzrechte<br/>
      <div className="text-sm mb-4">
        Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
        Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene
        Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen
        Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung,
        Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen
        elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche
        gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder
        kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und
        Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt. Die
        Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
      </div>
      § 4 Besondere Nutzungsbedingungen

      <div className="text-sm mb-4">
        Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten
        Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In
        diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
      </div>

      <div className="text-sm">
        Quelle: <Link className="text-amber-700 underline" href="https://www.juraforum.de/impressum-generator/">Impressum Muster von JuraForum.de</Link>
      </div>
    </div>
  )
}
