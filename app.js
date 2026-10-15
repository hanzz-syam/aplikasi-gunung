
// Theme Toggle Logic
function toggleDarkTheme(isDark) {
  const container = document.querySelector('.phone-container');
  if (!container) return;

  if (isDark) {
    container.classList.remove('light-theme');
    localStorage.setItem('terra_dark_theme', 'enabled');
  } else {
    container.classList.add('light-theme');
    localStorage.setItem('terra_dark_theme', 'disabled');
  }

  // Sync checkboxes across any profile switches
  const toggleEl = document.getElementById('dark-theme-toggle');
  if (toggleEl) {
    toggleEl.checked = isDark;
  }
}

// Dynamic SPA Router
function switchTab(tabId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(`page-${tabId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Reset scroll position of the viewport to top so content doesn't load scrolled down
  const viewport = document.querySelector('.app-viewport');
  if (viewport) {
    viewport.scrollTop = 0;
  }

  // Update bottom nav active state
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.remove('active');
    item.classList.remove('nav-just-activated');
  });
  
  const targetNavItem = document.querySelector(`.bottom-nav-item[data-tab="${tabId}"]`);
  if (targetNavItem) {
    targetNavItem.classList.add('active');
    // Trigger bounce animation
    void targetNavItem.offsetWidth; // force reflow
    targetNavItem.classList.add('nav-just-activated');
    setTimeout(() => targetNavItem.classList.remove('nav-just-activated'), 500);
  }

  // Close overlays when switching tabs
  closeTicketDetail();

  // Hook custom page initializers
  if (tabId === 'ticket') {
    renderUserTickets();
  } else if (tabId === 'tracking') {
    setTimeout(initTrackingMap, 100);
  }
}

// Custom Notification Toast
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.className = `alert-toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Generate a High-Fidelity Mock QR Code onto a Canvas
function generateQRCode(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width || 180;
  canvas.width = size;
  canvas.height = size;

  // Clear & background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  // QR Finder Patterns (3 large corner blocks)
  ctx.fillStyle = '#0F4C3A'; // Deep Green style
  
  const finderSize = Math.floor(size * 0.2); // 20% size
  const finderInner = Math.floor(finderSize * 0.6);
  const finderCore = Math.floor(finderInner * 0.6);
  
  function drawFinder(x, y) {
    ctx.fillStyle = '#0F4C3A';
    ctx.fillRect(x, y, finderSize, finderSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + (finderSize - finderInner)/2, y + (finderSize - finderInner)/2, finderInner, finderInner);
    ctx.fillStyle = '#0F4C3A';
    ctx.fillRect(x + (finderSize - finderCore)/2, y + (finderSize - finderCore)/2, finderCore, finderCore);
  }

  drawFinder(10, 10); // Top-left
  drawFinder(size - finderSize - 10, 10); // Top-right
  drawFinder(10, size - finderSize - 10); // Bottom-left

  // Small alignment pattern
  ctx.fillStyle = '#0F4C3A';
  ctx.fillRect(size - 25, size - 25, 10, 10);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(size - 22, size - 22, 4, 4);

  // Generate deterministic "randomness" based on text hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Draw randomized data modules
  const cellSize = 5;
  const gridCount = Math.floor(size / cellSize);
  
  for (let row = 0; row < gridCount; row++) {
    for (let col = 0; col < gridCount; col++) {
      // Skip finder pattern zones
      const isTopLeft = (row * cellSize < finderSize + 15 && col * cellSize < finderSize + 15);
      const isTopRight = (row * cellSize < finderSize + 15 && col * cellSize >= size - finderSize - 15);
      const isBottomLeft = (row * cellSize >= size - finderSize - 15 && col * cellSize < finderSize + 15);
      
      if (isTopLeft || isTopRight || isBottomLeft) {
        continue;
      }
      
      // Seed pseudo-random placement
      const val = Math.abs(Math.sin(hash + (row * 17) + (col * 29)));
      if (val > 0.45) {
        ctx.fillStyle = '#0F4C3A';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Leaflet satellite trail coords definitions
const mountainCoords = {
  merbabu: {
    "via selo": [
      [-7.4124, 110.4187], // Selo BC
      [-7.4215, 110.4243], // Pos 1
      [-7.4302, 110.4312], // Pos 2 (Water)
      [-7.4385, 110.4388], // Pos 3
      [-7.4431, 110.4419], // Pos 4 (Camp)
      [-7.4475, 110.4430], // Pos 5 (Camp)
      [-7.4522, 110.4436]  // Puncak
    ],
    "via suwanting": [
      [-7.4300, 110.3950], // Suwanting BC
      [-7.4350, 110.4050], // Pos 1 Lembah Lincing
      [-7.4410, 110.4150], // Pos 2 Lembah Cemoro
      [-7.4470, 110.4280], // Pos 3 Dampo Awang Camp
      [-7.4522, 110.4436]  // Puncak Kenteng Songo
    ]
  },
  semeru: {
    "via ranupani": [
      [-8.0195, 112.9192], // Ranupani
      [-8.0382, 112.9252], // Landengan Dowo
      [-8.0552, 112.9212], // Watu Rejeng
      [-8.0772, 112.9238], // Ranu Kumbolo (Water/Camp)
      [-8.0852, 112.9242], // Oro-oro Ombo
      [-8.0912, 112.9252], // Cemoro Kandang
      [-8.1065, 112.9248], // Kalimati (Camp)
      [-8.1070, 112.9235], // Arcopodo
      [-8.1075, 112.9224]  // Puncak Mahameru
    ],
    "via ayek-ayek": [
      [-8.0195, 112.9192], // Ranupani BC
      [-8.0300, 112.9100], // Ayek-ayek
      [-8.0500, 112.9080], // Pangonan Cilik
      [-8.0772, 112.9238], // Ranu Kumbolo
      [-8.1075, 112.9224]  // Puncak Mahameru
    ]
  },
  rinjani: {
    "via sembalun": [
      [-8.3582, 116.4852], // Sembalun BC
      [-8.3752, 116.4761], // Pos 1
      [-8.3882, 116.4691], // Pos 2 (Water)
      [-8.3952, 116.4651], // Pos 3
      [-8.4002, 116.4641], // Pos 4
      [-8.4042, 116.4632], // Plawangan Sembalun (Camp)
      [-8.4111, 116.4571]  // Puncak Rinjani
    ],
    "via senaru": [
      [-8.3011, 116.4058], // Senaru BC
      [-8.3210, 116.4020], // Pos 1
      [-8.3420, 116.3980], // Pos 2
      [-8.3680, 116.3950], // Pos 3
      [-8.3910, 116.4010], // Plawangan Senaru Camp
      [-8.4111, 116.4571]  // Puncak Rinjani
    ]
  },
  gede: {
    "via cibodas": [
      [-6.7412, 106.9961], // Cibodas BC
      [-6.7551, 106.9902], // Telaga Biru
      [-6.7622, 106.9882], // Pos Panyangcangan
      [-6.7692, 106.9852], // Air Panas (Water)
      [-6.7722, 106.9832], // Kandang Batu
      [-6.7792, 106.9802], // Kandang Badak (Camp)
      [-6.7901, 106.9842]  // Puncak Gede
    ]
  },
  merapi: {
    "via new selo": [
      [-7.5500, 110.4300], // New Selo BC
      [-7.5450, 110.4350], // Pos 1
      [-7.5420, 110.4380], // Pos 2
      [-7.5410, 110.4400], // Pasar Bubrah
      [-7.5407, 110.4428]  // Puncak Merapi
    ]
  },
  prau: {
    "via patakbanteng": [
      [-7.2100, 109.9250], // Patakbanteng BC
      [-7.2000, 109.9230], // Pos 1
      [-7.1900, 109.9220], // Pos 2
      [-7.1850, 109.9215], // Pos 3
      [-7.1818, 109.9219]  // Puncak Prau
    ],
    "via dieng": [
      [-7.2050, 109.9130], // Dieng BC
      [-7.1950, 109.9140], // Pos 1 Gemblengan
      [-7.1890, 109.9160], // Pos 2 Semendung
      [-7.1850, 109.9190], // Pos 3 Ngrancah
      [-7.1818, 109.9219]  // Puncak Prau
    ]
  }
};;

// Leaflet Maps variables
let detailMap = null;
let trackingMap = null;
let userMarker = null;

// Initialize Detail Page satellite map
function initDetailMap(mountain) {
  // Destroy old map container reference if exists
  if (detailMap) {
    detailMap.remove();
    detailMap = null;
  }

  const route = mountain.routes[0];
  if (!route || !route.map || !route.map.posts) return;

  const routeKey = route.name.toLowerCase().trim();
  const coordsList = (mountainCoords[mountain.id] ? mountainCoords[mountain.id][routeKey] : null) || mountainCoords[mountain.id] || [];
  if (coordsList.length === 0) return;

  // Center on midpoint
  const centerIdx = Math.floor(coordsList.length / 2);
  detailMap = L.map('detail-map', {
    zoomControl: false
  }).setView(coordsList[centerIdx], 13);

  // Add satellite tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri satellite imagery'
  }).addTo(detailMap);

  // Draw Polyline path
  const polyline = L.polyline(coordsList, {
    color: '#ECA823',
    weight: 4,
    opacity: 0.85,
    dashArray: '2, 6'
  }).addTo(detailMap);

  // Fit bounds nicely
  detailMap.fitBounds(polyline.getBounds(), { padding: [20, 20] });

  // Add custom markers with details popup
  const drawer = document.getElementById('map-detail-drawer');
  
  route.map.posts.forEach((post, index) => {
    const latlng = coordsList[index];
    if (!latlng) return;

    let iconHtml = '📍';
    if (post.type === 'start') iconHtml = '🏢';
    if (post.type === 'water') iconHtml = '💧';
    if (post.type === 'camp') iconHtml = '⛺';
    if (post.type === 'peak') iconHtml = '🏔️';

    const customIcon = L.divIcon({
      html: `<div style="font-size: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${iconHtml}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: 'leaflet-custom-marker'
    });

    const marker = L.marker(latlng, { icon: customIcon }).addTo(detailMap);
    
    marker.on('click', () => {
      if (drawer) {
        drawer.style.display = 'block';
        let detailIcon = '📍';
        if (post.type === 'water') detailIcon = '💧';
        if (post.type === 'camp') detailIcon = '⛺';
        if (post.type === 'peak') detailIcon = '🏔️';

        drawer.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 20px;">${detailIcon}</span>
            <h4 style="margin: 0; color: #0F4C3A;">${post.name}</h4>
          </div>
          <p style="font-size: 13px; color: #7A8B87; margin: 0 0 4px 0;">Tipe: ${post.type.toUpperCase()}</p>
          <p style="font-size: 13px; color: #1F2E2B; margin: 0;">Posisi GPS: ${latlng[0].toFixed(5)}, ${latlng[1].toFixed(5)}. Jalur terverifikasi aman untuk dilewati.</p>
        `;
      }
    });
  });
}

// Initialize GPS Tracking Map
function initTrackingMap() {
  const defaultLat = -7.4431;
  const defaultLng = 110.4419;

  // Retrieve cached location
  const cachedLat = localStorage.getItem('terra_last_lat');
  const cachedLng = localStorage.getItem('terra_last_lng');
  const cachedElev = localStorage.getItem('terra_last_elev') || 'Tidak tersedia';

  const startLat = cachedLat ? parseFloat(cachedLat) : defaultLat;
  const startLng = cachedLng ? parseFloat(cachedLng) : defaultLng;

  if (trackingMap) {
    trackingMap.remove();
    trackingMap = null;
  }

  trackingMap = L.map('tracking-map', {
    zoomControl: false
  }).setView([startLat, startLng], 14);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri satellite imagery'
  }).addTo(trackingMap);

  userMarker = L.marker([startLat, startLng]).addTo(trackingMap)
    .bindPopup("Posisi Anda").openPopup();

  // Populate info fields
  document.getElementById('gps-lat').innerText = startLat.toFixed(6);
  document.getElementById('gps-lng').innerText = startLng.toFixed(6);
  document.getElementById('gps-elev').innerText = cachedElev;

  // Begin Geolocation monitoring
  updateGPSPosition(false);
}

function updateGPSPosition(notify = true) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const elev = position.coords.altitude ? `${position.coords.altitude.toFixed(1)} m` : 'Tidak tersedia';

        // Save locally
        localStorage.setItem('terra_last_lat', lat);
        localStorage.setItem('terra_last_lng', lng);
        localStorage.setItem('terra_last_elev', elev);

        // Update view UI elements
        document.getElementById('gps-lat').innerText = lat.toFixed(6);
        document.getElementById('gps-lng').innerText = lng.toFixed(6);
        document.getElementById('gps-elev').innerText = elev;

        if (trackingMap && userMarker) {
          const newLatLng = new L.LatLng(lat, lng);
          userMarker.setLatLng(newLatLng);
          trackingMap.setView(newLatLng, 15);
        }

        if (notify) {
          showToast('GPS diperbarui!', 'success');
        }
      },
      error => {
        console.warn("GPS error:", error);
        if (notify) {
          showToast('Gagal memuat GPS. Menggunakan lokasi cache.', 'warning');
        }
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    showToast('GPS tidak didukung perangkat Anda.', 'error');
  }
}

