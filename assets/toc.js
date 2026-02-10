/**
 * Automatic Table of Contents Generator
 * Parses post/page headings and generates TOC in sidebar
 * Works with h2, h3, h4 heading levels
 */

document.addEventListener('DOMContentLoaded', function() {
  generateTableOfContents();
});

function generateTableOfContents() {
  // Only generate TOC for posts and pages with .post-content or article
  const contentArea = document.querySelector('.post-content') || document.querySelector('article.main-content');
  const tocNav = document.querySelector('.toc-nav');
  
  if (!contentArea || !tocNav) {
    return;
  }

  // Get all headings from h2 to h4
  const headings = contentArea.querySelectorAll('h2, h3, h4');
  
  if (headings.length === 0) {
    return;
  }

  // Generate IDs for headings that don't have them
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = generateSlug(heading.textContent);
    }
  });

  // Build TOC list
  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';

  let currentLevel = 0;
  let currentList = tocList;
  const listStack = [{ level: 0, list: tocList }];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]); // Extract number from h2, h3, h4
    const text = heading.textContent;
    const id = heading.id;

    // Handle nested lists
    if (level > currentLevel) {
      // Going deeper - create new nested list
      for (let i = currentLevel; i < level; i++) {
        const newList = document.createElement('ul');
        newList.className = 'toc-list';
        
        if (currentList.lastElementChild) {
          const lastItem = currentList.lastElementChild;
          lastItem.appendChild(newList);
        } else {
          const emptyItem = document.createElement('li');
          emptyItem.appendChild(newList);
          currentList.appendChild(emptyItem);
        }
        
        listStack.push({ level: i + 1, list: newList });
        currentList = newList;
      }
    } else if (level < currentLevel) {
      // Going back up - pop from stack
      while (listStack.length > 1 && listStack[listStack.length - 1].level > level) {
        listStack.pop();
      }
      currentList = listStack[listStack.length - 1].list;
    }

    currentLevel = level;

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

  // Replace the TOC nav contents
  const existingList = tocNav.querySelector('.toc-list');
  const existingHint = tocNav.querySelector('.toc-hint');
  
  if (existingList) {
    existingList.replaceWith(tocList);
  } else if (existingHint) {
    existingHint.replaceWith(tocList);
  } else {
    tocNav.appendChild(tocList);
  }

  // Add scroll spy - highlight current section
  addScrollSpy(headings);
}

/**
 * Adds scroll spy to highlight current section in TOC
 */
function addScrollSpy(headings) {
  const tocLinks = document.querySelectorAll('.toc-link');

  function updateActiveLink() {
    let currentHeading = null;
    const scrollPosition = window.scrollY + 100;

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

  window.addEventListener('scroll', updateActiveLink, false);
  updateActiveLink(); // Call once on page load
}

/**
 * Generate a URL-friendly slug from text
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
