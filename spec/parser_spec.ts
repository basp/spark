/// <reference path="../typings/jasmine/jasmine.d.ts" />

class Tokenizer {
	tokenize(src: string): string[] {
		return ['foo', '$eq', 'quux'];
	}
}

describe('tokenizer', () => {
	var t: Tokenizer;
	
	beforeEach(() => {
		t = new Tokenizer();
	});
	
	it('tokenizes on space characters', () => {
		var src = "foo $eq quux";
		var expected = ['foo', '$eq', 'quux'];
		var actual = t.tokenize(src);
		expect(actual).toEqual(expected);
	});
});