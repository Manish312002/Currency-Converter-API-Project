const base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
    updateExchange();
})

for(let select of dropdown){
    for(code in countryList){
        let currOption = document.createElement("option");
        currOption.innerText = code;
        currOption.values = code; 
        if(select.name === "from" && code === "USD"){
            currOption.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            currOption.selected = "selected";
        }
        select.append(currOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let code = element.value;
    let countryCode = countryList[code];
    // console.log(countryCode)
    let newSCR = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSCR;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchange();
})

let updateExchange = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate)
    let finalAmt = amtVal * rate 
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}