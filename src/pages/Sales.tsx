import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllCartdata } from '../features/cartdata/cartSlice';
const Container = styled.div`
  width:100%;
`;
const ContentWrapper = styled.div`
  width:100%;
  padding:20px;
`;
const Datatable = styled.table`
  width:90%;
  margin:0 auto;

  & thead{
        background:var(--coffee);
        color:var(--white);
    }
    & th{
        margin-right:5px;
        text-align:center;
        font-weight:400;
    }
    & td{
        border: 1px solid var(--coffee);
        margin-right:5px;
        text-align:left;
        padding:2px;
    }
    & span{
      display:flex:
      flex-direction:column;
    }
    & #btn{
        border:none;
    }
    & button{
        padding:2px;
        background:var(--coffee);
        color:var(--white);
        cursor: pointer;
        border:none;
        margin-left:10px;
    }
`;
const BillButton = styled.button``;
const Sales = () => {
  const dispatch = useAppDispatch();
  const allCartdata = useAppSelector((state)=>state.cartdata.allCartdata);
 
  useEffect(()=>{
    dispatch(getAllCartdata())
  },[dispatch])
  const sortedCarts = [...allCartdata].sort((a,b)=>a.createdAt < b.createdAt ? -1 :1);
  return (
    <Container>
      <ContentWrapper>
        <Datatable>
          <thead>
            <tr>
              <th>Kunde</th>
              <th>Produkte</th>
              <th>Stadt</th>
              <th>Datum</th>
              <th>Netto Umsatz</th>
              <th>Brutto Umsatz</th>
              <th>Umsatzsteuer</th>
              <th id="btn">Rechnung</th>
            </tr>
          </thead>
          <tbody>
            {sortedCarts.map((item:any)=>(
              <tr key={item._id}>
                <td>{item.user.nachname} {item.user.vorname}</td>
                <td>{item.cartProduct.map((item:any)=>(
                  <React.Fragment key={item._id}>
                    <span>{item.title}</span>
                  </React.Fragment>
                  ))}</td>
                <td>{item.user.city}</td>
                <td>{new Date(item.createdAt).toLocaleDateString("de-De", {
                  day:'2-digit',
                  month:'numeric',
                  year:'2-digit',
                })}</td>
                <td>{item.netto}</td>
                <td>{item.amount}</td>
                <td>{(item.amount - item.netto).toFixed(2)} €</td>
                <td><BillButton><Link to={`/bill/${item._id}`} className="link" style={{color:"var(--white)"}}>Rechnung</Link></BillButton></td>
              </tr>
            ))}
          </tbody>
        </Datatable>
      </ContentWrapper>
      
    </Container>
  )
}

export default Sales
