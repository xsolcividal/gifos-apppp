const apiKey= 'qX6deBhHJOZY8fpougBLUfw5tqKiP72R'
// funcion para cambiar de tema
function dayNight (){
    const btncrearDark = document.getElementById("crear-btn");
    const btntemaDark = document.getElementById("tema-btn");
    const btnDark = document.getElementById("crear-btn");
    const cntSearch = document.getElementById("bus-cont");
    const bodyColor = document.querySelector("body");
    const logoLight = document.getElementById("logo");
    const logoDark = document.getElementById("logo-dark");
    const welcome = document.getElementById("bienvenidos");

    logoLight.style.display = "none";
    logoDark.style.display = "inline"
    btncrearDark.removeAttribute("class");
    btncrearDark.setAttribute("class","crear-dark");
    btntemaDark.removeAttribute("class");
    btntemaDark.setAttribute("class","crear-dark");
    btnDark.removeAttribute("class");
    btnDark.setAttribute("class","crear-dark");
    bodyColor.removeAttribute("class");
    bodyColor.setAttribute("class", "body-dark")
    cntSearch.removeAttribute("class")
    cntSearch.setAttribute("class","bus-dark")
    welcome.removeAttribute("class")
    welcome.setAttribute("class","bienvenidos-dark")
    const drop = document.querySelector(".dropdown-container")
    drop.setAttribute("class","dropdown-container-night");
    const guifos = document.querySelector("")
}
    document.getElementById("btn-night").addEventListener("click",dayNight);    

document.querySelector('#btn-night').addEventListener('click', function(){
    const btnBuscar = document.querySelectorAll('.titulo3');
        for(let i = 0; i < btnBuscar.length; i++) {
            btnBuscar[i].style.color = '#FFFFFF'
            btnBuscar[i].removeAttribute("class")
            btnBuscar[i].setAttribute("class","titulo3-dark")
        }

    const btnVer = document.querySelectorAll('.btn-vermas');
        for(let i = 0; i < btnVer.length; i++) {   
            btnVer[i].style.color = '#FFFFFF' 
            btnVer[i].setAttribute("class","vermas-dark");
    }
    const tituloImg = document.querySelectorAll('.titulo2');
        for(let i = 0; i < tituloImg.length; i++) {   
            tituloImg[i].style.color = '#FFFFFF' 
            tituloImg[i].setAttribute("class","titulo2-dark");
    }
})

document.querySelector('#btn-silver').addEventListener('click', function(){
   document.querySelector("#crear-btn").setAttribute("class","crear")
   document.querySelector("#tema-btn").setAttribute("class","crear")
   document.querySelector("#dropdown-container").setAttribute("class","dropdown-container")
   document.querySelector("#logo").style.display = "block"
   document.querySelector("#logo-dark").style.display = "none"
   document.querySelector("body").setAttribute("class","body")
   document.querySelector("#bienvenidos").setAttribute("class","bienvenidos")
   document.querySelector("#bus-cont").setAttribute("class","bus-cont")
 
   const titulo = document.querySelectorAll('.titulo3-dark');
        for(let i = 0; i < titulo.length; i++) {   
            titulo[i].style.color = '#FFFFFF' 
            titulo[i].removeAttribute("class")
            titulo[i].setAttribute("class","titulo");
        }

    const titulo2 = document.querySelectorAll('.titulo2-dark');
        for(let i = 0; i < titulo2.length; i++) {   
            titulo2[i].style.color = '#FFFFFF' 
            titulo2[i].removeAttribute("class")
            titulo2[i].setAttribute("class","titulo2");
        }    
})
document.querySelector("#crear-btn").addEventListener("click",function(){
    window.location.href = 'subir.html'
})

document.getElementById("dropdown-container").addEventListener("mousemove",function(){
    document.getElementById("menu").setAttribute("class", "menu-show")
})

document.getElementById("dropdown-container").addEventListener("mouseleave",function(){
    document.getElementById("menu").setAttribute("class", "menu-hidden")
})
function hiddenSections (){
    const resultadobusqueda = document.getElementById("resultados-buqueda");
    document.getElementById("sug-id").style.display = "none"
    document.getElementById("gallery-id").style.display = "none"
    document.getElementById("color-id").style.display = "none"
    document.getElementById("tendencias").style.display = "none"
    document.getElementById("resultados-busqueda").style.display = "inline"
}
document.getElementById("btnSearch").addEventListener("click",hiddenSections);



