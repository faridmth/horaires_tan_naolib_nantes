import React from "react";
import './nextHoraires.css'
import getTimeDifference from './functions'

function NextHoraires({nextHoraires}){
    
    return(
        <div className="hor-cont">
            {
               nextHoraires.length!==0 && nextHoraires.map((elm,index)=>(
                    <p key={index}>
                        <span>Bus {index + 1}:</span> dans <span>{getTimeDifference(new Date(), elm)}</span> Départ à <span>{ elm.getHours()}h{elm.getMinutes()<10?` 0${elm.getMinutes()}`:elm.getMinutes()}</span>
                    </p>

                ))
                
            }
            {
                nextHoraires.length===0 && <p>Il n'y a pas de bus à afficher ! :(</p>

            }
        </div>
        
    )
}



export default NextHoraires