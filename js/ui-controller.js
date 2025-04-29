// UI Controller for tab switching, sidebar toggle, and modals

// Direct implementation of tab switching
function switchTab(tabId, subType) {
    console.log('Tab switching to:', tabId, subType ? 'with subType: ' + subType : '');

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'text-blue-600', 'bg-blue-50', 'border-blue-500');
        btn.classList.add('text-gray-600', 'border-transparent');
    });

    let button;

    // Handle book types
    if (tabId === 'books' && subType) {
        const ebooksTab = document.getElementById('tab-ebooks');
        const physicalBooksTab = document.getElementById('tab-physical-books');
        [ebooksTab, physicalBooksTab].forEach(tab => {
            if (tab) {
                tab.classList.remove('active', 'text-blue-600', 'bg-blue-50', 'border-blue-500');
                tab.classList.add('text-gray-600', 'border-transparent');
            }
        });
        button = subType === 'ebook' ? ebooksTab : physicalBooksTab;

        // Expand accordion header and content
        const accordionContent = document.querySelector('#books-accordion-btn + .accordion-content');
        const accordionHeader = document.getElementById('books-accordion-btn');
        const chevronIcon = accordionHeader.querySelector('.fa-chevron-down');

        if (accordionContent.classList.contains('hidden')) {
            accordionContent.classList.remove('hidden');
            chevronIcon.style.transform = 'rotate(180deg)';
        }
        accordionHeader.classList.add('text-blue-600', 'border-blue-500');
        accordionHeader.classList.remove('text-gray-600', 'border-transparent');
    }
    // Handle equipment types
    else if (tabId === 'equipment' && subType) {
        const myEquipmentTab = document.getElementById('tab-my-equipment');
        const borrowEquipmentTab = document.getElementById('tab-borrow-equipment');
        [myEquipmentTab, borrowEquipmentTab].forEach(tab => {
            if (tab) {
                tab.classList.remove('active', 'text-blue-600', 'bg-blue-50', 'border-blue-500');
                tab.classList.add('text-gray-600', 'border-transparent');
            }
        });
        button = subType === 'borrowed' ? myEquipmentTab : borrowEquipmentTab;

        // Show/hide content sections
        const myContent = document.getElementById('my-equipment-content');
        const borrowContent = document.getElementById('borrow-equipment-content');
        if (subType === 'borrowed') {
            myContent?.classList.remove('hidden');
            borrowContent?.classList.add('hidden');
        } else {
            myContent?.classList.add('hidden');
            borrowContent?.classList.remove('hidden');
        }

        // Expand accordion
        const accContent = document.querySelector('#equipment-accordion-btn + .accordion-content');
        const accHeader = document.getElementById('equipment-accordion-btn');
        const accChevron = accHeader.querySelector('.fa-chevron-down');
        if (accContent.classList.contains('hidden')) {
            accContent.classList.remove('hidden');
            accChevron.style.transform = 'rotate(180deg)';
        }
        accHeader.classList.add('text-blue-600', 'border-blue-500');
        accHeader.classList.remove('text-gray-600', 'border-transparent');
    } else {
        button = document.getElementById('tab-' + tabId);
    }

    if (button) {
        button.classList.add('active', 'text-blue-600', 'bg-blue-50', 'border-blue-500');
        button.classList.remove('text-gray-600', 'border-transparent');
    }

    // Reset other accordions when switching away
    if (tabId !== 'books') {
        const btn = document.getElementById('books-accordion-btn');
        const cont = document.querySelector('#books-accordion-btn + .accordion-content');
        const ch = btn.querySelector('.fa-chevron-down');
        btn.classList.remove('text-blue-600', 'border-blue-500');
        btn.classList.add('text-gray-600', 'border-transparent');
        if (!cont.classList.contains('hidden')) {
            cont.classList.add('hidden');
            ch.style.transform = 'rotate(0deg)';
        }
    }
    if (tabId !== 'equipment') {
        const btn = document.getElementById('equipment-accordion-btn');
        const cont = document.querySelector('#equipment-accordion-btn + .accordion-content');
        const ch = btn.querySelector('.fa-chevron-down');
        btn.classList.remove('text-blue-600', 'border-blue-500');
        btn.classList.add('text-gray-600', 'border-transparent');
        if (!cont.classList.contains('hidden')) {
            cont.classList.add('hidden');
            ch.style.transform = 'rotate(0deg)';
        }
    }

    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('active');
    });

    // Show the corresponding tab pane
    const pane = document.getElementById(tabId + '-content');
    if (pane) {
        pane.classList.remove('hidden');
        pane.classList.add('active');
        console.log('Switched to tab:', tabId);
        if (tabId === 'books' && typeof window.filterAndSortBooks === 'function') {
            window.filterAndSortBooks(subType);
        }
        if (typeof window.initStickyHeaders === 'function') {
            setTimeout(window.initStickyHeaders, 0);
        }
    }
}
window.switchTab = switchTab;

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || window.innerWidth <= 768) return;
    sidebar.classList.toggle('sidebar-collapsed');
    sidebar.classList.toggle('sidebar-expanded');
    sidebar.style.width = sidebar.classList.contains('sidebar-collapsed') ? '4rem' : '16rem';
    localStorage.setItem('sidebarState', sidebar.classList.contains('sidebar-collapsed') ? 'collapsed' : 'expanded');
}
window.toggleSidebar = toggleSidebar;

