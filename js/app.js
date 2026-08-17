// =========================================================
// BLOCK 1
// APPLICATION SHELL
// =========================================================


// ---------------------------------------------------------
// MOBILE SIDEBAR ELEMENTS
// ---------------------------------------------------------

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );



// ---------------------------------------------------------
// OPEN MOBILE SIDEBAR
// ---------------------------------------------------------

function openSidebar() {

    sidebar.classList.add(
        "open"
    );


    sidebarOverlay.classList.remove(
        "hidden"
    );

}



// ---------------------------------------------------------
// CLOSE MOBILE SIDEBAR
// ---------------------------------------------------------

function closeSidebar() {

    sidebar.classList.remove(
        "open"
    );


    sidebarOverlay.classList.add(
        "hidden"
    );

}



// ---------------------------------------------------------
// MOBILE MENU BUTTON
// ---------------------------------------------------------

mobileMenuButton.addEventListener(
    "click",
    function() {

        const sidebarIsOpen =
            sidebar.classList.contains(
                "open"
            );


        if (sidebarIsOpen) {

            closeSidebar();

        }

        else {

            openSidebar();

        }

    }
);



// ---------------------------------------------------------
// CLOSE SIDEBAR WHEN OVERLAY IS CLICKED
// ---------------------------------------------------------

sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);



// =========================================================
// BLOCK 2
// BUDGET REQUESTS
// =========================================================


// ---------------------------------------------------------
// BLOCK 2 SCREEN ELEMENTS
// ---------------------------------------------------------

const budgetDashboardScreen =
    document.getElementById(
        "budgetDashboardScreen"
    );


const budgetSelectionScreen =
    document.getElementById(
        "budgetSelectionScreen"
    );


const createRequestButton =
    document.getElementById(
        "createRequestButton"
    );


const cancelBudgetSelection =
    document.getElementById(
        "cancelBudgetSelection"
    );


const programBudgetOption =
    document.getElementById(
        "programBudgetOption"
    );



// ---------------------------------------------------------
// SHOW BUDGET DASHBOARD
// ---------------------------------------------------------

