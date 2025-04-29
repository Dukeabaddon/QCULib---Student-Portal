// Student Portal JavaScript

// Mock Data
const mockData = {

    // Borrowed Books Data
    borrowedBooks: [
        {
            // Essential Book Information
            id: "BK001", // Unique Identifier
            title: "Introduction to Algorithms", // Title
            author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein", // Author(s)
            publicationYear: 2009, // Publication Date (year)
            genre: "Computer Science", // Category/Genre
            publisher: "MIT Press", // Publisher
            isbn: "978-0262033848", // ISBN
            edition: "3rd Edition", // Edition
            language: "English", // Language
            materialType: "Textbook", // Material Type subcategory
            pages: 1312, // Page count
            description: "A comprehensive introduction to the modern study of computer algorithms that covers a broad range of fundamental algorithms in depth.", // Book Description/Summary

            // Library Management Information
            totalCopies: 5, // Total Copies
            availableCopies: 2, // Available Copies
            location: "Main Library", // Location/Branch
            shelfLocation: "CS-101-A", // Shelf Location
            keywords: ["algorithms", "data structures", "computer science", "programming"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/intro-algorithms.jpg", // Cover Image URL
            status: "borrowed", // Status
            borrowingPeriod: 7, // Borrowing Period in days
            lateFee: "₱10.00", // Late Fee per day
            isReserved: false, // Reserved status

            // User-specific borrowing information (displayed in UI)
            dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
            borrowDate: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0],
            branch: "San Bartolome",
            lateFeeAccumulated: "₱0.00",
            useMockImage: true,
            type: "physical",
            renewsLeft: 2,
            daysLeft: 3
        },
        {
            // Essential Book Information
            id: "BK002", // Unique Identifier
            title: "Design Patterns", // Title
            author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", // Author(s)
            publicationYear: 1994, // Publication Date (year)
            genre: "Software Engineering", // Category/Genre
            publisher: "Addison-Wesley", // Publisher
            isbn: "978-0201633610", // ISBN
            edition: "1st Edition", // Edition
            language: "English", // Language
            materialType: "Reference", // Material Type subcategory
            pages: 416, // Page count
            description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.", // Book Description/Summary

            // Library Management Information
            totalCopies: 3, // Total Copies
            availableCopies: 1, // Available Copies
            location: "Computer Science Building", // Location/Branch
            shelfLocation: "SE-202-B", // Shelf Location
            keywords: ["design patterns", "software engineering", "object-oriented", "programming"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/design-patterns.jpg", // Cover Image URL
            status: "borrowed", // Status
            borrowingPeriod: 7, // Borrowing Period in days
            lateFee: "₱10.00", // Late Fee per day
            isReserved: true, // Reserved status

            // User-specific borrowing information (displayed in UI)
            dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
            borrowDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
            branch: "San Francisco",
            lateFeeAccumulated: "₱0.00",
            useMockImage: true,
            type: "physical",
            renewsLeft: 1,
            daysLeft: 5
        },
        {
            // Essential Book Information
            id: "BK003", // Unique Identifier
            title: "Clean Code", // Title
            author: "Robert C. Martin", // Author(s)
            publicationYear: 2008, // Publication Date (year)
            genre: "Software Engineering", // Category/Genre
            publisher: "Prentice Hall", // Publisher
            isbn: "978-0132350884", // ISBN
            edition: "1st Edition", // Edition
            language: "English", // Language
            materialType: "Textbook", // Material Type subcategory
            pages: 464, // Page count
            description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This book is packed with practical advice on cleaning your code.", // Book Description/Summary

            // Library Management Information
            totalCopies: 4, // Total Copies
            availableCopies: 0, // Available Copies
            location: "Engineering Library", // Location/Branch
            shelfLocation: "SE-105-C", // Shelf Location
            keywords: ["clean code", "software engineering", "programming practices", "refactoring"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/clean-code.jpg", // Cover Image URL
            status: "borrowed", // Status (changed from overdue to borrowed, we'll calculate overdue status)
            borrowingPeriod: 7, // Borrowing Period in days
            lateFee: "₱10.00", // Late Fee per day
            isReserved: false, // Reserved status

            // User-specific borrowing information (displayed in UI)
            dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0], // 5 days overdue
            borrowDate: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString().split('T')[0], // borrowed 12 days ago
            branch: "Batasan",
            lateFeeAccumulated: "₱50.00", // 5 days overdue * ₱10.00 per day
            useMockImage: true,
            type: "physical",
            renewsLeft: 0,
            daysLeft: -5
        },
        {
            // Essential Book Information
            id: "BK004", // Unique Identifier
            title: "Database Systems", // Title
            author: "Hector Garcia-Molina, Jeffrey D. Ullman, Jennifer Widom", // Author(s)
            publicationYear: 2008, // Publication Date (year)
            genre: "Computer Science", // Category/Genre
            publisher: "Pearson", // Publisher
            isbn: "978-0131873254", // ISBN
            edition: "2nd Edition", // Edition
            language: "English", // Language
            materialType: "Textbook", // Material Type subcategory
            pages: 1142, // Page count
            description: "This text combines a clear, straightforward writing style with an outstanding balance of theory and practice, thorough coverage of cutting-edge technologies, and a strong pedagogy.", // Book Description/Summary

            // Library Management Information
            totalCopies: 3, // Total Copies
            availableCopies: 2, // Available Copies
            location: "Science Library", // Location/Branch
            shelfLocation: "CS-305-D", // Shelf Location
            keywords: ["database", "SQL", "data management", "information systems"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/database-systems.jpg", // Cover Image URL
            status: "returned", // Status
            borrowingPeriod: 7, // Borrowing Period in days
            lateFee: "₱10.00", // Late Fee per day
            isReserved: false, // Reserved status

            // User-specific borrowing information (displayed in UI)
            dueDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0],
            borrowDate: new Date(new Date().setDate(new Date().getDate() - 17)).toISOString().split('T')[0],
            returnDate: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString().split('T')[0],
            branch: "San Francisco",
            lateFeeAccumulated: "₱20.00", // 2 days late * ₱10.00 per day
            useMockImage: true,
            type: "physical",
            renewsLeft: 0,
            daysLeft: 0
        },
        {
            // Essential Book Information
            id: "EBK001", // Unique Identifier
            title: "Python Programming for Beginners", // Title
            author: "John Smith", // Author(s)
            publicationYear: 2020, // Publication Date (year)
            genre: "Programming", // Category/Genre
            publisher: "Tech Publishing", // Publisher
            isbn: "978-1234567890", // ISBN
            edition: "2nd Edition", // Edition
            language: "English", // Language
            materialType: "Tutorial", // Material Type subcategory
            pages: 350, // Page count
            description: "A comprehensive guide to Python programming language for beginners. Learn Python basics, data structures, algorithms, and best practices.", // Book Description/Summary

            // Library Management Information
            totalCopies: "Unlimited", // Total Copies (digital)
            availableCopies: "Unlimited", // Available Copies (digital)
            location: "Digital Library", // Location/Branch
            shelfLocation: "E-PROG-101", // Digital shelf ID
            keywords: ["python", "programming", "beginners", "coding", "tutorial"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/python-beginners.jpg", // Cover Image URL
            status: "borrowed", // Status
            borrowingPeriod: 21, // Borrowing Period in days
            lateFee: "₱0.00", // Late Fee per day (often zero for e-books)
            isReserved: false, // Reserved status
            fileFormat: "PDF, EPUB", // E-book specific: file formats
            downloadLimit: 3, // E-book specific: download limit

            // User-specific borrowing information (displayed in UI)
            dueDate: "2023-06-30",
            borrowDate: "2023-05-30",
            branch: "Digital Library",
            lateFeeAccumulated: "₱0.00",
            useMockImage: true,
            type: "ebook",
            renewsLeft: 2,
            daysLeft: 15
        },
        {
            // Essential Book Information
            id: "EBK002", // Unique Identifier
            title: "Web Development with JavaScript", // Title
            author: "Sarah Johnson", // Author(s)
            publicationYear: 2021, // Publication Date (year)
            genre: "Web Development", // Category/Genre
            publisher: "Frontend Books", // Publisher
            isbn: "978-0987654321", // ISBN
            edition: "1st Edition", // Edition
            language: "English", // Language
            materialType: "Reference", // Material Type subcategory
            pages: 422, // Page count
            description: "Master modern web development techniques with JavaScript. Covers ES6 features, frameworks like React and Vue, and advanced programming concepts.", // Book Description/Summary

            // Library Management Information
            totalCopies: "Unlimited", // Total Copies (digital)
            availableCopies: "Unlimited", // Available Copies (digital)
            location: "Digital Library", // Location/Branch
            shelfLocation: "E-WEB-202", // Digital shelf ID
            keywords: ["javascript", "web development", "frontend", "programming", "react", "vue"], // Keywords/Tags
            coverImageUrl: "https://example.com/book-covers/js-web-dev.jpg", // Cover Image URL
            status: "borrowed", // Status
            borrowingPeriod: 21, // Borrowing Period in days
            lateFee: "₱0.00", // Late Fee per day (often zero for e-books)
            isReserved: false, // Reserved status
            fileFormat: "PDF, EPUB, MOBI", // E-book specific: file formats
            downloadLimit: 2, // E-book specific: download limit

            // User-specific borrowing information (displayed in UI)
            dueDate: "2023-06-25",
            borrowDate: "2023-05-25",
            branch: "Digital Library",
            lateFeeAccumulated: "₱0.00",
            useMockImage: true,
            type: "ebook",
            renewsLeft: 1,
            daysLeft: 12
        }
    ],

    // Meeting Room Data
    meetingRooms: [
        { id: "RM101", name: "Room 101", capacity: 10 },
        { id: "RM102", name: "Room 102", capacity: 10 },
        { id: "RM103", name: "Room 103", capacity: 10 },
        { id: "RM104", name: "Room 104", capacity: 10 }
    ],

    // Available Dates (next 7 days)
    availableDates: [],

    // Room Time Slots (8am to 6pm, 1-hour slots)
    timeSlots: [
        { id: 1, time: "8:00 AM - 9:00 AM" },
        { id: 2, time: "9:00 AM - 10:00 AM" },
        { id: 3, time: "10:00 AM - 11:00 AM" },
        { id: 4, time: "11:00 AM - 12:00 PM" },
        { id: 5, time: "12:00 PM - 1:00 PM" },
        { id: 6, time: "1:00 PM - 2:00 PM" },
        { id: 7, time: "2:00 PM - 3:00 PM" },
        { id: 8, time: "3:00 PM - 4:00 PM" },
        { id: 9, time: "4:00 PM - 5:00 PM" },
        { id: 10, time: "5:00 PM - 6:00 PM" }
    ],

    // Booked slots (for demo purposes)
    bookedSlots: [
        { date: new Date().toISOString().split('T')[0], timeSlotId: 3 },
        { date: new Date().toISOString().split('T')[0], timeSlotId: 7 },
        { date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], timeSlotId: 4 },
        { date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], timeSlotId: 5 },
        { date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], timeSlotId: 8 }
    ]
};

