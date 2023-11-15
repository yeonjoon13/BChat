
document.addEventListener("DOMContentLoaded", (_event) => {
    const registerButton = document.querySelector(".btn");
    const loginButton = document.querySelector(".btn2");
    const username = document.getElementById("txt");
    const password = document.getElementById("pw")


    registerButton.addEventListener('click', async function(event){
        event.preventDefault();


        const result = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then((res) => res.json())
        if (result.message === "Successfully registered") {
            alert("Successfully registered");
        } else {
            alert(result.message);
        }
        
    })

    loginButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const result = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then((res) => res.json())
        if (result.message === "Authentication successful!") {
            location.assign('/chatroom');
        } else { 
            alert(result.message)
        }
        
    })

    
});
