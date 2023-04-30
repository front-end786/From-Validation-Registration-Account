/*------------------------------------ 
Reusable Variables -------------------
--------------------------------------
*/

const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const small = document.querySelector('small');

/*------------------------------------ 
Reusable Functions -------------------
--------------------------------------
*/

// Show Error

const showError = function (input, message) {
    const formControl = input.parentElement;
    // formControl.className = 'form-control loss';
    formControl.classList.add('loss');
    const small = formControl.querySelector('small');
    small.textContent = message;
}

// Show Success

const showSuccess = function (input) {
    const formControl = input.parentElement;
    formControl.classList.remove('loss');
    formControl.classList.add('success');
}

// Check Email

const checkEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email.value.trim())) {
        showSuccess(email)
    }
    else {
        showError(email, 'Email is not valid')
    }
};

// Check FiledName

const getFieldName = function (e) {
    return e.id.charAt(0).toUpperCase() + e.id.slice(1);
}

// Check Length

const checkLength = function (el, min, max) {
    if (el.value.length < min) {
        showError(el, `${getFieldName(el)} must be at least ${min} charecters`);
    }
    else if (el.value.length > max) {
        showError(el, `${getFieldName(el)} must be less then ${max}`);
    }
}

// Check Password Match

const chekcPasswordsMatch = function (pass1, pass2) {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'Password is not Match');
    }

}

// Check Requirements

const checkRequired = function (inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '' || input === null) {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    })
}

/*------------------------------------ 
Event Listners -----------------------
--------------------------------------
*/

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([userName, email, password, password2]);
    checkLength(userName, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    chekcPasswordsMatch(password, password2)
});