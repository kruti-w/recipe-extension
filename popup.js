document.addEventListener('DOMContentLoaded', function() {
    console.log("testing")
    var saveRecipeButton = document.getElementById('saveRecipeButton');
    console.log(saveRecipeButton);
    var viewButton = document.getElementById('viewButton');
    var searchInput = document.getElementById('searchInput');
    var recipeList = document.getElementById('recipeList');

    console.log("test event listener")
    saveRecipeButton.addEventListener('click', function(){
        console.log("button clicked");
        chrome.runtime.sendMessage({action: 'captureHTML'}, function(response){
            if (chrome.runtime.lastError){
                //console.error(chrome.runtime.lastError.message);
                console.log(chrome.runtime.lastError.message);
                return;
            }
            console.log('HTML captured:', response.html);
        });
    });

    viewButton.addEventListener('click', function() {
        displaySavedRecipes(searchInput.ariaValueMax.trim());
    });

    searchInput.addEventListener('input', function(){
        displaySavedRecipes(searchInput.ariaValueMax.trim());
    });

    function displaySavedRecipes(query){
        chrome.storage.local.get(['savedRecipes'], function(data){
            var savedRecipes = data.savedRecipes || [];
            var filteredRecipes = savedRecipes.filter(function(recipe){
                return recipe.title.toLowerCase().includes(query.toLowerCase());
            });
            recipeList.innerHTML = '';
            filteredRecipes.forEach(function(recipe){
                var listItem = document.createElement('li');
                listItem.textContent = recipe.title;
                recipeList.appendChild(listItem);
            });
        });
    }
});