// Make mockData globally accessible
window.mockData = mockData;

// Global state
let currentReservation = null;
let currentlyBorrowed = null;
let selectedDate = null;
let selectedTimeSlot = null;

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready, initializing application...');

    // Set header height CSS variable first
    const mainHeader = document.querySelector('header');
    if (mainHeader) {
        const headerHeight = mainHeader.offsetHeight;
        console.log('Setting header height CSS variable:', headerHeight);
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
        document.body.style.paddingTop = headerHeight + 'px';
    }

    // Generate available dates
    generateAvailableDates();

    // Initialize modules
    initStudentProfile();
    initBorrowedBooks();
    initMeetingRooms();
    // equipment and notifications will initialize after profile loads

    // Initialize form validation
    initFormValidation();

    // Setup event listeners
    setupEventListeners();

    // Initialize sticky headers
    initStickyHeaders();

    // Don't automatically switch to any tab
    // Let the user navigate tabs manually

    // Update header height on window resize
    window.addEventListener('resize', function() {
        if (mainHeader) {
            const updatedHeaderHeight = mainHeader.offsetHeight;
            document.documentElement.style.setProperty('--header-height', updatedHeaderHeight + 'px');
            document.body.style.paddingTop = updatedHeaderHeight + 'px';
        }
    });
});

// Initialize sticky headers
function initStickyHeaders() {
    // Get the main header height
    const mainHeader = document.querySelector('header');
    if (!mainHeader) return;

    const mainHeaderHeight = mainHeader.offsetHeight;
    console.log('Main header height:', mainHeaderHeight);

    // Set CSS variables for use in stylesheet
    document.documentElement.style.setProperty('--main-header-offset', mainHeaderHeight + 'px');
    document.documentElement.style.setProperty('--header-height', mainHeaderHeight + 'px');

    // Make sure body padding matches header height
    document.body.style.paddingTop = mainHeaderHeight + 'px';

    // Update on window resize
    window.addEventListener('resize', function() {
        const updatedHeaderHeight = mainHeader.offsetHeight;
        document.documentElement.style.setProperty('--main-header-offset', updatedHeaderHeight + 'px');
        document.documentElement.style.setProperty('--header-height', updatedHeaderHeight + 'px');
        document.body.style.paddingTop = updatedHeaderHeight + 'px';
    });

    // Also update on scroll to handle any dynamic header height changes
    window.addEventListener('scroll', function() {
        const currentHeaderHeight = mainHeader.offsetHeight;
        if (currentHeaderHeight !== mainHeaderHeight) {
            document.documentElement.style.setProperty('--main-header-offset', currentHeaderHeight + 'px');
            document.documentElement.style.setProperty('--header-height', currentHeaderHeight + 'px');
            document.body.style.paddingTop = currentHeaderHeight + 'px';
        }
    });
}
// Expose to global scope
window.initStickyHeaders = initStickyHeaders;

// Initialize Student Profile
async function initStudentProfile() {
    const profileContainer = document.getElementById('student-profile');

    try {
        // Show loading state
        profileContainer.innerHTML = `
            <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        `;

        // Fetch student profile from API
        const studentId = '23-1234'; // Hardcoded for now, could be retrieved from a session or URL parameter
        const student = await apiService.getStudentProfile(studentId);

        // Store numeric LIB_USER.USER_ID for subsequent API calls
        window.defaultUserId = student.userId;
        // Store student profile for attendee prefill
        mockData.studentProfile = student;

        // Now that we have userId, initialize equipment and notifications
        initEquipment();
        initNotifications();

        // Calculate borrowing limit percentage
        const borrowingLimit = 3; // Max limit is 3 books
        const currentBorrowedCount = student.borrowedBooksCount || 0;
        const totalReturnedCount = student.returnedBooksCount || 0;
        const borrowedEquipment = student.borrowedEquipmentCount || 0;
        const borrowingPercentage = (currentBorrowedCount / borrowingLimit) * 100;

        // Render the profile
        profileContainer.innerHTML = `
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div class="flex flex-col items-center">
                    <!-- Profile Picture -->
                    <div class="w-24 h-24 rounded-full overflow-hidden mb-2">
                        <img src="assets/plato.jpg" alt="Profile Picture" class="w-full h-full object-cover">
                    </div>
                    <div class="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ${student.status}
                    </div>
                </div>

                <div class="flex-1">
                    <!-- Student Information -->
                    <div class="p-4 border border-blue-100 rounded-lg bg-blue-50/50 mb-4">
                        <h3 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                            <i class="fas fa-user-graduate mr-2"></i>
                            Student Information
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">Student ID</p>
                                <p class="font-medium">${student.id}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Course</p>
                                <p class="font-medium">Bachelor of Science in Information Technology</p>
                            </div>

                            <div class="md:col-span-2">
                                <p class="text-sm text-gray-500">Name</p>
                                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-1">
                                    <div>
                                        <p class="text-xs text-gray-500">Last Name</p>
                                        <p class="font-medium">${student.lastName}</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">First Name</p>
                                        <p class="font-medium">${student.firstName}</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Middle Name</p>
                                        <p class="font-medium"></p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Suffix</p>
                                        <p class="font-medium"></p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">Year Level</p>
                                <p class="font-medium">${student.year}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Branch</p>
                                <p class="font-medium">${student.branch}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Email</p>
                                <p class="font-medium">${student.email}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Contact Number</p>
                                <p class="font-medium">${student.contactNumber}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Library Statistics -->
                    <div class="p-4 border border-green-100 rounded-lg bg-green-50/50">
                        <h3 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                            <i class="fas fa-chart-bar mr-2"></i>
                            Library Statistics
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div class="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                <div class="text-2xl font-bold text-blue-600">${currentBorrowedCount}</div>
                                <div class="text-xs text-gray-500">Current Borrows</div>
                            </div>
                            <div class="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                <div class="text-2xl font-bold text-green-600">${totalReturnedCount}</div>
                                <div class="text-xs text-gray-500">Total Returned</div>
                            </div>
                            <div class="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                <div class="text-2xl font-bold text-amber-600">${borrowedEquipment}</div>
                                <div class="text-xs text-gray-500">Equipment Uses</div>
                            </div>
                        </div>

                        <!-- Borrowing Limit Indicator -->
                        <div class="mt-4">
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-gray-600">Borrowing Limit</span>
                                <span class="text-gray-600">${currentBorrowedCount}/${borrowingLimit} Books</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${borrowingPercentage}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error initializing student profile:', error);

        // Show error state
        profileContainer.innerHTML = `
            <div class="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <h3 class="font-medium flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> Error Loading Profile</h3>
                <p class="mt-2 text-sm">There was a problem loading your profile. Please try again later.</p>
                <button id="retry-profile-btn" class="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                    Retry
                </button>
            </div>
        `;

        // Add retry button event listener
        const retryBtn = document.getElementById('retry-profile-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', initStudentProfile);
        }
    }
}
// Expose to global scope
window.initStudentProfile = initStudentProfile;

// Initialize Borrowed Books
async function initBorrowedBooks() {
    // Set up filter and sort change events
    const filterSelect = document.getElementById('book-filter');
    const sortSelect = document.getElementById('book-sort');

    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            // Get the current book type from active tab
            const currentBookType = document.getElementById('tab-ebooks').classList.contains('active') ? 'ebook' : 'physical';
            filterAndSortBooks(currentBookType);
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Get the current book type from active tab
            const currentBookType = document.getElementById('tab-ebooks').classList.contains('active') ? 'ebook' : 'physical';
            filterAndSortBooks(currentBookType);
        });
    }

    try {
        // Fetch books data from API
        const userId = 1; // Hardcoded for now, could be retrieved from a session or URL parameter
        const books = await apiService.getBooks({ userId });

        // Store books data globally
        window.booksData = books;

        // Initial render
        filterAndSortBooks();
    } catch (error) {
        console.error('Error fetching books data:', error);
        // Show error message
        const booksContainer = document.getElementById('borrowed-books');
        if (booksContainer) {
            booksContainer.innerHTML = `
                <div class="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <h3 class="font-medium flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> Error Loading Books</h3>
                    <p class="mt-2 text-sm">There was a problem loading your books. Please try again later.</p>
                    <button id="retry-books-btn" class="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        Retry
                    </button>
                </div>
            `;

            // Add retry button event listener
            const retryBtn = document.getElementById('retry-books-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', initBorrowedBooks);
            }
        }
    }
}
// Expose to global scope
window.initBorrowedBooks = initBorrowedBooks;

// Filter and sort books
function filterAndSortBooks(bookType) {
    console.log("filterAndSortBooks called with bookType:", bookType);
    const filterSelect = document.getElementById('book-filter');
    const sortSelect = document.getElementById('book-sort');

    if (!filterSelect || !sortSelect) {
        console.error("Filter or sort select elements not found");
        return;
    }

    const filterValue = filterSelect.value;
    const sortValue = sortSelect.value;

    // Determine the current book type - use the passed parameter first,
    // then check active tab, default to physical if can't determine
    let currentTabType;

    if (bookType) {
        currentTabType = bookType;
    } else {
        // Check which tab is active
        const ebooksTab = document.getElementById('tab-ebooks');
        const physicalBooksTab = document.getElementById('tab-physical-books');

        if (ebooksTab && ebooksTab.classList.contains('active')) {
            currentTabType = 'ebook';
        } else if (physicalBooksTab && physicalBooksTab.classList.contains('active')) {
            currentTabType = 'physical';
        } else {
            // Default to physical if can't determine
            currentTabType = 'physical';
        }
    }

    console.log("Current tab type determined as:", currentTabType);

    // Update section header and show/hide filter controls based on book type
    const headerEl = document.querySelector('#books-content h2');
    const filterEl = document.getElementById('book-filter');
    const sortEl = document.getElementById('book-sort');
    if (headerEl) headerEl.textContent = currentTabType === 'ebook' ? 'E-Books' : 'Borrowed Books';
    // Hide or show the filter/sort group
    const controlsGroup = document.getElementById('book-filter')?.parentElement;
    if (controlsGroup) controlsGroup.style.display = currentTabType === 'ebook' ? 'none' : '';

    // Check if we have books data
    if (!window.booksData || !Array.isArray(window.booksData)) {
        console.error("No books data available");
        return;
    }

    // Filter books - first by type (e-book or physical)
    let filteredBooks = [...window.booksData];

    // First filter by book type
    filteredBooks = filteredBooks.filter(book => book.type === currentTabType);
    console.log(`Filtered to ${filteredBooks.length} ${currentTabType} books`);

    // Log all book types for debugging
    const bookTypes = {};
    window.booksData.forEach(book => {
        bookTypes[book.type] = (bookTypes[book.type] || 0) + 1;
    });
    console.log('Book types in data:', bookTypes);

    // Apply filters based on book type
    if (currentTabType === 'physical') {
        // For physical books
        if (filterValue === 'borrowed') {
            // Show both borrowed and overdue books in the "currently borrowed" filter
            // For overdue books, we check if the due date is in the past
            filteredBooks = filteredBooks.filter(book => {
                if (book.status === 'borrowed') {
                    // Calculate if the book is overdue
                    const today = new Date();
                    const dueDate = new Date(book.dueDate);

                    // Update daysLeft property if not already set by the API
                    if (book.daysLeft === undefined) {
                        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                        book.daysLeft = daysLeft;
                    }

                    // If overdue, calculate late fee if not already set by the API
                    if (book.daysLeft < 0 && !book.lateFeeAccumulated) {
                        const lateFeePerDay = parseFloat(book.lateFee.replace('₱', ''));
                        const lateFeeAmount = Math.abs(book.daysLeft) * lateFeePerDay;
                        book.lateFeeAccumulated = `₱${lateFeeAmount.toFixed(2)}`;
                    }

                    return true;
                }
                return false;
            });
        } else if (filterValue === 'returned') {
            filteredBooks = filteredBooks.filter(book => book.status === 'returned');
        }
        // 'all' option shows all physical books
    } else if (currentTabType === 'ebook') {
        // For e-books
        if (filterValue === 'recent') {
            // Sort by most recently accessed (borrow date for now)
            filteredBooks.sort((a, b) => new Date(b.borrowDate || 0) - new Date(a.borrowDate || 0));
        } else if (filterValue === 'favorites') {
            // This would normally filter to favorites, but for now just show all
            // In a real implementation, this would filter based on a favorites flag
        }
        // 'all' option shows all e-books
    }

    console.log(`After status filtering: ${filteredBooks.length} books`);

    // Sort books
    if (sortValue === 'due-date') {
        filteredBooks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortValue === 'title') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'branch') {
        filteredBooks.sort((a, b) => a.branch.localeCompare(b.branch));
    }

    console.log(`Rendering ${filteredBooks.length} books after sorting`);

    renderBooks(filteredBooks);
}
// Expose to global scope
window.filterAndSortBooks = filterAndSortBooks;

// Render books to the borrowed-books container
function renderBooks(books) {
    const booksContainer = document.getElementById('borrowed-books');
    if (!booksContainer) return;
    booksContainer.innerHTML = '';
    if (!Array.isArray(books) || books.length === 0) {
        booksContainer.innerHTML = `<div class="text-center py-8">
                <i class="fas fa-book text-gray-300 text-4xl mb-3"></i>
            <p class="text-gray-500">No books to display</p>
        </div>`;
        return;
    }
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card p-4 rounded-xl bg-white shadow-sm mb-6 border-l-4 border-blue-500';
        card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0">${getBookCoverHTML(book)}</div>
                <div class="flex-1">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
                            <h3 class="font-medium text-blue-800 text-lg">${book.title}</h3>
                            <p class="text-sm text-gray-600">by ${book.author} (${book.publicationYear})</p>
                            <p class="text-xs text-gray-500">${book.genre} • ${book.pages} pages</p>
                </div>
                        <div class="flex flex-col items-end gap-1">
                            ${getStatusBadgeHTML(book)}
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">${book.type === 'ebook' ? 'E-Book' : 'Physical'}</span>
                </div>
            </div>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
            <div>
                            <p class="text-xs text-gray-500">Borrowed:</p>
                            <p class="text-sm">${new Date(book.borrowDate).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</p>
            </div>
            <div>
                            <p class="text-xs text-gray-500">Due Date:</p>
                            <p class="text-sm">${new Date(book.dueDate).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</p>
                            ${getDueDateDisplayHTML(book)}
            </div>
            <div>
                            <p class="text-xs text-gray-500">Branch:</p>
                            <p class="text-sm">${book.branch}</p>
            </div>
            <div>
                            <p class="text-xs text-gray-500">ISBN:</p>
                            <p class="text-sm">${book.isbn}</p>
            </div>
        </div>
                    <div class="flex justify-center">
                        <button class="view-book-btn text-blue-600 text-sm font-medium flex items-center" onclick="viewBookDetails('${book.id}')">
                            <i class="fas fa-eye mr-1.5"></i> View Details
                        </button>
            </div>
                </div>
            </div>`;
        booksContainer.appendChild(card);
    });
}
// Expose to global scope
window.renderBooks = renderBooks;

