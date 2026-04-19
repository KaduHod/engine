/**
* Resets the provided HTML form element.
* @param {HTMLFormElement} form - The form node to be reset.
*/
function reset_form(form) {
    if (!form || !(form instanceof HTMLFormElement)) return;
    // Reset standard input fields
    const inputs = form.querySelectorAll('input:not([data-no-reset])');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    // Reset selects
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    // Reset textareas
    const textareas = form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.value = '';
    });
}
