const next = document.getElementById("btn-next")
const prev = document.getElementById("btn-prev")
const dot = document.querySelectorAll(".dot")
const span = document.getElementById("span")
let img = document.getElementById("im")
const pro = document.querySelector(".produser")
const director = document.querySelector(".director")
const age = document.querySelector(".age")
const time = document.querySelector(".time")
let da
let index = 0
let mainDiv = document.querySelector(".slideWrpp")

const but = document.getElementById("but")
const url =  "https://ghibliapi.herokuapp.com/films"

async function getData(){
    let data = []
    try{
        const res = await fetch(url)
        data = await res.json()
        console.log(data)
        da = data
    }catch{
        
    }
    for(let i = 0;i<data.length;i++){
        let div = document.createElement('div')
        if(i === 0){
            div.className = "slide activ"
        }else{
            div.className = "slide"
        }
        let img = document.createElement("img")
        img.className = "img"
        img.src = data[i].image
        div.append(img)
        mainDiv.append(div)

    } 
}
getData()

// fetch(url)
//     .then((res) => res.json())
//     .then((data) =>{
//         console.log(data)
//         for(let i = 0;i<data.length;i++){
//             let div = document.createElement('div')
//             if(i === 0){
//                 div.className = "slide activ"
//             }else{
//                 div.className = "slide"
//             }
//             let img = document.createElement("img")
//             img.className = "img"
//             img.src = data[i].image
//             div.append(img)
//             mainDiv.append(div)

//         }
//     })
const slide = document.getElementsByClassName("slide")
console.log(slide)
function nextslide(i){
    for(s of slide){
        s.classList.remove("activ")
    }
    pro.textContent = `Producer : ${da[i].producer}`
    director.textContent = `Director : ${da[i].director}`
    age.textContent = `Release date : ${da[i].release_date}`
    time.textContent = `Running Time : ${da[i].running_time} min`
    slide[i].classList.add("activ")
}
dot[0].addEventListener("click",function(){
    index--
    if(index === -1){
        index = slide.length - 1
    }
    nextslide(index)
})
dot[2].addEventListener("click",function(){
    index++
    if(index === slide.length - 1){
        index = 0
    }
    nextslide(index)
})
next.addEventListener("click",function(){
    if(int !== false){
        clearInterval(int)
    }
    if(slide.length-1 === index){
        index = -1
    }
    index++
    nextslide(index)
    if(int !== false){
        int = setInterval(function(){
            if(index === slide.length -1){
                index = -1
            }
            index++
            nextslide(index)
        },10000)
    }
})
prev.addEventListener("click",function(){
    if(int !== false){
        clearInterval(int)
    }
    if(0 === index){
        index = slide.length
    }
    index--
    nextslide(index)
})
let int = setInterval(function(){
    if(index === slide.length -1){
        index = -1
    }
    index++
    nextslide(index)
},10000)

span.addEventListener("click",function(){
    if(int === false){
        img.src = "stop.png"
        int = setInterval(function(){
            if(index === slide.length -1){
                index = -1
            }
            index++
            nextslide(index)
        },10000)
    }else{
        img.src = "play.png"
        clearTimeout(int)
        int = false
        
    }
})
