function openFeatures() {
    let allElems = document.querySelectorAll(".elem")
    let fullElemsPage = document.querySelectorAll(".fullElems")
    let fullElemsPageBackButton = document.querySelectorAll(".fullElems .back")

    allElems.forEach((elem) => {
        // console.log(elem.id)

        elem.addEventListener("click", function () {
            // console.log(fullElems[elem.id])
            fullElemsPage[elem.id].style.display = "block"
        })
    })

    fullElemsPageBackButton.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElemsPage[back.id].style.display = "none"
        })
    })
}

// openFeatures()

let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form input")
let taskDetailsInput = document.querySelector(".addTask form textarea")

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    console.log(taskInput.value, taskDetailsInput.value)
})