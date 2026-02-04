<script>
const modal = document.getElementById("videoModal");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function saveVideo() {
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

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
</script>