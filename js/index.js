let homeRow = document.querySelector(".home-meal");
let searchContainer = document.querySelector(".search-inputs");
let searchResultsContainer = document.querySelector(".searchResults")
let categoriesConatiner = document.querySelector(".Categories");

let areaContainer = document.querySelector(".area-container");
let instructionsContainer = document.querySelector(".instructions");
let ingredientsContainer = document.querySelector(".Ingredients");
let contactContainer = document.querySelector(".contact-Box");




// ! Home


// * Side-Nav

closeSidenav();

$(".first-icon").on("click",function(){
    if($(".sideNav").css("left")=="0px"){
        closeSidenav();
    }else{
        openSidenav();
    }
})



// ^ opening  Side-Nav

function openSidenav(){
   
        $(".sideNav").animate({left:0},500);
    
        $(".first-icon").removeClass("fa-bars");
        $(".first-icon").addClass(" fa-xmark");
        

        $(".links li").addClass("animate__animated animate__bounceInUp");
    
   
}


// ^ closing Side-Nav

function closeSidenav(){

    let width = $(".sideNav .nav").outerWidth();


    $(".sideNav").animate({left:-width},500);
    
    $(".first-icon").removeClass("fa-xmark");
    $(".first-icon").addClass(" fa-bars");

    $(".links li").removeClass("animate__animated animate__bounceInUp");
   


}









// ^ Home-meals
async function getData() {
    

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
let Data = await response.json();
//console.log(Data.meals);
displayHome(Data.meals)
}
getData();


function displayHome(arr){

    homeRow.innerHTML="";

    for(let i=0 ; i<arr.length ; i++){
     
        homeRow.innerHTML+= `


             <div class="col-md-3">
                <div class="position-relative mealpic overflow-hidden rounded-2" onclick="getInstructions('${arr[i].idMeal}')">
                    <img src="${arr[i].strMealThumb}" class="w-100"/>
                    <div class="layer d-flex align-items-center position-absolute p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        
        `

    }

    instructionsContainer.innerHTML="";
    //searchContainer.innerHTML="";
    contactContainer.innerHTML="";
    categoriesConatiner.innerHTML="";


}

// ^ search Page

function searchMeals(){

    closeSidenav();
    searchContainer.innerHTML=`
           
         <div class="row">
            <div class="col-md-6">
                <input type="text" onkeyup="searchName(this.value)" class="form-control text-white bg-transparent nameSearch" placeholder="Search By Name">
            </div>

            <div class="col-md-6">
                <input type="text" onkeyup="searchLetter(this.value)" class="form-control text-white bg-transparent letterSearch" placeholder="Search By First Letter" maxlength="1">
            </div>
        </div>
    
    `
    homeRow.innerHTML="";
    contactContainer.innerHTML="";
    ingredientsContainer.innerHTML="";
    instructionsContainer.innerHTML="";
    areaContainer.innerHTML="";
    categoriesConatiner.innerHTML="";


    
}

async function searchName(name) {
    //homeRow.innerHTML="";
   closeSidenav();
   homeRow.innerHTML="";
   $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let Data = await response.json();

    // homeRow.innerHTML="";

    Data.meals ? displaySearch(Data.meals) : displaySearch([])
    
    $(".loading").fadeOut(300);

   
    contactContainer.innerHTML=""; 


    
}

async function searchLetter(letter) {
    // homeRow.innerHTML="";
    closeSidenav();
    homeRow.innerHTML="";
    $(".loading").fadeIn(300);

    letter == "" ? letter="a" : "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let Data = await response.json();

     //homeRow.innerHTML="";

     Data.meals ? displaySearch(Data.meals) : displaySearch([]);
    $(".loading").fadeOut(300);


    
}

function displaySearch(arr){

    searchResultsContainer.innerHTML="";

    for(let i=0 ; i<arr.length ; i++){
     
        searchResultsContainer.innerHTML+= `


             <div class="col-md-3">
                <div class="position-relative mealpic overflow-hidden rounded-2" onclick="getInstructions('${arr[i].idMeal}')">
                    <img src="${arr[i].strMealThumb}" class="w-100"/>
                    <div class="layer d-flex align-items-center position-absolute p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        
        `

    }

}

$(".search").on("click",function(){

    searchMeals();
    
})


// ^ Categories page

async function getCategories() {
    closeSidenav();

    $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let Data = await response.json();
    //console.log(Data.categories);
    //displayArea(Data.meals);

    displayCategories(Data.categories);
    $(".loading").fadeOut(300);
    

    
}


function displayCategories(arr){

    

    
    for(let i=0 ; i<arr.length ; i++){
     
        categoriesConatiner.innerHTML+= `


             <div class="col-md-3">
                <div class="position-relative mealpic overflow-hidden rounded-2" onclick="filterCategory('${arr[i].strCategory}')">
                    <img src="${arr[i].strCategoryThumb}" class="w-100"/>
                    <div class="layer d-flex flex-column align-items-center position-absolute p-2 text-black text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        
        `

        homeRow.innerHTML="";
        instructionsContainer.innerHTML="";
        searchContainer.innerHTML="";
        contactContainer.innerHTML="";
        areaContainer.innerHTML="";
        ingredientsContainer.innerHTML="";

    }

             

    
    
    


}

