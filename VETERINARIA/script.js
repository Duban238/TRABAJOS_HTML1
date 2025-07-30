const myModalElemet = document.getElementById('exampleModal')
const MyModal = new bootstrap.Modal(myModalElemet)
let random = Date.now()+''+Math.floor(Math.random()*1000);
let citas = JSON.parse(localStorage.getItem("citas")) || [];
let validacion = false;
let op = 0;
let pos = null;

let img_mascotas = [
  { tipo: "Perro", url: "https://png.pngtree.com/png-clipart/20200727/original/pngtree-dog-sleep-on-bone-logo-icon-png-image_5245162.jpg" },
  { tipo: "Gato", url: "https://images.freeimages.com/image/previews/b36/feline-cartoon-cat-png-icon-5695247.png" },
  { tipo: "Tortuga", url: "https://cdn-icons-png.flaticon.com/512/8334/8334151.png" },
  { tipo: "Hamster", url: "https://i.pinimg.com/originals/d9/58/ee/d958ee0c794c15ab4b280b83a2711851.jpg" },
  { tipo: "Conejo", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkWBR_zXRdCeuhd6vpYy2gRxmpx-HTsokcTA&s" },
  { tipo: "Oveja", url: "https://cdn-icons-png.flaticon.com/512/3570/3570616.png" },
  { tipo: "Pato", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaB1IaIDXYkNG7Wq8mQa6rquhE1lHcunAVw&s" },
  { tipo: "Loro", url: "https://cdn-icons-png.flaticon.com/512/9804/9804364.png" },
  { tipo: "Caballo", url: "https://cdn-icons-png.flaticon.com/512/2219/2219021.png" }
];
function guardar() {
  validaciones();
  if (op == 0) {
    if (validacion) {
      let datos = {
        id: random,
        nombre_mascota: document.getElementById("nombre_mascota").value,
        nombre_propietario: document.getElementById("nombre_propietario").value,
        numero_telefono: document.getElementById("numero_telefono").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        tipo_mascota: document.getElementById("tipo_mascota").value,
        descripcion: document.getElementById("descripcion").value,
        estado: "Abierta",
      };
      citas.push(datos);
      MyModal.hide();
      localStorage.setItem("citas", JSON.stringify(citas))
      Swal.fire({
        title: "Tu cita fue registrada exitosamente!",
        icon: "success",
        draggable: true
      });
      filter();
      limpiar()
          document.getElementById("save").textContent = "Guardar"
    }
  } else if (op == 1) {
    validaciones();
    if (validacion) {
      citas[pos].nombre_mascota = document.getElementById("nombre_mascota").value;
      citas[pos].nombre_propietario = document.getElementById("nombre_propietario").value;
      citas[pos].numero_telefono = document.getElementById("numero_telefono").value;
      citas[pos].fecha = document.getElementById("fecha").value;
      citas[pos].hora = document.getElementById("hora").value;
      citas[pos].tipo_mascota = document.getElementById("tipo_mascota").value;
      citas[pos].descripcion = document.getElementById("descripcion").value;
      localStorage.setItem("citas", JSON.stringify(citas));
      filter();
      MyModal.hide();
    Swal.fire({
  title: "Tu cita fue editada correctamente",
  icon: "success",
  draggable: true
});
      limpiar();
      op = 0;
      document.getElementById("save").textContent = "Editar"
    }

  }
}
function limpiar() {
  document.getElementById("nombre_mascota").value = "";
  document.getElementById("nombre_propietario").value = "";
  document.getElementById("numero_telefono").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("tipo_mascota").value = "";
  document.getElementById("descripcion").value = "";
}

document.getElementById("Cerrar").addEventListener("click",()=>{
     limpiar();
     document.getElementById("save").textContent = "Guardar"
     op=0
})
document.getElementById("Cerrar2").addEventListener("click",()=>{
     limpiar();
     document.getElementById("save").textContent = "Guardar"
     op=0
})

function mostrar_tarjeta(citas) {
  citas.sort(function (a, b) {
    const fecha_a = new Date(`${a.fecha} ${a.hora}`)
    const fecha_b = new Date(`${b.fecha} ${b.hora}`)
    return fecha_a - fecha_b
  })

  document.getElementById("tarjeta").innerHTML = "";
  citas.forEach((element, i) => {
    let mostrar_img = img_mascotas.find(img => img.tipo === element.tipo_mascota) || { url: 'img/default.jpg' };
    document.getElementById("tarjeta").innerHTML += `
   <div class="card mb-3 p-3">
   <div class="nombre_img">
    <p><strong>${element.nombre_mascota}</strong></p>
  
  <img class="img_an" src="${mostrar_img.url}">
    
   </div>
 <p><i class="fas fa-hashtag"></i> <strong>Id:</strong> <span class="texto-secundario">${element.id}</span></p>
   <p><i class="fas fa-user"></i>  <strong>Propietario:</strong> <span class="texto-secundario">${element.nombre_propietario}</span></p>

<p><i class="fas fa-phone"></i>  <strong>Telefono:</strong><span class="texto-secundario"> ${element.numero_telefono}</span></p>
   <p><i class="fas fa-calendar-alt"></i>  <strong>Fecha:</strong><span class="texto-secundario"> ${element.fecha}</span></p>
 
   <p><i class="fas fa-clock"></i>  <strong>Hora:</strong><span class="texto-secundario"> ${element.hora}</span></p>
   <p><i class="fas fa-paw"></i>  <strong>Tipo de mascota:</strong><span class="texto-secundario"> ${element.tipo_mascota}</span></p>
   <div class="text">
   <p><i class="fas fa-sticky-note"></i>  <strong>Descripcion:</strong></p>
   <div class="descripcion">${element.descripcion}</div>
   </div>


   <div class="seleccion">
 <select  name="Estado"  class="form-select mb-3">
          <option value="Abierta">Abierta</option>
          <option value="Terminada">Terminada</option>
          <option value="Anulada">Anulada</option>
        </select>
     </div>
<div class="botones"> 
<button onclick="editarcita(${i})" id="btn_editar" class="btn_editar" class="btn btn-primary">Editar</button>
   <button onclick="eliminarCita(${i})"  class="btn_eliminar" class="btn btn-primary">Eliminar</button>
  
   </div>
   </div>
    `

    document.getElementsByName("Estado").forEach((element, index) => {
      element.value = citas[index].estado;
      element.addEventListener("change", () => {
        citas[index].estado = element.value;
        localStorage.setItem("citas", JSON.stringify(citas));
        filter();
      });
    });
  })
}
function eliminarCita(i) {
  Swal.fire({
    title: "Estas segur@ de eliminar tu cita",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No `
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Tu cita fue eliminada correctamente", "", "success");
      citas.splice(i, 1)
      localStorage.setItem("citas", JSON.stringify(citas));
      filter();
    } else if (result.isDenied) {
      Swal.fire("No se elimino tu cita .", "", "info");
    }
  });
}
function editarcita(i) {

  let cita = citas[i];
  document.getElementById("nombre_mascota").value = cita.nombre_mascota;
  document.getElementById("nombre_propietario").value = cita.nombre_propietario;
  document.getElementById("numero_telefono").value = cita.numero_telefono;
  document.getElementById("fecha").value = cita.fecha;
  document.getElementById("hora").value = cita.hora;
  document.getElementById("tipo_mascota").value = cita.tipo_mascota;
  document.getElementById("descripcion").value = cita.descripcion;
  document.getElementById("save").textContent = "Editar";
  op = 1;
  pos = i;
  MyModal.toggle()
}

function filter() {
  let filtro = document.getElementById("filtro_estado")
  function codigo() {
    if (filtro.value == "") {
      mostrar_tarjeta(citas)
    } else {
      mostrar_tarjeta(citas.filter(element => element.estado == filtro.value));
    }
  }
  document.getElementById("filtro_estado").addEventListener("input", () => {
    codigo()
  })
  codigo()
}

function filtrar_nombre() {
  const nombre_filtro = document.getElementById("filtrar_nombre").value
  if (!nombre_filtro) {
    mostrar_tarjeta(citas);
  }
  let filtrar = citas.filter(element => element.nombre_mascota.includes(nombre_filtro) || element.nombre_propietario.includes(nombre_filtro))
  mostrar_tarjeta(filtrar)
}
document.getElementById("filtrar_nombre").addEventListener("input", () => {
  filtrar_nombre()
});



function validaciones() {
  validacion = false;
  let nombre_mascota = document.getElementById("nombre_mascota").value;
  let nombre_propietario = document.getElementById("nombre_propietario").value;
  let numero_telefono = document.getElementById("numero_telefono").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  let tipo_mascota = document.getElementById("tipo_mascota").value;
  let descripcion = document.getElementById("descripcion").value;
  const fecha_elejida = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  fecha_elejida.setHours(0, 0, 0, 0);

  const [h, m] = hora.split(":").map(Number);

  if (nombre_mascota == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita el nombre de la mascota!",
    });
  }
  else if (nombre_propietario == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita el nombre del propietario!",
    });
  }
  else if (numero_telefono == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita el numero de telefono!",
    });
  } else if (numero_telefono.length <= 9 || numero_telefono.length > 10) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El numero de telefono debe tener 10 digitos!",
    });
  }
  else if (fecha == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita la fecha!",
    });
  }
  else if (fecha_elejida < hoy) {
    Swal.fire({
      icon: "error",
      title: "Fecha inválida",
      text: "La fecha seleccionada ya pasó. Debes elegir una fecha a partir de mañana.",
    });
  }
  else if (hora == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita la hora!",
    });
  }
  else if (h < 8 || h > 20 || (h === 20 && m > 0)) {
    Swal.fire({
      icon: "error",
      title: "Nuestra veterinaria trabaja de 8:00Am a 8:00Pm ",
      text: "Por favor digita una hora que este en nuestro rango de trabajo",
    });
  } else if (tipo_mascota == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor elije el tipo de mascota!",
    });
  }
  else if (descripcion == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor digita la descripcion!",
    });
  } else if (tipo_mascota == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor elige la mascota!",
    });
  } else if (descripcion.length > 400) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor escribe una descripcion menor a 400 caracteres!",
    });
  }
  else {
    validacion = true;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  filter();
});
