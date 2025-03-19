// document.querySelectorAll('.projectPage-box').forEach(box => {
//     const imageUrl = box.getAttribute('data-image');

//     box.addEventListener('mouseover', () => {
//         box.style.backgroundImage = `url('${imageUrl}')`;
//         box.style.backgroundSize = "cover";
//         box.style.backgroundPosition = "center";
//     });

//     box.addEventListener('mouseout', () => {
//         box.style.backgroundImage = "none";
//     });
// });

const linkIcons = {
    "GitHub": "<i class=\"fa-brands fa-github fa-lg\" style=\"color: #fff;\"></i>", // You can replace with Font Awesome icons
    "Itch.io": "<i class=\"fa-brands fa-itch-io fa-lg\" style=\"color: #fff;\"></i>",
    "Steam": "🕹️",
    "Portfolio": "<i class=\"fa-solid fa-link fa-lg\" style=\"color: #fff;\"></i>"
};



//Expanding project box 
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close");
const imageContainer = document.getElementById("image-container");
let currentImageIndex = 0;
let images = [];

document.querySelectorAll(".projectPage-box").forEach(box => {
    box.addEventListener("click", () => {
        // Focus on popup 
        document.getElementById("modal-title").focus();

        // Populate modal
        document.getElementById("modal-title").textContent = box.dataset.title;
        document.getElementById("modal-team").textContent = box.dataset.team;
        document.getElementById("modal-role").textContent = box.dataset.role;
        document.getElementById("modal-skills").textContent = box.dataset.skills;
        document.getElementById("modal-tools").textContent = box.dataset.tools;

        // Populate links
        const links = JSON.parse(box.dataset.links);
        /*
        // const linksList = document.getElementById("modal-links");
        // linksList.innerHTML = "";
        // for (let key in links) {
        //     let li = document.createElement("li");
        //     let a = document.createElement("a");
        //     a.href = links[key];
        //     a.textContent = key;
        //     a.target = "_blank";
        //     li.appendChild(a);
        //     linksList.appendChild(li);
        // }
        */
        const linksList = document.getElementById("modal-links");
        linksList.innerHTML = "";
        for (let key in links) {
            let a = document.createElement("a");
            a.href = links[key];
            a.target = "_blank";
            a.innerHTML = linkIcons[key] || "🔗"; // Fallback icon
            linksList.appendChild(a);
        }

        // Populate carousel images
        images = JSON.parse(box.dataset.images);
        currentImageIndex = 0;
        updateImage();

        // Show modal
        modal.style.display = "flex";
    });
});

// Close Modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Image Navigation
document.getElementById("prev-btn").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});

document.getElementById("next-btn").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});

function updateImage() {
    imageContainer.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}



// === Calculate Screen Space ===
function adjustModalHeight() {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const modalContent = document.querySelector(".modal-content");

    if (header && footer) {
        const headerHeight = header.offsetHeight + 100;
        const footerHeight = footer.offsetHeight;
        const availableHeight = window.innerHeight - headerHeight - footerHeight;

        modalContent.style.maxHeight = availableHeight + "px";
    }
}

// Adjust on load and window resize
window.addEventListener("load", adjustModalHeight);
window.addEventListener("resize", adjustModalHeight);


