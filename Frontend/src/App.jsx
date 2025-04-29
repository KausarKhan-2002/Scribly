import React from "react";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <MyOutlet />
    </div>
  );
}

export default App;
