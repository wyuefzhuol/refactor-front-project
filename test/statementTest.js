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

const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


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