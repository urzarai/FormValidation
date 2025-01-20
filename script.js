const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const dob = document.getElementById('dob');
const role = document.getElementById('role');
const password = document.getElementById('password');
const cPassword = document.getElementById('confirm-password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
});

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const mobileValue = mobile.value.trim();
    const dobValue = dob.value;
    const roleValue = role.value;
    const passwordValue = password.value.trim();
    const cPasswordValue = cPassword.value.trim();
    const genderValue = document.querySelector('input[name="gender"]:checked');

    // Username Validation
    if(usernameValue === '') {
        setErrorFor(username, 'Username is required');
    } else {
        setSuccessFor(username);
    }

    // Email Validation
    if(emailValue === '') {
        setErrorFor(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(email, 'Provide a valid email address');
    } else {
        setSuccessFor(email);
    }

    // Mobile Number Validation
    if(mobileValue === '') {
        setErrorFor(mobile, 'Mobile number is required');
    } else if (!isValidMobile(mobileValue)) {
        setErrorFor(mobile, 'Provide a valid 10-digit mobile number');
    } else {
        setSuccessFor(mobile);
    }

    // Date of Birth Validation
    if(dobValue === '') {
        setErrorFor(dob, 'Date of birth is required');
    } else if (!isValidAge(dobValue)) {
        setErrorFor(dob, 'You must be at least 18 years old');
    } else {
        setSuccessFor(dob);
    }

    // Gender Validation
    if(!genderValue) {
        setErrorFor(document.querySelector('.radio-group'), 'Please select your gender');
    } else {
        setSuccessFor(document.querySelector('.radio-group'));
    }

    // Role Validation
    if(roleValue === '') {
        setErrorFor(role, 'Please select a role');
    } else {
        setSuccessFor(role);
    }

    // Password Validation
    if(passwordValue === '') {
        setErrorFor(password, 'Password is required');
    } else if(passwordValue.length < 8) {
        setErrorFor(password, 'Password must be at least 8 characters');
    } else {
        setSuccessFor(password);
    }

    // Confirm Password Validation
    if(cPasswordValue === '') {
        setErrorFor(cPassword, 'Please confirm your password');
    } else if(cPasswordValue.length < 8) {
        setErrorFor(cPassword, 'Password must be at least 8 characters');
    } else if(passwordValue !== cPasswordValue) {
        setErrorFor(cPassword, 'Passwords do not match');
    } else {
        setSuccessFor(cPassword);
    }
}

const setErrorFor = (input, message) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;

    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccessFor = (input) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';

    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
    return regex.test(email);
}

const isValidMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
}

const isValidAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 18;
}