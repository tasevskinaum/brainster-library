import { serverBaseURL } from "../config.js";
import { logoutElements } from "../interfaces.js";

const {
    logoutBtns
} = logoutElements;

logoutBtns.each(function (i, e) {
    $(e).click(function () {
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
    })
});
