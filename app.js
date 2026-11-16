// Apartment information shown in the View Details pop-up.
// Update these values if the owner provides more information.
const apartments = [
  {
    title: "1 Bedroom/Bathroom Apartment",
    price: "₱5,000/month",
    image: "assets/apartment-1.jpg"
  },
  {
    title: "1 Bedroom/Bathroom Apartment",
    price: "₱6,500/month",
    image: "assets/apartment-2.jpg"
  },
  {
    title: "1 Bedroom/Bathroom Apartment",
    price: "₱8,000/month",
    image: "assets/apartment-3.jpg"
  }
];

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Apartment details dialog
const detailsDialog = document.getElementById("detailsDialog");
const dialogImage = document.getElementById("dialogImage");
const dialogTitle = document.getElementById("dialogTitle");
const dialogPrice = document.getElementById("dialogPrice");

document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const apartment = apartments[Number(button.dataset.apartment)];
    if (!apartment) return;

    dialogImage.src = apartment.image;
    dialogImage.alt = apartment.title;
    dialogTitle.textContent = apartment.title;
    dialogPrice.textContent = apartment.price;

    if (typeof detailsDialog.showModal === "function") {
      detailsDialog.showModal();
    } else {
      alert(`${apartment.title}\n${apartment.price}\nPlease contact the owner for availability.`);
    }
  });
});

document.getElementById("dialogClose").addEventListener("click", () => {
  detailsDialog.close();
});

detailsDialog.addEventListener("click", (event) => {
  // Close when the user clicks the dark area outside the dialog.
  if (event.target === detailsDialog) detailsDialog.close();
});

document.getElementById("dialogContact").addEventListener("click", () => {
  detailsDialog.close();
});

// Contact form: no database or backend is used.
// Submitting opens the visitor's default email application (mailto).
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const subject = String(formData.get("subject")).trim();
  const message = String(formData.get("message")).trim();

  const emailSubject = encodeURIComponent(`Apartment inquiry: ${subject}`);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Opening your email application...";
  window.location.href =
    `mailto:Renzermita@gmail.com?subject=${emailSubject}&body=${emailBody}`;
});

// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
