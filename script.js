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

openFeatures()

function todoList() {
    let form = document.querySelector(".addTask form")
    let taskInput = document.querySelector(".addTask form input")
    let taskDetailsInput = document.querySelector(".addTask form textarea")
    let taskCheckbox = document.querySelector(".addTask form #check")

    let currentTask = []

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"))
    } else {
        console.log("task list is empty");


    }

    function renderTask() {
        localStorage.setItem("currentTask", JSON.stringify(currentTask))

        let allTask = document.querySelector(".allTask")

        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
							<h5>${elem.title} <span class=${elem.imp}>imp</span></h5>
                            <details>${elem.description}</details>
							<button id=${idx}>Mark as done</button>
						</div>`
        })

        allTask.innerHTML = sum

        document.querySelectorAll(".task button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentTask.splice(btn.id, 1)

                renderTask()

            })
        })
    }

    renderTask()

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log(taskInput.value, taskDetailsInput.value)
        console.log(taskCheckbox.checked)

        currentTask.push(
            {
                title: taskInput.value,
                description: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask();
        

        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckbox.checked = false
    })

    



}

todoList()