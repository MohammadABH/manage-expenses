import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
	const res = selectExpensesTotal([]);
	expect(res).toBe(0);
});

test('Should return the price of a single expense', () => {
	const res = selectExpensesTotal([expenses[0]]);
	expect(res).toBe(300);
});

test('Should return the price of multiple expenses', () => {
	const res = selectExpensesTotal(expenses);
	expect(res).toBe(2750);
});