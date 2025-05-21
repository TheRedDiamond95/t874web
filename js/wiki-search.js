// Wiki search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('wikiSearch');
  const searchResults = document.getElementById('searchResults');
  const wikiContent = document.querySelector('.wiki-directory');
  const featuredArticles = document.querySelector('.featured-articles');
  
  // Get all wiki links
  const wikiLinks = Array.from(document.querySelectorAll('.wiki-directory a, .featured-articles a'));
  
  // Create a map of links to their parent categories
  const linkMap = new Map();
  wikiLinks.forEach(link => {
    const category = link.closest('.wiki-category');
    if (category) {
      const categoryTitle = category.querySelector('h3').textContent;
      linkMap.set(link, categoryTitle);
    }
  });

  // Search function with debounce
  let searchTimeout;
  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length < 2) {
        // Hide results and show original content
        searchResults.classList.add('hidden');
        wikiContent.classList.remove('hidden');
        featuredArticles.classList.remove('hidden');
        return;
      }

      // Filter links based on search query
      const matches = wikiLinks.filter(link => {
        const text = link.textContent.toLowerCase();
        const href = link.getAttribute('href').toLowerCase();
        return text.includes(query) || href.includes(query);
      });

      // Update UI
      if (matches.length > 0) {
        // Hide original content
        wikiContent.classList.add('hidden');
        featuredArticles.classList.add('hidden');
        
        // Show and update results
        searchResults.classList.remove('hidden');
        searchResults.innerHTML = `
          <div class="card p-4">
            <h3 class="text-lg font-semibold mb-4">Search Results</h3>
            <div class="space-y-4">
              ${matches.map(link => {
                const category = linkMap.get(link);
                return `
                  <div class="search-result-item p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <div class="flex items-center justify-between">
                      <div>
                        <a href="${link.getAttribute('href')}" class="text-blue-600 hover:text-blue-800 font-medium">
                          ${link.textContent}
                        </a>
                        ${category ? `<span class="text-sm text-gray-500 ml-2">in ${category}</span>` : ''}
                      </div>
                      <i data-feather="arrow-right" class="text-gray-400"></i>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
        
        // Reinitialize Feather icons
        if (window.feather) {
          feather.replace();
        }
      } else {
        // Show no results message
        searchResults.classList.remove('hidden');
        wikiContent.classList.add('hidden');
        featuredArticles.classList.add('hidden');
        searchResults.innerHTML = `
          <div class="card p-4">
            <div class="text-center py-8">
              <i data-feather="search" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
              <p class="text-gray-500">Try different keywords or browse the categories below</p>
            </div>
          </div>
        `;
        
        // Reinitialize Feather icons
        if (window.feather) {
          feather.replace();
        }
      }
    }, 300); // 300ms debounce
  });

  // Clear search on escape key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      searchResults.classList.add('hidden');
      wikiContent.classList.remove('hidden');
      featuredArticles.classList.remove('hidden');
    }
  });
}); 