import React  from 'react'
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer, Tooltip} from 'recharts';
import {small} from '../responsive';
const Container = styled.div`
    width:90%;
    margin: 20px auto;
    ${small({display:"none"})}
`;
const ChartTitle = styled.h3`
    font-size:26px;
    margin-bottom:20px;
`;
const Chart = (props:{userdata:[string,number], title:string, grid:unknown, dataKey:string}) => {
 
  return (
    <Container>
      <ChartTitle>{props.title}</ChartTitle>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={props.userdata}>
            <XAxis dataKey="name" stroke="var(--darkGray)"/>
            <Line type="monotone" dataKey={props.dataKey} stroke="var(--darkGray)"/>
            <Tooltip/>
            {props.grid && <CartesianGrid stroke="var(--gray)" strokeDasharray="5 5"/>}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default Chart
