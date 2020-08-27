const test = require('ava');
const {statement} = require('../src/statement');

test('test1: customer Eric without performances', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': []
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    'Amount owed is $0.00\n' +
    'You earned 0 credits \n');
});

test('test2: customer Eric with a performance 29 hamlet', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 29,
      }
    ]
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    ' Hamlet: $400.00 (29 seats)\n' +
    'Amount owed is $400.00\n' +
    'You earned 0 credits \n');
});

test('test3: customer Eric with a performance 30 hamlet', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      }
    ]
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    ' Hamlet: $400.00 (30 seats)\n' +
    'Amount owed is $400.00\n' +
    'You earned 0 credits \n');
});

test('test4: customer Eric with a performance 19 as-like', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 19,
      }
    ]
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    ' As You Like It: $357.00 (19 seats)\n' +
    'Amount owed is $357.00\n' +
    'You earned 3 credits \n');
});

test('test5: customer Eric with a performance 20 as-like', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 20,
      }
    ]
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    ' As You Like It: $360.00 (20 seats)\n' +
    'Amount owed is $360.00\n' +
    'You earned 4 credits \n');
});

test('test6: customer Eric with a performance 30 hamlet 19 as-like 29 othello', t => {
  //given
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      },
      {
        'playID': 'as-like',
        'audience': 19,
      },
      {
        'playID': 'othello',
        'audience': 29,
      },
    ],
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for Eric\n' +
    ' Hamlet: $400.00 (30 seats)\n' +
    ' As You Like It: $357.00 (19 seats)\n' +
    ' Othello: $400.00 (29 seats)\n' +
    'Amount owed is $1,157.00\n' +
    'You earned 3 credits \n');
});

test('test7: customer Eric with a performance not found', t => {
  //given
  const plays = {
    'othello': {
      'name': 'Othello',
      'type': 'tragedy1',
    },
  };
  const invoice = {
    'customer': 'Eric',
    'performances': [
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  try {
    //when
    statement(invoice, plays);
    t.fail();
  } catch (e) {
    //then
    t.is(e.message, 'unknown type: tragedy1');
  }
});

const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};