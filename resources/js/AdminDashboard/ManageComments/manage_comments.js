import { serverBaseURL } from "../../config.js";

function populateCommentsTables() {
    $.ajax({
        url: serverBaseURL + "api/book/comment/allForAdmin",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status == 200) {
                const comments = jsonResponse.data;

                $(comments).each(function (i, comment) {
                    if (comment.status_id === 1) {
                        renderPendingComment(comment);
                    } else if (comment.status_id === 2) {
                        renderApprovedComment(comment);
                    } else if (comment.status_id === 3) {
                        renderRejectComment(comment);
                    }
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function renderPendingComment(comment) {

    const approveButton = renderApproveButton(comment);
    const rejectButton = renderRejectButton(comment);

    $("<tr>").append(
        $("<td>").text(comment.book_title),
        $("<td>").text(`${comment.user_firstname} ${comment.user_lastname}`),
        $("<td>").text(comment.comment),
        $("<td>").addClass("actions").append(approveButton, rejectButton),
    ).prependTo("#adm-all-pc tbody");
}

function renderApprovedComment(comment) {

    const rejectButton = renderRejectButton(comment);

    $("<tr>").append(
        $("<td>").text(comment.book_title),
        $("<td>").text(`${comment.user_firstname} ${comment.user_lastname}`),
        $("<td>").text(comment.comment),
        $("<td>").addClass("actions").append(rejectButton),
    ).prependTo("#adm-all-ac tbody");
}

function renderRejectComment(comment) {

    const approveButton = renderApproveButton(comment);

    $("<tr>").append(
        $("<td>").text(comment.book_title),
        $("<td>").text(`${comment.user_firstname} ${comment.user_lastname}`),
        $("<td>").text(comment.comment),
        $("<td>").addClass("actions").append(approveButton),
    ).prependTo("#adm-all-rc tbody");
}

function renderApproveButton(comment) {
    return $("<span>")
        .html('<i class="fa-solid fa-check fa-xl"></i>')
        .addClass("action")
        .click(function (e) {
            Swal.fire({
                text: "Are you sure you want to approve it?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, approve!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Processing...",
                        text: "Please wait.",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    $.ajax({
                        url: serverBaseURL + "book/comment/approve",
                        type: 'POST',
                        data: JSON.stringify({ id: comment.comment_id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);

                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Approved!",
                                    text: "The comment has been approved",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('tr').remove();
                                    renderApprovedComment(comment);
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

function renderRejectButton(comment) {
    return $("<span>")
        .html('<i class="fa-solid fa-xmark fa-xl"></i>')
        .addClass("action")
        .click(function (e) {
            Swal.fire({
                text: "Are you sure you don't want to approve the comment?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, reject!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Processing...",
                        text: "Please wait.",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    $.ajax({
                        url: serverBaseURL + "book/comment/reject",
                        type: 'POST',
                        data: JSON.stringify({ id: comment.comment_id }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            const jsonResponse = JSON.parse(response);

                            if (jsonResponse.status == 200) {
                                Swal.fire({
                                    title: "Rejected!",
                                    text: "Comment has been declined",
                                    icon: "success"
                                }).then(() => {
                                    $(e.target).closest('tr').remove();
                                    renderRejectComment(comment);
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

export const commentFuntions = {
    populateCommentsTables: populateCommentsTables
}