import './App.css';
import Form from './components/form.js'
import Result from './components/result.js';
import { useEffect, useState } from 'react';


function App() {
  const [selectedDestination,setSelectedDestination]=useState(null)
  const[resultData,setResultData]=useState(null)
  const [showResults,setShowResults]=useState(false)
  const [lineColor,setLineColor]=useState(false)
  const [refrechData,setRefrechData]=useState(3)

  useEffect(()=>{
    async function fetchData(){
      let data = await fetch(`https://open.tan.fr/ewp/horairesarret.json/${selectedDestination.arret.codeArret}/${selectedDestination.ligne.numLigne}/${selectedDestination.sens}/2024-05-15`)
      data = await data.json()
      setResultData(data)
    }
    if(selectedDestination){
      fetchData()
    }

  },[selectedDestination,refrechData])
  useEffect(()=>{
    async function fetchData(){
      let data = await fetch(`https://nantesmetropole.opendatasoft.com/api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?limit=100&refine=route_short_name%3A"${resultData.ligne.numLigne}"`)
      data = await data.json()
      setLineColor(data.results[0].route_color)
    }
    if(resultData){
      fetchData()
    }
  },[resultData])
  
  return (
    <div className='main-container'>
    {! showResults && <Form setSelectedDestination={setSelectedDestination} setShowResults={setShowResults}/>}
    {showResults && resultData && <Result resultData={resultData} selectedDestination={selectedDestination} lineColor={lineColor} setShowResults={setShowResults} setRefrechData={setRefrechData} setResultData={setResultData}/>}
   </div>
  )
}

export default App;
