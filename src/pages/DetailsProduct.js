import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {MdOutlineArrowBackIosNew} from "react-icons/md"
import Header from "../components/Header";
import { searchOneProduct } from "../services/formServices";

export default function DetailsProduct() {
  const params = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState(false);

  useEffect(() => {
    async function awaitOneProduct() {
      const result = await searchOneProduct(params.code);
      if (!result) console.log("produit non trouvé");
      else {
        setProduct(result.products[0]);
      }
    }
    if (!product) {
      awaitOneProduct();
    }
  });

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />
      <button 
      onClick={(e) => e.preventDefault(navigate('/'))}
      className="transition-all duration-200 mr-2 ml-auto mt-2 flex items-center bg-orange-300 hover:bg-orange-400 p-2 rounded-full"><MdOutlineArrowBackIosNew /></button>
      {product && (
        <div className="mt-6 w-full p-4 flex items-center justify-center">
          <div className="p-4 w-full bg-white rounded-lg flex flex-col space-y-6 items-center justify-center">
            <h1 className="font-bold text-xl">{product.product_name_fr}</h1>
            <img src={product.image_url} className="w-2/4"/>
            <p className="text-sm first-letter:font-bold">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            <p className="text-xs italic">{product.origin_fr}</p>
          </div>
        </div>
      )}
    </div>
  );
}
