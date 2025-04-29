// Room Reservation Custom Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Room reservation script loaded');

    // Get DOM elements
    const roomModal = document.getElementById('room-modal');
    const roomForm = document.getElementById('room-reservation-form');
    const confirmBtn = document.getElementById('confirm-room-reservation');
    const closeRoomBtn = document.getElementById('close-room-modal');

    // Terms and conditions elements
    const roomTermsContainer = document.getElementById('room-terms-container');
    const roomReservationContent = document.getElementById('room-reservation-content');
    const continueToRoomFormBtn = document.getElementById('continue-to-room-form');
    const roomTermsAgreementInitial = document.getElementById('room-terms-agreement-initial');

    // Handle terms agreement and continue button
    if (continueToRoomFormBtn && roomTermsAgreementInitial) {
        // Initially disable the continue button
        continueToRoomFormBtn.disabled = true;
        continueToRoomFormBtn.classList.add('bg-gray-400');
        continueToRoomFormBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');

        // Enable/disable continue button based on checkbox
        roomTermsAgreementInitial.addEventListener('change', function() {
            if (this.checked) {
                continueToRoomFormBtn.disabled = false;
                continueToRoomFormBtn.classList.remove('bg-gray-400');
                continueToRoomFormBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            } else {
                continueToRoomFormBtn.disabled = true;
                continueToRoomFormBtn.classList.add('bg-gray-400');
                continueToRoomFormBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            }
        });

        // Show the form when continue button is clicked
        continueToRoomFormBtn.addEventListener('click', function() {
            if (roomTermsAgreementInitial.checked) {
                // Hide terms container
                roomTermsContainer.classList.add('hidden');
                // Show room reservation content
                roomReservationContent.classList.remove('hidden');
            }
        });
    }

    // Add event listeners for room modal
    if (confirmBtn) {
        confirmBtn.addEventListener('click', handleRoomReservation);
    }

    if (closeRoomBtn) {
        closeRoomBtn.addEventListener('click', function() {
            hideElement(roomModal);
        });
    }

    // Handle room reservation form submission
    function handleRoomReservation() {
        console.log('Handling room reservation');

        // Validate form
        if (roomForm && !roomForm.checkValidity()) {
            roomForm.reportValidity();
            return;
        }

        // Get reservation details
        const date = document.getElementById('selected-date').textContent;
        const time = document.getElementById('selected-time').textContent;

        // Hide room modal
        hideElement(roomModal);

        // Show request submitted message after a short delay
        setTimeout(function() {
            // Show toast notification
            showToast('Meeting room request submitted!', 'success');

            // Add to notifications system
            if (window.addNotification) {
                window.addNotification(
                    'meeting_room',
                    'Meeting Room Request Submitted',
                    `Your request for a meeting room on ${date} at ${time} has been submitted and is pending approval.`,
                    'pending'
                );
            }

            // Show request submitted modal
            showSuccessModal('Meeting Room Request Submitted',
                `Your request for a meeting room on ${date} at ${time} has been submitted. You will receive a notification when your request is confirmed.`);

            // Reset form and show terms container again
            if (roomForm) {
                roomForm.reset();
            }

            // Reset the room selection UI
            const reserveRoomBtn = document.getElementById('reserve-room-btn');
            if (reserveRoomBtn) {
                reserveRoomBtn.disabled = true;
                reserveRoomBtn.classList.add('bg-gray-400');
                reserveRoomBtn.classList.remove('bg-blue-700', 'hover:bg-blue-700');
            }

            // Clear time slots container
            const timeSlotsContainer = document.getElementById('time-slots-container');
            if (timeSlotsContainer) {
                timeSlotsContainer.innerHTML = '<p class="text-gray-500 text-sm">Select a date to view available time slots</p>';
            }

            // Show terms and hide reservation content after a delay
            setTimeout(() => {
                if (roomReservationContent) {
                    roomReservationContent.classList.add('hidden');
                }
                if (roomTermsContainer) {
                    roomTermsContainer.classList.remove('hidden');
                }

                // Reset the initial terms agreement checkbox
                if (roomTermsAgreementInitial) {
                    roomTermsAgreementInitial.checked = false;
                    continueToRoomFormBtn.disabled = true;
                    continueToRoomFormBtn.classList.add('bg-gray-400');
                    continueToRoomFormBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                }
            }, 500);
        }, 300);
    }

    // Show confirmation modal
    function showSuccessModal(title, message) {
        console.log('Showing confirmation modal:', title, message);

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        modalContainer.id = 'custom-success-modal';

        // Create modal content
        modalContainer.innerHTML = `
            <div class="bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">${title}</h3>
                    <p class="text-gray-600 mb-6">${message}</p>
                    <div class="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-6 text-sm text-yellow-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        Note: Your request will be reviewed by library staff. You will receive a notification when it is approved.
                    </div>
                    <div class="flex justify-center">
                        <button id="close-custom-success" class="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(modalContainer);

        // Add close button event listener
        const closeBtn = document.getElementById('close-custom-success');
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
            bgColor = 'bg-blue-500'; // Changed from green to blue for request submission
            icon = 'fa-paper-plane'; // Changed to paper plane icon for submission
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

    // Helper function to hide an element
    function hideElement(element) {
        if (element) {
            element.classList.add('opacity-0');
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    }
});
