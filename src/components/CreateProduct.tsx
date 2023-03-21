import React, { ChangeEvent, useState, useEffect, useCallback} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector} from '../app/hooks';
import {createProduct} from '../features/products/productsSlice';
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
const CreateProduct = (props:{setProducts:React.Dispatch<any>}) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state)=>state.products.allProducts)
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
    //validation
    const [formerror, setFormerror] = useState({
      image:"",
      title:"",
      producer:"",
      categories:"",
      desc:"",
      price:"",
      currency:"",
      colors:"",
      sizes:"",
      inStock:"",
  })

  const checkValidation = useCallback(()=>{
    let errors = formerror;
    const copiedCategories = [...formdata.categories];
    const copiedColors = [...formdata.colors];
    const copiedSizes = [...formdata.sizes];
    
    if(filedata.image === null){
     errors.image = "Sie müssen ein Bild eingeben"
    } else{
      errors.image = "";
    }
    if(formdata.title === ""){
      errors.title = "Bitte geben Sie den Produktnamen ein"
    } else{
      errors.title = "";
    }
    if(formdata.producer === ""){
      errors.producer = "Bitte geben Sie den Herstellernamen ein"
    } else{
      errors.producer = "";
    }
    if(!copiedCategories.length){
      errors.categories = "Bitte geben Sie die Kategorien nur mit Leerzeichen getrennt ein. Erst die Haupkategorie(z.B. Herren), dann die Unterkategorie(z.B. Sportschuhe)"
    }
     else{
      errors.categories = "";
    }
    if(formdata.desc ===  ""){
      errors.desc = "Bitte geben Sie eine Produktbeschreibung ein"
    } else{
      errors.desc = "";
    }
    if(formdata.price ===  ""){
      errors.price = "Bitte geben Sie den Preis ein"
    } else{
      errors.price = "";
    }
    if(formdata.currency ===  ""){
      errors.currency = "Bitte geben Sie die Währung ein, Standard: €"
    } else{
      errors.currency = "";
    }
    if(!copiedColors.length){
      errors.colors = "Bitte geben Sie die Farben in Englisch klein geschrieben nur mit Leerzeichen getrennt ein."
    }
    else{
      errors.colors = "";
    }
    if(!copiedSizes.length){
      errors.sizes = "Bitte geben Sie die Größen nur mit Leerzeichen getrennt ein. Erst muss ein Leerzeichen kommen"
    }
    else{
      errors.sizes = ""
    }
    if(formdata.inStock ===  ""){
    errors.inStock = "Wenn Produkt im Bestand, true, ansonsten false eingeben"
    } else{
      errors.inStock = "";
    }
   return setFormerror(errors);
  },[filedata.image, formdata.categories, formdata.colors, formdata.currency, formdata.desc, formdata.inStock, formdata.price, formdata.producer, formdata.sizes, formdata.title, formerror]);

  useEffect(()=>{
    checkValidation();
  },[formdata, filedata,checkValidation])
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
  props.setProducts(allProducts);
  toast.info("Produkt wurde erfolgreich angelegt");
   
}
  return (
    <Container>
      <TitleWrapper>
        <Title>Produkt einpflegen</Title>
      </TitleWrapper>
      <ToastContainer/>
      <Form onSubmit={onSubmit}>
      <FormGroup>
          <label htmlFor='image'>Bild hochladen</label>
          <input type="file" name="image" id="image" required onChange={handleFileChange}/>
          {preview && <img src={preview} alt="Preview" title="Preview" style={{width:"250px", height:"175px", marginTop:"5px"}}/>}
          <div>
                <span>{formerror.image}</span>
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='title'>Titel</label>
          <input type="text" name="title" id="title" required value={title} onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.title && <span>{formerror.title}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='producer'>Hersteller</label>
          <input type="text" name="producer" id="producer" required value={producer}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.producer && <span>{formerror.producer}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='categories'>Kategorien</label>
          <input type="text" name="categories" id="categories" required value={categories}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.categories && <span>{formerror.categories}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='desc'>Beschreibung</label>
          <textarea cols={10} rows={10} name="desc" required value={desc}  onChange={(e)=>handleChange(e)}></textarea>
          <div>
                {formerror.desc && <span>{formerror.desc}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='price'>Preis</label>
          <input type="text" name="price" id="price" required value={price}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.price && <span>{formerror.price}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='currency'>Währung</label>
          <input type="text" name="currency" id="currency" required value={currency}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.currency && <span>{formerror.currency}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='colors'>Farben</label>
          <input type="text" name="colors" id="colors" required value={colors}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.colors && <span>{formerror.colors}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor='sizes'>Größen</label>
          <input type="text" name="sizes" id="sizes" required value={sizes}  onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <div>
                {formerror.sizes && <span>{formerror.sizes}</span>}
            </div>
        <FormGroup>
          <label htmlFor='inStock'>Im Bestand</label>
          <input type="text" name="inStock" id="inStock" required value={inStock}  onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.inStock && <span>{formerror.inStock}</span>}
            </div>
        </FormGroup>
        <ButtonWrapper>
          <Button>Absenden</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default CreateProduct



