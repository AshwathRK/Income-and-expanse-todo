function togglePopup() {
    document.getElementById('inputForm').innerHTML =
        `<div class="inputBoxToAddNewCard col-span-3  flex items-center justify-around relative">
                    <label for="descLabel" class="absolute descLabel bg-blue-50 poppins-semibold">Description*</label>
                    <input id='descInput' class="description px-3 poppins-reguler" type="text" required placeholder="Enter description">
                    <label for="amountLabel" class="absolute amountLabel bg-blue-50 poppins-semibold">Amount*</label>
                    <input id='amountInput' class="amount px-3 poppins-reguler" type="number" required placeholder="Enter the amount">
                    <div class='radioInputs'>
                        <input type="radio" class='radioIncome' id="income" name="fav_language" value="INCOME">
                        <label for="income">Income</label><br>
                        <input type="radio" class='radioExpance' id="expance" name="fav_language" value="EXPANCE">
                        <label for="expance">Expance</label><br>
                    </div>
                    <div class="h-full flex flex-col justify-around btnSubmitandCancel">
                        <button id="submitBtn" class="bg-purple-500 outline-pink-300 text-white hover:outline-double" onclick="getTheValues()">Submit</button>
                        <button id="cancelBtn" class="text-red-50 outline-blue-500 bg-blue-600 hover:outline-double"
                            onclick="cancelCard()">Cancel</button>
                    </div>
                </div>`
}

function cancelCard() {
    document.getElementById('inputForm').innerHTML =
        `<div class="addCardCon flex items-center col-span-1 relative">
                    <button id="addCard" class="bg-purple-500 text-white hover:outline-pink-300 flex items-center justify-center" 
                    onclick="togglePopup()">
                        <img src="Asserts/tab.svg" class="w-4 mx-2 addNewImage">
                        Add new</button>`;
}


var cardDetails = [];
var cardNo = 0;
var lenthOfCurentCard = 0

function addNewCard(){
    for (let index = lenthOfCurentCard; index < cardDetails.length; index++) {
        console.log(cardDetails[index]);
        lenthOfCurentCard=lenthOfCurentCard+1;
    }
}

function getTheValues() {
    // Description
    let descriptionInput = document.getElementById('descInput');
    let valueFromDesc = descriptionInput.value;

    // Amount
    let amountInput = document.getElementById('amountInput');
    let valueFromAmt = amountInput.value;

    // Income
    let incomeCheckBox = document.getElementById('income');
    let valueOfIncomeCheckBox = incomeCheckBox.checked;

    // Expense
    let expanceCheckBox = document.getElementById('expance');
    let valueOfexpanceCheckBox = expanceCheckBox.checked;

    // Check for mandatory inputs
    if (!valueFromDesc || !valueFromAmt) {
        window.alert('Please fill all the mandatory details');
        return;
    }

    // Check if at least one checkbox is selected
    if (!valueOfexpanceCheckBox && !valueOfIncomeCheckBox) {
        window.alert('Select income or expense checkbox');
        return;
    }

    // Push values into array
    let transaction = {
        id: cardNo + 1,
        description: valueFromDesc,
        amount: valueFromAmt,
        income: valueOfIncomeCheckBox
    };

    cardDetails.push(transaction);
    cardNo=cardNo+1;
    // console.log(cardDetails);

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
    incomeCheckBox.checked = false;
    expanceCheckBox.checked = false;
    addNewCard();
}