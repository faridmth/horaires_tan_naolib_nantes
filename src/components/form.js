import React,{useEffect,useState} from "react";
import './form.css';
import './select'
import SelectInp from "./select";

function Form({setSelectedDestination,setShowResults}){
      const [arretsData,setArretsData]=useState([])  
      const [linesOptions,setLinesOptions]=useState([])  
      const [selectedLine,setSelectedLine]=useState(null)
      const [arretOptions,setarretOptions]=useState([])
      const [selectedArret,setSelectedArret]=useState(null)
      const [tempsattenteData,setTempsattenteData]=useState(null)
      const [directionsOptions,setDirectionsOptions]=useState([])
      const [selectedSens,setSelectedSens]=useState(null)


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
                  if(lines === "1"){
                    lignes.push({ value: lines, label: 'tram 1' })
                  }else if(lines === "2"){
                    lignes.push({ value: lines, label: 'tram 2' })
                  }
                  else if(lines === "3"){
                    lignes.push({ value: lines, label: 'tram 3' })
                  }
                  else if(lines === "4"){
                    lignes.push({ value: lines, label: 'Busway L4' })
                  }
                  else if(lines === "5"){
                    lignes.push({ value: lines, label: 'Busway L5' })
                  }
                  else if(lines === "NA"){
                    lignes.push({ value: lines, label: 'Navette Aéroport' })
                  }
                  else if(lines === "N1"){
                    lignes.push({ value: lines, label: 'N1 - Navibus Loire' })
                  }
                  else if(lines === "N2"){
                    lignes.push({ value: lines, label: 'N2 - Navibus Loire' })
                  }
                  else if(lines === "N3"){
                    lignes.push({ value: lines, label: "N3 - Navibus Passeur de l'Erdre" })
                  }
                  else{
                    lignes.push({ value: lines, label: `Bus ${lines}` })
                  }
                })
            setLinesOptions(lignes)   
            console.log(lignes)
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
        setSelectedArret(null)
        setSelectedSens(null)

        
      },[selectedLine])

      useEffect(()=>{
        async function fetchData(){
            let data = await fetch(`https://open.tan.fr/ewp/tempsattente.json/${selectedArret}`)
            data = await data.json() 
            console.log(data)

            setTempsattenteData(data)
            }

        if(selectedArret){
            fetchData()
        }

      },[selectedArret])
      
      useEffect(()=>{
        if (tempsattenteData !== null) {
            let sens1 = { label: 'Sens 1', options: [] };
            let sens2 = { label: 'Sens 2', options: [] };
          
            tempsattenteData.forEach((elm, index) => {
              let isDuplicateSens1 = sens1.options.some((elm2) => elm.terminus === elm2.label);
              let isDuplicateSens2 = sens2.options.some((elm2) => elm.terminus === elm2.label);
          
              if (elm.sens === 1 && !isDuplicateSens1 && elm.ligne.numLigne==`${selectedLine}`) {
                sens1.options.push({ value: index, label: elm.terminus });
              } else if (elm.sens === 2 && !isDuplicateSens2 && elm.ligne.numLigne==`${selectedLine}`) {
                sens2.options.push({ value: index, label: elm.terminus });
              }
            });

            setDirectionsOptions([sens1, sens2]);
            setSelectedSens(null)
            
          }
        
      },[tempsattenteData])

      useEffect(()=>{
        if(selectedSens!==null){
            setSelectedDestination(tempsattenteData[selectedSens])
        }
      },[selectedSens])

      const clickHandler = ()=>{
        setShowResults(true)
      }


    return (
        <div className="form-container">
            <div id="title">
              <h2>Rechercher ma ligne</h2>
              <span></span>
            </div>
            <SelectInp options={linesOptions} onchageFunc={setSelectedLine} isDisabled={false} placeHolder={'Cliquez ici pour sélectionner une ligne'}/>
            <SelectInp key={selectedLine + '66'} options={arretOptions} onchageFunc={setSelectedArret} isDisabled={selectedLine===null?true:false} placeHolder={'Cliquez ici pour sélectionner une arret'}/>
            <SelectInp key={selectedArret + '99'} options={directionsOptions} onchageFunc={setSelectedSens} isDisabled={selectedArret===null?true:false} placeHolder={'Cliquez ici pour sélectionner une destination'}/>
            <button className="submit-btn" onClick={clickHandler} disabled={selectedSens===null?true:false} style={{backgroundColor:selectedSens==null?'#919191':'#141529',cursor:selectedSens==null?'not-allowed':'pointer'}}>LANCER LA RECHERCHE</button>
        </div>
    )
}

export default Form