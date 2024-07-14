import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
  filter: 'all' | 'income' | 'expense';
}

const initialState: TransactionsState = {
  transactions: [],
  filter: 'all',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchTransactions: () => {},
    addTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = [...action.payload];
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'income' | 'expense'>) => {
      state.filter = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const {
  addTransaction,
  setFilter,
  fetchTransactions ,
  addTransactions,
  deleteTransaction,
  editTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
