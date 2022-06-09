import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import Header from "../components/Header";

export default function CompareProducts() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      console.log('ezaezs')
  })

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />
      <div className="mt-2 w-full p-4 flex items-center justify-center">
        <div className="p-4 w-full bg-white border border-zinc-300 shadow-xl rounded-lg flex flex-col space-y-6 items-center justify-center">
          <button
            onClick={(e) => e.preventDefault(navigate("/"))}
            className="text-xl ml-auto mr-0 text-orange-400 hover:text-orange-600"
          >
            <FaArrowAltCircleLeft />
          </button>
          <p>ejhziauheuzia</p>
        </div>
      </div>
    </div>
  );
}
