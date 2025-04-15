const menuButton = document.querySelector(".icon");
const menu = document.querySelector(".menu");
const hoverAnim = document.querySelector("#hoverAnimation");
const firstItem = document.querySelector("#firstItem");
const secndItem = document.querySelector("#secndItem");
const fourthItem = document.querySelector("#fourthItem");
const passwd = document.querySelector(".box-register input[name='senha']");
const confirmPasswd = document.querySelector("input[name='confirmSenha']");
const loginPasswd = document.querySelector(".box-login input[name='senha']");
const showPass = document.querySelector(".box-register .show");
const showPassConfirm = document.querySelector(".box-register .showC");
const hidePass = document.querySelector(".box-register .hide");
const hidePassConfirm = document.querySelector(".box-register .hideC");
const showPassLogin = document.querySelector(".box-login .show");
const hidePassLogin = document.querySelector(".box-login .hide");
const cpf = document.querySelector("input[name='cpf']");
const passChar = document.querySelector("#char");
const passNumber = document.querySelector("#number");
const passLetters = document.querySelector("#letters");
const passSpecial = document.querySelector("#special");
const registerButton = document.querySelector(".box-register button");
const nome = document.querySelector(".box-register input[name='nome']");
const email = document.querySelector(".box-register input[name='email']");
const termos = document.querySelector("#termosRegister");
const mainPage = document.querySelector(".main");
const registerPage = document.querySelector(".register");
const loginPage = document.querySelector(".login");
const aboutPage = document.querySelector(".about");
const itemsMenu = document.querySelectorAll("li.mItem");
const senaiTitle = document.querySelector("header h2");
const senaiComplete = document.querySelector("#typedText");
const loginButton = document.querySelector(".box-login button");
const carouselImgs = document.querySelectorAll(".carousel img.cImg");
const cForward = document.getElementById("forward");
const cBackward = document.getElementById("backward");
const activeCircle = document.querySelector(".cCircles .rActive");

var typed = false;

function toggleMenu()
{    
    menu.classList.toggle("menuOpen");
    if(!menu.classList.contains("menuOpen")){
        hoverAnim.setAttribute("hidden", "hidden");
    }
}

function typeText(element, text, options = {}) {
    const {
        speed = 30,         
        index = 0,         
        callback = null,    
        onStart = null,     
        onChar = null      
    } = options;

    if (element.typingTimer) clearTimeout(element.typingTimer);

    if (index === 0 && onStart) onStart();

    if (index > text.length) {
        if (callback) callback();
        return;
    }

    element.textContent = text.slice(0, index);
    
    if (onChar && index > 0) onChar(text.charAt(index - 1));

    element.typingTimer = setTimeout(() => {
        typeText(element, text, {
            ...options,
            index: index + 1
        });
    }, speed);
}

function eraseText(element, options = {}) {
    const {
        speed = 30,             
        originalText = element.textContent || "",  
        index = originalText.length,  
        callback = null,        
        onStart = null,        
        onChar = null,         
        preserveWhitespace = false 
    } = options;
    
    if (element.erasingTimer) clearTimeout(element.erasingTimer);
    
    if (index === originalText.length && onStart) onStart();

    if (index <= 0) {
        if (!preserveWhitespace) element.textContent = "";
        if (callback) callback();
        return;
    }

    element.textContent = originalText.slice(0, index - 1);
    
    if (onChar) onChar(originalText.charAt(index - 1));

    element.erasingTimer = setTimeout(() => {
        eraseText(element, {
            ...options,
            originalText, 
            index: index - 1
        });
    }, speed);
}

function popupMessage(type, message)
{
    const newMessage = document.createElement("div");
    const text = document.createElement("p");
    newMessage.classList.add("message");
    newMessage.classList.add(type);
    text.textContent = message;
    newMessage.appendChild(text);
    document.body.appendChild(newMessage);

    setTimeout(function() {newMessage.classList.add("loaded")}, 100);
    setTimeout(function() {newMessage.style.opacity = 0;}, 5000);
    setTimeout(function() {newMessage.remove()}, 6200)
}

