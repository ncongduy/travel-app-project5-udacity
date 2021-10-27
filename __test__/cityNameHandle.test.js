import { cityNameHandle } from '../src/client/js/utility/cityNameHandle';

describe('cityNameHandle function', () => {
	test('it should return a string', () => {
		const input = 'Ho Chi Minh City';
		const output = 'ho chi minh';

		expect(cityNameHandle(input)).toEqual(output);
	});

    test('it should return a string', () => {
		const input = ' Helsinki ';
		const output = 'helsinki';

		expect(cityNameHandle(input)).toEqual(output);
	});

	test('it should return a string', () => {
		const input = 'hoi an';
		const output = 'hoi an';

		expect(cityNameHandle(input)).toEqual(output);
	});
});