import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTransaction, Transaction } from '../redux/slices/transactionsSlice.ts';
import { TextField, Button, MenuItem } from '@mui/material';
import { RootState, AppDispatch } from '../redux/store.ts';

interface EditTransactionFormProps {
    transactionId: number;
    onClose: () => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transactionId, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const transaction = useSelector((state: RootState) => state.transactions.transactions.find(t => t.id === transactionId));

    const [type, setType] = useState<'income' | 'expense'>(transaction?.type || 'income');
    const [amount, setAmount] = useState<string>(transaction?.amount.toString() || '');

    useEffect(() => {
        if (transaction) {
            setType(transaction.type);
            setAmount(transaction.amount.toString());
        }
    }, [transaction]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (transaction) {
            const updatedTransaction: Transaction = {
                ...transaction,
                type,
                amount: parseFloat(amount),
            };
            dispatch(editTransaction(updatedTransaction));
            onClose();
        }
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Transaction
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary" fullWidth>
                Cancel
            </Button>
        </form>
    );
};

export default EditTransactionForm;
