let infoArr = localStorage.getItem('comment')? JSON.parse(localStorage.getItem('comment')) : []
let comDiv = document.querySelector('#comment-container')
let inp = document.querySelector('#user-name')
let com = document.querySelector('#com')

function getComs(){
    let date = new Date()
    let month = date.getMonth()+1
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(month.toString().length == 1)month = '0' + month;
    if(hours.toString().length == 1)hours = '0' + hours;
    if(minutes.toString().length == 1)minutes = '0' + minutes;

    let comDate =  `${date.getDate()}/${month}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`
    infoArr.push({name: inp.value, date: comDate, text: com.value})
}

function addInfo(){
    getComs()
    if(infoArr[infoArr.length-1].name && infoArr[infoArr.length-1].text){
        localStorage.setItem('comment', `${JSON.stringify(infoArr)}`)
        inp.value = ''
        com.value = ''
        showInfo()
    }else infoArr.pop()
}

let btn = document.querySelector('#btn-add')
btn.addEventListener('click', addInfo)

function showInfo(){
    let div = document.createElement('div')
    let info = JSON.parse(localStorage.getItem('comment'))
    let currentVal = info[info.length - 1]

    div.classList.add('div-com')
    div.innerHTML = `
        <p>${currentVal.name} <em>${currentVal.date}</em></p>
        <hr>
        <div class="your-com"> ${currentVal.text}</div>
    `
    comDiv.appendChild(div)
}


window.addEventListener('load', (event) => {
    if(localStorage.length !== 0){
        infoArr = JSON.parse(localStorage.getItem('comment'));
        getComs();
        if(!(infoArr[infoArr.length-1].name) && !(infoArr[infoArr.length-1].text))infoArr.pop();
        (function(){
            let info = JSON.parse(localStorage.getItem('comment'))
            for(let com in info){
                let div = document.createElement('div')
                div.classList.add('div-com')
                let currentVal = info[com]

                div.innerHTML = `
                    <p>${currentVal.name} <em>${currentVal.date}</em></p>
                    <hr>
                    <div class="your-com"> ${currentVal.text}</div>
                `
                comDiv.appendChild(div)
                }
        })()
    }
});
