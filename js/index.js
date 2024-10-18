/// <reference types="../@types/jquery" />



////// Global vars-------------------------->
let myRow = document.getElementById('row');


///----------------------------- start j-query  ---------------------------------------->

$('.sidebar').animate({ left: "-257" })

///open side bar
$('.open_icon').on('click', function () {

    /// top only used with position
    
  
    $('.navbar ul').animate({ top: 0 }, 1100)

    $('.sidebar').animate({ left: "0px" }, 1000)
    /// if you want to know sidebar width by js 
    //     console.log(sideBarWidth);  
    // console.log($('.sidebar').css('left'));
    $('.open_icon').addClass('d-none')
    $('.close_icon').removeClass('d-none')
 
    
})




/// close sidebar
$('.close_icon').on('click', function () { 


    $('.navbar ul').animate({ top: 300 }, 1000)

    let sideBarWidth = -$('.main_nav').outerWidth()
    $('.sidebar').animate({ left: sideBarWidth }, 1000)

    $('.open_icon').removeClass('d-none')
    $('.close_icon').addClass('d-none')
       
    
})

///active anchor

 
$('ul li ').on('click', function (e) {
    $('.active').removeClass('active')
    $(e.target).addClass('active')
})

/// spinnner
function mySpinnner() {
    $(function(){
        $('.loader').fadeOut(1500,function(){
           $('.loading').slideUp(1000,function(){
              $('body').css('overflow','auto')
           } )
        })
    })
}
mySpinnner()

 
 
//////------------------- end j-query 1 part 1 --------------------------------->




//////------------------- start saerch------------------------------->



async function getmeal() {
    mySpinnner()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()
    displayMyMeals(response.meals)
}



function displayMyMeals(array) {
    let cartona = ''
    for (var i = 0; i <array.length; i++){
        cartona += `
          <div onclick="GetEveryMealIngredientsAndDetails('${array[i].idMeal}')" class="col-md-3 my-4">
            <div class="my_card rounded-1 position-relative overflow-hidden">
                <img src="${array[i].strMealThumb}" class="w-100 " alt="">
                <div class="card_opacity position-absolute d-flex align-items-center p-2  ">
                    <h2 class="text-black">${array[i].strMeal}</h2>
                </div>
            </div>
        </div>`
    }

    myRow.innerHTML = cartona;
}

getmeal();





///////-------------------------------end search---------------------------------------->
//=
//=
//=
//=
//=
//=
//=
////-------------part 2-----start part_category--------------------------->




async function getCategoty() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
     response = await response.json() 
    //  console.log(response.categories);
     displayMyCategory(response.categories)
}


function displayMyCategory(array) {
  
    let cartona = ''
    for (var i = 0; i < array.length; i++){
        cartona += `
        <div  class="Mycatego col-md-3 my-4" onclick="mealOfCategory('${array[i].strCategory}')" ">
            <div class="my_card rounded-1 position-relative overflow-hidden">
                <img src="${array[i].strCategoryThumb}" class="w-100 " alt="">
                <div class="card_opacity position-absolute text-center p-2  ">
                    <h2 class="text-black">${array[i].strCategory }</h2>
                    <p class='overflow-hidden text-secondary'>${array[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>`
    }


    myRow.innerHTML = cartona;

    
}



document.getElementById('category').addEventListener('click', function() {
    getCategoty()
})

////------------------------------end category function----------------------------------------------------->>>>




/////------------------------------part 3 Area  ------------------------------------------------------>>>>


