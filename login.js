function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEq = name + "=";
    let decodedCookies = decodeURIComponent(document.cookie);
    let ca = decodedCookies.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}

document.getElementById("toggle-form").addEventListener("click", function (event) {
    event.preventDefault();

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formTitle = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-text");

    if (signupForm.style.display === "none" || signupForm.style.display === "") {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        formTitle.textContent = "Create Your Account";
        toggleText.innerHTML = "Already have an Account? <a href='#' id='toggle-form'>Login here</a>";
    } else {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.textContent = "Login your Account";
        toggleText.innerHTML = "Don't have an Account? <a href='#' id='toggle-form'>Sign up here</a>";
    }
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    setCookie("username", username, 7);
    setCookie("email", email, 7);
    setCookie("password", password, 7);

    alert("Account created successfully!");

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formTitle = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-text");

    signupForm.style.display = "none";
    loginForm.style.display = "block";
    formTitle.textContent = "Login to Your Account";
    toggleText.innerHTML = "Don't have an Account? <a href='#' id='toggle-form'>Sign up here</a>";
});

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('#login-form input[name="email"]').value.trim();
    const password = document.querySelector('#login-form input[name="password"]').value.trim();

    const storedEmail = getCookie("email");
    const storedPassword = getCookie("password");

    const baseEmail = "josephpegasus101@gmail.com";
    const basePassword = "Joseph12345";

    if (
        (email === storedEmail && password === storedPassword) ||
        (email === baseEmail && password === basePassword)
    ) {
        alert("Logged in successfully!");
        window.location.href = "home.html";
    } else {
        alert("Invalid credentials!");
    }
});

window.addEventListener("DOMContentLoaded", function () {
    if (!getCookie("email") && !getCookie("password")) {
        setCookie("username", "Joseph Pegasus", 7);
        setCookie("email", "josephpegasus101@gmail.com", 7);
        setCookie("password", "Joseph12345", 7);
        console.log("Default credentials have been set.");
    }

    const loginEmail = document.querySelector('#login-form input[name="email"]');
    const loginPassword = document.querySelector('#login-form input[name="password"]');

    if (loginEmail && loginPassword) {
        loginEmail.value = getCookie("email");
        loginPassword.value = getCookie("password");
    }
});
