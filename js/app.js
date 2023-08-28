// Eliminar la variable itemsPerPage y cualquier referencia a ella

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
          obj.Closer !== " " &&
          obj.Closer !== "N/A" &&
          obj.Closer !== "" &&
          obj.DealsToday !== ""
        ) {
          datosAgregados[obj.Closer] = {
            nombre: obj.Closer,
            month: obj.DealsThisMonth,
            week: obj.DealsThisWeek,
            today: obj.DealsToday,
          };
        }
      });
      datosAgregadosArray = Object.values(datosAgregados);
  
      showData();
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
  
  function showData() {
    const tableBody = document.getElementById("tableBody");
    let htmlContent = "";
  
    for (let i = 0; i < datosAgregadosArray.length; i++) {
      const { nombre, month, week, today } = datosAgregadosArray[i];
      htmlContent += `<tr><td>${nombre}</td><td>${today}</td><td>${week}</td><td>${month}</td></tr>`;
    }
  
    tableBody.innerHTML = htmlContent;
  }
  
  const updateInterval = 5000; // Actualizar cada 5 segundos
  
  // Carga inicial de datos
  fetchData();
  
  // Configurar intervalo para actualizar automáticamente
  setInterval(fetchData, updateInterval);
  