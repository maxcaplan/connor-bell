---
layout: default
title: Animation
images:
  - image_path: /assets/images/moonshadow/1.jpg
    title:
  - image_path: /assets/images/moonshadow/2.jpg
    title:
  - image_path: /assets/images/moonshadow/3.jpg
    title:
  - image_path: /assets/images/moonshadow/4.jpg
    title:
  - image_path: /assets/images/moonshadow/5.jpg
    title:
  - image_path: /assets/images/moonshadow/6.jpg
    title:
  - image_path: /assets/images/moonshadow/7.jpg
    title:
  - image_path: /assets/images/moonshadow/8.jpg
    title:
  - image_path: /assets/images/moonshadow/9.jpg
    title:
  - image_path: /assets/images/moonshadow/10.jpg
    title:
  - image_path: /assets/images/moonshadow/11.jpg
    title:
  - image_path: /assets/images/moonshadow/12.jpg
    title:
  - image_path: /assets/images/moonshadow/13.jpg
    title:
  - image_path: /assets/images/moonshadow/14.jpg
    title:
  - image_path: /assets/images/moonshadow/15.jpg
    title:
  - image_path: /assets/images/moonshadow/16.jpg
    title:
  - image_path: /assets/images/moonshadow/17.jpg
    title:
  - image_path: /assets/images/moonshadow/18.jpg
    title:
  - image_path: /assets/images/moonshadow/19.jpg
    title:
  - image_path: /assets/images/moonshadow/20.jpg
    title:
---

<head>
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/video.css">
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/gallery.css">
  <link href="{{absolute_url}}/assets/css/lightbox.min.css" rel="stylesheet" />
</head>

![Banner]({{absolute_url}}/assets/images/moonshadow/banner.png)

## Platform: iOS, Android

**Language** GLSL, Objective-C, Java

**Status** Discontinued but maybe back in some form some day.

I wanted to make something free, open source and collaborative. I invited shader artists [Cale Bradbury](http://twitter.com/netgrind), [Devin Horsman](http://twitter.com/horsman), [Yancy Way](http://twitter.com/echophons) and [Rob Butler](http://twitter.com/botreats) to create effects for the applications. Each shader could be masked to colors of the input image, parameterized by a threshold.

<div class="gallery">

{% for image in page.images %}

  <a href="{{absolute_url}}{{ image.image_path }}" data-lightbox="glitch"><img src="{{absolute_url}}{{ image.image_path }}"> </a>

{% endfor %}

</div>

<script src="{{absolute_url}}/assets/js/lightbox-plus-jquery.min.js"></script>
