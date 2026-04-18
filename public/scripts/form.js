const form = () => document.getElementById('form-<%= entidade.nome %>');
const desktopContainer = () => document.getElementById('itens-container-desktop');
const mobileContainer  = () => document.getElementById('itens-container-mobile');
const isMobile = () => window.innerWidth < 768;
function replaceAtributosParaNovoItem(text, id) {
    return text
            .replaceAll(/value="[^"]*"/g, 'value')
            .replaceAll(/hx-\w+="[^"]*"/g, "")
            .replaceAll(/data-item-pk="true">[^<]*</g, "data-item-pk='true'><")
            .replaceAll(/data-item-label="true">[^<]*</g, "><")
            .replaceAll(/data-id="[^"]*"/g, `data-id='${id}'`)
            .replaceAll(/data-remove-input="true"/g, `data-remove-input="false"`);
}
function gerencia_excluir() {
    let input_excluir = this.parentNode.querySelector('input[data-remove-item="true"]');
    if(!input_excluir) {
        alert("Erro gravar exclusão de item");
        this.checked = false;
        return;
    }
    input_excluir.value = this.checked ? 1 : 0;
}
function adicionar_item() {
    // Mobile
    const primeiro_item_desktop = document.querySelector('tr[data-desktop-item="true"]');
    const primeiro_item_mobile = document.querySelector('div[data-mobile-item="true"]');
    if(primeiro_item_mobile.innerHTML && primeiro_item_desktop.innerHTML) {
        const novo_id = "untracked_"+Math.random().toString(36).substring(2, 10);
        desktopContainer().innerHTML += replaceAtributosParaNovoItem(primeiro_item_desktop.outerHTML, novo_id);
        mobileContainer().innerHTML += replaceAtributosParaNovoItem(primeiro_item_mobile.outerHTML, novo_id);

        let novo_item_desktop = desktopContainer().querySelector(`tr[data-id="${novo_id}"]`);
        let novo_item_mobile = mobileContainer().querySelector(`div[data-id="${novo_id}"]`);

        novo_item_desktop.querySelector('input[data-remove-item="true"]').addEventListener("change", gerencia_excluir);
        novo_item_mobile.querySelector('input[data-remove-item="true"]').addEventListener("change", gerencia_excluir);
    }
}
export default function loadEvents() {
    const add_item = document.getElementById("adicionar-item");
    add_item.addEventListener('click', adicionar_item);
    const checkboxes_remover = document.querySelectorAll('input[data-remove-item="true"]');
    if(checkboxes_remover) {
        checkboxes_remover.forEach(b => b.addEventListener("change", gerencia_excluir));
    }
}
