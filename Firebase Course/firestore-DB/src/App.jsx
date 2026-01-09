import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  deleteField
} from "firebase/firestore";
import "./App.css";
import { app } from "./config/firestore";

const firestore = getFirestore(app);

function App() {
  // created a new collection named cities
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "Lahore",
      pincode: 42000,
      lat: 31,
      long: 74,
    });
    console.log("Result", result);
  };

  // creating a new collection within cities aka subcollection

  const makeSubCollection = async () => {
    const result = await addDoc(
      collection(firestore, "cities/0iIFwdeclKtbvJ91XNpG/places"),
      {
        name: "Badshahi Mosque",
        description:
          "The Badshahi Mosque is a Mughal-era imperial mosque located in Lahore, Punjab, Pakistan. It was constructed between 1671 and 1673 during the rule of Aurangzeb, opposite of the Lahore Fort on the northern outskirts of the historic Walled City.",
      }
    );
    console.log("Result", result);
  };

  // reading just one document with known id

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "0iIFwdeclKtbvJ91XNpG");
    const snap = await getDoc(ref);

    console.log(snap.data());
  };

  // Querying the firestore DB

  const getDocumentByQuery = async () => {
    const citiesRef = collection(firestore, "users");
    const q = query(citiesRef, where("isFemale", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // updating the firestore DB

  const updateDocument = async () => {
    const cityRef = doc(firestore, "cities", "0iIFwdeclKtbvJ91XNpG");

    await updateDoc(cityRef, {
      name: "Lahore",
    });
  };

  const deleteaField = async()=>{
     const cityRef = doc(firestore, "cities", "0iIFwdeclKtbvJ91XNpG");

    await updateDoc(cityRef, {
      pincode: deleteField()
    });
  }

  return (
    <>
      <h1>Firestore Database</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollection}>Put SubData</button>
      <button onClick={getDocument}>Get a Document</button>
      <button onClick={getDocumentByQuery}>Get Documents By Query</button>
      <button onClick={updateDocument}>Update Document</button>
      <button onClick={deleteaField}>Delete a Field</button>
    </>
  );
}

export default App;
