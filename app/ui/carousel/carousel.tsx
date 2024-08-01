'use client';

import Image from "next/image";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

class ImageData {
  public url: string;
  public name: string;

  public constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }
}

const images = [
  new ImageData("/BadP1.jpg", "Bad"),
  new ImageData("/Kueche2.jpg", "Küche"),
  new ImageData("/WZ2.jpg", "Wohnzimmer"),
  new ImageData("/SZ1.jpg", "Schlafzimmer"),
  new ImageData("/EZ1.jpg", "Esszimmer"),
];

export default function Carousel() {
  function selectNext() {
    setSelected((selected + 1) % images.length);
  }

  function selectPrev() {
    setSelected((selected + images.length - 1) % images.length);
  }

  let [selected, setSelected] = useState(0);

  let image = images[selected];

  return (
    <>
      <div className="relative w-carousel h-carousel">
        <Image src={ image.url } alt="" fill={ true }></Image>

        <div className="relative text-center top-28 mx-2 flex justify-between">
          <button onClick={ selectPrev }><ChevronLeftIcon
            className="w-6 text-white"/></button>
          <button onClick={ selectNext }><ChevronRightIcon
            className="w-6 text-white"/></button>
        </div>
        <h1 className="text-lg text-white relative text-center top-28">
          <b>Ferienwohnung<br/>Grimm</b></h1>
        <div className="text-white relative text-center top-28">{ image.name }</div>
        <div className="text-center relative top-32">
        { images.map((_, i) =>
                         <button key={ i } onClick={ () => setSelected(i) } className={ clsx(
                           "w-10 h-1 mr-2",
                           {
                             "bg-gray-400": i != selected,
                             "bg-white": i === selected
                           }
                         ) }></button>
          ) }
        </div>
      </div>

    </>

  )
}
