import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {
    addTransaction,
    addTransactions,
    deleteTransaction, editTransaction,
    fetchTransactions,
    Transaction
} from '../slices/transactionsSlice';
import LocalStorageService from "../../services/LocalStorageService.ts";

// fetchTransactions
function* fetchTransactionsHandler() {
    const transactions = LocalStorageService.getItem<Transaction[]>('transactions');
    if (transactions) {
        yield put(addTransactions(transactions));
    }
}

function* fetchTransactionsWatcher() {
    yield takeEvery(fetchTransactions.type, fetchTransactionsHandler);
}

function* addTransactionHandler(action: ReturnType<typeof addTransaction>) {
    const transactions = LocalStorageService.getItem<Transaction[]>('transactions');

    const newTransactions = !transactions ? [action.payload] : [...transactions, action.payload];
    yield call(LocalStorageService.setItem, 'transactions', newTransactions);
}

function* addTransactionWatcher() {
    yield takeEvery(addTransaction.type, addTransactionHandler);
}

function* removeTransactionHandler(action: ReturnType<typeof deleteTransaction>) {
    const transactions = LocalStorageService.getItem<Transaction[]>('transactions');
    const newTransactions = transactions ? transactions.filter(transaction => transaction.id !== action.payload) : [];
    yield call(LocalStorageService.setItem, 'transactions', newTransactions);
}

function* deleteTransactionWatcher() {
    yield takeEvery(deleteTransaction.type, removeTransactionHandler);
}

function* updateTransaction(action: ReturnType<typeof editTransaction>) {
    const transactions = LocalStorageService.getItem<Transaction[]>('transactions');
    const newTransactions = transactions ? transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction) : [action.payload];
    yield call(LocalStorageService.setItem, 'transactions', newTransactions);
}

function* editTransactionWatcher() {
    yield takeEvery(editTransaction.type, updateTransaction);
}

export default function* transactionsSaga() {
    yield all([
            fork(fetchTransactionsWatcher),
            fork(addTransactionWatcher),
            fork(deleteTransactionWatcher),
            fork(editTransactionWatcher)
        ]
    );
}
