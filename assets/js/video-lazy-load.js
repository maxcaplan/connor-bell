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