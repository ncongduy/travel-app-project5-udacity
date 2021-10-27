import { checkCityName } from '../src/client/js/utility/checkCityName';

describe('check city name', () => {
	test('it should return true', () => {
		const input = checkCityName('helsinki');
		const output = true;

		expect(input).toEqual(output);
	});

    test('it should return false', () => {
		const input = checkCityName('@helsinki');
		const output = false;

		expect(input).toEqual(output);
	});

    test('it should return false', () => {
		const input = checkCityName('!ho chi minh');
		const output = false;

		expect(input).toEqual(output);
	});

    test('it should return true', () => {
		const input = checkCityName('ho chi minh');
		const output = true;

		expect(input).toEqual(output);
	});
});