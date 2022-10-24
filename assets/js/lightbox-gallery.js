// Get all lightbox galleries on page
const galleries = Array.from(document.querySelectorAll(".lightbox-gallery"))
// Get each gallery lightbox pair on page
const galleriesMap = galleries.reduce((result, el) => {
    const gallery = el.querySelector(".lightbox-gallery-gallery")
    const lightbox = el.querySelector(".lightbox-gallery-lightbox")

    // Check that the gallery has all required elements
    if (gallery === null) {
        console.error(`Lightbox gallery ${el} does not have a "lightbox-gallery-gallery" element`)
        return
    }
    if (lightbox === null) {
        console.error(`Lightbox gallery ${el} does not have a "lightbox-gallery-lightbox" element`)
        return
    }

    result.push({ gallery, lightbox })
    return result
}, [])

galleriesMap.forEach(el => {
    // Add event listeners to all gallery items
    const galleryItems = el.gallery.querySelectorAll(".lightbox-gallery-item")
    galleryItems.forEach(item => {
        item.addEventListener('click', e => galleryItemClick(e, item, el.lightbox))
    })

    // Add event listener to close button
    const lightboxCloseButton = el.lightbox.querySelector(".lightbox-gallery-close")
    lightboxCloseButton.addEventListener('click', e => { closeLightbox(el.lightbox) })

    // Add event listener to nav buttons
    const lightboxPrevButton = el.lightbox.querySelector(".lightbox-gallery-prev")
    lightboxPrevButton.addEventListener('click', e => { prevLightboxSlide(el.lightbox) })
    const lightboxNextButton = el.lightbox.querySelector(".lightbox-gallery-next")
    lightboxNextButton.addEventListener('click', e => { nextLightboxSlide(el.lightbox) })

    el.lightbox.addEventListener('click', e => { handleLightboxClick(e, el.lightbox) }, false)
})

/**
 * Handles the click event for gallery items
 * @param {MouseEvent} e - a click event
 * @param {Element} el - the html element that the original event was called from
 * @param {Element} lightbox - the lightbox element to display the image
 */
function galleryItemClick(e, el, lightbox) {
    e.preventDefault()
    setLightboxSlide(lightbox, Number(el.dataset.thumbIndex))
    openLightbox(lightbox)
}

/**
 * Handles the click event for the lightbox
 * @param {MouseEvent} e - a click event
 * @param {Element} lightbox - the lightbox element to handle the click for
 */
function handleLightboxClick(e, lightbox) {
    // Close lightbox if clicked outside of content
    if (!e.target.closest(".lightbox-gallery-lightbox-content")) {
        closeLightbox(lightbox)
    }
}

/**
 * Sets the current visible slide of the lightbox
 * @param {Element} lightbox - the lightbox element to set the slide of
 * @param {number} n - the number of the slide to set
 */
function setLightboxSlide(lightbox, n) {
    const slides = lightbox.querySelectorAll(".lightbox-gallery-slide")
    let visible = false

    // Set the first slide with a slide index equal to n to visible
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        if (Number(slide.dataset.slideIndex) === n && visible === false) {
            slide.classList.remove("hidden")
            lightbox.dataset.activeSlideIndex = i
            visible = true
        } else {
            slide.classList.add("hidden")
        }
    }

    // If no slide indices were equal to n, set the first slide to visible 
    if (visible === false) {
        slides[0].classList.remove("hidden")
        lightbox.dataset.activeSlideIndex = 0
    }
}

/**
 * Sets the active lightbox slide to the next index or wraps to index 0
 * @param {Element} lightbox - lightbox element to set the next slide of
 */
function nextLightboxSlide(lightbox) {
    const currentSlideIndex = Number(lightbox.dataset.activeSlideIndex) || 0
    const totalSlides = lightbox.querySelectorAll(".lightbox-gallery-slide").length

    const nextSlideIndex = currentSlideIndex + 1 < totalSlides ? currentSlideIndex + 1 : 0

    setLightboxSlide(lightbox, nextSlideIndex)
}

/**
 * Sets the active lightbox slide to the previous index or wraps to the last index
 * @param {Element} lightbox - lightbox element to set the next slide of
 */
function prevLightboxSlide(lightbox) {
    const currentSlideIndex = Number(lightbox.dataset.activeSlideIndex) || 0
    const totalSlides = lightbox.querySelectorAll(".lightbox-gallery-slide").length

    const prevSlideIndex = currentSlideIndex - 1 >= 0 ? currentSlideIndex - 1 : totalSlides - 1

    setLightboxSlide(lightbox, prevSlideIndex)
}

/**
 * Makes a lightbox element visible
 * @param {Element} lightbox - the lightbox element to open
 */
function openLightbox(lightbox) {
    lightbox.classList.remove("hidden")
    document.documentElement.style.overflowY = "hidden"
}

/**
 * Makes a lightbox element hidden
 * @param {Element} lightbox - the lightbox element to close
 */
function closeLightbox(lightbox) {
    lightbox.classList.add("hidden")
    document.documentElement.style.overflowY = "auto"
}