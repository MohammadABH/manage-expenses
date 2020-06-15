import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../actions/filters';

test('Should generate set start date action object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	});
});

test('Should generate set end date action object', () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	});
});

test('Set filter to filter by text', () => {
	const action = setTextFilter('water');
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: 'water'
	});
});

test('Set filter to filter by text with no arguments', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});

test('Set sort by to sort by date', () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: 'SORT_BY_DATE',
	});
});

test('Set sort by to sort by amount', () => {
	const action = sortByAmount();
	expect(action).toEqual({
		type: 'SORT_BY_AMOUNT',
	});
});