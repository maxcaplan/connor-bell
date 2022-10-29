---
layout: project
title: ShaderChain
---

# ShaderChain
## Multi-platform open source shader composition tool

<picture>
    <source type="image/webp" srcset="/assets/images/shaderchain/shaderchain-800w.webp" media="(min-width: 600px)" />
    <source type="image/webp" srcset="/assets/images/shaderchain/shaderchain-600w.webp" />

    <source type="image/jpeg" srcset="/assets/images/shaderchain/shaderchain-800w.jpg" media="(min-width: 600px)" />
    <img src="/assets/images/shaderchain/shaderchain-600w.jpg" alt="Shaderchain"
        class="w-full aspect-auto" loading="lazy" />
</picture>

{% include gallery.html path="/assets/images/shaderchain/gallery/" size="md" %}

### Features
* Build a shader stack with each rendered texture input to the next pass
* Define uniforms with JSON which map to UI and MIDI
* Serialize shader chains and uniforms to presets
* Create texture uniforms with video, webcam, microphone, sound files, framebuffer swaps, or other passes
* Render to PNGs, encode mp4s and gifs (ffmpeg required - install [here](https://ffmpeg.org/download.html))
* Gif encoding supports setting number of colors and scaled resolution
* Mp4 encoding supports looping video
* Use precise duration and framerate for slick looping gifs 🤩
* Build a midi map with the UI
* Livecode by going full screen and hiding the UI (bring your own editor)
* Frame averaging for motion blur
* Wasd+mouse camera control uniform
* Audio accumulator uniform (by [Eris Fairbanks](http://twitter.com/sometimesmusic))

### Download
Compile and contribute at the [repo](https://git.sr.ht/~connorbell/ShaderChain)  

<iframe src="https://itch.io/embed/682991?bg_color=000000&fg_color=eecefa&link_color=a75bfa&border_color=737373" width="552" height="167" frameborder="0"><a href="https://connorbell.itch.io/shaderchain">ShaderChain by connorbell</a></iframe>

### Donations

All proceeds until September are split between One North End Community Fund and First Peoples Justice Center of Montreal. Donations until Sept are matched 3x up to $1000 CAD (by myself, [@cabbibo](twitter.com/cabbibo), and [@dmitricherniak](http://instagram.com/dmitricherniak)).

<script src="/assets/js/lightbox-gallery.js"></script>