import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [grade, setGrade] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    let url = new URL(document.location).searchParams;
    setToken(url.get("ltik"));
  });

  function sendGrade() {
    fetch("http://35.168.15.98:4000/grade", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ltik: token, grade }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <label>
        <span>Calificación</span>
        <input
          onChange={(e) => setGrade(e.target.value)}
          value={grade}
          type="number"
        />
      </label>

      <button onClick={sendGrade}>grade!</button>
    </div>
  );
}
