/* ------{DealsToday}------*/
const itemsPerPage = 2; // Cantidad de elementos por página
let currentPage = 1; // Página actual
let datosAgregadosArray = []; // Datos globales para todos los elementos

let datosOriginalesArray = []; // Almacenar los datos originales
let datosFiltradosArray = []; // Almacenar los resultados filtrados

const MAX_PUNTAJE = 10;

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers"
    );
    const data = await response.json();
    const datosAgregados = {};

    data.forEach((obj) => {
      if (
        !datosAgregados[obj.Closer] &&
        obj.Closer &&
        obj.Closer !== "N/A" &&
        obj.DealsThisMonth
      ) {
 
        const puntajeTotal = parseNumericalValueMo(obj.DealsThisMonth);
        datosAgregados[obj.Closer] = {
          nombre: obj.Closer,
          puntajeTotal: puntajeTotal,
        };
      } else if (datosAgregados[obj.Closer]) {
        datosAgregados[obj.Closer].puntajeTotal += parseNumericalValueMo(
          obj.DealsThisMonth
        );
      }
    });
    datosAgregadosArray = Object.values(datosAgregados);
    datosAgregadosArray.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    datosOriginalesArray = datosAgregadosArray;

    showDataAndPagination();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showDataAndPagination() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData =
    datosFiltradosArray.length > 0
      ? datosFiltradosArray.slice(startIndex, endIndex)
      : datosOriginalesArray.slice(startIndex, endIndex);

  const tableBody = document.getElementById("dataAgentMonth");
  let htmlContent = "";

  for (let i = 0; i < paginatedData.length; i++) {
    const { nombre, puntajeTotal } = paginatedData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE) * 100;
    const sequentialNumber = startIndex + i + 1; // Calcula el número secuencial

    htmlContent += `
    <div class="sales">
    <a href="#"></a>
    <span class="material-icons-sharp">person_4</span>
    <div class="middle">
        <div class="rank">
            <h1 id="contadorTag">#${sequentialNumber}</h1>
        </div>
        <div>
            <h3>Agent</h3>
            <h1>${nombre}</h1>
        </div>
        <div>
            <h3>Deals Today</h3>
            <h1 id="dealsToday">${puntajeTotal}</h1>
        </div> 
        <div>
            <h3>Predictive Score</h3>
            <h1>8</h1>
        </div>   
        <div class="progress">
            <svg>
                <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div class="number">
                <p>${porcentaje}%</p>
            </div>
        </div>
    </div>
    </div>
    `;
  }

  tableBody.innerHTML = htmlContent;
  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(datosAgregadosArray.length / itemsPerPage);

  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = `<div class="pagination">
    <button onclick="goToPage(${currentPage - 1})" ${
    currentPage === 1 ? "disabled" : ""
  }>Previous</button>
    <span class="indicePage">Page  ${currentPage} of ${totalPages}</span>
    <button onclick="goToPage(${currentPage + 1})" ${
    currentPage === totalPages ? "disabled" : ""
  }>Next</button>
    </div><br>`;
}

function parseNumericalValueMo(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function goToPage(page) {
  currentPage = page;
  showDataAndPagination();
}

const updateInterval = 1000; // Actualizar cada 1 segundo

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", performSearch);

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredData = datosAgregadosArray.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm)
  );

  currentPage = 1; // Resetear a la página 1 después de cada búsqueda
  datosFiltradosArray = filteredData; // Almacenar los resultados filtrados

  showDataAndPagination();
}

// Carga inicial de datos
fetchData();

// Configurar intervalo para actualizar automáticamente
setInterval(fetchData, updateInterval);
