import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Chart from '../components/Chart';
import Revenue from '../components/Revenue';
import Transactions from '../components/Transactions';
import UserInfo from '../components/UserInfo';
import { useEffect } from 'react';
const Container = styled.div`
  width:100%;
`;
const ZusatzInfos = styled.div`
  display:flex;
`;
const Home:React.FC = () => {
  const selector = useAppSelector((state:RootState)=>state.auth);
  const dispatch = useAppDispatch()
  const {user} = selector;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user?.isAdmin){
      navigate('/');
    }
  },[dispatch, user?.isAdmin, navigate])
  return (
    <Container>
      <Revenue/>
      <Chart/>
      <ZusatzInfos>
        <UserInfo/>
        <Transactions/>
      </ZusatzInfos>
    </Container>
  )
}

export default Home
