(() => {
    if (!sessionStorage.getItem("token")) {
        location.replace("login.html");
    }

    const response = fetch("https://us-central1-supit-5519f.cloudfunctions.net/app/protected",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    })

    response
        .then((result) => result.json())
        .then((data) => console.log(data))
        .catch((error) => {
            console.warn("Please log in!")
            location.replace("login.html")
        });
})()