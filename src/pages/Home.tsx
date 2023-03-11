import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Chart from '../components/Chart';
import Revenue from '../components/Revenue';
import Transactions from '../components/Transactions';
import UserInfo from '../components/UserInfo';
import { useEffect, useState, useMemo} from 'react';
import { getUserStats } from '../features/user/userSlice';
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
//chart
const activeUser = useAppSelector((state)=>state.user.userStats);
const [stats, setStats] = useState<any>([]);
useEffect(()=>{
  dispatch(getUserStats())
},[dispatch]);
const Month = useMemo(
  () => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  []
);

useEffect(()=>{
      activeUser.map((item)=>setStats((prev:any)=>[...prev, {name:Month[parseInt(item._id!)-1], "Active User": item.total}]))
      //eslint-disable-next-line
},[]);

  return (
    <Container>
      <Revenue
      month={Month}
      />
      <Chart 
      userdata ={stats}
      title = "User Analyse"
      grid
      dataKey={"Active User"}
      />
      <ZusatzInfos>
        <UserInfo/>
        <Transactions/>
      </ZusatzInfos>
    </Container>
  )
}

export default Home
