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
  let dealsThisMonth = 0;
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
  document.getElementById("dealsToday").innerHTML = `${dealsToday}/<spam style='font-size: 15px;'>4</spam>`;
  document.getElementById("dealsThisWeek").innerHTML = `${dealsThisWeek}/<spam style='font-size: 15px;'>8</spam>`;
  document.getElementById("dealsThisMonth").innerHTML = `${dealsThisMonth}/<spam style='font-size: 15px;'>32</spam>`;

  //Porcentaje
  const VAR_TODAY=4;
  const VAR_MONTH=8;
  const VAR_WEEK=32;

  let percentageDealsThisWeek = 0;
  let percentageDealsThisMonth= 0;
  let percentageDealsToday=0;

  if(dealsToday<=VAR_TODAY){
    percentageDealsToday= Math.round((dealsToday / VAR_TODAY) * 100);
  }else{percentageDealsToday=100}

  if(dealsThisWeek<=VAR_WEEK){
    percentageDealsThisWeek = Math.round((dealsThisWeek / VAR_WEEK) * 100);
  }else{percentageDealsThisWeek=100}

  if(dealsThisMonth<=VAR_MONTH){
    percentageDealsThisMonth= Math.round((dealsThisMonth / VAR_MONTH) * 100);
  }else{percentageDealsThisMonth=100}

  document.getElementById('circlePercentageDaily').innerHTML=`<p>${percentageDealsToday}%</p>`
  document.getElementById('circlePercentageWeekly').innerHTML=`<p>${percentageDealsThisWeek}%</p>`
  document.getElementById('circlePercentageMonthly').innerHTML=`<p>${percentageDealsThisMonth}%</p>`
  
  let week=percentageDealsThisWeek+" 100";

  const todayCircle=document.getElementById("todayCircle");
  todayCircle.style.strokeDasharray=`${percentageDealsToday} 100`

   const weeklyCircle=document.getElementById("weeklyCircle");
   weeklyCircle.style.strokeDasharray=`${percentageDealsThisWeek} 100`

   const monthlyCircle=document.getElementById("monthlyCircle");
   monthlyCircle.style.strokeDasharray=`${percentageDealsThisMonth} 100`


  

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






