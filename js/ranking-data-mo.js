
/* ------{DealsThisMonth}------*/
const itemsPerPageMo = 100; // Cantidad de elementos por página
let currentPageMo  = 1; // Página actual
let datosAgregadosArrayMo  = []; // Datos globales para todos los elementos
const MAX_PUNTAJE_MO = 10;

async function fetchDataMonth() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers"
    );
    const data = await response.json();

    const datosAgregados = {};

    data.forEach((obj) => {
      if (!datosAgregados[obj.Closer] && obj.Closer && obj.Closer !== "N/A" && obj.DealsThisMonth) {
        const puntajeTotal = parseNumericalValueMo(obj.DealsThisMonth);
        datosAgregados[obj.Closer] = {
          nombre: obj.Closer,
          puntajeTotal: puntajeTotal,
        };
      } else if (datosAgregados[obj.Closer]) {
        datosAgregados[obj.Closer].puntajeTotal += parseNumericalValueMo(obj.DealsThisMonth);
      }
    });
    datosAgregadosArrayMo = Object.values(datosAgregados);

    datosAgregadosArrayMo.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    showDataAndPaginationMo();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showDataAndPaginationMo() {
  const startIndex = (currentPageMo - 1) * itemsPerPageMo;
  const endIndex = startIndex + itemsPerPageMo;
  const paginatedData = datosAgregadosArrayMo.slice(startIndex, endIndex);

  const tableBody = document.getElementById("data-container-month");
  let htmlContent = "";

  for (let i = 0; i < paginatedData.length; i++) {
    const { contador, nombre, puntajeTotal } = paginatedData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE_MO) * 100;
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
  // updatePaginationMo();
}

function updatePaginationMo() {
  const totalPages = Math.ceil(datosAgregadosArrayMo.length / itemsPerPageMo);

  const paginationContainer = document.getElementById("paginationM");
  paginationContainer.innerHTML = `<div class="pagination">
    <button onclick="goToPageMo(${currentPageMo - 1})" ${currentPageMo === 1 ? 'disabled' : ''}>Previous</button>
    <span class="indicePage">Page  ${currentPageMo} of ${totalPages}</span>
    <button onclick="goToPageMo(${currentPageMo + 1})" ${currentPageMo === totalPages ? 'disabled' : ''}>Next</button>
    </div>`;
}

function parseNumericalValueMo(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function goToPageMo(page) {
  currentPageMo = page;
  showDataAndPaginationMo();
}

const updateIntervalMo = 1000; // Actualizar cada 1 segundo

// Carga inicial de datos
fetchDataMonth();

// Configurar intervalo para actualizar automáticamente
setInterval(fetchDataMonth, updateIntervalMo);