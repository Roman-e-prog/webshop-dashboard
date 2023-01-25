import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { useAppDispatch} from '../app/hooks';
import {createProduct} from '../features/products/productsSlice'
const Container = styled.div`
    width:90%;
    margin: 10px auto;
`;
const TitleWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Title = styled.h2`
    color:var(--darkGray);
    font-size:26px;
`;
const Form = styled.form`
  padding:10px;
`;
const FormGroup = styled.div`
  display:flex;
  flex-direction:column;
  margin-bottom:2px;
  & label{
    margin:5px 0;
    color:var(--darkGray);
    font-size:17px;
  }
  & input, textarea{
    width:50%;
    border:none;
    padding:5px;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  }
`;
const ButtonWrapper = styled.div`
  margin-top:10px;
`;
const Button = styled.button`
  background:var(--coffee);
  color:var(--white);
  border:none;
  padding:5px;
  cursor:pointer;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
type FileData = {
  image: File | null
}
const CreateProduct = () => {
  const dispatch = useAppDispatch();
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
  const {title, producer, categories, desc, price, currency, colors, sizes, inStock} = formdata;
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const [filedata, setFiledata] = useState<FileData>({image:null});
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
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
    productData.append("title", formdata.title)
    productData.append("producer", formdata.producer);
    productData.append("categories", JSON.stringify(formdata.categories))
    productData.append("desc", formdata.desc);
    productData.append("price", formdata.price);
    productData.append("currency", formdata.currency);
    productData.append("colors", JSON.stringify(formdata.colors))
    productData.append("sizes", JSON.stringify(formdata.sizes))
    productData.append("inStock", formdata.inStock);
    productData.append("image", filedata.image!)

    dispatch(createProduct(productData));
    toast.info("Produckt wurde erfolgreich angelegt");
  }
   
  return (
    <Container>
      <TitleWrapper>
        <Title>Produkt einpflegen</Title>
      </TitleWrapper>
      <Form onSubmit={onSubmit}>
      <FormGroup>
          <label htmlFor='image'>Bild hochladen</label>
          <input type="file" name="image" id="image" required onChange={handleFileChange}/>
          {preview && <img src={preview} alt="Preview" title="Preview" style={{width:"250px", height:"175px", marginTop:"5px"}}/>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='title'>Titel</label>
          <input type="text" name="title" id="title" required value={title} onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='producer'>Hersteller</label>
          <input type="text" name="producer" id="producer" required value={producer}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='categories'>Kategorien</label>
          <input type="text" name="categories" id="categories" required value={categories}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='desc'>Beschreibung</label>
          <textarea cols={10} rows={10} name="desc" required value={desc}  onChange={(e)=>handleChange(e)}></textarea>
        </FormGroup>
        <FormGroup>
          <label htmlFor='price'>Preis</label>
          <input type="text" name="price" id="price" required value={price}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='currency'>Währung</label>
          <input type="text" name="currency" id="currency" required value={currency}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='colors'>Farben</label>
          <input type="text" name="colors" id="colors" required value={colors}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='sizes'>Größen</label>
          <input type="text" name="sizes" id="sizes" required value={sizes}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='inStock'>Im Bestand</label>
          <input type="text" name="inStock" id="inStock" required value={inStock}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <ButtonWrapper>
          <Button>Absenden</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default CreateProduct



