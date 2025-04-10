const menuButton = document.querySelector(".icon");
const menu = document.querySelector(".menu");
const hoverAnim = document.querySelector("#hoverAnimation");
const firstItem = document.querySelector("#firstItem");
const secndItem = document.querySelector("#secndItem");
const thirdItem = document.querySelector("#thirdItem");
const fourthItem = document.querySelector("#fourthItem");
const passwd = document.querySelector("input[name='senha']");
const confirmPasswd = document.querySelector("input[name='confirmSenha']");
const showPass = document.querySelector(".show");
const showPassConfirm = document.querySelector(".showC");
const hidePass = document.querySelector(".hide");
const hidePassConfirm = document.querySelector(".hideC");
const cpf = document.querySelector("input[name='cpf']");

function toggleMenu()
{    
    menu.classList.toggle("menuOpen");
    if(!menu.classList.contains("menuOpen")){
        hoverAnim.setAttribute("hidden", "hidden");
    }
}

function mascaraCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 3) {
        input.value = value;
    } else if (value.length <= 6) {
        input.value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length <= 9) {
        input.value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length <= 11) {
        input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
}

cpf.addEventListener("input", () => {
    mascaraCPF(cpf);
});

document.querySelectorAll("#show").forEach((item) => {
    item.addEventListener("click", () => {
        passwd.type = "text";
        confirmPasswd.type = "text";
        showPass.toggleAttribute("hidden");
        showPassConfirm.toggleAttribute("hidden");
        hidePass.toggleAttribute("hidden");
        hidePassConfirm.toggleAttribute("hidden");
    })
});

document.querySelectorAll("#hide").forEach((item) => {
    item.addEventListener("click", () => {
        passwd.type = "password";
        confirmPasswd.type = "password";
        showPass.toggleAttribute("hidden");
        showPassConfirm.toggleAttribute("hidden");
        hidePass.toggleAttribute("hidden");
        hidePassConfirm.toggleAttribute("hidden");
    })
});

firstItem.addEventListener("mouseover", () => {
    hoverAnim.removeAttribute("hidden");
    hoverAnim.style.top = "0px";
});

secndItem.addEventListener("mouseover", () => {
    hoverAnim.removeAttribute("hidden");
    hoverAnim.style.top = "52px";
});

thirdItem.addEventListener("mouseover", () => {
    hoverAnim.removeAttribute("hidden");
    hoverAnim.style.top = "104px";
});

fourthItem.addEventListener("mouseover", () => {
    hoverAnim.removeAttribute("hidden");
    hoverAnim.style.top = "156px";
});