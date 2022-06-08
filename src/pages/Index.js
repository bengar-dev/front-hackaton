import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {FaSearch} from 'react-icons/fa'
import Header from '../components/Header'
import { popularityProduct, searchProducts } from '../services/formServices'
import Article from '../components/Article'

export default function Index() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [tempValue, setTempValue] = useState("")
    const [pageNbr, setPageNbr] = useState(1)
    const {productArray} = useSelector(state => ({
      ...state.productReducer
    }))

    async function awaitGetArrayProducts() {
      const result = await searchProducts(searchValue)
      if(!result) {
        console.log('erreur')
      } else {
        dispatch({
          type: "GETPRODUCTSARRAY",
          payload: result
        })
      }
    }

    /*{
          resultPerPage: 20,
          pageNumber: 1,
          searchTerm: searchValue,
          
        }*/

    const handleSearch = (e) => {
      e.preventDefault()
      awaitGetArrayProducts()
      setTempValue(searchValue)
      setSearchValue("")
    }

    const handleCompare = () => {
      const content = {
        id1: "5038862130929",
        id2: "8002270014901"
      }
      popularityProduct(content)
    }

    const infiniteCheck = () => { // scroll infinite
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement
      if(scrollHeight - scrollTop === clientHeight) {
        setPageNbr((value) => value + 1)
        awaitGetArrayProducts()
      }
    }

    useEffect(() => { // scroll infinite
      window.addEventListener('scroll', infiniteCheck)
      return() => {
          window.removeEventListener('scroll', infiniteCheck)
      }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />
      <form className="mt-6 w-full md:w-2/3 p-4 flex items-center justify-center">
        <input 
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="transition-all text-sm w-9/12 md:w-6/12 p-2 outline-none focus:bg-blue-100"
        type="search" id="search" name="search" placeholder="Produit..." />
        <button
        onClick={(e) => handleSearch(e)}
        className="transition-all text-sm flex items-center p-2 bg-blue-400 hover:bg-blue-500 text-white ">
          <FaSearch className="mr-2"/> Chercher
        </button>
      </form>
      <main className="w-full">
        <button
        onClick={(e) => e.preventDefault(handleCompare())}
        className="bg-blue-300">Comparer</button>
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center p-4 w-full">
        {productArray.products !== undefined && productArray.products.slice(0, 10).map(el => (
            <Article key={el.code} code={el.code} nutri={el.nutrition_grade_fr} image={el.image_url} name={el.product_name_fr} stores={el.stores}/>
        ))}
        </div>
      </main>
    </div>
  )
}
