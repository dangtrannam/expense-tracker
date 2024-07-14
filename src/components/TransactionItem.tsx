import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemText, Button, ListItemSecondaryAction, Dialog } from '@mui/material';
import { deleteTransaction, Transaction } from '../redux/slices/transactionsSlice';
import EditTransactionForm from './EditTransactionForm';
import { AppDispatch } from '../redux/store';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditOpen, setEditOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
      <>
        <ListItem>
          <ListItemText
              primary={`$${transaction.amount} - ${transaction.type}`}
              secondary={new Date(transaction.date).toLocaleDateString()}
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" color="primary" onClick={handleEditOpen}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Dialog open={isEditOpen} onClose={handleEditClose}>
          <EditTransactionForm transactionId={transaction.id} onClose={handleEditClose} />
        </Dialog>
      </>
  );
};

export default TransactionItem;
