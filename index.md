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



