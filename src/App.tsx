import React from 'react';
import Home from './pages/Home';
import styled from 'styled-components';
import Navbar from './components/Navbar';
const Container = styled.div`
  width:100%;
`;
const Wrapper = styled.div`
  width:100%;
  background:var(--white);
  display:flex;
`;
const SidebarWrapper = styled.div`
  flex:1;
`;
const ContentWrapper = styled.div`
  flex:4;
`;
const App:React.FC = ()=> {
  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <SidebarWrapper>

        </SidebarWrapper>
        <ContentWrapper>
          
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
}

export default App;
