import { homePageBooksElements } from "../../interfaces.js";
import { serverBaseURL } from "../../config.js";

const {
  bookContainer
} = homePageBooksElements

function loadBookCards() {
  $.ajax({
    url: serverBaseURL + "api/book/all",
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      const jsonResponse = JSON.parse(response);

      if (jsonResponse.status == 200) {
        const books = jsonResponse.data;

        $(books).each(function (i, book) {
          appendBookCard(book);
        });
      }
    },
    error: function () {
      alert("Error");
    }
  });
}

function renderBookCard(book) {
  return `
      <article class="card ${book.category.toLowerCase()}">
        <img class="card__background" src="${book.img_url}" alt="" />
        <div class="card__content | flow">
          <div class="card__content--container | flow">
            <h2 class="card__title">${book.title}</h2>
            <p class="card__description">
              <span><b>Author:</b> ${book.author_firstname} ${book.author_lastname}</span>
              <span><b>Category:</b> ${book.category}</span>
              <span><b>Pages:</b> ${book.pages_number}</span>
            </p>
          </div>
          <a href="book.php?book=${book.book_id}" class="card__button">view more</a>
        </div>
      </article>
    `;
}

function appendBookCard(book) {
  const card = renderBookCard(book);
  bookContainer.append(card);
}


export const bookCardFunctions = {
  renderBookCard: renderBookCard,
  appendBookCard: appendBookCard,
  loadBookCards: loadBookCards
};