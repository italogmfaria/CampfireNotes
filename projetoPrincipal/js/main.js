
// Adiciona um evento de carga à janela para exibir inicialmente o tab1
window.onload = function () {
    openTab('tab1');
  };


// Função para recarregar a página e descartar todas as notas
function reloadAndDiscardNotes() {
    let confirmReload = confirm("Quer realmente recarregar a página e descartar todas as notas?");
    if (confirmReload) {
      localStorage.removeItem("notas"); // Remove as notas do armazenamento local
      location.reload(); // Recarrega a página
    }
  }


  function openTab(tabId, event) {
    // Esconde todos os conteúdos das abas
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }
  
    // Remove a classe 'active-tab' de todos os links das abas
    var tabLinks = document.querySelectorAll('ul.tabs li a');
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove('active-tab');
    }
  
    // Mostra o conteúdo da aba clicada
    document.getElementById(tabId).style.display = 'block';
  
    // Adiciona a classe 'active-tab' ao link da aba clicada
    if (event) {
      event.currentTarget.classList.add('active-tab');
    }
  }


 // Função para criar uma nova nota
function createNewNote() {
    openTab('tab1');
       // Lógica para criar uma nova nota
    const addBox = document.querySelector(".add-box");
    const popupBox = document.querySelector(".popup-box");
    
    const titleTag = popupBox.querySelector("input");
    const descTag = popupBox.querySelector("textarea");

    // Resetando os campos do formulário
    titleTag.value = "";
    descTag.value = "";
    popupTitle.innerText = "Adicionar uma nova nota";
    addBtn.innerText = "Criar nota";
    // Exibindo a popup-box para adicionar uma nova nota
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "auto";

    // Colocando o foco no campo de título
    if (window.innerWidth > 660) titleTag.focus();
}


// Funções relacionadas a editar notas e criar notas

const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const notas = JSON.parse(localStorage.getItem("notas") || "[]");
let isUpdate = false, updateId;
addBox.addEventListener("click", () => {
    popupTitle.innerText = "Adicionar uma nova nota";
    addBtn.innerText = "Criar nota";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
function shownotas() {
    if (!notas) return;
    document.querySelectorAll(".nota").forEach(li => li.remove());
    notas.forEach((nota, id) => {
        let filterDesc = nota.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="nota">
                        <div class="details">
                            <p>${nota.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${nota.date}</span>
                            <div class="config">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updatenota(${id}, '${nota.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Editar</li>
                                    <li onclick="deletenota(${id})"><i class="uil uil-trash"></i>Deletar</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
shownotas();
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
function deletenota(notaId) {
    let confirmDel = confirm("Quer realmente apagar esta nota?");
    if (!confirmDel) return;
    notas.splice(notaId, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    shownotas();
}
function updatenota(notaId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = notaId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Atualizar Nota";
    addBtn.innerText = "Atualizar Nota";
}
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim();
    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();
        let notaInfo = { title, description, date: `${month} ${day}, ${year}` }
        if (!isUpdate) {
            notas.push(notaInfo);
        } else {
            isUpdate = false;
            notas[updateId] = notaInfo;
        }
        localStorage.setItem("notas", JSON.stringify(notas));
        shownotas();
        closeIcon.click();
    }
});


// Função para o modo dark
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle('dark-mode');
  }