// Generate book cover HTML
function getBookCoverHTML(book) {
    // Create a simple gray stock image for book cover with only grid pattern
    return `
        <div class="book-cover w-32 h-44 bg-gray-100 border border-gray-300 rounded-md grid grid-cols-1">
        </div>
    `;
}

// Generate status badge HTML
function getStatusBadgeHTML(book) {
    // For e-books, show a different status badge
    if (book.type === 'ebook') {
        return `
            <span class="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-md flex items-center border border-purple-200">
                <i class="fas fa-bookmark mr-1.5"></i> Bookmarked
            </span>
        `;
    }

    // Map status to colors, icons and labels for physical books
    const statusConfig = {
        'borrowed': {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            icon: 'fa-bookmark',
            label: 'Borrowed',
            border: 'border-blue-200'
        },
        'overdue': {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: 'fa-exclamation-circle',
            label: 'Overdue',
            border: 'border-red-200'
        },
        'returned': {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: 'fa-check-circle',
            label: 'Returned',
            border: 'border-green-200'
        },
        'renewal-requested': {
            bg: 'bg-purple-100',
            text: 'text-purple-800',
            icon: 'fa-clock',
            label: 'Extension Requested',
            border: 'border-purple-200'
        },
        'return-scheduled': {
            bg: 'bg-amber-100',
            text: 'text-amber-800',
            icon: 'fa-calendar-check',
            label: 'Return Scheduled',
            border: 'border-amber-200'
        }
    };

    // Get config for this status or default
    const config = statusConfig[book.status] || statusConfig.borrowed;

    return `
        <span class="${config.bg} ${config.text} text-xs px-3 py-1 rounded-md flex items-center border ${config.border}">
            <i class="fas ${config.icon} mr-1.5"></i> ${config.label}
        </span>
    `;
}

// Generate due date display HTML
function getDueDateDisplayHTML(book) {
    // Return empty for e-books (they don't have due dates)
    if (book.type === 'ebook') {
        return '';
    }

    // Return empty for returned books
    if (book.status === 'returned') {
        return '';
    }

    // Configure based on days left
    let config = {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        icon: 'fa-calendar',
        border: 'border-gray-200'
    };

    let message = '';

    if (book.daysLeft < 0) {
        config = {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: 'fa-exclamation-circle',
            border: 'border-red-200'
        };
        message = `Overdue by ${Math.abs(book.daysLeft)} day${Math.abs(book.daysLeft) !== 1 ? 's' : ''}`;
    } else if (book.daysLeft === 0) {
        config = {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: 'fa-exclamation',
            border: 'border-red-200'
        };
        message = 'Due today';
    } else if (book.daysLeft <= 3) {
        config = {
            bg: 'bg-amber-100',
            text: 'text-amber-800',
            icon: 'fa-calendar-day',
            border: 'border-amber-200'
        };
        message = `Due in ${book.daysLeft} day${book.daysLeft !== 1 ? 's' : ''}`;
        } else {
        message = `Due in ${book.daysLeft} days`;
    }

    return `
        <span class="${config.bg} ${config.text} text-xs inline-flex items-center px-2 py-0.5 rounded border ${config.border} mt-1">
            <i class="fas ${config.icon} mr-1"></i> ${message}
        </span>
    `;
}

// Generate action buttons HTML based on book status
function getActionButtonsHTML(book, isDetailView = false) {
    // For e-books
    if (book.type === 'ebook') {
        let buttons = [];

        // Read online button
        buttons.push(`<button class="read-online-btn text-xs bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 transition flex items-center"
            onclick="readEbook(${JSON.stringify(book).replace(/"/g, '&quot;')})">
            <i class="fas fa-book-reader mr-1.5"></i> Open eBook
        </button>`);

        // Download button
        buttons.push(`<button class="download-btn text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition flex items-center"
            onclick="downloadEbook(${JSON.stringify(book).replace(/"/g, '&quot;')})">
            <i class="fas fa-download mr-1.5"></i> Save Offline
        </button>`);

        return buttons.join('\n');
    }

    // For physical books based on status
    let buttons = [];

    // For returned books, add a borrow again option in detail view
    if (book.status === 'returned' && isDetailView) {
        buttons.push(`<button class="borrow-again-btn text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition flex items-center"
            onclick="borrowAgain('${book.id}')">
            <i class="fas fa-redo mr-1.5"></i> Borrow Again
        </button>`);
    }

    return buttons.join('\n');
}

