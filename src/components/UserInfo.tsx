import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    flex:1;
`;
const Title = styled.h3`
    font-size:26px;
    margin-bottom:10px;
`;
const ContentWrapper = styled.div`
    display:flex;
    align-items:center;
`;
const Name = styled.span`
    font-size:20px;
`;
const Town = styled.span`
    font-size:20px;
    margin:0 10px;
`;
const ShowButton = styled.button`
    background: var(--coffee);
    color:var(--white);
    padding:5px;
    border:none;
    font-size:10px;

`;
const UserInfo = () => {
  return (
    <Container>
      <Title>Neue Benutzer</Title>
      <ContentWrapper>
        <Name>Username</Name>
        <Town>Benutzerstadt</Town>
        <ShowButton>Benutzer anzeigen</ShowButton>
      </ContentWrapper>
    </Container>
  )
}

export default UserInfo