function centerToMyLocation() {
  updateGPSPosition(true);
  const lat = localStorage.getItem('terra_last_lat');
  const lng = localStorage.getItem('terra_last_lng');
  if (lat && lng && trackingMap) {
    trackingMap.setView([parseFloat(lat), parseFloat(lng)], 16);
  }
}

let offlinePolyline = null;
let offlineMarkers = [];

function updateOfflineRoutes() {
  const mapSelect = document.getElementById('offline-map-select');
  const routeSelect = document.getElementById('offline-route-select');
  if (!mapSelect || !routeSelect) return;
  
  const mtId = mapSelect.value;
  routeSelect.innerHTML = '<option value="">-- Pilih Jalur Pendakian --</option>';
  
  if (!mtId) {
    routeSelect.style.display = 'none';
    loadOfflineMountainMap();
    return;
  }
  
  // Defensively convert mountainsData to Array if object
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  
  const mt = rawMountains.find(m => m.id === mtId);
  if (mt && mt.routes) {
    mt.routes.forEach(route => {
      const opt = document.createElement('option');
      opt.value = route.name;
      opt.innerText = route.name;
      routeSelect.appendChild(opt);
    });
    routeSelect.style.display = 'block';
  } else {
    routeSelect.style.display = 'none';
  }
  
  loadOfflineMountainMap();
}

