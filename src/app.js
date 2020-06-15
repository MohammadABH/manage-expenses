import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import '../node_modules/normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';

const store = configureStore();

store.dispatch(addExpense({ description:'Water bill', amount: 4500, createdAt: '6000' }));
store.dispatch(addExpense({ description:'Gas bill', amount: 1000, createdAt: '1000' }));
store.dispatch(addExpense({ description:'Rent', amount: 109500, createdAt: '500' }));
const state = store.getState()
const visible = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));