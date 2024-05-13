import { bookElements, authorElements, categoryElements } from "../interfaces.js";
import { functions } from "../functions.js";
import { bookFunctions } from "./ManageBooks/manage_books.js";
import { authorFunctions } from "./ManageAuthors/manage_authors.js";
import { categoryFunctions } from "./ManageCategories/manage_categories.js";
import { commentFuntions } from "./ManageComments/manage_comments.js";
import { adminPageFunctions } from "./Functions/functions.js";
import { serverBaseURL } from "../config.js";

const {
    addBookForm,
    authorSelectOption,
    categorySelectOption,
    bookTitleInput,
    bookPagesNumberInput,
    bookPublicationYearInput,
    bookImgUrlInput,
} = bookElements

const {
    addAuthorForm,
    authorFirstnameInput,
    authorLastnameInput,
    authorBioInput,
    authorFirstnameFeedback,
    authorLastnameFeedback,
    authorBioFeedback,
} = authorElements;

const {
    addCategoryForm,
    categoryInput,
    categoryFeedback
} = categoryElements;

const {
    populateCommentsTables
} = commentFuntions

const {
    setBodyPaddingTop,
    handleHashChange,
    setMainHeight
} = adminPageFunctions

const { showFeedbackAndClearInput, showSuccessMessage, appendSelectOption } = functions;

const { populateAuthorOptions, populateBookCategoryOptions, populateAdminDashboardBooksTable, handleErrorResponse, renderBook, renderAuthorSelectOption, renderBookCategorySelectOption } = bookFunctions;

const { populateAdminDashboardAuthorsTable, renderAuthor } = authorFunctions;

const { populateAdminDashboardCategoriesTable, renderCategory } = categoryFunctions;

// Initial actions
$(document).ready(function () {
    setBodyPaddingTop();
    setMainHeight();

    handleHashChange();

    $(window).on('hashchange', handleHashChange);

});

$(window).on("resize", function () {
    setBodyPaddingTop();
    setMainHeight();
});

populateAuthorOptions(authorSelectOption)
    .then(() => populateBookCategoryOptions(categorySelectOption))
    .catch((error) => alert(error));

populateAdminDashboardBooksTable();
populateAdminDashboardAuthorsTable();
populateAdminDashboardCategoriesTable();
populateCommentsTables();

addBookForm.submit(function (e) {
    e.preventDefault();

    const author = authorSelectOption.val();
    const category = categorySelectOption.val();
    const title = bookTitleInput.val().trim();
    const pagesNumber = bookPagesNumberInput.val().trim();
    const publicationYear = bookPublicationYearInput.val().trim();
    const imgUrl = bookImgUrlInput.val().trim();

    const requestData = { author, category, title, pagesNumber, publicationYear, imgUrl };

    $.ajax({
        url: serverBaseURL + "api/book/add",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 400) {
                handleErrorResponse(jsonResponse.errors);
            } else if (jsonResponse.status === 200) {
                addBookForm[0].reset();

                renderBook(jsonResponse.data);

                showSuccessMessage(jsonResponse.message);
            }
        },
        error: function () {
            alert("Error");
        }
    });
});

addAuthorForm.submit(function (e) {
    e.preventDefault();

    const firstname = authorFirstnameInput.val();
    const lastname = authorLastnameInput.val();
    const bio = authorBioInput.val().trim();

    const requestData = { firstname, lastname, bio };

    $.ajax({
        url: serverBaseURL + "api/author/add",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 400) {
                if (jsonResponse.errors) {
                    const errors = jsonResponse.errors;

                    if (errors.firstname) {
                        showFeedbackAndClearInput(authorFirstnameInput, authorFirstnameFeedback, errors.firstname);
                    }
                    if (errors.lastname) {
                        showFeedbackAndClearInput(authorLastnameInput, authorLastnameFeedback, errors.lastname);
                    }
                    if (errors.biography) {
                        showFeedbackAndClearInput(authorBioInput, authorBioFeedback, errors.biography);
                    }
                }
            } else if (jsonResponse.status === 200) {
                addAuthorForm[0].reset();

                renderAuthor(jsonResponse.data);
                appendSelectOption(authorSelectOption, renderAuthorSelectOption(jsonResponse.data));

                showSuccessMessage(jsonResponse.message);
            }
        },
        error: function () {
            alert("Error");
        }
    });
});

addCategoryForm.submit(function (e) {
    e.preventDefault();

    const category = categoryInput.val();

    const requestData = { category };

    $.ajax({
        url: serverBaseURL + "api/book/category/add",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 400) {
                if (jsonResponse.errors) {
                    const errors = jsonResponse.errors;

                    if (errors.category) {
                        showFeedbackAndClearInput(categoryInput, categoryFeedback, errors.category);
                    }
                }
            } else if (jsonResponse.status === 200) {
                addCategoryForm[0].reset();

                renderCategory(jsonResponse.data);
                appendSelectOption(categorySelectOption, renderBookCategorySelectOption(jsonResponse.data));

                showSuccessMessage(jsonResponse.message);
            }
        },
        error: function () {
            alert("Error");
        }
    });
});