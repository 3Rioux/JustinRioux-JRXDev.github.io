document.addEventListener('DOMContentLoaded', function () {
    // List your image paths here:
    const images = [
        "../../images/Projects/7ProjectRise/Rise_Tugging_2025.jpg",
        "../../images/Projects/7ProjectRise/CrapQuality_Screenshot_2025-06-05.jpg",
        // "../../images/Projects/7ProjectRise/Rise_Screenshot3.jpg"
        // Add more image paths as needed
    ];
    let current = 0;
    const img = document.querySelector('.carousel__image');
    const prevBtn = document.querySelector('.carousel__btn--prev');
    const nextBtn = document.querySelector('.carousel__btn--next');

    function showImage(idx) {
        img.src = images[idx];
    }

    prevBtn.addEventListener('click', function () {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    nextBtn.addEventListener('click', function () {
        current = (current + 1) % images.length;
        showImage(current);
    });
});

//Smooth Scrolling Carousel Example: https://www.nieknijland.nl/blog/make-a-responsive-carousel-with-just-css
//  const list = document.querySelector(".list");

//   // We want to know the width of one of the items. We'll use this to decide how many pixels we want our carousel to scroll.
//   const item = document.querySelector(".item");
//   const itemWidth = item.offsetWidth;

//   function handleClick(direction) {
//     // Based on the direction we call `scrollBy` with the item width we got earlier
//     if(direction === "previous") {
//       list.scrollBy({ left: -itemWidth, behavior: "smooth" });
//     } else {
//       list.scrollBy({ left: itemWidth, behavior: "smooth" });
//     }
//   }



