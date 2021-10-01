// ==UserScript==
// @name         DocuSign Blur
// @description  Blur for DocuSign Identify products: ID Verification, ID Evidence, etc.
// @author       Cyril Thirion
// @namespace    https://docusign.com/
// @version      0.5
// @updateURL    https://github.com/cyrilthirion/DocuSignBlur/blob/main/DocuBlur.user.js
// @supportURL   https://github.com/cyrilthirion/DocuSignBlur/issues
// @include      https://*.docusign.com/documents/details/*
// @include      https://identity*.docusign.net/*
// @include      https://*.identity.docusign.net/*
// @include      https://proof*.docusign.net/*
// @include      https://*.proof.docusign.net/*
// @require      https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.slim.min.js
// @grant        none
// ==/UserScript==

function blurIDVerification() {
    // Identity flow
    blur($("div.camera_inner"));
    // Upload Review ID
    blur($("img[alt='preview image']"));
}

function blurIDEvidence() {
    // ID Evidence
    blur($("img[data-qa~='id-img-front']"));
    blur($("img[data-qa~='id-img-back']"));
    blur($("dt[data-qa~='date-of-birth']").next());
    blur($("dt[data-qa~='issue-date']").next());
    blur($("dt[data-qa~='expiry-date']").next());
    blur($("dt[data-qa~='machine-readable-zone']").next());
}

function blurManualReview() {
    // Will be easier with a data-qa
    blur($('.manualreview-container').children('div').eq(1));
}

function blurPhoneNumber() {
    blur($(":input#phone_input[data-qa~=jtm-sms-input]"), ".2rem");
}

function mutationHandler(mutationRecords) {
    blurIDVerification();
    blurIDEvidence();
    blurManualReview();
    blurPhoneNumber();
}

// Select the node that will be observed for mutations
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const obsConfig = { attributes: true, childList: true, subtree: true };
// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationHandler);
// Start observing the target node for configured mutations
observer.observe(targetNode, obsConfig);

// Blur filter
function blur(element, blurRatio = ".3rem") {
    if (element == null) {
        return;
    }
    element.css("filter", "blur("+blurRatio+")")
}

