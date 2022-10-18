import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    width:100%;
    height:150px;
    position:sticky;
    top:0;
    z-index:99;
    display:flex;
    background:var(--coffee);
`;
const LogoHolder = styled.div`
    flex:1;
    height:100%;
    padding:20px;

    &h1{
        color:var(--white);
    }
`;
const IconHolder = styled.div`
    flex:1;
    height:100%;
    padding:20px;
`;
const Navbar:React.FC = () => {
  return (
    <Container>
      <LogoHolder>
        <h1>RAR Schumode Dashboard</h1>
      </LogoHolder>
      <IconHolder></IconHolder>
    </Container>
  )
}

export default Navbar
