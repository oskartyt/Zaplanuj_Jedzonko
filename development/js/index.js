var carouselItemIndex = 1;
displayCarouselItem(carouselItemIndex);

function nextCarouselItem(n) {
    displayCarouselItem(carouselItemIndex += n);
}

function currentCarouselItem(n) {
    displayCarouselItem(carouselItemIndex = n);
}

function displayCarouselItem(n) {
    var carouselItems = document.getElementsByClassName("carousel_item");
    if (n > carouselItems.length) {carouselItemIndex = 1}
    if (n < 1) {carouselItemIndex = carouselItems.length}
    for (i = 0; i < carouselItems.length; i++) {
        carouselItems[i].style.display = "none";
    }
    carouselItems[carouselItemIndex-1].style.display = "block";
}