import Container from '@components/layouts/Container';
import Wrapper from '@components/layouts/Wrapper';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './context/Socket';
import { ThemeProvider } from './context/Theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SocketProvider>
        <Wrapper>
          <Container />
        </Wrapper>
      </SocketProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
