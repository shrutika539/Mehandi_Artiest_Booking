
// 🔐 LOGIN PROTECTION (ONLY FOR PROTECTED PAGES)
function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentPage = window.location.pathname;

    if (
        !isLoggedIn &&
        !currentPage.includes("login.html") &&
        !currentPage.includes("register.html")
    ) {
        window.location.href = "login.html";
    }
}



// Call check on page load
document.addEventListener("DOMContentLoaded", checkLogin);


// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Payment Mode Selection Handler
function showFormPaymentInfo(method) {
    const preview = document.getElementById('formPaymentPreview');
    
    if (!method) {
        preview.classList.remove('active');
        return;
    }

    const paymentInfo = {
        'upi': {
            title: '📱 UPI Payment Selected',
            content: `
                <p><strong>Name:</strong> Shrutika Ade</p>
                <p><strong>UPI ID:</strong> shrutikaade@oksbi</p>
                <p style="margin-top: 0.8rem;"><strong>Scan QR Code:</strong></p>
                <div style="text-align: center; margin: 1rem 0; padding: 1rem; background: white; border-radius: 10px;">
                    <img src="scanner.jpeg" alt="UPI QR Code" style="max-width: 250px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                </div>
                <button class="scan-button" onclick="openCameraScanner()">📷 Open Camera Scanner</button>
                <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #888;">Scan with Google Pay, PhonePe, Paytm, or any UPI app</p>
            `
        },
        'bank': {
            title: '🏦 Bank Transfer Selected',
            content: `
                <p><strong>Account:</strong> 1234567890123456</p>
                <p><strong>IFSC:</strong> SBIN0001234</p>
                <p><strong>Bank:</strong> State Bank of India</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">View full details in payment section above</p>
            `
        },
        'card': {
            title: '💳 Card Payment Selected',
            content: `
                <p>We accept Visa, Mastercard, RuPay cards</p>
                <p>Payment can be made on service day or via secure link</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">We'll send you a payment link after booking</p>
            `
        },
        'cash': {
            title: '💵 Cash Payment Selected',
            content: `
                <p>Cash payment accepted on service day</p>
                <p><strong>Advance Required:</strong></p>
                <p>• Bridal: 50% advance</p>
                <p>• Party/Events: 30% advance</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">Advance can be paid via UPI/Bank</p>
            `
        }
    };

    const info = paymentInfo[method];
    if (info) {
        preview.innerHTML = `<h5>${info.title}</h5>${info.content}`;
        preview.classList.add('active');
    }
}

// Camera Scanner Functions
let cameraStream = null;

function openCameraScanner() {
    const modal = document.getElementById('cameraScannerModal');
    const video = document.getElementById('cameraVideo');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        } 
    })
    .then(stream => {
        cameraStream = stream;
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Camera error:', err);
        alert('Unable to access camera. Please check camera permissions or use manual UPI ID entry.');
        closeCameraScanner();
    });
}

function closeCameraScanner() {
    const modal = document.getElementById('cameraScannerModal');
    const video = document.getElementById('cameraVideo');
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    video.srcObject = null;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function captureQRCode() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    alert('QR Code captured! In a production app, this would process the QR code data.\n\nFor demo purposes, please manually enter the UPI ID or use your UPI app to scan the QR code shown in the payment section.');
    
    closeCameraScanner();
}

// Escape key handler for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('cameraScannerModal').classList.contains('active')) {
            closeCameraScanner();
        }
        if (document.getElementById('serviceModal').classList.contains('active')) {
            closeServiceGallery();
        }
    }
});

