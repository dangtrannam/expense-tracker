import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/slices/transactionsSlice';
import { TextField, Button, MenuItem } from '@mui/material';
import { AppDispatch } from '../redux/store';

const AddTransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    dispatch(addTransaction(transaction));
    setType('income');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
        variant="outlined"
        margin="normal"
        fullWidth
      >
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </TextField>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={!amount}>
        Add Transaction
      </Button>
    </form>
  );
};

export default AddTransactionForm;
