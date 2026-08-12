import { orders } from "./orders.js";
import { withVat, format, total } from "./pricing.js";

// Calculate each order's total
const ordersWithTotals = orders.map(order => {
    const orderTotal = order.items.reduce((sum, item) => {
        const { price, qty } = item;

        return sum + total(price, qty);
    }, 0);

    return {
        ...order,
        total: orderTotal
    };
});


// Print each order clearly
ordersWithTotals.forEach(order => {
    console.log(`\nOrder #${order.id} - ${order.customer}`);

    order.items.forEach(item => {
        const { name, price, qty } = item;

        console.log(
            `  ${name} x ${qty} = ${format(price * qty)}`
        );
    });

    console.log(`  Total: ${format(order.total)}`);
});


// Orders over 500 ETB
const ordersOver500 = ordersWithTotals.filter(
    order => order.total > 500
);

console.log("\nOrders over 500 ETB:");

ordersOver500.forEach(order => {
    console.log(
        `Order #${order.id} - ${order.customer}: ${format(order.total)}`
    );
});


// Grand total
const grandTotal = ordersWithTotals.reduce(
    (sum, order) => sum + order.total,
    0
);

console.log(`\nGrand Total: ${format(grandTotal)}`);