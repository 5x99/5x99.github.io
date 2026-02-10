---
title: Home
description: "0000099 - A blog about technology, troubleshooting, and computer science"
permalink: /
sitemap_exclude: n
---

# Welcome to 0000099.xyz

A blog documenting the journey through computer-related problems, solutions, and discoveries.

## Latest Articles

<ul class="posts">
  {% for post in site.posts limit:10 %}
<li class="posts">
  <svg class="post-icon" viewBox="0 0 24 24" aria-hidden="true"
       xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M20.5,22H4c-0.2,0-0.3,0-0.5,0C1.6,22,0,20.4,0,18.5V6h5V2h19v16.5C24,20.4,22.4,22,20.5,22z M6.7,20h13.8
        c0.8,0,1.5-0.7,1.5-1.5V4H7v14.5C7,19,6.9,19.5,6.7,20z M2,8v10.5C2,19.3,2.7,20,3.5,20S5,19.3,5,18.5V8H2z"/>
      <rect x="15" y="6" width="5" height="6"/>
      <rect x="9" y="6" width="4" height="2"/>
      <rect x="9" y="10" width="4" height="2"/>
      <rect x="9" y="14" width="11" height="2"/>
    </g>
  </svg>

  <strong>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </strong>
  <span style="color: #666;"> — {{ post.date | date: "%B %d, %Y" }}</span>
</li>
  {% endfor %}
</ul>

{% if site.posts.size > 10 %}
  <p><a href="/posts/">View all {{ site.posts.size }} posts →</a></p>
{% endif %}

## Quick Links

- **[All Posts](/posts/)** - Browse all articles
- **[About](/about/)** - Learn more about this blog
- **[Subscribe](/feed.xml)** - RSS Feed

## Contact

- Email: [0000099@duck.com](mailto:0000099@duck.com)
- Bluesky: [@0000099.xyz](https://bsky.app/profile/0000099.xyz)

## Subscribe to Updates

Stay updated with new articles:
- [RSS Feed](/feed.xml)
- [Atom Feed](/atom.xml)

<footer>
  <p>© {{ 'now' | date: '%Y' }} 0000099.xyz</p>
  <p>This page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nd/4.0/">Creative
Commons Attribution-NoDerivatives 4.0 International License</a></p>
</footer>



