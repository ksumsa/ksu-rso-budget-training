// =========================================================
// SUPPLEMENTAL BUDGET PDF
// =========================================================


// ---------------------------------------------------------
// SAFE PDF TEXT
// ---------------------------------------------------------

function getPdfValue(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";

    }


    return String(
        value
    );

}



// ---------------------------------------------------------
// FORMAT PDF CURRENCY
// ---------------------------------------------------------

function formatPdfCurrency(
    value
) {

    const number =
        Number(
            value
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        return "$0.00";

    }


    return number.toLocaleString(
        "en-US",
        {
            style:
                "currency",

            currency:
                "USD"
        }
    );

}



// ---------------------------------------------------------
// ADD SECTION TITLE
// ---------------------------------------------------------

function addPdfSectionTitle(
    pdf,
    title,
    y
) {

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        13
    );


    pdf.text(
        title,
        20,
        y
    );


    pdf.setLineWidth(
        0.4
    );


    pdf.line(
        20,
        y + 2,
        190,
        y + 2
    );


    return y + 10;

}



// ---------------------------------------------------------
// ADD LABEL / VALUE
// ---------------------------------------------------------

function addPdfField(
    pdf,
    label,
    value,
    y
) {

    const pageHeight =
        pdf.internal.pageSize.getHeight();


    if (
        y > pageHeight - 20
    ) {

        pdf.addPage();

        y = 20;

    }


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        10
    );


    pdf.text(
        label + ":",
        20,
        y
    );


    pdf.setFont(
        "helvetica",
        "normal"
    );


    const wrappedValue =
        pdf.splitTextToSize(
            getPdfValue(
                value
            ),
            125
        );


    pdf.text(
        wrappedValue,
        65,
        y
    );


    const linesUsed =
        Array.isArray(
            wrappedValue
        )
            ? wrappedValue.length
            : 1;


    return y +
        Math.max(
            7,
            linesUsed * 5
        );

}



// ---------------------------------------------------------
// GENERATE SUBMISSION PDF
// ---------------------------------------------------------