// Functions for e-book actions
function readEbook(book) {
    // Create a completely new implementation for e-book reader

    // First, check if there's an existing e-book reader open and remove it
    const existingReader = document.getElementById('ebook-reader-container');
    if (existingReader) {
        document.body.removeChild(existingReader);
    }

    // Create container for the e-book reader
    const readerContainer = document.createElement('div');
    readerContainer.id = 'ebook-reader-container';
    readerContainer.className = 'fixed inset-0 z-50 flex items-center justify-center';

    // Create the overlay
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-50';
    overlay.id = 'ebook-reader-overlay';

    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-90vh overflow-hidden flex flex-col relative z-10 mx-4';

    // Create the header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center px-6 py-4 border-b border-gray-200';
    header.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800">${book.title}</h3>
        <button id="close-ebook-reader" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Create the content area
    const content = document.createElement('div');
    content.className = 'overflow-y-auto p-6 flex-grow';
    content.innerHTML = `
        <div class="text-center py-8">
            <i class="fas fa-book-open text-blue-500 text-5xl mb-4"></i>
            <h3 class="text-xl mb-2">${book.title}</h3>
            <p class="text-sm text-gray-600">by ${book.author}</p>
            <div class="my-4 border-t border-b border-gray-200 py-4">
                <p class="text-gray-700">This is a preview of the e-book. The full reading experience would be available in the complete application.</p>
            </div>
            <p class="text-sm text-gray-500">E-book ID: ${book.id}</p>
        </div>
    `;

    // Create the footer
    const footer = document.createElement('div');
    footer.className = 'px-6 py-4 border-t border-gray-200 flex justify-between';
    footer.innerHTML = `
        <div class="flex space-x-2">
            <button class="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">
                <i class="fas fa-font mr-1"></i> Font
            </button>
            <button class="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">
                <i class="fas fa-adjust mr-1"></i> Theme
            </button>
        </div>
        <div>
            <button id="close-ebook-reader-btn" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Close
            </button>
        </div>
    `;

    // Assemble the modal
    modalContent.appendChild(header);
    modalContent.appendChild(content);
    modalContent.appendChild(footer);

    // Add everything to the container
    readerContainer.appendChild(overlay);
    readerContainer.appendChild(modalContent);

    // Add to the document
    document.body.appendChild(readerContainer);

    // Prevent body scrolling - use the modal-open class
    document.body.classList.add('modal-open');

    // Add event listeners for closing
    const closeBtn = document.getElementById('close-ebook-reader');
    const closeFooterBtn = document.getElementById('close-ebook-reader-btn');

    const closeReader = function() {
        // Fade out animation
        readerContainer.style.opacity = '0';

        // Remove after animation completes
        setTimeout(() => {
            if (readerContainer.parentNode) {
                document.body.removeChild(readerContainer);
            }
            // Restore body scrolling
            document.body.classList.remove('modal-open');
        }, 300);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeReader);
    }

    if (closeFooterBtn) {
        closeFooterBtn.addEventListener('click', closeReader);
    }

    // Close on overlay click
    overlay.addEventListener('click', closeReader);

    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeReader();
            document.removeEventListener('keydown', escapeHandler);
        }
    };

    document.addEventListener('keydown', escapeHandler);

    // Fade in animation
    readerContainer.style.opacity = '0';
    setTimeout(() => {
        readerContainer.style.opacity = '1';
        readerContainer.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
}

function downloadEbook(book) {
    // Simulate download process
    showNotification(`Preparing download for "${book.title}"...`, 'info');

    // Simulate download delay
    setTimeout(() => {
        showNotification(`Your e-book "${book.title}" has been downloaded successfully.`, 'success');
    }, 1500);
}

// Show notification toast message
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);

    // Get the notification container
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error('Notification container not found');
        return;
    }

    // Create notification element
    const notification = document.createElement('div');

    // Set base styles
    notification.className = `notification px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 max-w-sm opacity-0`;

    // Set styles based on type
    let bgColor = 'bg-blue-500';
    let icon = 'fa-info-circle';

    if (type === 'success') {
        bgColor = 'bg-green-500';
        icon = 'fa-check-circle';
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
        icon = 'fa-exclamation-circle';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-500';
        icon = 'fa-exclamation-triangle';
    }

    notification.classList.add(bgColor, 'text-white');

    // Add content
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <p>${message}</p>
        </div>
    `;

    // Add to DOM
    container.appendChild(notification);

    // Force a reflow to ensure the transition applies
    void notification.offsetWidth;

    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('opacity-100');
        notification.classList.remove('opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        notification.classList.add('translate-y-[-10px]');
        setTimeout(() => {
            if (notification.parentNode === container) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Open modal function
function openModal(modal) {
    if (!modal) return;

    // Create overlay if it doesn't exist
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
        document.body.appendChild(overlay);
    }

    // Show modal and overlay
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Add close button functionality
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        // Create a named function for the event handler so we can properly remove it
        const closeHandler = function() {
            closeModal(modal);
        };

        // Clone the button to remove all event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add new event listener to the cloned button
        newButton.addEventListener('click', closeHandler);
    });

    // Close on overlay click - create a new overlay to ensure clean event listeners
    if (overlay.parentNode) {
        const newOverlay = overlay.cloneNode(false);
        overlay.parentNode.replaceChild(newOverlay, overlay);
        overlay = newOverlay;
        overlay.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    // Add escape key listener
    const escapeListener = function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeListener);
        }
    };

    // Remove any existing escape key listeners first
    document.removeEventListener('keydown', escapeListener);
    // Add new escape key listener
    document.addEventListener('keydown', escapeListener);
}

// Close modal function
function closeModal(modal) {
    if (!modal) return;

    // Hide modal
    modal.classList.add('hidden');

    // Hide and remove overlay
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        // Remove the overlay from the DOM completely
        overlay.parentNode.removeChild(overlay);

        // Make sure body is not locked
        document.body.style.overflow = '';
    }
}

// Generate available dates (next 7 days)
function generateAvailableDates() {
    const today = new Date();
    mockData.availableDates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        mockData.availableDates.push({
            date: date.toISOString().split('T')[0],
            displayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
    }
}
// Expose to global scope
window.generateAvailableDates = generateAvailableDates;

// Initialize Meeting Rooms
function initMeetingRooms() {
    console.log("Initializing meeting rooms...");

    // Set up event handlers
    const reserveButton = document.getElementById('reserve-room-btn');

    // Generate available dates if needed
    if (mockData.availableDates.length === 0) {
        console.log("Generating available dates...");
        generateAvailableDates();
    }

    // Update date buttons with available dates
    console.log("Updating date buttons...");
    updateDateButtons(mockData.availableDates);

    // Initialize with first date selected
    if (mockData.availableDates.length > 0) {
        console.log("Updating time slots with first date...");
        updateTimeSlots(mockData.availableDates[0].date);
    }

    // Setup date button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('date-btn') || e.target.closest('.date-btn')) {
            const button = e.target.classList.contains('date-btn') ? e.target : e.target.closest('.date-btn');
            const date = button.dataset.date;

            console.log("Date button clicked:", date);

            // Update UI
            document.querySelectorAll('.date-btn').forEach(btn => {
                btn.classList.remove('bg-blue-50', 'border-blue-500', 'text-blue-700');
                btn.classList.add('border-gray-300', 'text-gray-700');
            });

            button.classList.remove('border-gray-300', 'text-gray-700');
            button.classList.add('bg-blue-50', 'border-blue-500', 'text-blue-700');

            // Update time slots
            updateTimeSlots(date);
        }

        // Handle time slot selection
        if (e.target.classList.contains('time-slot-checkbox') || e.target.closest('.time-slot-checkbox')) {
            const checkbox = e.target.type === 'checkbox' ? e.target : e.target.closest('.time-slot-checkbox');

            console.log("Time slot checkbox clicked:", checkbox.value);

            // Uncheck all other checkboxes
            document.querySelectorAll('.time-slot-checkbox').forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                    const row = cb.closest('tr');
                    if (row) {
                        row.classList.remove('bg-blue-50');
                    }
                }
            });

            // Highlight selected row
            const row = checkbox.closest('tr');
            if (checkbox.checked && row) {
                row.classList.add('bg-blue-50');

                // Enable reserve button
                if (reserveButton) {
                    reserveButton.disabled = false;
                    reserveButton.classList.remove('bg-gray-400');
                    reserveButton.classList.add('bg-blue-600');
                }

                // Store selected time slot
                const activeDate = document.querySelector('.date-btn.bg-blue-50');
                if (activeDate) {
                    selectedDate = activeDate.dataset.date;
                    selectedTimeSlot = checkbox.value;
                    console.log("Selected date and time slot:", selectedDate, selectedTimeSlot);
                }
            } else if (row) {
                row.classList.remove('bg-blue-50');

                // Disable reserve button
                if (reserveButton) {
                    reserveButton.disabled = true;
                    reserveButton.classList.add('bg-gray-400');
                    reserveButton.classList.remove('bg-blue-600');
                }

                // Clear selected time slot
                selectedTimeSlot = null;
            }
        }
    });

    // Setup reserve button
    if (reserveButton) {
        console.log("Setting up reserve button...");
        reserveButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Reserve button clicked");

            if (selectedDate && selectedTimeSlot) {
                console.log("Calling openRoomModal with:", selectedDate, selectedTimeSlot);
                openRoomModal();
            } else {
                console.warn("No date or time slot selected");
                showNotification('Please select a date and time slot first', 'warning');
            }
        });
    } else {
        console.error("Reserve button not found");
    }

    // Handle terms agreement proceed button
    const continueToFormBtn = document.getElementById('continue-to-room-form');
    const roomTermsContainer = document.getElementById('room-terms-container');
    const reservationContent = document.getElementById('room-reservation-content');
    const termsCheckbox = document.getElementById('room-terms-agreement-initial');
    if (continueToFormBtn && termsCheckbox) {
        // Disable proceed button until checked
        continueToFormBtn.disabled = true;
        continueToFormBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        termsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                continueToFormBtn.disabled = false;
                continueToFormBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
                continueToFormBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            } else {
                continueToFormBtn.disabled = true;
                continueToFormBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
                continueToFormBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            }
        });
        continueToFormBtn.addEventListener('click', () => {
            roomTermsContainer?.classList.add('hidden');
            reservationContent?.classList.remove('hidden');
        });
    }

    console.log("Meeting rooms initialization complete");
}
// Expose to global scope
window.initMeetingRooms = initMeetingRooms;

// Function to update date buttons
function updateDateButtons(dates) {
    const dateButtonsContainer = document.getElementById('date-buttons');
    if (!dateButtonsContainer) {
        console.error("Date buttons container not found");
        return;
    }

    let buttonsHTML = '';

    // If dates is not an array or is empty, generate dates
    if (!Array.isArray(dates) || dates.length === 0) {
        console.log("No dates provided, generating dates");
        generateAvailableDates();
        dates = mockData.availableDates;
    }

    dates.forEach((date, index) => {
        // Handle both date string and date object formats
        let dateObj, dateStr;

        if (typeof date === 'string') {
            dateObj = new Date(date);
            dateStr = date;
        } else if (date && date.date) {
            dateObj = new Date(date.date);
            dateStr = date.date;
        } else {
            console.error("Invalid date format:", date);
            return;
        }

        const isActive = index === 0;

        buttonsHTML += `
            <button type="button" class="date-btn px-3 py-2 rounded-lg border text-sm ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}" data-date="${dateStr}">
                ${dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
        `;
    });

    dateButtonsContainer.innerHTML = buttonsHTML;
}

// Function to update time slots
async function updateTimeSlots(date) {
    const container = document.getElementById('time-slots-container');
    if (!container) return;

    // Render table header
    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
                <thead class="bg-blue-50">
                    <tr>
                        <th class="py-2 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border border-gray-200">Time Slot</th>
                        <th class="py-2 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border border-gray-200">Availability</th>
                    </tr>
                </thead>
                <tbody id="time-slots-body"></tbody>
            </table>
        </div>
    `;

    const body = document.getElementById('time-slots-body');
    if (!body) return;

    // Fetch slots (with fallback to mockData)
    let slots;
    try {
        slots = await apiService.getMeetingSlots();
    } catch (err) {
        console.error('Error fetching slots from API:', err);
        // Fallback to mockData
        slots = window.mockData?.timeSlots?.map(s => ({ id: s.id, time: s.time })) || [];
    }

    // Fetch bookings to mark booked slots (if fails, show all slots)
    let bookedIds = new Set();
    try {
        const bookings = await apiService.getMeetingBookings(date);
        bookedIds = new Set(bookings.map(b => b.slotId));
    } catch (err) {
        console.warn('Error fetching bookings, treating all slots as available:', err);
    }

    // Render rows
    const rows = slots.map(slot =>
        generateTimeSlotItem(slot, bookedIds.has(slot.id))
    ).join('');

    body.innerHTML = rows ||
        `<tr><td colspan="2" class="text-center py-4 text-gray-500">No time slots available.</td></tr>`;
}

