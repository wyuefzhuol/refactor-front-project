const {generateOrderDetail} = require('./orderDetails');

function generateStatementTxt(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  let order = generateOrderDetail(invoice, plays);
  for (let orderDetail of order.orderDetails) {
    result += ` ${orderDetail.playName}: ${orderDetail.amount} (${orderDetail.perfAudience} seats)\n`;
  }
  result += `Amount owed is ${order.totalAmount}\n`;
  result += `You earned ${order.volumeCredits} credits \n`;
  return result
}

function generateStatementHtml(invoice, plays) {
  let result = `<h1>Statement for ${invoice.customer}</h1>`;
  let order = generateOrderDetail(invoice, plays);
  result += `<ul>`;
  for (let orderDetail of order.orderDetails) {
    result += ` <li>${orderDetail.playName}: ${orderDetail.amount} (${orderDetail.perfAudience} seats)</li>`;
  }
  result += `</ul>`;
  result += `<h3>Amount owed is ${order.totalAmount}</h3>`;
  result += `<h4>You earned ${order.volumeCredits} credits</h4>`;
  return result
}

function statement (invoice, plays) {
  return generateStatementTxt(invoice, plays);
}

function statementToHtml(invoice, plays) {
  return generateStatementHtml(invoice, plays);
}

module.exports = {
  statement, statementToHtml
};