function validateForm() {
    const allFieldsFilled = nome.value && cpf.value && email.value && passwd.value && confirmPasswd.value;
  
    if (!allFieldsFilled) return;
  
    if (passwd.value !== confirmPasswd.value) return;
  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    if (!regex.test(passwd.value)) return;
  
    if (!termos.checked) return;

    popupMessage("success", "Você completou seu registro com sucesso!");
    return true;
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

function carouselImg(type)
{
    const activeImg = document.querySelector(".carousel img.cImg#cActive");
    if (!activeImg) return;

    const index = Array.from(carouselImgs).indexOf(activeImg);
    activeImg.removeAttribute("id"); 
    
    let nextIndex;
    if(type == "forward")
    {
        nextIndex = index < carouselImgs.length - 1 ? index + 1 : 0;
    }else if(type == "backward")
    {
        nextIndex = index > 0 ? index - 1 : 2;
    }
    
    carouselImgs[nextIndex].setAttribute("id", "cActive");
    
    activeCircle.style.marginRight = posCircleActive[nextIndex];
}

cpf.addEventListener("input", () => {
    mascaraCPF(cpf);
});

document.querySelectorAll("#show").forEach((item) => {
    item.addEventListener("click", () => {
        if(item.parentElement.parentElement.classList.contains("box-login"))
        {
            loginPasswd.type = "text"
            showPassLogin.toggleAttribute("hidden");
            hidePassLogin.toggleAttribute("hidden");
        }else{
            passwd.type = "text";
            confirmPasswd.type = "text";
            showPass.toggleAttribute("hidden");
            showPassConfirm.toggleAttribute("hidden");
            hidePass.toggleAttribute("hidden");
            hidePassConfirm.toggleAttribute("hidden");
        }
    })
});

document.querySelectorAll("#hide").forEach((item) => {
    item.addEventListener("click", () => {
        if(item.parentElement.parentElement.classList.contains("box-login"))
        {
            loginPasswd.type = "password"
            showPassLogin.toggleAttribute("hidden");
            hidePassLogin.toggleAttribute("hidden");
        }else{ 
            passwd.type = "password";
            confirmPasswd.type = "password";
            showPass.toggleAttribute("hidden");
            showPassConfirm.toggleAttribute("hidden");
            hidePass.toggleAttribute("hidden");
            hidePassConfirm.toggleAttribute("hidden");
        }
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

passwd.addEventListener("input", () => {
    const passwordRules = [
        {
            regex: /^.{12,}$/,            
            element: passChar
        },
        {
            regex: /(?=.*[a-z])(?=.*[A-Z])/,
            element: passLetters
        },
        {
            regex: /\d/,
            element: passNumber
        },
        {
            regex: /[\W_]/, 
            element: passSpecial
        }
    ];
    passwordRules.forEach(({ regex, element }) => {
        if (regex.test(passwd.value))
        {
            element.classList.add("checked");
        } else
        {
            element.classList.remove("checked");
        }
    });
});

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(!validateForm())
    {
        popupMessage("error", "Alguma informação foi preenchida de forma incorreta!");
    }
});

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    popupMessage("success", "Login realizado com sucesso!");
});

const menuItems = [
    {
        id: "firstItem",
        element: registerPage,
        text: "Registrar-se"
    },
    {
        id: "secndItem",
        element: loginPage,
        text: "Entrar"
    }
];

itemsMenu.forEach(item => {
    item.addEventListener("click", () => {
        if(item.classList.contains("active"))
        {
            item.classList.remove("active");
            menuItems.forEach(({id, element, text}) => {
                if(item.id == id)
                {
                    item.textContent = text;
                    element.style.display = "none";
                    mainPage.style.display = "block";
                }
            })
        }else
        {
            const active = document.querySelector(".active");
            console.log(active);
            if(active != undefined){
                active.classList.remove("active");
            }else{
                mainPage.style.display = "none";
            }
            item.classList.add("active");
            item.textContent = "Página Principal";
            menuItems.forEach(({id, element, text}) => {
                if(active != undefined && active.id == id)
                {
                    active.textContent = text;
                    element.style.display = "none";
                }
                if(item.id == id)
                {
                    
                    element.style.display = "flex";
                }
            });
        }
        menu.classList.remove("menuOpen");
        hoverAnim.setAttribute("hidden", "hidden");
    });
});

senaiTitle.addEventListener("mouseover", () => {
    senaiComplete.classList.add("blinking");
});

senaiTitle.addEventListener("click", () => {
    if(!typed){
        typeText(senaiComplete, " - Serviço Nacional de Aprendizagem Industrial", {callback : () => {typed=true;}});
    }else{
        eraseText(senaiComplete, {callback : () => {typed = false;}});
        senaiComplete.classList.remove("blinking");
    }
});

var posCircleActive = ["52px", "5px", "-42px"];

cForward.addEventListener("click", () => {
    carouselImg("forward");
});

cBackward.addEventListener("click", () => {
    carouselImg("backward");
});