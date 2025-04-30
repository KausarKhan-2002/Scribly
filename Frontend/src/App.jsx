import React from "react";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  return (
    <div>
      <Toaster />
      <MyOutlet />
    </div>
  );
}

export default App;