// Show Library Hours Modal
function showLibraryHours() {
    const modal = document.getElementById('library-hours-modal');
    modal?.classList.remove('hidden');
    setTimeout(() => modal.classList.add('modal-fade-in'), 10);
}
window.showLibraryHours = showLibraryHours;

// Show Help Center Modal
function showHelpCenter() {
    const modal = document.getElementById('help-center-modal');
    modal?.classList.remove('hidden');
    setTimeout(() => modal.classList.add('modal-fade-in'), 10);
}
window.showHelpCenter = showHelpCenter;

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('opacity-0');
    }, 300);
}
window.closeModal = closeModal;

// Open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    void modal.offsetWidth;
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}
window.openModal = openModal;

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Restore sidebar state
    const saved = localStorage.getItem('sidebarState');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        if (window.innerWidth <= 768) {
            sidebar.classList.replace('sidebar-expanded', 'sidebar-collapsed');
            sidebar.style.width = '4rem';
        } else if (saved) {
            sidebar.classList[saved === 'collapsed' ? 'add' : 'remove']('sidebar-collapsed');
            sidebar.classList[saved === 'expanded' ? 'add' : 'remove']('sidebar-expanded');
            sidebar.style.width = saved === 'collapsed' ? '4rem' : '16rem';
        }
    }

    // Mobile sidebar toggle button
    function createMobileToggle() {
        if (document.getElementById('mobile-sidebar-toggle')) return;
        const btn = document.createElement('button');
        btn.id = 'mobile-sidebar-toggle';
        btn.className = 'fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg';
        btn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        btn.style.display = document.body.classList.contains('sidebar-hidden') ? 'flex' : 'none';
        const label = document.createElement('span');
        label.className = 'absolute -top-8 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity';
        label.innerText = 'Show Sidebar';
        btn.appendChild(label);
        btn.addEventListener('mouseenter', () => label.classList.add('opacity-100'));
        btn.addEventListener('mouseleave', () => label.classList.remove('opacity-100'));
        btn.addEventListener('click', () => {
            document.body.classList.remove('sidebar-hidden');
            sidebar.classList.replace('sidebar-expanded', 'sidebar-collapsed');
            sidebar.style.width = '4rem';
            localStorage.setItem('sidebarState', 'collapsed');
            btn.style.display = 'none';
        });
        document.body.appendChild(btn);
    }
    createMobileToggle();

    // Toggle visibility on body class mutation
    new MutationObserver(() => {
        const toggle = document.getElementById('mobile-sidebar-toggle');
        if (toggle) toggle.style.display = document.body.classList.contains('sidebar-hidden') ? 'flex' : 'none';
    }).observe(document.body, { attributes: true });

    // Resize handler
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        if (sidebar) {
            sidebar.classList.toggle('sidebar-collapsed', isMobile);
            sidebar.classList.toggle('sidebar-expanded', !isMobile);
            sidebar.style.width = isMobile ? '4rem' : (localStorage.getItem('sidebarState') === 'expanded' ? '16rem' : '4rem');
        }
        const toggle = document.getElementById('mobile-sidebar-toggle');
        if (toggle) toggle.style.display = document.body.classList.contains('sidebar-hidden') ? 'flex' : 'none';
    });
}); 