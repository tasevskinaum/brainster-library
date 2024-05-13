$.ajax({
    url: "http://api.quotable.io/random",
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
        const { content } = response;

        $("<span>").text(content).appendTo("footer");
    },
    error: function () {
        alert("Error");
    }
});