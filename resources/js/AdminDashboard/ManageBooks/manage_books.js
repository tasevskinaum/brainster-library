import { bookElements } from "../../interfaces.js";
import { functions } from "../../functions.js";
import { serverBaseURL } from "../../config.js";

const {
    authorSelectOption,
    categorySelectOption,
    bookTitleInput,
    bookPagesNumberInput,
    bookPublicationYearInput,
    bookImgUrlInput,
    authorSelectFeedback,
    categorySelectFeedback,
    bookTitleFeedback,
    bookPagesNumberFeedback,
    bookPublicationYearFeedback,
    bookImgUrlFeedback
} = bookElements

const {
    showFeedbackAndClearInput,
    showSuccessMessage,
    appendSelectOption
} = functions

function handleErrorResponse(errors) {
    for (const key in errors) {
        switch (key) {
            case 'author':
                showFeedbackAndClearInput(authorSelectOption, authorSelectFeedback, errors.author);
                break;
            case 'category':
                showFeedbackAndClearInput(categorySelectOption, categorySelectFeedback, errors.category);
                break;
            case 'img_url':
                showFeedbackAndClearInput(bookImgUrlInput, bookImgUrlFeedback, errors.img_url);
                break;
            case 'pages_number':
                showFeedbackAndClearInput(bookPagesNumberInput, bookPagesNumberFeedback, errors.pages_number);
                break;
            case 'publication_year':
                showFeedbackAndClearInput(bookPublicationYearInput, bookPublicationYearFeedback, errors.publication_year);
                break;
            case 'title':
                showFeedbackAndClearInput(bookTitleInput, bookTitleFeedback, errors.title);
                break;
        }
    }
}

function populateAuthorOptions(select) {
    const deferred = $.Deferred()

    $.ajax({
        url: serverBaseURL + "api/author/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 200) {
                jsonResponse.data.forEach(function (author) {
                    appendSelectOption(select, renderAuthorSelectOption(author));
                });
                deferred.resolve();
            }
        },
        error: function () {
            deferred.reject("Error");
        }
    });

    return deferred.promise();
}

function populateBookCategoryOptions(select) {
    const deferred = $.Deferred();

    $.ajax({
        url: serverBaseURL + "api/book/category/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status === 200) {
                jsonResponse.data.forEach(function (category) {
                    appendSelectOption(select, renderBookCategorySelectOption(category));
                });
                deferred.resolve();
            }
        },
        error: function () {
            deferred.reject("Error");
        }
    });

    return deferred.promise();
}

function renderAuthorSelectOption({ id, fist_name, last_name }) {
    const option = $("<option>");
    option.val(id);
    option.text(`${fist_name} ${last_name}`);
    return option;
}

function renderBookCategorySelectOption({ id, category }) {
    const option = $("<option>");
    option.val(id);
    option.text(`${category}`);
    return option;
}

function renderBook(book) {
    const editButton = renderBookEditButton(book);
    const deleteButton = renderBookDeleteButton(book);

    $("<tr>").append(
        $("<td>").addClass("bt").text(book.title),
        $("<td>").addClass("bc").text(book.category),
        $("<td>").addClass("bafn").text(`${book.author_firstname} ${book.author_lastname}`),
        $("<td>").addClass("bpn").text(book.pages_number),
        $("<td>").addClass("bpy").text(book.publication_year),
        $("<td>").addClass("bactions").append(editButton, deleteButton),
    ).prependTo("#adm-all-bt tbody");
}

