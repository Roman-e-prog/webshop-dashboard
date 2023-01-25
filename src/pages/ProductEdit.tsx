import React, { ChangeEvent} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
import { getProduct, deleteProduct, updateProduct, reset} from '../features/products/productsSlice';
import Spinner from '../components/Spinner';


const Container = styled.div`
    width:100%;
`;
const Form = styled.form`
    width:100%;
    display:flex;
`;
const InputGroup = styled.div`
    width:50%;
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    padding:5px;
    margin-left:15px;

    & label{
        margin-bottom:5px;
        color:var(--darkGray);
        font-size:17px;
    }
    & input{
        padding:5px;
        border:none;
        width:100%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
    & textarea{
      padding:2px;
    }
    & .dateLabel{
        margin-bottom: 5px;
        color:var(--darkGray);
        font-size:17px;
        font-weight:400;
    }
    & span{
        padding:5px;
        border:none;
        width:40%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
`;
const ButtonGroup = styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    padding: 250px 20px;
`;
const UpdateButton = styled.button`
    background: var(--coffee);
    padding:10px;
    margin-bottom:20px;
    color: var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const DeleteButton = styled.button`
    background: var(--darkGray);
    padding:10px;
    margin:20px 20px;
    color: var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const OkButton = styled.button`
    background: white;
    padding:10px;
    color: var(--darkGray);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
//typescript
type FileData = {
  image: File | null
}
export interface UpdateProductData{
  productData:FormData,
  id:string
}
const ProductEdit = () => {
  const dispatch = useAppDispatch();
const product:any = useAppSelector((state)=>state.products.product);
const isError = useAppSelector((state)=>state.products.isError);
const isLoading = useAppSelector((state)=>state.products.isLoading);
const message = useAppSelector((state)=>state.products.message);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if(isError){
      window.alert(message)
    }
    dispatch(getProduct(id!));
  }, [dispatch,isError, message, id]);
  
  const [formdata, setFormdata] = useState<{title:string, producer:string, categories:string[], desc:string, price:string, currency:string, colors:string[], sizes:string[], inStock:string} >({
    title:"",
    producer:"",
    categories:[],
    desc:"",
    price:"",
    currency:"",
    colors:[],
    sizes:[],
    inStock:"",
  })
  const {title, producer, categories, desc, price, currency, colors, sizes,inStock} = formdata;
  
  useEffect(()=>{
    if(product){
      setFormdata({
        title:product.title,
        producer:product.producer,
        categories:product.categories,
        desc:product.desc,
        price:product.price,
        currency:product.currency,
        colors:product.colors,
        sizes:product.sizes,
        inStock:product.inStock,
      })
    }
  }, [product])
//img
const [filedata, setFiledata] = useState<FileData>({
  image:null
})
const [preview, setPreview] = useState<string | null>(null)
const fileChange = (e:ChangeEvent<HTMLInputElement>)=>{
  const files = e.currentTarget.files;
  if(!files){
    return;
  }
  const file = files[0];
  setFiledata({image:file});
  updatePreview(files[0]);
}
const updatePreview = (file:File)=>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = ()=>{
    setPreview(reader.result as string);
  }
}
 
  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const productData = new FormData();
    productData.append("title", formdata.title);
    productData.append("producer", formdata.producer)
    productData.append("categories", JSON.stringify(formdata.categories));
    productData.append("desc", formdata.desc);
    productData.append("price", formdata.price);
    productData.append("currency", formdata.currency);
    productData.append("colors", JSON.stringify(formdata.colors));
    productData.append("sizes", JSON.stringify(formdata.sizes));
    productData.append("inStock", formdata.inStock);
    productData.append("image", filedata.image!)
   
    const updateProductData:UpdateProductData = {
      productData: productData,
      id:id!,
    }
    dispatch(updateProduct(updateProductData));
    return ()=>{
      dispatch(reset());
    }
  }
  const handleDelete = ()=>{
    dispatch(deleteProduct(product._id));
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
        <Form onSubmit={onSubmit}>
          <InputGroup>
            <FormGroup>
              <label htmlFor='image'>Bild</label>
              <input type="file" name="image" id="image" onChange={fileChange}/>
              {preview ? <img src={preview} alt="Vorschau" title="Vorschau"/> :
              <img src={product.image} alt={product.title} title={product.title}/>
              }
            </FormGroup>
            <FormGroup>
              <label htmlFor='title'>Produktname</label>
              <input type="text" name="title" id="title" defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='producer'>Hersteller</label>
              <input type="text" name="producer" id="producer" defaultValue={producer} onChange={(e)=>setFormdata({...formdata, producer: e.target.value})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='categories'>Kategorie</label>
              <input type="text" name="categories" id="categories" defaultValue={categories} onChange={(e)=>setFormdata({...formdata, categories: [e.target.value]})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='desc'>Beschreibung</label>
              <textarea cols={10} rows={10} defaultValue={desc} onChange={(e)=>setFormdata({...formdata, desc: e.target.value})}></textarea>
            </FormGroup>
            <FormGroup>
            <label htmlFor='price'>Preis</label>
              <input type="text" name="price" id="price" defaultValue={price} onChange={(e)=>setFormdata({...formdata, price: e.target.value})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='currency'>Währung</label>
              <input type="text" name="currency" id="currency" defaultValue={currency} onChange={(e)=>setFormdata({...formdata, currency: e.target.value})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='colors'>Colors</label>
              <input type="text" name="colors" id="colors" defaultValue={colors} onChange={(e)=>setFormdata({...formdata, colors: [e.target.value]})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='sizes'>Sizes</label>
              <input type="text" name="sizes" id="sizes" defaultValue={sizes} onChange={(e)=>setFormdata({...formdata, sizes: [e.target.value]})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='inStock'>Im Bestand</label>
              <input type="text" name="inStock" id="inStock" defaultValue={String(inStock)} onChange={(e)=>setFormdata({...formdata, inStock: e.target.value})}/>
            </FormGroup>
            <FormGroup>
              <h3 className='datelable'>Erstellt am:</h3>
              <span>{new Date(product.createdAt).toLocaleDateString("de-De",{day:'numeric', month:'short', year:'numeric' })}</span>
            </FormGroup>
            <FormGroup>
              <h3 className='datelable'>Update am:</h3>
              <span>{new Date(product.updatedAt).toLocaleDateString("de-De",{day:'numeric', month:'short', year:'numeric' })}</span>
            </FormGroup>
          </InputGroup>
          <ButtonGroup>
            <UpdateButton onClick={onSubmit}>Update</UpdateButton>
            
            <OkButton onClick={()=>navigate(-1)}>Okay</OkButton>
          </ButtonGroup>
        </Form>
        <DeleteButton onClick={handleDelete}>Löschen</DeleteButton>
    </Container>
  )
}


export default ProductEdit