async function thisarea() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list `)
     response = await response.json() 
     console.log(response.meals);
    displayArea(response.meals)
}


function displayArea(array) {
    let cartona = ''

    for (var i = 0; i < array.length; i++){

        if (array[i].strArea !== "Unknown") {
            
            cartona+= `<div class="col-md-3  my-4" onclick="mealOfArea('${array[i].strArea}')">
            <div class=" my_card text-center">
                <i class="fa-solid text-center fa-house-laptop fa-5x"></i>
                <p class="fs-2 text-white">${array[i].strArea }</p>
             </div>
         </div>`
        }
       
       
    }

    myRow.innerHTML= cartona;
}

document.getElementById('area').addEventListener('click', function() {
    thisarea()
})

///-----------------------------end area------------------------>
//=
//=
//=
//=
//=
/////------------------------------part 4 gredients  ------------------------------------------------------>>>>


async function myIngredient() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
     response = await response.json() 
    //  console.log(response.meals);
     displayMyIngredient(response.meals)
}



function displayMyIngredient(array) {
    let cartona = ''

    for (var i = 0; i < array.length; i++) {
        if (array[i].strDescription !== null && array[i].strIngredient!==null ) {
            cartona +=
                `<div class="col-md-3  overflow-hidden my-4" onclick="mealOfIngrediendts('${array[i].strIngredient}')">
            <div class=" my_card text-center">
              <i class="fa-solid fa-utensils text-center fa-5x"></i>
                <h2 class="fs-3 text-white">${array[i].strIngredient}</h2>
                <p class="fs-6 text-center  ingerdPara text-white">${array[i].strDescription}</p>

             </div>
         </div>`
        }


    }
     myRow.innerHTML= cartona;
}

document.getElementById('Ingridient').addEventListener('click', function() {
    myIngredient ()
})

///-----------------------------end gredients------------------------>


////--------------------------start meals of category------------------>


async function mealOfCategory(item) {
  
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
    response = await response.json();
    // console.log(response);
    displayMealOfCategory(response.meals)
   
}

function displayMealOfCategory(array) {
    let cartona = ''
    for (var i = 0; i < array.length; i++){

        cartona += `
          <div onclick="GetEveryMealIngredientsAndDetails('${array[i].idMeal}')" class="col-md-3 my-4">
            <div class="my_card  rounded-1 position-relative overflow-hidden">
                <img src="${array[i].strMealThumb}" class="w-100 " alt="">
                <div class="card_opacity position-absolute d-flex align-items-center p-2  ">
                    <h2 class="h5 text-secondary">${array[i].strMeal}</h2>
                </div>
            </div>
        </div>`
    }

    myRow.innerHTML = cartona;

    }
/////----------------------------------end meals of category---------->
//=
//=
//=
//=
//=
//=
//-----------------------------------------start meals of area ---------->


async function mealOfArea(item) {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`)
    response = await response.json();
    // console.log(response);
    displayMealOfArea(response.meals)
    
}

function displayMealOfArea(array) {
    let cartona = ''
    for (var i = 0; i < array.length; i++){

        cartona += `
          <div onclick="GetEveryMealIngredientsAndDetails('${array[i].idMeal}')" class="col-md-3 my-4">
            <div class="my_card rounded-1 position-relative overflow-hidden">
                <img src="${array[i].strMealThumb}" class="w-100 " alt="">
                <div class="card_opacity position-absolute d-flex align-items-center p-2  ">
                    <h2 class="h5 text-secondary">${array[i].strMeal}</h2>
                </div>
            </div>
        </div>`
    }

    myRow.innerHTML = cartona;

    }

////--------------------------end meals of area------------------>
//=
//=


function mySearchInputs() {
    document.getElementById('my_form').innerHTML = 
`<div class="row">
      <div class="col-md-6  my-5 d-flex  text-light  ">
        <input type="text" onKeyup="searchingByName(this.value)" class="form-control text-light bg-transparent  " placeholder="Search By Name" name="" id="">
        
      </div>
      <div class="col-md-6 my-5 d-flex   ">
        <input onKeyup="searchingByLetter(this.value)" type="text" class="form-control   text-light bg-transparent" placeholder="Search By first letter" name="" id="">
        
      </div>
    </div>`;
    myRow.innerHTML=""
}

//=
///------------------search by name------------------->

async function searchingByName(item) {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    response = await response.json();
    displayMyMeals(response.meals);
    // console.log(response.meals);
}

document.getElementById('search').addEventListener('click', function() {
    mySearchInputs()
})


///------------------ end search by name------------------->


///------------------ search by letter ------------------------>

async function searchingByLetter(item) {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`)
    response = await response.json();
    displayMyMeals(response.meals);
    // console.log(response.meals);

    
}

document.getElementById('search').addEventListener('click', function() {
    mySearchInputs()
})


///------------------ end search by letter------------------->

//=
//-----------------------------------------start meals of ingrediendts ---------->


async function mealOfIngrediendts(item) {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`)
    response = await response.json();
    console.log(response);
    displayMealOfArea(response.meals)
    
}

