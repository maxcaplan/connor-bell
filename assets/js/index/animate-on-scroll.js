const scrollElements = document.querySelectorAll(".fade-on-scroll");
const observer = new IntersectionObserver(onIntersectionUpdate, { threshold: 0.5 })

// Add animated elements to interesection observer and set default inital style
scrollElements.forEach(el => {
    el.style.opacity = 0
    observer.observe(el)
})

function onIntersectionUpdate(entries) {
    let i = 0;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade in animation class
            entry.target.classList.add("fade-in-left")

            // Stagger animation from other elements by index
            if (i > 0) entry.target.style.animationDelay = `${i * 0.05}s`

            i++
        }
    });
}