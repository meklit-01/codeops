import { transactions } from "./transactions.js";

import {
  totalByType,
  formatReceipts,
  updateTransaction
} from "./report.js";


// Calculate totals
const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");


// Build receipt list
const receipts = formatReceipts(transactions);


// Update one transaction without changing the original
const originalTransaction = transactions[0];

const updatedTransaction = updateTransaction(originalTransaction, 300);


// Print report
console.log("=== TeleBirr Transaction Report ===");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits: ${totalDebits} ETB`);

console.log("\nReceipts:");

receipts.forEach(receipt => {
  console.log(receipt);
});

console.log("\nOriginal Transaction:");
console.log(originalTransaction);

console.log("\nUpdated Transaction:");
console.log(updatedTransaction);