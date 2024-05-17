import React, { useEffect, useState } from "react";
import './allHoraires.css'
import cross from './images/cross.png'

function AllHoraires({resultData,setShowAllHoraires,setRefrechData}){
    const [allHoraires,setAllHoraires]=useState(null)

    useEffect(()=>{
        let horaires = resultData.horaires
        setAllHoraires(horaires)
    },[resultData])
    const closeHandle = ()=>{
        setRefrechData(Math.random())
        setShowAllHoraires(false)

    }

    return(
        <div className="all-horaires-cont">
            <img src={cross} alt="close icon"  className="close-icon" onClick={closeHandle}/>
            {
                allHoraires&&allHoraires.map((elm,index)=>(
                    <div className="line" key={index}>
                        <p className="heure">{elm.heure}</p>
                        <div className="passages">
                            {
                                elm.passages.map((elm,index)=>(
                                    <p className="minute" key={index}>{elm}</p>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            <div className="note-cont">
                {
                 resultData.notes.length>0&&resultData.notes.map((elm)=>(
                        <p>{elm.code}: {elm.libelle}</p>
                    ))
                 }
            </div>
        </div>
    )
}

export default AllHoraires














