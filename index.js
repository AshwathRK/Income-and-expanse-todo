var cardDetails = [];
var cardNo = 0;
var lengthOfCurrentCard = 0;

var totalIncome = 0;
var totalExapnce = 0;
var totalNetBalance = 0;



window.sessionStorage.setItem("items", JSON.stringify(cardDetails));
var storedArray = JSON.parse('[' + sessionStorage.getItem("items") + ']');
var i;
for (i = 0; i < storedArray.length; i++) {

}



// To disply the input box when clicking the 'Add new' card button
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
                        <label for="expance">Expense</label><br>
                    </div>
                    <div class="h-full flex flex-col justify-around btnSubmitandCancel">
                        <button id="submitBtn" class="bg-purple-500 outline-pink-300 text-white hover:outline-double" onclick="getTheValues()">Submit</button>
                        <button id="cancelBtn" class="text-red-50 outline-blue-500 bg-blue-600 hover:outline-double"
                            onclick="cancelCard()">Cancel</button>
                    </div>
                </div>`
}

// Cancel button functionality
function cancelCard() {
    document.getElementById('inputForm').innerHTML =
        `<div class="addCardCon flex items-center col-span-1 relative">
                    <button id="addCard" class="bg-purple-500 text-white hover:outline-pink-300 flex items-center justify-center" 
                    onclick="togglePopup()">
                        <img src="Asserts/tab.svg" class="w-4 mx-2 addNewImage">
                        Add new</button>`;
}


//Count the total income, expance and net balance

function displyTheTotalValue() {
    for (let index = lengthOfCurrentCard - 1; index < cardDetails.length; index++) {
        if (cardDetails[index].income) {
            totalIncome = totalIncome + Number(cardDetails[index].amount)
        }
        else {
            totalExapnce = totalExapnce + Number(cardDetails[index].amount)
        }
    }
    totalNetBalance = totalIncome - totalExapnce
}

// Add New Card
function addNewCard() {
    let newCardInContent = "";

    let tableContent = document.getElementById("contentId");

    for (let index = lengthOfCurrentCard; index < cardDetails.length; index++) {
        function validateIncome(data) {
            return data === true ? "Income" : "Expense";
        }

        newCardInContent += `
            <div id='tableContent${index + 1}' class="tableCondent flex justify-between items-center grid grid-cols-5 bg-blue-200">
                <h2 id=cardNo${index + 1} class="cardNO">${index + 1}</h2>
                <h2 class="transactionType">${validateIncome(cardDetails[index].income)}</h2>
                <h2 class="description">${cardDetails[index].description}</h2>
                <h2 class="amount">${cardDetails[index].amount}</h2>
                <div class="actionBtnCon flex justify-around">
                    <button onclick="editCard(${index})" id="edit${index + 1}" class="actionButtons"><img src="Asserts/edit.svg"></button>
                    <button onclick="deleteCard(${index})" id="delete${index + 1}" class="actionButtons"><img src="Asserts/delete.svg"></button>
                </div>
            </div>`;

        lengthOfCurrentCard++;
        displyTheTotalValue()
        document.getElementById('totalIncome').innerText = totalIncome;
        document.getElementById('totalExpense').innerText = totalExapnce;
        document.getElementById('netBalance').innerText = totalNetBalance;
    }

    // Append the generated content correctly
    tableContent.insertAdjacentHTML("beforeend", newCardInContent);
}

// Get the Value from the input box
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
    cardNo = cardNo + 1;
    // console.log(cardDetails);

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
    incomeCheckBox.checked = false;
    expanceCheckBox.checked = false;
    addNewCard();
    cancelCard()
}


// Get the Value from the input box
function removeItem(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);

    if (index !== -1) {
        array.splice(index, 1);
    }

}


function changeID() {
    for (let index = 0; index < cardDetails.length; index++) {
        cardDetails[index].id = index + 1
    }
}


function appendTheCardNo() {
    let updateCardAfterDelete = ''

    let tableContent = document.getElementById("contentId");

    for (let index = 0; index < cardDetails.length; index++) {

        function validateIncome(data) {
            return data === true ? "Income" : "Expense";
        }

        updateCardAfterDelete += `
            <div id='tableContent${index + 1}' class="tableCondent flex justify-between items-center grid grid-cols-5 bg-blue-200">
                <h2 id=cardNo${index + 1} class="cardNO">${cardDetails[index].id}</h2>
                <h2 class="transactionType">${validateIncome(cardDetails[index].income)}</h2>
                <h2 class="description">${cardDetails[index].description}</h2>
                <h2 class="amount">${cardDetails[index].amount}</h2>
                <div class="actionBtnCon flex justify-around">
                    <button onclick="editCard(${index})" id="edit${index + 1}" class="actionButtons"><img src="Asserts/edit.svg"></button>
                    <button onclick="deleteCard(${index})" id="delete${index + 1}" class="actionButtons"><img src="Asserts/delete.svg"></button>
                </div>
            </div>`
    }

    tableContent.innerHTML = updateCardAfterDelete;

}

function deleteCard(value) {

    let deleteConfirmation = window.confirm("Are you sure you want to delete this card?")

    if (deleteConfirmation == true) {
        removeItem(cardDetails, cardDetails[value])
        let parentElementin = document.getElementById("contentId");
        let childElement = document.getElementById(`tableContent${value + 1}`);
        changeID()
        parentElementin.removeChild(childElement)
        appendTheCardNo();
        lengthOfCurrentCard--;
        totalIncome = 0;
        totalExapnce = 0;
        totalNetBalance = 0;
        displyTheTotalValue()
        document.getElementById('totalIncome').innerText = totalIncome;
        document.getElementById('totalExpense').innerText = totalExapnce;
        document.getElementById('netBalance').innerText = totalNetBalance;
    }
}

function editCard(cardID) {
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
                        <label for="expance">Expense</label><br>
                    </div>
                    <div class="h-full flex flex-col justify-around btnSubmitandCancel">
                        <button id="submitBtn" class="bg-purple-500 outline-pink-300 text-white hover:outline-double" onclick="updateTheValues(${cardID})">Update</button>
                        <button id="cancelBtn" class="text-red-50 outline-blue-500 bg-blue-600 hover:outline-double"
                            onclick="cancelCard()">Cancel</button>
                    </div>
                </div>`

    document.getElementById('descInput').value = cardDetails[cardID].description
    document.getElementById('amountInput').value = cardDetails[cardID].amount
    if (cardDetails[cardID].income == true) {
        document.getElementById('income').checked = true;
    }
    else {
        document.getElementById('expance').checked = true;
    }

}

function updateTheValues(ID) {

    let updateDescriptionValue = document.getElementById('descInput').value
    cardDetails[ID].description = updateDescriptionValue

    let updateAmountValue = document.getElementById('amountInput').value
    cardDetails[ID].amount = updateAmountValue

    let incomeCheckBox = document.getElementById('income');
    let valueOfIncomeCheckBox = incomeCheckBox.checked;

    cardDetails[ID].income = valueOfIncomeCheckBox

    appendTheCardNo();
    cancelCard()
}

function resetCard() {

    if (cardDetails.length == 0) {
        window.alert("No card in the table!")
    } else {

        let confirmationToResetCards = window.confirm("Alert! If reset the card, all cards will be deleted.")

        if (confirmationToResetCards == true) {
            cardDetails.length = 0
            let tableContent = document.getElementById("contentId");
            tableContent.innerHTML = ''
            totalIncome = 0;
            totalExapnce = 0;
            totalNetBalance = 0;
            document.getElementById('totalIncome').innerText = totalIncome;
            document.getElementById('totalExpense').innerText = totalExapnce;
            document.getElementById('netBalance').innerText = totalNetBalance;
        }
    }
}

