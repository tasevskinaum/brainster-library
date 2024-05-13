function handleHashChange() {
    const currentHash = window.location.hash;

    $("#authors, #categories, #books, #comments").hide();

    if (!currentHash || currentHash === '#books') {
        $("#books").show();
    } else if (currentHash === '#authors') {
        $("#authors").show();
    } else if (currentHash === '#categories') {
        $("#categories").show();
    }
    else if (currentHash === '#comments') {
        $("#comments").show();
    }
}


function setBodyPaddingTop() {
    $("#admin-dshbp-body").css("padding-top", $(".navbar").innerHeight() + 'px');
}

function setMainHeight() {
    const navbarHeight = $(".navbar").innerHeight();
    const footerHeight = $("footer").innerHeight();
    $("#admin-dshbp-body main").css("min-height", "calc(100vh - " + navbarHeight + "px - " + footerHeight + "px)");
}

export const adminPageFunctions = {
    handleHashChange: handleHashChange,
    setBodyPaddingTop: setBodyPaddingTop,
    setMainHeight: setMainHeight
}