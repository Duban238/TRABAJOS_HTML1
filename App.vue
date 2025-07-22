<template>
  <div class="container-fluid">
    <header class="">
      <h1 class="text-center bg-primary text-white">TALONARIO</h1>
    </header>
    <div class="d-flex justify-content-between">
      <div class="">
        <div class="color">
          <h4 class="text-center">Informacion de talonario</h4>
          <div class="color1" v-if="premio && valor_boleta && loteria && fecha">
            <h3><i class="bi bi-trophy-fill"></i>{{ premio }}</h3>
            <h3><i class="bi bi-currency-dollar"></i>{{ valor_boleta }}</h3>
            <h3><i class="bi bi-house-door-fill"></i>{{ loteria }}</h3>
            <h3><i class="bi bi-calendar-date"></i>{{ fecha }}</h3>
            <div class="d-flex justify-content-center">
              <button v-if="premio && valor_boleta && loteria && fecha" class="btn btn-primary mt-2" @click="editar">
                Editar <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>

        </div>
      </div>



      <div class="">

      </div>

      <div class=" ">
        <div class="color">
          <h4 class="text-center">Acciones</h4>
          <div class="color2 ">
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary mt-2 ">
                <i class="bi bi-list-ul"></i> Listar Boletas
              </button>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary mt-2">
                <i class="bi bi-gear"> </i> Personalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="modal fade" ref="modalRef" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">CONFIGURA TU TALONARIO</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">


          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" v-model="premio">
            <label for="">Ingrese el premio de la rifa</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="valor_boleta">
            <label for="">Ingrese el valor de la boleta</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select" aria-label="Default select example" id="" v-model="loteria">
              <option value="Por defecto">Por defecto</option>
              <option value="Cruz Roja">Cruz Roja</option>
              <option value="La Perla">La Perla</option>
              <option value="Santander">Santander</option>
              <option value="Baloto">Baloto</option>
            </select>
            <label for="">Selecciona la loteria</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select" aria-label="Default select example" id="">
              <option value="100">0-99</option>
              <option value="1000">0-999</option>

            </select>
            <label for="">Cantidad de boletas</label>
          </div>
          <div class="form-floating mb-3">
            <input type="date" class="form-control" id="" v-model="fecha">
            <label for="">Ingrese la fecha que juega</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="save" class="btn btn-primary"> {{ editando ? 'Actualizar' : 'Guardar'
            }}</button>
        </div>
      </div>
    </div>
  </div>






</template>


<script setup>

import { ref, onMounted, } from "vue"

let premio = ref("")
let valor_boleta = ref("")
let loteria = ref("")
let fecha = ref("")
let today = new Date()
let modalInstance = null;
let datos = ref([])
let editando = ref(false);

onMounted(() => {
  modalInstance = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  modalInstance.show();
  const modalElement = document.getElementById("staticBackdrop");

  modalElement.addEventListener("hide.bs.modal", function (event) {
    if (!validaciones()) {
      event.preventDefault(); // ❌ Evita que el modal se cierre
    }
  });
}
);

function save() {
  if (validaciones()) {
    if (editando.value) {
      Swal.fire("Actualizado", "Talonario actualizado correctamente", "success");
    } else {
      datos.value.push({
        premio: premio.value,
        valor_boleta: valor_boleta.value,
        fecha: fecha.value
      })
      Swal.fire("Guardado", "Talonario guardado correctamente", "success");
    }

    console.log(datos);
    editando.value = false;
  }
}
function editar() {
  editando.value = true;
  modalInstance.show();
}

function validaciones() {
  if (premio.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El valor del premio no puede estar vacio",
    })
    return false;
  } else if (premio.value.length >= 15) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El valor del premio no puede tener mas de 15 numeros",
    })
  } else if (valor_boleta.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El valor de la boleta no puede estar vacio",
    })
    return false;
  } else if (valor_boleta.value >= premio.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El valor de la boleta no puede ser superior al del premio",
    })
    return false;
  } else if (loteria.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Selecciona la loteria que quieras jugar",
    })
    return false;
  } else if (fecha.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Seleccione la fecha del sorteo",
    })
    return false;
  } else if (new Date(fecha.value) < today) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La fecha del sorteo debe ser posterior a la de hoy",
    })
    return false
  } else {
    Swal.fire({
      title: "Tus datos fueron guardados perfectamente!",
      icon: "success",
    })
    modalInstance.hide();

    return true;
  }
}

</script>


<style scoped>
.color {
  background-color: #d6d7d9;
  width: 360px;
  height: 400px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 40px;
}

.color h4 {
  margin-bottom: 20px;
}

.color1 {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
  height: 250px;
}

.color2 {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
  height: 300px;
  padding-top: 100px;
}

.encabezado2 {
  background-color: rgb(45, 178, 255);
  color: white;
  text-align: center;
  align-items: center;
  font-size: 20px;
  border-radius: 10px;
}

.footer {
  padding-top: 20px;
}
</style>