function showBudgetDashboard() {

    budgetSelectionScreen.classList.add(
        "hidden"
    );


    budgetDashboardScreen.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// SHOW BUDGET SELECTION
// ---------------------------------------------------------

function showBudgetSelection() {

    budgetDashboardScreen.classList.add(
        "hidden"
    );


    budgetSelectionScreen.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// CREATE REQUEST
// ---------------------------------------------------------

createRequestButton.addEventListener(
    "click",
    showBudgetSelection
);



// ---------------------------------------------------------
// CANCEL BUDGET SELECTION
// ---------------------------------------------------------

cancelBudgetSelection.addEventListener(
    "click",
    showBudgetDashboard
);



// ---------------------------------------------------------
// PROGRAM / EVENT BUDGET
// ---------------------------------------------------------


// =========================================================
// BLOCK 3
// PERMANENT REQUEST WORKSPACE
// =========================================================


// ---------------------------------------------------------
// REQUEST WORKSPACE ELEMENTS
// ---------------------------------------------------------

const requestWorkspaceScreen =
    document.getElementById(
        "requestWorkspaceScreen"
    );


const selectedBudgetName =
    document.getElementById(
        "selectedBudgetName"
    );


const requestTab =
    document.getElementById(
        "requestTab"
    );


const additionalInformationTab =
    document.getElementById(
        "additionalInformationTab"
    );


const budgetTab =
    document.getElementById(
        "budgetTab"
    );


const cancelRequestButton =
    document.getElementById(
        "cancelRequestButton"
    );


const previousRequestButton =
    document.getElementById(
        "previousRequestButton"
    );


const nextRequestButton =
    document.getElementById(
        "nextRequestButton"
    );



// ---------------------------------------------------------
// BUDGET DISPLAY NAMES
// ---------------------------------------------------------

const budgetDisplayNames = {

    program:
        "Program/Event Supplemental Funding"

};



// ---------------------------------------------------------
// SHOW REQUEST WORKSPACE
// ---------------------------------------------------------

function showRequestWorkspace(
    budgetType
) {

    budgetDashboardScreen.classList.add(
        "hidden"
    );


    budgetSelectionScreen.classList.add(
        "hidden"
    );


    requestWorkspaceScreen.classList.remove(
        "hidden"
    );


    selectedBudgetName.textContent =
        budgetDisplayNames[budgetType];


    requestTab.classList.add(
        "active"
    );


    additionalInformationTab.classList.remove(
        "active"
    );


    budgetTab.classList.remove(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// PROGRAM / EVENT SELECTION
// ---------------------------------------------------------

programBudgetOption.addEventListener(
    "click",
    function() {

        showRequestWorkspace(
            "program"
        );

    }
);



// ---------------------------------------------------------
// CANCEL / FINISH LATER
// ---------------------------------------------------------

cancelRequestButton.addEventListener(
    "click",
    async function() {

        // =====================================
        // FIRST REQUEST PAGE = CANCEL
        // =====================================

        if (
            cancelRequestButton.textContent.trim() ===
            "CANCEL"
        ) {

            requestWorkspaceScreen.classList.add(
                "hidden"
            );


            showBudgetSelection();


            return;

        }


        // =====================================
// LATER PAGES = FINISH LATER
// =====================================

saveCurrentRequestProgress();


const supabaseSaveWorked =
    await saveCurrentRequestToSupabase();


if (!supabaseSaveWorked) {

    console.error(
        "Supabase draft save failed."
    );


    return;

}


requestWorkspaceScreen.classList.add(
    "hidden"
);


showBudgetDashboard();


updateSavedRequestDisplay();

    }
);



// =========================================================
// BLOCK 4
// REQUEST PAGE
// =========================================================


// ---------------------------------------------------------
// REQUEST PAGE ELEMENTS
// ---------------------------------------------------------

const requestBasicPage =
    document.getElementById(
        "requestBasicPage"
    );


const policyAcknowledgementPage =
    document.getElementById(
        "policyAcknowledgementPage"
    );


const requestBasicForm =
    document.getElementById(
        "requestBasicForm"
    );


const requestTitle =
    document.getElementById(
        "requestTitle"
    );


const requestDescription =
    document.getElementById(
        "requestDescription"
    );


const requestTitleError =
    document.getElementById(
        "requestTitleError"
    );



// ---------------------------------------------------------
// REQUEST DATA
// ---------------------------------------------------------

const requestData = {

    title: "",

    description: ""

};



// ---------------------------------------------------------
// SHOW REQUEST PAGE
// ---------------------------------------------------------

function showRequestBasicPage() {

    requestBasicPage.classList.remove(
        "hidden"
    );


    policyAcknowledgementPage.classList.add(
        "hidden"
    );


    requestTab.classList.add(
        "active"
    );


    additionalInformationTab.classList.remove(
        "active"
    );


    budgetTab.classList.remove(
        "active"
    );


    previousRequestButton.disabled = true;


    nextRequestButton.disabled = false;


    cancelRequestButton.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// SHOW POLICY PLACEHOLDER
// ---------------------------------------------------------





// ---------------------------------------------------------
// VALIDATE REQUEST TITLE
// ---------------------------------------------------------

function validateRequestPage() {

    const titleValue =
        requestTitle.value.trim();


    if (titleValue === "") {

        requestTitle.classList.add(
            "input-error"
        );


        requestTitleError.classList.remove(
            "hidden"
        );


        requestTitle.focus();


        return false;

    }


    requestTitle.classList.remove(
        "input-error"
    );


    requestTitleError.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// SAVE REQUEST DATA
// ---------------------------------------------------------

function saveRequestPage() {

    requestData.title =
        requestTitle.value.trim();


    requestData.description =
        requestDescription.value.trim();

}


// ---------------------------------------------------------
// NEXT / SUBMIT BUTTON
// ---------------------------------------------------------

nextRequestButton.addEventListener(
    "click",
    async function() {

        // =====================================
        // REQUEST PAGE
        // =====================================

        if (
            !requestBasicPage.classList.contains(
                "hidden"
            )
        ) {

            const validRequest =
                validateRequestPage();


            if (!validRequest) {

                return;

            }


            saveRequestPage();


            openPolicyPage();


            return;

        }



        // =====================================
        // POLICY PAGE
        // =====================================

        if (
            !policyAcknowledgementPage.classList.contains(
                "hidden"
            )
        ) {

            const validPolicy =
                validatePolicyPage();


            if (!validPolicy) {

                return;

            }


            savePolicyPage();


            openOrganizationInformationPage();


            return;

        }



        // =====================================
        // ORGANIZATION INFORMATION
        // =====================================

        if (
            !organizationInformationPage.classList.contains(
                "hidden"
            )
        ) {

            const validOrganization =
                validateOrganizationInformationPage();


            if (!validOrganization) {

                return;

            }


            saveOrganizationInformationPage();


            if (
                organizationInformationData
                    .previousSabacFunding ===
                "yes"
            ) {

                openPreviousSabacFundingPage();

            }

            else {

                openProgramFundingPage();

            }


            return;

        }



        // =====================================
        // PREVIOUS SABAC FUNDING
        // =====================================

        if (
            !previousSabacFundingPage.classList.contains(
                "hidden"
            )
        ) {

            const validPreviousSabac =
                validatePreviousSabacFundingPage();


            if (!validPreviousSabac) {

                return;

            }


            savePreviousSabacFundingPage();


            openProgramFundingPage();


            return;

        }



        // =====================================
        // PROGRAM FUNDING
        // =====================================

        if (
            !programFundingPage.classList.contains(
                "hidden"
            )
        ) {

            const validProgramFunding =
                validateProgramFundingPage();


            if (!validProgramFunding) {

                return;

            }


            saveProgramFundingPage();


            openBudgetPage();


            return;

        }



        // =====================================
// BUDGET / SUBMIT
// =====================================

if (
    !budgetPage.classList.contains(
        "hidden"
    )
) {

    if (
        budgetItems.length === 0
    ) {

        budgetItemsError.classList.remove(
            "hidden"
        );


        budgetItemsError.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });


        return;

    }


    budgetItemsError.classList.add(
        "hidden"
    );


    await submitBudgetRequest();


    return;

}

    }
);
// ---------------------------------------------------------
// PREVIOUS BUTTON
// ---------------------------------------------------------

previousRequestButton.addEventListener(
    "click",
    function() {

        // =====================================
        // POLICY → REQUEST
        // =====================================

        if (
            !policyAcknowledgementPage.classList.contains(
                "hidden"
            )
        ) {

            configureRequestNavigation();


            showRequestBasicPage();


            return;

        }



        // =====================================
        // ORGANIZATION → POLICY
        // =====================================

        if (
            !organizationInformationPage.classList.contains(
                "hidden"
            )
        ) {

            openPolicyPage();


            return;

        }



        // =====================================
        // PREVIOUS SABAC → ORGANIZATION
        // =====================================

        if (
            !previousSabacFundingPage.classList.contains(
                "hidden"
            )
        ) {

            openOrganizationInformationPage();


            return;

        }



        // =====================================
        // PROGRAM FUNDING → PREVIOUS PAGE
        // =====================================

        if (
            !programFundingPage.classList.contains(
                "hidden"
            )
        ) {

            // If previous SABAC funding was Yes,
            // return to the Previous SABAC page.
            if (
                organizationInformationData
                    .previousSabacFunding ===
                "yes"
            ) {

                openPreviousSabacFundingPage();

            }


            // Otherwise return directly to
            // Organization Information.
            else {

                openOrganizationInformationPage();

            }


            return;

        }



        // =====================================
        // BUDGET → PROGRAM FUNDING
        // =====================================

        if (
            !budgetPage.classList.contains(
                "hidden"
            )
        ) {

            openProgramFundingPage();


            return;

        }

    }
);



// =========================================================
// BLOCK 5
// POLICY / ACKNOWLEDGEMENTS
// =========================================================


// ---------------------------------------------------------
// BLOCK 5 ELEMENTS
// ---------------------------------------------------------

const policyAcknowledgementForm =
    document.getElementById(
        "policyAcknowledgementForm"
    );


const organizationInformationPage =
    document.getElementById(
        "organizationInformationPage"
    );


const policyTermsName =
    document.getElementById(
        "policyTermsName"
    );


const policyRestrictedItemsName =
    document.getElementById(
        "policyRestrictedItemsName"
    );


const policyAppealName =
    document.getElementById(
        "policyAppealName"
    );


const policyAttendanceName =
    document.getElementById(
        "policyAttendanceName"
    );



// ---------------------------------------------------------
// ERROR ELEMENTS
// ---------------------------------------------------------

const policyTermsNameError =
    document.getElementById(
        "policyTermsNameError"
    );


const policyRestrictedItemsNameError =
    document.getElementById(
        "policyRestrictedItemsNameError"
    );


const policyAppealNameError =
    document.getElementById(
        "policyAppealNameError"
    );


const policyAttendanceNameError =
    document.getElementById(
        "policyAttendanceNameError"
    );



// ---------------------------------------------------------
// POLICY DATA
// ---------------------------------------------------------

const policyAcknowledgementData = {

    termsName: "",

    restrictedItemsName: "",

    appealName: "",

    attendanceName: ""

};



// ---------------------------------------------------------
// CONFIGURE NAVIGATION FOR POLICY PAGE
// ---------------------------------------------------------

function configurePolicyNavigation() {

    cancelRequestButton.textContent =
        "FINISH LATER";


    previousRequestButton.disabled =
        false;


    nextRequestButton.disabled =
        false;


    nextRequestButton.textContent =
        "SAVE AND NEXT ›";

}



// ---------------------------------------------------------
// CONFIGURE NAVIGATION FOR REQUEST PAGE
// ---------------------------------------------------------

function configureRequestNavigation() {

    cancelRequestButton.textContent =
        "CANCEL";


    previousRequestButton.disabled =
        true;


    nextRequestButton.disabled =
        false;


    nextRequestButton.textContent =
        "NEXT ›";

}



// ---------------------------------------------------------
// SHOW POLICY PAGE
// ---------------------------------------------------------

function openPolicyPage() {

    requestBasicPage.classList.add(
        "hidden"
    );


    organizationInformationPage.classList.add(
        "hidden"
    );


    policyAcknowledgementPage.classList.remove(
        "hidden"
    );


    requestTab.classList.remove(
        "active"
    );


    additionalInformationTab.classList.add(
        "active"
    );


    additionalInformationTab.disabled =
        false;


    budgetTab.classList.remove(
        "active"
    );


    configurePolicyNavigation();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// VALIDATE ONE ACKNOWLEDGEMENT
// ---------------------------------------------------------

function validatePolicyInput(
    input,
    error
) {

    if (
        input.value.trim() === ""
    ) {

        input.classList.add(
            "input-error"
        );


        error.classList.remove(
            "hidden"
        );


        return false;

    }


    input.classList.remove(
        "input-error"
    );


    error.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// VALIDATE POLICY PAGE
// ---------------------------------------------------------

function validatePolicyPage() {

    const termsValid =
        validatePolicyInput(
            policyTermsName,
            policyTermsNameError
        );


    const restrictedValid =
        validatePolicyInput(
            policyRestrictedItemsName,
            policyRestrictedItemsNameError
        );


    const appealValid =
        validatePolicyInput(
            policyAppealName,
            policyAppealNameError
        );


    const attendanceValid =
        validatePolicyInput(
            policyAttendanceName,
            policyAttendanceNameError
        );


    if (!termsValid) {

        policyTermsName.focus();

        return false;

    }


    if (!restrictedValid) {

        policyRestrictedItemsName.focus();

        return false;

    }


    if (!appealValid) {

        policyAppealName.focus();

        return false;

    }


    if (!attendanceValid) {

        policyAttendanceName.focus();

        return false;

    }


    return true;

}



// ---------------------------------------------------------
// SAVE POLICY PAGE
// ---------------------------------------------------------

function savePolicyPage() {

    policyAcknowledgementData.termsName =
        policyTermsName.value.trim();


    policyAcknowledgementData.restrictedItemsName =
        policyRestrictedItemsName.value.trim();


    policyAcknowledgementData.appealName =
        policyAppealName.value.trim();


    policyAcknowledgementData.attendanceName =
        policyAttendanceName.value.trim();

}



// ---------------------------------------------------------
// SHOW ORGANIZATION PLACEHOLDER
// ---------------------------------------------------------




// ---------------------------------------------------------
// REMOVE POLICY ERRORS WHILE TYPING
// ---------------------------------------------------------

const policyInputs = [

    {
        input: policyTermsName,
        error: policyTermsNameError
    },

    {
        input: policyRestrictedItemsName,
        error: policyRestrictedItemsNameError
    },

    {
        input: policyAppealName,
        error: policyAppealNameError
    },

    {
        input: policyAttendanceName,
        error: policyAttendanceNameError
    }

];


policyInputs.forEach(
    function(item) {

        item.input.addEventListener(
            "input",
            function() {

                if (
                    item.input.value.trim() !== ""
                ) {

                    item.input.classList.remove(
                        "input-error"
                    );


                    item.error.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);



// =========================================================
// BLOCK 6
// ORGANIZATION INFORMATION
// =========================================================


// ---------------------------------------------------------
// PAGE ELEMENTS
// ---------------------------------------------------------

const organizationInformationForm =
    document.getElementById(
        "organizationInformationForm"
    );


const organizationRequestTitle =
    document.getElementById(
        "organizationRequestTitle"
    );


const previousSabacFundingPage =
    document.getElementById(
        "previousSabacFundingPage"
    );


const programFundingPage =
    document.getElementById(
        "programFundingPage"
    );



// ---------------------------------------------------------
// CONTACT FIELDS
// ---------------------------------------------------------

const presidentName =
    document.getElementById(
        "presidentName"
    );


const presidentEmail =
    document.getElementById(
        "presidentEmail"
    );


const presidentPhone =
    document.getElementById(
        "presidentPhone"
    );


const treasurerName =
    document.getElementById(
        "treasurerName"
    );


const treasurerEmail =
    document.getElementById(
        "treasurerEmail"
    );


const treasurerPhone =
    document.getElementById(
        "treasurerPhone"
    );


const advisorName =
    document.getElementById(
        "advisorName"
    );


const advisorEmail =
    document.getElementById(
        "advisorEmail"
    );


const advisorPhone =
    document.getElementById(
        "advisorPhone"
    );


const additionalContacts =
    document.getElementById(
        "additionalContacts"
    );



// ---------------------------------------------------------
// ERROR ELEMENTS
// ---------------------------------------------------------

const presidentNameError =
    document.getElementById(
        "presidentNameError"
    );


const presidentEmailError =
    document.getElementById(
        "presidentEmailError"
    );


const presidentPhoneError =
    document.getElementById(
        "presidentPhoneError"
    );


const treasurerNameError =
    document.getElementById(
        "treasurerNameError"
    );


const treasurerEmailError =
    document.getElementById(
        "treasurerEmailError"
    );


const treasurerPhoneError =
    document.getElementById(
        "treasurerPhoneError"
    );


const advisorNameError =
    document.getElementById(
        "advisorNameError"
    );


const advisorEmailError =
    document.getElementById(
        "advisorEmailError"
    );


const advisorPhoneError =
    document.getElementById(
        "advisorPhoneError"
    );


const sabacPresentationError =
    document.getElementById(
        "sabacPresentationError"
    );


const previousSabacFundingError =
    document.getElementById(
        "previousSabacFundingError"
    );



// ---------------------------------------------------------
// ORGANIZATION DATA
// ---------------------------------------------------------

const organizationInformationData = {

    president: {
        name: "",
        email: "",
        phone: ""
    },

    treasurer: {
        name: "",
        email: "",
        phone: ""
    },

    advisor: {
        name: "",
        email: "",
        phone: ""
    },

    additionalContacts: "",

    sabacPresentation: "",

    previousSabacFunding: "",

    requestNature: "program"

};



// ---------------------------------------------------------
// SHOW ORGANIZATION PAGE
// ---------------------------------------------------------

function openOrganizationInformationPage() {

    policyAcknowledgementPage.classList.add(
        "hidden"
    );


    previousSabacFundingPage.classList.add(
        "hidden"
    );


    programFundingPage.classList.add(
        "hidden"
    );


    organizationInformationPage.classList.remove(
        "hidden"
    );


    requestTab.classList.remove(
        "active"
    );


    additionalInformationTab.classList.add(
        "active"
    );


    budgetTab.classList.remove(
        "active"
    );


    organizationRequestTitle.textContent =
        requestData.title || "-";


    cancelRequestButton.textContent =
        "FINISH LATER";


    previousRequestButton.disabled =
        false;


    nextRequestButton.disabled =
        false;


    nextRequestButton.textContent =
        "SAVE AND NEXT ›";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// VALIDATE TEXT FIELD
// ---------------------------------------------------------

function validateRequiredField(
    input,
    error
) {

    if (
        input.value.trim() === ""
    ) {

        input.classList.add(
            "input-error"
        );


        error.classList.remove(
            "hidden"
        );


        return false;

    }


    input.classList.remove(
        "input-error"
    );


    error.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// VALIDATE EMAIL
// ---------------------------------------------------------

function validateEmailField(
    input,
    error
) {

    const value =
        input.value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        value === "" ||
        !emailPattern.test(value)
    ) {

        input.classList.add(
            "input-error"
        );


        error.classList.remove(
            "hidden"
        );


        return false;

    }


    input.classList.remove(
        "input-error"
    );


    error.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// VALIDATE ORGANIZATION PAGE
// ---------------------------------------------------------

function validateOrganizationInformationPage() {

    const presidentNameValid =
        validateRequiredField(
            presidentName,
            presidentNameError
        );


    const presidentEmailValid =
        validateEmailField(
            presidentEmail,
            presidentEmailError
        );


    const presidentPhoneValid =
        validateRequiredField(
            presidentPhone,
            presidentPhoneError
        );


    const treasurerNameValid =
        validateRequiredField(
            treasurerName,
            treasurerNameError
        );


    const treasurerEmailValid =
        validateEmailField(
            treasurerEmail,
            treasurerEmailError
        );


    const treasurerPhoneValid =
        validateRequiredField(
            treasurerPhone,
            treasurerPhoneError
        );


    const advisorNameValid =
        validateRequiredField(
            advisorName,
            advisorNameError
        );


    const advisorEmailValid =
        validateEmailField(
            advisorEmail,
            advisorEmailError
        );


    const advisorPhoneValid =
        validateRequiredField(
            advisorPhone,
            advisorPhoneError
        );


    const sabacPresentation =
        document.querySelector(
            'input[name="sabacPresentation"]:checked'
        );


    const previousSabacFunding =
        document.querySelector(
            'input[name="receivedPreviousSabacFunding"]:checked'
        );


    if (!sabacPresentation) {

        sabacPresentationError.classList.remove(
            "hidden"
        );

    }

    else {

        sabacPresentationError.classList.add(
            "hidden"
        );

    }


    if (!previousSabacFunding) {

        previousSabacFundingError.classList.remove(
            "hidden"
        );

    }

    else {

        previousSabacFundingError.classList.add(
            "hidden"
        );

    }


    const pageValid =
        presidentNameValid &&
        presidentEmailValid &&
        presidentPhoneValid &&
        treasurerNameValid &&
        treasurerEmailValid &&
        treasurerPhoneValid &&
        advisorNameValid &&
        advisorEmailValid &&
        advisorPhoneValid &&
        Boolean(sabacPresentation) &&
        Boolean(previousSabacFunding);


    if (!pageValid) {

        const firstError =
            organizationInformationForm.querySelector(
                ".input-error"
            );


        if (firstError) {

            firstError.focus();

        }

    }


    return pageValid;

}



// ---------------------------------------------------------
// SAVE ORGANIZATION PAGE
// ---------------------------------------------------------

function saveOrganizationInformationPage() {

    const sabacPresentation =
        document.querySelector(
            'input[name="sabacPresentation"]:checked'
        );


    const previousSabacFunding =
        document.querySelector(
            'input[name="receivedPreviousSabacFunding"]:checked'
        );


    const requestNature =
        document.querySelector(
            'input[name="requestNature"]:checked'
        );


    organizationInformationData.president.name =
        presidentName.value.trim();


    organizationInformationData.president.email =
        presidentEmail.value.trim();


    organizationInformationData.president.phone =
        presidentPhone.value.trim();


    organizationInformationData.treasurer.name =
        treasurerName.value.trim();


    organizationInformationData.treasurer.email =
        treasurerEmail.value.trim();


    organizationInformationData.treasurer.phone =
        treasurerPhone.value.trim();


    organizationInformationData.advisor.name =
        advisorName.value.trim();


    organizationInformationData.advisor.email =
        advisorEmail.value.trim();


    organizationInformationData.advisor.phone =
        advisorPhone.value.trim();


    organizationInformationData.additionalContacts =
        additionalContacts.value.trim();


    organizationInformationData.sabacPresentation =
        sabacPresentation
            ? sabacPresentation.value
            : "";


    organizationInformationData.previousSabacFunding =
        previousSabacFunding
            ? previousSabacFunding.value
            : "";


    organizationInformationData.requestNature =
        requestNature
            ? requestNature.value
            : "program";

}



// ---------------------------------------------------------
// SHOW PREVIOUS SABAC PLACEHOLDER
// ---------------------------------------------------------

function openPreviousSabacFundingPage() {

    organizationInformationPage.classList.add(
        "hidden"
    );


    programFundingPage.classList.add(
        "hidden"
    );


    previousSabacFundingPage.classList.remove(
        "hidden"
    );


    previousRequestButton.disabled =
        false;


    nextRequestButton.disabled =
        false;


    cancelRequestButton.textContent =
        "FINISH LATER";


    nextRequestButton.textContent =
        "SAVE AND NEXT ›";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =========================================================
// BLOCK 7
// PREVIOUS SABAC FUNDING
// =========================================================


// ---------------------------------------------------------
// PAGE ELEMENTS
// ---------------------------------------------------------

const previousSabacFundingForm =
    document.getElementById(
        "previousSabacFundingForm"
    );


const previousSabacStatement =
    document.getElementById(
        "previousSabacStatement"
    );


const previousSabacStatementError =
    document.getElementById(
        "previousSabacStatementError"
    );



// ---------------------------------------------------------
// PREVIOUS SABAC DATA
// ---------------------------------------------------------

const previousSabacFundingData = {

    statement: ""

};



// ---------------------------------------------------------
// VALIDATE PREVIOUS SABAC PAGE
// ---------------------------------------------------------

function validatePreviousSabacFundingPage() {

    const statementValue =
        previousSabacStatement.value.trim();


    if (statementValue === "") {

        previousSabacStatement.classList.add(
            "input-error"
        );


        previousSabacStatementError.classList.remove(
            "hidden"
        );


        previousSabacStatement.focus();


        return false;

    }


    previousSabacStatement.classList.remove(
        "input-error"
    );


    previousSabacStatementError.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// SAVE PREVIOUS SABAC PAGE
// ---------------------------------------------------------

function savePreviousSabacFundingPage() {

    previousSabacFundingData.statement =
        previousSabacStatement.value.trim();

}



// ---------------------------------------------------------
// REMOVE ERROR WHILE TYPING
// ---------------------------------------------------------

previousSabacStatement.addEventListener(
    "input",
    function() {

        if (
            previousSabacStatement.value.trim() !== ""
        ) {

            previousSabacStatement.classList.remove(
                "input-error"
            );


            previousSabacStatementError.classList.add(
                "hidden"
            );

        }

    }
);


// ---------------------------------------------------------
// ORGANIZATION TEXT FIELD ERROR HANDLING
// ---------------------------------------------------------

const organizationRequiredFields = [

    {
        input: presidentName,
        error: presidentNameError
    },

    {
        input: presidentPhone,
        error: presidentPhoneError
    },

    {
        input: treasurerName,
        error: treasurerNameError
    },

    {
        input: treasurerPhone,
        error: treasurerPhoneError
    },

    {
        input: advisorName,
        error: advisorNameError
    },

    {
        input: advisorPhone,
        error: advisorPhoneError
    }

];


organizationRequiredFields.forEach(
    function(item) {

        item.input.addEventListener(
            "input",
            function() {

                if (
                    item.input.value.trim() !== ""
                ) {

                    item.input.classList.remove(
                        "input-error"
                    );


                    item.error.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);

const organizationEmailFields = [

    {
        input: presidentEmail,
        error: presidentEmailError
    },

    {
        input: treasurerEmail,
        error: treasurerEmailError
    },

    {
        input: advisorEmail,
        error: advisorEmailError
    }

];


organizationEmailFields.forEach(
    function(item) {

        item.input.addEventListener(
            "input",
            function() {

                item.input.classList.remove(
                    "input-error"
                );


                item.error.classList.add(
                    "hidden"
                );

            }
        );

    }
);

const sabacPresentationRadios =
    document.querySelectorAll(
        'input[name="sabacPresentation"]'
    );


sabacPresentationRadios.forEach(
    function(radio) {

        radio.addEventListener(
            "change",
            function() {

                sabacPresentationError.classList.add(
                    "hidden"
                );

            }
        );

    }
);



const previousSabacFundingRadios =
    document.querySelectorAll(
        'input[name="receivedPreviousSabacFunding"]'
    );


previousSabacFundingRadios.forEach(
    function(radio) {

        radio.addEventListener(
            "change",
            function() {

                previousSabacFundingError.classList.add(
                    "hidden"
                );

            }
        );

    }
);

// =========================================================
// BLOCK 8
// PROGRAM FUNDING INFORMATION
// =========================================================


// ---------------------------------------------------------
// PAGE ELEMENTS
// ---------------------------------------------------------

const programFundingForm =
    document.getElementById(
        "programFundingForm"
    );


const budgetPage =
    document.getElementById(
        "budgetPage"
    );



// ---------------------------------------------------------
// PROGRAM FIELDS
// ---------------------------------------------------------

const programName =
    document.getElementById(
        "programName"
    );


const programLocation =
    document.getElementById(
        "programLocation"
    );


const programDate =
    document.getElementById(
        "programDate"
    );


const programDescription =
    document.getElementById(
        "programDescription"
    );


const studentParticipants =
    document.getElementById(
        "studentParticipants"
    );


const staffParticipants =
    document.getElementById(
        "staffParticipants"
    );


const offCampusParticipants =
    document.getElementById(
        "offCampusParticipants"
    );



// ---------------------------------------------------------
// ERROR ELEMENTS
// ---------------------------------------------------------

const programNameError =
    document.getElementById(
        "programNameError"
    );


const programLocationError =
    document.getElementById(
        "programLocationError"
    );


const programDateError =
    document.getElementById(
        "programDateError"
    );


const programDescriptionError =
    document.getElementById(
        "programDescriptionError"
    );


const studentParticipantsError =
    document.getElementById(
        "studentParticipantsError"
    );


const staffParticipantsError =
    document.getElementById(
        "staffParticipantsError"
    );


const offCampusParticipantsError =
    document.getElementById(
        "offCampusParticipantsError"
    );



// ---------------------------------------------------------
// PROGRAM FUNDING DATA
// ---------------------------------------------------------

const programFundingData = {

    programName: "",

    programLocation: "",

    programDate: "",

    programDescription: "",

    studentParticipants: "",

    staffParticipants: "",

    offCampusParticipants: ""

};



// ---------------------------------------------------------
// OPEN PROGRAM FUNDING PAGE
// ---------------------------------------------------------

function openProgramFundingPage() {

    organizationInformationPage.classList.add(
        "hidden"
    );


    previousSabacFundingPage.classList.add(
        "hidden"
    );


    budgetPage.classList.add(
        "hidden"
    );


    programFundingPage.classList.remove(
        "hidden"
    );


    requestTab.classList.remove(
        "active"
    );


    additionalInformationTab.classList.add(
        "active"
    );


    budgetTab.classList.remove(
        "active"
    );


    cancelRequestButton.textContent =
        "FINISH LATER";


    previousRequestButton.disabled =
        false;


    nextRequestButton.disabled =
        false;


    nextRequestButton.textContent =
        "SAVE AND NEXT ›";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ---------------------------------------------------------
// VALIDATE NUMBER FIELD
// ---------------------------------------------------------

function validateParticipantField(
    input,
    error
) {

    const value =
        input.value.trim();


    if (
        value === "" ||
        Number(value) < 0
    ) {

        input.classList.add(
            "input-error"
        );


        error.classList.remove(
            "hidden"
        );


        return false;

    }


    input.classList.remove(
        "input-error"
    );


    error.classList.add(
        "hidden"
    );


    return true;

}



// ---------------------------------------------------------
// VALIDATE PROGRAM FUNDING PAGE
// ---------------------------------------------------------

function validateProgramFundingPage() {

    const programNameValid =
        validateRequiredField(
            programName,
            programNameError
        );


    const locationValid =
        validateRequiredField(
            programLocation,
            programLocationError
        );


    const dateValid =
        validateRequiredField(
            programDate,
            programDateError
        );


    const descriptionValid =
        validateRequiredField(
            programDescription,
            programDescriptionError
        );


    const studentsValid =
        validateParticipantField(
            studentParticipants,
            studentParticipantsError
        );


    const staffValid =
        validateParticipantField(
            staffParticipants,
            staffParticipantsError
        );


    const offCampusValid =
        validateParticipantField(
            offCampusParticipants,
            offCampusParticipantsError
        );


    const pageValid =
        programNameValid &&
        locationValid &&
        dateValid &&
        descriptionValid &&
        studentsValid &&
        staffValid &&
        offCampusValid;


    if (!pageValid) {

        const firstError =
            programFundingForm.querySelector(
                ".input-error"
            );


        if (firstError) {

            firstError.focus();

        }

    }


    return pageValid;

}



// ---------------------------------------------------------
// SAVE PROGRAM FUNDING PAGE
// ---------------------------------------------------------

function saveProgramFundingPage() {

    programFundingData.programName =
        programName.value.trim();


    programFundingData.programLocation =
        programLocation.value.trim();


    programFundingData.programDate =
        programDate.value.trim();


    programFundingData.programDescription =
        programDescription.value.trim();


    programFundingData.studentParticipants =
        studentParticipants.value.trim();


    programFundingData.staffParticipants =
        staffParticipants.value.trim();


    programFundingData.offCampusParticipants =
        offCampusParticipants.value.trim();

}



// ---------------------------------------------------------
// OPEN BUDGET PAGE
// ---------------------------------------------------------

function openBudgetPage() {

    programFundingPage.classList.add(
        "hidden"
    );


    budgetPage.classList.remove(
        "hidden"
    );


    requestTab.classList.remove(
        "active"
    );


    additionalInformationTab.classList.remove(
        "active"
    );


    budgetTab.disabled =
        false;


    budgetTab.classList.add(
        "active"
    );


    cancelRequestButton.textContent =
        "FINISH LATER";


    previousRequestButton.disabled =
        false;


    nextRequestButton.disabled =
        false;


    nextRequestButton.textContent =
        "SUBMIT";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ---------------------------------------------------------
// PROGRAM TEXT FIELD ERROR HANDLING
// ---------------------------------------------------------

const programRequiredFields = [

    {
        input: programName,
        error: programNameError
    },

    {
        input: programLocation,
        error: programLocationError
    },

    {
        input: programDate,
        error: programDateError
    },

    {
        input: programDescription,
        error: programDescriptionError
    }

];


programRequiredFields.forEach(
    function(item) {

        item.input.addEventListener(
            "input",
            function() {

                if (
                    item.input.value.trim() !== ""
                ) {

                    item.input.classList.remove(
                        "input-error"
                    );


                    item.error.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);

// ---------------------------------------------------------
// PARTICIPANT FIELD ERROR HANDLING
// ---------------------------------------------------------

const participantFields = [

    {
        input: studentParticipants,
        error: studentParticipantsError
    },

    {
        input: staffParticipants,
        error: staffParticipantsError
    },

    {
        input: offCampusParticipants,
        error: offCampusParticipantsError
    }

];


participantFields.forEach(
    function(item) {

        item.input.addEventListener(
            "input",
            function() {

                if (
                    item.input.value !== "" &&
                    Number(item.input.value) >= 0
                ) {

                    item.input.classList.remove(
                        "input-error"
                    );


                    item.error.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);

// =========================================================
// BLOCK 9
// BUDGET SCREEN
// =========================================================


// ---------------------------------------------------------
// BUDGET PAGE ELEMENTS
// ---------------------------------------------------------

const openBudgetModal =
    document.getElementById(
        "openBudgetModal"
    );


const budgetItemList =
    document.getElementById(
        "budgetItemList"
    );


const emptyBudgetMessage =
    document.getElementById(
        "emptyBudgetMessage"
    );


const requestedTotal =
    document.getElementById(
        "requestedTotal"
    );


const budgetItemCount =
    document.getElementById(
        "budgetItemCount"
    );


const budgetItemsError =
    document.getElementById(
        "budgetItemsError"
    );



// ---------------------------------------------------------
// BUDGET DATA
// ---------------------------------------------------------

const budgetItems = [];



// ---------------------------------------------------------
// UPDATE BUDGET SUMMARY
// ---------------------------------------------------------

function updateBudgetSummary() {

    let totalAmount = 0;


    budgetItems.forEach(
        function(item) {

            totalAmount +=
                Number(item.total) || 0;

        }
    );


    requestedTotal.textContent =
        "$" +
        totalAmount.toFixed(2);


    budgetItemCount.textContent =
        budgetItems.length;

}

// =========================================================
// BLOCK 10
// BUDGET ITEM MODAL
// =========================================================


// ---------------------------------------------------------
// MODAL ELEMENTS
// ---------------------------------------------------------

const budgetModalOverlay =
    document.getElementById(
        "budgetModalOverlay"
    );


const closeBudgetModal =
    document.getElementById(
        "closeBudgetModal"
    );


const cancelBudgetItem =
    document.getElementById(
        "cancelBudgetItem"
    );


const saveBudgetItem =
    document.getElementById(
        "saveBudgetItem"
    );


const budgetModalTitle =
    document.getElementById(
        "budgetModalTitle"
    );


const budgetItemForm =
    document.getElementById(
        "budgetItemForm"
    );



// ---------------------------------------------------------
// BUDGET ITEM FIELDS
// ---------------------------------------------------------

const budgetItemCategory =
    document.getElementById(
        "budgetItemCategory"
    );


const budgetItemName =
    document.getElementById(
        "budgetItemName"
    );


const budgetItemDescription =
    document.getElementById(
        "budgetItemDescription"
    );


const budgetItemQuantity =
    document.getElementById(
        "budgetItemQuantity"
    );


const budgetItemPrice =
    document.getElementById(
        "budgetItemPrice"
    );


const budgetItemTotal =
    document.getElementById(
        "budgetItemTotal"
    );


const budgetItemFile =
    document.getElementById(
        "budgetItemFile"
    );


const budgetItemFileName =
    document.getElementById(
        "budgetItemFileName"
    );



// ---------------------------------------------------------
// ERROR ELEMENTS
// ---------------------------------------------------------

const budgetItemCategoryError =
    document.getElementById(
        "budgetItemCategoryError"
    );


const budgetItemNameError =
    document.getElementById(
        "budgetItemNameError"
    );


const budgetItemDescriptionError =
    document.getElementById(
        "budgetItemDescriptionError"
    );


const budgetItemQuantityError =
    document.getElementById(
        "budgetItemQuantityError"
    );


const budgetItemPriceError =
    document.getElementById(
        "budgetItemPriceError"
    );



// ---------------------------------------------------------
// CURRENT EDITED ITEM
// ---------------------------------------------------------

let editingBudgetItemIndex =
    null;



// ---------------------------------------------------------
// FORMAT CURRENCY
// ---------------------------------------------------------

function formatBudgetCurrency(
    amount
) {

    return (
        "$" +
        Number(amount).toFixed(2)
    );

}



// ---------------------------------------------------------
// CALCULATE ITEM TOTAL
// ---------------------------------------------------------

function calculateBudgetItemTotal() {

    const quantity =
        Number(
            budgetItemQuantity.value
        ) || 0;


    const cost =
        Number(
            budgetItemPrice.value
        ) || 0;


    const total =
        quantity * cost;


    budgetItemTotal.textContent =
        formatBudgetCurrency(
            total
        );


    return total;

}



// ---------------------------------------------------------
// RESET MODAL
// ---------------------------------------------------------

function resetBudgetItemModal() {

    budgetItemForm.reset();


    budgetItemQuantity.value =
        "1";


    budgetItemPrice.value =
        "";


    budgetItemTotal.textContent =
        "$0.00";


    budgetItemFileName.textContent =
        "";


    budgetItemFileName.classList.add(
        "hidden"
    );


    const fields = [

        budgetItemCategory,
        budgetItemName,
        budgetItemDescription,
        budgetItemQuantity,
        budgetItemPrice

    ];


    fields.forEach(
        function(field) {

            field.classList.remove(
                "input-error"
            );

        }
    );


    const errors = [

        budgetItemCategoryError,
        budgetItemNameError,
        budgetItemDescriptionError,
        budgetItemQuantityError,
        budgetItemPriceError

    ];


    errors.forEach(
        function(error) {

            error.classList.add(
                "hidden"
            );

        }
    );


    editingBudgetItemIndex =
        null;


    budgetModalTitle.textContent =
        "Add Line Item";


    saveBudgetItem.textContent =
        "ADD ITEM";

}



// ---------------------------------------------------------
// OPEN NEW ITEM MODAL
// ---------------------------------------------------------

function openNewBudgetItemModal() {

    resetBudgetItemModal();


    budgetModalOverlay.classList.remove(
        "hidden"
    );


    budgetItemCategory.focus();

}



// ---------------------------------------------------------
// CLOSE MODAL
// ---------------------------------------------------------

function closeBudgetItemModal() {

    budgetModalOverlay.classList.add(
        "hidden"
    );


    resetBudgetItemModal();

}



// ---------------------------------------------------------
// VALIDATE BUDGET ITEM
// ---------------------------------------------------------

function validateBudgetItem() {

    let valid =
        true;


    // CATEGORY

    if (
        budgetItemCategory.value === ""
    ) {

        budgetItemCategory.classList.add(
            "input-error"
        );


        budgetItemCategoryError.classList.remove(
            "hidden"
        );


        valid =
            false;

    }

    else {

        budgetItemCategory.classList.remove(
            "input-error"
        );


        budgetItemCategoryError.classList.add(
            "hidden"
        );

    }


    // NAME

    if (
        budgetItemName.value.trim() === ""
    ) {

        budgetItemName.classList.add(
            "input-error"
        );


        budgetItemNameError.classList.remove(
            "hidden"
        );


        valid =
            false;

    }

    else {

        budgetItemName.classList.remove(
            "input-error"
        );


        budgetItemNameError.classList.add(
            "hidden"
        );

    }


    // DESCRIPTION

    if (
        budgetItemDescription.value.trim() === ""
    ) {

        budgetItemDescription.classList.add(
            "input-error"
        );


        budgetItemDescriptionError.classList.remove(
            "hidden"
        );


        valid =
            false;

    }

    else {

        budgetItemDescription.classList.remove(
            "input-error"
        );


        budgetItemDescriptionError.classList.add(
            "hidden"
        );

    }


    // QUANTITY

    const quantityValue =
        Number(
            budgetItemQuantity.value
        );


    if (
        budgetItemQuantity.value === "" ||
        !Number.isFinite(quantityValue) ||
        quantityValue < 1
    ) {

        budgetItemQuantity.classList.add(
            "input-error"
        );


        budgetItemQuantityError.classList.remove(
            "hidden"
        );


        valid =
            false;

    }

    else {

        budgetItemQuantity.classList.remove(
            "input-error"
        );


        budgetItemQuantityError.classList.add(
            "hidden"
        );

    }


    // COST

    const costValue =
        Number(
            budgetItemPrice.value
        );


    if (
        budgetItemPrice.value === "" ||
        !Number.isFinite(costValue) ||
        costValue < 0
    ) {

        budgetItemPrice.classList.add(
            "input-error"
        );


        budgetItemPriceError.classList.remove(
            "hidden"
        );


        valid =
            false;

    }

    else {

        budgetItemPrice.classList.remove(
            "input-error"
        );


        budgetItemPriceError.classList.add(
            "hidden"
        );

    }


    if (!valid) {

        const firstError =
            budgetItemForm.querySelector(
                ".input-error"
            );


        if (firstError) {

            firstError.focus();

        }

    }


    return valid;

}



// ---------------------------------------------------------
// CREATE ITEM OBJECT
// ---------------------------------------------------------

function createBudgetItemFromForm() {

    const quantity =
        Number(
            budgetItemQuantity.value
        );


    const cost =
        Number(
            budgetItemPrice.value
        );


    const selectedFile =
        budgetItemFile.files[0];


    return {

        category:
            budgetItemCategory.value,

        name:
            budgetItemName.value.trim(),

        description:
            budgetItemDescription.value.trim(),

        quantity:
            quantity,

        unitPrice:
            cost,

        total:
            quantity * cost,

        fileName:
    selectedFile
        ? selectedFile.name
        : "",

filePath:
    "",

fileObject:
    selectedFile || null

    };

}



// ---------------------------------------------------------
// RENDER BUDGET ITEMS
// ---------------------------------------------------------

function renderBudgetItems() {

    budgetItemList.innerHTML =
        "";


    if (
        budgetItems.length === 0
    ) {

        budgetItemList.appendChild(
            emptyBudgetMessage
        );


        emptyBudgetMessage.classList.remove(
            "hidden"
        );


        updateBudgetSummary();


        return;

    }


    budgetItems.forEach(
        function(
            item,
            index
        ) {

            const itemCard =
                document.createElement(
                    "div"
                );


            itemCard.className =
                "budget-item-card";


            itemCard.innerHTML =
                `
                <div class="budget-item-card-header">

                    <div>

                        <p class="budget-item-name">
                            ${item.name}
                        </p>

                        <p class="budget-item-description-display">
                            ${item.description}
                        </p>

                    </div>

                    <div class="budget-item-card-total">
                        ${formatBudgetCurrency(item.total)}
                    </div>

                </div>


                <div class="budget-item-details">

                    <span class="budget-item-detail">

                        <strong>
                            Category:
                        </strong>

                        ${item.category}

                    </span>


                    <span class="budget-item-detail">

                        <strong>
                            Quantity:
                        </strong>

                        ${item.quantity}

                    </span>


                    <span class="budget-item-detail">

                        <strong>
                            Cost:
                        </strong>

                        ${formatBudgetCurrency(item.unitPrice)}

                    </span>


                    ${
                        item.fileName
                            ?
                            `
                            <span class="budget-item-detail">

                                <strong>
                                    File:
                                </strong>

                                ${item.fileName}

                            </span>
                            `
                            :
                            ""
                    }

                </div>


                    <div class="budget-item-actions">

        ${
            item.filePath
                ?
                `
                <button
                    type="button"
                    class="budget-item-action-button"
                    data-budget-view-file="${index}"
                >
                    VIEW FILE
                </button>
                `
                :
                ""
        }

        <button
            type="button"
            class="budget-item-action-button"
            data-budget-edit="${index}"
        >
            EDIT
        </button>

        <button
            type="button"
            class="budget-item-action-button"
            data-budget-delete="${index}"
        >
            DELETE
        </button>

    </div>
                    `;


            budgetItemList.appendChild(
                itemCard
            );

        }
    );


    budgetItemsError.classList.add(
        "hidden"
    );


    updateBudgetSummary();

}

// ---------------------------------------------------------
// VIEW BUDGET ITEM FILE
// ---------------------------------------------------------

async function viewBudgetItemFile(
    index
) {

    const item =
        budgetItems[index];


    if (
        !item ||
        !item.filePath
    ) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .storage
            .from(
                "budget-line-item-files"
            )
            .createSignedUrl(
                item.filePath,
                60
            );


    if (error) {

        console.error(
            "Unable to open attachment:",
            error
        );

        return;

    }


    window.open(
        data.signedUrl,
        "_blank"
    );

}

// ---------------------------------------------------------
// SAVE ITEM
// ---------------------------------------------------------

function saveBudgetItemFromModal() {

    const validItem =
        validateBudgetItem();


    if (!validItem) {

        return;

    }


    const item =
        createBudgetItemFromForm();


    if (
        editingBudgetItemIndex !==
        null
    ) {

        const existingItem =
            budgetItems[
                editingBudgetItemIndex
            ];


        if (
    !item.fileObject
) {

    item.fileName =
        existingItem.fileName || "";

    item.filePath =
        existingItem.filePath || "";

    item.fileObject =
        existingItem.fileObject || null;

}


        budgetItems[
            editingBudgetItemIndex
        ] =
            item;

    }

    else {

        budgetItems.push(
            item
        );

    }


    renderBudgetItems();


    closeBudgetItemModal();

}



// ---------------------------------------------------------
// EDIT ITEM
// ---------------------------------------------------------

function editBudgetItem(
    index
) {

    const item =
        budgetItems[index];


    if (!item) {

        return;

    }


    resetBudgetItemModal();


    editingBudgetItemIndex =
        index;


    budgetModalTitle.textContent =
        "Edit Line Item";


    saveBudgetItem.textContent =
        "SAVE ITEM";


    budgetItemCategory.value =
        item.category;


    budgetItemName.value =
        item.name;


    budgetItemDescription.value =
        item.description;


    budgetItemQuantity.value =
        item.quantity;


    budgetItemPrice.value =
        item.unitPrice;


    if (
        item.fileName
    ) {

        budgetItemFileName.textContent =
            "Current file: " +
            item.fileName;


        budgetItemFileName.classList.remove(
            "hidden"
        );

    }


    calculateBudgetItemTotal();


    budgetModalOverlay.classList.remove(
        "hidden"
    );


    budgetItemCategory.focus();

}



// ---------------------------------------------------------
// DELETE ITEM
// ---------------------------------------------------------

function deleteBudgetItem(
    index
) {

    budgetItems.splice(
        index,
        1
    );


    renderBudgetItems();

}



// ---------------------------------------------------------
// CATEGORY ERROR HANDLING
// ---------------------------------------------------------

budgetItemCategory.addEventListener(
    "change",
    function() {

        if (
            budgetItemCategory.value !== ""
        ) {

            budgetItemCategory.classList.remove(
                "input-error"
            );


            budgetItemCategoryError.classList.add(
                "hidden"
            );

        }

    }
);



// ---------------------------------------------------------
// NAME ERROR HANDLING
// ---------------------------------------------------------

budgetItemName.addEventListener(
    "input",
    function() {

        if (
            budgetItemName.value.trim() !== ""
        ) {

            budgetItemName.classList.remove(
                "input-error"
            );


            budgetItemNameError.classList.add(
                "hidden"
            );

        }

    }
);



// ---------------------------------------------------------
// DESCRIPTION ERROR HANDLING
// ---------------------------------------------------------

budgetItemDescription.addEventListener(
    "input",
    function() {

        if (
            budgetItemDescription
                .value
                .trim() !== ""
        ) {

            budgetItemDescription.classList.remove(
                "input-error"
            );


            budgetItemDescriptionError.classList.add(
                "hidden"
            );

        }

    }
);



// ---------------------------------------------------------
// CALCULATION INPUTS
// ---------------------------------------------------------

budgetItemQuantity.addEventListener(
    "input",
    function() {

        calculateBudgetItemTotal();


        if (
            Number(
                budgetItemQuantity.value
            ) >= 1
        ) {

            budgetItemQuantity.classList.remove(
                "input-error"
            );


            budgetItemQuantityError.classList.add(
                "hidden"
            );

        }

    }
);


budgetItemPrice.addEventListener(
    "input",
    function() {

        calculateBudgetItemTotal();


        if (
            budgetItemPrice.value !== "" &&
            Number(
                budgetItemPrice.value
            ) >= 0
        ) {

            budgetItemPrice.classList.remove(
                "input-error"
            );


            budgetItemPriceError.classList.add(
                "hidden"
            );

        }

    }
);



// ---------------------------------------------------------
// FILE SELECTION
// ---------------------------------------------------------

budgetItemFile.addEventListener(
    "change",
    function() {

        const selectedFile =
            budgetItemFile.files[0];


        if (selectedFile) {

            budgetItemFileName.textContent =
                "Selected file: " +
                selectedFile.name;


            budgetItemFileName.classList.remove(
                "hidden"
            );

        }

        else {

            budgetItemFileName.textContent =
                "";


            budgetItemFileName.classList.add(
                "hidden"
            );

        }

    }
);



// ---------------------------------------------------------
// OPEN MODAL
// ---------------------------------------------------------

openBudgetModal.addEventListener(
    "click",
    openNewBudgetItemModal
);



// ---------------------------------------------------------
// CLOSE MODAL
// ---------------------------------------------------------

closeBudgetModal.addEventListener(
    "click",
    closeBudgetItemModal
);


cancelBudgetItem.addEventListener(
    "click",
    closeBudgetItemModal
);



// ---------------------------------------------------------
// SAVE ITEM
// ---------------------------------------------------------

saveBudgetItem.addEventListener(
    "click",
    saveBudgetItemFromModal
);



// ---------------------------------------------------------
// EDIT / DELETE BUTTONS
// ---------------------------------------------------------

budgetItemList.addEventListener(
    "click",
    function(event) {

        const viewFileButton =
    event.target.closest(
        "[data-budget-view-file]"
    );

    if (viewFileButton) {

    const index =
        Number(
            viewFileButton.dataset
                .budgetViewFile
        );


    viewBudgetItemFile(
        index
    );


    return;

}

        const editButton =
            event.target.closest(
                "[data-budget-edit]"
            );


        const deleteButton =
            event.target.closest(
                "[data-budget-delete]"
            );


        if (editButton) {

            const index =
                Number(
                    editButton.dataset
                        .budgetEdit
                );


            editBudgetItem(
                index
            );


            return;

        }


        if (deleteButton) {

            const index =
                Number(
                    deleteButton.dataset
                        .budgetDelete
                );


            deleteBudgetItem(
                index
            );

        }

    }
);



// ---------------------------------------------------------
// INITIAL DISPLAY
// ---------------------------------------------------------

renderBudgetItems();

// =========================================================
// BLOCK 11
// PERSISTENCE / FINISH LATER
// =========================================================



// ---------------------------------------------------------
// CURRENT SUPABASE REQUEST
// ---------------------------------------------------------

let currentSupabaseRequestId =
    null;


let currentSupabaseDraft =
    null;

// ---------------------------------------------------------
// WAIT FOR SUPABASE AUTH
// ---------------------------------------------------------

window.addEventListener(
    "supabase-ready",
    async function() {

        await loadExistingSupabaseDraftId();

    }
);

if (
    typeof currentSupabaseUser !==
        "undefined" &&
    currentSupabaseUser
) {

    loadExistingSupabaseDraftId();

}

// ---------------------------------------------------------
// DASHBOARD ELEMENTS
// ---------------------------------------------------------

const budgetDashboardEmptyState =
    document.getElementById(
        "budgetDashboardEmptyState"
    );


const savedRequestCard =
    document.getElementById(
        "savedRequestCard"
    );


const savedRequestTitle =
    document.getElementById(
        "savedRequestTitle"
    );


const savedRequestDate =
    document.getElementById(
        "savedRequestDate"
    );


const resumeSavedRequest =
    document.getElementById(
        "resumeSavedRequest"
    );



// ---------------------------------------------------------
// CAPTURE CURRENT FORM VALUES
// ---------------------------------------------------------

function captureCurrentRequestValues() {

    // REQUEST PAGE

    requestData.title =
        requestTitle.value.trim();


    requestData.description =
        requestDescription.value.trim();



    // POLICY PAGE

    policyAcknowledgementData.termsName =
        policyTermsName.value.trim();


    policyAcknowledgementData.restrictedItemsName =
        policyRestrictedItemsName.value.trim();


    policyAcknowledgementData.appealName =
        policyAppealName.value.trim();


    policyAcknowledgementData.attendanceName =
        policyAttendanceName.value.trim();



    // ORGANIZATION INFORMATION

    organizationInformationData.president.name =
        presidentName.value.trim();


    organizationInformationData.president.email =
        presidentEmail.value.trim();


    organizationInformationData.president.phone =
        presidentPhone.value.trim();


    organizationInformationData.treasurer.name =
        treasurerName.value.trim();


    organizationInformationData.treasurer.email =
        treasurerEmail.value.trim();


    organizationInformationData.treasurer.phone =
        treasurerPhone.value.trim();


    organizationInformationData.advisor.name =
        advisorName.value.trim();


    organizationInformationData.advisor.email =
        advisorEmail.value.trim();


    organizationInformationData.advisor.phone =
        advisorPhone.value.trim();


    organizationInformationData.additionalContacts =
        additionalContacts.value.trim();


    const sabacPresentation =
        document.querySelector(
            'input[name="sabacPresentation"]:checked'
        );


    organizationInformationData.sabacPresentation =
        sabacPresentation
            ? sabacPresentation.value
            : "";


    const previousFunding =
        document.querySelector(
            'input[name="receivedPreviousSabacFunding"]:checked'
        );


    organizationInformationData.previousSabacFunding =
        previousFunding
            ? previousFunding.value
            : "";



    // PREVIOUS SABAC PAGE

    if (
        typeof previousSabacStatement !==
        "undefined"
    ) {

        previousSabacFundingData.statement =
            previousSabacStatement.value.trim();

    }



    // PROGRAM FUNDING

    programFundingData.programName =
        programName.value.trim();


    programFundingData.programLocation =
        programLocation.value.trim();


    programFundingData.programDate =
        programDate.value.trim();


    programFundingData.programDescription =
        programDescription.value.trim();


    programFundingData.studentParticipants =
        studentParticipants.value.trim();


    programFundingData.staffParticipants =
        staffParticipants.value.trim();


    programFundingData.offCampusParticipants =
        offCampusParticipants.value.trim();

}



// ---------------------------------------------------------
// DETERMINE CURRENT PAGE
// ---------------------------------------------------------

function getCurrentRequestPage() {

    if (
        !budgetPage.classList.contains(
            "hidden"
        )
    ) {

        return "budget";

    }


    if (
        !programFundingPage.classList.contains(
            "hidden"
        )
    ) {

        return "programFunding";

    }


    if (
        !previousSabacFundingPage.classList.contains(
            "hidden"
        )
    ) {

        return "previousSabac";

    }


    if (
        !organizationInformationPage.classList.contains(
            "hidden"
        )
    ) {

        return "organization";

    }


    if (
        !policyAcknowledgementPage.classList.contains(
            "hidden"
        )
    ) {

        return "policy";

    }


    return "request";

}



// ---------------------------------------------------------
// SAVE CURRENT REQUEST
// ---------------------------------------------------------

// ---------------------------------------------------------
// SAVE CURRENT REQUEST PROGRESS
// ---------------------------------------------------------

function saveCurrentRequestProgress() {

    captureCurrentRequestValues();

}


// ---------------------------------------------------------
// UPLOAD BUDGET ITEM FILE
// ---------------------------------------------------------

async function uploadBudgetItemFile(
    item
) {

    if (
        !item.fileObject
    ) {

        return item.filePath || "";

    }


    if (
        !currentSupabaseUser ||
        !currentSupabaseRequestId
    ) {

        console.error(
            "Cannot upload attachment without a user and request ID."
        );


        return null;

    }


    const originalName =
        item.fileObject.name;


    const fileExtension =
        originalName.includes(".")
            ? "." +
              originalName
                  .split(".")
                  .pop()
                  .toLowerCase()
            : "";


    const storedFileName =
        crypto.randomUUID() +
        fileExtension;


    const filePath =
        currentSupabaseUser.id +
        "/" +
        currentSupabaseRequestId +
        "/" +
        storedFileName;


    const {
        error
    } =
        await supabaseClient
            .storage
            .from(
                "budget-line-item-files"
            )
            .upload(
                filePath,
                item.fileObject,
                {
                    upsert: false,
                    contentType:
                        item.fileObject.type
                }
            );


    if (error) {

        console.error(
            "Budget attachment upload failed:",
            error
        );


        return null;

    }


    item.filePath =
        filePath;


    item.fileName =
        originalName;


    item.fileObject =
        null;


    console.log(
        "Budget attachment uploaded:",
        filePath
    );


    return filePath;

}

// ---------------------------------------------------------
// SAVE REQUEST TO SUPABASE
// ---------------------------------------------------------

async function saveCurrentRequestToSupabase() {

    if (!currentSupabaseUser) {

        console.error(
            "Cannot save draft because no Supabase user is available."
        );

        return false;

    }


    captureCurrentRequestValues();


    // =====================================
    // REQUEST DATA
    // =====================================

    const requestRecord = {

        owner_id:
            currentSupabaseUser.id,

        status:
            "draft",

        current_page:
            getCurrentRequestPage(),

        updated_at:
            new Date().toISOString(),

        request_title:
            requestData.title || null,

        request_description:
            requestData.description || null,


        // =====================================
        // POLICY
        // =====================================

        policy_terms_name:
            policyAcknowledgementData.termsName || null,

        policy_restricted_items_name:
            policyAcknowledgementData.restrictedItemsName || null,

        policy_appeal_name:
            policyAcknowledgementData.appealName || null,

        policy_attendance_name:
            policyAcknowledgementData.attendanceName || null,


        // =====================================
        // ORGANIZATION
        // =====================================

        president_name:
            organizationInformationData.president.name || null,

        president_email:
            organizationInformationData.president.email || null,

        president_phone:
            organizationInformationData.president.phone || null,

        treasurer_name:
            organizationInformationData.treasurer.name || null,

        treasurer_email:
            organizationInformationData.treasurer.email || null,

        treasurer_phone:
            organizationInformationData.treasurer.phone || null,

        advisor_name:
            organizationInformationData.advisor.name || null,

        advisor_email:
            organizationInformationData.advisor.email || null,

        advisor_phone:
            organizationInformationData.advisor.phone || null,

        additional_contacts:
            organizationInformationData.additionalContacts || null,

        sabac_presentation:
            organizationInformationData.sabacPresentation || null,

        previous_sabac_funding:
            organizationInformationData.previousSabacFunding || null,


        // =====================================
        // PREVIOUS SABAC
        // =====================================

        previous_sabac_statement:
            previousSabacFundingData.statement || null,


        // =====================================
        // PROGRAM FUNDING
        // =====================================

        program_name:
            programFundingData.programName || null,

        program_location:
            programFundingData.programLocation || null,

        program_date:
            programFundingData.programDate || null,

        program_description:
            programFundingData.programDescription || null,

        student_participants:
            programFundingData.studentParticipants === ""
                ? null
                : Number(
                    programFundingData.studentParticipants
                ),

        staff_participants:
            programFundingData.staffParticipants === ""
                ? null
                : Number(
                    programFundingData.staffParticipants
                ),

        off_campus_participants:
            programFundingData.offCampusParticipants === ""
                ? null
                : Number(
                    programFundingData.offCampusParticipants
                )

    };


    // =====================================
    // INSERT NEW REQUEST
    // =====================================

    if (!currentSupabaseRequestId) {

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "budget_requests"
                )
                .insert(
                    requestRecord
                )
                .select(
                    "id"
                )
                .single();


        if (error) {

            console.error(
                "Supabase draft insert failed:",
                error
            );

            return false;

        }


        currentSupabaseRequestId =
            data.id;


        console.log(
            "Supabase draft created:",
            currentSupabaseRequestId
        );

    }


    // =====================================
    // UPDATE EXISTING REQUEST
    // =====================================

    else {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "budget_requests"
                )
                .update(
                    requestRecord
                )
                .eq(
                    "id",
                    currentSupabaseRequestId
                );


        if (error) {

            console.error(
                "Supabase draft update failed:",
                error
            );

            return false;

        }


        console.log(
            "Supabase draft updated:",
            currentSupabaseRequestId
        );

    }


    // =====================================
    // GET PREVIOUS FILE PATHS
    // =====================================

    const {
        data: existingLineItems,
        error: existingItemsError
    } =
        await supabaseClient
            .from(
                "budget_line_items"
            )
            .select(
                "file_path"
            )
            .eq(
                "request_id",
                currentSupabaseRequestId
            );


    if (existingItemsError) {

        console.error(
            "Unable to read existing line items:",
            existingItemsError
        );

        return false;

    }


    const previousFilePaths =
        (existingLineItems || [])
            .map(
                function(item) {

                    return item.file_path;

                }
            )
            .filter(
                function(path) {

                    return Boolean(path);

                }
            );


    // =====================================
    // UPLOAD NEW FILES
    // =====================================

    for (
        const item of budgetItems
    ) {

        if (
            item.fileObject
        ) {

            const uploadedPath =
                await uploadBudgetItemFile(
                    item
                );


            if (
                uploadedPath === null
            ) {

                return false;

            }

        }

    }


    // =====================================
    // REMOVE OLD LINE ITEMS
    // =====================================

    const {
        error: deleteItemsError
    } =
        await supabaseClient
            .from(
                "budget_line_items"
            )
            .delete()
            .eq(
                "request_id",
                currentSupabaseRequestId
            );


    if (deleteItemsError) {

        console.error(
            "Unable to refresh Supabase line items:",
            deleteItemsError
        );

        return false;

    }


    // =====================================
    // SAVE CURRENT LINE ITEMS
    // =====================================

    if (
        budgetItems.length > 0
    ) {

        const lineItemRecords =
            budgetItems.map(
                function(item) {

                    return {

                        request_id:
                            currentSupabaseRequestId,

                        category:
                            item.category,

                        name:
                            item.name,

                        description:
                            item.description,

                        quantity:
                            item.quantity,

                        cost:
                            item.unitPrice,

                        total:
                            item.total,

                        file_name:
                            item.fileName || null,

                        file_path:
                            item.filePath || null

                    };

                }
            );


        const {
            error: insertItemsError
        } =
            await supabaseClient
                .from(
                    "budget_line_items"
                )
                .insert(
                    lineItemRecords
                );


        if (insertItemsError) {

            console.error(
                "Supabase line item save failed:",
                insertItemsError
            );

            return false;

        }

    }


    // =====================================
    // REMOVE UNUSED STORAGE FILES
    // =====================================

    const currentFilePaths =
        budgetItems
            .map(
                function(item) {

                    return item.filePath;

                }
            )
            .filter(
                function(path) {

                    return Boolean(path);

                }
            );


    const unusedFilePaths =
        previousFilePaths.filter(
            function(path) {

                return !currentFilePaths.includes(
                    path
                );

            }
        );


    if (
        unusedFilePaths.length > 0
    ) {

        const {
            error: removeFilesError
        } =
            await supabaseClient
                .storage
                .from(
                    "budget-line-item-files"
                )
                .remove(
                    unusedFilePaths
                );


        if (removeFilesError) {

            console.error(
                "Unused attachment cleanup failed:",
                removeFilesError
            );

        }

    }


    // =====================================
    // RELOAD SAVED DRAFT
    // =====================================

    await loadCurrentSupabaseDraft();


    console.log(
        "Supabase draft and line items saved successfully."
    );


    return true;

}

// ---------------------------------------------------------
// RESTORE TEXT FIELD
// ---------------------------------------------------------

function restoreTextField(
    field,
    value
) {

    if (
        field &&
        value !== undefined &&
        value !== null
    ) {

        field.value =
            value;

    }

}



// ---------------------------------------------------------
// RESTORE RADIO VALUE
// ---------------------------------------------------------

function restoreRadioValue(
    name,
    value
) {

    if (!value) {

        return;

    }


    const radio =
        document.querySelector(
            `input[name="${name}"][value="${value}"]`
        );


    if (radio) {

        radio.checked =
            true;

    }

}



// ---------------------------------------------------------
// RESTORE SAVED REQUEST DATA
// ---------------------------------------------------------

function restoreSavedRequestData(
    savedDraft
) {

    // =====================================
    // REQUEST
    // =====================================

    Object.assign(
        requestData,
        savedDraft.requestData || {}
    );


    restoreTextField(
        requestTitle,
        requestData.title
    );


    restoreTextField(
        requestDescription,
        requestData.description
    );



    // =====================================
    // POLICY
    // =====================================

    Object.assign(
        policyAcknowledgementData,
        savedDraft.policyAcknowledgementData || {}
    );


    restoreTextField(
        policyTermsName,
        policyAcknowledgementData.termsName
    );


    restoreTextField(
        policyRestrictedItemsName,
        policyAcknowledgementData.restrictedItemsName
    );


    restoreTextField(
        policyAppealName,
        policyAcknowledgementData.appealName
    );


    restoreTextField(
        policyAttendanceName,
        policyAcknowledgementData.attendanceName
    );



    // =====================================
    // ORGANIZATION
    // =====================================

    if (
        savedDraft.organizationInformationData
    ) {

        Object.assign(
            organizationInformationData,
            savedDraft.organizationInformationData
        );


        restoreTextField(
            presidentName,
            organizationInformationData.president.name
        );


        restoreTextField(
            presidentEmail,
            organizationInformationData.president.email
        );


        restoreTextField(
            presidentPhone,
            organizationInformationData.president.phone
        );


        restoreTextField(
            treasurerName,
            organizationInformationData.treasurer.name
        );


        restoreTextField(
            treasurerEmail,
            organizationInformationData.treasurer.email
        );


        restoreTextField(
            treasurerPhone,
            organizationInformationData.treasurer.phone
        );


        restoreTextField(
            advisorName,
            organizationInformationData.advisor.name
        );


        restoreTextField(
            advisorEmail,
            organizationInformationData.advisor.email
        );


        restoreTextField(
            advisorPhone,
            organizationInformationData.advisor.phone
        );


        restoreTextField(
            additionalContacts,
            organizationInformationData.additionalContacts
        );


        restoreRadioValue(
            "sabacPresentation",
            organizationInformationData.sabacPresentation
        );


        restoreRadioValue(
            "receivedPreviousSabacFunding",
            organizationInformationData.previousSabacFunding
        );

    }



    // =====================================
    // PREVIOUS SABAC
    // =====================================

    if (
        savedDraft.previousSabacFundingData
    ) {

        Object.assign(
            previousSabacFundingData,
            savedDraft.previousSabacFundingData
        );


        restoreTextField(
            previousSabacStatement,
            previousSabacFundingData.statement
        );

    }



    // =====================================
    // PROGRAM FUNDING
    // =====================================

    Object.assign(
        programFundingData,
        savedDraft.programFundingData || {}
    );


    restoreTextField(
        programName,
        programFundingData.programName
    );


    restoreTextField(
        programLocation,
        programFundingData.programLocation
    );


    restoreTextField(
        programDate,
        programFundingData.programDate
    );


    restoreTextField(
        programDescription,
        programFundingData.programDescription
    );


    restoreTextField(
        studentParticipants,
        programFundingData.studentParticipants
    );


    restoreTextField(
        staffParticipants,
        programFundingData.staffParticipants
    );


    restoreTextField(
        offCampusParticipants,
        programFundingData.offCampusParticipants
    );



    // =====================================
    // BUDGET ITEMS
    // =====================================

    budgetItems.splice(
        0,
        budgetItems.length
    );


    if (
        Array.isArray(
            savedDraft.budgetItems
        )
    ) {

        savedDraft.budgetItems.forEach(
            function(item) {

                budgetItems.push(
                    item
                );

            }
        );

    }


    renderBudgetItems();

}

// ---------------------------------------------------------
// OPEN SAVED PAGE
// ---------------------------------------------------------

function openSavedRequestPage(
    page
) {

    showRequestWorkspace(
        "program"
    );


    switch (page) {

        case "budget":

            openBudgetPage();

            break;


        case "programFunding":

            openProgramFundingPage();

            break;


        case "previousSabac":

            openPreviousSabacFundingPage();

            break;


        case "organization":

            openOrganizationInformationPage();

            break;


        case "policy":

            openPolicyPage();

            break;


        default:

            configureRequestNavigation();

            showRequestBasicPage();

    }

}



// ---------------------------------------------------------
// UPDATE DASHBOARD DRAFT DISPLAY
// ---------------------------------------------------------

// ---------------------------------------------------------
// UPDATE DASHBOARD DRAFT DISPLAY
// ---------------------------------------------------------

function updateSavedRequestDisplay() {

    const savedDraft =
        currentSupabaseDraft;


    // =====================================
    // NO SAVED DRAFT
    // =====================================

    if (!savedDraft) {

        savedRequestCard.classList.add(
            "hidden"
        );


        budgetDashboardEmptyState.classList.remove(
            "hidden"
        );


        return;

    }


    // =====================================
    // SHOW SAVED DRAFT
    // =====================================

    budgetDashboardEmptyState.classList.add(
        "hidden"
    );


    savedRequestCard.classList.remove(
        "hidden"
    );


    savedRequestTitle.textContent =
        savedDraft.requestData &&
        savedDraft.requestData.title
            ? savedDraft.requestData.title
            : "Supplemental Budget Request";


    if (
        savedDraft.savedAt
    ) {

        savedRequestDate.textContent =
            new Date(
                savedDraft.savedAt
            ).toLocaleString();

    }

}

// ---------------------------------------------------------
// RESUME SAVED REQUEST
// ---------------------------------------------------------

// ---------------------------------------------------------
// RESUME SAVED REQUEST
// ---------------------------------------------------------

// ---------------------------------------------------------
// RESUME SAVED REQUEST
// ---------------------------------------------------------

resumeSavedRequest.addEventListener(
    "click",
    function() {

        if (!currentSupabaseDraft) {

            console.error(
                "No Supabase draft is available to resume."
            );


            return;

        }


        restoreSavedRequestData(
            currentSupabaseDraft
        );


        openSavedRequestPage(
            currentSupabaseDraft.currentPage
        );

    }
);



// ---------------------------------------------------------
// CHECK FOR SAVED REQUEST ON LOAD
// ---------------------------------------------------------

updateSavedRequestDisplay();

// =========================================================
// SUBMIT TRAINING REQUEST
// =========================================================


// ---------------------------------------------------------
// SUBMIT REQUEST
// ---------------------------------------------------------

// =========================================================
// TRAINING REQUEST SUBMISSION
// =========================================================


// ---------------------------------------------------------
// SUBMIT REQUEST
// ---------------------------------------------------------

// ---------------------------------------------------------
// UPLOAD SUBMITTED REQUEST PDF
// ---------------------------------------------------------

async function uploadSubmittedRequestPdf() {

    if (
        !currentSupabaseUser ||
        !currentSupabaseRequestId
    ) {

        console.error(
            "Cannot upload PDF without a user and request ID."
        );

        return null;

    }


    const pdfBlob =
        generateBudgetRequestPdf();


    const pdfPath =
        currentSupabaseUser.id +
        "/" +
        currentSupabaseRequestId +
        "/submission.pdf";


    const {
        error
    } =
        await supabaseClient
            .storage
            .from(
                "budget-request-pdfs"
            )
            .upload(
                pdfPath,
                pdfBlob,
                {
                    contentType:
                        "application/pdf",

                    upsert:
                        false
                }
            );


    if (error) {

        console.error(
            "Submitted PDF upload failed:",
            error
        );

        return null;

    }


    console.log(
        "Submitted PDF uploaded:",
        pdfPath
    );


    return pdfPath;

}

// ---------------------------------------------------------
// SUBMIT BUDGET REQUEST
// ---------------------------------------------------------

async function submitBudgetRequest() {

    // =====================================
    // SAVE FINAL REQUEST FIRST
    // =====================================

    const saveWorked =
        await saveCurrentRequestToSupabase();


    if (!saveWorked) {

        console.error(
            "Request could not be submitted because the final save failed."
        );

        return;

    }


    if (!currentSupabaseRequestId) {

        console.error(
            "No Supabase request ID is available for submission."
        );

        return;

    }


    // =====================================
    // GENERATE + UPLOAD PDF
    // =====================================

    const pdfPath =
        await uploadSubmittedRequestPdf();


    if (!pdfPath) {

        console.error(
            "Request was not submitted because PDF creation/upload failed."
        );

        return;

    }


    // =====================================
    // MARK REQUEST AS SUBMITTED
    // =====================================

    const submissionTime =
        new Date().toISOString();


    const {
        error
    } =
        await supabaseClient
            .from(
                "budget_requests"
            )
            .update({

                status:
                    "submitted",

                current_page:
                    "submitted",

                pdf_path:
                    pdfPath,

                submitted_at:
                    submissionTime,

                updated_at:
                    submissionTime

            })
            .eq(
                "id",
                currentSupabaseRequestId
            );


    if (error) {

        console.error(
            "Budget submission failed:",
            error
        );

        return;

    }


    console.log(
        "Budget request submitted:",
        currentSupabaseRequestId
    );


    // =====================================
    // CLEAR ACTIVE DRAFT
    // =====================================

    currentSupabaseRequestId =
        null;


    currentSupabaseDraft =
        null;


    // =====================================
    // RETURN TO DASHBOARD
    // =====================================

    requestWorkspaceScreen.classList.add(
        "hidden"
    );


    showBudgetDashboard();


    updateSavedRequestDisplay();


    alert(
        "Supplemental Budget Request submitted successfully."
    );

}


// ---------------------------------------------------------
// LOAD EXISTING SUPABASE DRAFT ID
// ---------------------------------------------------------

async function loadExistingSupabaseDraftId() {

    if (!currentSupabaseUser) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "budget_requests"
            )
            .select(
                "id"
            )
            .eq(
                "owner_id",
                currentSupabaseUser.id
            )
            .eq(
                "status",
                "draft"
            )
            .order(
                "updated_at",
                {
                    ascending: false
                }
            )
            .limit(
                1
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Unable to load existing Supabase draft:",
            error
        );

        return;

    }


    if (data) {

    currentSupabaseRequestId =
        data.id;


    console.log(
        "Existing Supabase draft found:",
        currentSupabaseRequestId
    );


    await loadCurrentSupabaseDraft();


    updateSavedRequestDisplay();

}

}

// ---------------------------------------------------------
// LOAD CURRENT SUPABASE DRAFT DATA
// ---------------------------------------------------------

async function loadCurrentSupabaseDraft() {

    if (!currentSupabaseRequestId) {

        currentSupabaseDraft =
            null;

        return null;

    }


    // =====================================
    // LOAD REQUEST
    // =====================================

    const {
        data: request,
        error: requestError
    } =
        await supabaseClient
            .from(
                "budget_requests"
            )
            .select(
                "*"
            )
            .eq(
                "id",
                currentSupabaseRequestId
            )
            .maybeSingle();


    if (requestError) {

        console.error(
            "Unable to load Supabase request:",
            requestError
        );

        return null;

    }


    if (!request) {

        currentSupabaseDraft =
            null;

        return null;

    }


    // =====================================
    // LOAD LINE ITEMS
    // =====================================

    const {
        data: lineItems,
        error: lineItemsError
    } =
        await supabaseClient
            .from(
                "budget_line_items"
            )
            .select(
                "*"
            )
            .eq(
                "request_id",
                currentSupabaseRequestId
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );


    if (lineItemsError) {

        console.error(
            "Unable to load Supabase line items:",
            lineItemsError
        );

        return null;

    }


    // =====================================
    // CONVERT DATABASE DATA
    // INTO EXISTING APP FORMAT
    // =====================================

    currentSupabaseDraft = {

        savedAt:
            request.updated_at,

        currentPage:
            request.current_page ||
            "request",


        // =================================
        // REQUEST
        // =================================

        requestData: {

            title:
                request.request_title || "",

            description:
                request.request_description || ""

        },


        // =================================
        // POLICY
        // =================================

        policyAcknowledgementData: {

            termsName:
                request.policy_terms_name || "",

            restrictedItemsName:
                request.policy_restricted_items_name || "",

            appealName:
                request.policy_appeal_name || "",

            attendanceName:
                request.policy_attendance_name || ""

        },


        // =================================
        // ORGANIZATION
        // =================================

        organizationInformationData: {

            president: {

                name:
                    request.president_name || "",

                email:
                    request.president_email || "",

                phone:
                    request.president_phone || ""

            },

            treasurer: {

                name:
                    request.treasurer_name || "",

                email:
                    request.treasurer_email || "",

                phone:
                    request.treasurer_phone || ""

            },

            advisor: {

                name:
                    request.advisor_name || "",

                email:
                    request.advisor_email || "",

                phone:
                    request.advisor_phone || ""

            },

            additionalContacts:
                request.additional_contacts || "",

            sabacPresentation:
                request.sabac_presentation || "",

            previousSabacFunding:
                request.previous_sabac_funding || "",

            requestNature:
                "program"

        },


        // =================================
        // PREVIOUS SABAC
        // =================================

        previousSabacFundingData: {

            statement:
                request.previous_sabac_statement || ""

        },


        // =================================
        // PROGRAM FUNDING
        // =================================

        programFundingData: {

            programName:
                request.program_name || "",

            programLocation:
                request.program_location || "",

            programDate:
                request.program_date || "",

            programDescription:
                request.program_description || "",

            studentParticipants:
                request.student_participants === null
                    ? ""
                    : String(
                        request.student_participants
                    ),

            staffParticipants:
                request.staff_participants === null
                    ? ""
                    : String(
                        request.staff_participants
                    ),

            offCampusParticipants:
                request.off_campus_participants === null
                    ? ""
                    : String(
                        request.off_campus_participants
                    )

        },


        // =================================
        // BUDGET ITEMS
        // =================================

        budgetItems:
            (lineItems || []).map(
                function(item) {

                    return {

                        category:
                            item.category,

                        name:
                            item.name,

                        description:
                            item.description,

                        quantity:
                            item.quantity,

                        unitPrice:
                            Number(
                                item.cost
                            ),

                        total:
                            Number(
                                item.total
                            ),

                        fileName:
    item.file_name || "",

filePath:
    item.file_path || "",

fileObject:
    null

                    };

                }
            )

    };


    console.log(
        "Supabase draft data loaded:",
        currentSupabaseDraft
    );


    return currentSupabaseDraft;

}


