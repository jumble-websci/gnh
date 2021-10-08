// this file contains javascript for form validation and dynamically changing the signup page
// it also includes ajax calls for simple weather widget that tells us the weather at RPI

function validate() {
    var form = document.getElementById("signupForm");
    var isValid = true;
    var msg = "Form is valid";

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
        output += "<legend>Webex Info</legend>";
        output += '<label type="field" for="webex">Webex room link:</label>';
        output += '<div class="value"><input type="text" id="webex" size="60px" placeholder="https://rensselaer.webex.com/meet/smithj12"></div>';
        output += '</fieldset>';
        $('#location').html(output);
    } else { //inperson is checked
        //make the div empty b/c theres no additional info needed
        $('#location').html("");
    }
}

$(document).ready(function() {
    $.ajax({
        type:"POST",
        url:"https://api.openweathermap.org/data/2.5/onecall?lat=42.73&lon=-73.68&exclude=minutely,hourly,alerts&units=imperial&appid=904329b4887857a349c608a92182b8e6",
        dataType:"json",
        success: function(data, status) {
            //do stuff here
            output = "";

            output += '<span class="icon">';
            output += '<img width="84" height="84" src="https://openweathermap.org/img/wn/'+    data.current.weather[0].icon + '@2x.png"> </span>';
            output += '<span class="desc">';
            output += '<span class="temp">' + data.current.temp +'&deg; &nbsp;'+ data.current.weather[0].description + '</span>';
            output += '<span class="hl">';
            output += '<span class="hl-labels"> Feels like:&nbsp;</span>';
            output += '<span>' + data.current.feels_like + '&deg; &nbsp; </span>';
            output += '<span class="hl-labels"> High:&nbsp;</span>';
            output += '<span>' + data.daily[0].temp.max +'&deg; &nbsp;</span>';
            output += '<span class="hl-labels"> Low:&nbsp; </span>';
            output += '<span>' + data.daily[0].temp.min +'&deg; &nbsp;</span>';
            output += '</span>';
            output += '</span>';

            console.log(data);
            $('#weather').html(output);
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
});

