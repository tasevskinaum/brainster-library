import { bookPageElements } from "../../interfaces.js";
import { functions } from "../../functions.js";
import { serverBaseURL } from "../../config.js";

const {
    bookImg,
    bookInfoContainer,
} = bookPageElements

const {
    showFeedbackAndClearInput,
    showSuccessMessage
} = functions;

function setBodyPaddingTop() {
    $("#book-body").css("padding-top", $(".navbar").innerHeight() + 'px');
}

function setHeaderHeight() {
    const headerHeight = $(window).innerHeight() - $(".navbar").innerHeight();

    $("#book-header").css("height", headerHeight + 'px');
}

function setMainHeight() {
    const navbarHeight = $(".navbar").innerHeight();
    const footerHeight = $("footer").innerHeight();
    $("#book-body main").css("min-height", "calc(100vh - " + navbarHeight + "px - " + footerHeight + "px)");
}

function renderBookInfo(book) {
    bookImg.attr('src', book.img_url);

    for (const key in book) {
        if (book.hasOwnProperty(key)) {
            if (key === 'img_url') {
                continue;
            }

            bookInfoContainer.append($("<span>").text(`${formatPropertyName(key)}: ${book[key]}`));
        }
    }
}

function formatPropertyName(propertyName) {
    return propertyName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function listAllComments(urlParams) {

    const book_id = urlParams.get('book');

    const requestData = { book_id };

    $.ajax({
        url: serverBaseURL + "api/book/comment/all",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);
            const comments = jsonResponse.data;

            if (jsonResponse.status === 200) {
                comments.forEach(comment => {
                    renderComment(comment);
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function listAllNotes(urlParams) {
    const user_id = localStorage.getItem("USER_ID") || null;
    const book_id = urlParams.get('book');

    $.ajax({
        url: serverBaseURL + "api/book/note/all",
        type: 'POST',
        data: JSON.stringify({ book_id: book_id, user_id: user_id }),
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
                        $.ajax({
                            url: serverBaseURL + "logout",
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {
                                const parsedResponse = JSON.parse(response);

                                if (parsedResponse.status === 200) {
                                    localStorage.clear();
                                    window.location.href = "home.php";
                                }
                            },
                            error: function () {
                                alert("Error");
                            }
                        });
                    }
                });
            } else if (jsonResponse.status === 200) {
                const notes = jsonResponse.data;

                notes.forEach(note => {
                    renderNote(note);
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}


function renderComment(comment) {
    let commentDeleteButton = null;

    const commentPostedAgo = calculateTimeAgo(comment.created_at);

    if (comment.user_id === +localStorage.getItem("USER_ID")) {
        commentDeleteButton = renderCommentDeleteButton(comment);
    }

    $('<div>', {
        class: 'comment',
        html: [
            commentDeleteButton,
            $('<div>', {
                class: 'user-info',
                html: [
                    $('<span>', {
                        text: `${comment.first_name} ${comment.last_name}`
                    }),
                    $('<span>', {
                        class: 'comment-posted-ago',
                        text: commentPostedAgo
                    }),
                    $('<span>', {
                        class: 'username',
                        text: `@${comment.username}`
                    })

                ]
            }),
            $('<span>', {
                text: comment.comment
            })
        ]
    }).prependTo('.comments');
}

function renderCommentDeleteButton(comment) {
    return $("<span>")
        .html('<i class="fa-solid fa-trash fa-lg"></i>')
        .addClass("action")
        .click(function (e) {
            Swal.fire({
                text: "Are you sure you want to delete the comment?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleting...",
                        text: "Please wait.",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    $.ajax({
                        url: serverBaseURL + "api/book/comment/delete",
                        type: 'POST',
                        data: JSON.stringify({ id: comment.comment_id, user_id: comment.user_id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);
                            if (jsonResponse.status == 400) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: `${jsonResponse.message}`,
                                    icon: "error"
                                });
                            }
                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Deleted!",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('.comment').remove();
                                });
                            }
                        },
                        error: function () {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: "Cancelled",
                        icon: "error"
                    });
                }
            });
        });
}

function calculateTimeAgo(created_at) {
    var currentTime = new Date();
    var commentTime = new Date(created_at);
    var diff = Math.floor((currentTime - commentTime) / (1000 * 60)); // Difference in minutes

    if (diff < 60) {
        return diff + " minutes ago";
    } else if (diff < 1440) {
        return Math.floor(diff / 60) + " hours ago";
    } else {
        return Math.floor(diff / 1440) + " days ago";
    }
}

function renderNote(note) {

    const noteDeleteButton = renderNoteDeleteButton(note);
    const noteEditButton = renderNoteEditButton(note);

    $('<div>', {
        class: 'note',
        html: [
            $('<div>', {
                class: 'actions',
                html: [
                    noteDeleteButton,
                    noteEditButton
                ]
            }),
            $('<div>', {
                class: 'note-info',
                html: [
                    $('<span>', {
                        class: 'note-title',
                        text: note.note_title
                    }),
                    $('<span>', {
                        class: 'note-note',
                        text: note.note
                    })

                ]
            }),
            $('<span>', {
                text: comment.comment
            })
        ]
    }).prependTo('.notes');

}

function renderNoteDeleteButton(note) {
    return $("<span>")
        .html('<i class="fa-solid fa-trash fa-lg"></i>')
        .addClass("action")
        .click(function (e) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleting...",
                        text: "Please wait.",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    $.ajax({
                        url: serverBaseURL + "api/book/note/delete",
                        type: 'POST',
                        data: JSON.stringify({ id: note.id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);
                            if (jsonResponse.status == 400) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: `${jsonResponse.message}`,
                                    icon: "error"
                                });
                            }
                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('.note').remove();
                                });
                            }
                        },
                        error: function () {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                    });
                }
            });
        });
}

