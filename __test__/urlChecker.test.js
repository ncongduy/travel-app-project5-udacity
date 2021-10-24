import { checkForUrl } from '../src/client/js/urlChecker';

describe('check url function', () => {
	test('it should return a boolean', () => {
		const input = 'https://www.udacity.com/';
		const output = true;

		expect(checkForUrl(input)).toEqual(output);
	});
});
