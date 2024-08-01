export enum FormControlType {
  Text = 0,
  Number = 1,
  Checkbox = 2,
  Select = 3,
  TextArea = 4
}

export type FormControlSelectOption<V> = {
  name: string,
  value: V
}


export default function FormControl({
                                      type, name, label, state, required, className, setState,
                                      inputClassName, step, selectOptions
                                    }: {
  type: FormControlType,
  name: string,
  label: string,
  state: any,
  required?: boolean,
  className?: string,
  setState: (x: any) => void,
  inputClassName?: string,
  step?: number
  selectOptions?: FormControlSelectOption<any>[]
}) {
  function changeHandler(evt: any) {
    setState({
               ...state,
               [name]: { value: type === FormControlType.Checkbox ? evt.target.checked : evt.target.value }
             });
  }

  step = step ?? 1;
  className = className ?? "";
  inputClassName = inputClassName ?? (type === FormControlType.Select
    ? "form-select w-full bg-no-repeat appearance-none bg-transparent border-b border-b-gray-300 border-t-0 border-r-0 border-l-0 rounded-none text-xs md:text-sm"
    : "bg-transparent border-b border-b-gray-300 w-full min-w-full text-xs md:text-sm");

  if (type === FormControlType.Text)
    return (
      <div className={ className }>
        <label htmlFor={ name }
               className="block mb-1 text-xs font-medium text-gray-700">{ label } { required ? "*" : "" }</label>
        <input type="text" id={ name }
               value={ state[name].value } onChange={ changeHandler }
               className={ inputClassName }
               required={ required }/>
      </div>
    );

  if (type === FormControlType.Number)
    return (
      <div className={ className }>
        <label htmlFor={ name }
               className="block mb-1 text-xs font-medium text-gray-700">{ label } { required ? "*" : "" }</label>
        <input type="number" id={ name }
               step={step}
               value={ state[name].value } onChange={ changeHandler }
               className={ inputClassName }
               required={ required }/>
      </div>
    );

  if (type === FormControlType.Select) {
    if (selectOptions == null)
      throw new Error("selectOptions have to pe provided for type==Select")

    return (
      <div className={ className }>
        <label htmlFor={ name }
               className="block mb-1 text-xs font-medium text-gray-700">{ label } { required ? "*" : "" }</label>
        <select id={ name } value={ state[name].value }
                className={ inputClassName } onChange={ changeHandler }>
          {selectOptions.map(o => <option key={o.value} value={o.value}>{o.name}</option>)}
        </select>
      </div>
    );
  }
  
  if (type === FormControlType.Checkbox)
    return (
      <div className="flex mt-4">
        <input type="checkbox" id={name}
               checked={ state[name].value }
               onChange={changeHandler}
               className="mt-1 bg-transparent block border-b border-b-gray-300"/>
        <div className="ml-2 text-sm font-medium text-gray-700">{ label }</div>
      </div>
    )


  if (type === FormControlType.TextArea )
    return (
      <div className={ className }>
        <label htmlFor={ name }
               className="block mb-1 text-xs font-medium text-gray-700">{ label } { required ? "*" : "" }</label>
        <textarea id={ name }
               value={ state[name].value } onChange={ changeHandler }
               className={ inputClassName }
               required={ required }/>
      </div>
    );


}
