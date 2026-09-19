function renderAllBlogsGrid() {
    const gridEl = document.getElementById("all-blogs-grid");
    if (!gridEl || typeof blogs === "undefined" || !Array.isArray(blogs)) return;

    gridEl.innerHTML = blogs.map(blog => {
        return `
            <article class="all-blog-card" data-slug="${blog.slug}">
                <div class="all-blog-thumb-wrap">
                    <img src="${blog.image}" alt="${blog.title}" class="all-blog-img" loading="lazy">
                    <span class="all-blog-category">${blog.category}</span>
                    <a href="blogs.html?slug=${blog.slug}" class="all-blog-overlay-link" aria-label="${blog.title}">
                        <span class="all-blog-overlay-btn"><i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                </div>
                <div class="all-blog-card-body">
                    <div class="all-blog-card-meta">
                        <span><i class="bi bi-calendar3"></i> ${blog.date}</span>
                        <span><i class="bi bi-clock"></i> ${blog.readTime || '5 min read'}</span>
                    </div>
                    <h3 class="all-blog-card-title">
                        <a href="blogs.html?slug=${blog.slug}">${blog.title}</a>
                    </h3>
                    <p class="all-blog-card-excerpt">${blog.excerpt || ''}</p>
                    <div class="all-blog-card-footer">
                        <span class="all-blog-author"><i class="bi bi-person-circle"></i> By ${blog.author || 'Suraj'}</span>
                        <a href="blogs.html?slug=${blog.slug}" class="all-blog-read-more">
                            Read More <i class="bi bi-arrow-up-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function showAllBlogsView() {
    document.title = "Our Latest Blogs & Insights | Sapphire Event & Technology Solutions";

    const allBlogsView = document.getElementById("all-blogs-view");
    const blogDetailView = document.getElementById("blog-detail-view");
    const bannerHeading = document.getElementById("banner-blog-heading");
    const breadcrumbTitle = document.getElementById("breadcrumb-blog-title");

    if (allBlogsView) allBlogsView.style.display = "block";
    if (blogDetailView) blogDetailView.style.display = "none";

    if (bannerHeading) bannerHeading.textContent = "Our Latest Blogs & Insights";
    if (breadcrumbTitle) breadcrumbTitle.innerHTML = "";

    renderAllBlogsGrid();
}

function showBlogDetailView(blog) {
    if (!blog) {
        renderBlogNotFound();
        return;
    }

    document.title = `${blog.title} | Sapphire Event & Technology Solutions`;

    const allBlogsView = document.getElementById("all-blogs-view");
    const blogDetailView = document.getElementById("blog-detail-view");
    const bannerHeading = document.getElementById("banner-blog-heading");
    const breadcrumbTitle = document.getElementById("breadcrumb-blog-title");

    if (allBlogsView) allBlogsView.style.display = "none";
    if (blogDetailView) blogDetailView.style.display = "block";

    if (bannerHeading) bannerHeading.textContent = blog.title;
    if (breadcrumbTitle) {
        breadcrumbTitle.innerHTML = ` <i class="fa-solid fa-angle-right" style="color: white; font-size: 12px; margin: 0 6px;"></i> <span>${blog.title}</span>`;
    }

    const titleEl = document.getElementById("blog-title");
    const imageEl = document.getElementById("blog-image");
    const authorEl = document.getElementById("blog-author");
    const dateEl = document.getElementById("blog-date");
    const contentEl = document.getElementById("blog-content");
    const categoryEl = document.getElementById("blog-category");
    const commentsEl = document.getElementById("blog-comments");
    const readTimeEl = document.getElementById("blog-read-time");

    if (titleEl) titleEl.textContent = blog.title;
    if (imageEl) {
        imageEl.src = blog.image;
        imageEl.alt = blog.title;
    }
    if (authorEl) authorEl.textContent = blog.author || "Suraj";
    if (dateEl) dateEl.textContent = blog.date || "16 Jan, 2026";
    if (contentEl) contentEl.innerHTML = blog.content;
    if (categoryEl) categoryEl.textContent = blog.category || "BUSINESS";
    if (commentsEl) commentsEl.textContent = blog.comments || "12 Comments";
    if (readTimeEl) readTimeEl.textContent = blog.readTime || "5 min read";

    renderRecentBlogs(blog.slug);
}

function renderRecentBlogs(activeSlug) {
    const recentListEl = document.getElementById("recent-blogs-list");
    if (!recentListEl || typeof blogs === "undefined") return;

    recentListEl.innerHTML = blogs.map(item => {
        const isActive = item.slug === activeSlug;
        return `
            <a href="blogs.html?slug=${item.slug}" class="recent-blog-item ${isActive ? 'active-blog' : ''}" aria-label="${item.title}">
                <div class="recent-blog-thumb">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="recent-blog-meta-content">
                    <span class="recent-blog-badge">${item.category || 'EVENT'}</span>
                    <h4 class="recent-blog-item-title">${item.title}</h4>
                    <div class="recent-blog-item-date">
                        <i class="bi bi-calendar3"></i>
                        <span>${item.date}</span>
                    </div>
                </div>
            </a>
        `;
    }).join("");
}

function renderBlogNotFound() {
    const allBlogsView = document.getElementById("all-blogs-view");
    const blogDetailView = document.getElementById("blog-detail-view");
    if (allBlogsView) allBlogsView.style.display = "none";
    if (blogDetailView) blogDetailView.style.display = "block";

    const detailEl = document.querySelector(".blog-detail");
    if (detailEl) {
        detailEl.innerHTML = `
            <div class="blog-not-found-card">
                <i class="bi bi-journal-x not-found-icon"></i>
                <h2>Article Not Found</h2>
                <p>The blog article you are looking for might have been moved or does not exist.</p>
                <div class="not-found-actions">
                    <a href="blogs.html" class="button-style not-found-btn back-to-all-btn">View All Blogs</a>
                    <a href="index.html" class="button-style not-found-btn-primary">Back to Home</a>
                </div>
            </div>
        `;
    }
}

function routeBlogPage() {
    const currentParams = new URLSearchParams(window.location.search);
    const requestedSlug = currentParams.get("slug");
    const requestedId = currentParams.get("id");

    if (requestedSlug) {
        const found = typeof getBlogBySlug === "function" ? getBlogBySlug(requestedSlug) : blogs.find(b => b.slug === requestedSlug);
        showBlogDetailView(found);
    } else if (requestedId) {
        const found = blogs.find(b => b.id === Number(requestedId));
        showBlogDetailView(found);
    } else {
        // Default: Show all blogs in card grid
        showAllBlogsView();
    }
}

// Initial Route
routeBlogPage();

// Handle Browser Back / Forward navigation
window.addEventListener("popstate", () => {
    routeBlogPage();
});

// Intercept Clicks on Blog links to navigate smoothly without full reload
document.addEventListener("click", (e) => {
    // 1. Back to all blogs button
    const backBtn = e.target.closest(".back-to-all-btn, .breadcrumb-blogs-link");
    if (backBtn) {
        e.preventDefault();
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', 'blogs.html');
        }
        showAllBlogsView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // 2. Click on a blog card or blog detail link
    const card = e.target.closest(".all-blog-card");
    const link = e.target.closest('a[href*="blogs.html?slug="]');
    
    let targetSlug = null;
    if (link) {
        try {
            const targetUrl = new URL(link.href, window.location.origin);
            targetSlug = targetUrl.searchParams.get("slug");
        } catch (err) {
            targetSlug = null;
        }
    } else if (card) {
        targetSlug = card.dataset.slug;
    }

    if (!targetSlug) return;

    e.preventDefault();
    const blog = typeof getBlogBySlug === "function" 
        ? getBlogBySlug(targetSlug) 
        : blogs.find(b => b.slug === targetSlug);

    if (blog) {
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `blogs.html?slug=${targetSlug}`);
        }
        showBlogDetailView(blog);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.location.href = `blogs.html?slug=${targetSlug}`;
    }
});
