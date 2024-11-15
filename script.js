import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  containerVideos.innerHTML = "";

  try {
    const urlVideos = import.meta.env.VITE_URL_VIDEOS;

    const busca = await axios.get(urlVideos);
    const videos = await busca.data;

    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Vídeo não tem categoria");
      }
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    for (let video of videos) {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!titulo.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    for (let video of videos) {
      video.style.display = "block";
    }
  }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}

const botaoAbrirFormulario = document.querySelector(".cabecalho__cadastrar");

botaoAbrirFormulario.addEventListener("click", mostrarFormulario);

const botaoFecharFormulario = document.querySelector(".formulario__fechar");

botaoFecharFormulario.addEventListener("click", fecharFormulario);

const formularioCadastro = document.querySelector(".formulario__conteudo");

formularioCadastro.addEventListener("submit", manipularSubmicao);

function mostrarFormulario() {
  document.getElementById("formularioContainer").style.display = "flex";
  document.getElementById("titulo").focus();
}

function fecharFormulario() {
  document.getElementById("formularioContainer").style.display = "none";
}

async function manipularSubmicao(event) {
  event.preventDefault();

  const titulo = this.querySelector("#titulo").value;
  const descricao = this.querySelector("#descricao").value;
  const url = this.querySelector("#url").value;
  const imagem = this.querySelector("#imagem").value;
  const categoria = this.querySelector("#categoria").value;

  try {
    axios.post(import.meta.env.VITE_URL_VIDEOS, {
      titulo,
      descricao,
      url,
      imagem,
      categoria,
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao salvar os vídeos: ${error}</p>`;
  } finally {
    limparFormulario(this);
  }
}

function limparFormulario(formulario) {
  formulario.querySelector("#titulo").value = "";
  formulario.querySelector("#descricao").value = "";
  formulario.querySelector("#url").value = "";
  formulario.querySelector("#imagem").value = "";
  formulario.querySelector("#categoria").value = "";
}
