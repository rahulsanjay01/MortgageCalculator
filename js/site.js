//Retrieving the values from the page
function getValues(){
    let mortgageAmount = document.getElementById("mortgageAmountInput").value;
    let mortgageAmount = document.getElementById("totalMonthsInput").value;
    let mortgageAmount = document.getElementById("rateInput").value;

    if (mortgageAmount == ""){
        mortgageAmount = parseFloat(18000);
    } else {
        mortgageAmount = parseFloat(mortgageAmount);
    }

    if (months == ""){
        months = parseFloat(80);
    } else {
        months = parseFloat(months);
    }

    if (rate == "") {
        rate = parseFloat(4);
    } else {
        rate = parseFloat(rate);
    }

    //Mortgage calculation 
    let resultsHTML = mortgageCalculation(mortgageAmount, rate, months);

    //show the html to the user
    displayResults(resultsHTML);
}

// Calculations for the amorization schedule
function mortgageCalculation(mortgageAmount, rate, months){

    let resultsObject = {};

    let totalInterest = 0;
    let balance = mortgageAmount;
    let interestPayment = 0;
    let principlePayment;

    // Caclulation of the total monthly payment
    let monthExponent = -Math.abs(months);
    let monthlyPayment = (mortgageAmount * (rate/1200)) / (1-(1+(rate/1200))**(monthExponent));
    monthlyPayment = parseFloat(monthlyPayment);

    let html = "";

    for (let i =1; i<= months; i++){
        let month = i;
        interestPayment = parseFloat(balance*(rate/1200));
        principlePayment = parseFloat(monthlyPayment - (balance * (rate/1200)));
        totalInterest = parseFloat((totalInterest + interestPayment));
        balance -= principlePayment;
        balance = Math.abs(parseFloat(balance));

        html += `${month}${monthlyPayment.toFixed(2)}${principlePayment.toFixed(2)}${interestPayment.toFixed(2)}${totalInterest.toFixed(2)}${balance.toFixed(2)}`
    }
} 
