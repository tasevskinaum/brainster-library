import { filterBookElements } from "../../interfaces.js";
import { serverBaseURL } from "../../config.js";

const {
    filterList,
} = filterBookElements

    ;

function fillBookFilter() {
    $.ajax({
        url: serverBaseURL + "api/book/category/all",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            const jsonResponse = JSON.parse(response);

            if (jsonResponse.status == 200) {
                const categoriesData = jsonResponse.data;

                $(categoriesData).each(function (i, category) {
                    appendBookFilter(category);
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function renderBookFilter(category) {
    const checkboxId = category.category.toLowerCase();
    const checkbox = $('<input>', {
        type: 'checkbox',
        id: checkboxId,
        value: checkboxId,
        class: 'filter-book-checkbox'
    }).change(updateCardVisibility);

    const label = $('<label>', {
        for: checkboxId,
        text: category.category
    });

    return $('<li>').append(checkbox).append(label);
}

function updateCardVisibility() {
    const checkedCheckboxes = $(".filter-book-checkbox:checked");
    const allCards = $(".books .card");

    allCards.hide();

    if (checkedCheckboxes.length > 0) {
        checkedCheckboxes.each(function () {
            const classToShow = $(this).val();
            $(`.books .card.${classToShow}`).show();
        });
    } else {
        allCards.css("display", "grid");
    }
}


function appendBookFilter(category) {
    const filterOption = renderBookFilter(category);

    filterList.append(filterOption);
}

export const bookFilterFunctions = {
    fillBookFilter: fillBookFilter
}