// Helper function to generate a time slot item as a table row
function generateTimeSlotItem(slot, isBooked) {
    if (isBooked) {
        return `
            <tr class="bg-red-50">
                <td class="py-2 px-4 border border-gray-200">${slot.time}</td>
                <td class="py-2 px-4 border border-gray-200">
                    <div class="flex items-center justify-between">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <i class="fas fa-times-circle mr-1"></i> Booked
                        </span>
                        <!-- No checkbox for booked slots -->
                    </div>
                </td>
            </tr>
        `;
    } else {
        return `
            <tr class="hover:bg-blue-50 time-slot-item">
                <td class="py-2 px-4 border border-gray-200">${slot.time}</td>
                <td class="py-2 px-4 border border-gray-200">
                    <div class="flex items-center justify-between">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <i class="fas fa-check-circle mr-1"></i> Available
                        </span>
                        <input type="checkbox" class="time-slot-checkbox h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" value="${slot.id}">
                    </div>
                </td>
            </tr>
        `;
    }
}

// Equipment Helpers
function generateEquipmentItem(req) {
    return `
      <div class="equipment-card p-4 bg-white rounded-xl shadow-sm mb-4 border-l-4 border-blue-500 flex justify-between items-center">
        <div>
          <p class="font-medium text-blue-800">${req.type} - ${req.model}</p>
          <p class="text-xs text-gray-500">Requested on ${new Date(req.requestDate).toLocaleDateString()}</p>
          <p class="text-xs text-gray-500">Duration: ${req.duration} day${req.duration !== 1 ? 's' : ''}</p>
        </div>
        <div class="capitalize ${req.status === 'approved' ? 'text-green-600' : 'text-yellow-600'} px-2 py-1 bg-${req.status === 'approved' ? 'green' : 'yellow'}-50 rounded-full text-xs">
          ${req.status}
        </div>
      </div>
    `;
}

async function loadEquipmentRequests() {
    const list = document.getElementById('borrowed-equipment-list');
    if (!list) return;
    list.innerHTML = `<div class="text-center py-4 text-gray-500"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl mb-2"></i><p>Loading your equipment...</p></div>`;
    try {
        const requests = await apiService.getEquipmentRequests({ userId: window.defaultUserId });
        if (requests.length) {
            list.innerHTML = requests.map(generateEquipmentItem).join('');
            } else {
            list.innerHTML = `<div class="text-center py-4 text-gray-500">No equipment requested.</div>`;
            }
    } catch (err) {
        console.error('Error loading equipment requests:', err);
        list.innerHTML = `<div class="text-center py-4 text-red-500">Error loading equipment. <button id="retry-equipment" class="underline text-blue-600">Retry</button></div>`;
        document.getElementById('retry-equipment')?.addEventListener('click', loadEquipmentRequests);
    }
}

// Initialize Equipment
function initEquipment() {
    // Load current equipment requests
    loadEquipmentRequests();

    // Populate equipment dropdown from the server
    const equipmentSelect = document.getElementById('equipment-type');
    if (equipmentSelect) {
        apiService.getEquipment().then(items => {
            equipmentSelect.innerHTML = '<option value="">-- Select an equipment --</option>';
            items.forEach(eq => {
                const opt = document.createElement('option');
                opt.value = eq.id;
                opt.textContent = `${eq.type} - ${eq.model} (${eq.status})`;
                equipmentSelect.appendChild(opt);
            });
        }).catch(err => console.error('Error fetching equipment list:', err));
    }

    const form = document.getElementById('equipment-form');
    const continueBtn = document.getElementById('continue-to-form');
    const termsCheckbox = document.getElementById('terms-agreement-initial');
    const termsContainer = document.getElementById('equipment-terms-container');
    const borrowDurationSelect = document.getElementById('borrow-duration');
    const returnTimeEl = document.getElementById('return-time');

    // Disable proceed button until terms are agreed
    continueBtn.disabled = true;
    continueBtn.classList.add('bg-gray-400', 'cursor-not-allowed');

    // Enable/disable proceed button when terms checkbox changes
    termsCheckbox.addEventListener('change', function() {
      if (this.checked) {
        continueBtn.disabled = false;
        continueBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        continueBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
      } else {
        continueBtn.disabled = true;
        continueBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        continueBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
      }
    });

    // Show form after agreeing to terms
    continueBtn.addEventListener('click', () => {
      termsContainer.classList.add('hidden');
      form.classList.remove('hidden');
    });

    // Update return-by display when duration changes
    borrowDurationSelect.addEventListener('change', function() {
      const days = parseInt(this.value, 10);
      if (days) {
        const now = new Date();
        now.setDate(now.getDate() + days);
        returnTimeEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      } else {
        returnTimeEl.textContent = 'Select duration to calculate return time';
      }
    });

    // Handle equipment request submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const equipId = equipmentSelect.value;
        const duration = parseInt(document.getElementById('borrow-duration').value, 10);
        let purpose = document.getElementById('borrow-purpose').value;
        if (purpose === 'other') {
            purpose = document.getElementById('other-purpose').value;
        }
        try {
            await apiService.requestEquipment({ userId: window.defaultUserId, equipId, purpose, duration });
            showSuccessModal('Equipment Request Submitted', 'Your request has been submitted successfully.');
            form.reset();
            form.classList.add('hidden');
            termsContainer.classList.remove('hidden');
            loadEquipmentRequests();
        } catch (err) {
            showNotification('Error submitting equipment request', 'error');
            console.error(err);
            }
        });
}
// Expose to global scope
window.initEquipment = initEquipment;

// Initialize Notifications
async function initNotifications() {
    console.log("Initializing notifications...");
    // Setup dynamic fetch and render function
    async function fetchAndRenderNotifications() {
        const filterSelect = document.getElementById('notification-filter');
        const filterValue = filterSelect ? filterSelect.value : 'all';
        // Build filter params
        const params = { userId: window.defaultUserId };
        if (filterValue && filterValue !== 'all') {
            if (filterValue === 'unread') {
                params.filter = 'unread';
            } else {
                params.type = filterValue;
            }
        }
        try {
            const notifications = await apiService.getNotifications(params);
            window.notificationsData = notifications;
            renderNotifications(notifications);
            updateMarkAllReadButtonText(filterValue);
            updateNotificationCount();
        } catch (err) {
            console.error('Error fetching notifications with filter:', err);
        }
    }

    // Attach filter change to dynamic fetch
    const filterSelect = document.getElementById('notification-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', fetchAndRenderNotifications);
    }

    // Set up mark all as read button
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', async () => {
            await markAllNotificationsAsRead();
            // Refresh after marking
            fetchAndRenderNotifications();
        });
    }

    // Initial fetch and render
    await fetchAndRenderNotifications();
}

// Filter notifications
function filterNotifications() {
    const filterSelect = document.getElementById('notification-filter');
    const filterValue = filterSelect ? filterSelect.value : 'all';

    console.log("Filtering notifications with:", filterValue);

    // Filter notifications
    let filteredNotifications = [...window.notificationsData];

    if (filterValue === 'meeting_room') {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === 'meeting_room');
    } else if (filterValue === 'equipment') {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === 'equipment');
    } else if (filterValue === 'book') {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === 'book');
    } else if (filterValue === 'unread') {
        filteredNotifications = filteredNotifications.filter(notification => !notification.read);
    }
    // No filter needed for 'all' option - it will show all notifications

    // Sort notifications by date (newest first)
    filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Update the "Mark All as Read" button text based on the current filter
    updateMarkAllReadButtonText(filterValue);

    renderNotifications(filteredNotifications);
}

// Update the "Mark All as Read" button text based on the current filter
function updateMarkAllReadButtonText(filterValue) {
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    if (!markAllReadBtn) return;

    // Default text (for both mobile and desktop)
    let mobileText = 'Mark All Read';
    let desktopText = 'Mark All as Read';

    if (filterValue === 'meeting_room') {
        mobileText = 'Mark Room Notifs Read';
        desktopText = 'Mark Meeting Room Notifications as Read';
    } else if (filterValue === 'equipment') {
        mobileText = 'Mark Equipment Read';
        desktopText = 'Mark Equipment Notifications as Read';
    } else if (filterValue === 'book') {
        mobileText = 'Mark Book Notifs Read';
        desktopText = 'Mark Book Notifications as Read';
    } else if (filterValue === 'unread') {
        mobileText = 'Mark Unread Read';
        desktopText = 'Mark All Unread as Read';
    }

    // Update button text with responsive classes
    markAllReadBtn.innerHTML = `
        <i class="fas fa-check-double mr-1"></i>
        <span class="hidden sm:inline">${desktopText}</span>
        <span class="sm:hidden">${mobileText}</span>
    `;
}
// Expose to global scope
window.filterNotifications = filterNotifications;

