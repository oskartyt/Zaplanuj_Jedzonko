console.clear();

var userButton = document.querySelector('#userButton');


userButton.addEventListener('click', function(){
    var userName = document.querySelector('#userNameInput').value;
    localStorage.setItem('savedName', userName);
    // console.log("Twoje imię to: ", localStorage.savedName);

    document.querySelector('header .name span').innerText = userName;
    document.querySelector('.appsection').style.display = "none";
    document.querySelector('.recipysection').style.display = "flex";
    document.querySelector('.addRecipe').style.display = "none";

});

document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem("savedName") !== null) {
        document.querySelector('header .name span').innerText = localStorage.getItem("savedName");
        document.querySelector('.appsection').style.display = "none";
        document.querySelector('.recipysection').style.display = "flex";
        document.querySelector('.addRecipe').style.display = "none";
    } else {
        document.querySelector('header .name span').innerText = "Imię";
        document.querySelector('.appsection').style.display = "flex";
        document.querySelector('.recipysection').style.display = "none";
        document.querySelector('.addRecipe').style.display = "none";
    }

    if (localStorage.getItem("recipiesZJ")!==undefined && localStorage.getItem("recipiesZJ")!==null) {
        var recipeTable = document.querySelector('.recipiestable');
        var recipies= JSON.parse(localStorage.getItem("recipiesZJ"));
        var keys = Object.keys(recipies);
        console.log(keys);
        for (var i=0; i<keys.length; i++) {
            var recipeRow = document.createElement('tr');
            var recipeViewId = document.createElement('td');
            var recipeViewName = document.createElement('td');
            var recipeViewDescription = document.createElement('td');
            var recipeActions = document.createElement('td');
            recipeViewId.innerText = i+1;
            recipeViewName.innerText = keys[i];
            recipeViewDescription.innerText = recipies[keys[i]]["description"];

            var editButton = document.createElement("BUTTON");
            var claEdi = document.createAttribute("class");
            claEdi.value = "edit-button far fa-edit";
            editButton.setAttributeNode(claEdi);

            var deleteButton = document.createElement("BUTTON");
            var claDel = document.createAttribute("class");
            claDel.value = "delete-button far fa-trash-alt";
            deleteButton.setAttributeNode(claDel);

            deleteButton.addEventListener("click",function () {
                this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
            });
            // editButton.addEventListener("click",function () {
            //     this.parentElement.querySelector("p").setAttribute("contenteditable","true");
            // });

            recipeRow.appendChild(recipeViewId);
            recipeRow.appendChild(recipeViewName);
            recipeRow.appendChild(recipeViewDescription);
            recipeActions.appendChild(editButton);
            recipeActions.appendChild(deleteButton);
            recipeRow.appendChild(recipeActions);
            recipeTable.appendChild(recipeRow);


        }
    }

});

var newRecipeButton=document.getElementsByClassName("addNewRecipe")[0];
newRecipeButton.addEventListener("click",function () {
    document.querySelector('.recipysection').style.display = "none";
    document.querySelector('.addRecipe').style.display = "flex";
});


/////////////////////////////////////////

/////////////////////////////////////////
var addRecipe = document.getElementById("add-recipe");


var recipeName = document.getElementById("recipe-name");
var recipeDescription = document.getElementById("recipe-description");

var newInstruction = document.getElementById("new-instruction");
var addInstructionButton = document.getElementById("add-instruction");
var instructionsList = document.getElementById("instructions");

var newIngredient = document.getElementById("new-ingredient");
var addIngredientsButton = document.getElementById("add-ingredient");
var ingredientsList = document.getElementById("ingredients");



addInstructionButton.addEventListener("click", function () {

    var spanTxt = document.createElement("p");
    var claTxt = document.createAttribute("class");
    claTxt.value = "listSpan";
    spanTxt.setAttributeNode(claTxt);

    var editButton = document.createElement("BUTTON");
    var claEdi = document.createAttribute("class");
    claEdi.value = "edit-button far fa-edit";
    editButton.setAttributeNode(claEdi);

    var deleteButton = document.createElement("BUTTON");
    var claDel = document.createAttribute("class");
    claDel.value = "delete-button far fa-trash-alt";
    deleteButton.setAttributeNode(claDel);



    var newLi = document.createElement("li");

    spanTxt.innerText = newInstruction.value;
    newLi.appendChild(spanTxt);
    newLi.appendChild(deleteButton);
    newLi.appendChild(editButton);
    instructionsList.appendChild(newLi);

    newInstruction.value = "";

    deleteButton.addEventListener("click",function () {
        this.parentElement.parentElement.removeChild(this.parentElement);
    });
    editButton.addEventListener("click",function () {
        this.parentElement.querySelector("p").setAttribute("contenteditable","true");
    });
    spanTxt.addEventListener("blur",function () {
        this.setAttribute("contenteditable","false");
    })
});

