<!-- Ticket Detail Slide-Up Overlay -->
<div id="ticket-detail-overlay" class="ticket-detail-overlay">
  <!-- Status Bar Simulator (Dark) -->
  <div class="status-bar" style="background-color: var(--primary); color: white; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div>10:22</div>
    <div style="display: flex; gap: 4px; align-items: center;">
      <span>5G</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
    </div>
  </div>

  <div class="ticket-detail-content" style="background-color: var(--bg-light);">
    <!-- Back button -->
    <div onclick="closeTicketDetail()" style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px; color: var(--text-dark); cursor: pointer; font-weight: 700; font-size: 14px; transition: var(--transition);">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="color: var(--primary);"><path d="M15 19l-7-7 7-7"></path></svg>
      Kembali ke Daftar Tiket
    </div>

    <!-- E-Ticket Card styled as Boarding Pass -->
    <div class="e-ticket-card" style="background: #FFFFFF !important; color: #1A202C !important; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: visible; position: relative; border: none;">
      <div class="e-ticket-header" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%) !important; color: #ffffff !important; padding: 24px 20px; text-align: center; border-bottom: 4px solid var(--accent); border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF;">PAS PENDAKIAN TERRA</h2>
        <span style="font-size: 10px; opacity: 0.9; font-weight: 700; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase;">E-Ticket Masuk Resmi</span>
      </div>
      
      <div class="e-ticket-body" style="padding: 24px 20px; background: #FFFFFF !important; border-radius: 0 0 var(--radius-lg) var(--radius-lg);">
        <!-- Top QR Code Zone -->
        <div class="e-ticket-qr-zone" id="ticket-detail-qr-zone" style="margin-bottom: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <span style="font-size: 11px; font-weight: 800; color: #4A5568; letter-spacing: 0.5px; margin-bottom: 12px; text-transform: uppercase;">BOOKING ID: <span id="ticket-detail-booking-id" style="color: var(--primary); font-weight: 900;">-</span></span>
          <canvas id="group-qr-canvas" style="width: 180px; height: 180px; display: block; border: 1px solid #E2E8F0; padding: 8px; border-radius: var(--radius-sm); background: white; box-shadow: var(--shadow-sm);"></canvas>
          <span style="font-size: 10px; color: #718096; margin-top: 14px; font-weight: 700; letter-spacing: 0.5px; max-width: 240px; line-height: 1.4;">SCAN PADA BARCODE SCANNER DI BASECAMP</span>
        </div>
        
        <!-- Tear-off Dot Divider -->
        <div class="ticket-dots-divider" style="margin: 16px -20px;">
          <div class="ticket-dots-line" style="border-top: 2px dashed #E2E8F0;"></div>
        </div>

        <div style="padding-top: 8px;">
          <h3 id="ticket-detail-mt-name" style="margin: 0 0 4px 0; color: #0F4C3A; font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">-</h3>
          <span id="ticket-detail-basecamp" style="font-size: 13px; color: #4A5568; background: #F7FAFC; border: 1px solid #E2E8F0; padding: 4px 10px; border-radius: 4px; display: inline-block;">-</span>
        </div>
        
        <div class="e-ticket-grid" style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px 12px;">
          <div>
            <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">TANGGAL NAIK</span>
            <strong id="ticket-detail-date-up" style="font-size: 13px; color: #1A202C; font-weight: 700;">-</strong>
          </div>
          <div>
            <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">TANGGAL TURUN</span>
            <strong id="ticket-detail-date-down" style="font-size: 13px; color: #1A202C; font-weight: 700;">-</strong>
          </div>
          <div>
            <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">KETUA ROMBONGAN</span>
            <strong id="ticket-detail-leader" style="font-size: 13px; color: #1A202C; font-weight: 700;">-</strong>
          </div>
          <div>
            <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px;">JUMLAH ANGGOTA</span>
            <strong id="ticket-detail-count" style="font-size: 13px; color: #1A202C; font-weight: 700;">-</strong>
          </div>
          <div style="grid-column: span 2;">
            <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px;">STATUS PEMESANAN</span>
            <span id="ticket-detail-status" class="badge-density density-sepi" style="font-size: 10px; padding: 4px 12px; border-radius: 50px; font-weight: 800; letter-spacing: 0.5px; display: inline-block;">TERVERIFIKASI</span>
          </div>
        </div>

        <div style="margin-top: 24px; border-top: 1px solid #E2E8F0; padding-top: 20px;">
          <span style="font-size: 10px; color: #718096; display: block; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px;">DAFTAR ANGGOTA ROMBONGAN</span>
          <div id="ticket-detail-members-list" style="font-size: 13px; color: #1A202C; line-height: 1.6;">
            <!-- Dynamically loaded list of names -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
