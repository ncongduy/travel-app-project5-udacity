import { getDataFromServer } from '../src/client/js/getDataFromServer';
import { mockAPI } from '../src/server/mockAPI';

describe('get data from server', () => {
	test('it should get data from url (link)', async () => {
		const url = 'http://localhost:9000/test';
		const input = await getDataFromServer(url);
		const output = mockAPI;

		expect(input).toEqual(output);
	});
});