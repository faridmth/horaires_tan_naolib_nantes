import React,{useEffect,useState} from "react";
import './result.css'
import NextHoraires from './nextHoraires' 
import refreshIcon from './images/refresh-icon.png'
import AllHoraires from './AllHoraires'


function Result({resultData,selectedDestination,lineColor,setShowResults,setRefrechData,setResultData}){
    const [destinations,setDestinations] = useState(null)
    const [nextHoraires,setNextHoraires] = useState(null)
    const [showAllHoraires,setShowAllHoraires]=useState(false)
    useEffect(()=>{
        setDestinations([resultData.ligne.directionSens1,resultData.ligne.directionSens1])
        let horaires = resultData.horaires
        let horairesList=[]
        //console.log(horaires)
        let date = new Date()

        horaires.map((elm)=>{
            let hour = elm.heure
            hour = +hour.slice(0,-1)
            let passages = elm.passages
            passages.map((pas)=>{ 
                let fridayCheck = true
                let date2 = new Date()
                if(pas.includes('v')){
                    if(date.getDay()===5){
                        fridayCheck=true
                    }else{
                        fridayCheck= false
                    }
                }
                if(isNaN(+pas)){
                    pas=pas.slice(0,-1)
                }
                pas=Number(pas)
                date2.setHours(hour)
                date2.setMinutes(pas)
                if(date.getTime()<date2.getTime() && horairesList.length<3 &&fridayCheck){
                    horairesList.push(date2)
                }
                //console.log(date)
                //console.log(date2)
            })
            
        })
        setNextHoraires(horairesList)

    },[resultData])
    const clickHandler =()=>{
        setShowResults(false)
    }
    const refreshHandler =async ()=>{
        await setResultData(null)
        await setRefrechData(Math.random())

    }
    const showAllhorairesHandler = async()=>{
        await setRefrechData(Math.random())
        setShowAllHoraires(true)
    }

    return(
        <div className="result-conatiner">
            {showAllHoraires&&<AllHoraires resultData={resultData} setShowAllHoraires={setShowAllHoraires} setRefrechData={setRefrechData} setResultData={setResultData}/>}
            <div className="horaires-cont">
                {resultData.horaires.length>0&&<button id="hor-btn" onClick={showAllhorairesHandler}>HORAIRES</button>}
                <img src={refreshIcon} alt="refresh" onClick={refreshHandler}/>
            </div>
            <div className="title-cont">
            <h4>Horaires pour l'arrêt {resultData.arret.libelle} de la ligne <span className="line-num" style={{backgroundColor:`#${lineColor}`}}>{resultData.ligne.numLigne}</span> vers {destinations==null?'':destinations[+selectedDestination.sens - 1]}</h4>
            </div>
            <div className="prochains-horaires-cont">
                {nextHoraires && <NextHoraires nextHoraires={nextHoraires}/>}
            </div>
            <div className="btn-cont">
                <button onClick={clickHandler} className="btn-re-search">Rechercher une nouvelle ligne</button>
            </div>
        </div>
    )
}

export default Result