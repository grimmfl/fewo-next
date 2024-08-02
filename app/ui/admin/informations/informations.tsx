import { toast, ToastContainer } from "react-toastify";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { currency } from "@/app/lib/currency";
import { Popover } from "react-tiny-popover";
import LoadingButton from "@/app/ui/loading/loadingButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormControl, { FormControlType } from "@/app/ui/form/formControl";
import { information, price } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/app/lib/utils";

type InformationForm = {
  formTitle: { value: string },
  formContent: { value: string },
  formHide: { value: number },
}

function getEmptyState(): InformationForm {
  return {
    formTitle: { value: "" },
    formContent: { value: "" },
    formHide: { value: 0 },
  };
}

function fillState(state: InformationForm, information: information) {
  state.formTitle.value = information.title ?? "";
  state.formContent.value = information.content ?? "";
  state.formHide.value = information.hide;
}

function GetInformation(id: number, state: InformationForm): information {
  return {
    id: id,
    title: state.formTitle.value,
    content: state.formContent.value,
    icon: null,
    hide: state.formHide.value,
  };
}

export default function Informations({ informations }: { informations: information[] }) {
  function informationClickHandler(id: number) {
    setInformationId(id);

    if (id === 0) {
      setFormState(getEmptyState());
      return;
    }

    const i = informations.find(r => r.id === id);
    const newState = getEmptyState();
    fillState(newState, i!);
    setFormState(newState);
  }

  function submitForm(event: any) {
    setIsSaveLoading(true);
    event.preventDefault();

    const information = GetInformation(informationId, formState);

    fetch("/api/informations", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(information),
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
          toast.success('Information gespeichert!', {
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
    fetch(`/api/informations/${ id }`, {
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
        });
        else {
          router.refresh();
          setIsDeleteLoading(false);
          setOpenPopover(-1);

          toast.success('Information gelöscht!', {
            position: "top-center",
            progress: undefined,
            theme: "light",
            closeOnClick: true,
            pauseOnHover: false
          });
        }
    });
  }

  let router = useRouter();

  let [openPopover, setOpenPopover] = useState(-1);
  let [isSaveLoading, setIsSaveLoading] = useState(false);
  let [isDeleteLoading, setIsDeleteLoading] = useState(false);

  let [informationId, setInformationId] = useState(-1);
  let [formState, setFormState] = useState(getEmptyState());

  let information = informationId === 0
    ? null
    : informations.find(r => r.id === informationId);


  return (
    <div>
      <ToastContainer/>
      <div className="flex flex-col-reverse md:flex-row mt-4">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <button onClick={ () => informationClickHandler(0) }><PlusIcon
              className="w-6 text-amber-500"></PlusIcon></button>
          </div>
          <table className="w-full mt-4 text-xs md:text-sm">
            <thead>
            <tr>
              <th className="text-left">Titel</th>
              <th className="text-left">Inhalt</th>
              <th className="text-left">Ausgeblendet</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            { informations
              .map(r =>
                     <tr key={ r.id } onClick={ () => informationClickHandler(r.id) }
                         className="border-b border-gray-300 hover:cursor-pointer h-10">
                       <td className="py-3">{ r.title }</td>
                       <td className="py-3">{ r.content }</td>
                       <td className="py-3">{ r.hide ? "Ja" : "Nein" }</td>
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
          "ml-4 flex flex-col",
          {
            "hidden": informationId === -1
          }
        ) } onSubmit={ submitForm } onReset={ () => informationClickHandler(informationId) }>
          <FormControl name="formTitle" type={ FormControlType.Text } state={ formState }
                       label="Titel" setState={ setFormState }/>

          <FormControl className="mt-4" name="formContent" type={ FormControlType.TextArea }
                       state={ formState }
                       label="Inhalt" setState={ setFormState }/>

          <FormControl className="mt-4" name="formHide" type={ FormControlType.Checkbox }
                       state={ formState }
                       label="Ausgeblendet" setState={ setFormState }/>

          <div className="flex flex-col mt-4">
            <button type="button" onClick={ () => setInformationId(-1) }
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