// Service Gallery Data
const serviceGalleries = {
    bridal: {
        title: '💒 Bridal Mehandi',
        serviceId: 'bridal',
        price: '₹3,000 - ₹8,000',
        duration: '3-5 hours',
        coverage: 'Full hands & feet',
        description: 'Our bridal mehandi service offers intricate and elaborate designs perfect for your special day. Each design is crafted with love and precision to make you look stunning.',
        includes: [
            'Pre-wedding consultation',
            'Premium quality henna',
            'Full hand and feet coverage',
            'Intricate traditional patterns',
            'Modern fusion elements',
            'Touch-up service available',
            'Complimentary design customization'
        ],
        images: [
            'https://media.weddingz.in/images/1e357f603869fd86de46947a6b6f8691/qxhUWHQnJrb3zFamemfcAFLFfsnmBluQ500H3UT2r_dhtq5EuttBis5nXsf_wffZAjvjF7DI2ZfecSYIcyef1fcY77cFSC-6WQzNGpUYsVHt-wfkwR6s6NRyura87paww1UeaAKU.jpg',
            'https://tse2.mm.bing.net/th/id/OIP.J1xHJPPKfbPi3GEiBelGwAHaJQ?pid=Api&P=0&h=180',
            'https://cdn0.weddingwire.in/articles/images/1/2/6/0/img_80621/arabic-mehndi-design-pinterest-architecture-mehndi.jpg',
            'https://i.pinimg.com/736x/e1/c9/14/e1c914b62c3722eb5e83535f11e51803.jpg'
        ]
       
    },
    party: {
        title: '🎉 Party & Events',
        serviceId: 'party',
        price: '₹500 - ₹2,000',
        duration: '30 mins - 2 hours',
        coverage: 'Both hands or feet',
        description: 'Beautiful mehandi designs perfect for festivals, celebrations, and special occasions. Quick application with stunning results.',
        includes: [
            'Festive designs',
            'Quick application',
            'Natural henna cone',
            'Contemporary patterns',
            'Suitable for all occasions',
            'Group booking discounts available'
        ],
        images: [
            'https://i.pinimg.com/736x/12/5a/8f/125a8f25e06ef7b3014a2a68166755b0.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2021/08/Simple-Mehendi-Designs-1.jpg',
            'https://i.pinimg.com/originals/cd/6e/28/cd6e286fd4f4ab5b70fc8fb8a3d5d5b7.jpg',
            'https://i.pinimg.com/originals/2e/7b/29/2e7b29ea5aa21aa6a8b93d1ccda3fa87.jpg',
            'https://cdn0.weddingwire.in/article/4562/3_2/960/jpg/102654-mehndi-design-new-mehendi-design-by-harin-dalal-lead.jpeg',
            'https://i.pinimg.com/originals/db/81/92/db81920df8c16c5f90e98d6b32e59de7.jpg'
        ]
    },
    arabic: {
        title: '✨ Arabic Designs',
        serviceId: 'arabic',
        price: '₹800 - ₹2,500',
        duration: '1-3 hours',
        coverage: 'Hands or feet',
        description: 'Bold and elegant Arabic patterns that stand out with their unique style. Characterized by large floral motifs and flowing designs.',
        includes: [
            'Bold floral patterns',
            'Modern Arabic style',
            'Premium henna quality',
            'Quick drying formula',
            'Dark stain guarantee',
            'Free aftercare tips'
        ],
        images: [
            'https://media.weddingz.in/images/1e357f603869fd86de46947a6b6f8691/qxhUWHQnJrb3zFamemfcAFLFfsnmBluQ500H3UT2r_dhtq5EuttBis5nXsf_wffZAjvjF7DI2ZfecSYIcyef1fcY77cFSC-6WQzNGpUYsVHt-wfkwR6s6NRyura87paww1UeaAKU.jpg',
            'https://i.pinimg.com/originals/60/dd/32/60dd32c1b27a3eb6e29d6097b8c0ab42.jpg',
            'https://i.pinimg.com/736x/87/05/3d/87053d25c5a08e25ca1bb4ecf0f1c26e.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2019/07/Arabic-Mehendi-Designs-15.jpg',
            'https://i.pinimg.com/originals/8f/aa/f0/8faaf03e5f7bb6c4aa5bc0fc0ce7c31f.jpg',
            'https://stylesatlife.com/wp-content/uploads/2021/03/Simple-Arabic-Mehndi-Designs.jpg'
        ]
    },
    traditional: {
        title: '🌸 Traditional Designs',
        serviceId: 'traditional',
        price: '₹1,000 - ₹3,500',
        duration: '2-4 hours',
        coverage: 'Full hands & feet',
        description: 'Classic Indian mehandi with detailed motifs and traditional patterns. Featuring peacocks, paisleys, and intricate fillings.',
        includes: [
            'Traditional Indian motifs',
            'Paisley and peacock designs',
            'Fine detailing work',
            'Rajasthani & Marwari styles',
            'Cultural authenticity',
            'Bridal package available'
        ],
        images: [
            'https://www.citimuzik.com/wp-content/uploads/2023/02/161bfab8c09afd08f22951a2c8b6998c.jpg',
            'https://cdn0.weddingwire.in/article/7857/3_2/960/jpg/57587-mehndi-designs-rajasthani-mehandi-art-lead.jpeg',
            'https://i.pinimg.com/originals/93/eb/d5/93ebd529ab8b8cf3e1dfd70d72d53c23.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2019/07/Indian-Mehendi-Designs-15.jpg',
            'https://cdn0.weddingwire.in/article/3485/3_2/960/jpg/65843-bridal-mehndi-mehandi-design-by-lata-lead.jpeg',
            'https://i.pinimg.com/originals/5e/90/6a/5e906a4f0e4b82f5f3e5b0f6c7f8b9c0.jpg'
        ]
    },
    contemporary: {
        title: '🎨 Contemporary Art',
        serviceId: 'contemporary',
        price: '₹600 - ₹2,000',
        duration: '1-2 hours',
        coverage: 'Hands or custom',
        description: 'Modern fusion designs that blend tradition with contemporary aesthetics. Perfect for those seeking unique and trendy patterns.',
        includes: [
            'Modern minimalist designs',
            'Geometric patterns',
            'Mandala art fusion',
            'Western-Indian blend',
            'Customizable designs',
            'Social media worthy looks'
        ],
        images: [
            'https://reviewit.pk/wp-content/uploads/2019/07/Simple-Mehndi-Designs-14.jpg',
            'https://i.pinimg.com/originals/3a/34/cf/3a34cf0c8e8ff1e6e3e5d4e5e6e7e8e9.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2021/08/Modern-Mehendi-Designs-7.jpg',
            'https://i.pinimg.com/originals/a1/b2/c3/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6.jpg',
            'https://cdn0.weddingwire.in/article/9876/3_2/960/jpg/contemporary-mehndi-design-lead.jpeg',
            'https://stylesatlife.com/wp-content/uploads/2022/03/Modern-Mehndi-Designs.jpg'
        ]
    },
    kids: {
        title: '👶 Kids Mehandi',
        serviceId: 'kids',
        price: '₹200 - ₹800',
        duration: '15-45 mins',
        coverage: 'Small designs',
        description: 'Fun and simple designs perfect for children\'s celebrations and parties. Safe, quick, and adorable patterns.',
        includes: [
            'Child-safe henna',
            'Cute cartoon characters',
            'Simple floral patterns',
            'Quick application',
            'No chemical additives',
            'Fun and colorful options'
        ],
        images: [
            'https://stylesatlife.com/wp-content/uploads/2022/07/Kids-Mehndi-Designs.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2019/07/Kids-Mehendi-Designs-5.jpg',
            'https://i.pinimg.com/originals/de/ad/be/deadbeef12345678901234567890abcd.jpg',
            'https://cdn0.weddingwire.in/article/5432/3_2/960/jpg/kids-mehndi-design-simple-lead.jpeg',
            'https://i.pinimg.com/736x/aa/bb/cc/aabbccddee1122334455667788990011.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2020/06/Simple-Kids-Mehndi.jpg'
        ]
    }
};

