<!-- PAGE 4: TRACKING -->
<div id="page-tracking" class="page">
  <div class="header-hero" style="padding: 32px 24px 44px; position: relative; border-radius: 0 0 var(--radius-lg) var(--radius-lg); background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); box-shadow: var(--shadow-md);">
    <h3 style="font-weight: 800; margin: 0; font-size: 24px; color: white;">Offline GPS Tracking</h3>
    <p style="font-size: 13px; opacity: 0.9; margin-top: 4px; color: #E2E8F0; font-weight: 500;">Monitor posisi pendakian Anda tanpa koneksi internet</p>
  </div>

  <div class="section-title" style="margin-top: 24px; margin-bottom: 12px;">Peta Satelit & Rute Pendakian</div>

  <!-- Map Wrapper containing Leaflet and Coords -->
  <div class="tracking-map-wrapper" style="height: 480px; position: relative; margin: 16px 20px 0; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--border-color);">
    <div id="tracking-map" style="height: 100%; width: 100%; z-index: 1;"></div>

    <!-- Top floating HUD panel displaying coordinates & elevation -->
    <div class="glass-panel" style="position: absolute; top: 16px; left: 16px; right: 16px; z-index: 10; border-radius: var(--radius-md); padding: 14px 16px; border: 1px solid rgba(255,255,255,0.4); box-shadow: var(--shadow-md);">
      <div style="display: grid; grid-template-columns: 1.1fr 1.1fr 1fr; gap: 8px; text-align: center; align-items: center;">
        <div style="border-right: 1px solid rgba(15, 76, 58, 0.15);">
          <span style="font-size: 8px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Latitude</span>
          <strong id="gps-lat" style="font-size: 11px; color: var(--text-dark); font-weight: 800; display: block; margin-top: 2px;">-7.546231</strong>
        </div>
        <div style="border-right: 1px solid rgba(15, 76, 58, 0.15); padding: 0 4px;">
          <span style="font-size: 8px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Longitude</span>
          <strong id="gps-lng" style="font-size: 11px; color: var(--text-dark); font-weight: 800; display: block; margin-top: 2px;">110.437231</strong>
        </div>
        <div>
          <span style="font-size: 8px; color: var(--text-muted); display: block; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Elevasi</span>
          <strong id="gps-elev" style="font-size: 11px; color: var(--primary); font-weight: 800; display: block; margin-top: 2px;">1.842 m</strong>
        </div>
      </div>
    </div>

    <!-- Floating selectors at bottom left -->
    <div style="position: absolute; bottom: 16px; left: 16px; right: 76px; z-index: 10; display: flex; flex-direction: column; gap: 6px;">
      <div class="glass-panel" style="border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.4); box-shadow: var(--shadow-md); overflow: hidden;">
        <select id="offline-map-select" onchange="updateOfflineRoutes()" style="width:100%; padding:12px; border:none; outline:none; background: transparent; font-size: 12px; font-weight: 700; color: var(--text-dark); cursor: pointer; text-align-last: center; appearance: none; -webkit-appearance: none;">
          <option value="" style="background: var(--card-bg);">Cari Peta Offline Gunung</option>
          <option value="semeru" style="background: var(--card-bg);">Gunung Semeru</option>
          <option value="merbabu" style="background: var(--card-bg);">Gunung Merbabu</option>
          <option value="merapi" style="background: var(--card-bg);">Gunung Merapi</option>
          <option value="prau" style="background: var(--card-bg);">Gunung Prau</option>
          <option value="rinjani" style="background: var(--card-bg);">Gunung Rinjani</option>
        </select>
      </div>
      
      <select id="offline-route-select" onchange="loadOfflineMountainMap()" style="width:100%; padding:10px; border:1px solid var(--border-color); border-radius:8px; outline:none; background: var(--card-bg); font-size: 12px; font-weight: 600; color: var(--text-dark); display: none; box-shadow: var(--shadow-md);">
        <option value="">-- Pilih Jalur Pendakian --</option>
      </select>
    </div>

    <!-- Floating Center to My Location on bottom right -->
    <button onclick="centerToMyLocation()" class="btn-center-gps pressed-state" style="position: absolute; bottom: 16px; right: 16px; top: auto; z-index: 10; width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: white; display: flex; justify-content: center; align-items: center; border: none; box-shadow: var(--shadow-md); cursor: pointer;">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m16.242-6.242l-2.122 2.122M7.879 16.121l-2.122 2.122m10.485 0l2.122 2.122M7.879 7.879L5.758 5.758M12 17a5 5 0 100-10 5 5 0 000 10z" />
      </svg>
    </button>
  </div>

  <div class="section-title" style="margin-bottom: 12px;">Status Pendakian Aktif</div>
  
  <?php if (count($user_tickets) > 0): ?>
    <?php 
      $latest_ticket = end($user_tickets);
      $latest_mt = null;
      foreach ($data['mountains'] as $m) {
          if ($m['id'] === $latest_ticket['mountain_id']) {
              $latest_mt = $m;
              break;
          }
      }
    ?>
    <div class="card" style="border-left: 4px solid var(--primary); padding: 20px; margin: 0 24px 32px; box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h4 style="margin: 0; color: var(--primary); font-weight: 800; font-size: 16px;"><?= htmlspecialchars($latest_mt ? $latest_mt['name'] : 'Gunung') ?></h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 3px; font-weight: 500;">Sistem mencatat posisi awal masuk pendakian</p>
        </div>
        <span class="badge-density density-sepi" style="background-color: #FEEBC8; color: #C05621; font-weight: 800; padding: 4px 10px; border-radius: 50px;">AKTIF</span>
      </div>

      <!-- Tracking Progress Flow -->
      <div style="background: var(--bg-light); border-radius: var(--radius-sm); padding: 16px; border: 1px solid var(--border-color);">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: white; display: flex; justify-content: center; align-items: center; font-size: 10px; font-weight: 800; box-shadow: 0 2px 5px rgba(15,76,58,0.2);">GPS</div>
          <div>
            <p style="font-size: 10px; color: var(--text-muted); margin: 0; font-weight: 700; letter-spacing: 0.5px;">POSISI SAAT INI</p>
            <p id="tracking-flow-current" style="font-weight: 700; color: var(--text-dark); margin: 2px 0 0 0; font-size: 13px;">Basecamp (Awal Masuk)</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent); color: white; display: flex; justify-content: center; align-items: center; font-size: 11px; font-weight: 800; box-shadow: 0 2px 5px rgba(236,168,35,0.2);">&gt;&gt;</div>
          <div>
            <p style="font-size: 10px; color: var(--text-muted); margin: 0; font-weight: 700; letter-spacing: 0.5px;">TARGET POS BERIKUTNYA</p>
            <p id="tracking-flow-next" style="font-weight: 700; color: var(--text-dark); margin: 2px 0 0 0; font-size: 13px;">Pos 1 / Pos Terdekat</p>
          </div>
        </div>
      </div>
    </div>
  <?php else: ?>
    <div class="card" style="text-align: center; padding: 40px 24px; color: #7A8B87; margin: 0 24px 32px;">
      <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom: 12px; opacity: 0.5; color: var(--primary);">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <p style="font-weight: 700; color: var(--text-dark);">Tidak ada aktivitas pendakian saat ini</p>
      <p style="font-size: 13px; margin-top: 4px; color: var(--text-muted); font-weight: 500;">Sinyal GPS pelacakan offline akan memplot rute secara otomatis pada hari pendakian yang terdaftar.</p>
    </div>
  <?php endif; ?>
</div>
