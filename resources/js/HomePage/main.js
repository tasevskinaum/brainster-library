import { filterBookElements } from "../interfaces.js";
import { bookCardFunctions } from "./BookCard/book_card.js";
import { bookFilterFunctions } from "./BookFilter/book_filter.js";

const {
    filterBookBtn,
    faAngleDown,
    filterChkeckboxes
} = filterBookElements

const {
    fillBookFilter
} = bookFilterFunctions

const {
    loadBookCards
} = bookCardFunctions;

// initial
loadBookCards();
fillBookFilter();

filterBookBtn.click(function () {
    faAngleDown.toggleClass('rotate');
    filterChkeckboxes.slideToggle();
});
