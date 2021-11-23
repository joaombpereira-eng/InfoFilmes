const apiKey = "74e6f83c";
const imgDefault = "./default_image.png";
const poster = document.querySelector(".poster");
const titulo = document.querySelector("#titulo");
const sinopse = document.querySelector("#sinopse");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const atores = document.querySelector("#atores");
const diretor = document.querySelector("#diretor");
const nomeBusca = document.querySelector(".input");
const botaoBuscar = document.querySelector("#botao_buscar");
const msgErro = document.querySelector("#mensagemErro");

async function buscaFilme(nomeBusca) {
  const resposta = await fetch(
    `http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`
  );
  console.log(resposta.json);
  return resposta.json();
}

botaoBuscar.addEventListener("click", () => {
  limparCampos();
  core();
});

function limparCampos() {
  titulo.textContent = "";
  sinopse.textContent = "";
  ano.textContent = "";
  duracao.textContent = "";
  genero.textContent = "";
  atores.textContent = "";
  diretor.textContent = "";
  poster.setAttribute("src", imgDefault);
}

async function core() {
  try {
    const filme = await buscaFilme(nomeBusca.value);
    validarDados(filme);
    defineValores(filme);
  } catch (erro) {
    console.log(erro);
    msgErro.textContent = `${erro}`;
  }
}

function defineValores(filme) {
  titulo.textContent = filme.Title;
  sinopse.textContent = filme.Plot;
  ano.textContent = `Year: ${filme.Year}`;
  duracao.textContent = `Runtime: ${filme.Runtime}`;
  genero.textContent = `Genre: ${filme.Genre}`;
  atores.textContent = `Actors: ${filme.Actors}`;
  diretor.textContent = `Director: ${filme.Director}`;
  poster.setAttribute("src", filme.Poster);
}

function validarDados(filme) {
  if (
    filme.Plot === undefined ||
    filme.Year === undefined ||
    filme.Actors === "N/A"
  ) {
    throw new Error("Filme não encontrado.");
  }
}
