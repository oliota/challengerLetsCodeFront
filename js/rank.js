
sessionStorage.removeItem("currentGame")

$.ajax(
    {
        type: "get",
        url: endpoint + "/game/rank",
        success: (response) => { 
            if (response) {
                refeshTable(response);
            }
        },
        error: (error) => {
            console.warn(error);
        }
    }
)

function refeshTable(list) {
    $("tbody").empty()
    let i = 0;
    list.forEach(rank => {
        $("tbody").append(
            $("<tr>").append(
                $("<td>", { text: ++i }),
                $("<td>", { text: rank.playerName?rank.playerName:rank.playerId }),
                $("<td>").append(
                    $("<div>", { class: "progress progress-xs mt-2" }).append(
                        $("<div>", { class: "progress-bar " + getColor(i), style: `width: ${rank.calc * 100}%` })
                    )
                ),
                $("<td>", { text: `${(rank.calc * 100)<100?(rank.calc * 100).toFixed(2):100}%` })
            )
        );
    });
}

function getColor(i) { 
    switch (i) {
        case 1:
            return " bg-warning"; 
        case 2:
            return " bg-secondary disabled"; 
        case 3:
            return " bg-orange"; 
        default:
            return " bg-black"; 
    }
}