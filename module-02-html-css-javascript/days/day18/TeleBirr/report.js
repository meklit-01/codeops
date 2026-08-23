export const totalByType = (txns, type) =>
  txns
    .filter(transaction => transaction.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);


export const formatReceipts = txns =>
  txns.map(({ customer, amount }) =>
    `Receipt: ${customer} - ${amount} ETB`
  );


export const updateTransaction = (transaction, newAmount) => ({
  ...transaction,
  amount: newAmount
});