// Gallery Collections Data
const galleryCollections = {
    'bridal-gallery': {
        title: '💒 Bridal Mehandi Gallery',
        images: [
            'https://lh6.googleusercontent.com/LBhO2mGUOqGUy_eIssKnZp2PPA2iZAZtnfnaxmcTV6MGW-rDMwMArrBLpQ760XL4Eh9vA4j0nyh8SO-Q02n1tTSdjUqr8XSDeQdJK0AyF1_qoEDMKALTNXgeQAPdlrdUMk0HpwzjdisQ9NsdNB8ZqotmiozckI1HwdirLiu_FJEmQGqx9ojQMuPpNXV7TQ',
            'https://cdn.shopify.com/s/files/1/0561/7926/1589/files/Traditional_Peacock_Design_480x480.png?v=1706354417',
            'https://ramkumarmehandi.com/wp-content/uploads/2024/07/designer-bridal-mehndi-designs.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMxf5VuEEClL2TxpBPQ761sKhlciphiGs8g&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2cvbCcxYTuPZgs4vsDVUcbtKOxyvV0pOXcw&s',
            'https://tse2.mm.bing.net/th/id/OIP.J1xHJPPKfbPi3GEiBelGwAHaJQ?pid=Api&P=0&h=180',
            'https://cdn0.weddingwire.in/articles/images/1/2/6/0/img_80621/arabic-mehndi-design-pinterest-architecture-mehndi.jpg',
            'https://i.pinimg.com/736x/e1/c9/14/e1c914b62c3722eb5e83535f11e51803.jpg'
        ]
    },
    'arabic-gallery': {
        title: '✨ Arabic Patterns Gallery',
        images: [
            'https://media.weddingz.in/images/1e357f603869fd86de46947a6b6f8691/qxhUWHQnJrb3zFamemfcAFLFfsnmBluQ500H3UT2r_dhtq5EuttBis5nXsf_wffZAjvjF7DI2ZfecSYIcyef1fcY77cFSC-6WQzNGpUYsVHt-wfkwR6s6NRyura87paww1UeaAKU.jpg',
            'https://tse4.mm.bing.net/th/id/OIP.16TqKlbe9VFUuxbMjyu45QHaLd?pid=Api&P=0&h=180',
            'https://i.pinimg.com/originals/1b/6f/dd/1b6fdd0be1953d8fb4500a58ba837317.jpg',
            'https://i.pinimg.com/736x/17/6e/58/176e583cf9ac42d991e5e70398b02d10.jpg',
            'https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2024/01/42041011c06b75dcdc0c2c29ee7ce834.jpg',
            'https://mymandap.in/wp-content/uploads/2023/01/Henna-Design.jpg',
            'https://i.pinimg.com/originals/9a/f1/85/9af185ca5cc86a27d01905776d88f413.jpg'
        ]
    },
    'traditional-gallery': {
        title: '🌸 Traditional Art Gallery',
        images: [
            'https://www.citimuzik.com/wp-content/uploads/2023/02/161bfab8c09afd08f22951a2c8b6998c.jpg',
            'https://i.pinimg.com/originals/6c/94/ac/6c94ac6e1086d922d0bbd876cede8cc6.jpg',
            'https://simplecraftidea.com/wp-content/uploads/2023/10/Traditional-peacock-mehndi-designs-1.jpg',
            'https://i.pinimg.com/736x/6d/a3/63/6da36337adfbc634c42fe1f35f4bef2f.jpg',
            'https://cdn0.weddingwire.in/img_g/articulos-india/2019/non-troncales/dukhan-mehndi-design/henna-by-divya-parisian-roses.jpg',
            'https://i.pinimg.com/originals/5e/90/6a/5e906a4f0e4b82f5f3e5b0f6c7f8b9c0.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2019/06/Traditional-Indian-Mehndi.jpg',
            'https://i.pinimg.com/originals/7f/8a/9b/7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c.jpg',
            'https://stylesatlife.com/wp-content/uploads/2021/05/Traditional-Rajasthani-Mehndi.jpg'
        ]
    },
    'contemporary-gallery': {
        title: '🎨 Contemporary Style Gallery',
        images: [
            'https://reviewit.pk/wp-content/uploads/2019/07/Simple-Mehndi-Designs-14.jpg',
            'https://www.postoast.com/wp-content/uploads/2023/08/modern-back-hand-mehndi-designs-e1690972185828.jpg',
            'https://i.pinimg.com/originals/94/43/14/9443148985bad5c03aaec22a8673d453.jpg',
            'https://www.fabmood.com/wp-content/uploads/2024/10/elegant-hanna-19.jpg',
            'https://images.herzindagi.info/image/2023/Dec/Floral-Mandala-Mehndi-Design.jpg',
            'https://www.fabmood.com/wp-content/uploads/2024/10/elegant-hanna-14.jpg',
            'https://cdn-ildngla.nitrocdn.com/dByehggJEcjLmEmtphxpOSWgAPhkvhxC/assets/images/optimized/mehndidesignz.com/wp-content/uploads/2025/06/aesthetic-mehndi-design-10-1024x1024.jpg',
            'https://www.wedlockindia.com/wp-content/uploads/2022/12/full-hand-henna-designs-830x1024.jpg',
            'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/01/30200147/Screenshot-2023-01-30-at-8.01.31-PM.png?tr=w-1000'
        ]
    },
    'festival-gallery': {
        title: '🎉 Festival Special Gallery',
        images: [
            'https://i.pinimg.com/736x/12/5a/8f/125a8f25e06ef7b3014a2a68166755b0.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2021/08/Simple-Mehendi-Designs-1.jpg',
            'https://i.pinimg.com/originals/cd/6e/28/cd6e286fd4f4ab5b70fc8fb8a3d5d5b7.jpg',
            'https://i.pinimg.com/originals/2e/7b/29/2e7b29ea5aa21aa6a8b93d1ccda3fa87.jpg',
            'https://cdn0.weddingwire.in/article/4562/3_2/960/jpg/102654-mehndi-design-new-mehendi-design-by-harin-dalal-lead.jpeg',
            'https://i.pinimg.com/originals/db/81/92/db81920df8c16c5f90e98d6b32e59de7.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2020/10/Festival-Mehndi-Design.jpg',
            'https://stylesatlife.com/wp-content/uploads/2021/08/Diwali-Special-Mehndi.jpg',
            'https://i.pinimg.com/originals/6e/7f/8a/6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b.jpg'
        ]
    },
    'kids-gallery': {
        title: '👶 Kids Friendly Gallery',
        images: [
            'https://stylesatlife.com/wp-content/uploads/2022/07/Kids-Mehndi-Designs.jpg',
            'https://tse1.mm.bing.net/th/id/OIP.DdavRubBx2kpVePBag0aHAHaHa?pid=Api&P=0&h=180',
            'https://cdn.shopify.com/s/files/1/0276/8666/6376/files/20._Mehndi_Design_For_Kids_2048x2048.jpg?v=1599119127',
            'https://i.pinimg.com/originals/b3/75/57/b37557496d47e54e4a245dd78c210548.jpg',
            'http://k4fashion.com/wp-content/uploads/2019/07/Mandala-Mehndi-Design-for-Hand.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2020/06/Simple-Kids-Mehndi.jpg',
            'https://stylesatlife.com/wp-content/uploads/2021/07/Easy-Kids-Mehndi-Designs.jpg',
            'https://i.pinimg.com/originals/2c/3d/4e/2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f.jpg',
            'https://www.mehndidesignideas.com/wp-content/uploads/2021/04/Cute-Kids-Mehndi.jpg'
        ]
    }
};

