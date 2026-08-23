# TeleBirr Transaction Report

A small JavaScript report generator for TeleBirr transactions.

## Modules

### transactions.js

Contains the TeleBirr transaction data.

Each transaction has:

- id
- customer
- amount
- type

The type can be `credit` or `debit`.

### report.js

Contains reusable functions for processing transactions.

- `totalByType()` uses `filter` and `reduce` to calculate totals.
- `formatReceipts()` uses `map` and destructuring to create receipt strings.
- `updateTransaction()` uses the spread operator to create an updated copy without mutating the original transaction.

### app.js

Imports the transaction data and report functions, then prints the final report.

## Concepts Used

- `filter()`
- `map()`
- `reduce()`
- Object destructuring
- Spread operator
- Template literals
- ES modules
- `export` and `import`

## Sample Output

TeleBirr Transaction Report

Total Credits: 1050 ETB
Total Debits: 730 ETB

Receipts:

Receipt: Almaz - 250 ETB
Receipt: Dawit - 600 ETB
Receipt: Tigist - 180 ETB
Receipt: Hana - 450 ETB
Receipt: Yonas - 300 ETB

Original Transaction:

{ id: 1, customer: "Almaz", amount: 250, type: "debit" }

Updated Transaction:

{ id: 1, customer: "Almaz", amount: 300, type: "debit" }