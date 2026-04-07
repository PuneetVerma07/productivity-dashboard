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

dailyPlanner();

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

function pomodoroTimer() {
    let timer = document.querySelector(".pomo-timer h1")
    let startBtn = document.querySelector(".pomo-timer .start-timer")
    let pauseBtn = document.querySelector(".pomo-timer .pause-timer")
    let resetBtn = document.querySelector(".pomo-timer .reset-timer")
    let session = document.querySelector(".pomodoro-fullpage .session")

    let totalSeconds = 25 * 60
    let timerInterval = null
    let isWorkSession = true

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60;

        console.log(minutes, seconds)

        timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer();
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = "05:00"
                    session.innerHTML = "Take a Break";
                    session.style.backgroundColor = 'var(--tri)'
                    totalSeconds = 5 * 60;
                }
            }, 1000)
        } else {


            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer();
                } else {
                    isWorkSession = false;
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--pri)'
                    totalSeconds = 25 * 60;
                }
            }, 1000)
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        clearInterval(timerInterval)
        totalSeconds = 25 * 60
        updateTimer();
    }

    startBtn.addEventListener("click", startTimer)
    pauseBtn.addEventListener("click", pauseTimer)
    resetBtn.addEventListener("click", resetTimer)
}

pomodoroTimer();

function weatherFunctionality() {
    
    let city = "agra"

    let header1Time = document.querySelector(".header1 h1")
    let header1Date = document.querySelector(".header1 h2")
    let header2Temp = document.querySelector(".header2 h2")
    let header2Condition = document.querySelector(".header2 h4")
    let heat = document.querySelector(".header2 .heat")
    let humidity = document.querySelector(".header2 .humidity")
    let wind = document.querySelector(".header2 .wind")

    let data = null;

    async function weatherApiCall() {
        let response = await fetch(`https://productivity-dashboard-abp8.onrender.com/weather?city=${city}`)
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        heat.innerHTML = `Heat: ${data.current.heatindex_c}%`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
    }
    weatherApiCall();

    let date = null;

    function timeDate() {
        const totalDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        date = new Date();

        let dayOfWeek = totalDaysOfWeek[date.getDay()]
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let dayDate = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();

        header1Date.innerHTML = `${dayDate} ${month} ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM`
        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM`
        }
    }

    setInterval(
        timeDate, 1000)

}

weatherFunctionality();

function changeTheme() {
    let rootElement = document.documentElement;
    let theme = document.querySelector(".theme")

    let flag = 0;

    theme.addEventListener("click", function () {


        /* --pri: #091413;
        --sec: #285a48;
        --tri: #408a71;
        --frh: #b0e4cc;
        --fth: #fff; */


        if (flag == 0) {
            rootElement.style.setProperty("--pri", "#fff")
            rootElement.style.setProperty("--sec", "#DDF4E7")
            rootElement.style.setProperty("--tri", "#67C090")
            rootElement.style.setProperty("--frh", "#26667F")
            rootElement.style.setProperty("--fth", "#124170")

            flag = 1;

        } else if (flag == 1) {
            rootElement.style.setProperty("--pri", "#fff")
            rootElement.style.setProperty("--sec", "#2C3930")
            rootElement.style.setProperty("--tri", "#3F4F44")
            rootElement.style.setProperty("--frh", "#A27B5C")
            rootElement.style.setProperty("--fth", "#DCD7C9")
            flag = 2;

        } else if (flag == 2) {
            rootElement.style.setProperty("--pri", "#091413")
            rootElement.style.setProperty("--sec", "#285a48")
            rootElement.style.setProperty("--tri", "#408a71")
            rootElement.style.setProperty("--frh", "#b0e4cc")
            rootElement.style.setProperty("--fth", "#fff")
            flag = 0;

        }

    })

}

changeTheme();