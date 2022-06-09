import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaSearch, FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import { popularityProduct, searchProducts } from "../services/formServices";
import Article from "../components/Article";
import AlertMessage from "../components/AlertMessage";
import DetailsProduct from "./DetailsProduct";

export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [pageNbr, setPageNbr] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [compareCart, setCompareCart] = useState("");
  const { productArray, productsCompare } = useSelector((state) => ({
    ...state.productReducer,
  }));
  const {alertMsg} = useSelector(state => ({
    ...state.formReducer
  }))

  useEffect(() => {
    setTimeout(() => {
      const storageCompareCart = JSON.parse(localStorage.getItem("compareCart"))
      if(storageCompareCart !== null) {
        dispatch({
          type: "PRODUCTSCOMPARE",
          payload: storageCompareCart
        })
      }
    }, 500)
    // scroll infinite
    window.addEventListener("scroll", infiniteCheck)
    return () => {
      window.removeEventListener("scroll", infiniteCheck)
    };
  }, []);


  async function awaitGetArrayProducts() {
    const result = await searchProducts({
      resultPerPage: 20,
      pageNumber: 1,
      searchTerm: searchValue,
    });
    if (!result) {
      console.log(result);
    } else {
      dispatch({
        type: "GETPRODUCTSARRAY",
        payload: result,
      });
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    awaitGetArrayProducts();
    setTempValue(searchValue);
    setSearchValue("");
  };

  const handleCompare = () => {

    if(productsCompare.length === 2) {
      navigate(`/compare/${productsCompare[0].code}/${productsCompare[1].code}`)
    }

   /* const content = {
      id1: "5038862130929",
      id2: "8002270014901",
    };
    popularityProduct(content);*/
  };

  const infiniteCheck = () => {
    // scroll infinite
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPageNbr((value) => value + 1);
      awaitGetArrayProducts();
    }
  };

  const handleDeleteCompare = (e, code) => {
    const findIndex = productsCompare.findIndex(p => p.code === code)
    if(findIndex !== -1) {
      const newArray = [...productsCompare]
      newArray.splice(findIndex, 1)
      dispatch({
        type: "PRODUCTSCOMPARE",
        payload: newArray
      })
      localStorage.setItem('compareCart', JSON.stringify(newArray))
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      {alertMsg.msg !== "" && <AlertMessage type={alertMsg.statut} text={alertMsg.msg} />}
      <Header />
      {productsCompare.length > 0 && (
        <div className="shadow-lg mt-4 w-full md:w-2/3 bg-white flex justify-between border border-zinc-300 rounded-lg">
          <div className="w-full flex-col">
            {productsCompare.length > 0 && (
              <div className="flex justify-between items-center p-1 pl-4 border-b text-xs font-medium">
              <Link to={`/product/${productsCompare[0].code}`} className="">{productsCompare[0].name}</Link>
                <button 
                onClick={(e) => handleDeleteCompare(e, productsCompare[0].code)}
                className="text-zinc-400">
                  <FaTimes />
                </button>
              </div>
            )}
            {productsCompare.length > 1 && (
            <div className="flex justify-between items-center p-1 pl-4 border-b text-xs font-medium">
              <Link to={`/product/${productsCompare[1].code}`} className="">{productsCompare.length > 1 && productsCompare[1].name}</Link>
              <button 
              onClick={(e) => handleDeleteCompare(e, productsCompare[1].code)}
              className="text-zinc-400">
                <FaTimes />
              </button>
            </div>
            )}
          </div>
          <button
            onClick={(e) => e.preventDefault(handleCompare())}
            className="p-2 bg-green-400 hover:bg-emerald-400 rounded-br-lg rounded-tr-lg"
          >
            Comparer
          </button>
        </div>
      )}
      <form className="mt-6 w-full md:w-2/3 p-4 flex items-center justify-center">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="transition-all text-sm w-9/12 md:w-6/12 p-2 outline-none focus:bg-blue-100"
          type="search"
          id="search"
          name="search"
          placeholder="Produit..."
        />
        <button
          onClick={(e) => handleSearch(e)}
          className="transition-all text-sm flex items-center p-2 bg-blue-400 hover:bg-blue-500 text-white "
        >
          <FaSearch className="mr-2" /> Chercher
        </button>
      </form>
      <main className="w-full">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center p-4 w-full">
          {productArray.products !== undefined &&
            productArray.products
              .slice(0, 10)
              .map((el) => (
                <Article
                  key={el.code}
                  code={el.code}
                  nutri={el.nutrition_grade_fr}
                  image={el.image_url}
                  name={el.product_name_fr}
                  stores={el.stores}
                />
              ))}
        </div>
      </main>
    </div>
  );
}
