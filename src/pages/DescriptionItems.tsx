import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {useState, useEffect, useCallback} from 'react';
import {createDescriptionItem, getAllDescriptionItem, deleteDescriptionItem} from '../features/descriptionItems/descriptionItemSlice';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { DescriptionItemSchema } from '../validations/descriptionItemValidation';
import update from 'immutability-helper';
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
const SendButton = styled.button`
background:var(--coffee);
  color:var(--white);
  border:none;
  padding:5px;
  cursor:pointer;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const DescriptionItems = () => {
    const dispatch = useAppDispatch();
    const allDescriptionItems = useAppSelector((state)=>state.descriptionItem.allDescriptionItems);
    const isError = useAppSelector((state)=>state.descriptionItem.isError);
    const isLoading = useAppSelector((state)=>state.descriptionItem.isLoading);
    const message = useAppSelector((state)=>state.descriptionItem.message);
    //validation
    const [formerror, setFormerror] = useState({
      title:false,
      text:false,
      error:[],
  })
console.log(formerror);
    useEffect(() => {
      if(isError){
        toast.error(message);
      }
      dispatch(getAllDescriptionItem())
    }, [dispatch, isError, message]);
 
    //create
    const [formdata, setFormdata] = useState({
      title:"",
      text:"",
    })
    const {title, text} = formdata;
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
      setFormdata((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
       //delete
       const handleDelete = (id:string)=>{
        dispatch(deleteDescriptionItem(id));
        dispatch(getAllDescriptionItem())
      }
    const onSubmit = useCallback( async (e:React.FormEvent)=>{
      e.preventDefault();
      const descriptionItemData ={
        title,
        text,
      }
      const isFormValid = await DescriptionItemSchema.isValid(descriptionItemData, {
        abortEarly: false, // Prevent aborting validation after first error
      })
      if(isFormValid){
        dispatch(createDescriptionItem(descriptionItemData))
        dispatch(getAllDescriptionItem())
      }
      else{
             // If form is not valid, check which fields are incorrect:
             DescriptionItemSchema.validate(descriptionItemData, { abortEarly: false }).catch((err) => {
              const errors = err.inner.reduce((acc:any, error:any) => {
                return {
                  ...acc,
                  [error.path]: error.errors,
                }
              }, {})
                console.log(errors);
              // Update form errors state:
              setFormerror((prevErrors:any) =>
                update(prevErrors, {
                  $set: errors,
                })
              )
            })
      }
      
    },[dispatch, title, text])
    if(isLoading){
      return <Spinner/>
    }
  return (
    <Container>
      <ToastContainer/>
      <Table>
          <thead>
              <tr>
                <th style={{width:"20%"}}>Titel</th>
                <th style={{width:"60%"}}>Text</th>
                <th style={{width:"10%"}}>Daten Anzeige</th>
                <th style={{width:"10%"}}>Löschen</th>
              </tr>
          </thead>
          <tbody>
            {allDescriptionItems.map((item)=>(
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td id="btn"><button><Link to={`/showDescriptionItem/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Bearbeiten</Link></button></td>
                <td id="btn"><button onClick={()=>handleDelete(item._id!)}>Löschen</button></td>
              </tr>
            ))} 
          </tbody>
      </Table>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="title">Titel</label>
          <input type="text" name="title" id="title" required value={title} onChange={(e)=>handleChange(e)}/>
          <div>
                {formerror.title && <span>{formerror.title}</span>}
            </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor="text">Text</label>
          <textarea cols={10} rows={10} name="text" id="text" required value={text} onChange={(e)=>handleChange(e)}></textarea>
          <div>
                {formerror.text && <span>{formerror.text}</span>}
            </div>
        </FormGroup>
        <ButtonWrapper>
          <SendButton onClick={onSubmit}>Absenden</SendButton>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default DescriptionItems
