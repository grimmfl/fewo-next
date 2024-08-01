import Image from 'next/image';

export default function Page() {
  return (
    <>
      <div>
        <h1 className="text-xl text-center mb-10"><b>Bad</b></h1>
        <div className="flex flex-col md:flex-row justify-around">
          <Image src="/BadP1.jpg" alt="Bad" width="480" height="270"></Image>
          <Image className="mt-10 md:mt-0" src="/BadP2.jpg" alt="Bad" width="480" height="270"></Image>
        </div>
      </div>

      <hr className="my-10"/>

      <div>
        <h1 className="text-xl text-center mb-10"><b>Esszimmer</b></h1>
        <div className="flex flex-col md:flex-row justify-around">
          <Image src="/EZ1.jpg" alt="Esszimmer" width="480" height="270"></Image>
          <Image className="mt-10 md:mt-0" src="/EZ2.jpg" alt="Esszimmer" width="480" height="270"></Image>
        </div>
      </div>

      <hr className="my-10"/>

      <div>
        <h1 className="text-xl text-center mb-10"><b>Küche</b></h1>
        <div className="flex flex-col md:flex-row justify-around">
          <Image src="/Kueche2.jpg" alt="Küche" width="480" height="270"></Image>
          <Image className="mt-10 md:mt-0" src="/Kueche2_Grundriss.jpg" alt="Küche" width="480" height="270"></Image>
        </div>
      </div>

      <hr className="my-10"/>

      <div>
        <h1 className="text-xl text-center mb-10"><b>Schlafzimmer</b></h1>
        <div className="flex flex-col md:flex-row justify-around">
          <Image src="/SZ1.jpg" alt="Schlafzimmer" width="480" height="270"></Image>
          <Image className="mt-10 md:mt-0" src="/SZ2.jpg" alt="Schlafzimmer" width="480" height="270"></Image>
        </div>
      </div>

      <hr className="my-10"/>

      <div>
        <h1 className="text-xl text-center mb-10"><b>Wohnzimmer</b></h1>
        <div className="flex flex-col md:flex-row justify-around">
          <Image src="/WZ2.jpg" alt="Schlafzimmer" width="480" height="270"></Image>
        </div>
      </div>
    </>
  );
}