//TEST FUNCTION
const searchInput = document.getElementById("search-input");
        const searchForm = document.getElementById("search-form");
        searchForm.addEventListener('submit',function(e){
            e.preventDefault()
            const keyword = searchInput.value
            search(keyword)
        })
        function search (keyword){
            const apiKey= 'qX6deBhHJOZY8fpougBLUfw5tqKiP72R'
            const path = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=20`
            document.querySelector(".ejemplos-busqueda").style.display = "flex"
            fetch(path).then(function(res){
                return res.json()
            }).then(function(json){
                console.log(json.data[0].images.fixed_width.url);
                const resultsEl = document.getElementById('results')
                let resultsHTML = ''
            json.data.forEach(function(obj){
                console.log(obj);
                const url = obj.images.fixed_width.url;
                const width = obj.images.fixed_width.width;
                const height = obj.images.fixed_width.height;
                const title = obj.title;
                resultsHTML += `<img src="${url}" width="${width}" height="${height}" alt="${title}">`
            })
            resultsEl.innerHTML = resultsHTML; 
        }).catch(function(err){
            console.log(err.message)
        })
}
 
//Funcion para las tendencias de GIPHY
const tendencias = `https://api.giphy.com/v1/gifs/search?q=trending&api_key=${apiKey}&limit=20`;
    fetch(tendencias) 
    .then (response => {
        return response.json();
    })
    .then (data => {
        console.log(data.data[0].images)
        data.data.map(obj => {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.setAttribute("class", "img-trendy")
            let p = document.createElement("p");
            img.src = obj.images.fixed_height.url;
            img.alt = obj.title;
            p.innerHTML = "#" + obj.title;
            p.classList.add("titulo2");
            div.appendChild(img);
            div.appendChild(p);
            document.getElementById("tendencias").appendChild(div);
    });
})
.catch(err => {
    console.log(err);
});
//Funcion para las sugerencias de GIPHY
const sugerencia = `https://api.giphy.com/v1/gifs/search?q=bulldog+frances&api_key=${apiKey}&limit=4`;
    fetch(sugerencia) 
    .then (response => {
        return response.json();
    })
    .then (data => {
        console.log(data.data[0].images)
        data.data.map(obj => {
            const div = document.createElement("div");
            div.setAttribute("class","div-sugerencias")
            const p = document.createElement("p");
            const img = document.createElement("img");
            img.setAttribute("class","img-sugerencias");
            const btn = document.createElement("button");
            const img_close = document.createElement("img");
            img_close.setAttribute("class","img-close");
            img_close.src = "img/button_close.svg"
            btn.setAttribute("class","btn-vermas")
            btn.innerHTML = "Ver más..."
            img.alt = obj.title;
            p.innerHTML = "#" + "frenchie";
            p.classList.add("titulo3");
            img.src = obj.images.fixed_height.url;
            div.append(img_close);
            div.append(btn);
            div.appendChild(p);
            div.appendChild(img);
            document.getElementById("sugerencias").appendChild(div);
    });
})
.catch(err => {
    console.log(err);
});
//Funcion para que aparezca los resultados de busquedas sugeridos cuando presionamos una tecl

function busquedaSugerida (){
    document.querySelector(".sugerido-busqueda").style.display = "flex"
    document.getElementById("btnSearch").removeAttribute("class");
    document.getElementById("btnSearch").setAttribute("class","btn-search-active")
} document.querySelector("#search-input").addEventListener("mousemove",busquedaSugerida)

function busquedaSugerida1 (){
    document.querySelector(".sugerido-busqueda").style.display = "none"
    document.getElementById("btnSearch").removeAttribute("class");
    document.getElementById("btnSearch").setAttribute("class","btn-search   ")
} document.querySelector("#search-input").addEventListener("mouseout",busquedaSugerida1)

document.getElementById("btnSearch").addEventListener("click",function (){
    document.querySelector(".ejemplos-busqueda").style.display = "flex"
})