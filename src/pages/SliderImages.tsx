import React, { ChangeEvent } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createSliderItem, getAllSliderItems, deleteSliderItem } from '../features/sliderItems/sliderItemSlice';
import { useEffect, useState} from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

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
  & input{
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
//typescript
type FileData = {
  img: File | null
};
const SliderImages = () => {
  const dispatch = useAppDispatch();
  const allSliderItems = useAppSelector((state)=>state.sliderItems.allSliderItems);
  const isError = useAppSelector((state)=>state.sliderItems.isError);
  const message = useAppSelector((state)=>state.sliderItems.message);
  const isLoading = useAppSelector((state)=>state.sliderItems.isLoading);

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getAllSliderItems())
  }, [dispatch, isError, message]);

  const [sliderItems, setSliderItems] = useState<any[]>([]);

  useEffect(()=>{
    if(allSliderItems){
      setSliderItems(allSliderItems)
    }
  }, [allSliderItems])

  const [formdata, setFormdata] = useState({
    alt:"",
    title:"",
  });
  const {alt, title} = formdata;
  const [filedata, setFiledata] = useState<FileData>({img:null});
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const files = e.currentTarget.files;
    if(!files){
      return;
    }
    const file = files[0];
    setFiledata({img:file});
    handlePreview(file);
  }
  const handlePreview = (file:File)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      setPreview(reader.result as string);
    }
  }
  const handleChange = (e:ChangeEvent<HTMLInputElement>):void=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleDelete = (id:string)=>{
    dispatch(deleteSliderItem(id));
    window.alert("Bild wurde gelöscht");
    return setSliderItems(allSliderItems);   
  }

const onSubmit = (e:React.FormEvent)=>{
  e.preventDefault();
  const sliderItemData = new FormData();
  sliderItemData.append("alt", formdata.alt);
  sliderItemData.append("title", formdata.title);
  sliderItemData.append("img", filedata.img!);

    dispatch(createSliderItem(sliderItemData));
    setSliderItems(allSliderItems);
}
  
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
      <Table>
        <thead>
          <tr>
            <th>Sliderbild</th>
            <th>Vorgelesener Text</th>
            <th>Titel</th>
            <th>Details</th>
            <th>Löschen</th>
          </tr>  
        </thead>
        <tbody>
          {sliderItems && sliderItems.map((item)=>(
            <tr key={item._id}>
              <td><img src={item.img} alt={item.alt} title={item.title} style={{width:"200px", height:"100px"}}/></td>
              <td>{item.alt}</td>
              <td>{item.title}</td>
              <td id="btn"><button><Link to={`/showSliderItem/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Bearbeiten</Link></button></td>
              <td id="btn"><button onClick={()=>handleDelete(item._id)}>Löschen</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor='img'>Bild hochladen</label>
          <input type="file" name="img" id="img" required onChange={handleFileChange}/>
          {preview && <img src={preview} alt="Preview" title="Preview" style={{width:"200px", height:"100px", marginTop:"5px"}}/>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='alt'>Vorgelesener Text</label>
          <input type="text" name="alt" id="alt" required value={alt} onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='title'>Titel</label>
          <input type="text" name="title" id="title" required value={title} onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <ButtonWrapper>
          <Button onClick={onSubmit}>Absenden</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default SliderImages
