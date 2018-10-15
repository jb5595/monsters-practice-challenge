let monsters;
let startingIndex = 0
let newMonsterId;
document.addEventListener('DOMContentLoaded', () => {
  loadMonsters()
  document.querySelector("#forward").addEventListener("click", showNext50)
  document.querySelector("#back").addEventListener("click", showLast50)
  document.querySelector("#create-monster-form").addEventListener("submit",createMonster)
});

function createMonster(event){
  event.preventDefault()
  let url = "http://localhost:3000/monsters"
  let name = event.target.querySelector("#name-input").value
  let age = event.target.querySelector("#age-input").value
  let description = event.target.querySelector("#description-input").value
  let monster={
    "name": name,
    "age": age,
    "description":description
  }
  fetch(url,{
    method: "POST",
    body: JSON.stringify(monster),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }

  })
  .then(response => response.json())
  .then(monster=>monsters.push(monster))

}

function showLast50() {
  if (startingIndex >= 50){
    startingIndex -= 50;
  }
  displayMonsters(startingIndex)
}
function showNext50() {
  startingIndex+=50
  displayMonsters(startingIndex)
}

function loadMonsters(){
  let url = "http://localhost:3000/monsters"
  fetch(url)
  .then(response => response.json())
  .then(function(data){
    monsters = data
    newMonsterId = monsters.length
    displayMonsters(startingIndex)
  })
}

function displayMonsters(index){
  let monstersNode = document.querySelector("#monster-container")
  while (monstersNode.firstChild) {
    monstersNode.firstChild.remove()
  }
  let monstersToDisplay = monsters.slice(index,index+50);
  monstersToDisplay.forEach(function(monster){
    renderMonster(monster)
  })
}

function renderMonster(monster){
  let parentNode = document.querySelector("#monster-container")
  let node = document.createElement("div")
  node.id = `${monster.id}`
  parentNode.appendChild(node)
  node.innerHTML = `<h2>${monster.name}</h2><h4>Age: ${monster.age}</h4><p>Bio: ${monster.description}</p>`
}
