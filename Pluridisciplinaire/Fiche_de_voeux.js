function previous(){
if(document.getElementById("choix_1").classList.contains("hidden") || document.getElementById("choix_2").classList.contains("hidden")){
    document.getElementById("previous").classList.remove("hidden");
}else{
    document.getElementById("previous").classList.add("hidden");
}
}
previous();
function next(){
    if(document.getElementById("choix_2").classList.contains("hidden") || document.getElementById("choix_3").classList.contains("hidden")){
        document.getElementById("next").classList.remove("hidden");
    }else{
        document.getElementById("next").classList.add("hidden");
    }
}
next();

document.getElementById("previous").addEventListener("click", () =>{
    document.getElementById("choix_1").classList.remove("hidden");
    document.getElementById("choix_2").classList.add("hidden");
    previous();
    next();
});
document.getElementById("next").addEventListener("click", () =>{
    document.getElementById("choix_1").classList.add("hidden");
    document.getElementById("choix_2").classList.remove("hidden");
    previous();
    next();
})