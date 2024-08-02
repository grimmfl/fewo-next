import { InternalDate, years } from "@/app/lib/dateutils";
import { Dispatch, SetStateAction, useState } from "react";
import type { reservation } from "@prisma/client";
import { getLocalStorage, mapInvoiceType, ValueOrNull } from "@/app/lib/utils";
import { currency } from "@/app/lib/currency";
import Datepicker from "react-tailwindcss-datepicker";
import FormControl, { FormControlType } from "@/app/ui/form/formControl";
import clsx from "clsx";
import { useRouter } from 'next/navigation'
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Popover } from "react-tiny-popover";
import {
  CurrencyEuroIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import LoadingButton from "@/app/ui/loading/loadingButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const currentYear = new Date().getFullYear();

type ReservationForm = {
  formName: { value: string },
  formNote: { value: string},
  formCount: { value: string },
  formPrice: { value: string },
  formEmail: { value: string },
  formPhone: { value: string },
  formNationality: { value: string },
  formStreet: { value: string },
  formHouseNumber: { value: string },
  formZip: { value: string },
  formCity: { value: string },
  formCountry: { value: string },
  formInvoiceType: { value: string },
  formInvoiceNumber: { value: string },
  formIsSameAsNormal: { value: number },
  formInvoiceStreet: { value: string },
  formInvoiceHouseNumber: { value: string },
  formInvoiceZip: { value: string },
  formInvoiceCity: { value: string },
  formInvoiceCountry: { value: string },
  formCompany: { value: string },
}

function getEmptyState(): ReservationForm {
  return {
    formName: { value: "" },
    formNote: { value: "" },
    formCount: { value: "" },
    formPrice: { value: "" },
    formEmail: { value: "" },
    formPhone: { value: "" },
    formNationality: { value: "" },
    formStreet: { value: "" },
    formHouseNumber: { value: "" },
    formZip: { value: "" },
    formCity: { value: "" },
    formCountry: { value: "" },
    formInvoiceType: { value: "0" },
    formInvoiceNumber: { value: "" },
    formIsSameAsNormal: { value: 0 },
    formInvoiceStreet: { value: "" },
    formInvoiceHouseNumber: { value: "" },
    formInvoiceZip: { value: "" },
    formInvoiceCity: { value: "" },
    formInvoiceCountry: { value: "" },
    formCompany: { value: "" }
  };
}

function fillState(state: ReservationForm, reservation: reservation) {
  state.formName.value = reservation.name;
  state.formNote.value = reservation.note;
  state.formCount.value = (reservation.count ?? 0).toString();
  state.formPrice.value = (reservation.price ?? 0).toString();
  state.formEmail.value = reservation.email ?? "";
  state.formPhone.value = reservation.phone ?? "";
  state.formNationality.value = reservation.nationality ?? "";
  state.formStreet.value = reservation.street ?? "";
  state.formHouseNumber.value = reservation.house_number ?? "";
  state.formZip.value = reservation.postal_code ?? "";
  state.formCity.value = reservation.city ?? "";
  state.formCountry.value = reservation.country ?? "";
  state.formInvoiceType.value = reservation.invoice_type.toString();
  state.formInvoiceNumber.value = reservation.invoice_number ?? "";
  state.formIsSameAsNormal.value = reservation.is_same_as_normal;
  state.formInvoiceStreet.value = reservation.billing_street ?? "";
  state.formInvoiceHouseNumber.value = reservation.billing_house_number ?? "";
  state.formInvoiceZip.value = reservation.billing_postal_code ?? "";
  state.formInvoiceCity.value = reservation.billing_city ?? "";
  state.formInvoiceCountry.value = reservation.billing_country ?? "";
  state.formCompany.value = reservation.company_name ?? "";
}

function GetReservation(
  id: number,
  form: ReservationForm,
  dateFrom: InternalDate,
  dateTo: InternalDate
): reservation {
  return {
    id: id,
    date_from: dateFrom.toString(),
    date_to: dateTo.toString(),
    name: form.formName.value,
    note: form.formNote.value,
    count: form.formCount.value == "" ? null : parseInt(form.formCount.value, 10),
    price: form.formPrice.value == "" ? null : parseFloat(form.formPrice.value),
    email: ValueOrNull(form.formEmail.value),
    phone: ValueOrNull(form.formPhone.value),
    nationality: ValueOrNull(form.formNationality.value),
    street: ValueOrNull(form.formStreet.value),
    house_number: ValueOrNull(form.formHouseNumber.value),
    postal_code: ValueOrNull(form.formZip.value),
    city: ValueOrNull(form.formCity.value),
    country: ValueOrNull(form.formCountry.value),
    invoice_type: parseInt(form.formInvoiceType.value, 10),
    invoice_number: ValueOrNull(form.formInvoiceNumber.value),
    is_same_as_normal: form.formIsSameAsNormal.value ? 1 : 0,
    billing_street: ValueOrNull(form.formInvoiceStreet.value),
    billing_house_number: ValueOrNull(form.formInvoiceHouseNumber.value),
    billing_postal_code: ValueOrNull(form.formInvoiceZip.value),
    billing_city: ValueOrNull(form.formInvoiceCity.value),
    billing_country: ValueOrNull(form.formInvoiceCountry.value),
    company_name: ValueOrNull(form.formCompany.value),
    invoice_date: null
  };
}

export default function Reservations({ reservations }: { reservations: reservation[] }) {
  function yearChangeHandler(event: any) {
    setYear(parseInt(event.target.value, 10));
  }

  function dateChangeHandler(event: any) {
    setDateFromInternal(InternalDate.fromString(event.startDate));
    setDateToInternal(InternalDate.fromString(event.endDate));
  }

  function reservationClickHandler(id: number) {
    setReservationId(id);

    if (id === 0) {
      setDateFromInternal(null);
      setDateToInternal(null);
      setFormState(getEmptyState());
      return;
    }

    const r = reservations.find(r => r.id === id);
    setDateFromInternal(InternalDate.fromString(r!.date_from));
    setDateToInternal(InternalDate.fromString(r!.date_to));
    const newState = getEmptyState();
    fillState(newState, r!);
    setFormState(newState);
  }

  function submitForm(event: any) {
    setIsSaveLoading(true);
    event.preventDefault();

    const res = GetReservation(reservationId, formState, dateFromInternal!, dateToInternal!);

    fetch("/api/reservations", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(res),
      headers: {
        "Token": getLocalStorage("token") ?? ""
      }
    })
    .then(r => r.json())
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
        setIsSaveLoading(false);
        toast.success('Reservierung gespeichert!', {
          position: "top-center",
          progress: undefined,
          theme: "light",
          closeOnClick: true,
          pauseOnHover: false
        });
        setReservationId(-1);
      }
    });
  }

  function generateInvoice(id: number) {
    setIsInvoiceLoading(true);
    fetch(`/api/reservations/${ id }/invoice`, {
      cache: "no-store",
      method: "GET",
      headers: {
        token: getLocalStorage("token") ?? ""
      }
    })
      .then(r => r.json())
      .then(r => {
        setIsInvoiceLoading(false);

        if (!r) {
          alert("Keine Rechnung für diesen Rechnungstyp.")
          return;
        }

        window.open("/Invoice.pdf");
        router.refresh();
      });
  }

  function generateRegistrationForm(id: number) {
    setIsRegistrationFormLoading(true);
    fetch(`/api/reservations/${ id }/registrationForm`, {
      cache: "no-store",
      method: "GET",
      headers: {
        token: getLocalStorage("token") ?? ""
      }
    }).then(r => {
      if (!r.json()) return;
      window.open("/RegistrationForm.pdf");
      setIsRegistrationFormLoading(false);
    });
  }

  function duplicate(id: number) {
    const reservation = reservations.find(r => r.id === id);

    const state = getEmptyState();
    fillState(state, reservation!);

    setReservationId(0);
    setFormState(state);
  }

  function deleteRegistration(id: number) {
    setIsDeleteLoading(true);
    fetch(`/api/reservations/${ id }`, {
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

          toast.success('Reservierung gelöscht!', {
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

  let [year, setYear] = useState(currentYear);
  let [reservationId, setReservationId] = useState(-1);
  let [formState, setFormState] = useState(getEmptyState());

  let reservation = reservationId === 0
    ? null
    : reservations.find(r => r.id === reservationId);

  let dateFromInit = reservation != null ? InternalDate.fromString(reservation.date_from) : null;
  let dateToInit = reservation != null ? InternalDate.fromString(reservation.date_to) : null;

  let [dateFromInternal, setDateFromInternal] = useState(dateFromInit);
  let [dateToInternal, setDateToInternal] = useState(dateToInit);

  let startDate = dateFromInternal != null ? dateFromInternal.toJsDate() : null;
  let endDate = dateToInternal != null ? dateToInternal.toJsDate() : null;

  let [openPopover, setOpenPopover] = useState(-1);
  let [isSaveLoading, setIsSaveLoading] = useState(false);
  let [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  let [isRegistrationFormLoading, setIsRegistrationFormLoading] = useState(false);
  let [isDeleteLoading, setIsDeleteLoading] = useState(false);

  return (
    <div>
      <ToastContainer/>
      <div className="flex flex-col-reverse md:flex-row mt-4">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <select value={ year }
                    className="form-select bg-no-repeat appearance-none bg-transparent border-b-2 border-b-amber-500 border-t-0 border-r-0 border-l-0 rounded-none w-36"
                    onChange={ yearChangeHandler }>
              { years.map((year, idx) =>
                            <option key={ idx } value={ year }>{ year }</option>) }
            </select>

            <button onClick={ () => reservationClickHandler(0) }><PlusIcon
              className="w-6 text-amber-500"></PlusIcon></button>
          </div>
          <table className="w-full mt-4 text-xs md:text-sm">
            <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Von</th>
              <th className="text-left">Bis</th>
              <th className="text-left">Rechnungstyp</th>
              <th className="text-right">Preis</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            { reservations
              .filter(
                r => r.date_from.startsWith(year.toString()) || r.date_to.startsWith(
                  year.toString()))
              .sort(((a, b) => InternalDate.fromString(a.date_from)
                                           .lessThan(
                                             InternalDate.fromString(b.date_from)) ? -1 : 1))
              .map(r =>
                     <tr key={ r.id } onClick={ () => reservationClickHandler(r.id) }
                         className="border-b border-gray-300 hover:cursor-pointer h-10">
                       <td className="py-3"><b>{ r.name }</b>
                         <div className={ clsx({
                           "hidden": r.note == null || r.note === ""
                                               })}>
                           <br/>{r.note}
                         </div>
                       </td>
                       <td className="w-24">{ InternalDate.fromString(r.date_from)
                                                          .toPrettyString() }</td>
                       <td className="w-24">{ InternalDate.fromString(r.date_to)
                                                          .toPrettyString() }</td>
                       <td>{ mapInvoiceType(r.invoice_type) }</td>
                       <td className="text-right">{ r.price != null ? currency(r.price) : "" }</td>
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
                                 isLoading={ isInvoiceLoading } onClick={ (evt) => {
                                 evt.stopPropagation();
                                 generateInvoice(r.id);
                               } }><CurrencyEuroIcon className="w-6 mr-2"/>Rechnung</LoadingButton>
                               <LoadingButton
                                 buttonClassName="py-2 px-5 text-left hover:bg-amber-100 flex"
                                 isLoading={ isRegistrationFormLoading } onClick={ (evt) => {
                                 evt.stopPropagation();
                                 generateRegistrationForm(r.id);
                               } }><DocumentIcon className="w-6 mr-2"/>Meldeschein</LoadingButton>
                               <button className="py-2 px-5 text-left hover:bg-amber-100 flex"
                                       onClick={ (evt) => {
                                         evt.stopPropagation();
                                         duplicate(r.id);
                                         setOpenPopover(-1)
                                       } }><DocumentDuplicateIcon className="w-6 mr-2"/>Duplizieren
                               </button>
                               <LoadingButton
                                 buttonClassName="py-2 px-5 text-left hover:bg-amber-100 flex"
                                 isLoading={ isDeleteLoading } onClick={ (evt) => {
                                 evt.stopPropagation();
                                 deleteRegistration(r.id);
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
          "ml-4 flex flex-col mb-10 md:mb-0",
          {
            "hidden": reservationId === -1
          }
        ) } onSubmit={ submitForm } onReset={ () => reservationClickHandler(reservationId) }>
          <FormControl name="formName" type={ FormControlType.Text } state={ formState }
                       label="Name" setState={ setFormState } required/>

          <FormControl name="formNote" type={ FormControlType.TextArea } state={ formState }
                       label="Notiz" setState={ setFormState } required/>

          <div className="mt-4">
            <label htmlFor="formDates"
                   className="block mb-1 text-xs font-medium text-gray-700">Von - Bis *</label>
            <Datepicker inputClassName="bg-transparent text-sm"
                        displayFormat="DD.MM.YYYY"
                        separator="-"
                        containerClassName="relative w-full text-gray-700 border-b border-b-gray-300"
                        value={ { startDate: startDate, endDate: endDate } }
                        onChange={ dateChangeHandler }/>
          </div>

          <div className="flex mt-4">
            <FormControl className="mr-2" type={ FormControlType.Number } name="formCount"
                         label="Anzahl" state={ formState } setState={ setFormState }></FormControl>

            <FormControl type={ FormControlType.Number } name="formPrice" label="Preis"
                         state={ formState } step={0.01} setState={ setFormState }></FormControl>
          </div>

          <FormControl className="mt-4" type={ FormControlType.Text } name="formEmail" label="Email"
                       state={ formState } setState={ setFormState }/>

          <FormControl className="mt-4" type={ FormControlType.Text } name="formPhone"
                       label="Telefonnummer" state={ formState } setState={ setFormState }/>

          <FormControl className="mt-4" type={ FormControlType.Text } name="formNationality"
                       label="Nationalität" state={ formState } setState={ setFormState }/>

          <div className="flex mt-4">
            <FormControl className="mr-2" type={ FormControlType.Text } name="formStreet"
                         label="Straße" state={ formState } setState={ setFormState }/>

            <FormControl inputClassName="w-20 bg-transparent block border-b border-b-gray-300 text-xs md:text-sm"
                         type={ FormControlType.Text } name="formHouseNumber" label="Hausnummer"
                         state={ formState } setState={ setFormState }/>
          </div>

          <div className="flex mt-4">
            <FormControl className="mr-2"
                         inputClassName="w-20 bg-transparent block border-b border-b-gray-300 text-xs md:text-sm"
                         type={ FormControlType.Text } name="formZip" label="Postleitzahl"
                         state={ formState } setState={ setFormState }/>

            <FormControl type={ FormControlType.Text } name="formCity" label="Ort"
                         state={ formState } setState={ setFormState }/>
          </div>

          <FormControl className="mt-4" type={ FormControlType.Text } name="formCountry"
                       label="Land" state={ formState } setState={ setFormState }/>

          <FormControl className="mt-4" type={ FormControlType.Select } name="formInvoiceType"
                       label="Rechnungstyp" selectOptions={ [
            { name: "", value: 0 },
            { name: "Standard", value: 1 },
            { name: "Booking", value: 2 },
            { name: "AirBnb", value: 3 },
          ] } state={ formState } setState={ setFormState }/>

          <FormControl className="mt-4" type={ FormControlType.Text } name="formInvoiceNumber"
                       label="Rechnungsnummer" state={ formState } setState={ setFormState }/>

          <FormControl className="mt-4" type={ FormControlType.Checkbox } name="formIsSameAsNormal"
                       label="Rechnungsadresse entspricht normaler Adresse" state={ formState }
                       setState={ setFormState }/>

          <div className={ clsx({
                                  "hidden": formState.formIsSameAsNormal.value
                                }) }>
            <b className="mt-4">Rechnungsadresse</b>

            <div className="flex mt-4">
              <FormControl className="mr-2" type={ FormControlType.Text } name="formInvoiceStreet"
                           label="Straße" state={ formState } setState={ setFormState }/>

              <FormControl inputClassName="w-20 bg-transparent block border-b border-b-gray-300 text-xs md:text-sm"
                           type={ FormControlType.Text } name="formInvoiceHouseNumber"
                           label="Hausnummer"
                           state={ formState } setState={ setFormState }/>
            </div>
            <div className="flex mt-4">
              <FormControl className="mr-2"
                           inputClassName="w-20 bg-transparent block border-b border-b-gray-300 text-xs md:text-sm"
                           type={ FormControlType.Text } name="formInvoiceZip"
                           label="Postleitzahl"
                           state={ formState } setState={ setFormState }/>

              <FormControl type={ FormControlType.Text } name="formInvoiceCity" label="Ort"
                           state={ formState } setState={ setFormState }/>
            </div>

            <FormControl className="mt-4" type={ FormControlType.Text } name="formInvoiceCountry"
                         label="Land" state={ formState } setState={ setFormState }/>

            <FormControl className="mt-4" type={ FormControlType.Text } name="formCompany"
                         label="Firma" state={ formState } setState={ setFormState }/>
          </div>

          <div className="flex flex-col mt-4">
            <button type="button" onClick={ () => setReservationId(-1) }
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
