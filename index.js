


const colorModeBtn = document.getElementById("color-mode-button")
let colorModeBtnTxt = document.querySelector("#color-mode-button p")
const getColorBtn = document.getElementById("get-color-button")
const listItem = document.getElementById("sub-menus")
let colorInput = document.getElementById("color-input")
const colorsResult = document.getElementById("colors-result")


// console.log(copyTxt)
getcolor("ffffff","monochrome")

colorInput.value = "#ffffff"
let colorMode = "monochrome"
// drop down menu function to close/open and select
function openCloseDropDown(){
    if (listItem.classList.contains("clicked")) {
        listItem.classList.remove("clicked");
        listItem.classList.add("unclicked");

    } else {
        listItem.classList.remove("unclicked");
        listItem.classList.add("clicked");
    }
}

document.addEventListener("click",(e)=>{
    if(colorModeBtn === e.target.offsetParent || colorModeBtn === e.target ) {
        openCloseDropDown()
        listItem.addEventListener("click", (e)=>{
           colorModeBtnTxt.textContent = e.target.innerText
            colorModeBtnTxt.style.color = "black"
            colorMode = e.target.innerText
            openCloseDropDown()

        })


    }
    else if ((colorModeBtn != e.target.offsetParent) && listItem.classList.contains("clicked")){
        listItem.classList.remove("clicked");
        listItem.classList.add("unclicked");}
} )


// get the scheme button handler
getColorBtn.addEventListener("click", ()=>{
    let color = colorInput.value.slice(1)
    colorMode = colorModeBtnTxt.textContent
    getcolor(color,colorMode)
})



// function get colors
function getcolor(color,colorMode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorMode.toLowerCase()}&count=4`)
        .then(res => res.json())
        .then(data => {
            let colorArray = [color]
            data.colors.forEach((element) => {
                colorArray.push(element.hex.value)
            })

            showColorsHtml(colorArray)
            setCopyTxtContrast(data)

        })

}

// function show colors to DOM
function showColorsHtml(colorArray) {
    colorsResult.innerHTML = ""

    for ( let i=0 ;i<colorArray.length; i++){
        colorsResult.innerHTML += `<div class="color">
                <div class="color backgroundcolor" style= "background-color: ${colorArray[i]}" id="color-${i}"></div>
                <p class="copy hidden"><i class="fa-solid fa-copy"></i>copy</p>
                <p class="color-code">${colorArray[i]}</p>
            </div>`


    }
}

// set txt copy color (should be white or black based on the background color!)
function setCopyTxtContrast(data) {
    let contrastArray = [data.seed.contrast.value]
    data.colors.forEach((e)=>{
        contrastArray.push(e.contrast.value)

    })
    let copyTxt = document.querySelectorAll(".copy")
    for(let i=0; i<contrastArray.length;i++){
        copyTxt[i].style.color = contrastArray[i]
    }
}




// copy to clipboard

const clipboardAlertTxt = document.querySelector(".alert")
document.addEventListener("click",(e)=>{

 if (e.target.classList.contains("color") && e.target.style.backgroundColor){
     // let targetColor = document.querySelector(".color")
     console.log(e.target.attributes[0].nodeValue)
     navigator.clipboard.writeText(rgbToHex(e.target.style.backgroundColor));
     clipboardAlertTxt.classList.remove("hidden")
     clipboardAlertTxt.classList.add("fadeOut")
     setTimeout(()=>{
         clipboardAlertTxt.classList.remove("fadeOut")
         clipboardAlertTxt.classList.add("hidden")

     },1000)

 }

}

)


// rgb to HEX convert | clipboard just copy rgb mode of color so it's need to be change to hex

function rgbToHex(rgb) {
    // Convert the RGB value to an array of integers
    const rgbArray = rgb.match(/\d+/g).map(Number);

    // Convert each integer to its equivalent hex value
    const hexArray = rgbArray.map((num) => {
        const hex = num.toString(16);
        return hex.length === 1 ? "0" + hex : hex; // Add leading zero if necessary
    });

    // Combine the hex values into a single string with "#" prefix
    return "#" + hexArray.join("");
}














