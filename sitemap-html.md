---
layout: default
title: Sitemap
description: "Complete list of all pages and posts on 0000099.xyz"
permalink: /sitemap-html/
sitemap_exclude: n
---

# Sitemap

A complete list of all pages and content on this website.

## Pages

- [Home](/index.html)
- [All Posts](/posts/)
- [About](/about/)
- [404 Error](/404.html)

## Recent Posts

<ul class="posts">
  {% for post in site.posts %}
  <li class="posts">
    <strong>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </strong>
    <span style="color: #666;"> — {{ post.date | date: "%B %d, %Y" }}</span>
    {% if post.excerpt %}
    <p style="margin-top: 0.5em; color: #666;">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

## Feeds & Subscriptions

- [RSS Feed](/feed.xml)
- [Atom Feed](/atom.xml)
- [Google News Feed](/feed-news.xml)

## Search Engines

- [XML Sitemap](/sitemap.xml) - For search engines
- [robots.txt](/robots.txt) - Crawling guidelines

<footer>
  <p>© {{ 'now' | date: '%Y' }} 0000099.xyz</p>
  <p>This page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nd/4.0/">Creative
Commons Attribution-NoDerivatives 4.0 International License</a></p>
</footer>
