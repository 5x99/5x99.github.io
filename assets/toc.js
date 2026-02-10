/**
 * Table of Contents Generator
 * Generates TOC from post/article headings and adds heading IDs
 * Works at runtime in JavaScript for maximum compatibility
 */

document.addEventListener('DOMContentLoaded', function() {
  generateTableOfContents();
  addScrollSpy();
});

function generateTableOfContents() {
  // Find post content area
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  // Get all h2, h3, h4 headings
  const headings = postContent.querySelectorAll('h2, h3, h4');
  
  if (headings.length === 0) {
    // No headings found, remove TOC container
    const tocContainer = document.getElementById('toc-container');
    if (tocContainer) tocContainer.remove();
    return;
  }

  // Add IDs to headings
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = generateSlug(heading.textContent);
    }
  });

  // Build TOC structure
  const tocNav = document.createElement('nav');
  tocNav.className = 'post-toc';
  tocNav.setAttribute('aria-label', 'Table of contents');

  const tocTitle = document.createElement('h3');
  tocTitle.className = 'post-toc-title';
  tocTitle.textContent = 'Quick Navigation';
  tocNav.appendChild(tocTitle);

  // Build nested list structure
  const tocList = document.createElement('ul');
  tocList.className = 'post-toc-list';

  let currentLevel = 0;
  let currentList = tocList;
  const listStack = [{ level: 1, list: tocList }];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]); // Extract number from h2, h3, h4
    const id = heading.id;
    const text = heading.textContent;

    // Adjust nesting based on heading level
    while (listStack.length > 0 && listStack[listStack.length - 1].level >= level) {
      listStack.pop();
    }

    // Create new nested lists if needed
    while (listStack[listStack.length - 1].level < level - 1) {
      const newList = document.createElement('ul');
      newList.className = 'post-toc-list';

      const tempItem = document.createElement('li');
      tempItem.appendChild(newList);

      listStack[listStack.length - 1].list.appendChild(tempItem);
      listStack.push({ level: listStack[listStack.length - 1].level + 1, list: newList });
    }

    // Create new nested list if jumping levels
    if (listStack[listStack.length - 1].level < level) {
      const newList = document.createElement('ul');
      newList.className = 'post-toc-list';

      if (listStack[listStack.length - 1].list.lastElementChild) {
        listStack[listStack.length - 1].list.lastElementChild.appendChild(newList);
      } else {
        const tempItem = document.createElement('li');
        tempItem.appendChild(newList);
        listStack[listStack.length - 1].list.appendChild(tempItem);
      }

      listStack.push({ level: level, list: newList });
      currentList = newList;
    } else {
      currentList = listStack[listStack.length - 1].list;
    }

    // Create TOC item
    const item = document.createElement('li');
    item.className = `toc-item toc-level-${level}`;

    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = 'toc-link';
    link.textContent = text;

    item.appendChild(link);
    currentList.appendChild(item);
  });

  tocNav.appendChild(tocList);

  // Insert TOC into container
  const tocContainer = document.getElementById('toc-container');
  if (tocContainer) {
    tocContainer.appendChild(tocNav);
  }
}

/**
 * Add scroll spy to highlight current section
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


