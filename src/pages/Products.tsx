import React from 'react'
import styled from 'styled-components';
import {useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProducts} from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import CreateProduct from '../components/CreateProduct';
const Container = styled.div`
  width:100%;
`;
const Table = styled.table`
  width:90%;
  margin: 0 auto;
  & thead{
    background:var(--coffee);
    color:var(--white);
  }
  & th{
    margin-right:5px;
    padding:1px;
    text-align:center;
    font-weight:400;
  }
  & td{
    border: 1px solid var(--coffee);
    margin-right:5px;
    text-align:left;
    padding:2px;
  }
  & #btn{
    border:none;
  }
  & button{
    background:var(--coffee);
    color:var(--white);
    padding:4px;
    border:none;
    margin-left:10px;
  }
`;
const ButtonWrapper = styled.div`
  width:90%;
  margin: 5px auto;
  padding:5px;
  display:flex;
`;
const SortButton = styled.button`
  background:var(--coffee);
  color:var(--white);
  padding:2px;
  margin-right:2px;
  border:none;
`;
const Products = () => {
  const dispatch = useAppDispatch();
const allProducts = useAppSelector((state)=>state.products.allProducts);
const isError = useAppSelector((state)=>state.products.isError);
const isLoading = useAppSelector((state)=>state.products.isLoading);
const message = useAppSelector((state)=>state.products.message);
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getAllProducts())
  }, [dispatch, isError, message])
  const [products, setProducts] = useState<any>([]);

  useEffect(()=>{
    if(allProducts.length){
      setProducts(allProducts)
    }
  }, [allProducts]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  //search
  const [searchValue, setSearchValue]= useState('');
  const filteredProduct = products.filter((item:object)=>{
    return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
  }).slice(firstIndex, lastIndex);
  //sort
  const handleDefault = ()=>{
    setProducts([...products].sort((a,b)=>a.createdAt < b.createdAt ? -1 : 1));
  }
  const handleNew = ()=>{
    setProducts([...products].sort((a,b)=>a.createdAt > b.createdAt ? -1 :1));
  }
  const handleAlphabet = ()=>{
    setProducts(
      [...products].sort((a,b)=>{
        if(a.categories[0] < b.categories[0]){
          return -1;
        }
        else{
          return 1;
        }
      }))
  }
  const handleProducer = ()=>{
    setProducts(
      [...products].sort((a,b)=>{
        if(a.producer < b.producer){
          return -1;
        }
        else{
          return 1;
        }
      }))
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <Search callback={(searchValue:string)=>setSearchValue(searchValue)} />
      <ButtonWrapper>
        <SortButton onClick={handleDefault}>Zurücksetzen</SortButton>
        <SortButton onClick={handleNew}>Neueste zuerst</SortButton>
        <SortButton onClick={handleAlphabet}>Alphabetisch sortieren</SortButton>
        <SortButton onClick={handleProducer}>Nach Hersteller sortieren</SortButton>
      </ButtonWrapper>
      <Table>
        <thead>
          <tr>
            <th>Produktname</th>
            <th>Kategorie</th>
            <th>Produktbild</th>
            <th>Hersteller</th>
            <th>Artikelnummer</th>
            <th>Im Bestand</th>
            <th>Preis</th>
            <th>ProduktDetails</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduct ? filteredProduct.map((item:any)=>(
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.categories.map((item:string[], index:number)=>(
                <span key={index}>{item} </span>
              ))}</td>
              <td><img src={item.image} alt={item.categories.join(', ')} title={item.categories.join(', ')} style={{width:"75px", height:"50px"}}/></td>
              <td>{item.producer}</td>
              <td>{item._id}</td>
              <td>{item.inStock}</td>
              <td>{`${item.price} ${item.currency}`}</td>
              <td id="btn"><button><Link to={`/showProduct/${item._id}`} className="link" style={{color:"var(--white)"}}>Anzeigen</Link></button></td>
            </tr>
          ))
          : currentProducts.map((item:any)=>(
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.categories.map((item:string[], index:number)=>(
                <span key={index}>{item} </span>
              ))}</td>
              <td><img src={item.image} alt={item.categories.join(', ')} title={item.categories.join(', ')} style={{width:"75px", height:"50px"}}/></td>
              <td>{item._id}</td>
              <td>{item.inStock}</td>
              <td>{`${item.price} ${item.currency}`}</td>
              <td><button><Link to={`/showProduct/${item._id}`}>Anzeigen</Link></button></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      <Pagination
        total={products.length}
        limit={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <CreateProduct/>
      <ToastContainer />
    </Container>
  )
}

export default Products
