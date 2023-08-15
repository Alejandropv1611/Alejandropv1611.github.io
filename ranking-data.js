function fetchData() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbwsk78ky9oJrkAcssbyLWGrklxqwPi9oKUFcWHqW1d4KkXg2HEUpHIo0rSuUCDMBNHi/exec?action=getUsers", // Reemplaza esto con la URL real de tu API
    method: "GET",
    dataType: "json",
    success: function (data) {
      //Constantes
      const datosAgregados = {};
      let contador = 1;
      const tableBody = document.getElementById("data-container");

      //Transforma los datos  y los filtra
      data.forEach((obj) => {
        if (!datosAgregados[obj.Closer]) {
          if (obj.Closer != "" && obj.Closer != "N/A" && obj.DealsToday != "") {
            datosAgregados[obj.Closer] = {
              contador: contador,
              nombre: obj.Closer,
              puntajeTotal: obj.DealsToday,
            };
            contador++;
          }
        } else {
          datosAgregados[obj.Closer].puntajeTotal += obj.DealsToday;
        }
      });
      const datosAgregadosArray = Object.values(datosAgregados); // Convertir los valores del objeto a un arreglo para obtener los datos agregados

      //Recorrer el arreglo para mostrar en front

      for (let i = 0; i < datosAgregadosArray.length; i++) {
        const { contador, nombre, puntajeTotal } =  datosAgregadosArray[i];
        console.log(nombre);
        tableBody.innerHTML += `<tr><td>${contador}</td><td>${nombre}</td><td>${puntajeTotal}</td></tr>`;
       
        
      }

        tableBody.innerHTML = `<div class="name_bar"><p><span>${datosAgregadosArray[0].contador}.</span>${datosAgregadosArray[0].nombre}</p><div class="bar_wrap">
                   <div class="inner_bar" style="width: 80%"></div>
                 </div>
                </div>
                <div class="points">${datosAgregadosArray[0].puntajeTotal} Sales
                </div>`;
        console.log(tableBody);
      
      
   

      //     datosAgregadosArray.forEach(function (objeto, indice) {
      //       console.log(objeto.nombre)
      //       var li = `<div class="name_bar">
      //                      <p><span>${objeto.contador}.</span>${objeto.nombre}</p>
      //          <div class="bar_wrap">
      //            <div class="inner_bar" style="width: 80%"></div>
      //          </div>
      //        </div>
      //        <div class="points">${objeto.puntajeTotal} Sales
      //        </div>`;
      //        console.log(li)
      //            listaElemento.innerHTML += li;
      //     });

      //     tableBody.innerHTML = "";

      // for (let i = 0;  i < datosAgregadosArray.length; i++) {
      //   const { contador, nombre, puntajeTotal } =  datosAgregadosArray[i];
      //   if (datosAgregadosArray[i].closer != "") {
      //     const row = `<div class="name_bar">
      //                    <p><span>${contador}.</span>${nombre}</p>
      //        <div class="bar_wrap">
      //          <div class="inner_bar" style="width: 80%"></div>
      //        </div>
      //      </div>
      //      <div class="points">${puntajeTotal} Sales
      //      </div>`;
      //     tableBody.innerHTML += row;
      //   }
      // }

      //   //   arregloJSON.forEach(function (objeto, indice) {
      //   //     var li = `<div class="name_bar">
      //   //               <p><span>${indice}.</span>${objeto.nombre}</p>
      //   //   <div class="bar_wrap">
      //   //     <div class="inner_bar" style="width: 80%"></div>
      //   //   </div>
      //   // </div>
      //   // <div class="points">${objeto.ciudad} Sales
      //   // </div>`;
      //   //     listaElemento.innerHTML += li;
      //   //   });

      //$("#data-container").html(JSON.stringify(tableBody));

    },
    error: function () {
      console.error("Error al obtener los datos de la API");
    },
  });
}

// Actualiza los datos cada 5 segundos
setInterval(fetchData, 3000); // Cambia el intervalo según tus necesidades
