import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from "./config/firebase";
import { getDocs } from 'firebase/firestore'
 

function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
  async function getMovieList(){
    // read the data from db
    // set the movieList to be equal to that db data
  }
  },[])
  

  return (
    <>
      <Auth/>
    </>
  )
}

export default App
