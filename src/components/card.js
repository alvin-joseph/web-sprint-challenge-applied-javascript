import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div');
  const cardHeadline = document.createElement('div');
  const author = document.createElement('div');
  const container = document.createElement('div');
  const photo = document.createElement('img');
  const name = document.createElement('span');

  card.classList.add('card');
  cardHeadline.classList.add('headline');
  author.classList.add('author');
  container.classList.add('img-container');
  
  cardHeadline.textContent = article.headline;
  photo.src = article.authorPhoto;
  name.textContent = `By ${article.authorName}`;

  card.appendChild(cardHeadline);
  card.appendChild(author);
  author.appendChild(container);
  author.appendChild(name);
  container.appendChild(photo);

  card.addEventListener('click', () => {
    console.log(article.headline);
  })

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios
  .get(`https://lambda-times-api.herokuapp.com/articles`)
  .then((res) => {
    const article = res.data.articles;
    const {javascript, bootstrap, technology, jquery, node} = article
    //console.log('title');
    console.log('res', res);
    
    function makeArticle(name){
      name.forEach(topic => {
        //console.log('topic', topic);
        //console.log(topic.headline);
        const newCard = Card(topic);
        const element = document.querySelector(selector);
        element.appendChild(newCard);
      })
    }
    makeArticle(javascript);
    makeArticle(bootstrap);
    makeArticle(technology);
    makeArticle(jquery);
    makeArticle(node);

  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('done');
  })
}

export { Card, cardAppender }
