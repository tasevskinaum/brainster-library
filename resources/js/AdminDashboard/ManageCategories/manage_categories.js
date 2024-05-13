import { serverBaseURL } from "../../config.js";
import { functions } from "../../functions.js";
import { bookElements } from "../../interfaces.js";

const {
    categorySelectOption
} = bookElements;

const {
    showFeedbackAndClearInput,
    showSuccessMessage
} = functions;

function populateAdminDashboardCategoriesTable() {
    $.ajax({
        url: serverBaseURL + "api/book/category/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status == 200) {
                const categories = jsonResponse.data;

                $(categories).each(function (i, category) {
                    renderCategory(category);
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function renderCategory(category) {
    const editButton = renderCategoryEditButton(category);
    const deleteButton = renderCategoryDeleteButton(category);

    $("<tr>").append(
        $("<td>").addClass("cc").text(category.category),
        $("<td>").addClass("actions").append(editButton, deleteButton),
    ).prependTo("#adm-all-ct tbody");
}

function renderEditCategoryForm() {
    return $('<div>', {
        class: 'edit-container',
        html: $('<div>', {
            class: 'inner',
            html: $('<form>', {
                id: 'adm-edit-category-form',
                html: [
                    $('<span>', { class: 'title', text: 'Edit category' }),


                    $('<div>', {
                        class: 'form-group',
                        html: [
                            $('<input>', { type: 'text', name: 'edit-category-c', id: 'edit-category-c', class: 'form-control', placeholder: 'Category' }),
                            $('<span>', { id: 'edit-category-c-fdb', class: 'ab-feedback' })
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

function renderCategoryEditButton(category) {
    return $("<span>")
        .html('<i class="fa-solid fa-pen-to-square fa-xl"></i>')
        .addClass("action")
        .click(function (eb) {
            $('#admin-dshbp-body').append(renderEditCategoryForm());

            const categoryInput = $("#edit-category-c");

            const categoryFeedback = $("#edit-category-c-fdb");

            categoryInput.val(category.category);

            const editCategoryForm = $("#adm-edit-category-form");

            editCategoryForm.submit(function (e) {
                e.preventDefault();

                const id = category.id;
                const categoryInputValue = categoryInput.val();

                const requestData = { id: id, category: categoryInputValue };

                $.ajax({
                    url: serverBaseURL + "api/book/category/edit",
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        const jsonResponse = JSON.parse(response);

                        if (jsonResponse.status === 400) {
                            const errors = jsonResponse.errors;

                            if (errors.category) {
                                showFeedbackAndClearInput(categoryInput, categoryFeedback, errors.category)
                            }


                        } else if (jsonResponse.status === 200) {
                            $('.edit-container').fadeOut(function () {
                                $(this).remove();
                            });

                            const editedData = jsonResponse.editedData;


                            const caction = $(eb.target).closest('.actions');
                            caction.prevAll(".cc:first").text(editedData.category);
                            caction.empty().append(renderCategoryEditButton(jsonResponse.editedData)).append(' ').append(renderCategoryDeleteButton(jsonResponse.editedData));
                            categorySelectOption.find("option[value='" + id + "']").text(editedData.category);

                            showSuccessMessage(jsonResponse.message);
                        }
                    },
                    error: function () {
                        alert("Error");
                    }
                });
            });

            $('#adm-edit-category-form button[type="button"]').click(function () {
                $('.edit-container').fadeOut(function () {
                    $(this).remove();
                });
            });

            $(".edit-container").css("display", "flex").hide().fadeIn();
        });
}

function renderCategoryDeleteButton(category) {
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
                        url: serverBaseURL + "api/book/category/delete",
                        type: 'POST',
                        data: JSON.stringify({ id: category.id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);

                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: `${jsonResponse.message}`,
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('tr').remove();
                                    categorySelectOption.find("option[value='" + category.id + "']").remove();
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

export const categoryFunctions = {
    populateAdminDashboardCategoriesTable: populateAdminDashboardCategoriesTable,
    renderCategory: renderCategory,
    renderEditCategoryForm: renderEditCategoryForm

}