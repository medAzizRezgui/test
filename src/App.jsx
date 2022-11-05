import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookmarks from "./components/Bookmarks";

function App() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      await axios
        .post(
          "https://addslice.com/api/user",
          { timeZone: "Europe/Berlin" },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        )
        .then((r) => setUsers(r.data.data));
      setLoading(false);
    };
    getUsers();
  }, []);

  if (loading) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  return (
    !loading && (
      <div className="App">
        <h1>Slices</h1>
        <h1>{users?.user?.txs["2022-11-04"][0].slices}</h1>
        <Bookmarks />
      </div>
    )
  );
}

export default App;
