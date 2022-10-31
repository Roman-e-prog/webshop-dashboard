import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    width:100%;
    display:flex;
`;
const Einnahmen = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Sales = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Kosten = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Title = styled.h3`
    font-size:26px;
`;
const Amount = styled.span`
    font-size:30px;
    margin:20px 0;
`;
const Hint = styled.p`
    font-size:20px;
    color:var(--darkGray);
`;
const Revenue = () => {
  return (
    <Container>
      <Einnahmen>
        <Title>Einnahmen</Title>
        <Amount>Summe</Amount>
        <Hint>Verglichen mit letztem Monat</Hint>
      </Einnahmen>
      <Sales>
        <Title>Sales</Title>
        <Amount>Summe</Amount>
        <Hint>Verglichen mit letztem Monat</Hint>
      </Sales>
      <Kosten>
        <Title>Kosten</Title>
        <Amount>Summe</Amount>
        <Hint>Verglichen mit letztem Monat</Hint>
      </Kosten>
    </Container>
  )
}

export default Revenue
