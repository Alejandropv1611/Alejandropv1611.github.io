/* ------{DealsToday}------*/
let datosAgregadosArray = []; // Datos globales para todos los elementos
let datosFiltradosArray = []; // Almacenar los resultados filtrados

const MAX_PUNTAJE = 32;
const VAR_TODAY=4;
let contadorSecuencial = 0;

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbykBkE8SQIZy3Ck_M-0env7LAtPt7wgqJ7w7qkCUYG69VEJEOJSSD6iy_e_ryd6args/exec?action=getUsers"
    );
    const data = await response.json();
    const datosAgregados = {};

    data.forEach((obj) => {
      if (
        !datosAgregados[obj.Closer] &&
        obj.Closer &&
        obj.Closer !== "N/A" &&
        obj.DealsThisMonth !==""
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

// Assign ranks based on the sorted order
    datosAgregadosArray.forEach((item, index) => {
      item.rank = index + 1;
    });
    showData();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function showData() {
  const tableBody = document.getElementById("dataAgentMonth");
  let htmlContent = "";

  const displayData =
    datosFiltradosArray.length > 0 ? datosFiltradosArray : datosAgregadosArray;

  for (let i = 0; i < displayData.length; i++) {
    const { nombre, puntajeTotal, rank  } = displayData[i];
    const porcentaje = (puntajeTotal / MAX_PUNTAJE) * 100;
    const angle = (porcentaje / 100) * 360;
    const dashOffset = 360 - angle;

    htmlContent += `
    <div class="sales">
      <a href="#"></a>
      <span class="material-icons-sharp">person_4</span>
      <div class="middle">
          <div class="rank">
              <h1 id="contadorTag">#${rank}</h1>
          </div>
          <div>
              <h3>Agent</h3>
              <h1>${nombre}</h1>
          </div>
          <div>
              <h3>Deals This Month</h3>
              <h1 id="dealsToday">${puntajeTotal}</h1>
          </div> 
          <div>
              <h3>Predictive Score</h3>
              <h1>32</h1>
          </div>   
          <div class="progress">
              <svg>
                  <circle id="todayCircle"  cx="40%" cy="45%" r="35" pathlength="100" style="stroke-dasharray: ${porcentaje.toFixed(2)} 100;"></circle>
              </svg>
              <div class="number">
                  <p>${porcentaje.toFixed(2)}%</p>
              </div>
          </div>
      </div>
    </div>
    `;
  }

  tableBody.innerHTML = htmlContent;
}

function parseNumericalValueMo(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

// Carga inicial de datos
fetchData();

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", performSearch);

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  datosFiltradosArray = datosAgregadosArray.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm)
  );

// Sort the filtered data by puntajeTotal
  datosFiltradosArray.sort((a, b) => b.puntajeTotal - a.puntajeTotal);
  showData();
}

// Configurar intervalo para actualizar automáticamente
const updateInterval = 1000; // Actualizar cada 1 segundo
setInterval(fetchData, updateInterval);