// Render notifications to the notifications-list container
function renderNotifications(notifications) {
    const notificationsContainer = document.getElementById('notifications-list');

    if (!notificationsContainer) return;

    // Clear the container
    notificationsContainer.innerHTML = '';

    // If no notifications match the filter criteria
    if (notifications.length === 0) {
        notificationsContainer.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-bell-slash text-gray-300 text-4xl mb-3"></i>
                <p class="text-gray-500">No notifications match your filter criteria</p>
            </div>
        `;
        return;
    }

    // Generate HTML for each notification and append to container
    notifications.forEach(notification => {
        const notificationCard = document.createElement('div');

        // Set border color based on notification type
        let borderColor = 'border-blue-500';
        let bgColor = 'bg-blue-50';
        let textColor = 'text-blue-800';
        let icon = 'fa-info-circle';

        if (notification.type === 'meeting_room') {
            if (notification.status === 'approved') {
                borderColor = 'border-green-500';
                bgColor = 'bg-green-50';
                textColor = 'text-green-800';
                icon = 'fa-check-circle';
            } else if (notification.status === 'rejected') {
                borderColor = 'border-red-500';
                bgColor = 'bg-red-50';
                textColor = 'text-red-800';
                icon = 'fa-times-circle';
            } else if (notification.status === 'pending') {
                borderColor = 'border-yellow-500';
                bgColor = 'bg-yellow-50';
                textColor = 'text-yellow-800';
                icon = 'fa-clock';
            }
        } else if (notification.type === 'equipment') {
            if (notification.status === 'approved') {
                borderColor = 'border-green-500';
                bgColor = 'bg-green-50';
                textColor = 'text-green-800';
                icon = 'fa-check-circle';
            } else if (notification.status === 'rejected') {
                borderColor = 'border-red-500';
                bgColor = 'bg-red-50';
                textColor = 'text-red-800';
                icon = 'fa-times-circle';
            } else if (notification.status === 'pending') {
                borderColor = 'border-yellow-500';
                bgColor = 'bg-yellow-50';
                textColor = 'text-yellow-800';
                icon = 'fa-clock';
            } else if (notification.status === 'reminder') {
                borderColor = 'border-purple-500';
                bgColor = 'bg-purple-50';
                textColor = 'text-purple-800';
                icon = 'fa-bell';
            }
        } else if (notification.type === 'book') {
            if (notification.status === 'overdue') {
                borderColor = 'border-red-500';
                bgColor = 'bg-red-50';
                textColor = 'text-red-800';
                icon = 'fa-exclamation-circle';
            }
        }

        notificationCard.className = `p-3 border-l-4 ${borderColor} ${bgColor} rounded-r-lg mb-3 ${notification.read ? 'opacity-70' : ''}`;

        // Format the date
        const notificationDate = new Date(notification.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let dateDisplay = notificationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        if (notificationDate.toDateString() === today.toDateString()) {
            dateDisplay = 'Today';
        } else if (notificationDate.toDateString() === yesterday.toDateString()) {
            dateDisplay = 'Yesterday';
        }

        notificationCard.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-medium ${textColor} flex items-center">
                    <i class="fas ${icon} mr-2"></i>
                    ${notification.title}
                </h3>
                <span class="text-xs text-gray-500">${dateDisplay}</span>
            </div>
            <p class="text-sm text-gray-600 mt-1">${notification.message}</p>
            <div class="flex justify-between items-center mt-2">
                <span class="text-xs ${notification.read ? 'text-gray-400' : 'text-blue-600 font-medium'}">${notification.read ? 'Read' : 'Unread'}</span>
                <button class="text-xs text-blue-600 hover:text-blue-800 mark-as-read-btn" data-id="${notification.id}">
                    ${notification.read ? 'Mark as unread' : 'Mark as read'}
                </button>
            </div>
        `;

        notificationsContainer.appendChild(notificationCard);
    });

    // Add event listeners to mark as read/unread buttons
    document.querySelectorAll('.mark-as-read-btn').forEach(button => {
        button.addEventListener('click', function() {
            const notificationId = this.getAttribute('data-id');
            toggleNotificationReadStatus(notificationId);
        });
    });
}

// Toggle notification read status
function toggleNotificationReadStatus(notificationId) {
    const notification = window.notificationsData.find(n => n.id === notificationId);
    if (notification) {
        notification.read = !notification.read;
        filterNotifications(); // Re-render notifications
    }
}

// Add a notification
function addNotification(type, title, message, status = 'info') {
    // Generate a unique ID
    const id = 'N' + (window.notificationsData.length + 1).toString().padStart(3, '0');

    // Create the notification object
    const notification = {
        id,
        type,
        title,
        message,
        status,
        date: new Date().toISOString().split('T')[0],
        read: false
    };

    // Add to the notifications array
    window.notificationsData.push(notification);

    // Re-render notifications if we're on the notifications tab
    const notificationsPane = document.getElementById('notifications-content');
    if (notificationsPane && !notificationsPane.classList.contains('hidden')) {
        filterNotifications();
    }

    // Update the notification count in the sidebar
    updateNotificationCount();

    return notification;
}
// Expose to global scope
window.addNotification = addNotification;

// Mark all notifications as read
async function markAllNotificationsAsRead() {
    console.log("Marking all notifications as read");

    // Get the current filter value
    const filterSelect = document.getElementById('notification-filter');
    const filterValue = filterSelect ? filterSelect.value : 'all';

    // Determine which notifications to mark as read based on the current filter
    let notificationsToMark = [...window.notificationsData];

    if (filterValue === 'meeting_room') {
        notificationsToMark = notificationsToMark.filter(notification => notification.type === 'meeting_room');
    } else if (filterValue === 'equipment') {
        notificationsToMark = notificationsToMark.filter(notification => notification.type === 'equipment');
    } else if (filterValue === 'book') {
        notificationsToMark = notificationsToMark.filter(notification => notification.type === 'book');
    } else if (filterValue === 'unread') {
        // If already filtered to unread, mark all unread as read
        notificationsToMark = notificationsToMark.filter(notification => !notification.read);
    }

    // Filter to only unread notifications
    const unreadNotifications = notificationsToMark.filter(n => !n.read);

    if (unreadNotifications.length === 0) {
        showNotification('No unread notifications to mark as read', 'info');
        return;
    }

    // Mark the filtered notifications as read
    unreadNotifications.forEach(notification => {
        const index = window.notificationsData.findIndex(n => n.id === notification.id);
        if (index !== -1) {
            window.notificationsData[index].read = true;
        }
    });

    // Persist read status to backend
    await Promise.all(unreadNotifications.map(notification => {
        return apiService.patchNotificationRead(notification.id);
    }));

    // Re-render notifications
    filterNotifications();

    // Update notification count in sidebar
    updateNotificationCount();

    // Show success notification with category information
    let categoryText = '';
    if (filterValue === 'meeting_room') {
        categoryText = 'meeting room';
    } else if (filterValue === 'equipment') {
        categoryText = 'equipment';
    } else if (filterValue === 'book') {
        categoryText = 'book';
    }

    const message = categoryText
        ? `Marked ${unreadNotifications.length} ${categoryText} notification${unreadNotifications.length !== 1 ? 's' : ''} as read`
        : `Marked ${unreadNotifications.length} notification${unreadNotifications.length !== 1 ? 's' : ''} as read`;

    showNotification(message, 'success');
}
// Expose to global scope
window.markAllNotificationsAsRead = markAllNotificationsAsRead;

// Update notification count in sidebar
function updateNotificationCount() {
    const unreadCount = window.notificationsData.filter(n => !n.read).length;
    const notificationBadge = document.querySelector('#tab-notifications .ml-auto');

    if (notificationBadge) {
        notificationBadge.textContent = unreadCount;

        if (unreadCount === 0) {
            notificationBadge.classList.add('hidden');
        } else {
            notificationBadge.classList.remove('hidden');
        }
    }
}

