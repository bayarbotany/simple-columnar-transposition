import { Button, Card, Typography } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import InputCard from './components/InputCard';
import OutputCard from './components/OutputCard';

function App() {
  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      }}
    >
      
      <InputCard />
       <OutputCard />

    </Container>
  );
}

export default App;
