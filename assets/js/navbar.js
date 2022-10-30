const mobileNav = document.getElementById("mobile-nav")
document.addEventListener('click', e => { handleClick(e) })

/**
 * Opens the mobile nav menu
 * @param {MouseEvent} e 
 */
function openMobileNav(e) {
    mobileNav.classList.remove("translate-x-full")
}

/**
 * Closes the mobile nav menu
 * @param {MouseEvent} e 
 */
function closeMobileNav(e) {
    mobileNav.classList.add("translate-x-full")
}

/**
 * Handles document click events
 * @param {MouseEvent} e 
 */
function handleClick(e) {
    if (e.target.closest("#mobile-nav-open")) {
        openMobileNav(e)
        return
    }

    if (e.target.closest("#mobile-nav-close")) {
        closeMobileNav(e)
        return
    }

    if (!e.target.closest("#mobile-nav")) {
        closeMobileNav(e)
        return
    }
}