import { bookPageElements } from "../interfaces.js";
import { bookPageFunctions } from "./Functions/functions.js";
import { functions } from "../functions.js";
import { serverBaseURL } from "../config.js";

const {
    commentForm,
    commentInput,
    commentInputFeedback,
    chooseComments,
    chooseNotes,
    commentsContainer,
    notesContainer,
    noteTitleInput,
    notetTitleInputFeedback,
    noteInput,
    noteInputFeedback,
    noteForm,
    aboutAuthor
} = bookPageElements

const {
    setBodyPaddingTop,
    setHeaderHeight,
    renderBookInfo,
    listAllComments,
    listAllNotes,
    renderNote,
    setMainHeight
} = bookPageFunctions;

const {
    showFeedbackAndClearInput,
    showSuccessMessage,
} = functions;

$(window).resize(function () {
    setBodyPaddingTop();
    setHeaderHeight();
    setMainHeight();
});

const urlParams = new URLSearchParams(window.location.search);

$(document).ready(function () {
    setBodyPaddingTop();
    setHeaderHeight();
    setMainHeight();

    commentsContainer.show();
    notesContainer.hide();
});

if (!urlParams.has('book')) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "home.php";
        }
    });
} else {
    const id = urlParams.get('book');

    $.ajax({
        url: serverBaseURL + "api/book/get",
        type: 'POST',
        data: JSON.stringify({ id }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: jsonResponse.message,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "home.php";
                    }
                });
            } else if (jsonResponse.status === 200) {
                const book = jsonResponse.data;

                const formatedBookData = {
                    img_url: book.img_url,
                    title: book.title,
                    author: `${book.author_firstname} ${book.author_lastname}`,
                    category: book.category,
                    year: book.publication_year,
                    pages: book.pages_number
                }

                renderBookInfo(formatedBookData);
                listAllComments(urlParams);
                listAllNotes(urlParams);
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

chooseComments.click(function () {
    commentsContainer.show();
    notesContainer.hide();
});

chooseNotes.click(function () {
    notesContainer.show();
    commentsContainer.hide();
});

commentForm.submit(function (e) {
    e.preventDefault();

    const is_auth = localStorage.getItem("IS_AUTH");

    if (!is_auth) {
        Swal.fire(
            {
                icon: "error",
                text: "You must be logged in to comment."
            });
        return;
    }

    const user_id = localStorage.getItem("USER_ID");
    const book_id = urlParams.get('book');
    const comment = commentInput.val().trim();

    const requestData = { user_id, book_id, comment };

    $.ajax({
        url: serverBaseURL + "api/book/comment/add",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);
            if (jsonResponse.status === 400) {
                if (jsonResponse.errors) {
                    if (jsonResponse.errors.comment) {
                        showFeedbackAndClearInput(commentInput, commentInputFeedback, jsonResponse.errors.comment);
                    }
                }
                if (jsonResponse.message) {
                    Swal.fire(`${jsonResponse.message}`);
                }

            } else if (jsonResponse.status === 200) {
                commentForm[0].reset();

                Swal.fire({
                    text: "Before your comment can be seen, it must first be approved by the administrators.",
                    icon: "info"
                });

            }
        },
        error: function () {
            alert("Error");
        }
    });
});

noteForm.submit(function (e) {
    e.preventDefault();

    const is_auth = localStorage.getItem("IS_AUTH");

    if (!is_auth) {
        Swal.fire(
            {
                icon: "error",
                text: "You must be logged in to add note."
            });
        return;
    }

    const user_id = localStorage.getItem("USER_ID");
    const book_id = urlParams.get('book');
    const note_title = noteTitleInput.val().trim();
    const note = noteInput.val().trim();

    const requestData = { user_id, book_id, note_title, note };

    $.ajax({
        url: serverBaseURL + "book/note/add",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);
            if (jsonResponse.status === 400) {
                if (jsonResponse.errors) {
                    const errors = jsonResponse.errors;

                    if (errors.note_title) {
                        showFeedbackAndClearInput(noteTitleInput, notetTitleInputFeedback, errors.note_title);
                    }
                    if (errors.note) {
                        showFeedbackAndClearInput(noteInput, noteInputFeedback, errors.note);
                    }
                }
                if (jsonResponse.message) {
                    Swal.fire(`${jsonResponse.message}`);
                }

            } else if (jsonResponse.status === 200) {
                noteForm[0].reset();
                showSuccessMessage(jsonResponse.message);
                renderNote(jsonResponse.data)
            }
        },
        error: function () {
            alert("Error");
        }
    });
});



