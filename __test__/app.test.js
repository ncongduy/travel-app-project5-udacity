import { checkCityName } from '../src/client/js/app';

describe('checkCityName function', () => {
	test('it should return a string', () => {
		const input = 'Ho Chi Minh City';
		const output = 'ho chi minh';

		expect(checkCityName(input)).toEqual(output);
	});

    test('it should return a string', () => {
		const input = ' Helsinki ';
		const output = 'helsinki';

		expect(checkCityName(input)).toEqual(output);
	});
});