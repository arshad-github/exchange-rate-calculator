const firstCurrency = document.getElementById('currency-one');
const firstAmount = document.getElementById('amount-one');
const secondCurrency = document.getElementById('currency-two');
const secondAmount = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function convert() {
    const currOne = firstCurrency.value;
    const currTwo = secondCurrency.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currOne}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currTwo];
            rateEl.innerText = `1 ${currOne} equates to ${rate} ${currTwo}`;
            secondAmount.value = (firstAmount.value * rate).toFixed(2);
        });
}

convert();

firstCurrency.addEventListener('change', convert);
firstAmount.addEventListener('input', convert);
secondCurrency.addEventListener('change', convert);
secondAmount.addEventListener('input', convert);

swap.addEventListener('click', () => {
    const temp = firstCurrency.value;
    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = temp;
    convert();
});
