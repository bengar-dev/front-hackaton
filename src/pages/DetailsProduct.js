import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchOneProduct } from "../services/formServices";

import { FaTimesCircle } from "react-icons/fa";
import { GiWheat } from "react-icons/gi";

import Header from "../components/Header";

import NutriA from "../assets/640px-Nutri-score-A.svg.png";
import NutriB from "../assets/640px-Nutri-score-B.svg.png";
import NutriC from "../assets/640px-Nutri-score-C.svg.png";
import NutriD from "../assets/640px-Nutri-score-D.svg.png";
import NutriE from "../assets/640px-Nutri-score-E.svg.png";
import Nutri from "../assets/640px-Nutri-score.png";

export default function DetailsProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(false);
  const [alerg, setAlerg] = useState("");
  const [nutri, setNutri] = useState("");

  useEffect(() => {

    async function awaitOneProduct() {
      const result = await searchOneProduct(params.code);
      if (!result) console.log("produit non trouvé");
      else {
        setProduct(result.products[0]);
        setNutri(result.products[0].nutrition_grade_fr);
        let allergens = "";
        const newArrayAllergens = result.products[0].allergens.split(",");
        const findLangage = newArrayAllergens.filter((p) => p.includes("en"));
        findLangage.forEach((el) => {
          allergens += el.replace("en:", " ");
        });
        setAlerg(allergens);
      }
    }
    if (!product) {
      awaitOneProduct();
    }
  });

  let img = "";

  if (nutri !== "") {
    if (nutri === "a") img = NutriA;
    else if (nutri === "b") img = NutriB;
    else if (nutri === "c") img = NutriC;
    else if (nutri === "d") img = NutriD;
    else if (nutri === "e") img = NutriE;
    else img = Nutri;
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />
      {product && (
        <div className="mt-2 w-full p-4 flex items-center justify-center">
          <div className="p-4 w-full bg-white border-2 border-zinc-800 shadow-xl rounded-lg flex flex-col space-y-6 items-center justify-center">
            <button 
            onClick={(e) => e.preventDefault(navigate('/'))}
            className="text-xl ml-auto mr-0 text-red-500 hover:text-red-600"
            >
              <FaTimesCircle />
            </button>
            <h1 className="font-bold text-xl">{product.product_name_fr}</h1>
            <img
              src={product.image_url}
              className="w-auto max-h-60 rounded-lg shadow-lg"
            />
            <p className="text-sm first-letter:font-bold">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
            </p>
            <p className="text-xs italic">{product.origin_fr}</p>
            <div className="w-full">
              <img src={img} className="w-12" />
            </div>
            <div className="text-xs w-full flex items-center">
              <GiWheat className="text-xl text-orange-400 mr-2" /> Allergens:{" "}
              <span className="font-medium ml-1">{alerg}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
