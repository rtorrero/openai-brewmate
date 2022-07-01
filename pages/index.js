import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [styleInput, setStyleInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    console.log("style input: ", styleInput);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ style: styleInput }),
    });
    const data = await response.json();
    console.log(data.result);
    setResult(data.result);
    setStyleInput("");
  }

  return (
    <div>
      <Head>
        <title>BeerBot</title>
        <link rel="icon" href="/beer.png" />
      </Head>

      <main className={styles.main}>
        <img src="/beer.png" className={styles.icon} />
        <h3>Beer recipe generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="style"
            placeholder="Enter an beer style"
            value={styleInput}
            onChange={(e) => setStyleInput(e.target.value)}
          />
          <input type="submit" value="Generate beer recipe" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