addIngredientsButton.addEventListener("click", function () {

    var spanTxt = document.createElement("p");
    var claTxt = document.createAttribute("class");
    claTxt.value = "listSpan";
    spanTxt.setAttributeNode(claTxt);

    var editButton = document.createElement("BUTTON");
    var claEdi = document.createAttribute("class");
    claEdi.value = "edit-button far fa-edit";
    editButton.setAttributeNode(claEdi);

    var deleteButton = document.createElement("BUTTON");
    var claDel = document.createAttribute("class");
    claDel.value = "delete-button far fa-trash-alt";
    deleteButton.setAttributeNode(claDel);

    var newLi = document.createElement("li");

    spanTxt.innerText = newIngredient.value;
    newLi.appendChild(spanTxt);
    newLi.appendChild(deleteButton);
    newLi.appendChild(editButton);
    ingredientsList.appendChild(newLi);

    newIngredient.value = "";

    deleteButton.addEventListener("click",function () {
        this.parentElement.parentElement.removeChild(this.parentElement);
    });
    editButton.addEventListener("click",function () {
        this.parentElement.querySelector("p").setAttribute("contenteditable","true");
    });
    spanTxt.addEventListener("blur",function () {
        this.setAttribute("contenteditable","false");
    })
});


addRecipe.addEventListener("click", function(){

    if (localStorage.getItem("recipiesZJ")==undefined){
        var allRecipies = {};
    }else{
        var allRecipies = JSON.parse(localStorage.getItem("recipiesZJ"));
    }

    var instructionsTab = [];
    var ingredientsTab = [];
    var instructionsListElements = instructionsList.getElementsByTagName("li");
    var ingredientsListElements = ingredientsList.getElementsByTagName("li");

    for (var i=0; i<ingredientsListElements.length; i++) {
        ingredientsTab.push(ingredientsListElements[i].querySelector("p").innerText);
    }
    for (var i=0; i<instructionsListElements.length; i++) {
        instructionsTab.push(instructionsListElements[i].querySelector("p").innerText);
    }



    allRecipies[recipeName.value]={description: recipeDescription.value, instructions: instructionsTab, ingredients: ingredientsTab};
    localStorage.setItem("recipiesZJ", JSON.stringify(allRecipies));



    var ingredientsListLength=ingredientsListElements.length;
    for (var i=0; i<ingredientsListLength; i++) {
        ingredientsListElements[0].parentElement.removeChild(ingredientsListElements[0])
    }

    var instructionsListLength=instructionsListElements.length;
    for (var i=0; i<instructionsListLength; i++) {
        instructionsListElements[0].parentElement.removeChild(instructionsListElements[0])
    }



    document.querySelector('.recipysection').style.display = "flex";
    document.querySelector('.addRecipe').style.display = "none";

    //////////////////////////////////////////////////////////
    var recipeTable = document.querySelector('.recipiestable');

    var recipeRow = document.createElement('tr');
    var recipeViewId = document.createElement('td');

    var recipeViewName = document.createElement('td');
    var claName = document.createAttribute("class");
    claName.value = "nameHolder";
    recipeViewName.setAttributeNode(claName);

    var recipeViewDescription = document.createElement('td');
    var recipeActions = document.createElement('td');
    console.log("recipeName.value",recipeName.value);
    if (document.querySelector(".recipiestable").lastElementChild.lastElementChild.firstElementChild.innerText === "ID"){
        recipeViewId.innerText=1;
    }else {
        recipeViewId.innerText = parseInt(document.querySelector(".recipiestable").lastElementChild.firstElementChild.innerText) +1;
    }
    recipeViewName.innerText = recipeName.value;
    recipeViewDescription.innerText = recipeDescription.value;

    var editButton = document.createElement("BUTTON");
    var claEdi = document.createAttribute("class");
    claEdi.value = "edit-button far fa-edit";
    editButton.setAttributeNode(claEdi);

    var delButton = document.createElement("BUTTON");
    var claDel = document.createAttribute("class");
    claDel.value = "delete-button far fa-trash-alt";
    delButton.setAttributeNode(claDel);

    // delButton.addEventListener("click",function () {
        // this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    // });
    // editButton.addEventListener("click",function () {
    //     this.parentElement.querySelector("p").setAttribute("contenteditable","true");
    // });

    recipeRow.appendChild(recipeViewId);
    recipeRow.appendChild(recipeViewName);
    recipeRow.appendChild(recipeViewDescription);
    recipeActions.appendChild(editButton);
    recipeActions.appendChild(delButton);
    recipeRow.appendChild(recipeActions);
    recipeTable.appendChild(recipeRow);

    recipeName.value="";
    recipeDescription.value="";
});