// Service Gallery Modal Functions
function openServiceGallery(serviceType) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const container = document.getElementById('serviceModalContainer');
    
    const service = serviceGalleries[serviceType];
    if (!service) return;
    
    title.textContent = service.title;
    
    // Build the detailed service information
    const detailsHTML = `
        <div class="service-details">
            <div class="service-info-grid">
                <div class="service-info-item">
                    <h4>💰 Price Range</h4>
                    <p>${service.price}</p>
                </div>
                <div class="service-info-item">
                    <h4>⏱️ Duration</h4>
                    <p>${service.duration}</p>
                </div>
                <div class="service-info-item">
                    <h4>📍 Coverage</h4>
                    <p>${service.coverage}</p>
                </div>
            </div>
            <div class="service-description">
                <h4>About This Service</h4>
                <p style="margin-bottom: 1rem;">${service.description}</p>
                <h4 style="margin-top: 1.5rem;">What's Included:</h4>
                <ul>
                    ${service.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button class="book-service-btn" onclick="bookService('${service.serviceId}')">
                    📅 Book This Service Now
                </button>
            </div>
        </div>
        <h3 class="service-modal-section-title">Design Gallery</h3>
    `;
    
    // Clear the container and add details
    container.innerHTML = detailsHTML;
    
    // Create and append the grid
    const newGrid = document.createElement('div');
    newGrid.className = 'service-modal-grid';
    newGrid.id = 'serviceModalGrid';
    
    service.images.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = service.title;
        img.className = 'service-modal-img';
        img.onerror = function() {
            this.style.display = 'none';
        };
        newGrid.appendChild(img);
    });
    
    container.appendChild(newGrid);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openGalleryCollection(collectionType) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const container = document.getElementById('serviceModalContainer');
    
    const collection = galleryCollections[collectionType];
    if (!collection) return;
    
    title.textContent = collection.title;
    
    // Clear the container
    container.innerHTML = '';
    
    // Create and append the grid
    const newGrid = document.createElement('div');
    newGrid.className = 'service-modal-grid';
    newGrid.id = 'serviceModalGrid';
    
    collection.images.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = collection.title;
        img.className = 'service-modal-img';
        img.onerror = function() {
            this.style.display = 'none';
        };
        newGrid.appendChild(img);
    });
    
    container.appendChild(newGrid);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceGallery() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openBookingFromService(serviceId) 
 {
    // Close the modal
    closeServiceGallery();
    
    // Pre-select the service in the booking form
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceId;
    }
    
    // Scroll to booking form
    setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Focus on the name field after scrolling
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) {
                nameField.focus();
            }
        }, 800);
    }, 300);
}

