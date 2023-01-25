import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
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
const CreateNewsletter = () => {
    const [formdata, setFormdata] = useState({
        ressort:"",
        theme:"",
        content:"",
    })
    const {ressort, theme, content} = formdata;
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
  return (
    <Container>
      <NewsletterWrapper>
        <h1>Nicht angeschlossen</h1>
        <Form>
            <FormGroup>
                <label htmlFor='ressort'>Ressort</label>
                <input type="text" name="ressort" id="ressort" value={ressort} onChange={(e)=>handleChange(e)}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='theme'>Thema</label>
                <input type="text" name="theme" id="theme" value={theme}  onChange={(e)=>handleChange(e)}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='content'>Inhalt</label>
                <textarea cols={10} rows={10} name="content" value={content}  onChange={(e)=>handleChange(e)}></textarea>
            </FormGroup>
            <FormGroup>
                <label htmlFor='email'>E-Mail</label>
                <input type="email" name="email" id="email" value={theme}  onChange={(e)=>handleChange(e)}/>
            </FormGroup>
        </Form>
      </NewsletterWrapper>
    </Container>
  )
}

export default CreateNewsletter