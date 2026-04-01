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

// todoList()

function dailyPlanner() {
    let dayPlanner = document.querySelector(".day-planner")

    let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {}


    let hours = Array.from({ length: 18 }, function (elem, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })

    let wholeDaySum = ''

    hours.forEach((elem, idx) => {

        let savedData = dayPlanData[idx] || ''
        wholeDaySum += `<div class="day-planner-time">
						<p>${elem}</p>
						<input id=${idx} type="text" placeholder="..." value=${savedData}>
					</div>`
    })



    dayPlanner.innerHTML = wholeDaySum

    let dayPlannerInput = document.querySelectorAll(".day-planner input")

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value

            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData))
        })
    })
}

// dailyPlanner();

function motivationalQuote() {
    let motivationQuoteContent = document.querySelector(".motivation-2 h1")
    let motivationAuthor = document.querySelector(".motivation-3 h2")


    async function fetchQuote() {
        let response = await fetch("http://api.quotable.io/random")
        let data = await response.json();

        /* console.log(data.content)
        console.log(data.author)
 */
        motivationQuoteContent.innerHTML = data.content
        motivationAuthor.innerHTML = ` ~ ${data.author}`

    }

    fetchQuote();
}

motivationalQuote();