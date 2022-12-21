const ciudades = ["madrid", "buenos aires", "lagos", "niamey", "asuncion"];
let boton = document.getElementById("back");
ciudades.forEach(function(ciudad){
// console.log('estoy en' + ciudad);
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=b97b941f84d28b8e2cc8d2e4f3c2c136`).then(response => response.json()).then(result => weatherDetails(result));
function weatherDetails (info){
    console.log(info);
    let lugar = info.name;
    let {description, id} = info.weather[0];
    let {temp} = info.main;
    let nombre = document.createElement("p");
    nombre.classList.add('ciudad');
    let normalizedTemp
    normalizar();
    function normalizar() {
        if (temp < 20){normalizedTemp = 0;}
        else {normalizedTemp = ((temp-20)/20)*1000;}
    }
    console.log(normalizedTemp);
    nombre.style.setProperty('--melt', normalizedTemp);
    let tiempo = document.createElement("p");
    tiempo.classList.add('descripcion');
    let temperatura = document.createElement("p");
    temperatura.classList.add('grados');
    nombre.innerHTML= `${lugar}`;
    tiempo.innerHTML = description;
    temperatura.innerHTML = `${temp}&#176;`;
    const wrapper = document.getElementById("wrapper");
    let contenedor = document.createElement("div");
    contenedor.classList.add('ciudades');
    contenedor.appendChild(nombre);
    contenedor.appendChild(tiempo);
    contenedor.appendChild(temperatura);
    wrapper.appendChild(contenedor);
}
});
let userInput = document.getElementById("buscador");

let errorMensaje = document.getElementById("infomsg");
userInput.addEventListener("keyup", e => {
    let ciudadBuscador = userInput.value
    if(e.key == "Enter" && userInput.value != ""){
        
        console.log(ciudadBuscador);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudadBuscador}&units=metric&appid=b97b941f84d28b8e2cc8d2e4f3c2c136`).then(response => response.json()).then(result => weatherDetalle(result));
function weatherDetalle (data){
if(data.cod == "404"){
errorMensaje.innerHTML="Please, enter a valid city name";
}else{
    
    boton.classList.remove("hide");
    boton.classList.add("show");
    errorMensaje.innerHTML="";
    document.getElementById("wrapper").style.display = "none"; 
    let lugar = data.name;
    let {main} = data.weather[0];
    let {description, id} = data.weather[0];
    let {temp} = data.main;
    let {feels_like} = data.main;
    let {humidity} = data.main;
    let {pressure} = data.main;
    let {speed} = data.wind;
    let normalizedTempII;
    normalizarII();
    function normalizarII() {
        if (temp < 20){normalizedTempII = 0;}
        else {normalizedTempII = ((temp-20)/20)*1000;}
    }
    console.log(normalizedTempII);
    let titulo = document.getElementById("ciudad");
    let pais = document.getElementById("pais");
    let gradosDet = document.getElementById("gradosdet");
    let tiempoDet = document.getElementById("tiempodet");
    let humedad = document.getElementById("humedad");
    let feelslike = document.getElementById("feelslike");
    let presion = document.getElementById("presion");
    let velocidad = document.getElementById("viento");
    let pictograma = document.getElementById("picto");
    tiempoDet.innerHTML = description;
    gradosDet.innerHTML = `${temp}&#176;`;
    titulo.innerHTML = lugar;
    titulo.style.setProperty('--melt', normalizedTempII);
    feelslike.innerHTML = `Feels like: ${feels_like}&#176;`;
    presion.innerHTML = `Pressure: ${pressure}hPa`;
    humedad.innerHTML = `Humidity: ${humidity}%`;
    velocidad.innerHTML = `Wind speed: ${speed} km/h`;
    console.log(main);
    if (main == "Clear"){
        pictograma.src="imgs/clear.png"
    }
    else if (main == "Rain"){
        pictograma.src="imgs/rain.png"
    }
    else if (main == "Thunderstorm"){
        pictograma.src="imgs/strom.png"
    }
    else if (main == "Clouds"){
        pictograma.src="imgs/clouds.png"
    }
}}
    }
})
boton.addEventListener("click", volver);
function volver(){
    document.getElementById("wrapper").style.display = "block";
    let titulo = document.getElementById("ciudad");
    let pais = document.getElementById("pais");
    let gradosDet = document.getElementById("gradosdet");
    let tiempoDet = document.getElementById("tiempodet");
    let humedad = document.getElementById("humedad");
    let feelslike = document.getElementById("feelslike");
    let presion = document.getElementById("presion");
    let velocidad = document.getElementById("viento");
    let pictograma = document.getElementById("picto");
    tiempoDet.innerHTML = "";
    gradosDet.innerHTML = "";
    titulo.innerHTML = "";
    feelslike.innerHTML = "";
    presion.innerHTML = "";
    humedad.innerHTML = "";
    pictograma.src = "";
    velocidad.innerHTML = "";
    boton.classList.remove("show");
    boton.classList.add("hide");
}
