import { bookElements } from "../../interfaces.js";
import { functions } from "../../functions.js";
import { serverBaseURL } from "../../config.js";

const {
    authorSelectOption
} = bookElements

const {
    showFeedbackAndClearInput,
    showSuccessMessage
} = functions;

function populateAdminDashboardAuthorsTable() {
    $.ajax({
        url: serverBaseURL + "api/author/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status == 200) {
                const authors = jsonResponse.data;

                $(authors).each(function (i, author) {
                    renderAuthor(author);
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function renderAuthor(author) {

    const editButton = renderAuthorEditButton(author);
    const deleteButton = renderAuthorDeleteButton(author);

    $("<tr>").append(
        $("<td>").addClass("afn").append($("<div>").text(author.fist_name)),
        $("<td>").addClass("als").append($("<div>").text(author.last_name)),
        $("<td>").addClass("actions").append(editButton, deleteButton),
    ).prependTo("#adm-all-at tbody");
}

function renderEditAuthorForm() {
    return $('<div>', {
        class: 'edit-container',
        html: $('<div>', {
            class: 'inner',
            html: $('<form>', {
                id: 'adm-edit-author-form',
                html: [
                    $('<span>', { class: 'title', text: 'Edit author' }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-author-firstname', id: 'edit-author-firstname', class: 'form-control', placeholder: 'Firstname' }),
                            $('<span>', { id: 'edit-author-firstname-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-author-lastname', id: 'edit-author-lastname', class: 'form-control', placeholder: 'Lastname' }),
                            $('<span>', { id: 'edit-author-lastname-fdb', class: 'ab-feedback' })
                        ]
                    }),

                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<textarea>', { name: 'edit-author-biography', id: 'edit-author-biography', class: 'form-control', placeholder: 'Biography' }),
                            $('<span>', { id: 'edit-author-biography-fdb', class: 'ab-feedback' })
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

function renderAuthorDeleteButton(author) {
    return $("<span>")
        .html('<i class="fa-solid fa-trash fa-xl"></i>')
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
                        url: serverBaseURL + "api/author/delete",
                        type: 'POST',
                        data: JSON.stringify({ id: author.id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);

                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('tr').remove();
                                    authorSelectOption.find("option[value='" + author.id + "']").remove();
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

function renderAuthorEditButton(author) {
    return $("<span>")
        .html('<i class="fa-solid fa-pen-to-square fa-xl"></i>')
        .addClass("action")
        .click(function (eb) {
            $('#admin-dshbp-body').append(renderEditAuthorForm());

            const firstnameEditInput = $("#edit-author-firstname");
            const lastnameEditInput = $("#edit-author-lastname");
            const biographyEditInput = $("#edit-author-biography");

            const firstnameFeedback = $("#edit-author-firstname-fdb");
            const lastnameFeedback = $("#edit-author-lastname-fdb");
            const biographyFeedback = $("#edit-author-biography-fdb");

            firstnameEditInput.val(author.fist_name);
            lastnameEditInput.val(author.last_name);
            biographyEditInput.val(author.biography);

            const editAuthorForm = $("#adm-edit-author-form");

            editAuthorForm.submit(function (e) {
                e.preventDefault();

                const id = author.id;
                const firstname = firstnameEditInput.val();
                const lastname = lastnameEditInput.val();
                const biography = biographyEditInput.val();

                const requestData = { id, firstname, lastname, biography };

                $.ajax({
                    url: serverBaseURL + "api/author/edit",
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        const jsonResponse = JSON.parse(response);

                        if (jsonResponse.status === 400) {
                            const errors = jsonResponse.errors;

                            if (errors.firstname) {
                                showFeedbackAndClearInput(firstnameEditInput, firstnameFeedback, errors.firstname)
                            }
                            if (errors.lastname) {
                                showFeedbackAndClearInput(lastnameEditInput, lastnameFeedback, errors.lastname)
                            }
                            if (errors.biography) {
                                showFeedbackAndClearInput(biographyEditInput, biographyFeedback, errors.biography)
                            }

                        } else if (jsonResponse.status === 200) {
                            $('.edit-container').fadeOut(function () {
                                $(this).remove();
                            });

                            const { id, fist_name, last_name } = jsonResponse.editedData;

                            const aaction = $(eb.target).closest('.actions');
                            aaction.prevAll(".afn:first").text(fist_name);
                            aaction.prevAll(".als:first").text(last_name);
                            aaction.empty().append(renderAuthorEditButton(jsonResponse.editedData)).append(' ').append(renderAuthorDeleteButton(jsonResponse.editedData));
                            authorSelectOption.find("option[value='" + id + "']").text(`${fist_name} ${last_name}`);

                            showSuccessMessage(jsonResponse.message);
                        }
                    },
                    error: function () {
                        alert("Error");
                    }
                });
            });


            $('#adm-edit-author-form button[type="button"]').click(function () {
                $('.edit-container').fadeOut(function () {
                    $(this).remove();
                });
            });

            $(".edit-container").css("display", "flex").hide().fadeIn();
        });
}

export const authorFunctions = {
    populateAdminDashboardAuthorsTable: populateAdminDashboardAuthorsTable,
    renderAuthor: renderAuthor,
    renderEditAuthorForm: renderEditAuthorForm
}