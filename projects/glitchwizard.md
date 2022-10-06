---
layout: default
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

<head>
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/video.css">
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/gallery.css">
  <link href="{{absolute_url}}/assets/css/lightbox.min.css" rel="stylesheet" />
</head>

# Glitch Wizard

<div class="videocontainer">
<iframe src="https://www.youtube.com/embed/brfIMK-GpmI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen  class="video"></iframe>
</div>

<br>

<b><a href="http://glitchwizard.com">
http://glitchwizard.com
</a></b>

**Created with** [Allan Lavell](http://lavell.xyz)

**Trailer by** [Marlon Wiebe](http://mwiebe.com/)

**Language** Objective-C, GLSL

**Press** [Mobile Syrup](https://mobilesyrup.com/2015/04/20/glitch-wizard-makes-beautiful-gifs-out-of-the-worlds-coding-errors/), [Engadget](https://www.engadget.com/2014/09/05/glitch-wizard-is-a-fun-way-to-make-glitchy-images-and-animation), [KillScreen](https://killscreen.com/previously/articles/glitch-wizard-makes-corrupting-media-as-easy-as-applying-instagram-filters/)

<a href="https://itunes.apple.com/app/id904640439">
<img src="{{absolute_url}}/assets/appstore.svg" height="64" alt="Download on the App Store"/>
</a>

<div class="gallery">

{% for image in page.images %}

  <a href="{{absolute_url}}{{ image.image_path }}" data-lightbox="glitch"><img src="{{absolute_url}}{{ image.image_path }}"> </a>

{% endfor %}

</div>

<script src="{{absolute_url}}/assets/js/lightbox-plus-jquery.min.js"></script>
