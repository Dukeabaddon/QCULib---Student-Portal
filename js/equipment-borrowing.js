// Equipment Borrowing Custom Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Equipment borrowing script loaded');

    // Get DOM elements
    const equipmentForm = document.getElementById('equipment-form');
    const termsContainer = document.getElementById('equipment-terms-container');
    const continueToFormBtn = document.getElementById('continue-to-form');
    const termsAgreementInitial = document.getElementById('terms-agreement-initial');
    const submitEquipmentFormBtn = document.getElementById('submit-equipment-form');

    // Equipment accordion in sidebar
    const equipmentAccordionBtn = document.getElementById('equipment-accordion-btn');
    const equipmentAccordionContent = document.querySelector('#equipment-accordion-btn + .accordion-content');

    // Initialize equipment accordion in sidebar
    if (equipmentAccordionBtn && equipmentAccordionContent) {
        // Toggle accordion on click
        equipmentAccordionBtn.addEventListener('click', function(e) {
            // Prevent the click from propagating to parent elements
            e.stopPropagation();

            // Toggle content visibility
            equipmentAccordionContent.classList.toggle('hidden');

            // Rotate chevron icon
            const chevronIcon = this.querySelector('.fa-chevron-down');
            if (chevronIcon) {
                if (equipmentAccordionContent.classList.contains('hidden')) {
                    chevronIcon.style.transform = 'rotate(0deg)';

                    // Remove active styling when closing
                    this.classList.remove('text-blue-600');
                    this.classList.remove('border-blue-500');
                    this.classList.add('text-gray-600');
                    this.classList.add('border-transparent');
                } else {
                    chevronIcon.style.transform = 'rotate(180deg)';

                    // Add active styling when opening
                    this.classList.add('text-blue-600');
                    this.classList.add('border-blue-500');
                    this.classList.remove('text-gray-600');
                    this.classList.remove('border-transparent');

                    // Switch to equipment tab
                    if (typeof window.switchTab === 'function') {
                        window.switchTab('equipment', 'borrowed');
                    }
                }
            }
        });
    }

    // Initialize equipment tabs
    const myEquipmentTab = document.getElementById('tab-my-equipment');
    const borrowEquipmentTab = document.getElementById('tab-borrow-equipment');

    if (myEquipmentTab) {
        myEquipmentTab.addEventListener('click', function() {
            // Load borrowed equipment when clicking on My Equipment tab
            loadBorrowedEquipment();
        });
    }

    // Terms and conditions logic: disable proceed until terms checked
    if (continueToFormBtn && termsAgreementInitial) {
        // Initially disable the proceed button
        continueToFormBtn.disabled = true;
        continueToFormBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        // Enable when checked
        termsAgreementInitial.addEventListener('change', function() {
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
        // Show form only when proceed clicked
        continueToFormBtn.addEventListener('click', function() {
            if (termsAgreementInitial.checked) {
                termsContainer.classList.add('hidden');
                equipmentForm.classList.remove('hidden');
            }
        });
    }

    // Set up filter and sort change events
    const filterSelect = document.getElementById('equipment-filter');
    const sortSelect = document.getElementById('equipment-sort');

    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterAndSortEquipment();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            filterAndSortEquipment();
        });
    }

    // Initial load of borrowed equipment if My Equipment tab is active
    if (document.getElementById('my-equipment-content') &&
        !document.getElementById('my-equipment-content').classList.contains('hidden')) {
        loadBorrowedEquipment();
    }

    // Function to filter and sort equipment
    function filterAndSortEquipment() {
        const filterSelect = document.getElementById('equipment-filter');
        const sortSelect = document.getElementById('equipment-sort');

        if (!filterSelect || !sortSelect) {
            console.error("Filter or sort select elements not found");
            return;
        }

        const filterValue = filterSelect.value;
        const sortValue = sortSelect.value;

        // Filter equipment
        let filteredEquipment = [...window.mockData?.equipment || []];

        if (filterValue === 'borrowed') {
            filteredEquipment = filteredEquipment.filter(eq => eq.status === 'borrowed');
        } else if (filterValue === 'returned') {
            filteredEquipment = filteredEquipment.filter(eq => eq.status === 'returned');
        } else if (filterValue === 'overdue') {
            filteredEquipment = filteredEquipment.filter(eq => {
                if (eq.status !== 'borrowed') return false;
                const today = new Date();
                const dueDate = new Date(eq.borrowedUntil);
                return dueDate < today;
            });
        }
        // 'all' option shows all equipment

        // Sort equipment
        if (sortValue === 'due-date') {
            filteredEquipment.sort((a, b) => {
                // Put non-borrowed items at the end
                if (!a.borrowedUntil && !b.borrowedUntil) return 0;
                if (!a.borrowedUntil) return 1;
                if (!b.borrowedUntil) return -1;

                return new Date(a.borrowedUntil) - new Date(b.borrowedUntil);
            });
        } else if (sortValue === 'type') {
            filteredEquipment.sort((a, b) => a.type.localeCompare(b.type));
        }

        // Render the filtered and sorted equipment
        renderEquipment(filteredEquipment);
    }

    // Function to render equipment
    function renderEquipment(equipment) {
        loadBorrowedEquipment(equipment);
    }

    // Function to load and display borrowed equipment
    function loadBorrowedEquipment(equipmentList) {
        const borrowedEquipmentList = document.getElementById('borrowed-equipment-list');
        if (!borrowedEquipmentList) return;

        // Get equipment from parameter or filter from mock data
        const equipment = equipmentList || window.mockData?.equipment?.filter(eq => eq.status === 'borrowed') || [];

        // Clear the container
        borrowedEquipmentList.innerHTML = '';

        // If no equipment to display
        if (equipment.length === 0) {
            borrowedEquipmentList.innerHTML = `
                <div class="text-center py-6">
                    <i class="fas fa-check-circle text-green-500 text-3xl mb-3"></i>
                    <p class="text-gray-600">No equipment matches your filter criteria.</p>
                </div>
            `;
            return;
        }

        // Generate HTML for each equipment item
        equipment.forEach(item => {
            const equipmentCard = document.createElement('div');
            equipmentCard.className = 'p-4 bg-white border border-gray-200 rounded-lg shadow-sm';

            // Get icon based on equipment type
            let iconClass = 'fa-question-circle';
            if (item.type.toLowerCase() === 'dell') {
                iconClass = 'fa-laptop';
            } else if (item.type.toLowerCase() === 'tablet') {
                iconClass = 'fa-tablet-alt';
            } else if (item.type.toLowerCase() === 'mouse') {
                iconClass = 'fa-mouse';
            } else if (item.type.toLowerCase() === 'laptop-bag') {
                iconClass = 'fa-briefcase';
            } else if (item.type.toLowerCase() === 'pocket-wifi') {
                iconClass = 'fa-wifi';
            }

            // Status display
            let statusClass = '';
            let statusText = '';
            let dueDateDisplay = '';

            if (item.status === 'borrowed' && item.borrowedUntil) {
                // Calculate days until due
                const today = new Date();
                const dueDate = new Date(item.borrowedUntil);
                const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

                // Determine status class based on days left
                statusClass = 'text-blue-600';
                statusText = `Due in ${daysLeft} days`;

                if (daysLeft < 0) {
                    statusClass = 'text-red-600';
                    statusText = `Overdue by ${Math.abs(daysLeft)} days`;
                } else if (daysLeft === 0) {
                    statusClass = 'text-red-600';
                    statusText = 'Due today';
                } else if (daysLeft <= 2) {
                    statusClass = 'text-amber-600';
                    statusText = `Due in ${daysLeft} days`;
                }

                dueDateDisplay = `
                    <span class="text-xs text-gray-500">
                        Return by: ${new Date(item.borrowedUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                `;
            } else if (item.status === 'available') {
                statusClass = 'text-green-600';
                statusText = 'Available';
            } else if (item.status === 'returned') {
                statusClass = 'text-gray-600';
                statusText = 'Returned';
            }

            // Extension button (only show for borrowed items)
            const extensionButton = item.status === 'borrowed' ? `
                <div class="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                    <button type="button" class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            onclick="requestExtension('${item.id}')">
                        <i class="fas fa-calendar-plus mr-1.5"></i> Request Extension
                    </button>
                </div>
            ` : '';

            equipmentCard.innerHTML = `
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <i class="fas ${iconClass} text-blue-600 text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <div>
                                <h4 class="font-medium text-gray-900">${item.type}</h4>
                                <p class="text-sm text-gray-600">${item.model}</p>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="${statusClass} text-sm font-medium">
                                    ${statusText}
                                </span>
                                ${dueDateDisplay}
                            </div>
                        </div>
                        ${extensionButton}
                    </div>
                </div>
            `;

            borrowedEquipmentList.appendChild(equipmentCard);
        });
    }

    // Function to request an extension for borrowed equipment
    window.requestExtension = function(equipmentId) {
        // Find the equipment in mock data
        const equipment = window.mockData?.equipment?.find(eq => eq.id === equipmentId);
        if (!equipment) return;

        // Show notification
        if (typeof showToast === 'function') {
            showToast(`Extension request submitted for ${equipment.type} - ${equipment.model}`, 'success');
        } else {
            alert(`Extension request submitted for ${equipment.type} - ${equipment.model}`);
        }

        // Add to notifications
        if (window.addNotification) {
            window.addNotification(
                'equipment',
                'Extension Request Submitted',
                `Your request to extend the borrowing period for ${equipment.type} - ${equipment.model} has been submitted and is pending approval.`,
                'pending'
            );
        }

        // Refresh the equipment list
        filterAndSortEquipment();
    };

    // Initialize filter and sort on page load
    if (document.getElementById('equipment-filter') && document.getElementById('equipment-sort')) {
        filterAndSortEquipment();
    }

    // Function to validate equipment form
    function validateEquipmentForm() {
        const equipmentType = document.getElementById('equipment-type')?.value;
        const borrowDuration = document.getElementById('borrow-duration')?.value;
        const borrowPurpose = document.getElementById('borrow-purpose')?.value;
        const termsAgreement = document.getElementById('terms-agreement')?.checked;

        // Check if other purpose is required
        let otherPurposeValid = true;
        if (borrowPurpose === 'other') {
            const otherPurpose = document.getElementById('other-purpose')?.value;
            otherPurposeValid = otherPurpose && otherPurpose.trim() !== '';
        }

        return equipmentType && borrowDuration && borrowPurpose && termsAgreement && otherPurposeValid;
    }

    // Handle equipment form submission
    if (equipmentForm && submitEquipmentFormBtn) {
        equipmentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Validate the equipment form
            if (validateEquipmentForm()) {
                // Hide error message if visible
                const formError = document.getElementById('form-error');
                if (formError) {
                    formError.classList.add('hidden');
                }

                // Get equipment details for the success message
                const equipmentType = document.getElementById('equipment-type')?.value;
                const borrowDuration = document.getElementById('borrow-duration')?.value;

                // Show equipment request submitted modal and toast notification
                // Show toast notification
                showToast('Equipment request submitted!', 'success');

                // Get equipment name for display
                let equipmentName = equipmentType;
                const equipmentSelect = document.getElementById('equipment-type');
                if (equipmentSelect) {
                    const selectedOption = equipmentSelect.options[equipmentSelect.selectedIndex];
                    if (selectedOption) {
                        equipmentName = selectedOption.text;
                    }
                }

                // Map equipment type to proper display name if needed
                const equipmentDisplayNames = {
                    'laptop': 'Laptop',
                    'mouse': 'Mouse',
                    'charger': 'Charger',
                    'laptop-bag': 'Laptop Bag',
                    'pocket-wifi': 'Pocket Wifi'
                };

                if (equipmentDisplayNames[equipmentType]) {
                    equipmentName = equipmentDisplayNames[equipmentType];
                }

                // Add to notifications system
                if (window.addNotification) {
                    window.addNotification(
                        'equipment',
                        'Equipment Request Pending',
                        `Your request to borrow ${equipmentName} is pending approval.`,
                        'pending'
                    );
                }

                // Show modal
                showEquipmentRequestModal(equipmentType, borrowDuration);

                // Reset form and show terms container again
                equipmentForm.reset();
                equipmentForm.classList.add('hidden');
                termsContainer.classList.remove('hidden');

                // Reset the initial terms agreement checkbox
                if (termsAgreementInitial) {
                    termsAgreementInitial.checked = false;
                    continueToFormBtn.disabled = true;
                    continueToFormBtn.classList.add('bg-gray-400');
                    continueToFormBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                }
            } else {
                // Show error message
                const formError = document.getElementById('form-error');
                if (formError) {
                    formError.classList.remove('hidden');
                }

                // Trigger HTML5 validation
                const firstInvalidField = equipmentForm.querySelector(':invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });
    }

    // Show equipment request submitted modal
    function showEquipmentRequestModal(equipmentType, borrowDuration) {
        console.log('Showing equipment request modal:', equipmentType, borrowDuration);

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        modalContainer.id = 'custom-equipment-modal';

        // Get equipment name for display
        let equipmentName = equipmentType;
        const equipmentSelect = document.getElementById('equipment-type');
        if (equipmentSelect) {
            const selectedOption = equipmentSelect.options[equipmentSelect.selectedIndex];
            if (selectedOption) {
                equipmentName = selectedOption.text;
            }
        }

        // Create modal content
        modalContainer.innerHTML = `
            <div class="bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">Equipment Request Submitted</h3>
                    <p class="text-gray-600 mb-6">Your request to borrow ${equipmentName} has been submitted. You will receive a notification when your request is approved.</p>
                    <div class="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-6 text-sm text-yellow-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        Note: Your request will be reviewed by library staff. You will be notified when it is approved and ready for pickup.
                    </div>
                    <div class="flex justify-center">
                        <button id="close-equipment-modal" class="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(modalContainer);

        // Add close button event listener
        const closeBtn = document.getElementById('close-equipment-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modalContainer);
            });
        }

        // Close when clicking outside
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                document.body.removeChild(modalContainer);
            }
        });
    }

    // Helper function to show an element with animation
    function showElement(element) {
        if (element) {
            element.classList.remove('hidden');
            setTimeout(() => {
                element.classList.add('modal-fade-in');
                element.classList.remove('opacity-0');
            }, 10);
        }
    }

    // Helper function to hide an element with animation
    function hideElement(element) {
        if (element) {
            element.classList.add('opacity-0');
            element.classList.remove('modal-fade-in');
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        console.log('Showing toast:', message, type);

        // Get or create notification container
        let container = document.getElementById('custom-notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'custom-notification-container';
            container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
            document.body.appendChild(container);
        }

        // Create notification
        const notification = document.createElement('div');

        // Set styles based on type
        let bgColor = 'bg-blue-500';
        let icon = 'fa-info-circle';

        if (type === 'success') {
            bgColor = 'bg-blue-500'; // Blue for request submission
            icon = 'fa-paper-plane'; // Paper plane icon for submission
        } else if (type === 'error') {
            bgColor = 'bg-red-500';
            icon = 'fa-exclamation-circle';
        } else if (type === 'warning') {
            bgColor = 'bg-yellow-500';
            icon = 'fa-exclamation-triangle';
        } else if (type === 'confirmed') {
            bgColor = 'bg-green-500';
            icon = 'fa-check-circle';
        }

        notification.className = `px-4 py-3 rounded-lg shadow-lg ${bgColor} text-white opacity-0 transition-opacity duration-300`;

        // Add content
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${icon} mr-2"></i>
                <p>${message}</p>
            </div>
        `;

        // Add to DOM
        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('opacity-100');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('opacity-100');
            notification.classList.add('opacity-0');

            setTimeout(() => {
                if (notification.parentNode === container) {
                    container.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Handle other purpose field visibility
    const borrowPurpose = document.getElementById('borrow-purpose');
    const otherPurposeContainer = document.getElementById('other-purpose-container');

    if (borrowPurpose && otherPurposeContainer) {
        borrowPurpose.addEventListener('change', function() {
            if (this.value === 'other') {
                otherPurposeContainer.classList.remove('hidden');
            } else {
                otherPurposeContainer.classList.add('hidden');
            }
        });
    }

    // Calculate return date when duration changes
    const borrowDuration = document.getElementById('borrow-duration');
    const returnTime = document.getElementById('return-time');

    if (borrowDuration && returnTime) {
        borrowDuration.addEventListener('change', function() {
            if (this.value) {
                const days = parseInt(this.value);
                const today = new Date();
                const returnDate = new Date(today);
                returnDate.setDate(today.getDate() + days);

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                returnTime.textContent = returnDate.toLocaleDateString('en-US', options) + ' by 5:00 PM';
            } else {
                returnTime.textContent = 'Select duration to calculate return time';
            }
        });
    }
});
