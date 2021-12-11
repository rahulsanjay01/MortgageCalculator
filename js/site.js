//Retrieving the values from the page
function getValues(){

    //making the empty table invisible
    document.getElementById("table").classList.add("invisible");

    let mortgageAmount = document.getElementById("mortgageAmountInput").value;
    let months = document.getElementById("totalMonthsInput").value;
    let rate = document.getElementById("rateInput").value;

    if (mortgageAmount == ""){
        mortgageAmount = parseFloat(380000);
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
    let principalPayment;

    // Caclulation of the total monthly payment
    let monthExponent = -Math.abs(months);
    let monthlyPayment = (mortgageAmount * (rate/1200)) / (1-(1+(rate/1200))**(monthExponent));
    monthlyPayment = parseFloat(monthlyPayment);

    let html = "";

    for (let i = 1; i <= months; i++){
        let month = i;
        interestPayment = parseFloat(balance*(rate/1200));
        principalPayment = parseFloat(monthlyPayment - (balance * (rate/1200)));
        totalInterest = parseFloat((totalInterest + interestPayment));
        totalInterest = parseFloat(totalInterest);
        balance -= principalPayment;
        balance = Math.abs(parseFloat(balance));

        html += `<tr><td>${month}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principalPayment.toFixed(2)}</td><td>${interestPayment.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`
    }

    let totalCost = mortgageAmount + totalInterest;

    //Using the .toLocaleString to convert to $ format
    //Displaying the calculated data in the correct places accordingly

    resultsObject.monthlyPayment = monthlyPayment.toLocaleString('en-US',{style: 'currency', currency:'USD'});

    resultsObject.totalPrincipal = mortgageAmount.toLocaleString('en-US',{style: 'currency', currency:'USD'});

    resultsObject.totalInterest = totalInterest.toLocaleString('en-US',{style: 'currency', currency:'USD'});

    resultsObject.totalCost = totalCost.toLocaleString('en-US',{style: 'currency', currency:'USD'});

    resultsObject.html = html;

    return resultsObject;

} 

// Displaying the results
function displayResults(resultsObject){
    document.getElementById("monthPaymentsOutput").innerHTML = resultsObject.monthlyPayment;
    document.getElementById("totalPrincipalOutput").innerHTML = resultsObject.totalPrincipal;
    document.getElementById("totalInterestOutput").innerHTML = resultsObject.totalInterest;
    document.getElementById("totalCostOutput").innerHTML = resultsObject.totalCost;
    document.getElementById("results").innerHTML = resultsObject.html;

    document.getElementById("table").classList.remove("invisible");

}

// Making the reset button functional
function resetPage(){

    //making the empty table invisible
    document.getElementById("table").classList.add("invisible");

    mortgageAmount = document.getElementById("mortgageAmountInput").value = "";
    months = document.getElementById("totalMonthsInput").value = "";
    rate = document.getElementById("rateInput").value = "";

    document.getElementById("monthPaymentsOutput").innerHTML ="";
    document.getElementById("totalPrincipalOutput").innerHTML ="";
    document.getElementById("totalInterestOutput").innerHTML ="";
    document.getElementById("totalCostOutput").innerHTML ="";
    document.getElementById("results").innerHTML = "";

}
