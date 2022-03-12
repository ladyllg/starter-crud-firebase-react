import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {useState, useEffect} from "react";
import { db } from "./firebase-config";
function App() {
  const [newName, setNewName] = useState("")
  const [newSurname, setNewSurname] = useState("")
  const [newAge, setNewAge] = useState(0)

  const [humans, setHumans] = useState([]);
  const humansCollectionRef = collection(db, "humans")

  const createHuman = async() => {
    await addDoc(humansCollectionRef, {name:newName, surname:newSurname, age:Number(newAge)})
  };

  const deleteHuman = async(id) => {
    const humanDoc = doc(db,"humans",id);
    await deleteDoc(humanDoc);
  };

  useEffect(() => {
    const getHumans = async() => {
      const data = await getDocs(humansCollectionRef);
      setHumans(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getHumans();
  }, [])

  return (
    <div className="App"> 
      <input placeholder="Name..." onChange={(event)=>{setNewName(event.target.value)}}/>
      <input placeholder="Surname..." onChange={(event)=>{setNewSurname(event.target.value)}}/>
      <input type="number" placeholder="Age..." onChange={(event)=>{setNewAge(event.target.value)}}/>
      <button onClick={createHuman}>New Entry</button>
      { humans.map((human)=>{
        return (
          <div key={human.id}>
            <li>{human.name} {human.surname} - {human.age} <button onClick={(event)=>{deleteHuman(human.id)}}>Delete</button></li>
          </div>
        );
      }) }
    </div>
  );
}

export default App;
