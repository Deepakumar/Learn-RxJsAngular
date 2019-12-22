import { switchMap } from 'rxjs/operators';
import { of} from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

describe('can support observable data mocking', () => {

  it('can mock string value', () => {
    const $provided = hot('--a--',{a: 'apple'});
    $provided.subscribe(console.log);

    expect($provided).toBeObservable(hot('--a--',{a: 'apple'}));
  });

  it('can search character counts in a given text', () => {
    const $searchCharacter = hot('--x--', {x: 'a'});
    const $result = findCount('marble diagrams', $searchCharacter);

    const $expected = cold('--x--', { x: 3});
    expect($result).toBeObservable($expected);
  });

  it('can sort prices of the books from highest to the lowest', () => {
    const $bookPrices = cold('--a--', {
      A: [3, 69, 1, 4, 6, 4, 33, 1]
    });

    const $result = sortPrices($bookPrices);

    const $expected = cold('--a--', { A: [69, 33, 10, 6, 4, 3, 1]});
  });

  it('can search book by title',() => {
    const $title = cold('--t--',{t: 'The Road Ahead'});

    const $result = searchBook($title);

    const $expected = cold('--b--', { b: { author: 'Bill Gates', libraryID: 1254, title: 'The Road Ahead'}});
  });

  function findCount(text, $toSearch) {
    return $toSearch.pipe(
      switchMap((s: string) => of(text.match(new RegExp(s, 'g')).length))
    );
  }

  function sortPrices($prices) {
    return $prices.pipe(switchMap((a: []) => of(a.sort((x, y) => y - x))));
  }

  function searchBook($title) {
    const library = [
      {author: 'Bill Gates', title: 'Water Isaacson', libraryID: 4264},
      {author: 'Suzanne', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
    ];

    return $title.pipe(switchMap(title => of(library.filter(book => book.title === title).pop())));
  }

});