async function filterCategory(Category) {

    $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    let Data = await response.json();
    //console.log(Data.meals)

    displayHome(Data.meals.slice(0,20));
    $(".loading").fadeOut(300);

    
}



$(".categories").on("click",function(){

    getCategories();
})



// ^ area page

async function getArea() {

    closeSidenav();
    
    $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let Data = await response.json();
    console.log(Data.meals);
    displayArea(Data.meals);
    $(".loading").fadeOut(300);

   
    }
   

    function displayArea(arr){

        areaContainer.innerHTML="";
        $(".loading").fadeIn(300);
       

        for(let i=0; i<arr.length; i++){

            areaContainer.innerHTML+=`
                 
                
            <div class="col-md-3">
                <div class="text-center area" onclick="displayMealsbyList('${arr[i].strArea}')">
                    <i class="fa-solid fa-house-laptop"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>
       
            
            
            `

           
        }
        homeRow.innerHTML="";
        searchContainer.innerHTML="";
        searchResultsContainer.innerHTML="";
        ingredientsContainer.innerHTML="";
        instructionsContainer.innerHTML="";
        categoriesConatiner.innerHTML="";



    }

    

    async function displayMealsbyList(area){

            
       let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let Data = await response.json();
            console.log(Data);

           
         displayHome(Data.meals);
        areaContainer.innerHTML="";

}
   
 $(".area").on("click",function(){
        getArea();
});


    //! instructions

    async function getInstructions(id) {
        $(".loading").fadeIn(300);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let Data = await response.json();
        console.log(Data.meals);

        displayInstructions(Data.meals[0])
        $(".loading").fadeOut(300);

        
    }

 function displayInstructions(arr) {
    homeRow.innerHTML="";
    areaContainer.innerHTML="";
    searchContainer.innerHTML="";
    searchResultsContainer.innerHTML="";

    let recipeIngrediants="";

    for(let i=0; i<20; i++){
        if( arr[`strIngredient${i}`] ){

            recipeIngrediants+=`<li class="m-2 p-1 alert alert-info">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`

        }
    }

    let tags = arr.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    instructionsContainer.innerHTML=`

         <div class="col-md-4">
    <div>
        <img src="${arr.strMealThumb}" class="w-100 rounded-3">
        <h2>${arr.strMeal}</h2>
    </div>
   </div>

   <div class="col-md-8">
    <h2>Instructions</h2>
    <p>${arr.strInstructions}</p>
    <h3><span>Area : </span>${arr.strArea} </h3>
    <h3><span>Category : </span>${arr.strCategory} </h3>
    <h3><span>Recipes :</span></h3>
    <ul class="d-flex flex-wrap g-3">${recipeIngrediants}</ul>
    <h3>Tags : </h3>
    <ul class="d-flex flex-wrap g-3"> ${tagsStr}</ul>
    <a class="btn btn-success" target="_blank" href=${arr.strSource}>Source</a>
    <a class="btn btn-danger"  target="_blank" href=${arr.strYoutube}>Youtube</a>
   </div>


    `




         
    

    
    }


    // ^ Ingredients page

    async function getMainIngredients() {

        closeSidenav();

        $(".loading").fadeIn(300);

        ingredientsContainer.innerHTML="";

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let Data = await response.json();
        console.log(Data.meals);

        //console.log("hello")

        displayMainIngredients(Data.meals.slice(0,20));
        $(".loading").fadeOut(300);


        
    }
   function displayMainIngredients(arr){

    for(let i=0; i<arr.length;i++){

        ingredientsContainer.innerHTML+=`

         <div class="col-md-3">
               <div class="text-center bite" onclick="getMealsbyMainIngredient('${arr[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>
            </div>
        
        
        
        `

    }
    homeRow.innerHTML="";
    instructionsContainer.innerHTML="";
    searchContainer.innerHTML="";
    searchResultsContainer.innerHTML="";
    contactContainer.innerHTML="";
    categoriesConatiner.innerHTML="";
    areaContainer.innerHTML="";
    

  }

  async function getMealsbyMainIngredient(name) {

    $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
        let Data = await response.json();
        console.log(Data.meals);
        displayHome(Data.meals);
        ingredientsContainer.innerHTML="";
        $(".loading").fadeOut(300);
    
  }

  $(".ingredients").on("click",function(){
    getMainIngredients();
  })


//   ^ contact page

let nameInput, emailInput, phoneInput, ageInput, passwordInput, repasswordInput, button;


