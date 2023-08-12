const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentPageElem = document.getElementById("currentPage");
const entriesPerPageSelect = document.getElementById("entriesPerPage");

let currentPage = 1;
let entriesPerPage = parseInt(entriesPerPageSelect.value);
let totalEntries = 0;
let filteredData = [];

function updateTable() {
  tableBody.innerHTML = "";
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  for (let i = startIndex; i < endIndex && i < filteredData.length; i++) {
    const { email, closer, dealsToday, dealsThisWeek, dealsThisMonth } =
      filteredData[i];
    if (filteredData[i].closer != "") {
      const row = `<tr><td>${email}</td><td>${closer}</td><td>${dealsToday}</td><td>${dealsThisWeek}</td><td>${dealsThisMonth}</td></tr>`;
      tableBody.innerHTML += row;
    }
  }

  currentPageElem.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = endIndex >= totalEntries;
}

function performSearch() {
  const searchText = searchInput.value.toLowerCase();
  filteredData = data.filter(
    (item) =>
      item.Closer.toLowerCase().includes(searchText) ||
      item.Email.toLowerCase().includes(searchText)
  );
  console.log(filteredData)
  totalEntries = filteredData.length;
  currentPage = 1;
  updateTable();
}

function updateEntriesPerPage() {
  entriesPerPage = parseInt(entriesPerPageSelect.value);
  currentPage = 1;
  updateTable();
}

searchInput.addEventListener("input", performSearch);
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});
nextBtn.addEventListener("click", () => {
  if (currentPage * entriesPerPage < totalEntries) {
    currentPage++;
    updateTable();
  }
});
entriesPerPageSelect.addEventListener("change", updateEntriesPerPage);


let globalData = []; // Variable global para almacenar los datos

function fetchDataFromAPI(apiUrl) {
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const jsonDataArray = data.map((item) => {
        return {
          email: item.Email,
          closer: item.Closer,
          dealsToday: item.DealsToday,
          dealsThisWeek: item.DealsThisWeek,
          dealsThisMonth: item.DealsThisMonth,
          // Agrega más propiedades según la estructura de tus datos
        };
      });

      globalData = jsonDataArray; // Almacenar en la variable global
      return jsonDataArray; // Devolver los datos para uso posterior si es necesario
    });
}

const apiUrl =
  "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers"; // Reemplaza con la URL de tu API

fetchDataFromAPI(apiUrl)
  .then((dataArray) => {
    filteredData = dataArray;
    totalEntries = filteredData.length;
    updateTable();

    

  })
  .catch((error) => {
    console.error("Ocurrió un error:", error);
  });
