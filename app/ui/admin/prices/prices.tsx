'use client';

import { price } from "@prisma/client";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/16/solid";
import { currency } from "@/app/lib/currency";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Popover } from "react-tiny-popover";
import LoadingButton from "@/app/ui/loading/loadingButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormControl, { FormControlType } from "@/app/ui/form/formControl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorage } from "@/app/lib/utils";


type PriceForm = {
  formTitle: { value: string },
  formSubtitle: { value: string },
  formValue: { value: string },
  formPriority: { value: string },
}

function getEmptyState(): PriceForm {
  return {
    formTitle: { value: "" },
    formSubtitle: { value: "" },
    formValue: { value: "" },
    formPriority: { value: "" },
  };
}

function fillState(state: PriceForm, price: price) {
  state.formTitle.value = price.title;
  state.formSubtitle.value = price.subtitle ?? "";
  state.formValue.value = price.value.toString();
  state.formPriority.value = price.priority.toString();
}

function GetPrice(id: number, state: PriceForm): price {
  return {
    id: id,
    title: state.formTitle.value,
    subtitle: state.formSubtitle.value,
    value: parseFloat(state.formValue.value),
    priority: parseInt(state.formPriority.value, 10),
  };
}

export default function Prices({ prices }: { prices: price[] }) {
  function priceClickHandler(id: number) {
    setPriceId(id);

    if (id === 0) {
      setFormState(getEmptyState());
      return;
    }

    const p = prices.find(r => r.id === id);
    const newState = getEmptyState();
    fillState(newState, p!);
    setFormState(newState);
  }

  function submitForm(event: any) {
    setIsSaveLoading(true);
    event.preventDefault();

    const price = GetPrice(priceId, formState);

    fetch("/api/prices", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(price),
      headers: {
        token: getLocalStorage("token") ?? ""
      }
    }).then(r => r.json())
      .then(r => {
        if (!r) toast.error("Nicht authentifiziert. Wahrscheinlich ist die Sitzung abgelaufen.", {
          position: "top-center",
          progress: undefined,
          theme: "light",
          closeOnClick: true,
          pauseOnHover: false
        }); else {
          router.refresh();
          setIsSaveLoading(false);
          toast.success('Preis gespeichert!', {
            position: "top-center",
            progress: undefined,
            theme: "light",
            closeOnClick: true,
            pauseOnHover: false
          });
        }
      });
  }

  function deletePrice(id: number) {
    setIsDeleteLoading(true);
    fetch(`/api/prices/${ id }`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        token: getLocalStorage("token") ?? ""
      }
    }).then(r => r.json())
      .then(r => {
        if (!r) toast.error("Nicht authentifiziert. Wahrscheinlich ist die Sitzung abgelaufen.", {
          position: "top-center",
          progress: undefined,
          theme: "light",
          closeOnClick: true,
          pauseOnHover: false
        }); else {
          router.refresh();
          setIsDeleteLoading(false);
          setOpenPopover(-1);

          toast.success('Preis gelöscht!', {
            position: "top-center",
            progress: undefined,
            theme: "light",
            closeOnClick: true,
            pauseOnHover: false
          });
        }
      });
  }

  function startDrag(id: number) {
    setCurrentDrag(id);
  }

  function setTarget(id: number) {
    if (dragTarget !== id) setDragTarget(id);
  }

  function endDrag() {
    const dragged = prices.find(p => p.id === currentDrag)!;
    const target = prices.find(p => p.id === dragTarget)!;
    const after = prices.filter(p => p.priority > target.priority);

    dragged.priority = target.priority + 1;
    after.forEach(p => p.priority++);

    const normalized = prices
      .sort((a, b) => a.priority - b.priority)
      .map((p, i) => ({ ...p, priority: i + 1 }));

    fetch("/api/prices", {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(normalized),
      headers: {
        Token: getLocalStorage("token") ?? ""
      }
    }).then(r => r.json())
      .then(r => {
        if (!r) toast.error("Nicht authentifiziert. Wahrscheinlich ist die Sitzung abgelaufen.", {
          position: "top-center",
          progress: undefined,
          theme: "light",
          closeOnClick: true,
          pauseOnHover: false
        }); else router.refresh()
      });

    setCurrentDrag(-1);
    setDragTarget(-1);
  }

  let router = useRouter();

  let [currentDrag, setCurrentDrag] = useState(-1);
  let [dragTarget, setDragTarget] = useState(-1);

  let [openPopover, setOpenPopover] = useState(-1);
  let [isSaveLoading, setIsSaveLoading] = useState(false);
  let [isDeleteLoading, setIsDeleteLoading] = useState(false);

  let [priceId, setPriceId] = useState(-1);
  let [formState, setFormState] = useState(getEmptyState());

  let price = priceId === 0
    ? null
    : prices.find(r => r.id === priceId);


  return (
    <div>
      <ToastContainer/>
      <div className="flex flex-col-reverse md:flex-row mt-4">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <button onClick={ () => priceClickHandler(0) }><PlusIcon
              className="w-6 text-amber-500"></PlusIcon></button>
          </div>
          <table className="w-full mt-4 text-xs md:text-sm">
            <thead>
            <tr>
              <th className="text-left">Titel</th>
              <th className="text-left">Untertitel</th>
              <th className="text-right">Wert</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            { prices
              .sort((a, b) => a.priority - b.priority)
              .map(r =>
                     <tr onDragStart={ (evt) => startDrag(r.id) }
                         onDragOver={ (evt) => setTarget(r.id) }
                         onDragEnd={ () => endDrag() }
                         draggable key={ r.id } onClick={ () => priceClickHandler(r.id) }
                         className={ clsx(
                           "border-b border-gray-300 hover:cursor-pointer h-10",
                           {
                             "border-b-2 border-black": r.id == dragTarget
                           }
                         ) }>
                       <td className="py-3">{ r.title }</td>
                       <td className="py-3">{ r.subtitle }</td>
                       <td className="text-right">{ currency(r.value) }</td>
                       <td className="text-right w-2">
                         <Popover
                           onClickOutside={ () => setOpenPopover(-1) }
                           isOpen={ openPopover === r.id }
                           positions={ ['left', 'top', 'bottom', 'right'] } // preferred positions by priority
                           content={
                             <div
                               className="flex flex-col bg-amber-50 py-2 shadow rounded border border-gray-300">
                               <LoadingButton
                                 buttonClassName="py-2 px-5 text-left hover:bg-amber-100 flex"
                                 isLoading={ isDeleteLoading } onClick={ (evt) => {
                                 evt.stopPropagation();
                                 deletePrice(r.id);
                               } }><TrashIcon className="w-6 mr-2"/>Löschen</LoadingButton>
                             </div>
                           }
                         >
                           <button onClick={ (evt) => {
                             evt.stopPropagation();
                             setOpenPopover(r.id)
                           } } type="button"><EllipsisVerticalIcon className="w-6 mr-5"/></button>
                         </Popover>
                       </td>
                     </tr>) }
            <tr className="h-auto"></tr>
            </tbody>
          </table>
        </div>

        <form className={ clsx(
          "ml-4 flex flex-col md:w-2/3",
          {
            "hidden": priceId === -1
          }
        ) } onSubmit={ submitForm } onReset={ () => priceClickHandler(priceId) }>
          <FormControl name="formTitle" type={ FormControlType.TextArea } state={ formState }
                       label="Titel" setState={ setFormState } required/>

          <FormControl className="mt-4" name="formSubtitle" type={ FormControlType.Text }
                       state={ formState }
                       label="Untertitel" setState={ setFormState }/>

          <FormControl className="mt-4" name="formValue" type={ FormControlType.Number }
                       state={ formState }
                       step={ 0.01 } label="Wert" setState={ setFormState } required/>

          <FormControl className="mt-4" name="formPriority" type={ FormControlType.Number }
                       state={ formState }
                       label="Priorität" setState={ setFormState } required/>


          <div className="flex flex-col mt-4">
            <button type="button" onClick={ () => setPriceId(-1) }
                    className="border border-gray-300 py-2 rounded mb-2">Abbrechen
            </button>
            <button type="reset"
                    className="border border-gray-300 py-2 rounded mb-2">Zurücksetzen
            </button>
            <LoadingButton type="submit" isLoading={ isSaveLoading }
                           buttonClassName="border border-gray-300 py-2 rounded mb-2">Speichern</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}
