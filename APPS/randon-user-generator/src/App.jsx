import "./App.css";
import { getRandomUser } from "./api/index";
import React, { useState, useEffect } from "react";
import UserCards from "./components/UserCards";

function App() {
  const [userData, setUserData] = useState(null);

  async function fetchUser() {
    const user = await getRandomUser();
    setUserData(user.results[0]);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // console.log(userData)

  return (
    <>
      {userData && <UserCards data={userData} />}
      <button onClick={fetchUser}>Refresh</button>
    </>
  );
}

export default App;
