function calculateBill() {
    const paymentPerMin = 65000 / 60;

    const totalBlockTimeMin = document.getElementById('block-time-min');
    const landingFeePerCycle = document.getElementById('take-off-land-fee');
    const noPrincipal = document.getElementById('selectedNames');
    const additionalCycle = document.getElementById('add-cycle');

    // Calculations
    const amountBlockTime = totalBlockTimeMin.value * paymentPerMin;
    const amountLandingFee = landingFeePerCycle.value * 5000;
    const amountTerminalFee = (noPrincipal.length + 1) * 500;

    let amountAddCycle;
    if (additionalCycle.value == 1) {
        amountAddCycle = 1000;
    } else if (additionalCycle.value > 1) {
        amountAddCycle = (additionalCycle.value - 1) * 2000 + 1000;
    } else {
        amountAddCycle = 0;
    }

    const sumBill = amountBlockTime + amountLandingFee + amountTerminalFee + amountAddCycle;

    // Return all parts neatly
    return {
        blockTime: amountBlockTime,
        landingFee: amountLandingFee,
        terminalFee: amountTerminalFee,
        additionalCycle: amountAddCycle,
        total: sumBill
    };
}
