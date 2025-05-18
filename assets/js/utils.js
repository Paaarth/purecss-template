/**
 * Utility functions for the site
 */

// Debounce function for resize/scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for frequent events
function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Simple modal system
function createModal(content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = content;

    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modalContent.prepend(closeBtn);
    modal.appendChild(modalContent);

    if (options.className) {
        modal.classList.add(options.className);
    }

    modal.style.display = 'block';

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.body.appendChild(modal);

    return {
        element: modal,
        close: () => {
            modal.style.display = 'none';
        },
        open: () => {
            modal.style.display = 'block';
        }
    };
}

// Add CSS for modal
const modalCSS = `
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
}

.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    position: relative;
    animation: modalopen 0.4s;
}

@keyframes modalopen {
    from {opacity: 0; transform: translateY(-50px);}
    to {opacity: 1; transform: translateY(0);}
}

.modal-close {
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal-close:hover {
    color: #1f8dd6;
}
`;

const style = document.createElement('style');
style.innerHTML = modalCSS;
document.head.appendChild(style);

// Export utils if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        createModal
    };
}