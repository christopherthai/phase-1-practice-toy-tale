let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection');
  const url = "http://localhost:3000/toys"
  
  
  //Increae the toy's like after clicking the like button
const likes = (toy, event) => {

  console.log(toy.likes)
  let morelikes = toy.likes + 1
  console.log(morelikes)

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": morelikes
    })
  })
  .then((response) => response.json())
  .then((likeObject) => {
    event.target.previousElementSibling.innerText = `${likeObject.likes} likes`
  })
}
  
  const addToysOnPage = (toy) => {

    let toyCard = document.createElement('div')
    let toyName = document.createElement('h2')
    let toyImage = document.createElement('img')
    let toyLikes = document.createElement('p')
    let toyButton = document.createElement('button')

    toyCard.classList = "card"
    toyName.textContent = toy.name
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    toyLikes.textContent = `${toy.likes} likes`
    toyButton.textContent = "like"
    toyButton.className = "like-btn"
    toyButton.id = toy.id

    toyButton.addEventListener('click', (event) => {
      event.preventDefault()
      likes(toy, event)
    })

    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(toyButton)

    toyCollection.append(toyCard)

  }

  // Add new toy onto the page
const addNewToy = (toyData) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0,
    })
  })
  .then((response) => response.json())
  .then((toyObject) => {
      addToysOnPage(toyObject)
  })
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
      // Add new toy onto the page
      toyFormContainer.addEventListener('submit', (event) => {
      event.preventDefault()
      addNewToy(event.target)
})
  } else {
    toyFormContainer.style.display = "none";
  }
});

  // Render the toys onto the page
  fetch(url)
  .then((response) => response.json())
  .then((toyObject) => {
    toyObject.forEach((toy) => {
      addToysOnPage(toy)
    })
 })
    

})