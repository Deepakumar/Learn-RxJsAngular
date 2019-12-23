import { hot, cold } from 'jasmine-marbles';
import { concat, zip } from 'rxjs/operators';

describe('concat', () => {

  it('should concat 2 observables',() => {
    const $obs1 = cold('---a---b|');
    const $obs2 = cold('---c---d|');

    const $result = $obs1.pipe(concat($obs2));
    const $expected = cold('---a---b---c---d|');

    expect($result).toBeObservable($expected);
  });

  it('should contact 2 observables', () => {
    const $obs1 = cold('---a---b|');
    const sub1  =      '^-------!';

    const $obs2 = cold('---c---d|');
    const sub2  = '        ^-------!';

    const $result = $obs1.pipe(concat($obs2));
    const $expected = cold('---a---b---c---d|');

    expect($result).toBeObservable($expected);
    expect($obs1).toHaveSubscriptions(sub1);
    expect($obs2).toHaveSubscriptions(sub2);
  });

  it('serving pizza to customer', () => {
    const status = {
      orderCreated: 'order placed',
      paymentReceived: 'received',
      orderReady: 'ready',
      orderShipped: 'shipped'
    };

    const $orderCreated = cold('--c--|', {
      c: status.orderCreated
    });

    const $paymentReceived = cold('---p|',{
      p: status.paymentReceived
    });

    const $orderReady = cold('-r-|', {
      r: status.orderReady
    });

    const $orderShipped = cold('---s--|',{
      s: status.orderShipped
    });

    const $expected = cold('--f-----u-n----i--|',{
      f: status.orderCreated,
      u: status.paymentReceived,
      n: status.orderReady,
      i: status.orderShipped
    });

    const $result = serverPizza($orderCreated, $paymentReceived, $orderReady, $orderShipped);

    expect($result).toBeObservable($expected);

  });

  it('can zip 2 streams', () => {
    const $obs1 = cold('---a---b---|', {a: 1, b: 3});
    const $obs2 = cold('-----c---d---|', {c: 5, d: 7});
    const $result = $obs1.pipe(zip($obs2, (x: number, y: number) => x + y));
    const $expected = cold('-----x---y-|', { x: 1 + 5, y: 3 + 7});
    expect($result).toBeObservable($expected);
  });

  it('can create users from user properties', () => {
    const $names = cold('-a-b-c-d-e-|',{
      a: 'John',
      b: 'Paul',
      c: 'Neel',
      d: 'Stacy',
      e: 'Carey'
    });

    //const $userids = cold('-j-k-l-m-|')
  })

  it('should concat cold observables', () => {});

  it('should match result', () => {});

  it('should identify first subscription', () => {});

  it('should identify 2nd subscription', () => {});

  it('should concat hot observables', () => {});

    function serverPizza($sale, $payment, $kitchen, $shipOrReadyForPickup) {
      return $sale.pipe(concat($payment, $kitchen, $shipOrReadyForPickup));
    }
});
