document.addEventListener('DOMContentLoaded', function() {

    const startPage = document.getElementById('start-page');
    const galleryPage = document.getElementById('gallery-page');
    const galleryButton = document.getElementById('gallery-button');
    const backButton = document.getElementById('back-button');
    const imageGrid = document.getElementById('image-grid');

    let loadedImages = []; // Array to store successfully loaded images
    const videoTrack = document.getElementById('video-track');
    const videoPrev = document.getElementById('video-prev');
    const videoNext = document.getElementById('video-next');
    let currentImageIndex = 0;

    // --- Page Navigation ---
    galleryButton.addEventListener('click', () => {
        startPage.classList.remove('active');
        galleryPage.classList.add('active');
        showImages();
        clearSparkles('start');
        spawnSparkles('gallery');
    });

    backButton.addEventListener('click', () => {
        galleryPage.classList.remove('active');
        startPage.classList.add('active');
        clearSparkles('gallery');
        spawnSparkles('start');
    });

    // ฟังก์ชันที่จะลองโหลดรูปภาพ
    async function loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(path);
            img.onerror = () => reject();
            img.src = path;
        });
    }

    // สร้าง Grid รูปภาพ
    async function createImageGrid() {
        console.log('เริ่มโหลดรูปภาพ...');
        
        // เคลียร์ content เก่าก่อน
        imageGrid.innerHTML = '';
        
        const imageFiles = [
            // รูปภาพของน้องฝ้าย
            "IMG_0131.jpg",
            "IMG_0263.jpg"
        ];

        console.log('รายการไฟล์ที่จะโหลด:', imageFiles);

        if (imageFiles.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                padding: 40px;
                text-align: center;
                color: #666;
                font-size: 16px;
            `;
            placeholder.innerHTML = `
                <p>ยังไม่มีรูปภาพในโฟลเดอร์ 'pic'</p>
                <p>ลองเพิ่มไฟล์รูปภาพแล้วแก้ไขไฟล์ script.js ดูสิ!</p>
            `;
            imageGrid.appendChild(placeholder);
            return;
        }

        for (let i = 0; i < imageFiles.length; i++) {
            const fileName = imageFiles[i];
            const imagePath = `pic/${fileName}`;
            console.log('กำลังพยายามโหลด:', imagePath);
            
            try {
                await loadImage(imagePath); // เช็คว่าไฟล์รูปมีจริงหรือไม่
                console.log('โหลดสำเร็จ:', imagePath);
                loadedImages.push(imagePath); // เก็บไว้ใน array
                
                const gridItem = document.createElement('div');
                // ใช้ inline style แทน class เพื่อให้แน่ใจว่าจะแสดงผล
                gridItem.style.cssText = `
                    width: 250px;
                    height: 250px;
                    background-color: white;
                    border: 3px solid #FF69B4;
                    border-radius: 15px;
                    overflow: hidden;
                    cursor: pointer;
                    margin: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                    display: inline-block;
                `;
                
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Faii's Photo ${i + 1}`;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                `;

                console.log('สร้าง grid item และ img element สำเร็จ');
                
                gridItem.appendChild(img);
                imageGrid.appendChild(gridItem);
                
                console.log('เพิ่ม grid item เข้า DOM แล้ว');

                // Add hover effect
                gridItem.addEventListener('mouseenter', () => {
                    gridItem.style.transform = 'scale(1.05)';
                });
                gridItem.addEventListener('mouseleave', () => {
                    gridItem.style.transform = 'scale(1)';
                });

                // Add click event to open modal with slideshow
                gridItem.addEventListener('click', () => openSlideshow(loadedImages.indexOf(imagePath)));

            } catch (error) {
                // ถ้าโหลดไม่สำเร็จ สร้าง placeholder
                console.warn(`ไม่สามารถโหลดรูปภาพได้: ${imagePath}`, error);
                
                const gridItem = document.createElement('div');
                gridItem.style.cssText = `
                    width: 250px;
                    height: 250px;
                    background-color: #f0f0f0;
                    border: 2px dashed #ccc;
                    border-radius: 15px;
                    margin: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #999;
                `;
                gridItem.innerHTML = `
                    <p style="margin: 0; font-size: 12px;">ไม่สามารถโหลด</p>
                    <p style="margin: 0; font-size: 10px;">${fileName}</p>
                `;
                imageGrid.appendChild(gridItem);
            }
        }
        
        console.log('โหลดรูปภาพเสร็จแล้ว จำนวน:', loadedImages.length, 'รูป');
        console.log('imageGrid children count:', imageGrid.children.length);
    }

    function showImages() {
        imageGrid.innerHTML = '';
        const imageFiles = [
            "IMG_0124.jpg",
            "IMG_0125.jpg",
            "IMG_0127.jpg",
            "IMG_0128.jpg",
            "IMG_0131.jpg",
            "IMG_0263.jpg",
            "IMG_0264.jpg",
            "IMG_0269.jpg",
            "IMG_0338.jpg",
            "IMG_0536.JPG",
            "IMG_0553.jpg",
            "IMG_1033.jpg",
            "IMG_1460.jpg",
            "IMG_1775.jpg",
            "IMG_1870.jpg",
            "IMG_1873.jpg",
            "IMG_1875.jpg",
            "IMG_1877.jpg",
            "IMG_1881.jpg",
            "IMG_1885.jpg",
            "IMG_1891.jpg",
            "IMG_1896.jpg",
            "IMG_1959.jpg",
            "IMG_1960.jpg",
            "IMG_1961.jpg",
            "IMG_1962.jpg",
            "IMG_1965.jpg",
            "IMG_1996.jpg",
            "IMG_2085.jpg",
            "IMG_2203.jpg",
            "IMG_2231.jpg",
            "IMG_9070.jpg",
            "IMG_9716.PNG"
        ];
        loadedImages = imageFiles.map(f => `pic/${f}`);
        loadedImages.forEach((src, i) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Faii's Photo ${i + 1}`;
            gridItem.appendChild(img);
            imageGrid.appendChild(gridItem);
            gridItem.addEventListener('mouseenter', () => gridItem.style.transform = 'translateY(-6px)');
            gridItem.addEventListener('mouseleave', () => gridItem.style.transform = 'translateY(0)');
            gridItem.addEventListener('click', () => openSlideshow(i));
        });
    }

    // --- Slideshow Modal Functionality ---
    function openSlideshow(index) {
        currentImageIndex = index;
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'slideshow-modal';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-button';
        closeBtn.innerHTML = '&times;';
        
        const modalImg = document.createElement('img');
        modalImg.className = 'modal-content';
        modalImg.id = 'modal-image';
        modalImg.src = loadedImages[currentImageIndex];

        // Navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-button prev-button';
        prevBtn.innerHTML = '&#8249;';
        prevBtn.onclick = () => changeImage(-1);
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-button next-button';
        nextBtn.innerHTML = '&#8250;';
        nextBtn.onclick = () => changeImage(1);

        // Image counter
        const counter = document.createElement('div');
        counter.className = 'image-counter';
        counter.id = 'image-counter';
        counter.textContent = `${currentImageIndex + 1} / ${loadedImages.length}`;

        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        modal.appendChild(prevBtn);
        modal.appendChild(nextBtn);
        modal.appendChild(counter);
        document.body.appendChild(modal);

        // Show modal
        setTimeout(() => modal.classList.add('show'), 10);

        // Close modal events
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => document.body.removeChild(modal), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        };
        document.addEventListener('keydown', handleKeyPress);
        modal.addEventListener('remove', () => {
            document.removeEventListener('keydown', handleKeyPress);
        });
    }

    // เปลี่ยนรูปในสไลด์โชว์
    function changeImage(direction) {
        const modalImg = document.getElementById('modal-image');
        const counter = document.getElementById('image-counter');
        
        if (!modalImg || !counter) return;

        // Fade out
        modalImg.style.opacity = '0';
        
        setTimeout(() => {
            // Update index
            currentImageIndex += direction;
            if (currentImageIndex >= loadedImages.length) {
                currentImageIndex = 0;
            } else if (currentImageIndex < 0) {
                currentImageIndex = loadedImages.length - 1;
            }
            
            // Update image and counter
            modalImg.src = loadedImages[currentImageIndex];
            counter.textContent = `${currentImageIndex + 1} / ${loadedImages.length}`;
            
            // Fade in
            modalImg.style.opacity = '1';
        }, 150);
    }

    // --- Initialize ---
    createImageGrid();

    // --- Videos ---
    const videoFiles = [
        'IMG_1565.MOV','IMG_1794.MOV','IMG_2212.MOV','IMG_2226.MOV'
    ];
    function populateVideos() {
        if (!videoTrack) return;
        videoTrack.innerHTML = '';
        videoFiles.forEach(name => {
            const card = document.createElement('div');
            card.className = 'video-card';
            const vid = document.createElement('video');
            vid.src = `vdo/${name}`;
            // Hide native controls; click to play/pause
            vid.controls = false;
            vid.preload = 'metadata';
            vid.addEventListener('click', () => {
                if (vid.paused) vid.play(); else vid.pause();
            });
            // add custom expand button
            const expand = document.createElement('button');
            expand.className = 'expand-btn';
            expand.innerHTML = '&#x26F6;'; // square with diagonal arrow
            expand.title = 'ขยาย';
            expand.addEventListener('click', (e) => {
                e.stopPropagation();
                openVideoModal(vid.src);
            });
            card.appendChild(vid);
            card.appendChild(expand);
            videoTrack.appendChild(card);
        });
    }
    populateVideos();

    // Carousel controls
    function scrollByCard(dir) {
        if (!videoTrack) return;
        const card = videoTrack.querySelector('.video-card');
        const delta = card ? card.getBoundingClientRect().width + 18 : 300;
        videoTrack.scrollBy({ left: dir * delta, behavior: 'smooth' });
    }
    if (videoPrev) videoPrev.addEventListener('click', () => scrollByCard(-1));
    if (videoNext) videoNext.addEventListener('click', () => scrollByCard(1));

    // Swipe support
    let startX = 0;
    if (videoTrack) {
        videoTrack.addEventListener('pointerdown', e => { startX = e.clientX; });
        videoTrack.addEventListener('pointerup', e => {
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 40) scrollByCard(dx > 0 ? -1 : 1);
        });
    }

    // Modal for video (not full full-screen)
    function openVideoModal(src) {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        const v = document.createElement('video');
        v.src = src;
        v.controls = true; // show controls only in modal
        v.autoplay = true;
        const close = document.createElement('span');
        close.className = 'close-button';
        close.innerHTML = '&times;';
        close.addEventListener('click', () => document.body.removeChild(modal));
        modal.addEventListener('click', (e) => { if (e.target === modal) document.body.removeChild(modal); });
        wrapper.appendChild(v);
        modal.appendChild(close);
        modal.appendChild(wrapper);
        document.body.appendChild(modal);
    }

    // --- Background music ---
    const bg = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const volBtn = document.getElementById('music-vol-btn');
    const volPanel = document.getElementById('music-panel');
    const volRange = document.getElementById('music-volume');
    let musicEnabled = localStorage.getItem('musicEnabled');
    if (musicEnabled === null) musicEnabled = 'on';

    function updateToggleUI() {
        if (!toggle) return;
        toggle.textContent = (bg && !bg.paused) ? '♪' : '✦';
        toggle.style.background = (bg && !bg.paused) ? '#D81B60' : '#fff';
        toggle.style.color = (bg && !bg.paused) ? '#fff' : '#D81B60';
    }

    function tryPlayMusic() {
        if (!bg) return;
        const savedVol = Math.max(0, Math.min(1, parseFloat(localStorage.getItem('musicVolume') || '0.6')));
        if (volRange) volRange.value = Math.round(savedVol * 100);
        if (musicEnabled === 'on') {
            bg.volume = savedVol;
            bg.play().catch(() => {
                // Autoplay blocked: fallback to muted autoplay
                bg.muted = true;
                bg.volume = 0;
                bg.play().catch(()=>{});
            });
        }
        updateToggleUI();
    }

    // Try immediate autoplay
    tryPlayMusic();

    // On first user gesture: ensure playing and fade-in volume if muted fallback was used
    const kick = () => {
        if (!bg) return;
        const targetVol = Math.max(0, Math.min(1, parseFloat(localStorage.getItem('musicVolume') || '0.6')));
        if (bg.paused && musicEnabled === 'on') {
            bg.play().catch(()=>{});
        }
        if (bg.muted || bg.volume === 0) {
            bg.muted = false;
            // fade in to target volume
            let v = 0;
            const step = Math.max(0.02, targetVol/20);
            const i = setInterval(() => {
                v += step;
                bg.volume = Math.min(targetVol, v);
                if (bg.volume >= targetVol) clearInterval(i);
            }, 60);
        }
        window.removeEventListener('pointerdown', kick);
        updateToggleUI();
    };
    window.addEventListener('pointerdown', kick, { once: true });

    // --- Sparkles for gallery ---
    // Sparkles engine (support multiple hosts) -----------------------------
    const sparkHosts = {
        start: document.getElementById('start-sparkles'),
        gallery: document.getElementById('gallery-sparkles'),
    };
    const sparkTimers = {};

    function spawnSparkles(hostKey) {
        const host = sparkHosts[hostKey];
        if (!host) return;
        clearSparkles(hostKey);
        for (let i = 0; i < 35; i++) addSparkle(hostKey, true);
        sparkTimers[hostKey] = setInterval(() => addSparkle(hostKey, false), 700);
    }
    function clearSparkles(hostKey) {
        const host = sparkHosts[hostKey];
        if (host) host.innerHTML = '';
        if (sparkTimers[hostKey]) clearInterval(sparkTimers[hostKey]);
    }
    function addSparkle(hostKey, initial=false) {
        const host = sparkHosts[hostKey];
        if (!host) return;
        const s = document.createElement('div');
        s.className = 'sparkle';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 4 + Math.random() * 6; // 4-10px
        const delay = Math.random() * 3.2; // 0-3.2s
        const duration = 2.6 + Math.random() * 2.2; // 2.6-4.8s
        s.style.left = x + '%';
        s.style.top = y + '%';
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.animationDuration = duration + 's';
        s.style.animationDelay = (initial ? Math.random()*duration : delay) + 's';
        host.appendChild(s);
        // auto-remove after one cycle to avoid DOM bloat
        const ttl = (s.style.animationDelay ? parseFloat(s.style.animationDelay) : 0) + duration + 0.5;
        setTimeout(() => s.remove(), ttl * 1000);
    }

    // Start looping sparkles on both pages
    spawnSparkles('start');
    // gallery will spawn when navigating to it

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!bg) return;
            if (bg.paused) { bg.play(); musicEnabled = 'on'; }
            else { bg.pause(); musicEnabled = 'off'; }
            localStorage.setItem('musicEnabled', musicEnabled);
            updateToggleUI();
        });
    }

    // Volume button + panel
    function hideVolPanelSoon() {
        if (!volPanel) return;
        clearTimeout(hideVolPanelSoon._t);
        hideVolPanelSoon._t = setTimeout(() => volPanel.style.display = 'none', 1200);
    }
    if (volBtn && volPanel) {
        volBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            volPanel.style.display = (volPanel.style.display === 'none' || !volPanel.style.display) ? 'block' : 'none';
        });
        document.addEventListener('click', (e) => {
            if (!volPanel.contains(e.target) && e.target !== volBtn) volPanel.style.display = 'none';
        });
    }
    if (volRange && bg) {
        volRange.addEventListener('input', () => {
            const v = Math.max(0, Math.min(100, parseInt(volRange.value || '60', 10)));
            const vol = v / 100;
            bg.volume = vol;
            localStorage.setItem('musicVolume', String(vol));
        });
        volRange.addEventListener('change', hideVolPanelSoon);
    }

});
