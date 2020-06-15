import moment from 'moment';

export default [{
	id: '1',
	description: 'Coffee',
	note: '',
	amount: 300,
	createdAt: 0
},
{
	id: '2',
	description: 'Shopping',
	note: '',
	amount: 1500,
	createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
	id: '3',
	description: 'Food',
	note: '',
	amount: 950,
	createdAt: moment(0).add(4, 'days').valueOf()
}
];