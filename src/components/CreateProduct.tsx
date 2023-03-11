import React, { ChangeEvent, useState, useCallback} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector} from '../app/hooks';
import {createProduct, getAllProducts} from '../features/products/productsSlice';
import  {createProductSchema}  from '../validations/createProductValidation';
import update from 'immutability-helper';
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
console.log(formerror);
  // const onSubmit = useCallback(
  //   async (e:React.FormEvent) => {
  //     e.preventDefault()
  //     const completeData = {
  //       title,
  //       producer,
  //       categories,
  //       desc,
  //       price,
  //       currency,
  //       colors,
  //       sizes,
  //       inStock,
  //     }
  //     const isFormValid = await createProductSchema.isValid(completeData, {
  //       abortEarly: false, // Prevent aborting validation after first error
  //     })
   
  //     if (isFormValid) {
  //       const productData = new FormData();
  //       productData.append("title", formdata.title)
  //       productData.append("producer", formdata.producer);
  //       productData.append("categories", JSON.stringify(formdata.categories))
  //       productData.append("desc", formdata.desc);
  //       productData.append("price", formdata.price);
  //       productData.append("currency", formdata.currency);
  //       productData.append("colors", JSON.stringify(formdata.colors))
  //       productData.append("sizes", JSON.stringify(formdata.sizes))
  //       productData.append("inStock", formdata.inStock);
  //       productData.append("image", filedata.image!)
  //       // Check the schema if form is valid:
  //       for(let value of productData){
  //         console.log(value);
  //       }
  //       dispatch(createProduct(productData));
  //       dispatch(getAllProducts())
  //       props.setProducts(allProducts);
  //       toast.info("Produckt wurde erfolgreich angelegt");
  //     } else {
  //       // If form is not valid, check which fields are incorrect:
  //       createProductSchema.validate(completeData, { abortEarly: false }).catch((err) => {
  //         const errors = err.inner.reduce((acc:any, error:any) => {
  //           return {
  //             ...acc,
  //             [error.path]: error.errors,
  //           }
  //         }, {})
  //           console.log(errors);
  //         // Update form errors state:
  //         setFormerror((prevErrors:any) =>
  //           update(prevErrors, {
  //             $set: errors,
  //           })
  //         )
  //       })
  //     }
  //   },
  //   [dispatch, allProducts, props,  title,
  //     producer,
  //     categories,
  //     desc,
  //     price,
  //     currency,
  //     colors,
  //     sizes,
  //     inStock, filedata.image, formdata.categories, formdata.colors, formdata.currency, formdata.desc, formdata.inStock, formdata.price, formdata.producer, formdata.sizes, formdata.title]
  // )

  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const CategoriePattern = /([A-Za-z]+( [A-Za-z]+)+)/i;
    const ColorsPattern = /([a-z]+( [a-z]+)+)/i;
    const SizesPattern = /\s[0-9]+\s/;
    let imageUpdate = {};
    imageUpdate = {image:"Sie müssen ein Bild eingeben"};
    let titleUpdate = {};
    titleUpdate = {title:"Bitte geben Sie den Produktnamen ein"};
    let producerUpdate = {};
    producerUpdate = {producer:"Bitte geben Sie den Herstellernamen ein"};
    let categoriesUpdate = {};
    categoriesUpdate = {categories:"Bitte geben Sie die Kategorien nur mit Leerzeichen getrennt ein. Erst die Haupkategorie(z.B. Herren), dann die Unterkategorie(z.B. Sportschuhe)"};
    let descUpdate = {};
    descUpdate = {desc:"Bitte geben Sie die Produktbeschreibung ein"};
    let priceUpdate = {};
    priceUpdate = {price:"Bitte geben Sie den Preis ein"};
    let currencyUpdate = {};
    currencyUpdate = {currency:"Bitte geben Sie die Währung ein. Standard ist €-"};
    let colorsUpdate = {};
    colorsUpdate = {colors:"Bitte geben Sie die Farben in english klein geschrieben nur mit Leerzeichen getrennt ein."};
    let sizesUpdate = {};
    sizesUpdate = {sizes:"Bitte geben Sie die Größen nur mit Leerzeichen getrennt ein. Erst muss ein Leerzeichen kommen"};
    let inStockUpdate = {};
    inStockUpdate = {inStock:"Bitte geben Sie true ein, wenn im Bestand, false, wenn nein"};
    if(filedata.image === null){
      setFormerror(formerror=>({
        ...formerror,
         ...imageUpdate
      }))
    }
    else if(formdata.title === ""){
      setFormerror(formerror=>({
        ...formerror,
          ...titleUpdate
      }))
    }
    else if(formdata.producer === ""){
      setFormerror(formerror=>({
        ...formerror,
          ...producerUpdate
      }))
    }
    else if(!formdata.categories.length || !formdata.categories.filter((item)=>item.match(CategoriePattern))){
      setFormerror(formerror=>({
        ...formerror,
          ...categoriesUpdate
      })) 
    }
    else if(formdata.desc ===  ""){
      setFormerror(formerror=>({
        ...formerror,
          ...descUpdate
          
      }))
    }
    else if(formdata.price ===  ""){
      setFormerror(formerror=>({
        ...formerror,
         ...priceUpdate
      }))
    }
    else if(formdata.currency ===  ""){
      setFormerror(formerror=>({
        ...formerror,
          ...currencyUpdate
      }))
    }
    else if(!formdata.colors.length || !formdata.colors.filter((item)=>item.match(ColorsPattern))){
      setFormerror(formerror=>({
        ...formerror,
          ...colorsUpdate
      })) 
    }
    else if(!formdata.sizes.length || !formdata.sizes.filter((item)=>item.match(SizesPattern))){
      setFormerror(formerror=>({
        ...formerror,
          ...sizesUpdate
      })) 
    }
    else if(formdata.inStock ===  ""){
      setFormerror(formerror=>({
        ...formerror,
          ...inStockUpdate
      }))
    }
    else{
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
    dispatch(getAllProducts())
    props.setProducts(allProducts);
    toast.info("Produckt wurde erfolgreich angelegt");
    }
   
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
      <ToastContainer/>
    </Container>
  )
}

export default CreateProduct



