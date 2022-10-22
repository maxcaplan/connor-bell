---
layout: project
title: ShaderChain

images:
  - path: /assets/images/shaderchain/main
    title:
  - path: /assets/images/shaderchain/realtime
    title:
  - path: /assets/images/shaderchain/uniforms
    title:
  - path: /assets/images/shaderchain/blend
    title:
---

<head>
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/video.css">
  <link href="{{absolute_url}}/assets/css/lightbox.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/gallery.css">
</head>

# ShaderChain
## Multi-platform open source shader composition tool  
<br>
![Shaderchain Screenshot]({{absolute_url}}/assets/images/shaderchain/shaderchain.jpg)

<div class="grid grid-cols-4 gap-4">

{% for image in page.images %}

  <a href="{{absolute_url}}{{image.path}}.gif" data-lightbox="gifs">
    <img src="{{absolute_url}}{{image.path}}_sm.gif"> 
  </a>

{% endfor %}

</div>

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

<iframe src="https://itch.io/embed/682991" width="552" height="167" frameborder="0"><a href="https://connorbell.itch.io/shaderchain">ShaderChain by connorbell</a></iframe>
<br>
### Donations

All proceeds until September are split between One North End Community Fund and First Peoples Justice Center of Montreal. Donations until Sept are matched 3x up to $1000 CAD (by myself, [@cabbibo](twitter.com/cabbibo), and [@dmitricherniak](http://instagram.com/dmitricherniak)).

<script src="{{absolute_url}}/assets/js/lightbox-plus-jquery.min.js"></script>
