 
 
sessionStorage.removeItem("currentGame");

$("#form-register").on(
    'submit',
    (e) => {
        e.preventDefault()
        let request = {
            name: $("#name").val().trim(),
            login: $("#login").val().trim(),
            password: $("#password").val().trim()
        }
        console.log(request);

        if(request.password!=$("#password").val().trim()){
            alert("The passwords provided are different");
            return;
        }

        $.ajax(
            {
                type: "post",
                url: endpoint + "/player",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify(request),
                success: (response) => {
                    console.log(response);
                    if(response.includes('already')){
                        alert(response)
                    }else{
                        alert("Successfully registered player, please login to start a new game");
                        document.location.href="/login.html";
                    }
                },
                error: (error) => {
                    console.warn(error);
                }
            }
        )
    }
)