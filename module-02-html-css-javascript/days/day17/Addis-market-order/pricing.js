// pricing.js

export function withVat(price, vatRate = 0.15) {
    return price * (1 + vatRate);
}

export function format(amount) {
    return `${amount.toFixed(2)} ETB`;
}

export function total(price, qty) {
    return price * qty;
}
