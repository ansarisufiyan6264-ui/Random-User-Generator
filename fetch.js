const image = document.getElementById("userImg");
const name = document.getElementById("userName");
const email = document.getElementById("userEmail");
const country = document.getElementById("userCountry");
const btn = document.getElementById("btn");
const errorMessage = document.getElementById("error");


function getRandomUser() {
    fetch("https://randomuser.me/api/")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        errorMessage.textContent = "";
        name.textContent = data.results[0].name.first;
        email.textContent = data.results[0].email;
        country.textContent = data.results[0].location.country;
        image.src = data.results[0].picture.large;
    })

    .catch(function(error){
        console.log(error)
         errorMessage.textContent = "Please check your internet connection.";
    });

}
    


btn.addEventListener("click", function(){
    getRandomUser();
});
getRandomUser();