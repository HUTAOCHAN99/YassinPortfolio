class CardGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="assets/css/app.css">
            <link rel="stylesheet" href="assets/css/theme.css">
            <style>
            .modal {
             display: none;
             position: fixed; 
             z-index: 1000;
             left: 0;
             top: 0;
             width: 100%;
             height: 100vh;
             background: rgba(0, 0, 0, 0.8);
             align-items: center;
             justify-content: center;
            }

                .modal img {
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 8px;
                }
                .modal-close {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    font-size: 30px;
                    color: white;
                    cursor: pointer;
                }
                body.modal-open {
                    overflow: hidden;
                    pointer-events: none; /* Disable all interactions */
                }
                body.modal-open .modal {
                    pointer-events: auto; /* Enable interactions within the modal */
                }
            </style>
            <section class="mt-4 mb-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="card-columns">
                            ${this.generateCards()}
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal" id="imageModal">
                <span class="modal-close">&times;</span>
                <img id="modalImg" src="" alt="Modal Image">
            </div>
        `;

    this.addEventListeners();
  }

  generateCards() {
    const images = [
      "./assets/img/portfolio1.png",
      "./assets/img/portfolio2.png",
      "./assets/img/portfolio3.png",
      "./assets/img/portfolio4.png",
      "./assets/img/portfolio5.png",
      "./assets/img/portfolio6.png",
      "./assets/img/portfolio7.png",
      "./assets/img/portfolio8.png",
    ];
    return images
      .map(
        (img) => `
            <div class="card card-pin">
                <img class="card-img" src="${img}" alt="Card image">
                <div class="overlay">
                    <h2 class="card-title title"></h2>
                    <div class="more">
                        <a href="#" class="open-modal" data-src="${img}">
                            <i class="fa fa-search-plus" aria-hidden="true"></i> View
                        </a>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  addEventListeners() {
    const modal = this.shadowRoot.getElementById("imageModal");
    const modalImg = this.shadowRoot.getElementById("modalImg");
    const closeModal = this.shadowRoot.querySelector(".modal-close");

    this.shadowRoot.querySelectorAll(".open-modal").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        modalImg.src = e.target.closest("a").dataset.src;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        document.body.classList.add("modal-open"); // Prevent scrolling and interactions
      });
    });

    // Event untuk menutup modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open"); // Allow scrolling and interactions
    });

    // Tutup modal saat klik di luar gambar
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open"); // Allow scrolling and interactions
      }
    });

    // Tutup modal saat halaman di-scroll
    window.addEventListener("scroll", () => {
      if (modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.classList.remove("modal-open"); // Allow scrolling and interactions
      }
    });
  }
}

customElements.define("card-gallery", CardGallery);