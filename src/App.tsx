import { Provider } from 'react-redux';
import store from './redux/store';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import { Container, Typography } from '@mui/material';
import React from "react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Personal Finance Tracker
        </Typography>
        <AddTransactionForm />
        <TransactionList />
      </Container>
    </Provider>
  );
};

export default App;
