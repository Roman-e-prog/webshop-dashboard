import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Spinner from '../components/Spinner';
import {getAllUser} from '../features/user/userSlice';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
const Container = styled.div`
    width:100%;
`;
const ButtonWrapper = styled.div`
    width:90%;
    margin:5px auto;
    display:flex;
    padding:5px;
`;
const SortButton = styled.button`
    padding:2px;
    background:var(--coffee);
    color:var(--white);
    border:none;
    margin-right:2px;
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
        text-align:center;
        font-weight:400;
    }
    & td{
        border: 1px solid var(--coffee);
        margin-right:5px;
        text-align:left;
        padding:2px;
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
  
const User = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state:RootState)=>state.user);
    const {allUser, isError, isLoading, message} = selector;
    
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getAllUser())
    }, [dispatch, isError, message])
    const [user,setUser] = useState(allUser);;
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage);
    const [userPerPage] = useState(5);
    const lastIndex = currentPage * userPerPage;
    console.log(lastIndex);
    const firstIndex = lastIndex - userPerPage;
    console.log(firstIndex);
    const currentUser = user.slice(firstIndex, lastIndex);
    console.log(currentUser);
  
    //search
    const [searchValue, setSearchValue] = useState('');
   

    const filteredUser = user.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
        }).slice(firstIndex, lastIndex)
    //sort
       function handleDefault(){
        setUser([...user].sort((a,b)=>a.createdAt < b.createdAt ? -1 : 1));
    }
    function handleNew(){
        setUser([...user].sort((a,b)=>a.createdAt > b.createdAt ? -1: 1));
    }
    
    function handleClient(){
        setUser([...user].sort((a,b)=>{
            if(a.nachname < b.nachname){
                return -1;
            }
            else{
                return 1;
            }
        }));
    } 
    function handleCity(){
        setUser([...user].sort((a,b)=>{
            if(a.city < b.city){
                return -1;
            }
            else{
                return 1;
            }
        }));
    } ;
    
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <Search callback={(searchValue:string)=>setSearchValue(searchValue)}/>
        <ButtonWrapper>
            <SortButton onClick={handleDefault}>Zurücksetzen</SortButton>
            <SortButton onClick={handleNew}>Neueste Zuerst</SortButton>
            <SortButton onClick= {handleClient}>Kundennamen alphabetisch sortieren</SortButton>
            <SortButton onClick={handleCity}>Kunden nach Stadt sortieren</SortButton>
        </ButtonWrapper>
        <Table>
            <thead>
                <tr>
                    <th>Kundenname</th>
                    <th>Email</th>
                    <th>Kundennummer</th>
                    <th>Stadt</th>
                    <th>Kundendaten</th>
                </tr>
            </thead>
            <tbody>
                    {filteredUser ? filteredUser.map((item)=>(
                        <tr key={item._id}>
                            <td>{item.nachname}</td>
                            <td>{item.email}</td>
                            <td>{item._id}</td>
                            <td>{item.city}</td>
                            <td id="btn"><button><Link to={`/showUser/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Benutzer anzeigen</Link></button></td>
                            </tr>))
                            : currentUser.map((item)=>(
                                <tr key={item._id}>
                                    <td>{item.nachname}</td>
                                    <td>{item.email}</td>
                                    <td>{item._id}</td>
                                    <td>{item.city}</td>
                                    <td id="btn"><button><Link to={`/showUser/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Benutzer anzeigen</Link></button></td>
                                </tr>
                    ))}
            </tbody>
        </Table>
        <Pagination total={user.length} 
        limit={userPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />
    </Container>
  )
}

export default User
