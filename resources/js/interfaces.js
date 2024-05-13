// -------------------BOOK Admin panel-------------------
export const bookElements = {
    addBookForm: $("#add-book"),
    authorSelectOption: $("#author-select"),
    categorySelectOption: $("#category-select"),
    bookTitleInput: $("#book-title"),
    bookPagesNumberInput: $("#book-pages-number"),
    bookPublicationYearInput: $("#publication-year"),
    bookImgUrlInput: $("#book-img-url"),
    authorSelectFeedback: $("#adb-author-fdb"),
    categorySelectFeedback: $("#adb-category-fdb"),
    bookTitleFeedback: $("#adb-title-fdb"),
    bookPagesNumberFeedback: $("#adb-pages-number-fdb"),
    bookPublicationYearFeedback: $("#adb-publication-year-fdb"),
    bookImgUrlFeedback: $("#adb-img-url-fdb")
}
// ----------------AUTHOR Admin panel------------------
export const authorElements = {
    addAuthorForm: $("#add-author-form"),
    authorFirstnameInput: $("#author-firstname"),
    authorLastnameInput: $("#author-lastname"),
    authorBioInput: $("#author-bio"),
    authorFirstnameFeedback: $("#ada-firstname-fdb"),
    authorLastnameFeedback: $("#ada-lastname-fdb"),
    authorBioFeedback: $("#ada-author-bio-fdb"),
};
// ------------CATEGORY Admin panel--------------------
export const categoryElements = {
    addCategoryForm: $("#add-category-form"),
    categoryInput: $("#category"),
    categoryFeedback: $("#adc-firstname-fdb")
}
// -----------------------SIGNUP-------------------------
export const signupElements = {
    signupForm: $("#user-register-form"),
    signupFirstnameFeedback: $("#s-firstname-feedback"),
    signupLastnameFeedback: $("#s-lastname-feedback"),
    signupUsernameFeedback: $("#s-username-feedback"),
    signupEmailFeedback: $("#s-email-feedback"),
    signupPasswordFeedback: $("#s-password-feedback"),
    signupFirstnameInput: $("#signupFirstname"),
    signupLastnameInput: $("#signupLastname"),
    signupUsernameInput: $("#signupUsername"),
    signupEmailInput: $("#signupEmail"),
    signupPasswordInput: $("#signupPassword")
}
// -----------------------LOGIN-------------------------
export const loginElements = {
    logInForm: $("#user-log-in-form"),
    loginUsernameFeedback: $("#l-username-feedback"),
    loginPasswordFeedback: $("#l-password-feedback"),
    loginUsernameInput: $("#loginUsername"),
    loginPasswordInput: $("#loginPassword")
}
// -----------------------LOGOUT-------------------------
export const logoutElements = {
    logoutBtns: $(".log-out")
}
// ----------------books home page-----------------------
// Filter
export const filterBookElements = {
    filterBookBtn: $("#filter-books"),
    faAngleDown: $("#filter-books i.fa-angle-down"),
    filterChkeckboxes: $("#filter-book-checkboxes"),
    allCheckboxes: $(".filter-book-checkbox"),
    filterList: $(".ks-cboxtags")
}

// Books
export const homePageBooksElements = {
    bookContainer: $(".books"),
    allCard: $(".books .card")
}


// ----------------books page-----------------------
export const bookPageElements = {
    bookImg: $("#book-img"),
    bookInfoContainer: $("#book-info-container"),
    commentsContainer: $("#comments-container"),
    commentForm: $("#add-comment-form"),
    commentInput: $("#comment"),
    commentInputFeedback: $("#adc-book-fdb"),
    chooseComments: $("#choose-comments"),
    chooseNotes: $("#choose-notes"),
    notesContainer: $("#notes-container"),
    noteForm: $("#add-note-form"),
    noteTitleInput: $("#note-title"),
    notetTitleInputFeedback: $("#adnt-book-fdb"),
    noteInput: $("#note"),
    noteInputFeedback: $("#adn-book-fdb")
}