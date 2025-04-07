console.log("hi");

/*const registerButton = document.getElementById("register");
registerButton.addEventListener("click", function () {
    const registerButton = document.getElementById("register");
    document.getElementById("login").classList.add("welcome");
    document.getElementById("login").classList.remove("login");
    document.getElementById("welcome").classList.add("login");
    document.getElementById("welcome").classList.remove("welcome");
});*/
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", function () {
    document.getElementById("already").classList.remove("hidden");
    document.getElementById("already").classList.add("move-right");
    document.getElementById("login").classList.add("hidden") ;
    document.getElementById("registerr").classList.remove("hidden");
    document.getElementById("registerr").classList.add("move-left");
    document.getElementById("welcome").classList.add("hidden");

});
const loginButton = document.getElementById("aleady_login");
loginButton.addEventListener("click", function () {

    document.getElementById("already").classList.add("hidden");
    document.getElementById("login").classList.remove("move-right");
   document.getElementById("login").classList.remove("hidden");
   document.getElementById("registerr").classList.add("hidden");
   document.getElementById("registerr").classList.remove("move-left");
   document.getElementById("welcome").classList.remove("hidden");
});

setTimeout(()=> {
    document.getElementById("preload").classList.add("hidden");
    document.getElementById("container").classList.replace("hidden" , "container");
}, 2000)

document.getElementById("password").addEventListener("click",() => {
   if( document.getElementById("password").type  === "password" ) {
       document.getElementById("password").type = "text";
   }
   else{
       document.getElementById("password").type = "password";
   }

});
