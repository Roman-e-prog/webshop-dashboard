import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    flex:2;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Title = styled.h3`
    font-size:26px;
    margin-bottom:10px;
`;
const ContentWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
`;
const DataTable = styled.table`
    width:80%;
    & th, td{
        width:20%;
        text-align:center;
    }
    & button{
        background:var(--coffee);
        color:var(--white);
        font-size:10px;
        padding:5px;
        border:none;
        cursor: pointer;
    }
`;
const Transactions = () => {
  return (
    <Container>
      <Title>Neueste Transaktionen</Title>
      <ContentWrapper>
        <DataTable>
          <tbody>
              <tr>
                  <th>KUNDE</th>
                  <th>DATUM</th>
                  <th>UMSATZ</th>
                  <th>Status</th>
              </tr>
              <tr>
              <td>Placeholder</td>
              <td>28.10.22</td>
              <td>€ 122</td>
              <td><button>Status anzeigen</button></td>
              </tr>
            </tbody>
        </DataTable>
      </ContentWrapper>
    </Container>
  )
}

export default Transactions
