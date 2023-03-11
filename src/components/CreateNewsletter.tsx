import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';

const Container = styled.div`
    width:100%;
`;
const NewsletterWrapper = styled.div`
    width:100%;
`;
const Form = styled.form``;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
`;
const ButtonWrapper = styled.div``;
const SendButton = styled.button``;
const CreateNewsletter = (props:{sendEmail:any, newsletterOrders:object[], form:React.MutableRefObject<HTMLFormElement | null>}) => {
    const [newsletterOrderdata, setNewsletterOrderData] = useState<any>([]);
    
    useEffect(()=>{
        setNewsletterOrderData(props.newsletterOrders);
    },[props.newsletterOrders])
    console.log(newsletterOrderdata);
    
    const [formdata, setFormdata] = useState({
        ressort:"",
        theme:"",
        message:"",
    })
    const {ressort, theme, message} = formdata;
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const [mail, setMail] = useState<any>([]);
    const filteredTheme = newsletterOrderdata.filter((item:any)=>item.radiodata === formdata.ressort);
    console.log(filteredTheme);
    const handleEmail = ()=>{
        if(filteredTheme){
            filteredTheme.map((item:any)=>setMail(mail.concat(item.email)))

        }
    }
  return (
    <Container>
      <NewsletterWrapper>
        <h1>Newsletter Mail</h1>
        <Form ref={props.form} onSubmit={props.sendEmail}>
            <FormGroup>
                <label htmlFor='ressort'>Ressort</label>
                <input type="text" name="ressort" id="ressort" value={ressort} onChange={(e)=>handleChange(e)}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='theme'>Thema</label>
                <input type="text" name="theme" id="theme" value={theme}  onChange={(e)=>handleChange(e)}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='message'>Inhalt</label>
                <textarea cols={10} rows={10} name="message" value={message}  onChange={(e)=>handleChange(e)}></textarea>
            </FormGroup>
            <FormGroup>
                <label htmlFor='user_email'>E-Mail</label>
                <input type="email" name="user_email" id="user_email" defaultValue={mail}/>
            </FormGroup>
            <ButtonWrapper>
                <SendButton onClick={handleEmail}>Absenden</SendButton>
            </ButtonWrapper>
        </Form>
      </NewsletterWrapper>
    </Container>
  )
}

export default CreateNewsletter