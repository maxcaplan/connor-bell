---
layout: project
title: Animation
images:
  - image_path: /assets/images/gw/1.JPG
    title:
  - image_path: /assets/images/gw/2.JPG
    title:
  - image_path: /assets/images/gw/3.JPG
    title:
  - image_path: /assets/images/gw/4.JPG
    title:
  - image_path: /assets/images/gw/5.JPG
    title:
  - image_path: /assets/images/gw/6.JPG
    title:
  - image_path: /assets/images/gw/7.GIF
    title:
  - image_path: /assets/images/gw/8.JPG
    title:
  - image_path: /assets/images/gw/9.GIF
    title:
---

# Glitch Wizard

{% include ytVideo.html url="https://www.youtube.com/embed/brfIMK-GpmI" %}

[http://glitchwizard.com](http://glitchwizard.com)

**Created with** [Allan Lavell](http://lavell.xyz)

**Trailer by** [Marlon Wiebe](http://mwiebe.com/)

**Language** Objective-C, GLSL

**Press** [Mobile Syrup](https://mobilesyrup.com/2015/04/20/glitch-wizard-makes-beautiful-gifs-out-of-the-worlds-coding-errors/), [Engadget](https://www.engadget.com/2014/09/05/glitch-wizard-is-a-fun-way-to-make-glitchy-images-and-animation), [KillScreen](https://killscreen.com/previously/articles/glitch-wizard-makes-corrupting-media-as-easy-as-applying-instagram-filters/)

<a href="https://itunes.apple.com/app/id904640439">
<img src="{{absolute_url}}/assets/appstore.svg" height="64" alt="Download on the App Store"/>
</a>

<div class="gallery">

{% for image in page.images %}

  <a href="{{absolute_url}}{{ image.image_path }}" data-lightbox="glitch"><img class="w-full" src="{{absolute_url}}{{ image.image_path }}"> </a>

{% endfor %}

</div>

