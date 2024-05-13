import React from "react";
import Select from 'react-select';

function SelectInp({options,isDisabled,onchageFunc,placeHolder}){

    const handleChange = (selectedOption)=>{
        onchageFunc(selectedOption.value)
    }
      return (
        <Select
        placeholder={placeHolder}
        options={options}
        isDisabled={isDisabled}
        onChange={handleChange}
        />
      )
}
export default SelectInp