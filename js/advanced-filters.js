// Advanced Product Filtering System
class AdvancedProductFilters {
    constructor() {
        // DOM Elements
        this.productsGrid = document.getElementById('productsGrid');
        this.resultsCount = document.getElementById('resultsCount');
        this.filterToggle = document.getElementById('filterToggle');
        this.filtersPanel = document.getElementById('filtersPanel');
        this.sortSelect = document.getElementById('sortBy');
        this.searchInput = document.getElementById('searchInput');
        this.clearSearchBtn = document.getElementById('clearSearch');
        this.resetFiltersBtn = document.getElementById('resetFilters');
        this.applyFiltersBtn = document.getElementById('applyFilters');
        this.activeFiltersContainer = document.getElementById('activeFilters');
        this.emptyState = document.getElementById('emptyState');
        this.skeletonGrid = document.getElementById('skeletonGrid');
        
        // State
        this.products = [];
        this.filteredProducts = [];
        this.activeFilters = {
            categories: new Set(),
            colors: new Set(),
            minPrice: 0,
            maxPrice: 5000,
            searchQuery: ''
        };
        
        // Initialize
        this.init();
    }
    
    async init() {
        // Load products
        await this.loadProducts();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Initialize filters
        this.initializeFilters();
        
        // Initial render
        this.applyFilters();
        
        // Hide skeleton loader
        this.skeletonGrid.style.display = 'none';
    }
    
