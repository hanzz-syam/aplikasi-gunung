<!-- PAGE 5: PROFILE -->
<div id="page-profile" class="page">
  <div class="header-hero" style="padding: 48px 24px 32px; display: flex; flex-direction: column; align-items: center; text-align: center; border-radius: 0 0 var(--radius-lg) var(--radius-lg); background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); box-shadow: var(--shadow-md);">
    
    <!-- Large Profile Picture Avatar (Double-bordered premium design) -->
    <div style="position: relative; width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, var(--accent) 0%, #D69E2E 100%); display: flex; justify-content: center; align-items: center; font-size: 36px; font-weight: 800; color: #FFFFFF; border: 4px solid rgba(255,255,255,0.25); box-shadow: var(--shadow-md), 0 0 0 6px rgba(255,255,255,0.1); margin-bottom: 16px;">
      <?= strtoupper(substr($_SESSION['user_name'], 0, 1)) ?>
    </div>
    
    <div>
      <h3 style="font-weight: 800; margin: 0; font-size: 22px; color: #FFFFFF; text-shadow: 0 1px 4px rgba(0,0,0,0.2);"><?= htmlspecialchars($_SESSION['user_name']) ?></h3>
      <p style="font-size: 13px; opacity: 0.85; margin-top: 4px; color: #E2E8F0; font-weight: 500;"><?= htmlspecialchars($_SESSION['user_email']) ?></p>
      <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; color: #D69E2E; background: rgba(214, 158, 46, 0.15); border: 1px solid rgba(214, 158, 46, 0.3); padding: 4px 12px; border-radius: 50px; margin-top: 8px;">
        🎖️ Pendaki Level 3
      </span>
    </div>

    <!-- Stats row dashboard (Spacious 3-column dashboard) -->
    <div style="display: flex; width: 100%; max-width: 340px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-md); padding: 16px 12px; margin-top: 24px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); justify-content: space-around;">
      <div style="text-align: center; flex: 1;">
        <strong style="display: block; font-size: 18px; color: #FFFFFF; font-weight: 800;">12</strong>
        <span style="display: block; font-size: 9px; color: #E2E8F0; font-weight: 700; letter-spacing: 0.5px; margin-top: 4px; text-transform: uppercase;">Pendakian</span>
      </div>
      <div style="border-left: 1px solid rgba(255,255,255,0.15);"></div>
      <div style="text-align: center; flex: 1;">
        <strong style="display: block; font-size: 18px; color: var(--accent); font-weight: 800;">8</strong>
        <span style="display: block; font-size: 9px; color: #E2E8F0; font-weight: 700; letter-spacing: 0.5px; margin-top: 4px; text-transform: uppercase;">Gunung</span>
      </div>
      <div style="border-left: 1px solid rgba(255,255,255,0.15);"></div>
      <div style="text-align: center; flex: 1;">
        <strong style="display: block; font-size: 18px; color: #FFFFFF; font-weight: 800;">1.290</strong>
        <span style="display: block; font-size: 9px; color: #E2E8F0; font-weight: 700; letter-spacing: 0.5px; margin-top: 4px; text-transform: uppercase;">Poin</span>
      </div>
    </div>
  </div>

  <div class="section-title" style="margin-top: 28px; margin-bottom: 12px;">Pencapaian Petualang</div>
  <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 20px; margin: 0 24px 16px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); background: var(--card-bg); border-radius: var(--radius-md);">
    <div style="flex: 1; padding-right: 12px;">
      <span class="badge-density density-sepi" style="font-size: 9px; padding: 4px 10px; border-radius: 50px; font-weight: 800; margin-bottom: 8px;">PEMULA</span>
      <h4 style="margin: 0; color: var(--primary); font-weight: 800; font-size: 15px;">Pendaki Pemula</h4>
      <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px; font-weight: 500; line-height: 1.4;">Selesaikan 1 pendakian pertama untuk naik level berikutnya.</p>
    </div>
    <span style="font-size: 40px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">⛰️</span>
  </div>

  <div class="section-title" style="margin-bottom: 12px;">Pengaturan Akun</div>
  <div class="card" style="padding: 0; overflow: hidden; margin: 0 24px 32px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); background: var(--card-bg); border-radius: var(--radius-md);">
    <!-- Data Pribadi -->
    <div onclick="showToast('Fitur data pribadi akan segera hadir.', 'info')" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dark);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span style="font-size: 14px; font-weight: 700;">Data Pribadi</span>
      </div>
      <span style="color: var(--text-muted); font-weight: bold;">&gt;</span>
    </div>

    <!-- Riwayat Pendakian -->
    <div onclick="switchTab('ticket')" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dark);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span style="font-size: 14px; font-weight: 700;">Riwayat Pendakian</span>
      </div>
      <span style="color: var(--text-muted); font-weight: bold;">&gt;</span>
    </div>

    <!-- Sertifikat -->
    <div onclick="showToast('Sertifikat Anda akan muncul di sini setelah pendakian selesai.', 'info')" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dark);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
        <span style="font-size: 14px; font-weight: 700;">Sertifikat</span>
      </div>
      <span style="color: var(--text-muted); font-weight: bold;">&gt;</span>
    </div>

    <!-- Mode Gelap (Dark Mode) -->
    <div class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; border-bottom: 1px solid var(--border-color); transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dark);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span style="font-size: 14px; font-weight: 700;">Mode Gelap (Dark Mode)</span>
      </div>
      <label class="switch-toggle" style="margin: 0;">
        <input type="checkbox" id="dark-theme-toggle" onchange="toggleDarkTheme(this.checked)">
        <span class="switch-slider"></span>
      </label>
    </div>

    <!-- Bantuan & Kontak -->
    <div onclick="showToast('Hubungi kami di support@terra.com', 'info')" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dark);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        <span style="font-size: 14px; font-weight: 700;">Bantuan & Kontak</span>
      </div>
      <span style="color: var(--text-muted); font-weight: bold;">&gt;</span>
    </div>

    <!-- Admin Panel -->
    <a href="Admin/admin.php" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border-color); text-decoration: none; color: var(--text-dark); cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px; color: var(--primary);">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
        <span style="font-size: 14px; font-weight: 700; color: var(--primary);">⚙️ Admin Panel</span>
      </div>
      <span style="color: var(--primary); font-weight: bold;">&gt;</span>
    </a>

    <!-- Keluar dari Akun -->
    <div onclick="logoutUser()" class="pressed-state" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; color: #E53E3E; cursor: pointer; transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        <span style="font-size: 14px; font-weight: 800;">Keluar dari Akun</span>
      </div>
      <span style="color: #E53E3E; font-weight: bold;">&gt;</span>
    </div>
  </div>
</div>
<?php
// Inject server side helper to avoid breaking php Date syntax errors since PHP has no class "Date" (PHP uses DateTime or time())
// Let's write a small conditional logic inside PHP so it parses correctly.
// Oh wait! In php, "new Date()" throws a Fatal Error! Good catch.
// Let's rewrite the PHP past_count calculator cleanly:
/*
  $past_count = 0;
  $today_ts = strtotime(date('Y-m-d'));
  foreach ($user_tickets as $t) {
      $end_ts = strtotime($t['climb_date_end'] ?? $t['climb_date_start'] ?? '');
      if ($end_ts < $today_ts) $past_count++;
  }
  echo $past_count;
*/
?>
