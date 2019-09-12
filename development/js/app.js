console.clear();

var userButton = document.querySelector('#userButton');


userButton.addEventListener('click', function(){
    var userName = document.querySelector('#userNameInput').value;
    localStorage.setItem('savedName', userName);
    // console.log("Twoje imię to: ", localStorage.savedName);

    document.querySelector('header .name span').innerText = userName;
    document.querySelector('.appsection').style.display = "none";
    document.querySelector('.desktop').style.display = "flex";

});

document.addEventListener('DOMContentLoaded', function (){

    if (localStorage.getItem("savedName") !== null) {
        document.querySelector('header .name span').innerText = localStorage.getItem("savedName");
        document.querySelector('.appsection').style.display = "none";
        document.querySelector('.desktop').style.display = "flex";
    } else {
        document.querySelector('header .name span').innerText="Imię";
        document.querySelector('.appsection').style.display = "flex";
        document.querySelector('.desktop').style.display = "none";
    }


    var plansTableCells=document.querySelector(".planView").querySelectorAll("td");

    if (localStorage.getItem("plansZJ")!==undefined && localStorage.getItem("recipiesZJ")!==null) {
        var plans= JSON.parse(localStorage.getItem("plansZJ"));
        var firstKey=Object.keys(plans)[0];
        var meals=plans[firstKey]["meals"];

        for (var i=0;i<plansTableCells.length;i++){
            for (var j=0;j<meals.length;j++){
                if (meals[j][0]==plansTableCells[i].parentElement.dataset.meal &&  meals[j][1]==plansTableCells[i].dataset.day){
                    plansTableCells[i].innerText=meals[j][2];
                }
            }
        }

        var titleNr=document.querySelector(".userPlan").querySelector("span");

        titleNr.innerText=firstKey;

    }
    if (localStorage.getItem("recipiesZJ")==undefined){
        var nrOfRecepies = 0;
    }else{
        var nrOfRecepies = Object.keys(JSON.parse(localStorage.getItem("recipiesZJ"))).length;
    }
    var nrOfRecepiesInfo=document.querySelector("div.blueWidget").querySelector("span");

    nrOfRecepiesInfo.innerText=nrOfRecepies;

});


 var crossList = document.querySelectorAll(".crossIcon");


 for(var i=0; i<crossList.length; i++){
     var cross = crossList[i];
     cross.addEventListener("click", function(){
         var parent = this.parentElement.parentElement;
             parent.style.display = "none";
     });
 }

 var addRecipeButton = document.querySelector(".addWidgetButton.recipe");

addRecipeButton.addEventListener("click", function(){
     document.querySelector('.desktop').style.display = "none";
     window.location.href="recipes.html";
});




