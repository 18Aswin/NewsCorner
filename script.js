const API_KEY = "a75346b9d354495da6f58b565d33a6a1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("all"));

function reload() {
 window.location.reload();
}

async function fetchNews(query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) {
 const cardsContainer = document.getElementById('cards-container');
 const newsCardTemplate = document.getElementById('news-card');

 cardsContainer.innerHTML = '';

 articles.forEach(article => {
  if(!article.urlToImage) return;
  const cardClone = newsCardTemplate.content.cloneNode(true);
  fillData(cardClone, article);
  cardsContainer.appendChild(cardClone);
 });
}

function fillData(cardClone, article) {
 const newsImage = cardClone.querySelector('#news-img');
 const newsTitle = cardClone.querySelector('#title');
 const newsSource = cardClone.querySelector('#source');
 const newsDescription = cardClone.querySelector('#description');

 newsImage.src = article.urlToImage;
 newsTitle.innerHTML= article.title;
 newsDescription.innerHTML= article.description;

 const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

 newsSource.innerHTML = `${article.source.name} • ${date}`;

 cardClone.firstElementChild.addEventListener('click', () =>{
  window.open(article.url, "_blank");
 })
}

let currentSelectedNav = null;

function onNavItemClick(id) {
 fetchNews(id);
 const navItem = document.getElementById(id);
 currentSelectedNav?.classList.remove('active');
 currentSelectedNav = navItem;
 currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const input = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
 const query = input.value;
 if(!query) return;
 fetchNews(query);
 currentSelectedNav?.classList.remove('active');
 currentSelectedNav = null;
})