// Open meeting room reservation modal
function openRoomModal() {
    console.log("Opening room modal with selectedDate:", selectedDate, "selectedTimeSlot:", selectedTimeSlot);

    if (!selectedDate || !selectedTimeSlot) {
        showNotification('Please select a date and time slot first', 'error');
        return;
    }

    const modal = document.getElementById('room-modal');
    const selectedDateElement = document.getElementById('selected-date');
    const selectedTimeElement = document.getElementById('selected-time');

    if (!modal) {
        console.error("Room modal element not found");
        return;
    }

    if (!selectedDateElement || !selectedTimeElement) {
        console.error("Selected date or time elements not found in modal");
        return;
    }

    try {
        // Update selected date and time
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Find the time slot object
        const timeSlot = mockData.timeSlots.find(ts => ts.id == parseInt(selectedTimeSlot));
        console.log("Found time slot:", timeSlot);

        selectedDateElement.textContent = formattedDate;
        selectedTimeElement.textContent = timeSlot ? timeSlot.time : 'Selected time';

        // Reset form
        const form = document.getElementById('room-reservation-form');
        if (form) {
            form.reset();
        }

        // Show modal
        console.log("Displaying room modal");
        modal.classList.remove('hidden');
        modal.classList.remove('opacity-0');

        // Add fade-in effect
        setTimeout(() => {
            modal.classList.add('modal-fade-in');
        }, 10);

    } catch (error) {
        console.error("Error opening room modal:", error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Initialize Mobile Menu
function initMobileMenu() {
    const mobileSearch = document.querySelector('.md\\:hidden.hidden.px-4.py-2.bg-blue-900');
    const mobileNav = document.querySelector('nav.md\\:hidden.hidden');

    // Add search toggle button
    const topSection = document.querySelector('header .flex.items-center.justify-between');
    if (topSection) {
        // Create search toggle button
        const searchToggle = document.createElement('button');
        searchToggle.className = 'md:hidden text-white mr-2';
        searchToggle.innerHTML = '<i class="fas fa-search"></i>';

        // Create hamburger menu toggle
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'md:hidden text-white mr-2';
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';

        // Insert before the profile
        const profileDiv = document.querySelector('.w-10.h-10.bg-\\[\\#ff5252\\]');
        if (profileDiv) {
            topSection.insertBefore(searchToggle, profileDiv);
            topSection.insertBefore(hamburgerBtn, profileDiv);

            // Toggle mobile search
            searchToggle.addEventListener('click', () => {
                if (mobileSearch) {
                    mobileSearch.classList.toggle('hidden');
                    if (mobileNav) {
                        mobileNav.classList.add('hidden');
                    }
                }
            });

            // Toggle mobile nav
            hamburgerBtn.addEventListener('click', () => {
                if (mobileNav) {
                    mobileNav.classList.toggle('hidden');
                    if (mobileSearch) {
                        mobileSearch.classList.add('hidden');
                    }
                }
            });
        }
    }
}

// Initialize Form Validation
function initFormValidation() {
    // Room reservation form validation
    const roomForm = document.getElementById('room-reservation-form');
    const attendeesCountInput = document.getElementById('attendees-count');
    const attendeeFieldsContainer = document.getElementById('attendee-fields');
    const roomFormError = document.getElementById('room-form-error');

    if (roomForm && attendeesCountInput && attendeeFieldsContainer) {
        // Update attendee fields when count changes
        attendeesCountInput.addEventListener('change', () => {
            updateAttendeeFields(parseInt(attendeesCountInput.value));
        });

        // Get the confirm reservation button
        const confirmRoomReservationBtn = document.getElementById('confirm-room-reservation');

        if (confirmRoomReservationBtn) {
            confirmRoomReservationBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                if (!roomForm.checkValidity()) {
                    roomForm.reportValidity();
                    return;
                }
                const purpose = document.getElementById('meeting-purpose').value;
                const attendeesCount = document.getElementById('attendees-count').value;
                const reservedDate = selectedDate;
                const reservedTime = document.getElementById('selected-time').textContent;
                if (!reservedDate || !selectedTimeSlot) {
                    showNotification('Please select a date and time slot first', 'warning');
                    return;
                }
                try {
                    const attendeeInputs = document.querySelectorAll('#attendee-fields .attendee-id');
                const attendeeIds = Array.from(attendeeInputs).map(input => input.value);
                    // Get additional notes
                    const additionalNotes = document.getElementById('meeting-notes').value;

                    await apiService.registerMeeting({
                        userId: window.defaultUserId,
                    date: reservedDate,
                        slotId: parseInt(selectedTimeSlot),
                        purpose,
                        attendeesCount: parseInt(attendeesCount),
                        attendeeIds,
                        additionalNotes
                    });
                    updateTimeSlots(reservedDate);
                closeRoomModal();
                    showNotification('Meeting room reservation confirmed!', 'success');
                    if (window.addNotification) {
                        window.addNotification(
                        'meeting_room',
                            'Meeting Room Reservation Confirmed',
                            `Your reservation for ${reservedDate} at ${reservedTime} is confirmed.`,
                            'approved'
                    );
                    }
                    showRoomReservationSuccess(reservedDate, reservedTime, attendeesCount);
                } catch (err) {
                    console.error('Error submitting reservation:', err);
                    showNotification(`Error submitting reservation: ${err.message}`, 'error');
                }
            });
        } else {
            console.error("Confirm room reservation button not found");
        }
    }

    // Reserve room button
    const reserveRoomBtn = document.getElementById('reserve-room-btn');
    if (reserveRoomBtn) {
        reserveRoomBtn.addEventListener('click', openRoomModal);
    }
}

// Show room reservation success modal
function showRoomReservationSuccess(date, time, attendeesCount) {
    const successModal = document.getElementById('success-modal');
    const successTitle = document.getElementById('success-title');
    const successMessage = document.getElementById('success-message');

    if (successModal && successTitle && successMessage) {
        // Set the success message content
        successTitle.textContent = 'Meeting Room Reserved Successfully';
        successMessage.textContent = `Your meeting room has been reserved for ${date} at ${time} for ${attendeesCount} attendees.`;

        // Display the success modal
        successModal.classList.remove('hidden');
        successModal.classList.remove('opacity-0');

        // Force a reflow to ensure the transition applies
        void successModal.offsetWidth;

        // Add animation class
        successModal.classList.add('modal-fade-in');

        console.log("Success modal displayed");
    } else {
        console.error("Success modal elements not found");
    }
}

// Update attendee fields based on count
function updateAttendeeFields(count) {
    console.log("Updating attendee fields for count:", count);
    const attendeeFieldsContainer = document.getElementById('attendee-fields');
    const attendeeContainer = document.getElementById('attendee-container');

    if (!attendeeFieldsContainer || !attendeeContainer) {
        console.error("Attendee container or fields container not found");
        return;
    }

    // Show the container if count is selected
    if (count) {
        attendeeContainer.classList.remove('hidden');
    } else {
        attendeeContainer.classList.add('hidden');
        return;
    }

    // Clear existing fields
    attendeeFieldsContainer.innerHTML = '';

    // Add a help text at the top
    const helpText = document.createElement('div');
    helpText.className = 'mb-3 text-sm text-gray-600';
    helpText.innerHTML = `
        <p>Please enter the student IDs for all ${count} attendees:</p>
        <p class="text-xs mt-1 text-blue-600"><i class="fas fa-info-circle mr-1"></i> Format: XX-XXXX (e.g., 23-1234)</p>
    `;
    attendeeFieldsContainer.appendChild(helpText);

    // Add fields based on count
    for (let i = 1; i <= count; i++) {
        const field = document.createElement('div');
        field.className = 'flex items-center gap-2 mb-2';

        // For the first attendee, pre-fill with the current user's ID and mark as "You"
        if (i === 1 && mockData.studentProfile && mockData.studentProfile.id) {
            field.innerHTML = `
                <span class="text-xs font-medium text-gray-500 w-5">${i}.</span>
                <div class="flex-1 relative">
                    <input type="text" class="attendee-id w-full p-2 border border-blue-300 bg-blue-50 rounded-lg text-sm"
                        value="${mockData.studentProfile.id}" pattern="[0-9]{2}-[0-9]{4}"
                        title="Format: XX-XXXX (e.g., 23-1234)" required readonly>
                    <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        You
                    </span>
                </div>
            `;
        } else {
            field.innerHTML = `
                <span class="text-xs font-medium text-gray-500 w-5">${i}.</span>
                <div class="flex-1 relative">
                    <input type="text" class="attendee-id w-full p-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Student ID (e.g., 23-1234)" pattern="[0-9]{2}-[0-9]{4}"
                        title="Format: XX-XXXX (e.g., 23-1234)" required>
                    <div class="validation-feedback hidden absolute right-2 top-1/2 transform -translate-y-1/2">
                        <i class="fas fa-check-circle text-green-500"></i>
                    </div>
                </div>
            `;
        }

        attendeeFieldsContainer.appendChild(field);
    }

    // Add validation for the input fields
    const inputFields = attendeeFieldsContainer.querySelectorAll('.attendee-id:not([readonly])');
    inputFields.forEach(input => {
        input.addEventListener('input', function() {
            const isValid = this.checkValidity();
            const feedback = this.parentNode.querySelector('.validation-feedback');

            if (feedback) {
                if (isValid && this.value.length > 0) {
                    feedback.classList.remove('hidden');
                } else {
                    feedback.classList.add('hidden');
                }
            }
        });
    });

    console.log(`Created ${count} attendee input fields`);
}

// Setup Event Listeners
function setupEventListeners() {
    console.log('Setting up additional event listeners');

    // Re-attach tab button click listeners directly
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    console.log(`Found ${tabButtons.length} tab buttons and ${tabPanes.length} tab panes`);

    tabButtons.forEach((button, index) => {
        console.log(`Setting up direct event listener for tab button ${index + 1}:`, button.id);

        // Add a direct click handler to each tab button
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`Tab button clicked directly: ${button.id}`);

            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('text-blue-600');
                btn.classList.remove('bg-blue-50');
                btn.classList.remove('border-blue-500');
                btn.classList.add('text-gray-600');
                btn.classList.add('border-transparent');
            });

            // Add active class to clicked button
            button.classList.add('active');
            button.classList.add('text-blue-600');
            button.classList.add('bg-blue-50');
            button.classList.add('border-blue-500');
            button.classList.remove('text-gray-600');
            button.classList.remove('border-transparent');

            // Close the Books accordion if we're switching to a non-book tab
            const tabId = button.id.replace('tab-', '');
            if (tabId !== 'books' && tabId !== 'physical-books' && tabId !== 'ebooks') {
                // Close the accordion content
                const accordionContent = document.querySelector('.accordion-content');
                const booksAccordionBtn = document.getElementById('books-accordion-btn');

                if (accordionContent && !accordionContent.classList.contains('hidden')) {
                    accordionContent.classList.add('hidden');

                    // Reset the chevron icon
                    const chevronIcon = booksAccordionBtn ? booksAccordionBtn.querySelector('.fa-chevron-down') : null;
                    if (chevronIcon) {
                        chevronIcon.style.transform = 'rotate(0deg)';
                    }

                    // Reset the accordion header styling
                    if (booksAccordionBtn) {
                        booksAccordionBtn.classList.remove('text-blue-600');
                        booksAccordionBtn.classList.remove('border-blue-500');
                        booksAccordionBtn.classList.add('text-gray-600');
                        booksAccordionBtn.classList.add('border-transparent');
                    }
                }

                // Reset book tabs
                const ebooksTab = document.getElementById('tab-ebooks');
                const physicalBooksTab = document.getElementById('tab-physical-books');

                if (ebooksTab) {
                    ebooksTab.classList.remove('active');
                    ebooksTab.classList.remove('text-blue-600');
                    ebooksTab.classList.remove('bg-blue-50');
                    ebooksTab.classList.remove('border-blue-500');
                    ebooksTab.classList.add('text-gray-600');
                    ebooksTab.classList.add('border-transparent');
                }

                if (physicalBooksTab) {
                    physicalBooksTab.classList.remove('active');
                    physicalBooksTab.classList.remove('text-blue-600');
                    physicalBooksTab.classList.remove('bg-blue-50');
                    physicalBooksTab.classList.remove('border-blue-500');
                    physicalBooksTab.classList.add('text-gray-600');
                    physicalBooksTab.classList.add('border-transparent');
                }
            }

            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            });

            // Show the corresponding tab pane
            const tabPane = document.getElementById(`${tabId}-content`);
            console.log(`Looking for tab pane: ${tabId}-content, found:`, tabPane ? 'yes' : 'no');

            if (tabPane) {
                tabPane.classList.remove('hidden');
                tabPane.classList.add('active');
                console.log(`Tab pane ${tabId}-content is now active`);
            }

            return false;
        };
    });

    // Re-attach sidebar toggle event listener directly
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        console.log('Setting up direct event listener for sidebar toggle');

        sidebarToggle.onclick = function(e) {
            e.preventDefault();
            console.log('Sidebar toggle clicked directly!');

            // Toggle sidebar classes
            sidebar.classList.toggle('sidebar-collapsed');
            sidebar.classList.toggle('sidebar-expanded');

            // Store the state in localStorage
            if (sidebar.classList.contains('sidebar-collapsed')) {
                localStorage.setItem('sidebarState', 'collapsed');
            } else {
                localStorage.setItem('sidebarState', 'expanded');
            }

            console.log('Sidebar classes after direct toggle:', sidebar.classList.toString());
            return false;
        };
    }

    // Book modal
    const bookModal = document.getElementById('book-modal');
    const closeBookModalBtn = document.getElementById('close-book-modal');

    if (closeBookModalBtn && bookModal) {
        closeBookModalBtn.addEventListener('click', () => closeModal(bookModal));

        bookModal.addEventListener('click', (e) => {
            if (e.target === bookModal) {
                closeModal(bookModal);
            }
        });
    }

    // Room modal
    const roomModal = document.getElementById('room-modal');
    const closeRoomModalBtn = document.getElementById('close-room-modal');

    if (closeRoomModalBtn && roomModal) {
        closeRoomModalBtn.addEventListener('click', closeRoomModal);

        roomModal.addEventListener('click', (e) => {
            if (e.target === roomModal) {
                closeRoomModal();
            }
        });
    }

    // Success modal
    const successModal = document.getElementById('success-modal');
    const closeSuccessModalBtn = document.getElementById('close-success-modal');

    if (closeSuccessModalBtn && successModal) {
        closeSuccessModalBtn.addEventListener('click', () => closeModal(successModal));

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal(successModal);
            }
        });
    }

    // Library Hours modal
    const libraryHoursModal = document.getElementById('library-hours-modal');
    const libraryHoursBtn = document.getElementById('library-hours-btn');
    const closeLibraryHoursModalBtn = document.getElementById('close-library-hours-modal');

    if (libraryHoursBtn && libraryHoursModal && closeLibraryHoursModalBtn) {
        libraryHoursBtn.addEventListener('click', () => {
            libraryHoursModal.classList.remove('hidden');
            setTimeout(() => {
                libraryHoursModal.classList.add('modal-fade-in');
            }, 10);
        });

        closeLibraryHoursModalBtn.addEventListener('click', () => closeModal(libraryHoursModal));

        libraryHoursModal.addEventListener('click', (e) => {
            if (e.target === libraryHoursModal) {
                closeModal(libraryHoursModal);
            }
        });
    }

    // Help Center modal
    const helpCenterModal = document.getElementById('help-center-modal');
    const helpCenterBtn = document.getElementById('help-center-btn');
    const closeHelpCenterModalBtn = document.getElementById('close-help-center-modal');

    if (helpCenterBtn && helpCenterModal && closeHelpCenterModalBtn) {
        helpCenterBtn.addEventListener('click', () => {
            helpCenterModal.classList.remove('hidden');
            setTimeout(() => {
                helpCenterModal.classList.add('modal-fade-in');
            }, 10);
        });

        closeHelpCenterModalBtn.addEventListener('click', () => closeModal(helpCenterModal));

        helpCenterModal.addEventListener('click', (e) => {
            if (e.target === helpCenterModal) {
                closeModal(helpCenterModal);
            }
        });
    }

    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                // Show a success message before redirecting
                document.getElementById('success-title').textContent = 'Logged Out Successfully';
                document.getElementById('success-message').textContent = 'You have been logged out of your account.';

                // Show modal with animation
                const successModal = document.getElementById('success-modal');
                successModal.classList.remove('hidden');
                setTimeout(() => {
                    successModal.classList.add('modal-fade-in');
                }, 10);

                // Add a delay before redirecting (simulating logout)
                setTimeout(function() {
                    // In a real application, this would redirect to the login page
                    // or perform an actual logout action
                    alert('In a real application, this would redirect to the login page.');
                }, 2000);
            }
        });
    }

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (bookModal && !bookModal.classList.contains('hidden')) {
                closeModal(bookModal);
            }
            if (roomModal && !roomModal.classList.contains('hidden')) {
                closeRoomModal();
            }
            if (successModal && !successModal.classList.contains('hidden')) {
                closeModal(successModal);
            }
            if (libraryHoursModal && !libraryHoursModal.classList.contains('hidden')) {
                closeModal(libraryHoursModal);
            }
            if (helpCenterModal && !helpCenterModal.classList.contains('hidden')) {
                closeModal(helpCenterModal);
            }
        }
    });

    // Setup sidebar accordion for Library Materials
    const booksAccordionBtn = document.getElementById('books-accordion-btn');
    if (booksAccordionBtn) {
        booksAccordionBtn.addEventListener('click', function(e) {
            // Prevent the click from propagating to parent elements
            e.stopPropagation();

            const accordionContent = this.nextElementSibling;
            const chevronIcon = this.querySelector('.fa-chevron-down');

            // Toggle the accordion content
            accordionContent.classList.toggle('hidden');

            // Rotate the chevron icon
            if (accordionContent.classList.contains('hidden')) {
                chevronIcon.style.transform = 'rotate(0deg)';

                // Remove active state from accordion header when collapsed
                this.classList.remove('text-blue-600');
                this.classList.remove('border-blue-500');
                this.classList.add('text-gray-600');
                this.classList.add('border-transparent');
            } else {
                chevronIcon.style.transform = 'rotate(180deg)';

                // Add active state to accordion header when expanded
                this.classList.add('text-blue-600');
                this.classList.add('border-blue-500');
                this.classList.remove('text-gray-600');
                this.classList.remove('border-transparent');

                // Switch to books tab with physical books selected by default
                if (typeof window.switchTab === 'function') {
                    window.switchTab('books', 'physical');
                }
            }
        });
    }

    // Setup sidebar accordion for Equipment
    const equipmentAccordionBtn = document.getElementById('equipment-accordion-btn');
    if (equipmentAccordionBtn) {
        equipmentAccordionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const accordionContent = this.nextElementSibling;
            const chevronIcon = this.querySelector('.fa-chevron-down');
            // Toggle content visibility
            accordionContent.classList.toggle('hidden');
            if (accordionContent.classList.contains('hidden')) {
                this.classList.remove('text-blue-600', 'border-blue-500');
                this.classList.add('text-gray-600', 'border-transparent');
                chevronIcon.style.transform = 'rotate(0deg)';
            } else {
                this.classList.add('text-blue-600', 'border-blue-500');
                this.classList.remove('text-gray-600', 'border-transparent');
                chevronIcon.style.transform = 'rotate(180deg)';
                // Automatically switch to 'My Equipment' sub-tab
                if (typeof switchTab === 'function') switchTab('equipment', 'borrowed');
            }
        });
    }
}

