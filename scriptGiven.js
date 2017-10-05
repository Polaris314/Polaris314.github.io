


var vertexList = {};
var vertexCount = {};


// function for getting URL parameters
function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null)
      return "";
    else return unescape(results[1]);
}


$(document).ready(function() {
    console.log("ready 123");

    

    $(".query-pic").map(function () {
        this.width = this.scrollWidth;
        this.height = this.scrollHeight;
        vertexList[this.id] = [];
        vertexCount[this.id] = 0;

        let ctx = this.getContext("2d");
        
        var usingCanvas = this;

        let img = new Image();
        img.onload = function() {
            console.log("here");
            ctx.drawImage(img,0,0, usingCanvas.width, usingCanvas.height);
        }

        img.src = "./public/" + this.getAttribute("aux");
        console.log(this.getAttribute("aux"));


    });

    aid = gup("assignmentId");

    if (aid !== "" && aid !== "ASSIGNMENT_ID_NOT_AVAILBLE"){

        $(".query-pic").click(function(event) {
            console.log($(this).html());
            console.log(this.id);

            let counterNum = parseInt(this.id.replace(/\D/g,""));

            // console.log(vertexList);
            console.log(event);
            vertexList[this.id].push({
                x: event.offsetX,
                y: event.offsetY
            });
            vertexCount[this.id]++;

            console.log("#counter"+counterNum);

            $("#counter"+counterNum).html(vertexCount[this.id].toString());

        
            let radius = 5;
        
        
            
            let ctx = this.getContext("2d");
            ctx.beginPath();
            ctx.arc(event.offsetX, event.offsetY, radius,0,2*Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        
            console.log(event);
            // console.log(vertexList);
        })
    }
})



















