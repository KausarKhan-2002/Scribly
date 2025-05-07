import React, { useEffect } from "react";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { useProfile } from "./Hook/useProfile";
import startCustomProto from "./Utils/customProto";

function App() {
  const profile = useSelector((store) => store.user);
  const getProfile = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  // Define own prototype
  startCustomProto()

  // console.log(profile);
  
  return (
    <div className="bg-gray-100/50">
      {profile.loading && <LoadingProfile />}
      <Toaster />
      <MyOutlet />
    </div>
  );
}

export default App;

const LoadingProfile = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex justify-center border items-center bg-white/50 text-black text-4xl">
      <ImSpinner2 className="animate animate-spin" />
    </div>
  );
};
