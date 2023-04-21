import './App.css';
import {  Container } from '@chakra-ui/react';
import Home from './Home';
import Auth from './Auth'
import Top from './Top';

function App() {
  const user = localStorage.getItem('Tocken');
  if(user) {
    return (
      <Container
        maxW="xl"
        centerContent
      >
        <Top />
        <Home />
      </Container>
    );
  } else {
    return (
      <Container
        maxW="xl"
        centerContent
      >
        <Top />
        <Auth />
      </Container>
    );
  }
}

export default App;
