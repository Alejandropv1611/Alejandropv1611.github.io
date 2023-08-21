let url =
  "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers";
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));
  //Tabla de personas
const mostrarData = (data) => {
  let dealsToday = 0;
  let dealsThisWeek = 0;
  let dealsThisMonth = "";
  const arraDealsToday= [];
  const arraDealsThisWeek= [];
  const arraDealsThisMonth= [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].Closer != "") {

        arraDealsThisMonth[i]=data[i].DealsThisMonth;
        arraDealsThisWeek[i]=data[i].DealsThisWeek;
        arraDealsToday[i]=data[i].DealsToday;
        dealsToday= arraDealsToday.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        dealsThisMonth = arraDealsThisMonth.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        dealsThisWeek=arraDealsThisWeek.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    }
  }
  document.getElementById("dealsToday").innerHTML = dealsToday;
  document.getElementById("dealsThisWeek").innerHTML = dealsThisWeek;
  document.getElementById("dealsThisMonth").innerHTML = dealsThisMonth;
  

};
 // Dark Mode

 const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector (".theme-toggler");


menuBtn.addEventListener("click" , () => {
    sideMenu.style.display = "block";
})

closeBtn.addEventListener("click" , () => {
    sideMenu.style.display = "none";
})

themeToggler .addEventListener("click", () => {
    document.body.classList.toggle("dark-theme-variables");

    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
})






