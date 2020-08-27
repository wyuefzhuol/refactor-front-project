function formatAmount(amount) {
  let format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format;
  return format(amount / 100);
}

function calcTragedyAmount(perf) {
  let thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}

function calcComedyAmount(perf) {
  let thisAmount = 30000;
  if (perf.audience > 20) {
    thisAmount += 10000 + 500 * (perf.audience - 20);
  }
  return thisAmount + 300 * perf.audience;
}

function calcAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = calcTragedyAmount(perf);
      break;
    case 'comedy':
      thisAmount = calcComedyAmount(perf);
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function addCredits(play, perf) {
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

function generateOrderDetail(invoice, plays) {
  let orderDetails = [];
  let totalAmount = 0;
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calcAmount(play, perf);
    orderDetails.push({
      playName: play.name,
      amount: formatAmount(thisAmount),
      perfAudience: perf.audience
    })
    totalAmount += thisAmount;
    volumeCredits += addCredits(play, perf);
  }
  totalAmount = formatAmount(totalAmount);
  return { orderDetails, totalAmount, volumeCredits };
}

module.exports = {
  generateOrderDetail
};