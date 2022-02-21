
sessionStorage.removeItem("currentGame")
 

$("#form-login").on(
    'submit',
    (e) => {
        e.preventDefault()
        let request = {
            login: $("#login").val().trim(),
            password: $("#password").val().trim()
        }
 
        $.ajax(
            {
                type: "post",
                url: endpoint + "/player/login",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify(request),
                success: (response) => { 
                    if (response) {
                        sessionStorage.setItem("currentGame",response);
                        
                        document.location.href="/game.html";
                    } else {
                        alert("Login or password wrong.")
                    }
                },
                error: (error) => {
                    console.warn(error);
                }
            }
        )
    }
)