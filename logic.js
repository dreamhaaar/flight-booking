const paymentPerMin = 65000 / 60;
const totalBlockTimeMin = document.getElementById('block-time-min');
const landingFeePerCycle = document.getElementById('take-off-land-fee');
const noPrincipal = document.getElementById('selectedNames');
const addCycle = document.getElementById('add-cycle');

//BLOCK TIME
const amountBlockTime = totalBlockTimeMin.value * paymentPerMin;

//LANDING FEE
const amountLandingFee = landingFeePerCycle.value * 5000;

//TERMINAL FEE
const amountTerminalFee = ( noPrincipal.length + 1 ) * 500;


//ADDITIONAL CYCLE
let amountAddCycle;
if(addCycle.value == 1){
    amountAddCycle = 1000;
} else if (addCycle.value > 1){
    amountAddCycle = (addCycle.value - 1) * 2000 + 1000;
} else
amountAddCycle = 0;

const sumBill = amountBlockTime + amountLandingFee + amountTerminalFee + amountAddCycle;

console.log(object);