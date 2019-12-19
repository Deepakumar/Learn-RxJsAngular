import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError, from, EMPTY } from 'rxjs';
import { format } from 'url';

describe('COLD', () => {
  it('of with one value', () => {

  });

  it('of with 2 values', () => {

  });

  it('from', () => {

  });

  it('should trim the spaces', () => {
  });

  it('can search an alphabet', () => {
    const provided = search('e');
    const expected = cold('(e|)');
    expect(provided).toBeObservable(expected);
  });

  it('can return empty when no value found',() => {
    const provided = search('E');
    const expected = cold('|');
    expect(provided).toBeObservable(expected);
  })

  it('can search vowels',() => {
    const provided = searchvowels();
    const expected = cold('(aeiou|)');
    expect(provided).toBeObservable(expected);
  });

  const alphabets = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
  ];

  function search(val) {
    return alphabets.indexOf(val) > -1 ? of(`${val}`) : EMPTY;
  }

  function searchvowels() {
    const vowels = alphabets.filter(s => ['a','e','i','o','u'].indexOf(s) > -1 ? true : false);
    console.log(vowels);
    return from(vowels);
  }
});
