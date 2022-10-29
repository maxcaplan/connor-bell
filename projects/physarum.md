---
layout: project
title: Animation
---

<head>
  <link rel="stylesheet" href="{{absolute_url}}/assets/css/video.css">
</head>

# Physarum Simulation

<video width="720" height="500" controls>
  <source src="/assets/videos/physarum/phys.webm#t=4" type="video/webm">
  <source src="/assets/videos/physarum/phys.mp4#t=4" type="video/mp4">
Video not supported
</video>

## **Code**: Metal, Swift
## **Repo**: [https://git.sr.ht/~connorbell/Physarum-Metal](https://git.sr.ht/~connorbell/Physarum-Metal)

Experiments with slime mold simulations described by the paper ["Characteristics of pattern formation and evolution in approximations of Physarum transport networks."](https://uwe-repository.worktribe.com/output/980579), written about and implemented by [Sage Jensen]((http://twitter.com/mxsage)).

I combined the trail maps with signed distance functions and feedback loops in order to influence the particle agents beyond their flocking-like behaviour.
