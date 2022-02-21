

var gameId=sessionStorage.getItem("currentGame")
var count=0; 
if(!gameId){
    alert("please login to start a new game");
    document.location.href="/login.html";
}


$.ajax(
    {
        type: "get",
        url: endpoint + "/game/"+gameId, 
        success: (response) => { 
            if (response) {
                refeshTable(response.rounds);
                if(response.hit!=0){
                    $("#hits").text(response.hit)
                }
                if(response.error!=0){
                    $("#errors").text(response.error)
                }
                if(response.end){
                    let end=new Date(Number(response.end)) 
                    $("#ended").html( "ended on <b>"+end.toLocaleString("pt-BR")+"</b>") 
                    $("#form-game").hide();
                }
            }
            
        },
        error: (error) => {
            console.warn(error);
        }
    }
)

function refeshTable(list) {
    $("tbody").empty()
    count = 0;
    list.forEach(round => {
        createLine(round)
       
    });
}

function createLine(round){
    $("tbody").append(
        $("<tr>").append(
            $("<td>", { text: ++count }),
            $("<td>", { text: round.filmOne }), 
            $("<td>", { text: round.filmTwo})
        )
    );
}


$("#form-game").on(
    'submit',
    (e) => {
        e.preventDefault()
        let request = {
            filmOne: $("#filmOne").val().trim(),
            filmTwo: $("#filmTwo").val().trim() 
        } 

         

        $.ajax(
            {
                type: "put",
                url: endpoint + "/game/round/"+gameId,
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify(request),
                success: (response) => { 
                    if(response.includes(gameId)){
                        createLine(request); 
                    }
                    if(response.includes('Rule')){
                        alert(response);
                        return;
                    }
                    if(response.includes('ended')){
                        createLine(request); 
                        alert(response); 
                    }
                    window.location.href="/game.html"
                    
                },
                error: (error) => {
                    console.warn(error);
                }
            }
        )
    }
)



$("#finish").on(
    'click',
    ( ) => { 

        $.ajax(
            {
                type: "put",
                url: endpoint + "/game/finish/"+gameId, 
                success: (response) => { 
                    if(response.includes(gameId)){
                        window.location.href="/game.html" 
                        return;
                    }
                    
                },
                error: (error) => {
                    console.warn(error);
                }
            }
        )
    }
)


