import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import TransactionItem from './TransactionItem';
import { List } from '@mui/material';
import {fetchTransactions} from "../redux/slices/transactionsSlice.ts";

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  console.log('transactions:', transactions);

  return (
    <List>
      {transactions?.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </List>
  );
};

export default TransactionList;
