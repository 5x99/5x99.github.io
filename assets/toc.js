/**
 * Heading ID Generator
 * Adds IDs to h2, h3, h4 headings in post content if they don't have one
 * TOC is generated at build time by Jekyll, this just enables linking
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find the post content area
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  // Get all headings h2-h4
  const headings = postContent.querySelectorAll('h2, h3, h4');
  
  // Add IDs to headings that don't have them
  headings.forEach(function(heading) {
    if (!heading.id) {
      // Generate slug from heading text
      const id = heading.textContent
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      heading.id = id;
    }
  });
});

