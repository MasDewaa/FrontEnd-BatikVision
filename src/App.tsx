import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        
        <HomePage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;