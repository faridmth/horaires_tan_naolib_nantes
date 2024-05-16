import React from "react";
import Select from 'react-select';
import './select.css'

function SelectInp({options,isDisabled,onchageFunc,placeHolder}){

    const handleChange = (selectedOption)=>{
        onchageFunc(selectedOption.value)
    }

    const costumStyles = {
      menuList : (pre)=>({
        ...pre,
        maxHeight : '200px'
      }),
      control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? '1px solid #ced4da' : '1px solid #ced4da',
        boxShadow: 'none',
        '&:hover': {
          border: state.isFocused ? '1px solid #ced4da' : '1px solid #adb5bd',
        },
        fontSize : '15px'

      }),

    }



      return (
        <Select
        className="select-inp"
        placeholder={placeHolder}
        options={options}
        isDisabled={isDisabled}
        onChange={handleChange}
        styles={costumStyles}
        />
      )
}
export default SelectInp