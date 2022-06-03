import React from "react";

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();

export default function AlertMessage(props) {

  //à modifier avec notre fonction qui gère les erreurs
  let classAlertMsg = ""
  if(props.type === "error") classAlertMsg = "bg-rose-500"

  return (
    <div className={`absolute top-20 right-20 shadow-lg p-2 rounded flex items-center justify-center ${classAlertMsg}`} data-aos="fade-down" data-aos-duration='500'>
      <p className="text-sm font-medium">
        {props.text}
      </p>
    </div>
  );
}
