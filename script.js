// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email.");
      return;
    }
    if (password.length < 6 || !/[0-9]/.test(password) || !/[\W]/.test(password)) {
      alert("Password must be at least 6 characters long and include a number and a symbol.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert("Email is already registered.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    window.location.href = "index.html";
  });
}

// Login interface
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
      console.log("Users:", localStorage.getItem("users"));
      console.log("Current User:", localStorage.getItem("currentUser"));

    } else {
      document.getElementById("loginError").innerText = "Invalid email or password.";
    }
  });
}

console.log("Users:", localStorage.getItem("users"));
console.log("Current User:", localStorage.getItem("currentUser"));
