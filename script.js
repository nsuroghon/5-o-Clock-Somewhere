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
    });
}

//Refresh button event listener
$("#refresh").on("click", function () {
  alert("Running fetchCocktail function");
  fetchCocktail();

});

