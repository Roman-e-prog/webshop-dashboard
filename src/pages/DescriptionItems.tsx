import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {useState, useEffect} from 'react';
import {createDescriptionItem, getAllDescriptionItem} from '../features/descriptionItems/descriptionItemSlice'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
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
    const selector = useAppSelector((state:RootState)=>state.descriptionItem);
    const {allDescriptionItems, isError, isLoading, message} = selector;

    useEffect(() => {
      if(isError){
        toast.error(message);
      }
      dispatch(getAllDescriptionItem())
    }, [dispatch, isError, message])

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
    const onSubmit = (e:React.FormEvent)=>{
      e.preventDefault();
      const descriptionItemData ={
        title,
        text,
      }
      dispatch(createDescriptionItem(descriptionItemData))
    }
    if(isLoading){
      return <Spinner/>
    }
  return (
    <Container>
      <Table>
          <thead>
              <tr>
                <th style={{width:"20%"}}>Titel</th>
                <th style={{width:"60%"}}>Text</th>
                <th style={{width:"20%"}}>Daten Anzeige</th>
              </tr>
          </thead>
          <tbody>
            {allDescriptionItems.map((item)=>(
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td id="btn"><button><Link to={`/showDescriptionItem/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Bearbeiten</Link></button></td>
              </tr>
            ))} 
          </tbody>
      </Table>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="title">Titel</label>
          <input type="text" name="title" id="title" required value={title} onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="text">Text</label>
          <textarea cols={10} rows={10} name="text" required value={text} onChange={(e)=>handleChange(e)}></textarea>
        </FormGroup>
        <ButtonWrapper>
          <SendButton>Absenden</SendButton>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default DescriptionItems
