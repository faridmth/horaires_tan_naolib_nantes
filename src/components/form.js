import React,{useEffect,useState} from "react";
import './form.css'
import './select'
import SelectInp from "./select";

function Form(){
      const [arretsData,setArretsData]=useState([])  
      const [linesOptions,setLinesOptions]=useState([])  
      const [selectedLine,setSelectedLine]=useState(null)
      const [arretOptions,setarretOptions]=useState([])
      const [selectedArret,setSelectedArret]=useState(null)


      useEffect(()=>{
        let  lignesWD=[]; 
        const numbers =[]
        const strings =[]
        const lignes=[]; 
        async function fetchData(){
            let data = await fetch('https://openv2-preprod.tan.fr/ewp/arrets.json')
                data = await data.json()
                setArretsData(data)
                data.map((arr)=>{
                    let lignearr =arr.ligne
                    lignearr.map((ligne)=>{
                        if(!numbers.includes(ligne.numLigne) && !isNaN(+ligne.numLigne)){
                            numbers.push(ligne.numLigne)
                        }else if(!strings.includes(ligne.numLigne) && isNaN(+ligne.numLigne)){
                            strings.push(ligne.numLigne)
                        }
                    })
                })
                numbers.sort((a, b) => +a - +b)
                strings.sort()
                lignesWD = numbers.concat(strings)
                lignesWD.map((lines)=>{
                    lignes.push({ value: lines, label: lines })
                })
            setLinesOptions(lignes)   
        }
        fetchData()
      },[])
      
      useEffect(()=>{
        let foundArretIndexes = [];
        let arrets = []
        arretsData.map((arr,index)=>{
            let lignes = arr.ligne
            lignes.map((linesList)=>{
                if(linesList.numLigne==selectedLine){
                    foundArretIndexes.push(index)
                }
            })
        })
        foundArretIndexes.map((index)=>{
            arrets.push({value: arretsData[index].codeLieu, label: arretsData[index].libelle })
        })
        setarretOptions(arrets)
        
      },[selectedLine])


      
      



//                  

    return (
        <div >
            <h2>Rechercher ma ligne</h2>
            <SelectInp options={linesOptions} onchageFunc={setSelectedLine} isDisabled={false} placeHolder={'Cliquez ici pour sélectionner une ligne'}/>
            <SelectInp key={selectedLine} options={arretOptions} onchageFunc={setSelectedArret} isDisabled={selectedLine===null?true:false} placeHolder={'Cliquez ici pour sélectionner une arret'}/>
        </div>
    )
}

export default Form