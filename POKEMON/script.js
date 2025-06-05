document.addEventListener("DOMContentLoaded", async () => {
  let random = Math.floor(Math.random() * (400 - 1 + 1) + 1);
  let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + random)
  let urld = await axios.get(res.data.types[0].type.url)
  const coloresTipos = [
    { tipo: "normal", color: "#A8A878" },
    { tipo: "fire", color: "#F08030" },
    { tipo: "water", color: "#6890F0" },
    { tipo: "electric", color: "#F8D030" },
    { tipo: "grass", color: "#78C850" },
    { tipo: "ice", color: "#98D8D8" },
    { tipo: "fighting", color: "#C03028" },
    { tipo: "poison", color: "#A040A0" },
    { tipo: "ground", color: "#E0C068" },
    { tipo: "flying", color: "#A890F0" },
    { tipo: "psychic", color: "#F85888" },
    { tipo: "bug", color: "#A8B820" },
    { tipo: "rock", color: "#B8A038" },
    { tipo: "ghost", color: "#705898" },
    { tipo: "dragon", color: "#7038F8" },
    { tipo: "dark", color: "#705848" },
    { tipo: "steel", color: "#B8B8D0" },
    { tipo: "fairy", color: "#EE99AC" }
  ];

  console.log(urld);
  console.log(res);

  document.getElementById("nombre").textContent = res.data.name
  document.getElementById("img").src = res.data.sprites.other.dream_world.front_default;
  document.getElementById("img3").src = res.data.sprites.other.showdown.front_default;
  document.getElementById("img4").src = res.data.sprites.other.showdown.front_default;
  document.getElementById("altura").textContent = "Altura:" + res.data.height + "m"
  document.getElementById("peso").textContent = "Peso:" + res.data.weight + "kg"
  let hijo1 = document.getElementById("img")
  let tipo1 = res.data.types;
  let alma_color = [];


  tipo1.forEach((item1, i) => {
    let nuevo_color = coloresTipos.find((colores) => {
      return colores.tipo == item1.type.name
    })
    alma_color.push(nuevo_color.color)
    document.getElementById("tipos").innerHTML += `
                    <button  id="boton"  style="background-color: ${nuevo_color.color};">${item1.type.name}</button>
                `
  })

  if (alma_color.length >= 2) {
    hijo1.style = `  background: linear-gradient(to bottom right, ${alma_color[0]}, ${alma_color[1]});`
  } else {
    hijo1.style = `background-color:${alma_color[0]};>`
  }


  let color_nume = alma_color[0]
  document.getElementById("numero").innerHTML = `
  <h1 style="color: ${color_nume};">#${random}</h1>
`

document.getElementById("info1").style.borderColor = color_nume;
document.getElementById("hijo").style.borderColor=color_nume;

  urld.data.damage_relations.double_damage_from.forEach((item2, i) => {
    let color_debi = coloresTipos.find((colores1) => {
      return colores1.tipo == item2.name
    })
    alma_color.push(color_debi.color)
    document.getElementById("debilidad").innerHTML += `
   <button id="boton" style="background-color: ${color_debi.color};">${item2.name}  </button>
   `
  })

  let color_bar = alma_color[0];
  res.data.stats.forEach((element, i) => {
    let nombre = element.stat.name;
    let valor = element.base_stat;
    const porcentaje = (valor / 255) * 100;


    document.getElementById("Estadisticas").innerHTML += `
        <div class="estadisticas">
         <div class="valores">${nombre}  : ${valor}/255</div>
      <div class="barra">
        <div class="color_barra" style="width: ${porcentaje}%; background-color: ${color_bar};"></div>
      </div>
        </div>
`
  })

})





