// Function to set cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get cookies by name
function getCookie(name) {
    let nameEq = name + "=";
    let decodedCookies = decodeURIComponent(document.cookie);
    let ca = decodedCookies.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}

// Function to handle form toggle between login and signup
document.getElementById("toggle-form").addEventListener("click", function (event) {
    event.preventDefault();

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formContainer = document.getElementById("form-container");
    const formTitle = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-text");

    if (signupForm.style.display === "none" || signupForm.style.display === "") {
        // Switch to signup form
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        formTitle.textContent = "Create Your Account";
        toggleText.innerHTML = "Already have an Account? <a href='#' id='toggle-form'>Login here</a>";
    } else {
        // Switch to login form
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.textContent = "Login your Account";
        toggleText.innerHTML = "Don't have an Account? <a href='#' id='toggle-form'>Sign up here</a>";
    }
});

// Handle signup form submission
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload on form submit

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value.trim(); // Trim the password input
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value.trim(); // Trim the confirm password input

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Save credentials in cookies
    setCookie("username", username, 7);
    setCookie("email", email, 7);
    setCookie("password", password, 7);

    // Optionally, store some success message or redirect after successful signup
    alert("Account created successfully!");
    // Optionally, redirect to login page or log in the user directly
    // window.location.href = "/login"; 
});

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload on form submit

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve stored credentials from cookies
    const storedEmail = getCookie("email");
    const storedPassword = getCookie("password");

    // Check if credentials match the stored ones
    if (email === storedEmail && password === storedPassword) {
        alert("Logged in successfully!");
        // Optionally, redirect to a dashboard or homepage after successful login
        // window.location.href = "/dashboard";
    } else {
        alert("Invalid credentials!");
    }
});
