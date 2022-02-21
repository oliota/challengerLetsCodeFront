
let desenv=false;
let endpoint
if(desenv){
    endpoint='localhost:8080'
}else{
    endpoint='https://lets-code-site.herokuapp.com'
}

obterVersao()

function obterVersao() {

    $.ajax(
        {
            type: "get",
            url: endpoint+"/player",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.warn(error);
            }
        }
    );
}