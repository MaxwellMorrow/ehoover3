export default function toCurrency(number: number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
