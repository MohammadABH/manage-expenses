import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INNIT' });
	expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('Should add expense', () => {
	const expense = {
		id: '104',
		description: 'Water bill',
		note: '',
		createdAt: 30000,
		amount: 2500
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('Should edit expense', () => {
	const amount = 45000;
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[1].id,
		updates: {
			amount
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[1].amount).toBe(amount);
});

test('Should not edit expense if expense not found', () => {
	const amount = 45000;
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			amount
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});