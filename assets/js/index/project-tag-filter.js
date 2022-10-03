const filterTagElements = document.getElementById("project-tags").children
const cardElements = document.getElementById("project-cards").children

let filterTags = []

// Add click event listeners to all filter tags
Array.from(filterTagElements).forEach(el => {
    el.addEventListener("click", e => onTagClick(e))
})

/**
 * Updates tag filters when a filter tag is clicked
 * @param {Event} e - The click event for the clicked tag
 */
function onTagClick(e) {
    let el = e.target
    let tag = el.innerText

    let tagIndex = filterTags.indexOf(tag)

    if (tagIndex == -1) {
        // If tag is not active
        filterTags.push(tag)
        el.classList.add("active")
    } else {
        // If tag is active
        filterTags.splice(tagIndex, 1)
        el.classList.remove("active")
    }

    // Update states of cards
    setCardStates()
}

/** Sets the visibility state of each card based on the tag filters */
function setCardStates() {
    Array.from(cardElements).forEach(card => {
        if (filterTags.length > 0) {
            let cardTagElements = card.querySelector("#card-tags").children

            // Get the first tag that matches the tag filter. undefined if none
            let activeTag = Array.from(cardTagElements).find(tag => {
                return filterTags.indexOf(tag.innerText) > -1
            })

            // If there is an active tag, show card, else, hide
            if (activeTag) {
                card.classList.remove("hidden")
            } else {
                card.classList.add("hidden")
            }
        } else {
            // Show all cards if there are no active filters
            card.classList.remove("hidden")
        }
    })
}

// Update card states on load
setCardStates()