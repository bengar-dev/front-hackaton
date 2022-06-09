import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchOneProduct, test } from "../services/formServices";

import { FaArrowAltCircleLeft, FaCookieBite } from "react-icons/fa";
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

    async function awaitPosGoogle(tempProduct) {
      const result = await test({
        stores: tempProduct.stores,
        _keywords: tempProduct._keywords
      })
      if(!result) console.log('erreur')
      else {
        console.log(result)
      }
    }

    async function awaitOneProduct() {
      const result = await searchOneProduct(params.code);
      if (!result) console.log("produit non trouvé");
      else {
        awaitPosGoogle(result)
        setProduct(result);
        setNutri(result.nutrition_grade_fr);
        let allergens = ""
        if(result.allergens_imported === null) {
          const newArrayAllergens = result.allergens.split(",");
          const findLangage = newArrayAllergens.filter((p) => p.includes("en"));
          findLangage.forEach((el) => {
            allergens += el.replace("en:", " ");
          });
          setAlerg(allergens);
        } else {
          setAlerg(result.allergens_imported)
        }
      }
    }
    if (!product) {
      awaitOneProduct()
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
          <div className="p-4 w-full md:w-2/3 lg:w-1/2 bg-white border border-zinc-300 shadow-xl rounded-lg flex flex-col space-y-6 items-center justify-center">
            <button 
            onClick={(e) => e.preventDefault(navigate('/'))}
            className="text-xl ml-auto mr-0 text-orange-400 hover:text-orange-600"
            >
              <FaArrowAltCircleLeft />
            </button>
            <h1 className="font-bold text-xl">{product.product_name_fr}</h1>
            <img
              src={product.image_url}
              alt={`${product.name}`}
              className="w-auto max-h-60 rounded-lg shadow-lg"
            />
            <p className="text-sm first-letter:font-bold">
              {product.generic_name}
            </p>
            <p className="text-xs italic">{product.origin_fr}</p>
            <div className="w-full">
              <img src={img} alt="Nutriscore" className="w-12" />
            </div>
            <div className="w-full flex flex-col">
              <div className="text-xs w-full flex items-center">
                  <FaCookieBite className="text-xl text-orange-400 mr-2" /> Ingrédients:{" "}
                  <span className="font-medium ml-1">{product.ingredients_text_fr.replaceAll('_', '')}</span>
                </div>
              <div className="text-xs w-full flex items-center">
                <GiWheat className="text-xl text-orange-400 mr-2" /> Allergens:{" "}
                <span className="font-medium ml-1">{alerg}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
