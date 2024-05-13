import { loginElements } from "../interfaces.js";
import { functions } from "../functions.js";
import { serverBaseURL } from "../config.js";

const {
    logInForm,
    loginUsernameFeedback,
    loginPasswordFeedback,
    loginUsernameInput,
    loginPasswordInput
} = loginElements;

const {
    showFeedbackAndClearInput
} = functions;

$(document).ready(function () {
    setMainHeight();
});

$(window).resize(function () {
    setMainHeight();
});

logInForm[0].reset();

logInForm.submit(function (e) {
    e.preventDefault();

    const username = loginUsernameInput.val().trim();
    const password = loginPasswordInput.val().trim();

    const requestData = { username, password };

    $.ajax({
        url: serverBaseURL + "api/user/login",
        type: 'POST',
        data: JSON.stringify(requestData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const parsedResponse = JSON.parse(response);

            if (parsedResponse.status === 401) {
                if (parsedResponse.errors.username) {
                    showFeedbackAndClearInput(loginUsernameInput, loginUsernameFeedback, parsedResponse.errors.username);
                }
                if (parsedResponse.errors.password) {
                    showFeedbackAndClearInput(loginPasswordInput, loginPasswordFeedback, parsedResponse.errors.password);
                }
            } else if (parsedResponse.status === 200) {
                localStorage.setItem("IS_AUTH", true);
                localStorage.setItem("USER_ID", parsedResponse.userID);
                window.location.href = "home.php";
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
