import React from 'react';
import NavBar from './components/NavBar';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <div>
      <Container maxWidth="lg">
        <NavBar/>
      </Container>
    </div>
  );
}

export default App;
