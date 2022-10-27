// Get all lightbox galleries on page
const galleries = Array.from(document.querySelectorAll(".lightbox-gallery"))
// Get each gallery lightbox pair on page
const galleriesMap = galleries.reduce((result, el) => {
    const gallery = el.querySelector(".lightbox-gallery-gallery")
    const lightbox = el.querySelector(".lightbox-gallery-lightbox")

    // Skip if gallery doesn't have all required elements
    if (gallery === null || lightbox === null) {
        if (gallery === null) console.error(`Lightbox gallery ${el} does not have a "lightbox-gallery-gallery" element`)
        if (lightbox === null) console.error(`Lightbox gallery ${el} does not have a "lightbox-gallery-lightbox" element`)

        return
    }

    result.push({ gallery, lightbox })
    return result
}, [])

// Add event listeners
galleriesMap.forEach(el => {
    // Add click listener to gallery
    el.gallery.addEventListener('click', e => handleGalleryClick(e, el.lightbox))
    // Add click listener to lightbox
    el.lightbox.addEventListener('click', e => handleLightboxClick(e, el.lightbox), false)
    // Add keyboard listener to lightbox
    document.addEventListener('keydown', e => handleLightboxKeydown(e, el.lightbox))
})

/**
 * Handles the click event for a gallery
 * @param {MouseEvent} e - a click event
 * @param {Element} lightbox - the lightbox element associated to this gallery
 */
function handleGalleryClick(e, lightbox) {
    e.preventDefault()

    // If a thumbnail is clicked, open corresponding image in lightbox
    const galleryItem = e.target.closest(".lightbox-gallery-item")

    if (galleryItem && galleryItem.dataset.thumbIndex != undefined) {
        setLightboxSlide(lightbox, Number(galleryItem.dataset.thumbIndex))
        openLightbox(lightbox)
    }
}

/**
 * Handles the click event for a lightbox
 * @param {MouseEvent} e - a click event
 * @param {Element} lightbox - the lightbox element to handle the click for
 */
function handleLightboxClick(e, lightbox) {
    // Close button
    if (e.target.closest(".lightbox-gallery-close")) {
        closeLightbox(lightbox)
        return
    }

    // Prev nav button
    if (e.target.closest(".lightbox-gallery-prev")) {
        prevLightboxSlide(lightbox)
        return
    }

    // Next nav button
    if (e.target.closest(".lightbox-gallery-next")) {
        nextLightboxSlide(lightbox)
        return
    }

    // Close lightbox if clicked outside of content
    if (!e.target.closest(".lightbox-gallery-lightbox-content")) {
        closeLightbox(lightbox)
        return
    }
}

/**
 * Handles the keydown event for a lightbox
 * @param {KeyboardEvent} e - a keyboard event 
 * @param {*} lightbox - the lightbox element to handle the keydown for
 */
function handleLightboxKeydown(e, lightbox) {
    // Prev slide nav
    if (e.code === 'ArrowLeft') {
        prevLightboxSlide(lightbox)
    }
    // Next slide nav
    if (e.code === 'ArrowRight') {
        nextLightboxSlide(lightbox)
    }
    // Close lightbox
    if (e.code === 'Escape') {
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

/** 
 * Lazy loads autoplay video content 
 * Implementation adapted from https://web.dev/lazy-loading-video/#video-gif-replacement
 */
document.addEventListener("DOMContentLoaded", function () {
    // Get all videos to be lazy loaded
    var lazyVideos = Array.from(document.querySelectorAll("video.lazy-load"))

    if ("IntersectionObserver" in window) {
        // Create intersection observer
        var lazyVideoObserver = new IntersectionObserver(entries => {
            entries.forEach(video => {
                // Check if video is visible
                if (video.isIntersecting) {
                    // Enable video sources to load
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    // Load video
                    video.target.load();
                    video.target.classList.remove("lazy-load");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        // Observe all videos to lazy load
        lazyVideos.forEach(lazyVideo => {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
});