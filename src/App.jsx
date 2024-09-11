import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Checkbox from './Checkbox'
function App() {
  const response = [
    {
      parent: {
        child1: "tree",
        child2: "",
        child3: "river",
      },
    },
    {
      parent: {
        child1: "car",
        child2: "bike",
        child3: "",
      },
    },
    {
      parent: {
        child1: "apple",
        child2: "banana",
        child3: "grape",
      },
    },
  ];
  
   
 
  return (
    <>
   
       <Checkbox response={response} /> 
    </>
  )
}

export default App
