// this file contains javascript for form validation and dynamically changing the signup page
// it might also include ajax calls later

function validate() {
    var form = document.getElementById("signupForm");
    var isValid = true;
    var msg = "Form is valid";
    // alert("you clicked the owo button");
    // console.log(form);
    // console.log("'"+form.fName.value+"'");
    if (form.fName.value == "") {
        msg = "You must enter a first name\n";
        isValid = false;
        form.fName.focus();
    }
    if (form.lName.value =="") {
        if (isValid) {
            msg = "You must enter a last name\n";
            isValid = false;
            form.lName.focus();
        } else {
            msg += "You must enter a last name\n";
        }
    }
    if (form.rcsid.value == "") {
        if (isValid) {
            msg = "You must enter your RCSid\n";
            isValid = false;
            form.rcsid.focus();
        } else {
            msg += "You must enter your RCSid\n";
        }
    }
    if (!form.online.checked && !form.inperson.checked) {
        if (isValid) {
            msg = "You need to select if you are online or in person\n";
            isValid = false;
        }
        else {
            msg += "You need to select if you are online or in person\n";
        }
    }

    if (form.online.checked ) { 
        if (form.webex.value == "") {
            if (isValid) {
                msg = "You need to enter your personal webex room\n";
                form.webex.focus();
            }
            else {
                msg += "You need to enter your personal webex room\n";
            }
        }
    }

    alert(msg);
    return isValid;
}

function check() {
    var loc = document.getElementById("signupForm");
    if (loc.online.checked) {
        //ask for the persons webex room link
        var output = "<fieldset>";
        output += "<legend>webex</legend>";
        output += '<label type="field" for="webex">webex room link:</label>';
        output += '<div class="value"><input type="text" id="webex" size="60px" placeholder="https://rensselaer.webex.com/meet/smithj12"></div>';
        output += '</fieldset>';
        $('#location').html(output);
    } else { //inperson is checked
        //make the div empty b/c theres no additional info needed
        $('#location').html("");
    }
}