function displayForm(){

    closeSidenav();

    

    contactContainer.innerHTML=`

                <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input type="text" placeholder="Enter Your Name" class="form-control nameInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger nameAlert mt-2 w-100 d-none">Special characters and numbers not allowed</div>
                        </div>
                        <div class="col-md-6">
                            <input type="email" placeholder="Enter Your Email" class="form-control emailInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger emailAlert mt-2 w-100 d-none">Email not valid *exemple@yyy.zzz</div>
                        </div>
                        <div class="col-md-6">
                            <input type="text" placeholder="Enter Your Phone" class="form-control phoneInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger phoneAlert mt-2 w-100 d-none">Enter valid Phone Number</div>
                        </div>
                        <div class="col-md-6">
                            <input type="number" placeholder="Enter Your Age" class="form-control ageInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger ageAlert mt-2 w-100 d-none">Enter valid age</div>
                        </div>
                        <div class="col-md-6">
                            <input type="password" placeholder="Enter Your Password" class="form-control passwordInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger passwordAlert mt-2 w-100 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                        </div>
                        <div class="col-md-6">
                            <input type="password" placeholder="Repassword" class="form-control repasswordInput" onkeyup="validateInputs()">
                            <div class="alert alert-danger repasswordAlert mt-2 w-100 d-none">Enter valid repassword</div>
                        </div>

                       
                    </div>

                    <button disabled class="formBtn btn btn-outline-danger mt-3 px-2  m-auto" >Submit</button>
                </div>
            </div>


    `
    homeRow.innerHTML="";
    ingredientsContainer.innerHTML="";
    areaContainer.innerHTML="";
    instructionsContainer.innerHTML="";
    searchContainer.innerHTML="";
    searchResultsContainer.innerHTML="";
    categoriesConatiner.innerHTML="";


     nameInput = document.querySelector(".nameInput");
     emailInput = document.querySelector(".emailInput");
     phoneInput = document.querySelector(".phoneInput");
     ageInput = document.querySelector(".ageInput");
     passwordInput = document.querySelector(".passwordInput");
     repasswordInput = document.querySelector(".repasswordInput");
     button = document.querySelector(".formBtn")


    nameInput.addEventListener("focus",()=>{
        nameTouched=true;
    })

    emailInput.addEventListener("focus",()=>{
        emailTouched=true;
    })

    phoneInput.addEventListener("focus",()=>{
        phoneTouched=true;
    })

    ageInput.addEventListener("focus",()=>{
        ageTouched=true;
    })

    passwordInput.addEventListener("focus",()=>{
        passwordTouched=true;
    })
    repasswordInput.addEventListener("focus",()=>{
        repasswordTouched=true;
    })

  
    

   


}





const nameRegex     = /^[a-zA-Z ]+$/;
const emailRegex    = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const phoneRegex    = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const ageRegex      = /^(200|1[0-9]{2}|[1-9][0-9]?)$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

let nameTouched       = false;
let emailTouched      = false;
let phoneTouched      = false;
let ageTouched        = false;
let passwordTouched   = false;
let repasswordTouched = false;


function validateInputs(){

    if(nameTouched){
        if(validateName()){
            document.querySelector(".nameAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".nameAlert").classList.replace("d-none","d-block")
        }
    }

    if(emailTouched){
        if(validateEmail()){
            document.querySelector(".emailAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".emailAlert").classList.replace("d-none","d-block")
        }
    }

    if(phoneTouched){
        if(validatePhone()){
            document.querySelector(".phoneAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".phoneAlert").classList.replace("d-none","d-block")
        }
    }

    if(ageTouched){
        if(validateAge()){
            document.querySelector(".ageAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".ageAlert").classList.replace("d-none","d-block")
        }
    }

    if(passwordTouched){
        if(validatepassword()){
            document.querySelector(".passwordAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".passwordAlert").classList.replace("d-none","d-block")
        }
    }

    if(repasswordTouched){
        if(validateRepassword()){
            document.querySelector(".repasswordAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector(".repasswordAlert").classList.replace("d-none","d-block")
        }
    }

    if(validateName() && validateEmail() && validatePhone() && validateAge() && validatepassword() && validateRepassword()){
        button.removeAttribute("disabled");
        }else{
            button.setAttribute("disabled",true)
        }
}



function validateName(){
    return( nameRegex.test(nameInput.value) );
}

function validateEmail(){
    return( emailRegex.test(emailInput.value) );
}
function validatePhone(){
    return( phoneRegex.test(phoneInput.value) );
}
function validateAge(){
    return( ageRegex.test(ageInput.value) );
}
function validatepassword(){
    return( passwordRegex.test(passwordInput.value) );
}

function validateRepassword(){
    return repasswordInput.value == passwordInput.value;
}


   




$(".contact").on("click",function(){
    displayForm()
})






jQuery(function(){
    $(".loading").fadeOut(2000,function(){
        $("body").css( {overflow:"auto"});
    });
   
})
