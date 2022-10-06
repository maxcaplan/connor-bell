---
layout: default
title: Animation

images:
  - image_path: /assets/images/gifs/1.gif
    title:
  - image_path: /assets/images/gifs/2.gif
    title:
  - image_path: /assets/images/gifs/3.gif
    title:
  - image_path: /assets/images/gifs/4.gif
    title:
---

<head>
  <link href="{{absolute_url}}/assets/css/lightbox.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/gallery.css">
  <link rel="stylesheet" href="/assets/css/collections.css" />  
</head>

<div class="gallery">

{% for image in page.images %}

  <a href="{{absolute_url}}{{ image.image_path }}" data-lightbox="gifs"><img src="{{absolute_url}}{{ image.image_path }}"> </a>

{% endfor %}

</div>

I've been making shader gifs since 2016-ish.

They typically involve raymarching Signed Distance Fields (SDFs).

<div class="gallery">

{% for member in site.data.collections %}


<a href="{{absolute_url}}/{{member.link}}">
  {{member.name}}
  <img src="{{absolute_url}}/{{member.head}}" />
</a>

{% endfor %}

</div>

<script src="{{absolute_url}}/assets/js/lightbox-plus-jquery.min.js"></script>