// Close modal
function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove('modal-fade-in');
    modal.classList.add('modal-fade-out');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('modal-fade-out');
    }, 300);
}

// Close room modal
function closeRoomModal() {
    const modal = document.getElementById('room-modal');
    closeModal(modal);
}

// Show success modal
function showSuccessModal(title, message) {
    console.log("Showing success modal:", title, message);

    const modal = document.getElementById('success-modal');
    const titleElement = document.getElementById('success-title');
    const messageElement = document.getElementById('success-message');

    if (modal && titleElement && messageElement) {
        // Set content
        titleElement.textContent = title;
        messageElement.textContent = message;

        // Make sure modal is visible
        modal.classList.remove('hidden');
        modal.classList.remove('opacity-0');

        // Force a reflow to ensure the transition applies
        void modal.offsetWidth;

        // Add animation class
        setTimeout(() => {
            modal.classList.add('modal-fade-in');
        }, 10);

        console.log("Success modal displayed");
    } else {
        console.error("Success modal elements not found:", {
            modal: !!modal,
            title: !!titleElement,
            message: !!messageElement
        });
    }
}

// View Book Details
function viewBookDetails(bookId) {
    // Find the book in our data
    const book = window.booksData ? window.booksData.find(b => b.id == bookId) : null;
    if (!book) {
        console.error(`Book with ID ${bookId} not found in data`);
        return;
    }

    const bookModal = document.getElementById('book-modal');
    const bookDetails = document.getElementById('book-details');
    const closeBookModalBtn = document.getElementById('close-book-modal');

    if (!bookModal || !bookDetails) return;

    // Update modal header based on book type
    const modalHeaderTitle = bookModal.querySelector('.flex.justify-between.items-start.mb-4 h3');
    if (modalHeaderTitle) modalHeaderTitle.textContent = book.type === 'ebook' ? 'E-Book Details' : 'Book Details';

    // Generate book details HTML
    const bookCover = getBookCoverHTML(book);

    const detailsHTML = `
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Left column - Book Cover -->
            <div class="flex flex-col items-center flex-shrink-0 w-48">
                <div class="w-40 mb-3">
                    ${bookCover}
                </div>
                <div class="mt-2 flex gap-2 justify-center">
                    ${getStatusBadgeHTML(book)}
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${book.type === 'physical' ? 'Physical' : 'E-Book'}</span>
                </div>
            </div>

            <!-- Right column - Book Details -->
            <div class="flex-1">
                <h3 class="text-xl font-semibold text-blue-800 mb-1">${book.title}</h3>
                <p class="text-gray-600 mb-4">by ${book.author}</p>

                <!-- Description at the top of details column -->
                <div class="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p class="text-sm text-gray-700">${book.description}</p>
                </div>

                <div class="grid grid-cols-2 gap-x-4 gap-y-2 my-4">
                    <div>
                        <p class="text-xs text-gray-500">Publication Year:</p>
                        <p class="text-sm">${book.publicationYear}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Publisher:</p>
                        <p class="text-sm">${book.publisher}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">ISBN:</p>
                        <p class="text-sm">${book.isbn}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Pages:</p>
                        <p class="text-sm">${book.pages}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Genre:</p>
                        <p class="text-sm">${book.genre}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Branch:</p>
                        <p class="text-sm">${book.branch}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Borrow Date:</p>
                        <p class="text-sm">${new Date(book.borrowDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Due Date:</p>
                        <p class="text-sm">${new Date(book.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        ${getDueDateDisplayHTML(book)}
                    </div>
                    ${book.status === 'returned' ?
                    `<div>
                        <p class="text-xs text-gray-500">Return Date:</p>
                        <p class="text-sm">${new Date(book.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>` : ''}
                    ${book.lateFee && book.lateFee !== '₱0.00' ?
                    `<div>
                        <p class="text-xs text-gray-500">Late Fee:</p>
                        <p class="text-sm font-medium text-red-600">${book.lateFee}</p>
                    </div>` : ''}
                </div>

                <div class="flex flex-wrap gap-2 justify-end border-t border-gray-200 pt-4 mt-4">
                    ${getActionButtonsHTML(book, true)}
                </div>
            </div>
        </div>
    `;

    bookDetails.innerHTML = detailsHTML;

    // Event handling for close button
    if (closeBookModalBtn) {
        closeBookModalBtn.onclick = () => closeModal(bookModal);
    }

    // Handle clicking outside modal content to close
    bookModal.onclick = (e) => {
        if (e.target === bookModal) {
            closeModal(bookModal);
        }
    };

    // Show the modal
    bookModal.classList.remove('hidden');
    setTimeout(() => {
        bookModal.classList.add('modal-fade-in');
    }, 10);
}
// Expose to global scope
window.viewBookDetails = viewBookDetails;

// Display confirmation dialog for actions
function confirmAction(message, actionCallback) {
    if (confirm(message)) {
        actionCallback();
    }
}

// Read e-book online
function readEbookOnline(bookId) {
    console.log(`Reading e-book ${bookId} online`);
    // This would typically open a reader interface for the e-book
    // For now, we'll just show an alert
    alert(`Opening online reader for e-book ${bookId}`);
}
// Expose to global scope
window.readEbookOnline = readEbookOnline;

// Save e-book offline
function saveEbookOffline(bookId) {
    console.log(`Saving e-book ${bookId} offline`);
    // This would typically download the e-book file
    // For now, we'll just show an alert
    alert(`Downloading e-book ${bookId} for offline reading`);
}
// Expose to global scope
window.saveEbookOffline = saveEbookOffline;
