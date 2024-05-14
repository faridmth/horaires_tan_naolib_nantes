import './App.css';
import Form from './components/form.js'
import Result from './components/result.js';
import { useEffect, useState } from 'react';


function App() {
  const [selectedDestination,setSelectedDestination]=useState(null)
  const[resultData,setResultData]=useState([])
  const [showResults,setShowResults]=useState(false)

  useEffect(()=>{
    async function fetchData(){
      let data = await fetch(`https://open.tan.fr/ewp/horairesarret.json/${selectedDestination.arret.codeArret}/${selectedDestination.ligne.numLigne}/${selectedDestination.sens}`)
      data = await data.json()
      setResultData(data)
    }


    if(selectedDestination){
      fetchData()
    }

  },[selectedDestination])
  
  return (
    <div>
    {! showResults && <Form setSelectedDestination={setSelectedDestination} setShowResults={setShowResults}/>}
    {showResults && <Result resultData={resultData} />}
   </div>
  )
}

export default App;
