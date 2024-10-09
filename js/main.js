

// document.addEventListener('DOMContentLoaded', function() {
//     const yearElement = document.getElementById('year')
//     const currentYear = new Date().getFullYear()
//     yearElement.textContent = currentYear
//     })
// makeRequest("js/missionList.json")

// function makeRequest(url) {
//     fetch(url).then(response => {
//         return response.json()
//     }).then (data => {
//         console.log(data)
//         loadJSONMissions(data)
//     }).catch( e => {
//         console.log("Error loading", url)
//     })


// function loadJSONMissions(stringData) {
//     jsonDoc = new DOMParser().parseFromString(stringData, "application")
// }
// }

// let missionsArray = []

// fetch("js/missionList.json").then(response => {
//     return response.json()
// }).then(data => {
//     console.log(data)

//     let missionList = document.getElementById("mission-list")

//     for(let i = 0; i < data.missions.length; i++) {
//         missionsArray.push(data.missions[i])
//         let li = document.createElement("li")
//         li.textContent = data.missions[i].name + " - " + data.missions[i].aboutMission
//         missionList.appendChild(li)
//     }
//     // console.log(missionsArray)
// })


// for(let i = 0; i < missionsArray.length; i++) {

//     let li = document.createElement(li)
//     li.textContent = missionsArray[i].name + " - " + missionsArray[i].missionDate
//     missionList.appendChild(li)
//     console.log("added ", missionsArray[i].id)
// }

