/**
 * Table of Contents Generator for Sidebar
 * Generates TOC from post headings and displays in sidebar
 * Adds heading IDs for linking
 */

document.addEventListener('DOMContentLoaded', function() {
  generateTableOfContents();
  addScrollSpy();
});

function generateTableOfContents() {
  // Find post content area (only on post pages)
  const postContent = document.querySelector('.post-content');
  const sidebarContent = document.getElementById('sidebar-content');
  
  if (!postContent || !sidebarContent) return;

  // Get all h2, h3, h4 headings from the post
  const headings = postContent.querySelectorAll('h2, h3, h4');
  
  if (headings.length === 0) {
    // No headings, keep default Topics
    return;
  }

  // Add IDs to headings
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = generateSlug(heading.textContent);
    }
  });

  // Build TOC navigation
  const tocNav = document.createElement('nav');
  tocNav.className = 'sidebar-toc';
  tocNav.setAttribute('aria-label', 'Post contents');

  const tocTitle = document.createElement('h2');
  tocTitle.className = 'sidebar-title';
  tocTitle.textContent = 'Contents';
  tocNav.appendChild(tocTitle);

  // Build nested list structure
  const tocList = document.createElement('ul');
  tocList.className = 'sidebar-list';

  let previousLevel = 1;
  const levelStack = [{ level: 1, element: tocList }];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]); // h2=2, h3=3, h4=4
    const id = heading.id;
    const text = heading.textContent;

    // Create list item
    const item = document.createElement('li');
    item.className = `toc-item-level-${level}`;

    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = 'toc-link';
    link.textContent = text;

    item.appendChild(link);

    // Handle nesting
    if (level > previousLevel) {
      // Going deeper - create nested list
      for (let i = previousLevel; i < level; i++) {
        const newList = document.createElement('ul');
        newList.className = 'sidebar-list';
        
        const tempItem = document.createElement('li');
        tempItem.appendChild(newList);
        
        levelStack[levelStack.length - 1].element.appendChild(tempItem);
        levelStack.push({ level: i + 1, element: newList });
      }
    } else if (level < previousLevel) {
      // Going back up - pop from stack
      while (levelStack.length > 1 && levelStack[levelStack.length - 1].level > level) {
        levelStack.pop();
      }
    }

    levelStack[levelStack.length - 1].element.appendChild(item);
    previousLevel = level;
  });

  tocNav.appendChild(tocList);

  // Replace sidebar content with TOC
  sidebarContent.innerHTML = '';
  sidebarContent.appendChild(tocNav);
}

/**
 * Add scroll spy to highlight current section in TOC
 */
function addScrollSpy() {
  const headings = document.querySelectorAll('.post-content h2, .post-content h3, .post-content h4');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (headings.length === 0 || tocLinks.length === 0) return;

  function updateActiveLink() {
    let currentHeading = null;
    const scrollPosition = window.scrollY + 150;

    for (let heading of headings) {
      if (heading.offsetTop <= scrollPosition) {
        currentHeading = heading;
      } else {
        break;
      }
    }

    tocLinks.forEach(link => {
      link.classList.remove('active');
    });

    if (currentHeading) {
      const activeLink = document.querySelector(`.toc-link[href="#${currentHeading.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * Generate URL-friendly slug from text
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}



