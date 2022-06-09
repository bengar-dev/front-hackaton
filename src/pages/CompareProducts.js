import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import Header from "../components/Header";
import { popularityProduct } from "../services/formServices";

export default function CompareProducts() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [morePopulare, setMorePopular] = useState('')
  const { productsCompare } = useSelector((state) => ({
    ...state.productReducer,
  }));

  useEffect(() => {
    if (productsCompare.length === 0) {
      const storageCompareCart = JSON.parse(
        localStorage.getItem("compareCart")
      );
      if (storageCompareCart !== null) {
        dispatch({
          type: "PRODUCTSCOMPARE",
          payload: storageCompareCart,
        });
      }
    }

    async function getMorePopulare() {
        const result = await popularityProduct({
            id1: params.code1,
            id2: params.code2
        })
        if(!result) {
            console.log('erreur')
        } else {
            setMorePopular(result)
        }
    }
    if(morePopulare === "") getMorePopulare()
  });

  console.log(productsCompare)

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />
      <div className="mt-2 w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="p-4 w-full bg-white border border-zinc-300 shadow-xl rounded-lg flex flex-col space-y-6 items-center justify-center">
          <button
            onClick={(e) => e.preventDefault(navigate("/"))}
            className="text-xl ml-auto mr-0 text-orange-400 hover:text-orange-600"
          >
            <FaArrowAltCircleLeft />
          </button>
          {morePopulare !== "" && <p className="text-emerald-500 font-bold text-xl">{morePopulare}</p>}
          <div className="w-full flex flex-col items-center justify-center md:flex-row">
          {productsCompare.length > 0 && (
            <article className="relative bg-zinc-100 p-1 w-full md:w-2/5 flex flex-col items-center justify-center">
                <span className="absolute -left-4 -top-4 bg-zinc-800 text-white h-10 w-10 text-xl flex items-center justify-center rounded-full">1</span>
              <h1 className="font-medium text-center p-2 uppercase text-lg">{productsCompare[0].name}</h1>
              <img src={productsCompare[0].image}  className="h-72 min-h-full rounded-lg"/>
            </article>
          )}
          <span className="md:w-1/5 text-center text-2xl font-bold text-red-400">VS.</span>
          {productsCompare.length > 1 && (
            <article className="relative bg-zinc-100 p-1 w-full md:w-2/5 flex flex-col items-center justify-center">
                <span className="absolute -left-4 -top-4 bg-zinc-800 text-white h-10 w-10 text-xl flex items-center justify-center rounded-full">2</span>
              <h1 className="font-medium text-center p-2 uppercase text-lg">{productsCompare[1].name}</h1>
              <img src={productsCompare[1].image}  className="h-72 min-h-full rounded-lg"/>

            </article>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
