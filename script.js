let allElems = document.querySelectorAll(".elem")
let fullElems = document.querySelectorAll(".fullElems")
let fullElemsBackButton = document.querySelectorAll(".fullElems .back")

allElems.forEach((elem) => {
    // console.log(elem.id)

    elem.addEventListener("click", function () {
        // console.log(fullElems[elem.id])
        fullElems[elem.id].style.display = "block"
    })
})

fullElemsBackButton.forEach(function (back) {
    back.addEventListener("click", function () {
        fullElems[back.id].style.display = "none"
    })
})