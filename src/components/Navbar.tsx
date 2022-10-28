import React from 'react'
import styled from 'styled-components';
import {FaShoePrints} from 'react-icons/fa'
import {IoMdNotificationsOutline, IoMdSettings} from 'react-icons/io'
const Container = styled.nav`
    width:100%;
    height:80px;
    position:sticky;
    top:0;
    z-index:99;
    display:flex;
    background:var(--coffee);
    display:flex;
    padding:20px;
    margin-bottom:10px;
`;
const Logo = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  color:var(--white);
  font-size:30px;

  & span{
    font-family:vivaldi;
  }
  & h2{
    margin-left:20px;
  }
`;
const Greeting = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  color:var(--white);
  font-size:30px;
`;
const Menue = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content: flex-end;
  color:var(--white);
  font-size:30px;
`;

const Navbar:React.FC = () => {
  return (
    <Container>
      <Logo>
        <span>RAR</span>
        <FaShoePrints/>
        <h2>Dashboard</h2>
      </Logo>
      <Greeting>Hallo Placeholder</Greeting>
      <Menue>
        <IoMdNotificationsOutline style={{marginRight:"20px"}}/>
        <IoMdSettings style={{marginRight:"20px"}}/>
      </Menue>
    </Container>
  )
}

export default Navbar
