import React from 'react'
import styled from 'styled-components'
import {useState, useEffect} from 'react';
import { RootState } from '../app/store';
import { login, reset} from '../features/authSlice'
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const LoginForm = styled.form`
    width:400px;
    height:400px;
    padding:20px;
    display:flex;
    flex-direction:column;
    border: 1px solid var(--coffee);
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
`;
const SubmitButton = styled.button``;
const Login = () => {
        const dispatch = useAppDispatch();
        const selector = useSelector((state:RootState)=>state.auth);
        const {user, isError, isLoading, isSuccess, message} = selector;
        const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        username:"",
        email:"",
        password:"",
    });
    const {username, email, password} = formdata;

useEffect(()=>{
    if(isError){
        toast.error(message);
    }
    if(isSuccess || user){
        navigate("/home");
    }
    return ()=>{
        dispatch(reset());
    }
}, [dispatch, isError, message, isSuccess, navigate, user]);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormdata((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const loginData = {
        username,
        email,
        password,
    }
    dispatch(login(loginData))
}
  return (
    <Container>
      <LoginForm onSubmit={onSubmit}>
        <FormGroup>
            <label htmlFor='username'>Benutzername</label>
            <input type="text" name="username" id="username" required value={username} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
            <label htmlFor='email'>E-mail</label>
            <input type="email" name="email" id="email" required  value={email} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
            <label htmlFor='password'>Benutzername</label>
            <input type="text" name="password" id="password" required  value={password} onChange={handleChange}/>
        </FormGroup>
        <SubmitButton onClick={onSubmit}>Login</SubmitButton>
      </LoginForm>
    </Container>
  )
}

export default Login