function renderNoteEditButton(note) {
    return $("<span>")
        .html('<i class="fa-solid fa-pen-to-square fa-xl"></i>')
        .addClass("action")
        .click(function (eb) {
            $('#book-body').append(renderEditNoteForm());

            const noteTitleEditInput = $("#edit-note-title");
            const noteEditInput = $("#edit-note");

            const noteTitleFeedback = $("#edit-note-title-fdb");
            const noteFeedback = $("#edit-note-fdb");

            noteTitleEditInput.val(note.note_title);
            noteEditInput.val(note.note);

            const editNoteForm = $("#edit-note-form");

            editNoteForm.submit(function (e) {
                e.preventDefault();

                const id = note.id;
                const note_title = noteTitleEditInput.val();
                const noten = noteEditInput.val();

                const requestData = { id, note_title, noten };

                $.ajax({
                    url: serverBaseURL + "api/book/note/edit",
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        const jsonResponse = JSON.parse(response);

                        if (jsonResponse.status === 400) {
                            const errors = jsonResponse.errors;
                            console.log(errors);
                            if (errors.note_title) {
                                showFeedbackAndClearInput(noteTitleEditInput, noteTitleFeedback, errors.note_title)
                            }
                            if (errors.note) {
                                showFeedbackAndClearInput(noteEditInput, noteFeedback, errors.note)
                            }


                        } else if (jsonResponse.status === 200) {
                            $('.edit-container').fadeOut(function () {
                                $(this).remove();
                            });

                            const { note_title, note } = jsonResponse.editedData;

                            const noteElement = $(eb.target).closest('.note');
                            const actions = $(eb.target).closest('.actions');

                            noteElement.find('.note-title').text(note_title);
                            noteElement.find('.note-note').text(note);
                            actions.empty().append(renderNoteDeleteButton(jsonResponse.editedData)).append(' ').append(renderNoteEditButton(jsonResponse.editedData));

                            showSuccessMessage(jsonResponse.message);
                        }
                    },
                    error: function () {
                        alert("Error");
                    }
                });
            });


            $('#edit-note-form button[type="button"]').click(function () {
                $('.edit-container').fadeOut(function () {
                    $(this).remove();
                });
            });

            $(".edit-container").css("display", "flex").hide().fadeIn();
        });
}

function renderEditNoteForm() {
    return $('<div>', {
        class: 'edit-container',
        html: $('<div>', {
            class: 'inner',
            html: $('<form>', {
                id: 'edit-note-form',
                html: [
                    $('<span>', { class: 'title', text: 'Edit note' }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-note-title', id: 'edit-note-title', class: 'form-control', placeholder: 'Note Title' }),
                            $('<span>', { id: 'edit-note-title-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<textarea>', { name: 'edit-note', id: 'edit-note', class: 'form-control', placeholder: 'Note' }),
                            $('<span>', { id: 'edit-note-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<button>', { type: 'submit', text: 'Save' }),
                            $('<button>', { type: 'button', text: 'Close' })
                        ]
                    })
                ]
            })
        })
    });
}


export const bookPageFunctions = {
    setBodyPaddingTop: setBodyPaddingTop,
    setHeaderHeight: setHeaderHeight,
    renderBookInfo: renderBookInfo,
    listAllComments: listAllComments,
    renderComment: renderComment,
    renderCommentDeleteButton: renderCommentDeleteButton,
    calculateTimeAgo: calculateTimeAgo,
    listAllNotes: listAllNotes,
    renderNote: renderNote,
    setMainHeight: setMainHeight
}