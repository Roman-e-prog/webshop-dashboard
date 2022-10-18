import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
const Container = styled.div`
    width:100%;
    background:var(--white);
`;
const Home:React.FC = () => {
  return (
    <Container>
      <Navbar/>
    </Container>
  )
}

export default Home
