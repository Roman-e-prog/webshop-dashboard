import React from 'react'
import styled from 'styled-components'
import Chart from '../components/Chart';
import Revenue from '../components/Revenue';
import Transactions from '../components/Transactions';
import UserInfo from '../components/UserInfo';
const Container = styled.div`
  width:100%;
`;
const ZusatzInfos = styled.div`
  display:flex;
`;
const Home:React.FC = () => {
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
