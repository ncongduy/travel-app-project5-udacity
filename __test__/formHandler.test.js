import { sentimented } from '../src/client/js/formHandler';
import { subjectivity } from '../src/client/js/formHandler';
import { agreement } from '../src/client/js/formHandler';
import { irony } from '../src/client/js/formHandler';

describe('sentimented function', () => {
	test('it should return a string (strong positive)', () => {
		const input = 'P+';
		const output = 'strong positive';

		expect(sentimented(input)).toEqual(output);
	});

	test('it should return a string (positive)', () => {
		const input = 'P';
		const output = 'positive';

		expect(sentimented(input)).toEqual(output);
	});

	test('it should return a string (neutral)', () => {
		const input = 'NEU';
		const output = 'neutral';

		expect(sentimented(input)).toEqual(output);
	});

	test('it should return a string (negative)', () => {
		const input = 'N';
		const output = 'negative';

		expect(sentimented(input)).toEqual(output);
	});

	test('it should return a string (strong negative)', () => {
		const input = 'N+';
		const output = 'strong negative';

		expect(sentimented(input)).toEqual(output);
	});

	test('it should return a string (without polarity)', () => {
		const input = 'NONE';
		const output = 'without polarity';

		expect(sentimented(input)).toEqual(output);
	});
});

describe('subjectivity function', () => {
	test('it should return a string', () => {
		const input = 'OBJECTIVE';
		const output = 'the text does not have any subjectivity marks.';

		expect(subjectivity(input)).toEqual(output);
	});

	test('it should return a string', () => {
		const input = 'SUBJECTIVE';
		const output = 'the text has subjective marks.';

		expect(subjectivity(input)).toEqual(output);
	});
});

describe('agreement function', () => {
	test('it should return a string', () => {
		const input = 'AGREEMENT';
		const output = 'the different elements have the same polarity.';

		expect(agreement(input)).toEqual(output);
	});

	test('it should return a string', () => {
		const input = 'DISAGREEMENT';
		const output =
			"there is disagreement between the different elements' polarity.";

		expect(agreement(input)).toEqual(output);
	});
});

describe('irony function', () => {
	test('it should return a string', () => {
		const input = 'NONIRONIC';
		const output = 'the text does not have any irony marks.';

		expect(irony(input)).toEqual(output);
	});

	test('it should return a string', () => {
		const input = 'IRONIC';
		const output = 'the text has irony marks.';

		expect(irony(input)).toEqual(output);
	});
});
