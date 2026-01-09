import { useState } from "react";
import "./App.css";
import Axios from "axios"; //Axios is just a JavaScript library to make HTTP requests (GET, POST, PUT, DELETE, etc.) to APIs.

function App() {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    // console.log(files[0]);
    // FormData = a virtual form object in JS used to package fields/files and send them to an API via fetch or axios
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_present", "testing-cloudinary");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dptyb1wme/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
      </div>
    </>
  );
}

export default App;
