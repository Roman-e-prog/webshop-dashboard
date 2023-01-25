import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import CreateNewsletter from '../components/CreateNewsletter';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { getAllNewsletterOrders } from '../features/newsletterOrders/newsletterOrderSlice';
const Container = styled.div`
  width:100%;
`;
const NewsletterOrder = styled.div`
  width:100%;
`;
const Table = styled.table`
  width:90%;
  margin: 0 auto;
  & thead{
    background:var(--coffee);
    color:var(--white);
  }
  & th{
    margin-right:5px;
    padding:1px;
    text-align:center;
    font-weight:400;
  }
  & td{
    border: 1px solid var(--coffee);
    margin-right:5px;
    text-align:left;
    padding:2px;
  }
`;
const Mail = () => {
  const dispatch = useAppDispatch();
  const newsletterOrders = useAppSelector((state)=>state.newsletterOrders.newsletterOrders);
  const isError = useAppSelector((state)=>state.newsletterOrders.isError);
  const isLoading = useAppSelector((state)=>state.newsletterOrders.isLoading);
  const message = useAppSelector((state)=>state.newsletterOrders.message);
  useEffect(() => {
    if(isError){
      window.alert(message);
    }
    dispatch(getAllNewsletterOrders())
  }, [dispatch, isError, message])
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterPerPage] = useState(5);
  const lastIndex = currentPage * newsletterPerPage;
  const firstIndex = lastIndex - newsletterPerPage;
  const currentNewsletterOrders = newsletterOrders.slice(firstIndex, lastIndex);
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <NewsletterOrder>
        <Table>
          <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>E-mail</th>
              <th>Thema</th>
            </tr>
          </thead>
          <tbody>
          {currentNewsletterOrders.map((item)=>(
            <tr key={item._id}>
              <td>{item.vorname}</td>
              <td>{item.nachname}</td>
              <td>{item.email}</td>
              <td>{item.radiodata}</td>
            </tr>
          ))}
          </tbody>
        </Table>
        <Pagination
          total={newsletterOrders.length}
          limit={newsletterPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </NewsletterOrder>
      <CreateNewsletter/>
    </Container>
  )
}

export default Mail