function renderEditForm() {
    return $('<div>', {
        class: 'edit-container',
        html: $('<div>', {
            class: 'inner',
            html: $('<form>', {
                id: 'adm-edit-book-form',
                html: [
                    $('<span>', { class: 'title', text: 'Edit book' }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<select>', { name: 'edit-author-select', id: 'edit-author-select', class: 'form-control' }),
                            $('<span>', { id: 'edit-author-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<select>', { name: 'edit-category-select', id: 'edit-category-select', class: 'form-control' }),
                            $('<span>', { id: 'edit-category-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-book-title', id: 'edit-book-title', class: 'form-control', placeholder: 'Title' }),
                            $('<span>', { id: 'edit-title-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-book-pages-number', id: 'edit-book-pages-number', class: 'form-control', placeholder: 'Number of pages' }),
                            $('<span>', { id: 'edit-pages-number-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-publication-year', id: 'edit-publication-year', class: 'form-control', placeholder: 'Year of publication' }),
                            $('<span>', { id: 'edit-publication-year-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-book-img-url', id: 'edit-book-img-url', class: 'form-control', placeholder: 'Image URL..' }),
                            $('<span>', { id: 'edit-img-url-fdb', class: 'ab-feedback' })
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

function populateAdminDashboardBooksTable() {
    $.ajax({
        url: serverBaseURL + "api/book/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status == 200) {
                const books = jsonResponse.data;

                $(books).each(function (i, e) {
                    renderBook(e);
                })
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function renderBookEditButton(book) {
    return $("<span>")
        .html('<i class="fa-solid fa-pen-to-square fa-xl"></i>')
        .addClass("action")
        .click(async function (eb) {
            $('#admin-dshbp-body').append(renderEditForm());

            await Promise.all([
                populateAuthorOptions($("#edit-author-select")),
                populateBookCategoryOptions($("#edit-category-select"))
            ]);

            const authorSelect = $("#edit-author-select");
            const categorySelect = $("#edit-category-select");
            const titleInput = $("#edit-book-title");
            const pagesInput = $("#edit-book-pages-number");
            const publicationYearInput = $("#edit-publication-year");
            const imgUrlInput = $("#edit-book-img-url");

            const authorSelectFeedback = $("#edit-author-fdb");
            const categorySelectFeedback = $("#edit-category-fdb");
            const bookTitleFeedback = $("#edit-title-fdb");
            const bookPagesNumberFeedback = $("#edit-pages-number-fdb");
            const bookPublicationYearFeedback = $("#edit-publication-year-fdb");
            const bookImgUrlFeedback = $("#edit-img-url-fdb");

            const authorOptions = $("#edit-author-select option");
            const categoryOptions = $("#edit-category-select option");

            authorSelect.val(book.author_id);
            categorySelect.val(book.book_category_id);
            titleInput.val(book.title);
            pagesInput.val(book.pages_number);
            publicationYearInput.val(book.publication_year);
            imgUrlInput.val(book.img_url);

            const editBookForm = $("#adm-edit-book-form");

            editBookForm.submit(function (e) {
                e.preventDefault();

                const bookId = book.book_id;
                const author = authorSelect.val();
                const category = categorySelect.val();
                const title = titleInput.val().trim();
                const pagesNumber = pagesInput.val().trim();
                const publicationYear = publicationYearInput.val().trim();
                const imgUrl = imgUrlInput.val().trim();

                const requestData = { author, category, title, pagesNumber, publicationYear, imgUrl, bookId };

                $.ajax({
                    url: serverBaseURL + "api/book/edit",
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        const jsonResponse = JSON.parse(response);

                        if (jsonResponse.status === 400) {
                            if (jsonResponse.errors.author) {
                                showFeedbackAndClearInput(authorOptions, authorSelectFeedback, jsonResponse.errors.author);
                            }
                            if (jsonResponse.errors.category) {
                                showFeedbackAndClearInput(categoryOptions, categorySelectFeedback, jsonResponse.errors.category);
                            }
                            if (jsonResponse.errors.img_url) {
                                showFeedbackAndClearInput(imgUrlInput, bookImgUrlFeedback, jsonResponse.errors.img_url);
                            }
                            if (jsonResponse.errors.pages_number) {
                                showFeedbackAndClearInput(pagesInput, bookPagesNumberFeedback, jsonResponse.errors.pages_number);
                            }
                            if (jsonResponse.errors.publication_year) {
                                showFeedbackAndClearInput(publicationYearInput, bookPublicationYearFeedback, jsonResponse.errors.publication_year);
                            }
                            if (jsonResponse.errors.title) {
                                showFeedbackAndClearInput(titleInput, bookTitleFeedback, jsonResponse.errors.title);
                            }
                        } else if (jsonResponse.status === 200) {
                            $('.edit-container').fadeOut(function () {
                                $(this).remove();
                            });

                            const editedData = jsonResponse.editedData;

                            const bactions = $(eb.target).closest('.bactions');
                            bactions.prevAll(".bt:first").text(editedData.title);
                            bactions.prevAll(".bc:first").text(editedData.category);
                            bactions.prevAll(".bafn:first").text(`${editedData.author_firstname} ${editedData.author_lastname}`);
                            bactions.prevAll(".bpn:first").text(editedData.pages_number);
                            bactions.prevAll(".bpy:first").text(editedData.publication_year);

                            bactions.empty().append(renderBookEditButton(editedData)).append(' ').append(renderBookDeleteButton(editedData));

                            showSuccessMessage(jsonResponse.message);
                        }

                    },
                    error: function () {
                        alert("Error");
                    }
                });
            });

            $('#adm-edit-book-form button[type="button"]').click(function () {
                $('.edit-container').fadeOut(function () {
                    $(this).remove();
                });
            });

            $(".edit-container").css("display", "flex").hide().fadeIn();
        });
}

function renderBookDeleteButton(book) {
    return $("<span>")
        .html('<i class="fa-solid fa-trash fa-xl"></i>')
        .addClass("action")
        .click(function (e) {
            Swal.fire({
                text: "By deleting the book, you will also delete all comments and personal notes. You won't be able to take this back!",
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
                        url: serverBaseURL + "api/book/delete",
                        type: 'POST',
                        data: JSON.stringify({ id: book.book_id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            console.log(response);
                            const jsonResponse = JSON.parse(response);
                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('tr').remove();
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

export const bookFunctions = {
    handleErrorResponse: handleErrorResponse,
    populateAuthorOptions: populateAuthorOptions,
    populateBookCategoryOptions: populateBookCategoryOptions,
    renderAuthorSelectOption: renderAuthorSelectOption,
    renderBookCategorySelectOption: renderBookCategorySelectOption,
    renderBook: renderBook,
    renderEditForm: renderEditForm,
    populateAdminDashboardBooksTable: populateAdminDashboardBooksTable
}