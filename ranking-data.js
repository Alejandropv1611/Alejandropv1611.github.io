function fetchData() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers", // Reemplaza esto con la URL real de tu API
    method: "GET",
    dataType: "json",
    success: function (data) {
		console.log(data);
      $("#data-container").html(JSON.stringify(data));
    },
    error: function () {
      console.error("Error al obtener los datos de la API");
    },
  });
}

// Actualiza los datos cada 5 segundos
setInterval(fetchData, 3000); // Cambia el intervalo según tus necesidades