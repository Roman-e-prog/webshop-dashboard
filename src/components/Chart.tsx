import React from 'react'
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer, Tooltip} from 'recharts';
const Container = styled.div`
    width:90%;
    margin: 20px auto;
`;
const ChartTitle = styled.h3`
    font-size:26px;
    margin-bottom:20px;
`;
const Chart = () => {
    const data = [
        {
          name: 'Jan',
          "Active User": 4000,
        },
        {
            name: 'Feb',
            "Active User": 3800,
          },
          {
            name: 'Mrz',
            "Active User": 3900,
          },
          {
            name: 'Apr',
            "Active User": 5400,
          },
          {
            name: 'Mai',
            "Active User": 3800,
          },
          {
            name: 'Jun',
            "Active User": 4800,
          },
          {
            name: 'Jul',
            "Active User": 3800,
          },
          {
            name: 'Aug',
            "Active User": 3700,
          },
          {
            name: 'Sep',
            "Active User": 4800,
          },
          {
            name: 'Okt',
            "Active User": 6400,
          },
          {
            name: 'Nov',
            "Active User": 3800,
          },
          {
            name: 'Dec',
            "Active User": 8800,
          },
      ];
  return (
    <Container>
      <ChartTitle>User Analyse</ChartTitle>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
            <XAxis dataKey="name" stroke="var(--darkGray)"/>
            <Line type="monotone" dataKey="Active User" stroke="var(--darkGray)"/>
            <Tooltip/>
            <CartesianGrid stroke="var(--gray)" strokeDasharray="5 5"/>
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default Chart
