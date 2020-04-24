const container = document.querySelector("div.container")
const virus = [
  { name: "VirusPic", image: "images/virus.jpg" },
]

// const showVirus = () => {
//   let output = ""
//   virus.forEach(
//     ({ name, image }) =>
//       (output += `
//               <div class="card">
//                 <img class="card--avatar" src=${image} />
//                 <h1 class="card--title">${name}</h1>
//                 <a class="card--link" href="#">Taste</a>
//               </div>
//               `)
//   )
//   container.innerHTML = output
// }

// document.addEventListener("DOMContentLoaded", showVirus)

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker
//       .register("/serviceWorker.js")
//       .then(res => console.log("service worker registered"))
//       .catch(err => console.log("service worker not registered", err))
//   })
// }