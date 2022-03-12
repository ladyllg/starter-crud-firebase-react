import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import {useState, useEffect} from "react";
import { db } from "./firebase-config";
function App() {
  const [humans, setHumans] = useState([]);
  const humansCollectionRef = collection(db, "humans");
  useEffect(() => {
    const getHumans = async() => {
      const data = await getDocs(humansCollectionRef);
      setHumans(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getHumans();
  }, [])

  return (
    <div className="App"> 
      { humans.map((human)=>{
        return (
          <div key={human.id}>
            <li>{human.name} {human.surname} - {human.age}</li>
          </div>
        );
      }) }
    </div>
  );
}

export default App;
