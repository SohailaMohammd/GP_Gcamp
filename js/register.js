
let user = document.getElementById("user");
let Reguser = document.getElementById("reg-name");

let userPen = document.getElementById("user-pen");
let Reg_sur_user = document.getElementById("reg-phone");

let address = document.getElementById("address");
let addressInput = document.getElementById("reg-address");

let envelope = document.getElementById("envelope");
let emailInput = document.getElementById("reg-email");


let lockConfirm = document.getElementById("lockConfirm");
let eyeConfirm = document.getElementById("eyeConfirm");
let reg_passwordConfirm = document.getElementById("reg-password-confirm");

let lock = document.getElementById("lock");
let eye = document.getElementById("eye");
let reg_password = document.getElementById("reg-password");

let valueinput = Reg_sur_user.value;

reg_password.addEventListener("input", () => {
    if (reg_password.value.trim() !== "") {
        lock.style.visibility = "hidden";
        eye.style.visibility = "hidden";

    } else {
        lock.style.visibility = "visible";
        eye.style.visibility = "visible";


    }
});
reg_passwordConfirm.addEventListener("input", () => {
    if (reg_passwordConfirm.value.trim() !== "") {
        eyeConfirm.style.visibility = "hidden";
        lockConfirm.style.visibility = "hidden";

    } else {
        lockConfirm.style.visibility = "visible";
        eyeConfirm.style.visibility = "visible";
    }
});
Reguser.addEventListener("input", () => {
    if (Reguser.value.trim() !== "") {
        user.style.visibility = "hidden";
    } else {
        user.style.visibility = "visible";

    }
});
Reg_sur_user.addEventListener("input", () => {
    if (Reg_sur_user.value.trim() !== "") {
        userPen.style.visibility = "hidden";

    } else {
        userPen.style.visibility = "visible";
    }
});
emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") {
        envelope.style.visibility = "hidden";
    } else {
        envelope.style.visibility = "visible";

    }
});
addressInput.addEventListener("input", () => {
    if (addressInput.value.trim() !== "") {
        address.style.visibility = "hidden";
    } else {
        address.style.visibility = "visible";
    }
});

document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const password_confirmation = document.getElementById("reg-password-confirm").value;
    const phone = document.getElementById("reg-phone").value;
    const address = document.getElementById("reg-address").value;

    // Check if password and confirmation match
    if (password !== password_confirmation) {
        alert("Passwords do not match!");
        return;
    }

    console.log("Sending Data:", { name, email, phone, address });

    try {
        const response = await fetch("https://orientonline.info/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, email, password, password_confirmation, phone, address }),
        });
        const data = await response.json();
        console.log("Raw Response: ", data);

        if (response.ok) {
            console.log("Registration Successful:", data);
            alert("Registration Successful: " + data.message);
            window.location.href = "Login.html";

        } else {
            console.error("Registration Failed:", data);
            alert("Registration Failed: " + (data.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Network Error: Could not connect to the server.");
    }
});