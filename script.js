$(document).ready(function () {
  // $('select').formSelect();

  function searchAlcoholicOrNot() {
    var queryURL =
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      for (var i = 0; i < response.drinks.length; i++) {
        var x = document.createElement("OPTION");
        // console.log(response.drinks[i].strAlcoholic);
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
      for (var i = 0; i < response.drinks.length - 1; i++) {
        var x = document.createElement("OPTION");
        // console.log(response.drinks[i].strGlass);
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
      for (var i = 0; i < response.drinks.length; i++) {
        var x = document.createElement("OPTION");
        // console.log(response.drinks[i].strIngredient1);
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
  $('.modal-trigger').modal({
    dismissible: false

  });
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
      //console.log(data);
      fillDrinkName(data);
    });
}

//Refresh button event listener
$("#refresh").on("click", function () {
  alert("Running fetchCocktail function");
  fetchCocktail();
});




//Function that saves cocktail name to local storage on click of the save button
$('.save-drink-btn').on('click', function(e){
        e.preventDefault();
        var cocktailRecipeContent = $(this).siblings("span")[0].innerText.split("\n");
        var cocktailRecipe = cocktailRecipeContent[0];

        //Saving the name to local storage
        var savedCocktailArr = JSON.parse(localStorage.getItem("cocktailsArr")) || [];
        savedCocktailArr.push(cocktailRecipe);
        localStorage.setItem("cocktailsArr", JSON.stringify(savedCocktailArr));
        //Call function to populate the button list with saved drink names 
        cocktailNameButtons();
  });

//Function for creating elements with name of saved cocktail in list, in modal
function cocktailNameButtons() {
    var cocktailButtonValueArray = JSON.parse(localStorage.getItem("cocktailsArr"));
    $(".saved-list").empty();
    for (i= 0; i < cocktailButtonValueArray.length; i++){
        $(".saved-list").append($("<button class='drink-btn'>").text(cocktailButtonValueArray[i]).append($("<i class='fas fa-times remove-drink'></i>")
            .on('click', function(e){
              //Allows the user to remove the cocktail from the list if they no longer want it saved 
              e.preventDefault();
              var previouslySearchedArr = JSON.parse(localStorage.getItem("cocktailsArr")) || [];
              var cocktailIndex = previouslySearchedArr.indexOf($(this).parent(".drink-btn").text())
              console.log(($(this).parent(".drink-btn").text()));
              console.log(cocktailIndex);
              if (cocktailIndex > -1){
                  previouslySearchedArr.splice(cocktailIndex, 1);
              }
              console.log(previouslySearchedArr);
          
              localStorage.setItem("cocktailsArr", JSON.stringify(previouslySearchedArr));
              cocktailNameButtons();
                  })
                  ));
    }
  };



//Fetch the cocktail from the cocktil DB and insert it into the panel and img card
  $(document).on('click', '.drink-btn', function(e){
      e.preventDefault();
      var modalSavedCocktail = $(this).text();
      console.log(modalSavedCocktail);

      var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + modalSavedCocktail;
      console.log(requestUrl);
    
      fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Change cocktail name at top of card
        var cocktailName = data.drinks[0].strDrink;
        $(".modal-drink-name").text(cocktailName);

        //Include ingredients - needs to include all ingredients!!!!
        $(".modal-ingredients").empty();
        for (var i = 1; i <= 15; i++) {

          var measure = eval("data.drinks[0].strMeasure" + i);
          var name = eval("data.drinks[0].strIngredient" + i);
          console.log(measure + " " + name);
  
          if (!measure)
              measure = "";
          if (name) {
              var ingredient = $("<li>");
              ingredient.text(measure + " " + name);
              $(".modal-ingredients").append(ingredient);
          }
      }
        
        //Include instructions to make recipe
        console.log(data);
        var favouriteRecipe = data.drinks[0].strInstructions;
        console.log(favouriteRecipe);
        $(".modal-recipe").text(favouriteRecipe);

        //Change img src to show picture of the cocktail 
        var favouriteImage = data.drinks[0].strDrinkThumb;
        console.log(favouriteImage)
        $(".cocktail-image").attr("src", favouriteImage);





      });
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
        //console.log(strInstructions);

        const instruction = document.querySelector("#instructions"+i.toString());
        $(instruction).text(strInstructions);
        //console.log("#instructions"+i.toString());

        //  recipe --> html

       for (var v = 1; v <= 15; v++) {
          var measure = eval("dataIngredients.drinks[0].strMeasure" + v);
          var name = eval("dataIngredients.drinks[0].strIngredient" + v);
          console.log(name + " " + measure)

         if (!measure && !name) {
           measure = ""
           break;
          }
          else {
          const recipehtml = document.querySelector("#recipe"+i.toString());
          var li = document.createElement("li");
          li.textContent = name + " " + measure;
          $(recipehtml).append(li);
          }
       }
      }
      );
  }
}


