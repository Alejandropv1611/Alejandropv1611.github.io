// let itemsPerPage = 5; // Cantidad de elementos por página

// // const entriesPerPageSelect = document.getElementById("entriesPerPage");

// // entriesPerPageSelect.addEventListener("change", () => {
// //   itemsPerPage = parseInt(entriesPerPageSelect.value);
// //   currentPage = 1; // Resetear la página actual al cambiar la cantidad de elementos por página
// //   showDataAndPagination();
// // });
// // let currentPage = 1; // Página actual
// // let datosAgregadosArray = []; // Datos globales para todos los elementos

// async function fetchData() {
//   try {
//     const response = await fetch(
//       "https://script.google.com/macros/s/AKfycbykBkE8SQIZy3Ck_M-0env7LAtPt7wgqJ7w7qkCUYG69VEJEOJSSD6iy_e_ryd6args/exec?action=getUsers"
//     );
//     const data = await response.json();
//     const datosAgregados = {};

//     data.forEach((obj) => {
//       if (
//         !datosAgregados[obj.Closer] &&
//         obj.Closer !== " " &&
//         obj.Closer !== "N/A" &&
//         obj.Closer !== ""
//       ) {
//         datosAgregados[obj.Closer] = {
//           nombre: obj.Closer,
//           month: obj.DealsThisMonth,
//           week: obj.DealsThisWeek,
//           today: obj.DealsToday,
//         };
//       }
//     });
//     datosAgregadosArray = Object.values(datosAgregados);

//     // const searchInput = document.getElementById("searchInput");

//     // searchInput.addEventListener("input", () => {
//     //   const searchText = searchInput.value.trim().toLowerCase();

//     //   if (searchText === "") {
//     //     // Si el cuadro de búsqueda está vacío, mostrar todos los datos
//     //     datosAgregadosArray = Object.values(datosAgregados);
//     //   } else {
//     //     // Filtrar los datos por el nombre de búsqueda
//     //     datosAgregadosArray = Object.values(datosAgregados).filter((item) =>
//     //       item.nombre.toLowerCase().includes(searchText)
//     //     );
//     //   }

//     //   // Mostrar datos y paginación con los resultados filtrados
//     //   currentPage = 1; // Resetear a la primera página al realizar una búsqueda
//     //   showDataAndPagination();
//     // });

    

//     showDataAndPagination();
//   } catch (error) {
//     console.error("Error al obtener los datos:", error);
//   }
// }

// function showDataAndPagination() {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedData = datosAgregadosArray.slice(startIndex, endIndex);

//   const tableBody = document.getElementById("tableBody");
//   let htmlContent = "";

//   for (let i = 0; i < paginatedData.length; i++) {
//     const { nombre, month, week, today } = paginatedData[i];
//     htmlContent += `<tr><td>${nombre}</td><td>${today}</td><td>${week}</td><td>${month}</td></tr>`;
//   }

//   tableBody.innerHTML = htmlContent;
//   updatePagination();
// }

// function updatePagination() {
//   const totalPages = Math.ceil(datosAgregadosArray.length / itemsPerPage);

//   const paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = `<div class="pagination">
//     <button onclick="goToPage(${currentPage - 1})" ${
//     currentPage === 1 ? "disabled" : ""
//   }>Previous</button>
//     <span class="indicePage">Page  ${currentPage} of ${totalPages}</span>
//     <button onclick="goToPage(${currentPage + 1})" ${
//     currentPage === totalPages ? "disabled" : ""
//   }>Next</button>
//     </div>`;
// }

// function parseNumericalValue(value) {
//   const parsedValue = parseFloat(value);
//   return isNaN(parsedValue) ? 0 : parsedValue;
// }

// function goToPage(page) {
//   currentPage = page;
//   showDataAndPagination();
// }

// const updateInterval = 5000; // Actualizar cada 1 segundo

// // Carga inicial de datos
// fetchData();

// // Configurar intervalo para actualizar automáticamente
// setInterval(fetchData, updateInterval);
