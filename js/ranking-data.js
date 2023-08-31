
/* ------{DealsToday}------*/
const itemsPerPage = 10; // Cantidad de elementos por página
let currentPage = 1; // Página actual
let datosAgregadosArray = []; // Datos globales para todos los elementos
const MAX_PUNTAJE = 10;

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbykBkE8SQIZy3Ck_M-0env7LAtPt7wgqJ7w7qkCUYG69VEJEOJSSD6iy_e_ryd6args/exec?action=getUsers"
    );
    const data = await response.json();
    const datosAgregados = {};


    data.forEach((obj) => {
      if (!datosAgregados[obj.Closer] && obj.Closer && obj.Closer !== "N/A" && obj.DealsToday) {
        const puntajeTotal = parseNumericalValue(obj.DealsToday);
        datosAgregados[obj.Closer] = {
          nombre: obj.Closer,
          puntajeTotal: puntajeTotal,
        };
      } else if (datosAgregados[obj.Closer]) {
        datosAgregados[obj.Closer].puntajeTotal += parseNumericalValue(obj.DealsToday);
      }
    });
    datosAgregadosArray = Object.values(datosAgregados);
    datosAgregadosArray.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    showDataAndPagination();

  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showDataAndPagination() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = datosAgregadosArray.slice(startIndex, endIndex);

  const tableBody = document.getElementById("data-container-today");
  let htmlContent = "";

  for (let i = 0; i < paginatedData.length; i++) {
    const {  nombre, puntajeTotal } = paginatedData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE) * 100;
    const sequentialNumber = startIndex + i + 1; // Calcula el número secuencial

    htmlContent += `
      <div class="lboard_mem">
        <div class="name_bar">
          <p><span>${sequentialNumber}</span> ${nombre}</p>
          <div class="bar_wrap">
            <div class="inner_bar" style="width: ${porcentaje}%"></div>
          </div>
        </div>
        <div class="points">
          ${puntajeTotal} Sales
        </div>
      </div>
    `;
  }

  tableBody.innerHTML = htmlContent;
  // updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(datosAgregadosArray.length / itemsPerPage);

  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = `<div class="pagination">
    <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <span class="indicePage">Page  ${currentPage} of ${totalPages}</span>
    <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    </div>`;
}

function parseNumericalValue(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function goToPage(page) {
  currentPage = page;
  showDataAndPagination();
}

const updateInterval = 1000; // Actualizar cada 1 segundo

// Carga inicial de datos
fetchData();

// Configurar intervalo para actualizar automáticamente
setInterval(fetchData, updateInterval);


