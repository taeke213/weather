let container = document.getElementById("container")
let form = document.querySelector("form")
let statusdiv = document.getElementById("data")
let clicked = false
function saveData(projects){
    localStorage.setItem("projects", JSON.stringify(projects))
}
function loadData(){
    let storeddata = localStorage.getItem("projects")
    if(storeddata){
        return JSON.parse(storeddata)
    }
    return null
}
function removeData(){
    localStorage.removeItem("projects")
}
function checkData(){
    return localStorage.getItem("projects") !== null 
}
let projects = loadData ()
if(projects != null){
    projects.forEach(element => {
        getData(element)
        console.log(element)
    });
}
if(projects === null){
    projects = []
}
form.addEventListener(("keydown"), () => {
    statusdiv.textContent = ""
})


form.addEventListener(("submit"), (e) => {
    e.preventDefault()
    statusdiv.textContent = ""
    let cityname = form.querySelector("input")
    let valide = validate(cityname.value)
    console.log(cityname.value)
    if(cityname.value != "" && cityname.value != " " && clicked != true && valide == true){
            getData(cityname.value)
            console.log(cityname.value)
            projects.push(cityname.value)
            saveData(projects)
            form.reset()
            
    
    }
})
function validate(x){
    let fin = false
    let count = 0
    let status
    if(projects.length !== 0){
    projects.forEach(y => {
        if(x == y){
            fin = true
            status = false
            statusdiv.textContent = "name is already added"
        }
        if(fin != true && x != y){
            count += 1
        }
        if(count == projects.length){
            status = true
        }
})}
if(projects.length === 0){
    status = true
}
return status
}

async function getData(x){
    statusdiv.textContent = "loading..."
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${x}?unitGroup=metric&key=ZP3K924SGH53FZSYFGNM6JLUG&contentType=json`, {mode:"cors"})
    console.log(response)
    if(!response.ok){
        statusdiv.textContent = "invalid placename"
    }
    if(response.ok){
    response = await response.json()
    showData(response)
    }

}
function showData(data){
    console.log(data)
    let newblock = document.createElement("div")
    newblock.classList.add("weather")
    let weathername = document.createElement("h3")
    let name1 = data.resolvedAddress.split(",")
    weathername.textContent = name1[0]
    let namedesc = document.createElement("p")
    if(name1[1] != undefined && name1[2] != undefined){
        namedesc.textContent = `${name1[1]}, ${name1[2]}`
    }
    namedesc.classList.add("desc")
    let temp = document.createElement("p")
    temp.classList.add("temp")
    temp.textContent = `${data.currentConditions.temp}°C`

    let newblockbg = document.createElement("div")
    newblockbg.classList.add("bg")
    let bg = showBackground(data.currentConditions.conditions)
    newblockbg.style.backgroundImage = `url(${bg})`
    let info = document.createElement("div")
    info.classList.add("info")
    let raindiv = document.createElement("div")
    raindiv.classList.add("raindiv")
    raindiv.textContent = data.currentConditions.precipprob
    info.appendChild(raindiv)
    let poep = document.createElement("div")
    poep.innerHTML = "delete"
    poep.classList.add("material-symbols-outlined")
    poep.style.fontSize = "6vh"
    poep.addEventListener(("click"), (x) => {
        removeItem(x, newblockbg)
    })
    let infobut = document.createElement("button")
    infobut.textContent = "more"
    let infodiv = document.createElement("div")
    infodiv.classList.add("infodiv")

    let nextdays = document.createElement("table")
    let row1 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1 && x != 0){
        let y = document.createElement("th")
        let m = data.days[x].datetime
        let q = m.split("-")
        let v = `${q[2]}-${q[1]}`
        y.textContent = v
        row1.appendChild(y)}
        else if(x == -1){
            let y = document.createElement("th")
            y.textContent = "info"
            row1.appendChild(y)
        }
        else if(x == 0){
            let y = document.createElement("th")
            y.textContent = "today"
            row1.appendChild(y)
        }
    }

    let row2 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
        let y = document.createElement("td")
        y.textContent = data.days[x].temp
        row2.appendChild(y)}
        else{
        let y = document.createElement("td")
        y.textContent = "temperature"
        row2.appendChild(y)
        }
    }
    let row3 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
        let y = document.createElement("td")
        y.textContent = data.days[x].precipprob
        row3.appendChild(y)}
        else{
        let y = document.createElement("td")
        y.textContent = "rain chance"
        row3.appendChild(y)
        }
    }
    let row4 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
            let y = document.createElement("td")
            y.textContent = data.days[x].uvindex
            row4.appendChild(y)}
            else{
            let y = document.createElement("td")
            y.textContent = "uv-index"
            row4.appendChild(y)
            }
        }
    let row5 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
            let y = document.createElement("td")
            y.textContent = data.days[x].humidity
            row5.appendChild(y)}
            else{
            let y = document.createElement("td")
            y.textContent = "humidity"
            row5.appendChild(y)
            }
        }
    let row6 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
            let y = document.createElement("td")
            y.textContent = data.days[x].windspeed
            row6.appendChild(y)}
            else{
            let y = document.createElement("td")
            y.textContent = "wind speed"
            row6.appendChild(y)
            }
        }
    let row7 = document.createElement("tr")
    for(let x = -1;x < 7; x++){
        if(x != -1){
            let y = document.createElement("td")
            y.textContent = data.days[x].snow
            row7.appendChild(y)}
            else{
            let y = document.createElement("td")
            y.textContent = "chance of snow"
            row7.appendChild(y)
            }
        }

    nextdays.appendChild(row1)
    nextdays.appendChild(row2)
    nextdays.appendChild(row3)
    nextdays.appendChild(row4)
    nextdays.appendChild(row5)
    nextdays.appendChild(row6)
    nextdays.appendChild(row7)
    infodiv.appendChild(nextdays)
    
    infobut.addEventListener(("click"), () => {
        if(!clicked){
            infodiv.style.display = "grid"
            clicked = true
        }
        
    })
    let closebut = document.createElement("button")
    closebut.innerHTML = "X"
    closebut.classList.add("closebut")
    closebut.addEventListener(("click"), () => {
        infodiv.style.display = "none"
        clicked = false
    })

    infodiv.appendChild(closebut)
    document.body.appendChild(infodiv)


    info.appendChild(infobut)
    info.appendChild(poep)


    newblock.appendChild(weathername)
    newblock.appendChild(namedesc)
    newblock.appendChild(temp)
    newblock.appendChild(info)


    newblockbg.appendChild(newblock)
    container.appendChild(newblockbg)
    statusdiv.textContent = ""
}
function removeItem(x, y){
    projects.splice(x.target, 1)
    container.removeChild(y)
    saveData(projects)
}

function showBackground(weatherstatus){
    let url
    let weather = weatherstatus.split(",")
    switch(weather[0]){
        case("Clear"):
            url = "https://images.photowall.com/products/44478/sunny-sky.jpg?h=699&q=85"
            return url
        case("Partially cloudy"):
            url = "https://www.louisdallaraphotography.com/wp-content/uploads/2019/11/clouds-photo-6119.jpg"
            return url
        case("Overcast"):
            url = "https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg?w=900"
            return url
        case("Rain"):
            url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfVPKfavNg0XN1auTeDk66xvTc1nVE3Wdf_g&s"
            return url
        case("Snow"):
            url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrLIsVCo98vupQQ_DHUHcqeEYUcEcrgXf_EA&s"
            return url    
    }
}