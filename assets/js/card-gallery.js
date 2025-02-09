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
             left: 50%;
             top: 50%;
             width: 100%;
             height: 100%;
             background: rgba(0, 0, 0, 0.8);
             display: none;
             align-items: center;
             justify-content: center;
             transform: translate(-50%, -50%); /* Pastikan posisi tetap di tengah */
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
      });
    });

    // Event untuk menutup modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Tutup modal saat klik di luar gambar
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}

customElements.define("card-gallery", CardGallery);
