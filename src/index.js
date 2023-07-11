let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newForm = document.querySelector('.add-toy-form');
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => createToyCollectionCards(json));
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  newForm.addEventListener('submit', handleNewToy);
});

function createToyCollectionCards(toysList) {
  toysList.forEach(element => createOneToyCard(element));
}

function createOneToyCard(element) {
  const toyCollection = document.getElementById('toy-collection');
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  toyCollection.appendChild(card);
  const h2 = document.createElement('h2');
  h2.innerText = element.name;
  const img = document.createElement('img');
  img.setAttribute('src', element.image);
  img.setAttribute('class', 'toy-avatar');
  const p = document.createElement('p');
  p.innerText = element.likes;
  const button = document.createElement('button');
  button.setAttribute('class', 'like-btn');
  button.setAttribute('id', element.id);
  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);
  button.addEventListener('click', handleLike);
}

function handleLike(event) {
  const button = event.target;
  const likes = event.target.parentNode.querySelector('p');
  const json = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "likes": parseInt(likes.innerText) + 1,
    }),
  }
  fetch(`http://localhost:3000/toys/${button.id}`, json)
  .then(res => res.json())
  .then(json => likes.innerText = json.likes);
}

function handleNewToy(entry) {
  entry.preventDefault();
  const name = entry.target.querySelector('[name="name"]');
  const image = entry.target.querySelector('[name="image"]');
  const newToyData = {
    "name": name.value,
    "image": image.value,
    "likes": 0,
  };
  const newToyRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newToyData),
  };
  fetch('http://localhost:3000/toys', newToyRequest)
  .then(res => res.json())
  .then(json => createOneToyCard(json));
  entry.target.reset();
}