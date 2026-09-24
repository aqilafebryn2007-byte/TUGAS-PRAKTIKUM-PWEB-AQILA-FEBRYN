// ===== Data =====
const hobiList = [
  { emoji: "🎤", nama: "Nyanyi & paduan suara", tagline: "Dari SMA sampai kuliah", warna: "var(--pink)", miring: "1.2deg",
  cerita: "Sejak SMA aku ikut ekstrakurikuler paduan suara, dan sekarang di perkuliahan aku bergabung di paduan suara mahasiswa. Bernyanyi bareng melatih kekompakan, disiplin latihan, dan kemampuan mendengarkan satu sama lain." },
  { emoji: "🎧", nama: "Dengerin musik", tagline: "Hampir selalu ada earphone", warna: "var(--pink)", miring: "1.2deg",
    cerita: "Musik menemaniku belajar, jalan, dan mikir. Suasana hati menentukan playlist hari itu." },
  { emoji: "🎬", nama: "Nonton film & serial", tagline: "Maraton di akhir pekan", warna: "var(--sky)", miring: "-1deg",
    cerita: "Cerita yang bagus bikin aku lupa waktu. Aku suka bahas alurnya bareng teman setelah selesai nonton." },
  { emoji: "📚", nama: "Baca", tagline: "Sedikit tiap hari", warna: "var(--mint)", miring: "1.6deg",
    cerita: "Novel, artikel teknologi, atau apa pun yang menarik. Membaca bantu aku menemukan sudut pandang baru." },
  { emoji: "🍜", nama: "Jajan & cari kafe", tagline: "Berburu tempat enak", warna: "var(--lilac)", miring: "-1.3deg",
    cerita: "Jember punya banyak tempat makan dan kafe menarik. Aku suka mencoba yang baru, apalagi kalau wifinya kencang." }
];

const pendidikanList = [
  { tahun: "2025 — Sekarang", judul: "Teknologi Informasi", sekolah: "Universitas Jember",
    deskripsi: "Mempelajari Software Engineering dengan fokus pada pengembangan web, mobile, backend, dan IoT. Aktif mengembangkan proyek aplikasi end-to-end sebagai sarana belajar dan eksplorasi teknologi." },
  { tahun: "2022 — 2024", judul: "Jurusan Ilmu Pengetahuan Sosial", sekolah: "SMAN 4 Jember",
    deskripsi: "Mengenal cara kerja masyarakat, ekonomi, dan dunia di sekitar kita, sekaligus melatih kemampuan berpikir kritis, berargumen, dan berkomunikasi." }
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Efek emoji kecil yang melayang saat kartu dibuka
function burst(kartu, emoji) {
  if (reduceMotion) return;
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("span");
    s.className = "pop";
    s.textContent = i % 2 ? emoji : "✦";
    s.style.left = 15 + Math.random() * 70 + "%";
    s.style.top = 10 + Math.random() * 30 + "%";
    s.style.animationDelay = i * 60 + "ms";
    kartu.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

// ===== Render kartu hobi (manipulasi DOM) =====
const board = document.getElementById("board");

hobiList.forEach((h) => {
  const kartu = document.createElement("button");
  kartu.className = "hobi";
  kartu.style.setProperty("--c", h.warna);
  kartu.style.setProperty("--r", h.miring);
  kartu.setAttribute("aria-expanded", "false");
  kartu.innerHTML = `
    <span class="emo">${h.emoji}</span>
    <h3>${h.nama}</h3>
    <span class="tag">${h.tagline}</span>
    <div class="more"><div><p>${h.cerita}</p></div></div>
    <span class="toggle">Baca cerita</span>`;

  kartu.addEventListener("click", () => {
    const terbuka = kartu.getAttribute("aria-expanded") === "true";
    kartu.setAttribute("aria-expanded", String(!terbuka));
    kartu.querySelector(".toggle").textContent = terbuka ? "Baca cerita" : "Tutup";
    if (!terbuka) burst(kartu, h.emoji);
  });

  board.appendChild(kartu);
});

// ===== Render timeline pendidikan =====
const timeline = document.getElementById("timeline");

pendidikanList.forEach((p) => {
  const item = document.createElement("div");
  item.className = "timeline-item";
  item.innerHTML = `
    <span class="timeline-year">${p.tahun}</span>
    <h3 class="timeline-title">${p.judul}</h3>
    <p class="timeline-sub">${p.sekolah}</p>
    <p class="timeline-desc">${p.deskripsi}</p>`;
  timeline.appendChild(item);
});

// ===== Menu hamburger (mobile) =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const buka = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(buka));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ===== Tandai menu aktif saat scroll =====
const sections = document.querySelectorAll("main section[id]");
const links = navLinks.querySelectorAll("a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((s) => observer.observe(s));

// ===== Form contact (validasi DOM) =====
// Catatan: ini demo tanpa backend, jadi pesan belum benar-benar dikirim ke mana pun.
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const msgInput = document.getElementById("msgInput");
const feedback = document.getElementById("formFeedback");

[nameInput, emailInput, msgInput].forEach((el) =>
  el.addEventListener("input", () => el.classList.remove("invalid"))
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = nameInput.value.trim();
  const email = emailInput.value.trim();
  const pesan = msgInput.value.trim();
  let error = "";

  [nameInput, emailInput, msgInput].forEach((el) => el.classList.remove("invalid"));

  if (!nama) {
    nameInput.classList.add("invalid");
    error = "Nama belum diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add("invalid");
    error = "Format email belum benar.";
  } else if (pesan.length < 10) {
    msgInput.classList.add("invalid");
    error = "Pesan minimal 10 karakter.";
  }

  feedback.className = "form-feedback " + (error ? "error" : "ok");
  if (error) {
    feedback.textContent = error;
    return;
  }
  feedback.textContent = `Terima kasih, ${nama}! Pesanmu sudah diterima ♡`;
  form.reset();
});