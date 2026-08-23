// Exercise 1
const prices = [500, 800, 1200, 300, 1500];

const total = prices
  .map(price => price * 1.15)
  .filter(price => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log(`Total: ${total} ETB`);


// Exercise 2
const customer = {
  name: "Abebe",
  city: "Addis Ababa",
  balance: 5000
};

for (const [key, value] of Object.entries(customer)) {
  console.log(key, value);
}


// Exercise 3
const { name, city } = customer;

console.log(namee);
console.log(city);

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);


// Exercise 4
const updatedCustomer = {
  ...customer,
  city: "Bole",
  phone: "0911112"
};

console.log("Original customer:", customer);
console.log("Updated customer:", updatedCustomer);