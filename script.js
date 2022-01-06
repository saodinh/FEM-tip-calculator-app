// Functionality Breakdowns

// 1. Get elements needed
const billInput = document.getElementById("input-bill");
const peopleInput = document.getElementById("input-people");
const tipPercentLabels = document.querySelectorAll(".input-tip-label");
const tipPercentInputs = document.querySelectorAll("input[name='input-tip']");
const tipPercentCustomInput = document.getElementById("input-tip-custom");
const btnReset = document.getElementById("btn-reset");
const tipOutput = document.getElementById("tip-value");
const totalOutput = document.getElementById("total-value");
// 2. if (billInput change) or (tipPercentage change) or (numberOfPeople change) => call calcBill()
// 2.1 bill Input Change
billInput.addEventListener("input", () => {
    calcBill();
});
// 2.2 number Of People Input change
peopleInput.addEventListener("input", () => {
    calcBill();
});
// 2.3 Tip Percentage change (one of the label is clicked or input: tipPercentCustom is changed)
tipPercentLabels.forEach((label) =>
    label.addEventListener("click", () => {
        tipPercentCustomInput.value = "";
        // Why do i need this line???
        label.previousElementSibling.checked = true;
        calcBill();
    })
);

tipPercentCustomInput.addEventListener("input", () => {
    document.getElementById("input-tip-6").checked = true;
    document.getElementById("input-tip-6").value = tipPercentCustomInput.value;
    calcBill();
});

// 3. Reset button clicked => call Reset()
btnReset.addEventListener("click", () => {
    reset();
});

// 4. calcBill Function:
function calcBill() {
    console.log("calculating...");
    //   4.1: Get value from billInput, tipPercentage, numberOfPeople
    const bill = +billInput.value;
    const peopleNumber = +peopleInput.value;
    let tipPercent;
    // Value of tip percent = (value of input:checked)
    tipPercentInputs.forEach((input) => {
        if (input.checked === true) tipPercent = +input.value;
    });
    console.log(bill, peopleNumber, tipPercent);
    //   4.2: if (tip percentage < 0)|| billInput < 0 || numberOfPeople < 0 => call displayError()
    if (bill <= 0 || peopleNumber <= 0 || tipPercent <= 0) {
        if (bill <= 0) displayError("bill");
        if (peopleNumber <= 0) displayError("people");
        if (tipPercent <= 0) displayError("tip");
    } else {
        // else call clearError()
        clearError();
        //          Else: 4.2.1: Calculate tipAmount and total
        const tipAmount = (bill * tipPercent * 0.01) / peopleNumber;
        const total = (bill + bill * tipPercent * 0.01) / peopleNumber;
        //                4.2.2: display tipAmount and total
        tipOutput.innerText = `$ ${tipAmount.toFixed(2)}`;
        totalOutput.innerText = `$ ${total.toFixed(2)}`;
    }
}
// 5. Reset Function: 5.1 Reset BillInput value, tipPercentage, numberOfPeople
//                    5.2 Reset tipAmount and Total
function reset() {
    // 5.1 Reset BillInput value, tipPercentage, numberOfPeople
    billInput.value = "";
    peopleInput.value = "";
    tipPercentInputs.forEach((input) => {
        input.checked = false;
        tipPercentCustomInput.value = "";
    });
    // 5.2 Reset tipAmount and Total
    tipOutput.innerText = `$ 0.00`;
    totalOutput.innerText = `$ 0.00`;
    // 5.3: Reset Tip percentage and Number of People to default Value
    document.getElementById("input-tip-3").checked = true;
    document.getElementById("input-people").value = 1;
}
// 6. DisplayError Function:
function displayError(typeOfError) {
    if (typeOfError === "bill") billInput.classList.add("error");
    if (typeOfError === "people") peopleInput.classList.add("error");
    if (typeOfError === "tip") tipPercentCustomInput.classList.add("error");
}
// 7. clearError Function
function clearError() {
    billInput.classList.remove("error");
    peopleInput.classList.remove("error");
    tipPercentCustomInput.classList.remove("error");
}
