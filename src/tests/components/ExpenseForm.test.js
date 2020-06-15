import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses'
import moment from 'moment';
import  ExpenseForm from '../../components/ExpenseForm';

test('Sould render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm correctly with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
	expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }	
	}); 
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
	const value = 'New description';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
});

test('Should set note on input change', () => {
	const value = 'New note';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('textarea').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if valid input', () => {
	const value = '102.5';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe(value);
});

test('Should set amount if invalid input', () => {
	const value = '102.555';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe('');
});

test('Should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', {
	  preventDefault: () => { }
	});
	expect(wrapper.state('error')).toBe(undefined);
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
	  description: expenses[0].description,
	  amount: expenses[0].amount,
	  note: expenses[0].note,
	  createdAt: expenses[0].createdAt
	});
});

test('Should set new date on date change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const now = moment();
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now); 
});

test('Should set new calendar focus on change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const focused = true;
	wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused); 
});