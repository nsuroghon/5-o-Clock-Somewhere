$(document).ready(function () {
  // $('select').formSelect();

  function searchAlcoholicOrNot() {
    var queryURL =
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.drinks.length; i++) {
        var x = document.createElement("OPTION");
        console.log(response.drinks[i].strAlcoholic);
        x.setAttribute("value", response.drinks[i].strAlcoholic);
        var t = document.createTextNode(response.drinks[i].strAlcoholic);
        x.appendChild(t);
        document.getElementById("alcoholNonalcoholSelect").appendChild(x);
      }
      $("#alcoholNonalcoholSelect").formSelect();
    });
  }

  function searchGlass() {
    var queryURL =
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.drinks.length - 1; i++) {
        var x = document.createElement("OPTION");
        console.log(response.drinks[i].strGlass);
        x.setAttribute("value", response.drinks[i].strGlass);
        var t = document.createTextNode(response.drinks[i].strGlass);
        x.appendChild(t);
        document.getElementById("glassSelect").appendChild(x);
      }
      $("#glassSelect").formSelect();
    });
  }

  function searchIngredient() {
    var queryURL =
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.drinks.length; i++) {
        var x = document.createElement("OPTION");
        console.log(response.drinks[i].strIngredient1);
        x.setAttribute("value", response.drinks[i].strIngredient1);
        var t = document.createTextNode(response.drinks[i].strIngredient1);
        x.appendChild(t);
        document.getElementById("ingredientSelect").appendChild(x);
      }
      $("#ingredientSelect").formSelect();
    });
  }

  searchAlcoholicOrNot();
  searchGlass();
  searchIngredient();
});

//Functionality for modal button (favourites)
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});

//Submit button event listener
$("#search").on("click", function () {
  alert("Running fetchCocktail function");
  fetchCocktail();
});

//Fetch cocktail API
function fetchCocktail() {
  var isAlcohol =
    "a=" + $("#alcoholNonalcoholSelect").val().split(" ").join("_");
  console.log(isAlcohol);

  var glassType = "g=" + $("#glassSelect").val().split(" ").join("_");
  console.log(glassType);

  var ingredientType = "i=" + $("#ingredientSelect").val().split(" ").join("_");
  console.log(ingredientType);

  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?" +
    isAlcohol +
    "&" +
    glassType +
    "&" +
    ingredientType;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert("List of cocktails has been generated on line 108 of console");
      console.log(data);
      fillDrinkName(data);
    });
}

//Refresh button event listener
$("#refresh").on("click", function () {
  alert("Running fetchCocktail function");
  fetchCocktail();
});

//start
//https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

async function fillDrinkName(data){
  var drinksArray = data.drinks;
  // Set the foor loop to only trigger 3 Times! 
  for (var i = 0;i < 3; i++) {
    var index = Math.floor(Math.random() * drinksArray.length)
    var strDrink = drinksArray[index].strDrink;
    console.log(strDrink);
    var drinkURL =drinksArray[index].strDrinkThumb; 
    console.log(drinkURL) 
    var drinkID = drinksArray[index].idDrink;
    console.log(drinkID)

    let imgEl = document.querySelector("#img"+i.toString()); // the ith img tag
    imgEl.src = drinkURL

    let ctName = document.querySelector("#content"+i.toString());
    $(ctName).text(strDrink);

    let rvName = document.querySelector("#reveal"+i.toString());
    $(rvName).text("Recipe");
  
  // 2nd url request - instructions & ingredients measure
    var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
    await fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (dataIngredients) {
        console.log(dataIngredients);
      
        // instructions -->html
        var recipeArray = dataIngredients.drinks;
        var strInstructions = recipeArray[0].strInstructions;
        console.log(strInstructions);

        const instruction = document.querySelector("#instructions"+i.toString());
        $(instruction).text(strInstructions);
        console.log("#instructions"+i.toString());

        //  recipe --> html
      for (var v = 1; v <= 15; v++) {

        var measure = eval("recipeArray[0].strMeasure" + v);
        var name = eval("data.drinks[0].strIngredient" + v);
        console.log(name + " " + measure);

        if (!measure)
              measure = "";
          if (name) {
      }
      }});
  }
}