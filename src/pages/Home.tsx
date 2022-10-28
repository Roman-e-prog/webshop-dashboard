import React from 'react'
import styled from 'styled-components'
import Revenue from '../components/Revenue';
const Container = styled.div`
  width:100%;
`;
const Home:React.FC = () => {
  return (
    <Container>
      <Revenue/>
    </Container>
  )
}

export default Home
