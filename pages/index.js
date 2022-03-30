import { useState } from "react";
import NavBar from "../components/NavBar";

export default function Home() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1 className="active">Home</h1>
      <style jsx>{`
        a {
          background-color: white;
        }
      `}</style>
    </div>
  );
}
