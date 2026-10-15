<!-- PAGE 2: EXPLORE -->
<div id="page-explore" class="page">
  
  <!-- Explore View 1: List Mountains -->
  <div id="explore-main-view">
    <div class="header-hero" style="padding: 32px 24px 44px; position: relative; margin-bottom: 24px; background: var(--header-bg); border-radius: 0 0 var(--radius-lg) var(--radius-lg); box-shadow: var(--shadow-md);">
      <h3 style="font-weight: 800; margin: 0; font-size: 24px; color: white;">Jelajah & Registrasi</h3>
      <p style="font-size: 13px; opacity: 0.9; margin-top: 4px; color: #E2E8F0; font-weight: 500;">Temukan jalur ekspedisi gunung impianmu</p>
    </div>

    <!-- Real-Time Search Bar & Filter Button -->
    <div style="padding: 0 24px; margin-top: -38px; margin-bottom: 24px; position: relative; z-index: 10; display: flex; gap: 12px;">
      <div style="flex: 1; position: relative; display: flex; align-items: center; background: var(--card-bg); border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--border-color); padding: 4px 18px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" style="margin-right: 12px; flex-shrink: 0;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="explore-search-input" placeholder="Cari gunung impianmu..." onkeyup="filterMountains()" style="width: 100%; border: none; outline: none; padding: 12px 0; font-size: 14px; background: transparent; color: var(--text-dark); font-weight: 600;">
      </div>
      <button onclick="toggleDifficultyFilter()" class="pressed-state" style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-md); cursor: pointer; color: var(--primary); outline: none; transition: var(--transition);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
      </button>
    </div>

    <div class="section-title" style="margin-bottom: 12px;">Daftar Gunung Tersedia</div>
    
    <div id="explore-mountain-list" style="padding-bottom: 24px;">
      <?php foreach ($data['mountains'] as $mt): ?>
        <?php 
          $densityClass = 'density-sedang';
          if ($mt['density'] === 'Sepi') $densityClass = 'density-sepi';
          if ($mt['density'] === 'Ramai') $densityClass = 'density-ramai';
          if ($mt['density'] === 'Sangat Ramai') $densityClass = 'density-sangat-ramai';

          $diffClass = 'diff-sedang';
          if ($mt['difficulty'] === 'Mudah') $diffClass = 'diff-mudah';
          if ($mt['difficulty'] === 'Sulit') $diffClass = 'diff-sulit';
        ?>
        <div class="mountain-search-card pressed-state"
             data-name="<?= strtolower(htmlspecialchars($mt['name'])) ?>"
             data-difficulty="<?= strtolower(htmlspecialchars($mt['difficulty'])) ?>"
             onclick="viewMountainDetails('<?= $mt['id'] ?>')">

          <!-- Thumbnail Image (Left) -->
          <div class="mountain-card-img-wrapper">
            <img src="<?= $mt['image_url'] ?>" alt="<?= htmlspecialchars($mt['name']) ?>">
          </div>

          <!-- Details (Middle) -->
          <div class="mountain-card-body">
            <h4 class="mountain-card-name"><?= htmlspecialchars($mt['name']) ?></h4>
            <p class="mountain-card-meta"><?= htmlspecialchars($mt['elevation']) ?> &bull; <?= htmlspecialchars($mt['location']) ?></p>

            <div class="mountain-card-badges">
              <span class="diff-badge <?= $diffClass ?>"><?= htmlspecialchars($mt['difficulty'] ?? 'Sedang') ?></span>
              <span class="badge-density <?= $densityClass ?>"><?= htmlspecialchars($mt['density']) ?></span>
            </div>

            <div class="mountain-card-stats">
              <span>⏱️ <strong><?= htmlspecialchars($mt['estimated_duration'] ?? '2 Hari') ?></strong></span>
              <span>Kuota: <strong><?= $mt['quota']['remaining'] ?></strong></span>
            </div>
          </div>

          <!-- Bookmark Icon (Right) -->
          <div class="card-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>
      <?php endforeach; ?>
      
      <div id="explore-no-results" style="display: none; text-align: center; padding: 40px 24px; color: var(--text-muted);">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom: 12px; opacity: 0.5;">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <p style="font-weight: 600;">Gunung tidak ditemukan</p>
        <p style="font-size: 12px; margin-top: 4px;">Coba gunakan kata kunci pencarian yang lain.</p>
      </div>
    </div>
  </div>

  <!-- Explore View 2: Detailed Mountain Page -->
  <div id="explore-detail-view" style="display: none;">
    <div style="position: relative; height: 260px; overflow: hidden; border-radius: 0 0 32px 32px; box-shadow: var(--shadow-md);">
      <img id="explore-detail-img" src="" style="width: 100%; height: 100%; object-fit: cover;" alt="Mountain Cover">
      <div class="carousel-overlay" style="background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);"></div>
      
      <!-- Back button (Left) -->
      <div onclick="closeMountainDetails()" style="position: absolute; top: 16px; left: 16px; width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 10; transition: var(--transition);">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
      </div>

      <!-- Action buttons (Right: Share & Bookmark) -->
      <div style="position: absolute; top: 16px; right: 16px; display: flex; gap: 10px; z-index: 10;">
        <div onclick="showToast('Tautan berhasil dibagikan!', 'success')" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: var(--transition);">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M8.684 10.742l5.028-2.514m-5.028 3.544l5.028 2.514M12 8a3 3 0 11-6 0 3 3 0 016 0zm6-4a3 3 0 11-6 0 3 3 0 016 0zm0 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
        <div onclick="showToast('Gunung berhasil disimpan ke favorit!', 'success')" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: var(--transition);">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
        </div>
      </div>
    </div>

    <div style="padding: 24px 24px 40px;">
      <!-- Mountain Detail Header (Outside cover image) -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px;">
          <h2 id="explore-detail-title" style="margin: 0; color: var(--text-dark); font-weight: 800; font-size: 24px; line-height: 1.2;"></h2>
          <span id="explore-detail-elevation-badge" style="font-size: 11px; font-weight: 800; color: var(--accent); background: rgba(236,168,35,0.12); padding: 4px 10px; border-radius: 8px; white-space: nowrap; border: 1px solid rgba(236,168,35,0.2);"></span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin: 0; display: flex; align-items: center; gap: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span id="explore-detail-location"></span>
          </p>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span id="explore-detail-difficulty-badge"></span>
            <span id="explore-detail-density" class="badge-density" style="font-size: 9px; padding: 3px 8px; border-radius: 50px;"></span>
          </div>
        </div>
      </div>
      <!-- Tab Navigation Headers -->
      <div class="detail-tabs-header">
        <button class="detail-tab-btn active" id="btn-tab-info" onclick="switchDetailTab('info')">Informasi</button>
        <button class="detail-tab-btn" id="btn-tab-jalur" onclick="switchDetailTab('jalur')">Jalur</button>
        <button class="detail-tab-btn" id="btn-tab-peta" onclick="switchDetailTab('peta')">Peta</button>
        <button class="detail-tab-btn" id="btn-tab-fasilitas" onclick="switchDetailTab('fasilitas')">Fasilitas</button>
      </div>

      <!-- Tab Content 1: Informasi -->
      <div id="detail-tab-content-info" class="detail-tab-content active">
        <p id="explore-detail-desc" style="font-size: 14px; line-height: 1.6; color: var(--text-dark); margin-bottom: 20px;"></p>

        <!-- Real-Time Quota Card -->
        <div class="quota-info-card">
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Kuota Sisa</p>
            <strong id="explore-detail-quota-rem" style="font-size: 22px; color: var(--primary); font-weight: 800;">0</strong>
          </div>
          <div style="border-left: 1px solid var(--border-glow);"></div>
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Di Gunung</p>
            <strong id="explore-detail-quota-active" style="font-size: 22px; color: var(--primary); font-weight: 800;">0</strong>
          </div>
          <div style="border-left: 1px solid var(--border-glow);"></div>
          <div>
            <p style="font-size: 10px; color: var(--primary-light); font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Total</p>
            <strong id="explore-detail-quota-tot" style="font-size: 22px; color: var(--primary); font-weight: 800;">0</strong>
          </div>
        </div>

        <!-- Weather Card -->
        <h4 style="color: var(--primary); font-weight: 800; font-size: 15px; margin-bottom: 12px;">Prakiraan Cuaca</h4>
        <div class="card" style="margin: 0 0 20px 0; padding: 16px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">⛅</span>
              <div>
                <strong id="weather-status-text" style="font-size: 15px; color: var(--text-dark); font-weight: 700;">Cerah</strong>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 1px; font-weight: 500;">Kondisi Hari Ini</p>
              </div>
            </div>
            <div id="weather-temp" style="font-size: 26px; font-weight: 800; color: var(--primary);">14°C</div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; border-top: 1px solid #F1F5F9; padding-top: 12px; margin-bottom: 12px; font-weight: 600; color: var(--text-muted);">
            <div>🌀 Angin: <strong id="weather-wind" style="color: var(--text-dark);">12 km/jam</strong></div>
            <div>💧 Kelembaban: <strong id="weather-humidity" style="color: var(--text-dark);">65%</strong></div>
          </div>
          <p id="weather-forecast" style="font-size: 13px; color: var(--text-dark); background: var(--bg-light); padding: 12px; border-radius: 8px; margin: 0; line-height: 1.5; font-weight: 500;"></p>
          <div id="weather-warnings-container" style="margin-top: 12px;"></div>
        </div>
      </div>

      <!-- Tab Content 2: Jalur -->
      <div id="detail-tab-content-jalur" class="detail-tab-content">
        <h4 style="color: var(--primary); font-weight: 800; font-size: 15px; margin-bottom: 12px;">Pilihan Rute Resmi</h4>
        <div id="detail-routes-list" style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Populated in JS details rendering -->
        </div>
      </div>

      <!-- Tab Content 3: Peta -->
      <div id="detail-tab-content-peta" class="detail-tab-content">
        <h4 style="color: var(--primary); font-weight: 800; font-size: 15px; margin-bottom: 12px;">Peta Satelit Interaktif</h4>
        <div id="detail-map" style="box-shadow: var(--shadow-sm);"></div>
        <div id="map-detail-drawer" class="map-detail-drawer" style="box-shadow: var(--shadow-sm);"></div>
      </div>

      <!-- Tab Content 4: Fasilitas -->
      <div id="detail-tab-content-fasilitas" class="detail-tab-content">
        <h4 style="color: var(--primary); font-weight: 800; font-size: 15px; margin-bottom: 12px;">Fasilitas Basecamp & Jalur</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;" id="detail-facilities-grid">
          <!-- Populated in JS details rendering -->
        </div>
      </div>

      <button id="detail-book-btn" class="btn-primary" style="margin-top: 28px; padding: 16px; font-weight: 700; border-radius: var(--radius-md);">Daftar Mendaki Sekarang</button>
    </div>
  </div>

  <!-- Explore View 3: Registration Booking Wizard -->
  <div id="explore-booking-view" style="display: none; padding: 24px 24px 40px;">
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 24px;">
      <div onclick="closeBookingForm()" class="pressed-state" style="width: 40px; height: 40px; border-radius: 50%; background: var(--card-bg); border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; color: var(--text-dark); cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
      </div>
      <div>
        <h3 id="booking-form-title" style="margin: 0; color: var(--primary); font-weight: 800; font-size: 22px; line-height: 1.2;">Gunung Merbabu</h3>
        <p style="font-size: 12px; margin: 2px 0 0; color: var(--text-muted); font-weight: 600;">Form Registrasi Pendakian</p>
      </div>
    </div>

    <!-- 4-Step Indicator -->
    <div class="booking-stepper" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; padding: 0 10px; position: relative;">
      <!-- Background Connecting Line -->
      <div style="position: absolute; top: 15px; left: 35px; right: 35px; height: 2px; background: var(--border-color); z-index: 1;">
        <div id="booking-step-progress-line" style="height: 100%; width: 0%; background: var(--primary); transition: width 0.3s ease;"></div>
      </div>
      
      <!-- Step 1 -->
      <div class="step-indicator-item active" id="step-dot-1" style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2; flex: 1;">
        <div class="step-dot" style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary); border: 2px solid var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(56,161,105,0.2);">1</div>
        <span class="step-label" style="font-size: 10px; font-weight: 700; color: var(--text-dark); transition: all 0.3s ease;">Rencana</span>
      </div>
      
      <!-- Step 2 -->
      <div class="step-indicator-item" id="step-dot-2" style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2; flex: 1;">
        <div class="step-dot" style="width: 30px; height: 30px; border-radius: 50%; background: var(--card-bg); border: 2px solid var(--border-color); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; transition: all 0.3s ease;">2</div>
        <span class="step-label" style="font-size: 10px; font-weight: 600; color: var(--text-muted); transition: all 0.3s ease;">Rombongan</span>
      </div>
      
      <!-- Step 3 -->
      <div class="step-indicator-item" id="step-dot-3" style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2; flex: 1;">
        <div class="step-dot" style="width: 30px; height: 30px; border-radius: 50%; background: var(--card-bg); border: 2px solid var(--border-color); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; transition: all 0.3s ease;">3</div>
        <span class="step-label" style="font-size: 10px; font-weight: 600; color: var(--text-muted); transition: all 0.3s ease;">Verifikasi</span>
      </div>
      
      <!-- Step 4 -->
      <div class="step-indicator-item" id="step-dot-4" style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2; flex: 1;">
        <div class="step-dot" style="width: 30px; height: 30px; border-radius: 50%; background: var(--card-bg); border: 2px solid var(--border-color); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; transition: all 0.3s ease;">4</div>
        <span class="step-label" style="font-size: 10px; font-weight: 600; color: var(--text-muted); transition: all 0.3s ease;">Selesai</span>
      </div>
    </div>

    <!-- Wrap inside a styled Card -->
    <div class="card" style="margin: 0; padding: 24px; background: var(--card-bg); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border-color);">
      <form method="POST" action="index.php">
        <input type="hidden" name="action_type" value="book_ticket">
        
        <!-- HIDDEN mountain dropdown to keep backend compatibility -->
        <select name="mountain_id" id="booking-mountain-select" required onchange="updateBookingBasecamps()" style="display: none;">
          <?php foreach ($data['mountains'] as $mt_opt): ?>
            <option value="<?= $mt_opt['id'] ?>"><?= htmlspecialchars($mt_opt['name']) ?></option>
          <?php endforeach; ?>
        </select>

        <!-- PANEL 1: DETAIL RENCANA -->
        <div id="booking-step-panel-1">
          <div class="input-group" style="margin-bottom: 20px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:8px; letter-spacing: 0.5px;">JALUR PENDAKIAN / BASECAMP</label>
            <select name="basecamp" id="booking-basecamp-select" required style="width:100%; padding:14px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
              <!-- Auto populated by JS -->
            </select>
          </div>

          <div class="input-group" style="margin-bottom: 20px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:8px; letter-spacing: 0.5px;">TANGGAL MULAI PENDAKIAN</label>
            <input type="date" name="climb_date_start" id="booking-date-start" required min="<?= date('Y-m-d') ?>" onchange="calculateClimbDuration()" style="width:100%; padding:14px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
          </div>

          <div class="input-group" style="margin-bottom: 20px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:8px; letter-spacing: 0.5px;">TANGGAL SELESAI PENDAKIAN</label>
            <input type="date" name="climb_date_end" id="booking-date-end" required min="<?= date('Y-m-d') ?>" onchange="calculateClimbDuration()" style="width:100%; padding:14px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
          </div>

          <!-- WhatsApp Contact Input -->
          <div class="input-group" style="margin-bottom: 20px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:8px; letter-spacing: 0.5px;">NOMOR WHATSAPP KETUA</label>
            <input type="tel" id="booking-whatsapp-input" placeholder="Contoh: 081234567890" style="width:100%; padding:14px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
          </div>

          <!-- Durasi Pendakian Display Card -->
          <div id="duration-display-container" class="card" style="margin: 0 0 24px 0; background: rgba(56, 161, 105, 0.12); border: 1px solid rgba(56, 161, 105, 0.25); padding: 14px 18px; border-radius: var(--radius-sm); display: none; box-shadow: none;">
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--primary);">
              <span style="font-size: 18px;">⏳</span>
              <div>
                <span style="font-weight: 600; color: var(--text-muted);">Durasi Perjalanan:</span>
                <span id="climb-duration-text" style="font-weight: 800; margin-left: 4px; color: var(--primary); font-size: 14px;">-</span>
              </div>
            </div>
            <div id="duration-error-text" style="color: #E53E3E; font-size: 12px; font-weight: 700; margin-top: 6px; display: none;">Tanggal selesai tidak boleh lebih awal dari tanggal mulai!</div>
          </div>

          <button type="button" onclick="nextBookingStep(2)" class="btn-primary pressed-state" style="margin-top: 12px; padding: 16px; border-radius: var(--radius-md); font-weight: 700; width: 100%;">Selanjutnya</button>
        </div>

        <!-- PANEL 2: DAFTAR ROMBONGAN -->
        <div id="booking-step-panel-2" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h4 style="margin: 0; color: var(--primary); font-weight: 800; font-size: 15px;">Anggota Rombongan</h4>
            <button type="button" onclick="addMemberField()" class="pressed-state" style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 6px; box-shadow: var(--shadow-sm);">+ Tambah</button>
          </div>

          <!-- Climbers list -->
          <div id="booking-members" class="booking-members-list" style="margin-bottom: 24px;">
            <div class="member-row" id="member-row-1" style="background: var(--bg-light); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-color); position: relative;">
              <div style="margin-bottom: 14px;">
                <label style="display:block; font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:6px; letter-spacing: 0.5px;">NAMA KETUA / ROMBONGAN #1</label>
                <input type="text" name="climber_names[]" required placeholder="Nama lengkap sesuai KTP" style="width:100%; padding:12px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
              </div>
              <div>
                <label style="display:block; font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:6px; letter-spacing: 0.5px;">NOMOR KTP KETUA #1</label>
                <input type="text" name="climber_ktps[]" required placeholder="Nomor KTP (16 digit)" style="width:100%; padding:12px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--bg-light); font-size: 13px; font-weight: 600; color: var(--text-dark);">
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button type="button" onclick="prevBookingStep(1)" class="pressed-state" style="flex: 1; background: transparent; border: 1px solid var(--border-color); color: var(--text-dark); padding: 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: var(--transition);">Kembali</button>
            <button type="button" onclick="nextBookingStep(3)" class="btn-primary pressed-state" style="flex: 2; padding: 16px; border-radius: var(--radius-md); font-weight: 700;">Selanjutnya</button>
          </div>
        </div>

        <!-- PANEL 3: VERIFIKASI DATA -->
        <div id="booking-step-panel-3" style="display: none;">
          <h4 style="margin: 0 0 16px 0; color: var(--primary); font-weight: 800; font-size: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">Ringkasan Registrasi</h4>
          
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; background: var(--bg-light); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div>
              <span style="font-size: 10px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">GUNUNG TUJUAN</span>
              <strong id="summary-mountain" style="font-size: 14px; color: var(--text-dark); font-weight: 800;">-</strong>
            </div>
            <div>
              <span style="font-size: 10px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">JALUR / BASECAMP</span>
              <strong id="summary-basecamp" style="font-size: 13px; color: var(--text-dark); font-weight: 700;">-</strong>
            </div>
            <div>
              <span style="font-size: 10px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">TANGGAL PENDAKIAN</span>
              <strong id="summary-dates" style="font-size: 13px; color: var(--text-dark); font-weight: 700;">-</strong>
            </div>
            <div>
              <span style="font-size: 10px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">NO. WHATSAPP KETUA</span>
              <strong id="summary-whatsapp" style="font-size: 13px; color: var(--text-dark); font-weight: 700;">-</strong>
            </div>
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 4px;">
              <span style="font-size: 10px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px;">DAFTAR PENDAKI ROMBONGAN</span>
              <div id="summary-members-list" style="display: flex; flex-direction: column; gap: 4px;">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <button type="button" onclick="prevBookingStep(2)" class="pressed-state" style="flex: 1; background: transparent; border: 1px solid var(--border-color); color: var(--text-dark); padding: 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: var(--transition);">Kembali</button>
            <button type="submit" class="btn-primary pressed-state" style="flex: 2; padding: 16px; border-radius: var(--radius-md); font-weight: 700;">Proses Pendaftaran</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
  function switchDetailTab(tabId) {
    // Hide all tab content
    document.querySelectorAll('.detail-tab-content').forEach(content => {
      content.classList.remove('active');
    });
    // Unactivate all tab buttons
    document.querySelectorAll('.detail-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Activate selected
    const activeContent = document.getElementById('detail-tab-content-' + tabId);
    if (activeContent) {
      activeContent.classList.add('active');
    }
    const activeBtn = document.getElementById('btn-tab-' + tabId);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // Recalculate Leaflet map sizes if tab is Peta
    if (tabId === 'peta' && typeof detailMap !== 'undefined' && detailMap) {
      setTimeout(() => {
        detailMap.invalidateSize();
      }, 200);
    }
  }
</script>
