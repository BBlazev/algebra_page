(() => {
    const registerForm = document.querySelector("#register");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        register();
    })

    function register(){
        const registerData = {
            email: email.value,
            password: password.value
        } 

        const response = fetch("https://us-central1-supit-5519f.cloudfunctions.net/app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        })

        response
            .then((result) => result.json())
            .then((data) => {
                location.replace("login.html")
            })
            .catch(() => alert("HHAHAHAHAH!"))
    }
})()