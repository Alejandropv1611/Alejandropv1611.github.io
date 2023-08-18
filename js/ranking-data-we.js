
/* ------{DealsThisWeek}------*/
const itemsPerPage = 5; // Cantidad de elementos por página
let currentPage = 1; // Página actual
let datosAgregadosArray = []; // Datos globales para todos los elementos
const MAX_PUNTAJE = 10;

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers"
    );
    const data = await response.json();

    const datosAgregados = {};
    let contador = 1;

    data.forEach((obj) => {
      if (!datosAgregados[obj.Closer] && obj.Closer && obj.Closer !== "N/A" && obj.DealsThisWeek) {
        const puntajeTotal = parseNumericalValue(obj.DealsThisWeek);
        datosAgregados[obj.Closer] = {
          contador: contador,
          nombre: obj.Closer,
          puntajeTotal: puntajeTotal,
        };
        contador++;
      } else if (datosAgregados[obj.Closer]) {
        datosAgregados[obj.Closer].puntajeTotal += parseNumericalValue(obj.DealsThisWeek);
      }
    });
    datosAgregadosArray = Object.values(datosAgregados);

    showDataAndPagination();

  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showDataAndPagination() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = datosAgregadosArray.slice(startIndex, endIndex);

  const tableBody = document.getElementById("data-container-weekly");
  let htmlContent = "";

  for (let i = 0; i < paginatedData.length; i++) {
    const { contador, nombre, puntajeTotal } = paginatedData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE) * 100;
    htmlContent += `
      <div class="lboard_mem">
        <div class="name_bar">
          <p><span>${contador}</span> ${nombre}</p>
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
  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(datosAgregadosArray.length / itemsPerPage);

  const paginationContainer = document.getElementById("paginationW");
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