import React,{useEffect,useState} from "react";
import './result.css'


function Result({resultData,selectedDestination,lineColor}){
    const [destinations,setDestinations] = useState(null)
    const [nextHoraires,setNextHoraires] = useState(null)
    useEffect(()=>{
        setDestinations([resultData.ligne.directionSens1,resultData.ligne.directionSens1])
        let horaires = resultData.horaires
        let horairesList=[]
        
        horaires.map((elm)=>{
            let date = new Date()
            let hour = elm.heure
            hour = +hour.slice(0,-1)
            let passages = elm.passages
            passages.map((pas)=>{ 
                if(typeof(+pas)!=='number'){
                    pas=pas.slice(0,-1)
                }
                let date2 = new Date()
                date2.setHours(hour)
                date2.setMinutes(pas)
                if(date2.getHours() === hour && date2.getMinutes()<pas || date2.getHours() < hour && horairesList.length<3){
                    horairesList.push(date2)
                }
            })
            
        })
        setNextHoraires(horairesList)

    },[resultData])
    console.log(nextHoraires)
    return(
        <div className="result-conatiner">
            <div className="horaires-cont">
                <button id="hor-btn">HORAIRES</button>
            </div>
            <div className="title-cont">
            <h4>Horaires pour l'arrêt {resultData.arret.libelle} de la ligne <span className="line-num" style={{backgroundColor:`#${lineColor}`}}>{resultData.ligne.numLigne}</span> vers {destinations==null?'':destinations[+selectedDestination.sens - 1]}</h4>
            </div>
            <div className="prochains-horaires-cont">

            </div>
        </div>
    )
}

export default Result