var userNameInput = document.getElementById("signupName");
var userEmailInput = document.getElementById("signupEmail");
var userPhoneInput = document.getElementById("signupPhone");
var userPasswordInput = document.getElementById("signupPassword");
var userConfirmPasswordInput = document.getElementById("confirmPassword");
var signupButton = document.getElementById("signupButton");

var nameRegex = /^[A-Z][\sa-z0-9]{2,}/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

var users = JSON.parse(localStorage.getItem("user")) || [];

function addUser() {
    if (
        inputValidation(nameRegex, userNameInput) &&
        inputValidation(emailRegex, userEmailInput) &&
        inputValidation(phoneRegex, userPhoneInput) &&
        inputValidation(passwordRegex, userPasswordInput) &&
        userConfirmPasswordInput.value == userPasswordInput.value
    ) {

        var exists = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].userEmail === userEmailInput.value.trim() ||
                users[i].userPhone === userPhoneInput.value.trim()) {
                exists = true;
                break; // توقف عن الفحص فور العثور على تطابق
            }
        }

        if (exists) {
            signupButton.nextElementSibling.classList.replace("d-none", "d-block");
            return;
        }
        if (exists == false) {
            signupButton.nextElementSibling.classList.replace("d-block", "d-none");
        }

        var user = {
            userName: userNameInput.value.trim(),
            userEmail: userEmailInput.value.trim(),
            userPhone: userPhoneInput.value.trim(),
            userPassword: userPasswordInput.value.trim()
        };

        users.push(user);
        localStorage.setItem("user", JSON.stringify(users));
        reset();
        openLogin();

        userConfirmPasswordInput.classList.remove("is-invalid");
        userConfirmPasswordInput.classList.add("is-valid");
        userConfirmPasswordInput.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
        alert("Not valid inputs, please try again!");
        userConfirmPasswordInput.classList.add("is-invalid");
        userConfirmPasswordInput.nextElementSibling.classList.replace("d-none", "d-block");
    }
}



function reset() {
    userNameInput.value = null;
    userEmailInput.value = null;
    userPhoneInput.value = null;
    userPasswordInput.value = null;
    userConfirmPasswordInput.value = null;
    userNameInput.classList.remove("is-valid")
    userEmailInput.classList.remove("is-valid")
    userPhoneInput.classList.remove("is-valid")
    userPasswordInput.classList.remove("is-valid")
    userConfirmPasswordInput.classList.remove("is-valid")
}
function inputValidation(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")
        input.nextElementSibling.classList.replace("d-block", "d-none")
        console.log("true")
        return true;

    }
    else {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        input.nextElementSibling.classList.replace("d-none", "d-block")
        console.log("false")


        return false;

    }
}

function openLogin() {
    alert("signup complete!");

    setTimeout(() => { window.location.href = "./index.html"; }, 1000);
}

var users = JSON.parse(localStorage.getItem("user")) || [];

function login() {
    var loginUserNameInput = document.getElementById("loginEmail").value.trim();
    var loginPasswordInput = document.getElementById("loginPassword").value.trim();

    var found = false;
    var matchedUser = null;

    for (var i = 0; i < users.length; i++) {
        if ((loginUserNameInput === users[i].userEmail || loginUserNameInput === users[i].userPhone) &&
            loginPasswordInput === users[i].userPassword) {
            found = true;
            matchedUser = users[i];
            break;
        }
    }

    if (found) {
        alert("Login successful!");

        
        sessionStorage.setItem("loggedUser", matchedUser.userName);

       
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    var userName = sessionStorage.getItem("loggedUser");

    if (userName) {
        document.getElementById("homeWelcome").innerText = `Welcome ${userName} In Our App`;
    } else {
        document.getElementById("homeWelcome").innerText = "Welcome Guest!";
    }
});

function logout() {

    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

