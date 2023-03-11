import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getIncome } from '../features/orderdata/orderdataSlice';
const Container = styled.div`
    width:100%;
`;
const Einnahmen = styled.div`
    width:100%;
    display:flex;
`;
const TagesEinnahmen = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const MonatsEinnahmen = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const JahresEinnahmen = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Title = styled.h3`
    font-size:20px;
`;
const Amount = styled.span`
    font-size:30px;
    margin:20px 0;
`;

const Revenue = (props:{month:string[]}) => {
  const dispatch = useAppDispatch();
  const income = useAppSelector((state)=>state.orderdata.income);

  const date = new Date();
  const lastDay = new Date(date.setDate(date.getDate()-1));
  const lastMonth = new Date().getMonth();
  const year = new Date().getFullYear();

  useEffect(()=>{
    dispatch(getIncome())
  },[dispatch])

  const dayIncome = income.filter((item:any)=>item._id.day === lastDay);
  const monthIncome = income.filter((item:any)=>item._id.month === lastMonth);
  const yearIncome = income.filter((item:any)=>item._id.year === year);
  let totalMonth = monthIncome.reduce((accum,item) => accum + item.total!, 0);
  let totalYear = yearIncome.reduce((accum,item) => accum + item.total!, 0);

  return (
    <Container>
    <Einnahmen>
        <TagesEinnahmen>
          <Title>{`Tageseinnahmen vom ${lastDay.toLocaleDateString("de-De",
          {weekday:'short', 
          day:'numeric', 
          month:'numeric'})}`}</Title>
             <Amount>{dayIncome.length ? <span>{dayIncome[0].total} €</span>: <span>0 €</span>}</Amount>
        </TagesEinnahmen>
        <MonatsEinnahmen>
          <Title>{`Einnahmen im ${props.month[lastMonth-1]}`}</Title>
          <Amount>{totalMonth} €</Amount>
        </MonatsEinnahmen>
        <JahresEinnahmen>
          <Title>{`Einnahmen ${year}`}</Title>
          <Amount>{totalYear} €</Amount>
        </JahresEinnahmen>
      </Einnahmen>
    </Container>
  )
}

export default Revenue