function loadOfflineMountainMap() {
  const mapSelect = document.getElementById('offline-map-select');
  const routeSelect = document.getElementById('offline-route-select');
  if (!mapSelect || !routeSelect || !trackingMap) return;
  
  const mtId = mapSelect.value;
  const routeName = routeSelect.value;
  
  // Clear existing offline path and markers
  if (offlinePolyline) {
    trackingMap.removeLayer(offlinePolyline);
    offlinePolyline = null;
  }
  offlineMarkers.forEach(marker => trackingMap.removeLayer(marker));
  offlineMarkers = [];
  
  if (!mtId || !routeName) return;
  
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  const mt = rawMountains.find(m => m.id === mtId);
  if (!mt) return;
  
  const route = mt.routes.find(r => r.name === routeName);
  if (!route) return;
  
  const routeKey = routeName.toLowerCase().trim();
  const coordsList = (mountainCoords[mtId] ? mountainCoords[mtId][routeKey] : null) || [];
  
  if (coordsList.length === 0) {
    showToast('Dataset offline belum tersedia untuk jalur ini.', 'warning');
    return;
  }
  
  // Draw path
  offlinePolyline = L.polyline(coordsList, {
    color: '#0F4C3A',
    weight: 4,
    opacity: 0.8,
    dashArray: '5, 10'
  }).addTo(trackingMap);
  
  // Fit map view bounds
  trackingMap.fitBounds(offlinePolyline.getBounds(), { padding: [40, 40] });
  
  // Add markers
  coordsList.forEach((latlng, idx) => {
    let label = `Pos ${idx}`;
    let iconHtml = '📍';
    if (idx === 0) { label = 'Basecamp'; iconHtml = '🏢'; }
    else if (idx === coordsList.length - 1) { label = 'Puncak'; iconHtml = '🏔️'; }
    else if (route.map && route.map.posts && route.map.posts[idx]) {
      const post = route.map.posts[idx];
      label = post.name;
      if (post.type === 'water') iconHtml = '💧';
      if (post.type === 'camp') iconHtml = '⛺';
    }
    
    const customIcon = L.divIcon({
      html: `<div style="font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${iconHtml}</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: 'leaflet-custom-marker'
    });
    
    const marker = L.marker(latlng, { icon: customIcon })
      .bindPopup(`<strong>${label}</strong><br>GPS: ${latlng[0].toFixed(5)}, ${latlng[1].toFixed(5)}`)
      .addTo(trackingMap);
      
    offlineMarkers.push(marker);
  });
  
  // Update active tracking progress flow texts dynamically on offline select
  const flowCurrent = document.getElementById('tracking-flow-current');
  const flowNext = document.getElementById('tracking-flow-next');
  if (flowCurrent && flowNext && route.map && route.map.posts) {
    flowCurrent.innerText = route.map.posts[0] ? route.map.posts[0].name : 'Basecamp';
    flowNext.innerText = route.map.posts[1] ? route.map.posts[1].name : 'Pos 1';
  }
  
  showToast(`Peta offline ${mt.name} (${routeName}) berhasil dimuat!`, 'success');
}

// Add member dynamically to registration booking list
let memberCount = 1;
function addMemberField() {
  memberCount++;
  const container = document.getElementById('booking-members');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'member-row';
  div.id = `member-row-${memberCount}`;
  div.innerHTML = `
    <span class="remove-member" onclick="removeMemberField(${memberCount})">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    </span>
    <div style="margin-bottom: 12px;">
      <label style="display:block; font-size:11px; font-weight:600; color:#7A8B87; margin-bottom:4px;">NAMA PENDAKI #${memberCount}</label>
      <input type="text" name="climber_names[]" required placeholder="Nama lengkap sesuai KTP" style="width:100%; padding:10px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); color: var(--text-dark);">
    </div>
    <div>
      <label style="display:block; font-size:11px; font-weight:600; color:#7A8B87; margin-bottom:4px;">NOMOR KTP PENDAKI #${memberCount}</label>
      <input type="text" name="climber_ktps[]" required placeholder="Nomor KTP (16 digit)" style="width:100%; padding:10px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); color: var(--text-dark);">
    </div>
  `;
  container.appendChild(div);
}

function removeMemberField(id) {
  const row = document.getElementById(`member-row-${id}`);
  if (row) {
    row.remove();
  }
}

// Open booking wizard for specific mountain
function openBookingForm(mountainId) {
  const select = document.getElementById('booking-mountain-select');
  if (select) {
    select.value = mountainId;
    updateBookingBasecamps();
  }

  // Set Dynamic page title
  const mt = mountainsData.find(m => m.id === mountainId);
  const titleEl = document.getElementById('booking-form-title');
  if (titleEl && mt) {
    titleEl.innerHTML = `<div style="font-size:22px; font-weight:800; line-height:1.2; color:var(--primary);">${mt.name}</div><div style="font-size:13px; font-weight:500; color:var(--text-muted); margin-top:2px;">(Form Registrasi Pendakian)</div>`;
  }

  // Reset booking wizard to step 1
  if (typeof showBookingStep === 'function') {
    showBookingStep(1);
  }

  switchTab('explore');
  document.getElementById('explore-detail-view').style.display = 'none';
  document.getElementById('explore-booking-view').style.display = 'block';
}

function calculateClimbDuration() {
  const startInput = document.getElementById('booking-date-start');
  const endInput = document.getElementById('booking-date-end');
  const container = document.getElementById('duration-display-container');
  const durationText = document.getElementById('climb-duration-text');
  const errorText = document.getElementById('duration-error-text');
  
  if (!startInput || !endInput || !container || !durationText || !errorText) return;
  
  const startVal = startInput.value;
  const endVal = endInput.value;
  
  if (!startVal || !endVal) {
    container.style.display = 'none';
    return;
  }
  
  const start = new Date(startVal);
  const end = new Date(endVal);
  
  container.style.display = 'block';
  
  if (end < start) {
    errorText.style.display = 'block';
    durationText.innerText = '-';
    container.style.background = '#FCE8E6';
    container.style.borderColor = '#F5C2C2';
    return;
  }
  
  errorText.style.display = 'none';
  container.style.background = '#EBF7F4';
  container.style.borderColor = '#C6E7DE';
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  if (diffDays === 1) {
    durationText.innerText = 'Tektok/1 hari';
  } else {
    const nights = diffDays - 1;
    durationText.innerText = `${diffDays} Hari ${nights} Malam`;
  }
}

function closeBookingForm() {
  document.getElementById('explore-booking-view').style.display = 'none';
  document.getElementById('explore-main-view').style.display = 'block';
  // Reset fields
  document.getElementById('booking-date-start').value = '';
  document.getElementById('booking-date-end').value = '';
  const waInput = document.getElementById('booking-whatsapp-input');
  if (waInput) waInput.value = '';
  document.getElementById('duration-display-container').style.display = 'none';
}

let currentBookingStep = 1;

function showBookingStep(step) {
  currentBookingStep = step;
  
  // Hide all step panels
  document.getElementById('booking-step-panel-1').style.display = 'none';
  document.getElementById('booking-step-panel-2').style.display = 'none';
  document.getElementById('booking-step-panel-3').style.display = 'none';
  
  // Show active step panel
  document.getElementById(`booking-step-panel-${step}`).style.display = 'block';
  
  // Update step indicators
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`step-dot-${i}`);
    if (!dot) continue;
    
    const circle = dot.querySelector('.step-dot');
    const label = dot.querySelector('.step-label');
    
    if (i < step) {
      // Completed steps
      circle.style.background = 'var(--primary)';
      circle.style.borderColor = 'var(--primary)';
      circle.style.color = 'white';
      circle.innerHTML = '✓';
      label.style.color = 'var(--text-dark)';
      label.style.fontWeight = '700';
    } else if (i === step) {
      // Current active step
      circle.style.background = 'var(--primary)';
      circle.style.borderColor = 'var(--primary)';
      circle.style.color = 'white';
      circle.innerHTML = i;
      label.style.color = 'var(--text-dark)';
      label.style.fontWeight = '700';
    } else {
      // Future steps
      circle.style.background = 'var(--card-bg)';
      circle.style.borderColor = 'var(--border-color)';
      circle.style.color = 'var(--text-muted)';
      circle.innerHTML = i;
      label.style.color = 'var(--text-muted)';
      label.style.fontWeight = '600';
    }
  }
  
  // Update progress line width
  const progressLine = document.getElementById('booking-step-progress-line');
  if (progressLine) {
    const percentage = ((step - 1) / 3) * 100;
    progressLine.style.width = `${percentage}%`;
  }
}

function nextBookingStep(step) {
  if (step === 2) {
    // Validate Step 1
    const basecamp = document.getElementById('booking-basecamp-select').value;
    const dateStart = document.getElementById('booking-date-start').value;
    const dateEnd = document.getElementById('booking-date-end').value;
    const whatsapp = document.getElementById('booking-whatsapp-input').value;
    
    if (!basecamp || !dateStart || !dateEnd || !whatsapp) {
      showToast('Harap lengkapi semua data rencana perjalanan!', 'error');
      return;
    }
    
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    if (end < start) {
      showToast('Tanggal selesai tidak boleh kurang dari tanggal mulai!', 'error');
      return;
    }
  }
  
  if (step === 3) {
    // Validate Step 2 (members)
    const nameInputs = document.getElementsByName('climber_names[]');
    const ktpInputs = document.getElementsByName('climber_ktps[]');
    
    let valid = true;
    for (let i = 0; i < nameInputs.length; i++) {
      const name = nameInputs[i].value.trim();
      const ktp = ktpInputs[i].value.trim();
      
      if (!name || !ktp) {
        showToast('Harap lengkapi nama dan KTP semua anggota rombongan!', 'error');
        valid = false;
        break;
      }
      
      if (ktp.length < 10) {
        showToast('Nomor KTP harus valid!', 'error');
        valid = false;
        break;
      }
    }
    if (!valid) return;
    
    // Populate Step 3 Summary
    populateBookingSummary();
  }
  
  showBookingStep(step);
}

function prevBookingStep(step) {
  showBookingStep(step);
}

function populateBookingSummary() {
  const select = document.getElementById('booking-mountain-select');
  const mountainId = select.value;
  const mt = mountainsData.find(m => m.id === mountainId);
  
  const basecamp = document.getElementById('booking-basecamp-select').value;
  const dateStart = document.getElementById('booking-date-start').value;
  const dateEnd = document.getElementById('booking-date-end').value;
  const whatsapp = document.getElementById('booking-whatsapp-input').value;
  
  const summaryMt = document.getElementById('summary-mountain');
  const summaryBasecamp = document.getElementById('summary-basecamp');
  const summaryDates = document.getElementById('summary-dates');
  const summaryWhatsapp = document.getElementById('summary-whatsapp');
  const summaryMembers = document.getElementById('summary-members-list');
  
  if (summaryMt && mt) summaryMt.innerText = mt.name;
  if (summaryBasecamp) summaryBasecamp.innerText = basecamp;
  
  // Format Date
  if (summaryDates) {
    summaryDates.innerText = `${dateStart} s/d ${dateEnd}`;
  }
  
  if (summaryWhatsapp) summaryWhatsapp.innerText = whatsapp;
  
  if (summaryMembers) {
    summaryMembers.innerHTML = '';
    const nameInputs = document.getElementsByName('climber_names[]');
    const ktpInputs = document.getElementsByName('climber_ktps[]');
    
    for (let i = 0; i < nameInputs.length; i++) {
      const name = nameInputs[i].value.trim();
      const ktp = ktpInputs[i].value.trim();
      
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.padding = '8px 0';
      item.style.borderBottom = '1px solid var(--border-color)';
      item.style.fontSize = '12px';
      
      item.innerHTML = `
        <div style="font-weight: 700; color: var(--text-dark);">${i + 1}. ${name}</div>
        <div style="color: var(--text-muted); font-weight: 500;">KTP: ${ktp}</div>
      `;
      summaryMembers.appendChild(item);
    }
  }
}

function updateBookingBasecamps() {
  const select = document.getElementById('booking-mountain-select');
  const basecampSelect = document.getElementById('booking-basecamp-select');
  if (!select || !basecampSelect) return;

  const mountainId = select.value;
  const mt = mountainsData.find(m => m.id === mountainId);
  basecampSelect.innerHTML = '';
  
  if (mt && mt.routes) {
    mt.routes.forEach(route => {
      const opt = document.createElement('option');
      opt.value = route.name;
      opt.innerText = route.name;
      basecampSelect.appendChild(opt);
    });
  }
}

// E-Ticket details overlay controls
function showTicketDetail(ticketId) {
  const ticket = userTickets.find(t => t.id === ticketId);
  if (!ticket) return;

  const mt = mountainsData.find(m => m.id === ticket.mountain_id);
  
  const dateStartStr = ticket.climb_date_start || ticket.climb_date;
  let dateEndStr = ticket.climb_date_end;
  if (!dateEndStr) {
    const endObj = new Date(dateStartStr);
    endObj.setDate(endObj.getDate() + 1);
    dateEndStr = endObj.toISOString().split('T')[0];
  }
  
  const dateUpObj = new Date(dateStartStr);
  const dateDownObj = new Date(dateEndStr);
  
  const dateUpFormatted = dateUpObj.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const dateDownFormatted = dateDownObj.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const leaderName = ticket.members[0].name;
  const membersList = ticket.members.map(m => m.name).join(', ');

  // Update UI Elements in Detail Overlay
  const bookingIdEl = document.getElementById('ticket-detail-booking-id');
  if (bookingIdEl) {
    bookingIdEl.innerText = ticket.id;
  }
  document.getElementById('ticket-detail-mt-name').innerText = mt ? mt.name : 'Gunung';
  document.getElementById('ticket-detail-basecamp').innerText = ticket.basecamp;
  document.getElementById('ticket-detail-date-up').innerText = dateUpFormatted;
  document.getElementById('ticket-detail-date-down').innerText = dateDownFormatted;
  document.getElementById('ticket-detail-leader').innerText = leaderName;
  document.getElementById('ticket-detail-count').innerText = `${ticket.members.length} Orang`;
  
  // Render list of members
  const listContainer = document.getElementById('ticket-detail-members-list');
  listContainer.innerHTML = ticket.members.map((m, idx) => `
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding: 6px 0;">
      <span style="font-weight: 600; color: #1A202C;">${idx + 1}. ${m.name}</span>
      <span style="color: #718096; font-size: 11px; font-weight: 500;">KTP: ${m.ktp}</span>
    </div>
  `).join('');

  // Check if trip is in the past
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDay = new Date(dateDownObj.getFullYear(), dateDownObj.getMonth(), dateDownObj.getDate());
  
  const isPast = endDay < today;
  const qrZone = document.getElementById('ticket-detail-qr-zone');
  const statusEl = document.getElementById('ticket-detail-status');

  if (isPast) {
    if (qrZone) qrZone.style.display = 'none';
    if (statusEl) {
      statusEl.innerText = 'PENDAKIAN SELESAI';
      statusEl.className = 'badge-density density-sedang';
    }
  } else {
    if (qrZone) qrZone.style.display = 'flex';
    if (statusEl) {
      statusEl.innerText = 'TERVERIFIKASI';
      statusEl.className = 'badge-density density-sepi';
    }
    // Generate QR Code data (Structured metadata for entire group check-in)
    const qrData = `ID:${ticket.id}\nKetua:${leaderName}\nJumlah:${ticket.members.length}\nAnggota:${membersList}\nGunung:${mt ? mt.name : ''}\nTanggal:${dateStartStr}`;
    setTimeout(() => {
      generateQRCode('group-qr-canvas', qrData);
    }, 100);
  }

  // Show Overlay modal
  const overlay = document.getElementById('ticket-detail-overlay');
  overlay.style.display = 'flex';
}

function closeTicketDetail() {
  const overlay = document.getElementById('ticket-detail-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

let currentTicketTab = 'active';
function switchTicketTab(type) {
  currentTicketTab = type;
  const activeBtn = document.getElementById('tab-active-tickets');
  const pastBtn = document.getElementById('tab-past-tickets');
  if (activeBtn && pastBtn) {
    if (type === 'active') {
      activeBtn.style.background = 'var(--primary)';
      activeBtn.style.color = 'white';
      pastBtn.style.background = 'transparent';
      pastBtn.style.color = 'var(--text-muted)';
    } else {
      pastBtn.style.background = 'var(--primary)';
      pastBtn.style.color = 'white';
      activeBtn.style.background = 'transparent';
      activeBtn.style.color = 'var(--text-muted)';
    }
  }
  renderUserTickets();
}

// Render dynamic user tickets
function renderUserTickets() {
  const container = document.getElementById('tickets-list-container');
  if (!container) return;

  // Defensively convert mountainsData and userTickets to Arrays if they were encoded as objects
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  const rawTickets = Array.isArray(userTickets) ? userTickets : Object.values(userTickets || {});

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const filteredTickets = rawTickets.filter(ticket => {
    const endDateStr = ticket.climb_date_end || ticket.climb_date_start || ticket.climb_date;
    if (!endDateStr) return false;
    const endDate = new Date(endDateStr);
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    if (currentTicketTab === 'active') {
      return endDay >= today;
    } else {
      return endDay < today;
    }
  }).sort((a, b) => {
    const dateA = new Date(a.climb_date_start || a.climb_date);
    const dateB = new Date(b.climb_date_start || b.climb_date);
    if (currentTicketTab === 'active') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  if (filteredTickets.length === 0) {
    const msg = currentTicketTab === 'active' ? 'Belum ada pendakian aktif' : 'Belum ada riwayat pendakian';
    const subMsg = currentTicketTab === 'active' ? 'Daftarkan rencana pendakianmu melalui tab Jelajah sekarang.' : 'Riwayat perjalanan Anda yang telah selesai akan muncul di sini.';
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 24px; color: #7A8B87;">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom: 12px; opacity: 0.5;">
          <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h7.5a3 3 0 003-3V6z"></path>
          <path d="M21 12h-4.5m4.5-3h-4.5m4.5 6h-4.5"></path>
        </svg>
        <p style="font-weight: 600;">${msg}</p>
        <p style="font-size: 13px; margin-top: 4px;">${subMsg}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  filteredTickets.forEach((ticket) => {
    const mt = rawMountains.find(m => m.id === ticket.mountain_id);
    const dateStartStr = ticket.climb_date_start || ticket.climb_date;
    const dateEndStr = ticket.climb_date_end || ticket.climb_date;
    
    const startFmt = new Date(dateStartStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const endFmt = new Date(dateEndStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    const dateRange = (dateStartStr === dateEndStr) ? startFmt : `${startFmt} sampai ${endFmt}`;

    const ticketCard = document.createElement('div');
    ticketCard.className = 'active-ticket-card pressed-state';
    ticketCard.onclick = () => showTicketDetail(ticket.id);

    const badgeText = currentTicketTab === 'active' ? 'TERDAFTAR' : 'SELESAI';
    const badgeClass = currentTicketTab === 'active' ? 'diff-mudah' : 'diff-sedang';

    ticketCard.innerHTML = `
      <div style="pointer-events: none; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
          <div>
            <h3 style="margin: 0; font-size: 16px; color: var(--primary); font-weight: 800; letter-spacing: -0.2px;">${mt ? mt.name : 'Gunung'}</h3>
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">${ticket.basecamp}</span>
          </div>
          <span class="diff-badge ${badgeClass}" style="font-size: 9px;">${badgeText}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="color: var(--text-muted); font-size: 10px; margin: 0; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase;">Tanggal Pendakian</p>
            <p style="font-weight: 700; color: var(--text-dark); margin-top: 3px; font-size: 13px;">${dateRange}</p>
          </div>
          <div style="text-align: right; display: flex; align-items: center; gap: 8px;">
            <div>
              <p style="color: var(--text-muted); font-size: 10px; margin: 0; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase;">Pendaki</p>
              <p style="font-weight: 700; color: var(--text-dark); margin-top: 3px; font-size: 13px;">${ticket.members.length} Orang</p>
            </div>
            <svg width="18" height="18" fill="none" stroke="var(--primary)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    `;
    container.appendChild(ticketCard);
  });
}

// View individual mountain detailed page
// View individual mountain detailed page
function viewMountainDetails(mountainId) {
  const mt = mountainsData.find(m => m.id === mountainId);
  if (!mt) return;

  const diffBadgeEl = document.getElementById('explore-detail-difficulty-badge');
  if (diffBadgeEl) {
    diffBadgeEl.innerText = '';
    diffBadgeEl.style.display = 'none';
  }

  // Set the cover details immediately
  document.getElementById('explore-detail-img').src = mt.image_url;
  document.getElementById('explore-detail-title').innerText = mt.name;
  document.getElementById('explore-detail-location').innerText = mt.location;
  document.getElementById('explore-detail-elevation-badge').innerText = `⛰️ ${mt.elevation}`;

  // Reset tab values to loading skeleton state
  const infoTab = document.getElementById('detail-tab-content-info');
  const routesList = document.getElementById('detail-routes-list');
  const facilitiesGrid = document.getElementById('detail-facilities-grid');
  
  if (infoTab) {
    infoTab.innerHTML = `
      <div class="skeleton" style="height: 80px; border-radius: var(--radius-sm); margin-bottom: 20px;"></div>
      <div class="skeleton" style="height: 100px; border-radius: var(--radius-sm); margin-bottom: 20px;"></div>
      <div class="skeleton" style="height: 140px; border-radius: var(--radius-sm); margin-bottom: 20px;"></div>
    `;
  }
  if (routesList) {
    routesList.innerHTML = `
      <div class="skeleton" style="height: 60px; border-radius: var(--radius-sm); margin-bottom: 12px;"></div>
      <div class="skeleton" style="height: 60px; border-radius: var(--radius-sm); margin-bottom: 12px;"></div>
    `;
  }
  if (facilitiesGrid) {
    facilitiesGrid.innerHTML = `
      <div class="skeleton" style="height: 48px; border-radius: var(--radius-sm);"></div>
      <div class="skeleton" style="height: 48px; border-radius: var(--radius-sm);"></div>
      <div class="skeleton" style="height: 48px; border-radius: var(--radius-sm);"></div>
      <div class="skeleton" style="height: 48px; border-radius: var(--radius-sm);"></div>
    `;
  }

  // Switch tabs
  switchTab('explore');
  document.getElementById('explore-main-view').style.display = 'none';
  document.getElementById('explore-detail-view').style.display = 'block';

  // Force tab back to 'info' initially
  if (typeof switchDetailTab === 'function') {
    switchDetailTab('info');
  }

  setTimeout(() => {
    let densityClass = 'density-sedang';
    if (mt.density === 'Sepi') densityClass = 'density-sepi';
    if (mt.density === 'Ramai') densityClass = 'density-ramai';
    if (mt.density === 'Sangat Ramai') densityClass = 'density-sangat-ramai';

    const densityEl = document.getElementById('explore-detail-density');
    if (densityEl) {
      densityEl.innerText = mt.density;
      densityEl.className = `badge-density ${densityClass}`;
    }

    const diffBadgeEl = document.getElementById('explore-detail-difficulty-badge');
    if (diffBadgeEl) {
      diffBadgeEl.innerText = mt.difficulty;
      const diffClass = mt.difficulty === 'Mudah' ? 'diff-mudah' : (mt.difficulty === 'Sedang' ? 'diff-sedang' : 'diff-sulit');
      diffBadgeEl.className = `diff-badge ${diffClass}`;
      diffBadgeEl.style.display = 'inline-flex';
    }

    if (infoTab) {
      infoTab.innerHTML = `
        <p id="explore-detail-desc" style="font-size: 14px; line-height: 1.65; color: var(--text-dark); margin-bottom: 20px;">${mt.description}</p>

        <!-- Real-Time Quota Card -->
        <div class="quota-info-card">
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Kuota Sisa</p>
            <strong style="font-size: 22px; color: var(--primary); font-weight: 800;">${mt.quota.remaining}</strong>
          </div>
          <div style="border-left: 1px solid var(--border-glow);"></div>
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Di Gunung</p>
            <strong style="font-size: 22px; color: var(--primary); font-weight: 800;">${mt.quota.active_climbers}</strong>
          </div>
          <div style="border-left: 1px solid var(--border-glow);"></div>
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Total</p>
            <strong style="font-size: 22px; color: var(--primary); font-weight: 800;">${mt.quota.total}</strong>
          </div>
        </div>

        <!-- Weather Card -->
        <h4 style="color: var(--primary); font-weight: 800; font-size: 15px; margin-bottom: 12px;">Prakiraan Cuaca</h4>
        <div class="card" style="margin: 0 0 20px 0; padding: 16px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); background: var(--card-bg);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">⛅</span>
              <div>
                <strong id="weather-status-text" style="font-size: 15px; color: var(--text-dark); font-weight: 700;">${mt.weather.current}</strong>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 1px; font-weight: 500;">Kondisi Hari Ini</p>
              </div>
            </div>
            <div id="weather-temp" style="font-size: 26px; font-weight: 800; color: var(--primary);">${mt.weather.temp}</div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; border-top: 1px solid var(--border-color); padding-top: 12px; margin-bottom: 12px; font-weight: 600; color: var(--text-muted);">
            <div>🌀 Angin: <strong id="weather-wind" style="color: var(--text-dark);">${mt.weather.wind}</strong></div>
            <div>💧 Kelembaban: <strong id="weather-humidity" style="color: var(--text-dark);">${mt.weather.humidity}</strong></div>
          </div>
          <p id="weather-forecast" style="font-size: 13px; color: var(--text-dark); background: var(--bg-light); padding: 12px; border-radius: 8px; margin: 0; line-height: 1.5; font-weight: 500;">${mt.weather.forecast}</p>
          <div id="weather-warnings-container" style="margin-top: 12px;"></div>
        </div>
      `;

      // Warnings widget
      const warningContainer = document.getElementById('weather-warnings-container');
      if (mt.weather.warnings && mt.weather.warnings.length > 0) {
        mt.weather.warnings.forEach(warn => {
          const warnBox = document.createElement('div');
          warnBox.className = 'warning-box';
          warnBox.innerHTML = `
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span>${warn}</span>
          `;
          warningContainer.appendChild(warnBox);
        });
      } else {
        warningContainer.innerHTML = `
          <div style="background: #E6F4EA; border-left: 4px solid #137333; padding: 12px; border-radius: var(--radius-sm); font-size: 13px; color: #137333; display: flex; align-items: center; gap: 8px; font-weight: 500;">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Kondisi jalur aman. Tidak ada peringatan cuaca buruk saat ini.</span>
          </div>
        `;
      }
    }

    if (routesList && mt.routes) {
      routesList.innerHTML = mt.routes.map(r => `
        <div class="card" style="margin: 0; padding: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); border-radius: var(--radius-sm); background: var(--card-bg);">
          <div>
            <h5 style="margin: 0; color: var(--primary); font-size: 14px; font-weight: 700;">${r.name}</h5>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-weight: 500;">Estimasi Trek: ${r.duration || '6-8 Jam'}</p>
          </div>
          <span class="quota-pill" style="font-size: 10px; font-weight: 700; background: rgba(56, 161, 105, 0.12); color: var(--primary-light); padding: 4px 10px; border-radius: 4px; margin: 0;">RUTE RESMI</span>
        </div>
      `).join('');
    }

    if (facilitiesGrid) {
      const defaultFacilities = [
        { name: 'Basecamp Registrasi', icon: '🏢' },
        { name: 'Parkir Kendaraan', icon: '🅿️' },
        { name: 'Mushola & MCK', icon: '🕌' },
        { name: 'Warung Logistik', icon: '🍳' },
        { name: 'Pos Penyelamatan', icon: '🏥' },
        { name: 'Penyewaan Tenda', icon: '🏕️' }
      ];
      facilitiesGrid.innerHTML = defaultFacilities.map(f => `
        <div style="background: var(--bg-light); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--text-dark);">
          <span style="font-size: 16px;">${f.icon}</span>
          <span>${f.name}</span>
        </div>
      `).join('');
    }

    // Action button registration
    document.getElementById('detail-book-btn').onclick = () => openBookingForm(mt.id);

    // Load satellite maps nodes after rendering DOM
    setTimeout(() => initDetailMap(mt), 100);

  }, 350);
}

function closeMountainDetails() {
  document.getElementById('explore-detail-view').style.display = 'none';
  document.getElementById('explore-main-view').style.display = 'block';
}

// Home page animated header background carousel initialization
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;
  
  let currentIdx = 0;
  setInterval(() => {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }, 4000);
}

// Initial triggers
// Initial triggers
window.addEventListener('load', () => {
  // Load and apply dark theme preferences (defaults to true if not set)
  const isDarkEnabled = localStorage.getItem('terra_dark_theme') !== 'disabled';
  toggleDarkTheme(isDarkEnabled);

  initCarousel();
  if (userTickets && userTickets.length > 0) {
    renderUserTickets();
  }
  initRecommendations();
  initClimbingHistory();
  
  // Try loading cached location
  const cachedLat = localStorage.getItem('terra_last_lat');
  const cachedLng = localStorage.getItem('terra_last_lng');
  if (cachedLat && cachedLng) {
    renderNearestMountains(parseFloat(cachedLat), parseFloat(cachedLng));
  }
});

function initRecommendations() {
  const container = document.getElementById('home-recommendations-container');
  if (!container) return;
  
  // Defensively convert mountainsData and userTickets to Arrays if they were encoded as objects
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  const rawTickets = Array.isArray(userTickets) ? userTickets : Object.values(userTickets || {});
  
  // Find user's climbed difficulties from history
  const now = new Date();
  const climbedIds = rawTickets.filter(t => {
    const endDateStr = t.climb_date_end || t.climb_date_start || t.climb_date;
    return endDateStr && new Date(endDateStr) < now;
  }).map(t => t.mountain_id);
  
  const climbedDifficulties = [];
  climbedIds.forEach(id => {
    const mt = rawMountains.find(m => m.id === id);
    if (mt && mt.difficulty && !climbedDifficulties.includes(mt.difficulty)) {
      climbedDifficulties.push(mt.difficulty);
    }
  });
  
  // Recommendations matching history or popular ones
  const popularIds = ['semeru', 'rinjani', 'merbabu', 'prau', 'bromo'];
  
  const recommended = rawMountains.map(mt => {
    let score = 0;
    if (climbedDifficulties.includes(mt.difficulty)) score += 3;
    if (popularIds.includes(mt.id)) score += 2;
    return { mt, score };
  }).sort((a, b) => b.score - a.score).slice(0, 5).map(item => item.mt);
  
  container.innerHTML = '';
  recommended.forEach(mt => {
    if (!mt) return;
    const diffClass = mt.difficulty === 'Mudah' ? 'diff-mudah' : (mt.difficulty === 'Sedang' ? 'diff-sedang' : 'diff-sulit');
    const card = document.createElement('div');
    card.style.cssText = 'flex:0 0 160px; height:215px; scroll-snap-align:start; border-radius:18px; overflow:hidden; position:relative; cursor:pointer; border:1px solid var(--border-color); box-shadow:var(--shadow-md); transition:transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease;';
    card.setAttribute('onclick', "viewMountainDetails('" + mt.id + "')");
    card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px) scale(1.02)'; card.style.boxShadow = 'var(--shadow-lg)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = 'var(--shadow-md)'; });

    card.innerHTML = `
      <div style="pointer-events: none; width: 100%; height: 100%; position: relative;">
        <img src="${mt.image_url}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="${mt.name}">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.82) 88%);"></div>
        <div style="position: absolute; bottom: 12px; left: 12px; right: 12px; display: flex; flex-direction: column; gap: 4px;">
          <h4 style="margin: 0; color: #FFFFFF; font-size: 13.5px; font-weight: 800; text-shadow: 0 1px 6px rgba(0,0,0,0.6); letter-spacing: -0.1px; line-height: 1.2;">${mt.name}</h4>
          <p style="margin: 0; color: rgba(255,255,255,0.82); font-size: 10px; font-weight: 600;">⛰️ ${mt.elevation}</p>
          <span class="diff-badge ${diffClass}" style="align-self: flex-start; font-size: 9px; margin-top: 2px;">${mt.difficulty}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function requestUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        localStorage.setItem('terra_last_lat', lat);
        localStorage.setItem('terra_last_lng', lng);
        renderNearestMountains(lat, lng);
        // Sync map tracking if loaded
        if (trackingMap && userMarker) {
          const newLatLng = new L.LatLng(lat, lng);
          userMarker.setLatLng(newLatLng);
          trackingMap.setView(newLatLng, 15);
        }
        showToast('Lokasi berhasil diaktifkan!', 'success');
      },
      error => {
        showToast('Gagal memuat lokasi. Silakan beri izin akses GPS.', 'error');
      }
    );
  } else {
    showToast('GPS tidak didukung oleh perangkat ini.', 'error');
  }
}

function renderNearestMountains(lat, lng) {
  const listEl = document.getElementById('nearest-mountains-list');
  const permCard = document.getElementById('location-permission-card');
  if (!listEl) return;
  
  if (permCard) permCard.style.display = 'none';
  listEl.style.display = 'block';
  
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  
  const sorted = rawMountains.map(mt => {
    const mtCoords = mt.coords || [0, 0];
    const dist = calculateDistance(lat, lng, mtCoords[0], mtCoords[1]);
    return { mt, dist };
  }).sort((a, b) => a.dist - b.dist);
  
  listEl.innerHTML = '';
  sorted.slice(0, 3).forEach(item => {
    const mt = item.mt;
    if (!mt) return;
    const distText = item.dist.toFixed(1) + ' km';

    const card = document.createElement('div');
    card.className = 'mountain-search-card pressed-state';
    card.setAttribute('onclick', "viewMountainDetails('" + mt.id + "')");

    const diffClass = mt.difficulty === 'Mudah' ? 'diff-mudah' : (mt.difficulty === 'Sedang' ? 'diff-sedang' : 'diff-sulit');

    card.innerHTML = `
      <div class="mountain-card-img-wrapper" style="width:70px; height:70px;" >
        <img src="${mt.image_url}" alt="${mt.name}">
      </div>
      <div class="mountain-card-body" style="pointer-events:none;">
        <h4 class="mountain-card-name" style="font-size:14px;">${mt.name}</h4>
        <p class="mountain-card-meta">${mt.location}</p>
        <div class="mountain-card-badges" style="margin-top:4px;">
          <span class="diff-badge ${diffClass}">${mt.difficulty}</span>
        </div>
      </div>
      <div style="text-align:right; flex-shrink:0;">
        <span class="quota-pill" style="margin:0; padding:4px 8px; font-size:10px;">📍 ${distText}</span>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function initClimbingHistory() {
  const container = document.getElementById('climbing-history-container');
  if (!container) return;
  
  // Defensively convert mountainsData and userTickets to Arrays if they were encoded as objects
  const rawMountains = Array.isArray(mountainsData) ? mountainsData : Object.values(mountainsData || {});
  const rawTickets = Array.isArray(userTickets) ? userTickets : Object.values(userTickets || {});
  
  const now = new Date();
  const historyTickets = rawTickets.filter(ticket => {
    const endDateStr = ticket.climb_date_end || ticket.climb_date_start || ticket.climb_date;
    if (!endDateStr) return false;
    const endDate = new Date(endDateStr);
    endDate.setDate(endDate.getDate() + 1); // After completion
    return endDate < now;
  }).sort((a, b) => {
    const dateA = new Date(a.climb_date_start || a.climb_date);
    const dateB = new Date(b.climb_date_start || b.climb_date);
    return dateB - dateA;
  });
  
  if (historyTickets.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 24px; color: var(--text-muted); margin: 0 24px 16px;">
        <p style="font-size: 13px; font-weight: 500;">Belum ada riwayat pendakian selesai.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = '';
  historyTickets.forEach(ticket => {
    const mt = rawMountains.find(m => m.id === ticket.mountain_id);
    const dateStartStr = ticket.climb_date_start || ticket.climb_date;
    const dateEndStr = ticket.climb_date_end || ticket.climb_date;

    const startFmt = new Date(dateStartStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const endFmt = new Date(dateEndStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const dateRange = (dateStartStr === dateEndStr) ? startFmt : `${startFmt} – ${endFmt}`;

    const card = document.createElement('div');
    card.className = 'active-ticket-card pressed-state';
    card.setAttribute('onclick', "showTicketDetail('" + ticket.id + "')");

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; pointer-events: none; width: 100%;">
        <div>
          <h4 style="margin: 0; color: var(--text-dark); font-size: 14px; font-weight: 800;">${mt ? mt.name : 'Gunung'}</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 3px; font-weight: 500;">📅 ${dateRange} · ${ticket.basecamp}</p>
        </div>
        <span class="diff-badge diff-mudah" style="font-size: 9px;">SELESAI</span>
      </div>
    `;
    container.appendChild(card);
  });
}

let currentDifficultyFilter = 'semua';

function toggleDifficultyFilter() {
  const difficulties = ['semua', 'mudah', 'sedang', 'sulit'];
  const currentIdx = difficulties.indexOf(currentDifficultyFilter);
  const nextIdx = (currentIdx + 1) % difficulties.length;
  currentDifficultyFilter = difficulties[nextIdx];
  
  const filterLabel = currentDifficultyFilter.charAt(0).toUpperCase() + currentDifficultyFilter.slice(1);
  showToast(`Filter Kesulitan: ${filterLabel}`, 'info');
  
  const btn = document.querySelector('[onclick="toggleDifficultyFilter()"]');
  if (btn) {
    if (currentDifficultyFilter !== 'semua') {
      btn.style.color = 'var(--accent)';
      btn.style.borderColor = 'var(--accent)';
    } else {
      btn.style.color = 'var(--primary)';
      btn.style.borderColor = 'var(--border-color)';
    }
  }

  filterMountains();
}

function filterMountains() {
  const searchInput = document.getElementById('explore-search-input');
  if (!searchInput) return;
  const filterVal = searchInput.value.toLowerCase().trim();
  
  const cards = document.querySelectorAll('.mountain-search-card');
  let matchCount = 0;
  
  cards.forEach(card => {
    const mtName = card.getAttribute('data-name') || '';
    const mtDiff = card.getAttribute('data-difficulty') || '';
    
    const matchesSearch = mtName.includes(filterVal);
    const matchesDifficulty = (currentDifficultyFilter === 'semua' || mtDiff.toLowerCase() === currentDifficultyFilter);
    
    if (matchesSearch && matchesDifficulty) {
      card.style.display = 'block';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  const noResults = document.getElementById('explore-no-results');
  if (noResults) {
    noResults.style.display = (matchCount === 0) ? 'block' : 'none';
  }
}

function logoutUser() {
  window.location.href = 'index.php?action=logout';
}
