
let envelope = document.getElementById("envelpe");
let emailInput = document.getElementById("email-login");
let passwordInput = document.getElementById("password-login");
let lock = document.getElementById("lock");
let eyeLock = document.getElementById("eye-lock");


emailInput.addEventListener("focus", () => {
   envelope.style.visibility = "hidden";
});
emailInput.addEventListener("blur", () => {
   envelope.style.visibility = "visible";
});
passwordInput.addEventListener("focus", () => {
   lock.style.visibility = "hidden";
   eyeLock.style.visibility = "hidden";
});
passwordInput.addEventListener("blur", () => {
   lock.style.visibility = "visible";
   eyeLock.style.visibility = "visible";
});



// let emailInput = document.getElementById("email-login");
// let passwordInput = document.getElementById("password-login");
// let envelope = document.getElementById("envelope");
// let lock = document.getElementById("lock");
// let eyeLock = document.getElementById("eye-lock");

// emailInput.addEventListener("input", () => {
//    envelope.style.visibility = emailInput.value.trim() !== "" ? "hidden" : "visible";
// });

// passwordInput.addEventListener("input", () => {
//    lock.style.visibility = passwordInput.value.trim() !== "" ? "hidden" : "visible";
//    eyeLock.style.visibility = passwordInput.value.trim() !== "" ? "visible" : "hidden";
// });


document.getElementById("login-form").addEventListener("submit", async function (event) {
   event.preventDefault(); // Prevent page reload

   const email = document.getElementById("email-login").value;
   const password = document.getElementById("password-login").value;


   console.log("Sending Data:", { email, password });

   try {
      const response = await fetch("https://orientonline.info/api/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
         body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Raw Response: ", data);

      if (response.ok) {
         console.log("Login Successful:", data);
         alert("Login Successful: " + data.message);
         window.location.href = "Home.html";

      } else {
         console.error("Registration Failed:", data);
         alert("Login Failed: " + (data.message || "Unknown error"));
      }
   } catch (error) {
      console.error("Network Error:", error);
      alert("Network Error: Could not connect to the server.");
   }
});
