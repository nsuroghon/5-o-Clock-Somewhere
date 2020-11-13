$(document).ready(function(){
   
            
  $('select').formSelect();

  function searchAlcoholicOrNot() {
      var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
      $.ajax({
          type:"GET",
          url: queryURL
      }).then(function(response){
          console.log(response);
          var alcoholicOrNot = response.drinks;

      })}

  function searchGlass() {
      var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"
      $.ajax({
          type:"GET",
          url: queryURL
      }).then(function(response){
          console.log(response);
      })}

  function searchIngredient() {
      var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
      $.ajax({
          type:"GET",
          url: queryURL
      }).then(function(response){
          console.log(response);
      })}

  

      searchAlcoholicOrNot();
      searchGlass();
      searchIngredient();
      


});


//Functionality for modal button (favourites)
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });