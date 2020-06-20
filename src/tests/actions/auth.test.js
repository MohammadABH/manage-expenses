import { login, logout } from '../../actions/auth';

test('Should generate login action object', () => {
	const action = login('randomID');
	expect(action).toEqual({
		type: 'LOGIN',
		uid: 'randomID'
	});
});

test('Should generate logout action object', () => {
	const action = logout();
	expect(action).toEqual({
		type: 'LOGOUT'
	});
});