function generateBudgetRequestPdf() {

    const {
        jsPDF
    } =
        window.jspdf;


    const pdf =
        new jsPDF({
            orientation:
                "portrait",

            unit:
                "mm",

            format:
                "letter"
        });


    let y =
        20;


    // =====================================================
    // HEADER
    // =====================================================

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        18
    );


    pdf.text(
        "KSU RSO Supplemental Budget Request",
        20,
        y
    );


    y +=
        9;


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        10
    );


    pdf.text(
        "Training Replica Submission",
        20,
        y
    );


    y +=
        12;



    // =====================================================
    // REQUEST INFORMATION
    // =====================================================

    y =
        addPdfSectionTitle(
            pdf,
            "Request Information",
            y
        );


    y =
        addPdfField(
            pdf,
            "Request Title",
            requestData.title,
            y
        );


    y =
        addPdfField(
            pdf,
            "Description",
            requestData.description,
            y
        );


    y +=
        4;



    // =====================================================
    // POLICY ACKNOWLEDGEMENTS
    // =====================================================

    y =
        addPdfSectionTitle(
            pdf,
            "Policy Acknowledgements",
            y
        );


    y =
        addPdfField(
            pdf,
            "Terms",
            policyAcknowledgementData.termsName,
            y
        );


    y =
        addPdfField(
            pdf,
            "Restricted Items",
            policyAcknowledgementData.restrictedItemsName,
            y
        );


    y =
        addPdfField(
            pdf,
            "Appeal",
            policyAcknowledgementData.appealName,
            y
        );


    y =
        addPdfField(
            pdf,
            "Attendance",
            policyAcknowledgementData.attendanceName,
            y
        );


    y +=
        4;



    // =====================================================
    // ORGANIZATION INFORMATION
    // =====================================================

    y =
        addPdfSectionTitle(
            pdf,
            "Organization Information",
            y
        );


    y =
        addPdfField(
            pdf,
            "President",
            organizationInformationData
                .president.name,
            y
        );


    y =
        addPdfField(
            pdf,
            "President Email",
            organizationInformationData
                .president.email,
            y
        );


    y =
        addPdfField(
            pdf,
            "President Phone",
            organizationInformationData
                .president.phone,
            y
        );


    y =
        addPdfField(
            pdf,
            "Treasurer",
            organizationInformationData
                .treasurer.name,
            y
        );


    y =
        addPdfField(
            pdf,
            "Treasurer Email",
            organizationInformationData
                .treasurer.email,
            y
        );


    y =
        addPdfField(
            pdf,
            "Treasurer Phone",
            organizationInformationData
                .treasurer.phone,
            y
        );


    y =
        addPdfField(
            pdf,
            "Advisor",
            organizationInformationData
                .advisor.name,
            y
        );


    y =
        addPdfField(
            pdf,
            "Advisor Email",
            organizationInformationData
                .advisor.email,
            y
        );


    y =
        addPdfField(
            pdf,
            "Advisor Phone",
            organizationInformationData
                .advisor.phone,
            y
        );


    y =
        addPdfField(
            pdf,
            "Additional Contacts",
            organizationInformationData
                .additionalContacts,
            y
        );


    y =
        addPdfField(
            pdf,
            "SABAC Presentation",
            organizationInformationData
                .sabacPresentation,
            y
        );


    y =
        addPdfField(
            pdf,
            "Previous SABAC Funding",
            organizationInformationData
                .previousSabacFunding,
            y
        );


    if (
        organizationInformationData
            .previousSabacFunding ===
        "yes"
    ) {

        y =
            addPdfField(
                pdf,
                "Previous Funding Statement",
                previousSabacFundingData.statement,
                y
            );

    }


    y +=
        4;



    // =====================================================
    // PROGRAM INFORMATION
    // =====================================================

    y =
        addPdfSectionTitle(
            pdf,
            "Program Information",
            y
        );


    y =
        addPdfField(
            pdf,
            "Program Name",
            programFundingData.programName,
            y
        );


    y =
        addPdfField(
            pdf,
            "Location",
            programFundingData.programLocation,
            y
        );


    y =
        addPdfField(
            pdf,
            "Date",
            programFundingData.programDate,
            y
        );


    y =
        addPdfField(
            pdf,
            "Description",
            programFundingData.programDescription,
            y
        );


    y =
        addPdfField(
            pdf,
            "Student Participants",
            programFundingData.studentParticipants,
            y
        );


    y =
        addPdfField(
            pdf,
            "Staff Participants",
            programFundingData.staffParticipants,
            y
        );


    y =
        addPdfField(
            pdf,
            "Off-Campus Participants",
            programFundingData.offCampusParticipants,
            y
        );


    y +=
        6;



    // =====================================================
    // BUDGET
    // =====================================================

    if (
        y > 220
    ) {

        pdf.addPage();

        y =
            20;

    }


    y =
        addPdfSectionTitle(
            pdf,
            "Budget",
            y
        );


    const budgetRows =
        budgetItems.map(
            function(item) {

                return [

                    item.category,

                    item.name,

                    item.description,

                    item.quantity,

                    formatPdfCurrency(
                        item.unitPrice
                    ),

                    formatPdfCurrency(
                        item.total
                    )

                ];

            }
        );


    pdf.autoTable({

        startY:
            y,

        head: [[
            "Category",
            "Item",
            "Description",
            "Qty",
            "Cost",
            "Total"
        ]],

        body:
            budgetRows,

        margin: {
            left: 20,
            right: 20
        },

        styles: {
            fontSize: 8,
            cellPadding: 2
        },

        headStyles: {
            fontStyle:
                "bold"
        }

    });


    y =
        pdf.lastAutoTable.finalY +
        10;



    // =====================================================
    // TOTAL REQUESTED
    // =====================================================

    const requestedAmount =
        budgetItems.reduce(
            function(
                total,
                item
            ) {

                return total +
                    Number(
                        item.total
                    );

            },
            0
        );


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        12
    );


    pdf.text(
        "Total Requested: " +
            formatPdfCurrency(
                requestedAmount
            ),
        20,
        y
    );


    y +=
        12;



    // =====================================================
    // ATTACHMENTS
    // =====================================================

    const attachments =
        budgetItems.filter(
            function(item) {

                return Boolean(
                    item.fileName
                );

            }
        );


    if (
        attachments.length > 0
    ) {

        y =
            addPdfSectionTitle(
                pdf,
                "Attachments",
                y
            );


        attachments.forEach(
            function(item) {

                y =
                    addPdfField(
                        pdf,
                        item.name,
                        item.fileName,
                        y
                    );

            }
        );

    }



    // =====================================================
    // SUBMISSION INFORMATION
    // =====================================================

    if (
        y > 235
    ) {

        pdf.addPage();

        y =
            20;

    }


    y +=
        8;


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        9
    );


    pdf.text(
        "Generated from the KSU RSO Supplemental Budget Training Replica.",
        20,
        y
    );


    y +=
        5;


    pdf.text(
        "Generated: " +
            new Date()
                .toLocaleString(),
        20,
        y
    );


    // =====================================================
    // RETURN PDF BLOB
    // =====================================================

    return pdf.output(
        "blob"
    );

}