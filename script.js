let allElems = document.querySelectorAll(".elem")
let fullElems = document.querySelectorAll(".fullElems")

allElems.forEach((elem) => {
    // console.log(elem.id)

    elem.addEventListener("click", function () {
        // console.log(fullElems[elem.id])
        fullElems[elem.id].style.display = "block"
    })
})