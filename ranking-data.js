function fetchData() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers", // Reemplaza esto con la URL real de tu API
    method: "GET",
    dataType: "json",
    success: function (data) {
      //console.log(data);

    //   // Crear un Set para almacenar nombres únicos
    //   const nombresUnicos = new Set();

    //   // Iterar sobre los objetos y agregar los nombres al Set
    //   data.forEach((obj) => nombresUnicos.add(obj.Closer));

    //   // Convertir el Set de nombres únicos a un arreglo
    //   const nombresUnicosArray = Array.from(nombresUnicos);

    //   console.log(nombresUnicosArray); // Mostrará: ['Juan', 'María', 'Pedro', 'Ana']
    //   --------------------

      
      // Crear un objeto para almacenar los datos agregados con contador y puntajes
      const datosAgregados = {};
      let contador = 1;
      
      // Iterar sobre los objetos y agregar puntajes a los datos agregados
      data.forEach(obj => {
        if (!datosAgregados[obj.Closer]) {
          datosAgregados[obj.Closer] = {
            contador: contador,
            nombre: obj.Closer,
            puntajeTotal: obj.DealsToday
          };
          contador++;
        } else {
          datosAgregados[obj.Closer].puntajeTotal += obj.DealsToday;
        }
      });
      
      // Convertir los valores del objeto a un arreglo para obtener los datos agregados
      const datosAgregadosArray = Object.values(datosAgregados);
      
      console.log(datosAgregadosArray);
      

      //$("#data-container").html(JSON.stringify(data));
    },
    error: function () {
      console.error("Error al obtener los datos de la API");
    },
  });
}

// Actualiza los datos cada 5 segundos
setInterval(fetchData, 3000); // Cambia el intervalo según tus necesidades
