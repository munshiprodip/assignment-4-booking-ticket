 // get input value in integer
 function getValueToInt(id){
    return parseInt(document.getElementById(id).value);
}

function getValueToString(id){
    return document.getElementById(id).value;
}

// Set value in input element
function setValueToInput(value, id){
    document.getElementById(id).value = value;
}

// Get html element text in string
function getTextFromElement(id){
    return document.getElementById(id).innerText;
}

// Set text in a html element
function setTextToElement(text, id){
    document.getElementById(id).innerText = text;
}



// Update ticket quantity 
function updateTicketQuantity(value, category){
    let currentTicketQuantity = getValueToInt('ticket_quantity_' + category);
    let newTicketQuantity = currentTicketQuantity + value;

    if (newTicketQuantity<0) {
        return false;
    }

    setValueToInput(newTicketQuantity, 'ticket_quantity_' + category);
    calculatePrice();
}



// Calculate and display price and add Vat.
function calculatePrice(){
    let firstClassTicketPrice = getValueToInt('ticket_quantity_first')*150;
    let economyClassTicketPrice = getValueToInt('ticket_quantity_economy')*100;
    let subTotal = firstClassTicketPrice + economyClassTicketPrice
    let vat = subTotal*10/100;
    let grandTotal = subTotal+vat;

    setTextToElement(subTotal, 'sub_total');
    setTextToElement(vat, 'vat');
    setTextToElement(grandTotal, 'grand_total');
}


// Confirm booking
function bookNow(){
    if (validation()) {
        document.getElementById('book_now').style.display = 'none';
        document.getElementById('book_again').style.display = 'block';
        
        setTextToElement(getValueToString('your_name'), 'coustomer_name');
        setTextToElement(getValueToString('travel_from'), 'coustomer_travel_from');
        setTextToElement(getValueToString('travel_to'), 'coustomer_travel_to');
        setTextToElement(getValueToString('ticket_quantity_first'), 'coustomer_ticket_first');
        setTextToElement(getValueToString('ticket_quantity_economy'), 'coustomer_ticket_economy');
        setTextToElement(getTextFromElement('sub_total'), 'coustomer_sub_total');
        setTextToElement(getTextFromElement('vat'), 'coustomer_vat');
        setTextToElement(getTextFromElement('grand_total'), 'coustomer_grand_total');
    }
}


// Return to booking
function bookAgain(){
    document.getElementById('book_now').style.display = 'block';
    document.getElementById('book_again').style.display = 'none';
}


// Validate required data 
function validation(){
    let error = "";
    let status = true;
    if (getValueToString('your_name')=='') {
        error = "Name is required";
        status = false;
    }else if(getValueToString('travel_from')==''){
        error = "Travel From is required";
        status = false;
    }else if(getValueToString('travel_to')==''){
        error = "Travel To is required";
        status = false;
    }else if(getValueToInt('ticket_quantity_first') <1 && getValueToInt('ticket_quantity_economy')<1 ){
        error = "Please select at last 1 Ticket";
        status = false;
    }

    setTextToElement(error, 'error_message');
    return status;
}