    async loadProducts() {
        try {
            const response = await fetch('/data/products.json');
            this.products = await response.json();
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
    
    initEventListeners() {
        // Filter toggle
        this.filterToggle.addEventListener('click', () => {
            const isExpanded = this.filterToggle.getAttribute('aria-expanded') === 'true';
            this.filterToggle.setAttribute('aria-expanded', !isExpanded);
            this.filtersPanel.classList.toggle('active');
        });
        
        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.activeFilters.searchQuery = e.target.value.trim().toLowerCase();
            this.applyFilters();
        });
        
        // Clear search
        this.clearSearchBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.activeFilters.searchQuery = '';
            this.applyFilters();
        });
        
        // Sort select
        this.sortSelect.addEventListener('change', () => {
            this.applyFilters();
        });
        
        // Reset filters
        this.resetFiltersBtn.addEventListener('click', () => {
            this.resetFilters();
        });
        
        // Apply filters
        this.applyFiltersBtn.addEventListener('click', () => {
            this.closeFiltersPanel();
            this.applyFilters();
        });
        
        // Price range sliders
        const rangeMin = document.querySelector('.range-min');
        const rangeMax = document.querySelector('.range-max');
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        
        // Update price inputs when sliders change
        rangeMin.addEventListener('input', (e) => {
            const minVal = parseInt(e.target.value);
            const maxVal = parseInt(rangeMax.value);
            
            if (minVal > maxVal) {
                rangeMax.value = minVal;
                maxPriceInput.value = minVal;
            }
            
            minPriceInput.value = minVal;
            this.activeFilters.minPrice = minVal;
            this.updatePriceTrack();
        });
        
        rangeMax.addEventListener('input', (e) => {
            const maxVal = parseInt(e.target.value);
            const minVal = parseInt(rangeMin.value);
            
            if (maxVal < minVal) {
                rangeMin.value = maxVal;
                minPriceInput.value = maxVal;
            }
            
            maxPriceInput.value = maxVal;
            this.activeFilters.maxPrice = maxVal;
            this.updatePriceTrack();
        });
        
        // Update sliders when inputs change
        minPriceInput.addEventListener('input', (e) => {
            let value = parseInt(e.target.value) || 0;
            if (value < 0) value = 0;
            if (value > 5000) value = 5000;
            
            rangeMin.value = value;
            this.activeFilters.minPrice = value;
            this.updatePriceTrack();
        });
        
        maxPriceInput.addEventListener('input', (e) => {
            let value = parseInt(e.target.value) || 5000;
            if (value < 0) value = 0;
            if (value > 5000) value = 5000;
            
            rangeMax.value = value;
            this.activeFilters.maxPrice = value;
            this.updatePriceTrack();
        });
    }
    
    updatePriceTrack() {
        const rangeMin = document.querySelector('.range-min');
        const rangeMax = document.querySelector('.range-max');
        const track = document.querySelector('.slider-track');
        
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);
        
        track.style.left = (minVal / rangeMin.max * 100) + '%';
        track.style.right = (100 - (maxVal / rangeMax.max * 100)) + '%';
    }
    
    initializeFilters() {
        // Initialize price range
        const minPrice = Math.min(...this.products.map(p => p.price));
        const maxPrice = Math.max(...this.products.map(p => p.price));
        
        document.querySelector('.range-min').max = maxPrice;
        document.querySelector('.range-max').max = maxPrice;
        document.querySelector('.range-max').value = maxPrice;
        document.getElementById('maxPrice').value = maxPrice;
        
        this.activeFilters.maxPrice = maxPrice;
        
        // Initialize categories
        const categories = [...new Set(this.products.flatMap(p => p.category.split(',').map(cat => cat.trim())))];
        const categoryFilters = document.getElementById('categoryFilters');
        
        // Clear existing category buttons
        categoryFilters.innerHTML = '';
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'filter-option';
            button.dataset.category = category;
            button.textContent = this.formatCategoryName(category);
            
            // Add click event listener with proper context
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('active');
                
                if (button.classList.contains('active')) {
                    this.activeFilters.categories.add(category);
                } else {
                    this.activeFilters.categories.delete(category);
                }
                
                // Apply filters immediately when category is toggled
                this.applyFilters();
            });
            
            categoryFilters.appendChild(button);
        });
        
        // Initialize colors
        const colors = [...new Set(this.products.flatMap(p => p.colors || []))];
        const colorFilters = document.getElementById('colorFilters');
        
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            colorDiv.dataset.color = color;
            colorDiv.style.backgroundColor = this.getColorValue(color);
            colorDiv.title = color;
            
            colorDiv.addEventListener('click', () => {
                colorDiv.classList.toggle('active');
                
                if (colorDiv.classList.contains('active')) {
                    this.activeFilters.colors.add(color);
                } else {
                    this.activeFilters.colors.delete(color);
                }
            });
            
            colorFilters.appendChild(colorDiv);
        });
    }
    
    formatCategoryName(category) {
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    getColorValue(colorName) {
        const colorMap = {
            'Branco': '#ffffff',
            'Preto': '#000000',
            'Azul': '#2563eb',
            'Azul Marinho': '#1e40af',
            'Vermelho': '#dc2626',
            'Verde': '#16a34a',
            'Amarelo': '#eab308',
            'Cinza': '#6b7280',
            'Bege': '#d6d3d1',
            'Rosa': '#ec4899',
            'Roxo': '#9333ea',
            'Laranja': '#ea580c',
            'Marrom': '#78350f',
            'Verde Militar': '#3f6212',
            'Azul Royal': '#1d4ed8',
            'Vinho': '#991b1b'
        };
        
        return colorMap[colorName] || '#cccccc';
    }
    
    applyFilters() {
        console.log('Applying filters...', this.activeFilters);
        
        // Apply all filters
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            const matchesSearch = !this.activeFilters.searchQuery || 
                product.name.toLowerCase().includes(this.activeFilters.searchQuery) ||
                (product.description && product.description.toLowerCase().includes(this.activeFilters.searchQuery));
            
            // Category filter
            let matchesCategory = true;
            if (this.activeFilters.categories.size > 0) {
                // Check if any of the product's categories match the selected filters
                const productCategories = product.category.split(',').map(cat => cat.trim());
                matchesCategory = [...this.activeFilters.categories].some(cat => 
                    productCategories.includes(cat)
                );
            }
            
            // Color filter
            let matchesColor = true;
            if (this.activeFilters.colors.size > 0 && product.colors) {
                matchesColor = [...this.activeFilters.colors].some(color => 
                    product.colors.includes(color)
                );
            }
            
            // Price filter
            const matchesPrice = product.price >= this.activeFilters.minPrice && 
                               product.price <= this.activeFilters.maxPrice;
            
            const shouldShow = matchesSearch && matchesCategory && matchesColor && matchesPrice;
            
            return shouldShow;
        });
        
        // Apply sorting
        this.sortProducts();
        
        // Update UI
        this.updateResultsCount();
        this.renderProducts();
        this.updateActiveFilters();
    }
    
    sortProducts() {
        const sortBy = this.sortSelect.value;
        
        switch (sortBy) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default: // 'featured' or any other value
                // Keep the original order or apply featured sorting logic
                break;
        }
    }
    
    updateResultsCount() {
        const count = this.filteredProducts.length;
        this.resultsCount.textContent = `${count} ${count === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
        
        // Show/hide empty state
        if (count === 0) {
            this.emptyState.style.display = 'flex';
        } else {
            this.emptyState.style.display = 'none';
        }
    }
    
    renderProducts() {
        // Clear existing products
        this.productsGrid.innerHTML = '';
        
        // Add masonry sizer and gutter
        const sizer = document.createElement('div');
        sizer.className = 'masonry-sizer';
        this.productsGrid.appendChild(sizer);
        
        const gutter = document.createElement('div');
        gutter.className = 'masonry-gutter';
        this.productsGrid.appendChild(gutter);
        
        // Add products
        this.filteredProducts.forEach((product, index) => {
            const productElement = this.createProductElement(product);
            this.productsGrid.appendChild(productElement);
            
            // Animate in with GSAP
            gsap.fromTo(productElement, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: 'power2.out',
                    onComplete: () => {
                        productElement.classList.add('visible');
                    }
                }
            );
        });
        
        // Initialize masonry layout
        this.initMasonry();
    }
    
    createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.className = 'masonry-item';
        productElement.dataset.category = product.category;
        productElement.dataset.price = product.price;
        
        // Add color data attributes
        if (product.colors && product.colors.length > 0) {
            productElement.dataset.colors = product.colors.join(',');
        }
        
        // Format price
        const formattedPrice = new Intl.NumberFormat('pt-MZ', {
            style: 'currency',
            currency: 'MZN',
            minimumFractionDigits: 2
        }).format(product.price);
        
        // Create product card HTML
        // Create a default image path if the image doesn't exist
        const imagePath = product.image ? product.image : '/placeholder.jpg';
        console.log(`Loading image: ${imagePath} for product: ${product.name}`);
        
        productElement.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img 
                        src="${imagePath}" 
                        alt="${product.name}" 
                        loading="lazy" 
                        onerror="console.error('Error loading image:', this.src); this.src='/placeholder.jpg';">
                    ${product.inStock ? '' : '<span class="product-badge">Esgotado</span>'}
                </div>
                <div class="product-details">
                    <span class="product-category">${this.formatCategoryName(product.category)}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${formattedPrice}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                            <i class="ri-shopping-cart-line"></i>
                            ${product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                        </button>
                        <button class="wishlist-btn" title="Adicionar à lista de desejos">
                            <i class="ri-heart-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const addToCartBtn = productElement.querySelector('.add-to-cart');
        const wishlistBtn = productElement.querySelector('.wishlist-btn');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (product.inStock) {
                    this.addToCart(product);
                }
            });
        }
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                wishlistBtn.classList.toggle('active');
                wishlistBtn.innerHTML = wishlistBtn.classList.contains('active') ? 
                    '<i class="ri-heart-fill"></i>' : 
                    '<i class="ri-heart-line"></i>';
                
                // Add to wishlist logic here
                this.toggleWishlist(product);
            });
        }
        
        // Add click event to navigate to product detail
        productElement.addEventListener('click', () => {
            // Navigate to product detail page
            // window.location.href = `/produto/${product.id}`;
            console.log('Navigate to product:', product.id);
        });
        
        return productElement;
    }
    
    initMasonry() {
        // Use imagesLoaded to ensure all images are loaded before initializing masonry
        imagesLoaded(this.productsGrid, () => {
            // Remove any existing masonry instance
            if (this.masonry) {
                this.masonry.destroy();
            }
            
            // Initialize masonry
            this.masonry = new Masonry(this.productsGrid, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-sizer',
                gutter: '.masonry-gutter',
                percentPosition: true,
                transitionDuration: '0.4s',
                stagger: 30,
                initLayout: false
            });
            
            // Trigger layout after images are loaded
            this.masonry.layout();
            
            // Add a small delay to ensure proper rendering
            setTimeout(() => {
                this.masonry.layout();
            }, 100);
        });
    }
    
    updateActiveFilters() {
        // Clear existing active filters
        this.activeFiltersContainer.innerHTML = '';
        
        // Add active category filters
        this.activeFilters.categories.forEach(category => {
            const filterTag = this.createFilterTag(
                'category', 
                category, 
                this.formatCategoryName(category)
            );
            this.activeFiltersContainer.appendChild(filterTag);
        });
        
        // Add active color filters
        this.activeFilters.colors.forEach(color => {
            const filterTag = this.createFilterTag('color', color, color);
            this.activeFiltersContainer.appendChild(filterTag);
        });
        
        // Add price range filter if not default
        if (this.activeFilters.minPrice > 0 || this.activeFilters.maxPrice < 5000) {
            const priceText = `Preço: ${this.activeFilters.minPrice}MT - ${this.activeFilters.maxPrice}MT`;
            const filterTag = this.createFilterTag('price', 'custom', priceText);
            this.activeFiltersContainer.appendChild(filterTag);
        }
        
        // Add search query if exists
        if (this.activeFilters.searchQuery) {
            const filterTag = this.createFilterTag('search', this.activeFilters.searchQuery, `"${this.activeFilters.searchQuery}"`);
            this.activeFiltersContainer.appendChild(filterTag);
        }
        
        // Show/hide active filters container
        if (this.activeFiltersContainer.children.length > 0) {
            this.activeFiltersContainer.style.display = 'flex';
            
            // Add clear all button if not exists
            if (!document.getElementById('clearAllFilters')) {
                const clearAllBtn = document.createElement('button');
                clearAllBtn.id = 'clearAllFilters';
                clearAllBtn.className = 'clear-all-filters';
                clearAllBtn.textContent = 'Limpar todos';
                clearAllBtn.addEventListener('click', () => this.resetFilters());
                this.activeFiltersContainer.appendChild(clearAllBtn);
            }
        } else {
            this.activeFiltersContainer.style.display = 'none';
        }
    }
    
    createFilterTag(type, value, displayText) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.dataset.type = type;
        tag.dataset.value = value;
        
        tag.innerHTML = `
            <span>${displayText}</span>
            <span class="remove-filter">&times;</span>
        `;
        
        // Add remove event
        const removeBtn = tag.querySelector('.remove-filter');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeFilter(type, value);
        });
        
        return tag;
    }
    
    removeFilter(type, value) {
        switch (type) {
            case 'category':
                this.activeFilters.categories.delete(value);
                // Update UI
                document.querySelectorAll(`.filter-option[data-category="${value}"]`)
                    .forEach(btn => btn.classList.remove('active'));
                break;
                
            case 'color':
                this.activeFilters.colors.delete(value);
                // Update UI
                document.querySelectorAll(`.color-option[data-color="${value}"]`)
                    .forEach(btn => btn.classList.remove('active'));
                break;
                
            case 'price':
                this.activeFilters.minPrice = 0;
                this.activeFilters.maxPrice = 5000;
                // Update UI
                document.querySelector('.range-min').value = 0;
                document.querySelector('.range-max').value = 5000;
                document.getElementById('minPrice').value = '';
                document.getElementById('maxPrice').value = '';
                this.updatePriceTrack();
                break;
                
            case 'search':
                this.activeFilters.searchQuery = '';
                this.searchInput.value = '';
                break;
        }
        
        // Re-apply filters
        this.applyFilters();
    }
    
    resetFilters() {
        // Reset active filters
        this.activeFilters = {
            categories: new Set(),
            colors: new Set(),
            minPrice: 0,
            maxPrice: 5000,
            searchQuery: ''
        };
        
        // Reset UI
        this.searchInput.value = '';
        
        // Reset category filters
        document.querySelectorAll('.filter-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset color filters
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset price range
        document.querySelector('.range-min').value = 0;
        document.querySelector('.range-max').value = 5000;
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        this.updatePriceTrack();
        
        // Reset sort
        this.sortSelect.value = 'featured';
        
        // Apply filters
        this.applyFilters();
        
        // Close filters panel if open
        this.closeFiltersPanel();
    }
    
    closeFiltersPanel() {
        this.filterToggle.setAttribute('aria-expanded', 'false');
        this.filtersPanel.classList.remove('active');
    }
    
    addToCart(product) {
        // Add to cart logic here
        console.log('Added to cart:', product);
        
        // Show success message or update cart count
        this.showToast('Produto adicionado ao carrinho', 'success');
    }
    
    toggleWishlist(product) {
        // Toggle wishlist logic here
        console.log('Toggled wishlist for:', product);
    }
    
    showToast(message, type = 'info') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        gsap.fromTo(toast, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3 }
        );
        
        // Remove after delay
        setTimeout(() => {
            gsap.to(toast, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    document.body.removeChild(toast);
                }
            });
        }, 3000);
    }
}

// Make the class available globally
window.AdvancedProductFilters = AdvancedProductFilters;
