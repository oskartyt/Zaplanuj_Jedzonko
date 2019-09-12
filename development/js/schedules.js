console.clear();

var userButton = document.querySelector('#userButton');


userButton.addEventListener('click', function(){
    var userName = document.querySelector('#userNameInput').value;
    localStorage.setItem('savedName', userName);
    // console.log("Twoje imię to: ", localStorage.savedName);

    document.querySelector('header .name span').innerText = userName;
    document.querySelector('.appsection').style.display = "none";
    document.querySelector('.add__plan').style.display = "flex";

});

document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem("savedName") !== null) {
        document.querySelector('header .name span').innerText = localStorage.getItem("savedName");
        document.querySelector('.appsection').style.display = "none";
        document.querySelector('.add__plan').style.display = "flex";
    } else {
        document.querySelector('header .name span').innerText = "Imię";
        document.querySelector('.appsection').style.display = "flex";
        document.querySelector('.add__plan').style.display = "none";
    }

    if (localStorage.getItem("recipiesZJ")==undefined){
        var allRecipies = {};
    }else{
        var allRecipies = JSON.parse(localStorage.getItem("recipiesZJ"));
    }
    var recepiesKeys=Object.keys(allRecipies);
    var newPlanSelects=document.getElementsByClassName("newPlanTable")[0].getElementsByTagName("select");
    for (var i=0;i<newPlanSelects.length;i++){
        var actualSelect=newPlanSelects[i];
        for (var j=0;j<recepiesKeys.length;j++){
            var optionRecipe = document.createElement("option");
            optionRecipe.setAttribute("value",recepiesKeys[j]);
            optionRecipe.innerText=recepiesKeys[j];
            actualSelect.appendChild(optionRecipe);
        }
    }
});

var addPlanButton=document.querySelector(".add__plan__button");


addPlanButton.addEventListener("click",function () {

    if (localStorage.getItem("plansZJ")==undefined){
        var allPlans = {};
    }else{
        var allPlans = JSON.parse(localStorage.getItem("plansZJ"));
    }

    var nameInput=document.querySelector(".newPlanName");
    var descriptionInput=document.querySelector(".newPlanDescription");
    var numberInput=document.querySelector(".newPlanWeekNr");

    var PlanSelects=document.getElementsByClassName("newPlanTable")[0].getElementsByTagName("select");
    allPlans[numberInput.value]={"name":nameInput.value,"description":descriptionInput.value,"meals":[]};
    for (var i=0;i<PlanSelects.length;i++){
        var meal=PlanSelects[i].dataset.meal;
        var day=PlanSelects[i].parentElement.parentElement.querySelector("th").dataset.day;
        var chosenRecipe=PlanSelects[i].value;

        var oneElementTable=[meal,day,chosenRecipe];
        allPlans[numberInput.value]["meals"].push(oneElementTable);
    }
    localStorage.setItem("plansZJ", JSON.stringify(allPlans));
});