function displayMealOfIngrediendts(array) {
    let cartona = ''
    for (var i = 0; i < array.length; i++){

        cartona += `
          <div  class="col-md-3 my-4">
            <div onclick="GetEveryMealIngredientsAndDetails('${array[i].idMeal}')" class="my_card rounded-1 position-relative overflow-hidden">
                <img src="${array[i].strMealThumb}" class="w-100 " alt="">
                <div class="card_opacity position-absolute d-flex align-items-center p-2  ">
                    <h2 class="h5 text-secondary">${array[i].strMeal}</h2>
                </div>
            </div>
        </div>`
    } console.log(array[i].idMeal);
    console.log(array[i].strMeal);
    
    

    myRow.innerHTML = cartona;

    }

////--------------------------end meals of ingrediendts------------------>



async function GetEveryMealIngredientsAndDetails(id) {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json();
    console.log(response.meals[0]);
    everyMealIngredientsAndDetails(response.meals[0])
}

function everyMealIngredientsAndDetails(item) {

    let cartona = `
        <div class="image col-md-4  pt-5 " >
<img src="${item.strMealThumb}" class="w-100" alt="">
<h2 class="mt-3">${item.strMeal}</h2>
      </div>

      <div class="text col-md-8 gx-5  pt-5">
        <h2>Instruction</h2>
        <p>${item.strInstructions}</p>
      <p class="fs-3"> Area :   <span class=" fs-4">${item.strArea}</span></p>  
      <p class="fs-3"> category :   <span class="fs-4">${item.strCategory}</span></p> 
      <p class="fs-3">Recipes :
        <div class="boxes d-flex  flex-wrap   list-unstyled">
        
            <li class="border list bg-warning m-2  p-2 rounded-1 mb-2 ">${item.strIngredient1}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient2}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient3}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient4}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient5}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient6}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient2}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient3}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient1}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient6}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient3}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient7}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient8}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient9}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient10}</li>
            <li class="border list bg-warning m-2 p-2 rounded-1 mb-2 ">${item.strIngredient6}</li>
          
           
        </div> </p> 
<p class="fs-2">Tags :</p>

<div class="btns d-flex">
<a href="" class=" btn btn-danger px-4 me-3">youtube</a>
<a href="" class=" btn btn-primary px-4">Source</a>
</div>

</div>`;
    
    myRow.innerHTML = cartona;

}


//--------------------------------------------------------------->



//===============---------------------------------------------- ->




///------------------------ start contact us -------------------->




function displayContactForm() {
    myRow.innerHTML=`
 <div class="contact_us min-vh-100 d-flex  align-items-center justify-content-center  ">
    <div class="container contact_container ">
        <div class="row g-4">
            <div class="col-md-6">
                <input  pattern="[a-zA-Z0-9]+" minlength="4" maxlength="10" type="text" class="form-control" required placeholder="Enter your Name">
            </div>
            <div class="col-md-6">
                <input type="email" class="form-control" placeholder="Enter your valid Email" required>
            </div>
            <div class="col-md-6">
                <input type="number" class="form-control" placeholder="Enter your real Phone" required>
            </div>
            <div class="col-md-6">
                <input type="number" class="form-control" placeholder="Enter your Age" required>
            </div>
            <div class="col-md-6">
                <input type="password" class="form-control" placeholder="Enter your password" required>
            </div>
            <div class="col-md-6">
                <input type="password" class="form-control" placeholder="Repassword" required>
            </div>
         </div>

        <div class="btn1 d-flex justify-content-center pt-4 ">
            <button class="text btn btn-danger bg-transparent px-4  py-2">Submitt</button>
        </div>
    </div>
</div> `
}

document.getElementById('contact').addEventListener('click', function() {
    displayContactForm()
})

//------------------------ end contact us ----------------->



// function checkPasswordMatch() {
//     const password = document.getElementById('password');
//     const repassword = document.getElementById('repassword');
//     if (repassword.value !== password.value) {
//       repassword.setCustomValidity('Passwords do not match');
//     } else {
//       repassword.setCustomValidity('');
//     }
//   }
