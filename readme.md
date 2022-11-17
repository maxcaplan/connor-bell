# connorbell.ca

## Install

Install 
* [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.5.0 or higher
* [RubyGems](https://rubygems.org/pages/download)
* [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/)
* [Yarn](https://yarnpkg.com/getting-started/install)

Install jekyll
```bash
gem install jekyll bundler
```

Install ruby dependencies
```bash
bundle
```

Install yarn dependencies
```
yarn install
```

## Build

Build site to `_site`
```bash
jekyll build
```

Build command for Netlify
```bash
JEKYLL_ENV=production bundle exec jekyll build
```

## Serve Local

Build and serve the site on a local web server on port `4000`
```bash
bundle exec jekyll serve -P 4000 -H 0.0.0.0
```

## Adding Content

### Projects

Create a `markdown` file in `/projects/`

Add the following front matter to the markdown replacing `"projectName"` with the projects name

```yaml
---
layout: project
title: projectName
---
```

Add project page content bellow front matter

------

To have a project card added to the list you must add an entry in `/_data/projects.yml` as follows

```yaml
...

- name: projectName
  head: pathToProjectHead
  link: linkToProjectPage
  tags:
    - projectTag
  description: projectDescription

...
```

The `head` value can be a path to an image file or a webm file
You can add `hide: true` to disable the card from being shown on the page

#### Adding a gif

To add a gif video to the page add the following line.

```liquid
{% include videoGif.html 
webm="pathToWebm" 
mp4="pathToMp4" %}
```

Replace `"pathToWebm"` with a path to the `webm` video to display as a gif.
Replace `"pathToMp4"` with a path to a fallback `mp4` video

To use the lazy loading feature add the following param to the include

```liquid
{% include videoGif.html 
webm="pathToWebm" 
mp4="pathToMp4" 
lazy=true %}
```

And add the following line to the end of the page

```html
<script src="/assets/js/video-lazy-load.js"></script>
```

*Note: this line doesn't need to be added if the `lightbox-gallery.js` script is loaded as this includes the lazy loading script*

#### Adding a gallery

To add a gallery to the page add the following line replacing `"pathToGalleryImages"` with a path to the directory containing the images/videos to create the gallery from

```liquid
{% include gallery.html path="pathToGalleryImages" %}
```

Additionally the following line must be added to the end of the page

```html
<script src="/assets/js/lightbox-gallery.js"></script>
```

Two images are required for each image item in the gallery; the full sized image and a thumbnail image with the names `imagename.jpg` and `imagename-thumb.jpg` respectively with `"imagename"` replaced with the gallery items name. *The `"imagename"` must be the same for both images*

Four videos are required for 'gif' items `videoname.webm`, `videoname-thumb.webm`, `videoname.mp4`, `videoname-thumb.mp4` with `"videoname"` replaced with the gallery items name. *The `"videoname"` must be the same for all videos*

Additional options for the gallery can be found in `/_includes/gallery.html`

#### Adding a Youtube Video

To embed a youtube video add the following line replacing `"videoID"` with the youtube video id of the video you want to embed and `"videoTitle"` with the title of the video

```liquid
{% include ytVideo.html id="videoID" title="videoTitle" %}
```

Additionally, add the following line at the top of the page before the front matter

```html
<head>
<link rel="stylesheet" href="/assets/css/lite-yt-embed.css">
</head>
```

And the following line at the bottom of the page

```html
<script src="/assets/js/lite-yt-embed.js"></script>
```

### Collections

To add a new collection to the animations page create a markdown file in `/projects/animation/`

Add the following front matter to the markdown replacing `"collectionName"` with the projects name

```yaml
---
layout: project
title: collectionName
---
```

Add collection page content bellow front matter

------

To have a gallery item for the collection in the animations page collection gallery you must add an entry in `/_data/collections.yml` as follows

```yaml
...

- name: collectionName
  head: pathToCollectionHead
  link: linkToCollectionPage
  date: collectionDate

...
```

The `head` value can be a path to an image file or a webm file