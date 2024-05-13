import { signupElements } from "../interfaces.js";
import { functions } from "../functions.js";
import { serverBaseURL } from "../config.js";

const {
    signupForm,
    signupFirstnameFeedback,
    signupLastnameFeedback,
    signupUsernameFeedback,
    signupEmailFeedback,
    signupPasswordFeedback,
    signupFirstnameInput,
    signupLastnameInput,
    signupUsernameInput,
    signupEmailInput,
    signupPasswordInput
} = signupElements;

const {
    showFeedbackAndClearInput
} = functions;


$(document).ready(function () {
    setMainHeight();
});

$(window).resize(function () {
    setMainHeight();
});

signupForm.submit(function (e) {
    e.preventDefault();

    const firstname = signupFirstnameInput.val().trim();
    const lastname = signupLastnameInput.val().trim();
    const username = signupUsernameInput.val().trim();
    const email = signupEmailInput.val().trim();
    const password = signupPasswordInput.val().trim();

    const requestData = { firstname, lastname, username, email, password };

    $.ajax({
        url: serverBaseURL + "api/user/signup",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const parsedResponse = JSON.parse(response);

            if (parsedResponse.status === 400) {
                if (parsedResponse.errors.firstname) {
                    showFeedbackAndClearInput(signupFirstnameInput, signupFirstnameFeedback, parsedResponse.errors.firstname);
                }
                if (parsedResponse.errors.lastname) {
                    showFeedbackAndClearInput(signupLastnameInput, signupLastnameFeedback, parsedResponse.errors.lastname);
                }
                if (parsedResponse.errors.username) {
                    showFeedbackAndClearInput(signupUsernameInput, signupUsernameFeedback, parsedResponse.errors.username);
                }
                if (parsedResponse.errors.email) {
                    showFeedbackAndClearInput(signupEmailInput, signupEmailFeedback, parsedResponse.errors.email);
                }
                if (parsedResponse.errors.password) {
                    showFeedbackAndClearInput(signupPasswordInput, signupPasswordFeedback, parsedResponse.errors.password);
                }
            } else if (parsedResponse.status === 201) {
                signupForm[0].reset();
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
                    title: "Account has been created"
                }).then(() => {
                    window.location.href = "home.php#log-in"
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
});

function setMainHeight() {
    const footerHeight = $("footer").innerHeight();
    $("#lsp").css("height", "calc(100vh - " + footerHeight + "px)");
}