// Close modal when clicking outside
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeServiceGallery();
    }
});

// 📝 REGISTER USER
function registerUser(e) {
    e.preventDefault();

    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Get existing users or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Add new user
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
}

// 🔓 LOGIN USER
function loginUser(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", email); // optional: store logged-in user
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
}

// 🔐 ADMIN LOGIN
function adminLogin(e) {
    e.preventDefault();

    const adminEmail = document.getElementById("adminEmail").value.trim();
    const adminPassword = document.getElementById("adminPassword").value.trim();

    // Admin fixed credentials
    if (adminEmail === "admin@henna.com" && adminPassword === "admin123") {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin-bookings.html";
    } else {
        alert("Invalid Admin Credentials");
    }
}


// 🚪 LOGOUT
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}



// ================= FINAL BOOKING SUBMIT (EMAIL ONLY) =================
document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const payment = document.getElementById("paymentMode").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !service || !date || !payment) {
        alert("❗ Please fill all required fields");
        return;
    }

    const booking = {
        name,
        email,
        phone,
        service,
        date,
        payment,
        message,
        bookedAt: new Date().toLocaleString()
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // 📧 SEND EMAIL TO ADMIN
    const adminEmail = "adeshrutika57@gmail.com";

    const subject = "New Mehndi Booking Received";
    const body = `
New Mehndi Booking Details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${date}
Payment: ${payment}
Message: ${message || "N/A"}

Booked At: ${booking.bookedAt}
    `;

    const mailtoLink =
        `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    alert("✅ Booking Successful! Email opened.");

    document.getElementById("bookingForm").reset();
    document.getElementById("formPaymentPreview").classList.remove("active");
});

// 👋 SHOW "Hi, Username" IN NAVBAR
// 👋 SHOW USER / ADMIN INFO IN NAVBAR
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");
    const email = localStorage.getItem("currentUser");

    const userAccount = document.getElementById("userAccount");
    const logoutBtn = document.getElementById("logoutBtn");
    const adminBookings = document.getElementById("adminBookings");

    if (!userAccount) return;

    // ADMIN
    if (isAdmin === "true") {
        userAccount.style.display = "block";
        userAccount.innerText = "Hi, Admin";
        if (adminBookings) adminBookings.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "block";
        return;
    }

    // USER
    if (isLoggedIn === "true" && email) {
        const username = email.split("@")[0];
        userAccount.style.display = "block";
        userAccount.innerText = `Hi, ${username}`;
        if (logoutBtn) logoutBtn.style.display = "block";
    }
});



// 👋 SHOW USER / ADMIN INFO IN NAVBAR
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");
    const email = localStorage.getItem("currentUser");

    const userAccount = document.getElementById("userAccount");
    const adminBookings = document.getElementById("adminBookings");
    const logoutBtn = document.getElementById("logoutBtn");

    // USER LOGGED IN
    if (isLoggedIn === "true" && email) {
        const username = email.split("@")[0];
        userAccount.style.display = "block";
        userAccount.innerText = `Hi, ${username}`;
        logoutBtn.style.display = "block";
    }

    // ADMIN LOGGED IN
    if (isAdmin === "true") {
        adminBookings.style.display = "block";
        userAccount.style.display = "block";
        userAccount.innerText = "Hi, Admin";
        logoutBtn.style.display = "block";
    }
});
