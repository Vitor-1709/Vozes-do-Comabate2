/* =========================
   MOSTRAR VÍDEOS NA HOME
========================= */

function carregarVideosInicio() {
  const container = document.getElementById("videosInicio");
  if (!container) return; // só roda na página que tiver esse id

  const videos = JSON.parse(localStorage.getItem("videos")) || [];

  if (videos.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; color:#aaa;">
        Nenhum treino enviado ainda.
      </p>
    `;
    return;
  }

  container.innerHTML = `
    <h2 style="margin-bottom:20px;">
      Últimos <span style="color:#4ade80;">Treinos</span>
    </h2>
  `;

  videos.reverse().forEach(video => {
    const card = document.createElement("div");

    card.style.background = "rgba(255,255,255,0.05)";
    card.style.borderRadius = "15px";
    card.style.padding = "20px";
    card.style.marginBottom = "20px";

    card.innerHTML = `
      <h3 style="margin-bottom:10px;">${video.name}</h3>
      <p style="color:#aaa; margin-bottom:10px;">
        Nível: ${video.level}
      </p>
      <iframe 
        width="100%" 
        height="315"
        src="${video.url}"
        frameborder="0"
        allowfullscreen
        style="border-radius:10px;"
      ></iframe>
    `;

    container.appendChild(card);
  });
}

/* =========================
   MODAL DE VÍDEOS
========================= */

const modal = document.getElementById("videoModal");

function openModal() {
  if (!modal) return;
  modal.style.display = "flex";
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
}

function saveVideo() {
  // AGORA os elementos são buscados corretamente
  const videoName = document.getElementById("videoName");
  const videoUrl = document.getElementById("videoUrl");
  const videoLevel = document.getElementById("videoLevel");

  // Se a página não tiver esses inputs, sai
  if (!videoName || !videoUrl || !videoLevel) return;

  const name = videoName.value.trim();
  const url = videoUrl.value.trim();
  const level = videoLevel.value;

  if (!name || !url || !level) {
    alert("Preencha todos os campos!");
    return;
  }

  const videos = JSON.parse(localStorage.getItem("videos")) || [];
  videos.push({ name, url, level });
  localStorage.setItem("videos", JSON.stringify(videos));

  videoName.value = "";
  videoUrl.value = "";
  videoLevel.value = "";

  closeModal();
}

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

/* =========================
   SISTEMA DE CADASTRO
========================= */

function cadastrarUsuario() {
  const nomeEl = document.getElementById("cadastroNome");
  const emailEl = document.getElementById("cadastroEmail");
  const senhaEl = document.getElementById("cadastroSenha");

  if (!nomeEl || !emailEl || !senhaEl) return;

  const nome = nomeEl.value.trim();
  const email = emailEl.value.trim();
  const senha = senhaEl.value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const emailExiste = usuarios.some(u => u.email === email);
  if (emailExiste) {
    alert("Este email já está cadastrado");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "Logar.html";
}

/* =========================
   SISTEMA DE LOGIN
========================= */

function loginUsuario() {
  const emailEl = document.getElementById("loginEmail");
  const senhaEl = document.getElementById("loginSenha");

  if (!emailEl || !senhaEl) return;

  const email = emailEl.value.trim();
  const senha = senhaEl.value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    alert("Login realizado com sucesso!");
    window.location.href = "começar.html";
  } else {
    alert("Email ou senha inválidos");
  }
}

/* =========================
   PROTEÇÃO DE PÁGINAS
========================= */

function protegerPagina() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario) {
    window.location.href = "Logar.html";
  }
}

/* =========================
   LOGOUT
========================= */

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "Logar.html";
}
