
/* ------{DealsThisWeek}------*/
const itemsPerPageWe = 5; // Cantidad de elementos por página
let currentPageWe  = 1; // Página actual
let datosAgregadosArrayWe  = []; // Datos globales para todos los elementos
const MAX_PUNTAJE_WE = 10;

async function fetchDataWeek() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers"
    );
    const data = await response.json();

    const datosAgregados = {};

    data.forEach((obj) => {
      if (!datosAgregados[obj.Closer] && obj.Closer && obj.Closer !== "N/A" && obj.DealsThisWeek) {
        const puntajeTotal = parseNumericalValueWe(obj.DealsThisWeek);
        datosAgregados[obj.Closer] = {
          nombre: obj.Closer,
          puntajeTotal: puntajeTotal,
        };
      } else if (datosAgregados[obj.Closer]) {
        datosAgregados[obj.Closer].puntajeTotal += parseNumericalValueWe(obj.DealsThisWeek);
      }
    });
    datosAgregadosArrayWe = Object.values(datosAgregados);

    datosAgregadosArrayWe.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    showDataAndPaginationWe();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showDataAndPaginationWe() {
  const startIndex = (currentPageWe - 1) * itemsPerPageWe;
  const endIndex = startIndex + itemsPerPageWe;
  const paginatedData = datosAgregadosArrayWe.slice(startIndex, endIndex);

  const tableBody = document.getElementById("data-container-weekly");
  let htmlContent = "";

  for (let i = 0; i < paginatedData.length; i++) {
    const { contador, nombre, puntajeTotal } = paginatedData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE_WE) * 100;
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
  updatePaginationWe();
}

function updatePaginationWe() {
  const totalPages = Math.ceil(datosAgregadosArrayWe.length / itemsPerPageWe);

  const paginationContainer = document.getElementById("paginationW");
  paginationContainer.innerHTML = `<div class="pagination">
    <button onclick="goToPageWe(${currentPageWe - 1})" ${currentPageWe === 1 ? 'disabled' : ''}>Previous</button>
    <span class="indicePage">Page  ${currentPageWe} of ${totalPages}</span>
    <button onclick="goToPageWe(${currentPageWe + 1})" ${currentPageWe === totalPages ? 'disabled' : ''}>Next</button>
    </div>`;
}

function parseNumericalValueWe(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function goToPageWe(page) {
  currentPageWe = page;
  showDataAndPaginationWe();
}

const updateIntervalWe = 1000; // Actualizar cada 1 segundo

// Carga inicial de datos
fetchDataWeek();

// Configurar intervalo para actualizar automáticamente
setInterval(fetchDataWeek, updateIntervalWe);