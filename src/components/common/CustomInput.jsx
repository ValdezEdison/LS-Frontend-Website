
const CustomInput=({ label='',min='',max='', type='',name="",id='',accept="", placeholder="", value,onFocus=()=>{},onBlur=()=>{} ,onClick=()=>{}, onChange=()=>{},onKeyDown = () => {}, className='' ,isReadOnly=false, checked=false, autoComplete="off", disabled=false})=>{

    return(
        <>
        {label && (<label>{label}</label>)}
        <input
        type={type}
        accept={accept}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        className={className}
        name={name}
        readOnly={isReadOnly}
        id={id}
        checked={checked}
        // autoComplete={autoComplete}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete="new-password"
    
      />
      </>
    )
 
}
export default CustomInput
