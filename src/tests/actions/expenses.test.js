import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'xyz123'
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach ((done) => {
	const expenseData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expenseData[id] = { description, note, amount, createdAt };
	});
	database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('Should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('Should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('Should edit expense object', () => {
	const action = editExpense(123, { note: 'New note' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 123,
		updates: {
			note: 'New note'
		}
	});
});

test('Should edit expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	const updates = { amount: 1023 };
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().amount).toBe(updates.amount);
		done();
	});
});	

test('Should setup expense action object with provided values', () => {
	const expenseData = {
		description: 'Rent',
		amount: 109500,
		createdAt: 1000,
		note: 'Last month rent'	
	};
	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[0]
	});
});

test('Should add expense to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: 'Water bill',
		amount: 50000,
		note: 'Monthly bill',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData 
			}
		});

		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('Should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const defaultExpense = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	};

	store.dispatch(startAddExpense(defaultExpense)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpense 
			}
		});

		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense);
		done();
	});
});

test('Should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses 
	});
});

test('Should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});