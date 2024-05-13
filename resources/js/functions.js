function appendSelectOption(select, option) {
    select.append(option);
}

function showFeedbackAndClearInput(inputElement, feedbackElement, errorMessage) {
    inputElement.val("");

    feedbackElement.text(errorMessage).show();

    inputElement.on("focus", function () {
        feedbackElement.hide();
    });
}

function showSuccessMessage(message) {
    Swal.fire({
        customClass: {
            container: 'my-swal'
        },
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        icon: "success",
        title: `${message}`
    });
}

export const functions = {
    appendSelectOption: appendSelectOption,
    showFeedbackAndClearInput: showFeedbackAndClearInput,
    showSuccessMessage: showSuccessMessage
}