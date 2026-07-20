<!-- ============================================================
     CSG VISITOR KIOSK - VERSION #3 - as of July 20, 2026
     ============================================================ -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>CSG Visitor Check-In</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&display=swap');

  :root {
    --red: #C22227;
    --red-dark: #9E181D;
    --red-tint: #FBEDEE;
    --ink: #191C1F;
    --slate: #5B6570;
    --line: #E3E6E9;
    --bg: #F6F7F8;
    --white: #FFFFFF;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { height: 100%; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Archivo', -apple-system, 'Segoe UI', Roboto, sans-serif;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
  }

  button, input { font-family: inherit; }

  button:focus-visible, input:focus-visible {
    outline: 3px solid var(--red);
    outline-offset: 2px;
  }
  button { cursor: pointer; }
  button:active { transform: scale(0.985); }

  .screen {
    width: 100%;
    max-width: 560px;
    min-height: 100vh;
    display: none;
    flex-direction: column;
    padding: 0 28px;
    position: relative;
  }
  .screen.active { display: flex; }

  /* ---------- Welcome ---------- */
  #screen-welcome { justify-content: space-between; text-align: center; }

  .clock-time { font-size: 38px; font-weight: 800; letter-spacing: -0.02em; padding-top: 36px; }
  .clock-date { margin-top: 4px; color: var(--slate); font-size: 17px; }

  .welcome-main { display: flex; flex-direction: column; align-items: center; }

  .logo-lg { width: 148px; height: 148px; display: block; }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 18px; font-size: 13px; font-weight: 700;
    letter-spacing: 0.22em; color: var(--slate);
  }

  h1 {
    font-size: 56px; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.05;
    margin-top: 34px;
  }

  .lede { font-size: 20px; color: var(--slate); line-height: 1.5; margin: 14px auto 0; max-width: 420px; }

  .btn-checkin {
    width: 100%; max-width: 420px; min-height: 96px;
    margin: 56px auto 0;
    display: inline-flex; align-items: center; justify-content: center; gap: 12px;
    background: var(--red); color: #fff; border: none; border-radius: 18px;
    font-size: 28px; font-weight: 800; letter-spacing: -0.01em;
    box-shadow: 0 18px 40px rgba(194,34,39,0.35);
    animation: csgPulse 2.6s ease-out infinite;
  }

  @keyframes csgPulse {
    0%, 100% { box-shadow: 0 18px 40px rgba(194,34,39,0.35), 0 0 0 0 rgba(194,34,39,0.30); }
    60%      { box-shadow: 0 18px 40px rgba(194,34,39,0.35), 0 0 0 26px rgba(194,34,39,0); }
  }

  .welcome-footer { padding-bottom: 36px; color: var(--slate); font-size: 15px; }

  /* ---------- Form ---------- */
  .form-header {
    display: flex; align-items: center; gap: 16px;
    padding: 26px 0 18px; border-bottom: 1px solid var(--line);
  }
  .form-header img { width: 52px; }
  .form-title { font-weight: 800; font-size: 22px; letter-spacing: -0.01em; }
  .form-sub { color: var(--slate); font-size: 15px; }

  .btn-ghost {
    margin-left: auto; min-height: 48px; padding: 0 20px;
    background: transparent; color: var(--slate);
    border: 2px solid var(--line); border-radius: 12px;
    font-size: 16px; font-weight: 700;
  }

  .form-scroll { flex: 1; overflow-y: auto; padding-top: 26px; }

  .field { margin-bottom: 26px; position: relative; }

  label { display: block; font-size: 15px; font-weight: 700; margin-bottom: 9px; letter-spacing: 0.01em; }

  input[type="text"] {
    width: 100%; height: 60px; padding: 0 18px;
    font-size: 19px; color: var(--ink);
    background: var(--white); border: 2px solid var(--line); border-radius: 14px;
    outline: none;
  }
  input[type="text"]:focus { border-color: var(--red); }
  input.error { border-color: var(--red); background: var(--red-tint); }

  .err-text { display: none; color: var(--red); font-size: 14.5px; font-weight: 600; margin-top: 7px; }
  .err-text.show { display: block; }

  .hint { display: none; color: var(--slate); font-size: 14.5px; margin-top: 8px; }
  .hint.show { display: block; }

  /* Host dropdown */
  .dropdown {
    display: none;
    position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 20;
    background: var(--white); border: 1px solid var(--line); border-radius: 14px;
    box-shadow: 0 16px 40px rgba(20,24,28,0.14);
    max-height: 316px; overflow-y: auto; padding: 6px;
  }
  .dropdown.open { display: block; }
  .host-wrap { position: relative; }

  .option {
    display: flex; align-items: center; gap: 12px;
    width: 100%; min-height: 56px; padding: 8px 12px;
    font-size: 18px; color: var(--ink); text-align: left;
    background: transparent; border: none; border-radius: 10px;
  }
  .option .tick { margin-left: auto; color: var(--red); font-weight: 700; visibility: hidden; }
  .option.selected .tick { visibility: visible; }

  .avatar {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    background: var(--red-tint); color: var(--red);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 13.5px; font-weight: 800;
  }

  .no-match { padding: 16px 18px; color: var(--slate); font-size: 16px; }

  /* Segmented + chips */
  .seg-row { display: flex; gap: 12px; }
  .seg {
    flex: 1; min-height: 60px; border-radius: 14px;
    font-size: 17.5px; font-weight: 700;
    background: var(--white); color: var(--ink); border: 2px solid var(--line);
  }
  .seg.on, .chip.on { background: var(--red); border-color: var(--red); color: #fff; }

  .chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
  .chip {
    min-height: 54px; padding: 0 20px; border-radius: 999px;
    font-size: 16.5px; font-weight: 600;
    background: var(--white); color: var(--ink); border: 2px solid var(--line);
  }

  #reason-other-input { display: none; margin-top: 12px; }
  #reason-other-input.show { display: block; }

  .btn-primary {
    width: 100%; min-height: 66px; margin-top: 6px;
    background: var(--red); color: #fff; border: none; border-radius: 16px;
    font-size: 20px; font-weight: 800;
    box-shadow: 0 10px 24px rgba(194,34,39,0.28);
  }
  .btn-primary:disabled { opacity: 0.6; cursor: default; }

  .kb-space { height: 260px; } /* breathing room above the on-screen keyboard */

  /* ---------- Idle overlay ---------- */
  .overlay {
    display: none;
    position: fixed; inset: 0; z-index: 50;
    background: rgba(18,20,23,0.55);
    align-items: center; justify-content: center; padding: 28px;
  }
  .overlay.show { display: flex; }

  .dialog {
    background: var(--white); border-radius: 20px; padding: 30px 28px;
    width: 100%; max-width: 400px; text-align: center;
    box-shadow: 0 30px 70px rgba(0,0,0,0.3);
  }
  .dialog h2 { font-size: 26px; font-weight: 800; }
  .dialog p { color: var(--slate); margin: 10px 0 22px; font-size: 17px; }
  .dialog strong { color: var(--red); }

  /* ---------- Confirmation ---------- */
  #screen-done { justify-content: center; text-align: center; }

  .check-circle {
    width: 128px; height: 128px; border-radius: 50%;
    background: var(--red); margin: 0 auto;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 18px 40px rgba(194,34,39,0.35);
    animation: csgPop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
  }
  @keyframes csgPop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.06); }
    100% { transform: scale(1); opacity: 1; }
  }

  #done-title { font-size: 44px; margin-top: 28px; }

  .slack-card {
    margin: 34px auto 0; width: 100%; max-width: 460px;
    background: var(--white); border: 1px solid var(--line); border-radius: 16px;
    padding: 14px 16px 16px;
    box-shadow: 0 10px 30px rgba(20,24,28,0.08);
  }
  .slack-tag {
    font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
    color: var(--slate); text-transform: uppercase;
    text-align: left; margin-bottom: 12px;
  }
  .slack-msg { display: flex; gap: 12px; text-align: left; }
  .slack-avatar {
    width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
    background: var(--red); display: flex; align-items: center; justify-content: center;
  }
  .slack-meta { font-size: 15px; }
  .app-badge {
    font-size: 10.5px; font-weight: 700; color: var(--slate);
    background: #EDEFF1; border-radius: 4px; padding: 1px 5px;
    vertical-align: middle;
  }
  .slack-time { color: var(--slate); font-size: 13px; }
  .slack-body { font-size: 15.5px; margin-top: 3px; line-height: 1.45; }
  .mention {
    color: #1264A3; background: #E8F2FA;
    border-radius: 4px; padding: 0 3px; font-weight: 600;
  }
  .slack-detail { color: var(--slate); }

  .reset-note { margin-top: 36px; color: var(--slate); font-size: 16px; }
  .progress-track {
    width: 220px; height: 5px; border-radius: 999px;
    background: var(--line); margin: 12px auto 0; overflow: hidden;
  }
  .progress-fill {
    height: 100%; width: 100%; background: var(--red); border-radius: 999px;
    transition: width 1s linear;
  }
  #btn-done-now { margin: 18px auto 0; }

  /* ==================== ADMIN ==================== */
  .screen--wide { max-width: 980px; padding: 0; }

  .admin-bar {
    background: var(--red); color: #fff;
    display: flex; align-items: center; gap: 12px;
    padding: 16px 22px;
  }
  .bar-title { font-size: 20px; font-weight: 800; letter-spacing: -0.01em; display: inline-flex; align-items: center; gap: 10px; }
  .bar-user { margin-left: auto; display: inline-flex; align-items: center; gap: 10px; font-size: 14.5px; font-weight: 700; }
  .admin-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.22); color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800;
  }
  .btn-signout {
    background: transparent; color: #fff;
    border: 1.5px solid rgba(255,255,255,0.55); border-radius: 10px;
    min-height: 36px; padding: 0 14px; font-size: 13.5px; font-weight: 700;
  }

  .admin-tabs { background: var(--white); border-bottom: 1px solid var(--line); padding: 0 22px; }
  .admin-tabs { display: flex; gap: 20px; }
  .admin-tab {
    background: transparent; border: none;
    padding: 15px 4px 12px; font-size: 15.5px; font-weight: 800;
    color: var(--slate); border-bottom: 3px solid transparent;
    display: inline-flex; align-items: center; gap: 8px;
    cursor: pointer;
  }
  .admin-tab.active { color: var(--red); border-bottom-color: var(--red); cursor: default; }

  .panel { display: flex; flex-direction: column; gap: 16px; }
  .hide { display: none !important; }

  .emp-row {
    background: var(--white); border: 1px solid var(--line); border-radius: 12px;
    padding: 12px 16px; display: flex; gap: 14px; align-items: center; margin-top: 10px;
  }
  .btn-remove {
    margin-left: auto; background: none; border: 1.5px solid var(--line);
    color: var(--red); border-radius: 10px; min-height: 38px; padding: 0 14px;
    font-size: 13.5px; font-weight: 700; cursor: pointer; flex-shrink: 0;
  }
  .emp-add { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .emp-add input, #panel-settings .field input {
    height: 52px; padding: 0 14px; font-size: 16px; font-family: inherit;
    color: var(--ink); background: var(--white);
    border: 2px solid var(--line); border-radius: 12px; outline: none;
  }
  .emp-add input { flex: 1 1 180px; }
  #panel-settings .field input { width: 100%; }
  .emp-add input:focus, #panel-settings .field input:focus { border-color: var(--red); }

  .admin-body { padding: 20px 22px 48px; display: flex; flex-direction: column; gap: 16px; }

  .card {
    background: var(--white); border: 1px solid var(--line); border-radius: 16px;
    padding: 18px; box-shadow: 0 8px 24px rgba(20,24,28,0.05);
  }
  .card-label {
    font-size: 12.5px; font-weight: 800; letter-spacing: 0.14em;
    color: var(--slate); text-transform: uppercase; margin-bottom: 14px;
  }

  .filter-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  select.range, .custom-range input[type="date"] {
    height: 52px; padding: 0 14px; font-size: 16px; font-family: inherit; color: var(--ink);
    background: var(--white); border: 2px solid var(--line); border-radius: 12px; outline: none;
  }
  select.range:focus, .custom-range input[type="date"]:focus { border-color: var(--red); }
  .custom-range { display: none; gap: 10px; align-items: center; flex-wrap: wrap; }
  .custom-range.show { display: flex; }
  .custom-range span { color: var(--slate); font-size: 14.5px; font-weight: 700; }

  .btn-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; }
  .btn-load, .btn-export {
    min-height: 52px; padding: 0 22px; border: none; border-radius: 12px;
    font-size: 16px; font-weight: 800; color: #fff;
    display: inline-flex; align-items: center; gap: 9px;
  }
  .btn-load { background: var(--red); box-shadow: 0 8px 20px rgba(194,34,39,0.22); }
  .btn-export { background: #1F9D55; box-shadow: 0 8px 20px rgba(31,157,85,0.22); }

  .notice {
    background: #FFF8E7; border: 1px solid #F0DFAE; color: #8A6D1F;
    border-radius: 12px; padding: 12px 16px; font-size: 14.5px; font-weight: 600;
  }

  .chart { display: flex; align-items: flex-end; gap: 10px; height: 190px; padding-top: 6px; }
  .chart-col { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; }
  .chart-count { font-size: 12.5px; font-weight: 800; }
  .chart-stack {
    width: min(46px, 100%); display: flex; flex-direction: column;
    border-radius: 6px 6px 0 0; overflow: hidden;
  }
  .seg-dropin  { background: #E8A33D; }
  .seg-planned { background: var(--red); }
  .chart-x { font-size: 11.5px; color: var(--slate); font-weight: 700; white-space: nowrap; }
  .legend { display: flex; gap: 18px; margin-top: 14px; font-size: 13px; color: var(--slate); font-weight: 700; }
  .legend i { width: 11px; height: 11px; border-radius: 3px; display: inline-block; margin-right: 6px; }

  #visit-list { display: flex; flex-direction: column; gap: 10px; }
  .day-head {
    display: flex; align-items: center; gap: 10px; margin-top: 8px;
    background: var(--white); border: 1px solid var(--line); border-radius: 12px;
    padding: 12px 16px; font-weight: 800; font-size: 15.5px;
  }
  .day-head .cnt { margin-left: auto; color: var(--red); font-size: 14px; }
  .visit {
    background: var(--white); border: 1px solid var(--line); border-radius: 12px;
    padding: 14px 16px; display: flex; gap: 14px; align-items: center;
  }
  .v-main { min-width: 0; }
  .v-name { font-weight: 800; font-size: 16.5px; }
  .v-meta { color: var(--slate); font-size: 14.5px; margin-top: 3px; }
  .v-meta b { color: var(--ink); }
  .v-right { margin-left: auto; display: flex; flex-direction: column; align-items: flex-end; gap: 7px; }
  .badge {
    font-size: 11.5px; font-weight: 800; letter-spacing: 0.06em;
    border-radius: 999px; padding: 4px 10px; white-space: nowrap;
  }
  .badge.planned { background: #E7F6EC; color: #1F9D55; }
  .badge.dropin  { background: #FCF3E3; color: #B97E1F; }
  .v-time { font-size: 14px; color: var(--slate); font-weight: 700; }
  .empty { text-align: center; color: var(--slate); padding: 26px 10px; font-size: 15.5px; }

  /* ---------- Admin login ---------- */
  #screen-admin-login { justify-content: center; }
  .login-card {
    background: var(--white); border: 1px solid var(--line); border-radius: 20px;
    padding: 32px 28px; box-shadow: 0 20px 50px rgba(20,24,28,0.08);
  }
  .login-logo { width: 76px; display: block; margin: 0 auto 12px; }
  .login-title { font-size: 28px; font-weight: 800; text-align: center; }
  .login-sub { color: var(--slate); text-align: center; margin: 8px 0 24px; font-size: 15px; }
  .login-card input[type="email"], .login-card input[type="password"] {
    width: 100%; height: 60px; padding: 0 18px;
    font-size: 19px; color: var(--ink);
    background: var(--white); border: 2px solid var(--line); border-radius: 14px; outline: none;
  }
  .login-card input:focus { border-color: var(--red); }
  .admin-link {
    background: none; border: none; color: var(--slate);
    text-decoration: underline; font-size: 15px; margin-top: 10px; padding: 6px;
  }

  /* Hide the scrollbar; scrolling still works */
  html {
    scrollbar-width: none;       /* Firefox */
    -ms-overflow-style: none;    /* old Edge */
  }
  ::-webkit-scrollbar {
    display: none;               /* Chrome, Safari, Edge */
  }

  /* Brand watermark, form page only */
  #screen-form::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22340%22%20height%3D%22300%22%3E%3Cg%20fill%3D%22%23C22227%22%20fill-opacity%3D%220.07%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2256%22%20font-weight%3D%22900%22%3E%3Ctext%20x%3D%2224%22%20y%3D%2292%22%20transform%3D%22rotate%28-25%2070%2075%29%22%3ECSG%3C%2Ftext%3E%3Ctext%20x%3D%22196%22%20y%3D%22234%22%20transform%3D%22rotate%28-25%20240%20215%29%22%3ECSG%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  }

  /* Sound on/off toggle, bottom-right of every page */
  #btn-sound {
    position: fixed; right: 14px; bottom: 14px; z-index: 60;
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--white); border: 1.5px solid var(--line);
    color: var(--slate); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(20,24,28,0.10);
  }
  #btn-sound:active { transform: scale(0.94); }

  @media (prefers-reduced-motion: reduce) {
    .btn-checkin, .check-circle { animation: none; }
    button:active { transform: none; }
  }
</style>
</head>
<body>

<!-- ==================== WELCOME ==================== -->
<section class="screen active" id="screen-welcome">
  <header>
    <div class="clock-time" id="clock-time">–:–</div>
    <div class="clock-date" id="clock-date"></div>
  </header>

  <main class="welcome-main">
    <img class="logo-lg" id="logo-welcome" alt="CSG logo">
    <div class="eyebrow">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 2 5 13.5h5L9.5 22 19 9.5h-5.5L13.5 2Z" fill="#C22227"/></svg>
      CONNECTED SOLUTIONS GROUP
    </div>
    <h1>Welcome.</h1>
    <p class="lede">Please check in and we&rsquo;ll let your host know you&rsquo;re here.</p>

    <button class="btn-checkin" id="btn-start">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 2 5 13.5h5L9.5 22 19 9.5h-5.5L13.5 2Z" fill="#fff"/></svg>
      Check In
    </button>
  </main>

  <footer class="welcome-footer">
    Need help? Ask any team member nearby.
    <br>
    <button class="admin-link" id="btn-admin" type="button">Sign in as Admin</button>
  </footer>
</section>

<!-- ==================== FORM ==================== -->
<section class="screen" id="screen-form">
  <header class="form-header">
    <img id="logo-form" alt="CSG">
    <div>
      <div class="form-title">Visitor check-in</div>
      <div class="form-sub">Takes about 30 seconds</div>
    </div>
    <button class="btn-ghost" id="btn-cancel">Cancel</button>
  </header>

  <div class="form-scroll">
    <div class="field">
      <label for="first">First name</label>
      <input type="text" id="first" autocomplete="off">
      <div class="err-text" id="err-first">Please enter your first name.</div>
    </div>

    <div class="field">
      <label for="last">Last name</label>
      <input type="text" id="last" autocomplete="off">
      <div class="err-text" id="err-last">Please enter your last name.</div>
    </div>

    <div class="field">
      <label for="host">Who are you here to see?</label>
      <div class="host-wrap">
        <input type="text" id="host" placeholder="Start typing a name…" autocomplete="off"
               aria-label="Who are you here to see?" role="combobox" aria-expanded="false">
        <div class="dropdown" id="host-dropdown" role="listbox"></div>
      </div>
      <div class="err-text" id="err-host">Please choose or type a name.</div>
      <div class="hint" id="host-hint"></div>
    </div>

    <div class="field">
      <label>Is this visit planned?</label>
      <div class="seg-row">
        <button type="button" class="seg" data-planned="yes">Yes, it&rsquo;s planned</button>
        <button type="button" class="seg" data-planned="no">No, dropping in</button>
      </div>
      <div class="err-text" id="err-planned">Please choose one.</div>
    </div>

    <div class="field">
      <label>Reason for your visit</label>
      <div class="chip-row" id="chip-row"></div>
      <input type="text" id="reason-other-input" placeholder="Tell us briefly why you're visiting">
      <div class="err-text" id="err-reason">Please pick a reason.</div>
    </div>

    <button class="btn-primary" id="btn-submit">Complete check-in</button>
    <div class="kb-space"></div>
  </div>

  <!-- idle watchdog dialog -->
  <div class="overlay" id="idle-overlay">
    <div class="dialog">
      <h2>Still there?</h2>
      <p>This screen will reset in <strong id="idle-count">15s</strong> so the next visitor gets a fresh start.</p>
      <button class="btn-primary" id="btn-still-here" style="width:100%">I&rsquo;m still here</button>
    </div>
  </div>
</section>

<!-- ==================== CONFIRMATION ==================== -->
<section class="screen" id="screen-done">
  <div class="check-circle" id="check-circle">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12.5 10 18 19.5 7" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <h1 id="done-title">Thanks!</h1>
  <p class="lede" id="done-sub"></p>

  <div class="reset-note">
    Returning to the welcome screen in <span id="reset-count">12</span>s
    <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
  <button class="btn-ghost" id="btn-done-now">Done</button>
</section>

<!-- ==================== ADMIN LOGIN ==================== -->
<section class="screen" id="screen-admin-login">
  <div class="login-card">
    <img class="login-logo" id="logo-login" alt="CSG logo">
    <div class="login-title">Admin sign in</div>
    <p class="login-sub">Visitor history is for authorized CSG staff only.</p>
    <div class="field">
      <label for="admin-email">Email</label>
      <input type="email" id="admin-email" autocomplete="off" placeholder="Email">
    </div>
    <div class="field">
      <label for="admin-pass">Password</label>
      <input type="password" id="admin-pass" placeholder="Password">
      <div class="err-text" id="err-login">That email and password don&rsquo;t match. Try again.</div>
    </div>
    <button class="btn-primary" id="btn-login">Sign in</button>
    <button class="btn-ghost" id="btn-login-back" style="width:100%; margin-top:12px;">Back to check-in</button>
  </div>
</section>

<!-- ==================== ADMIN DASHBOARD ==================== -->
<section class="screen screen--wide" id="screen-admin-dash">
  <header class="admin-bar">
    <div class="bar-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 2 5 13.5h5L9.5 22 19 9.5h-5.5L13.5 2Z" fill="#fff"/></svg>
      Admin Dashboard
    </div>
    <div class="bar-user">
      <span id="admin-name"></span>
      <span class="admin-avatar" id="admin-initials"></span>
      <button class="btn-signout" id="btn-signout">Sign out</button>
    </div>
  </header>

  <nav class="admin-tabs">
    <button class="admin-tab active" id="tab-history" type="button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM8 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Zm8 1c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 .5c-.34 0-.66.02-.97.05C5.16 14.6 4 15.8 4 17v2H0v-2c0-1.86 4.79-3.5 8-3.5Z" fill="currentColor"/></svg>
      Visitor History
    </button>
    <button class="admin-tab" id="tab-settings" type="button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.4 13a7.6 7.6 0 0 0 .1-1 7.6 7.6 0 0 0-.1-1l2.1-1.6a.5.5 0 0 0 .1-.7l-2-3.4a.5.5 0 0 0-.6-.2l-2.5 1a7.4 7.4 0 0 0-1.7-1l-.4-2.6a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1a.5.5 0 0 0-.6.2l-2 3.4a.5.5 0 0 0 .1.7L4.5 11a7.6 7.6 0 0 0-.1 1 7.6 7.6 0 0 0 .1 1l-2.1 1.6a.5.5 0 0 0-.1.7l2 3.4c.1.2.4.3.6.2l2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.6c0 .3.2.5.5.5h4c.3 0 .5-.2.5-.5l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.4a.5.5 0 0 0-.1-.7L19.4 13ZM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z" fill="currentColor"/></svg>
      Settings
    </button>
  </nav>

  <div class="admin-body">
  <div class="panel" id="panel-history">
    <div class="card">
      <div class="filter-row">
        <select class="range" id="range-select" aria-label="Time period">
          <option value="30">Last 30 days</option>
          <option value="thisweek">This week</option>
          <option value="lastweek">Last week</option>
          <option value="two">Last two weeks</option>
          <option value="custom">Custom&hellip;</option>
        </select>
        <div class="custom-range" id="custom-range">
          <input type="date" id="date-from" aria-label="From date">
          <span>to</span>
          <input type="date" id="date-to" aria-label="To date">
        </div>
      </div>
      <div class="btn-row">
        <button class="btn-load" id="btn-load">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.24 4.25 1.42-1.42-4.25-4.24A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z" fill="#fff"/></svg>
          Load Results
        </button>
        <button class="btn-export" id="btn-export">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3ZM5 19h14v2H5v-2Z" fill="#fff"/></svg>
          Export to Excel
        </button>
      </div>
      <div class="notice" id="export-note" style="display:none; margin-top:12px;"></div>
    </div>

    <div class="card">
      <div class="card-label">Visitors by day</div>
      <div class="chart" id="chart"></div>
      <div class="legend">
        <span><i style="background:var(--red)"></i>Planned</span>
        <span><i style="background:#E8A33D"></i>Drop-in</span>
      </div>
    </div>

    <div id="visit-list"></div>
  </div>

  <div class="panel hide" id="panel-settings">
    <div class="card">
      <div class="card-label">Check-in name list</div>
      <div id="emp-list"></div>
      <div class="emp-add">
        <input type="text" id="emp-name" placeholder="Full name" autocomplete="off">
        <input type="text" id="emp-slack" placeholder="Slack member ID (optional)" autocomplete="off">
        <button class="btn-load" id="btn-emp-add" type="button">Add person</button>
      </div>
      <div class="notice" id="emp-note" style="display:none; margin-top:12px;"></div>
    </div>

  <div class="card">
      <div class="card-label">Admin accounts</div>
      <div id="adm-list"></div>
      <div class="emp-add">
        <input type="text" id="adm-name" placeholder="Full name" autocomplete="off">
        <input type="text" id="adm-email" placeholder="Email" autocomplete="off">
        <input type="text" id="adm-pass" placeholder="Temporary password (8+ characters)" autocomplete="off">
        <button class="btn-load" id="btn-adm-add" type="button">Add admin</button>
      </div>
      <div class="notice" id="adm-note" style="display:none; margin-top:12px;"></div>
    </div>

    <div class="card">
      <div class="card-label">Change your password</div>
      <div class="field">
        <label for="pw-current">Current password</label>
        <input type="password" id="pw-current">
      </div>
      <div class="field">
        <label for="pw-new">New password</label>
        <input type="password" id="pw-new">
      </div>
      <div class="field">
        <label for="pw-confirm">Confirm new password</label>
        <input type="password" id="pw-confirm">
      </div>
      <button class="btn-load" id="btn-pw-save" type="button">Update password</button>
      <div class="notice" id="pw-note" style="display:none; margin-top:12px;"></div>
    </div>
  </div>
  </div>
</section>

<button id="btn-sound" type="button" aria-label="Check-in sound on or off" title="Check-in sound on/off"></button>

<script>
/* ============================================================
   CSG Visitor Check-In Kiosk — vanilla JS version
   To wire up the real Slack notification, replace the body of
   notifyHost() with a fetch() POST to your backend function.
   ============================================================ */

// ---- Employee directory: loaded from the server, managed in the dashboard ----
let EMPLOYEES = [];

async function loadEmployees() {
  try {
    const res = await fetch("/api/employees");
    if (res.ok) EMPLOYEES = await res.json();
  } catch (e) {}
}
loadEmployees();

const REASONS = ["Meeting", "Interview", "First day of employment", "Delivery", "Vendor / Contractor", "Other"];
const CHECKIN_SOUND = new Audio("/checkin.mp3");

const LOGO = "data:image/png;base64,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";

const RESET_SECONDS = 12;      // confirmation auto-return
const IDLE_WARN_MS  = 45000;   // form inactivity before "still there?"
const IDLE_GRACE_S  = 15;      // seconds to respond before reset

const $ = (id) => document.getElementById(id);

$("logo-welcome").src = LOGO;
$("logo-form").src = LOGO;

// ---------- state ----------
let host = null;          // { name, slackId } or null
let planned = null;       // true / false / null
let reason = null;        // string or null
let tried = false;        // has the visitor attempted to submit?
let submitting = false;

// ---------- screens ----------
function show(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(screenId).classList.add("active");
}

// ---------- clock ----------
function tickClock() {
  const now = new Date();
  $("clock-time").textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  $("clock-date").textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}
tickClock();
setInterval(tickClock, 1000);

// ---------- host combobox ----------
const hostInput = $("host");
const dropdown = $("host-dropdown");

function initials(name) {
  return name.split(" ").map(w => w[0]).join("");
}

function renderDropdown(query) {
  const q = query.trim().toLowerCase();
  const matches = q ? EMPLOYEES.filter(e => e.name.toLowerCase().includes(q)) : EMPLOYEES;
  dropdown.innerHTML = "";

  if (matches.length === 0 && q) {
    const div = document.createElement("div");
    div.className = "no-match";
    div.textContent = "No match in the directory — that's okay, we'll use the name as typed.";
    dropdown.appendChild(div);
    return;
  }

  matches.forEach(emp => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option" + (host && host.slackId === emp.slackId ? " selected" : "");
    btn.setAttribute("role", "option");
    btn.innerHTML =
      '<span class="avatar">' + initials(emp.name) + '</span>' +
      '<span></span><span class="tick">✓</span>';
    btn.children[1].textContent = emp.name;
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      hostInput.value = emp.name;
      host = emp;
      updateHostHint();
      closeDropdown();
      validateLive();
    });
    dropdown.appendChild(btn);
  });
}

function openDropdown() {
  renderDropdown(hostInput.value);
  dropdown.classList.add("open");
  hostInput.setAttribute("aria-expanded", "true");
}
function closeDropdown() {
  dropdown.classList.remove("open");
  hostInput.setAttribute("aria-expanded", "false");
}

hostInput.addEventListener("focus", openDropdown);
hostInput.addEventListener("input", () => {
  const v = hostInput.value;
  const exact = EMPLOYEES.find(e => e.name.toLowerCase() === v.trim().toLowerCase());
  // free-typed names are still valid — they just won't have a Slack ID
  host = exact || (v.trim() ? { name: v.trim(), slackId: null } : null);
  updateHostHint();
  openDropdown();
  validateLive();
});

document.addEventListener("pointerdown", (e) => {
  if (!e.target.closest(".host-wrap")) closeDropdown();
});

function updateHostHint() {
  const hint = $("host-hint");
  if (host && host.slackId === null) {
    hint.textContent = '"' + host.name + '" isn\u2019t in the directory \u2014 the front-desk channel will still be notified.';
    hint.classList.add("show");
  } else {
    hint.classList.remove("show");
  }
}

// ---------- planned segmented buttons ----------
document.querySelectorAll(".seg").forEach(btn => {
  btn.addEventListener("click", () => {
    planned = btn.dataset.planned === "yes";
    document.querySelectorAll(".seg").forEach(b => b.classList.toggle("on", b === btn));
    validateLive();
  });
});

// ---------- reason chips ----------
const chipRow = $("chip-row");
const otherInput = $("reason-other-input");

REASONS.forEach(r => {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.textContent = r;
  chip.addEventListener("click", () => {
    reason = r;
    chipRow.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === chip));
    otherInput.classList.toggle("show", r === "Other");
    if (r === "Other") otherInput.focus();
    validateLive();
  });
  chipRow.appendChild(chip);
});
otherInput.addEventListener("input", validateLive);

// ---------- validation ----------
function getErrors() {
  return {
    first:   !$("first").value.trim(),
    last:    !$("last").value.trim(),
    host:    !(host && host.name),
    planned: planned === null,
    reason:  !reason || (reason === "Other" && !otherInput.value.trim()),
  };
}

function paintErrors(errs) {
  $("first").classList.toggle("error", tried && errs.first);
  $("last").classList.toggle("error", tried && errs.last);
  $("host").classList.toggle("error", tried && errs.host);
  $("err-first").classList.toggle("show", tried && errs.first);
  $("err-last").classList.toggle("show", tried && errs.last);
  $("err-host").classList.toggle("show", tried && errs.host);
  $("err-planned").classList.toggle("show", tried && errs.planned);
  $("err-reason").classList.toggle("show", tried && errs.reason);
  $("err-reason").textContent = (reason === "Other")
    ? "Please add a short reason." : "Please pick a reason.";
}

function validateLive() {
  if (tried) paintErrors(getErrors());
}

$("first").addEventListener("input", validateLive);
$("last").addEventListener("input", validateLive);

// ---------- idle watchdog (form screen only) ----------
let lastActivity = Date.now();
let idleInterval = null;
let graceTimer = null;
let graceLeft = IDLE_GRACE_S;

function bump() { lastActivity = Date.now(); }

function startIdleWatch() {
  lastActivity = Date.now();
  idleInterval = setInterval(() => {
    if (!$("idle-overlay").classList.contains("show") &&
        Date.now() - lastActivity > IDLE_WARN_MS) {
      showIdleWarning();
    }
  }, 1000);
}
function stopIdleWatch() {
  clearInterval(idleInterval);
  clearTimeout(graceTimer);
  $("idle-overlay").classList.remove("show");
}

function showIdleWarning() {
  graceLeft = IDLE_GRACE_S;
  $("idle-count").textContent = graceLeft + "s";
  $("idle-overlay").classList.add("show");
  graceTick();
}
function graceTick() {
  graceTimer = setTimeout(() => {
    graceLeft--;
    $("idle-count").textContent = graceLeft + "s";
    if (graceLeft <= 0) { resetKiosk(); } else { graceTick(); }
  }, 1000);
}

$("btn-still-here").addEventListener("click", () => {
  clearTimeout(graceTimer);
  $("idle-overlay").classList.remove("show");
  bump();
});

["pointerdown", "keydown", "input"].forEach(evt => {
  $("screen-form").addEventListener(evt, bump, true);
});

// ---------- navigation ----------
$("btn-start").addEventListener("click", () => {
  show("screen-form");
  startIdleWatch();
  $("first").focus();
});

$("btn-cancel").addEventListener("click", resetKiosk);

function resetKiosk() {
  loadEmployees();
  stopIdleWatch();
  clearTimeout(resetTimer);

  // clear all form state
  ["first", "last", "host"].forEach(id => { $(id).value = ""; });
  otherInput.value = "";
  otherInput.classList.remove("show");
  host = null; planned = null; reason = null; tried = false; submitting = false;
  updateHostHint();
  document.querySelectorAll(".seg, .chip").forEach(b => b.classList.remove("on"));
  paintErrors({ first:false, last:false, host:false, planned:false, reason:false });
  $("btn-submit").disabled = false;
  $("btn-submit").textContent = "Complete check-in";
  closeDropdown();

  show("screen-welcome");
}

// ---------- submit ----------
$("btn-submit").addEventListener("click", () => {
  tried = true;
  const errs = getErrors();
  paintErrors(errs);
  if (Object.values(errs).some(Boolean) || submitting) return;

  submitting = true; // guards against double-taps
  $("btn-submit").disabled = true;
  $("btn-submit").textContent = "Checking you in…";

  const visitor = {
    first: $("first").value.trim(),
    last: $("last").value.trim(),
    host: host,
    planned: planned,
    reason: reason === "Other" ? otherInput.value.trim() : reason,
  };


  playCheckinSound();
  logVisit(visitor);
  notifyHost(visitor);
  showConfirmation(visitor);
});

// --- Slack: paste your incoming-webhook URL between the quotes ---
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

function notifyHost(visitor) {
  const mention = visitor.host.slackId ? "<@" + visitor.host.slackId + ">" : "<!here>";
  const text = "👋 " + mention +
    (visitor.host.slackId
      ? " — " + visitor.first + " " + visitor.last + " has arrived to see you."
      : " — " + visitor.first + " " + visitor.last + " has arrived to see " + visitor.host.name + ".") +
    "\n" + (visitor.planned ? "Planned visit" : "Unplanned visit") + " · " + visitor.reason;

  if (SLACK_WEBHOOK_URL.indexOf("hooks.slack.com") === -1) {
    console.log("Slack webhook not set yet. Check-in:", visitor);
    return;
  }
  fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ text: text }),
  });
}

// ---------- confirmation ----------
let resetTimer = null;

function showConfirmation(visitor) {
  stopIdleWatch();

  $("done-title").textContent = "Thanks, " + visitor.first + "!";
  $("done-sub").textContent =
    visitor.host.name.split(" ")[0] + " has been notified — please wait in the lobby and someone will be with you shortly.";

  // restart the pop animation
  const circle = $("check-circle");
  circle.style.animation = "none";
  void circle.offsetWidth;
  circle.style.animation = "";

  show("screen-done");

  // countdown back to welcome
  let left = RESET_SECONDS;
  $("reset-count").textContent = left;
  $("progress-fill").style.width = "100%";
  const step = () => {
    resetTimer = setTimeout(() => {
      left--;
      $("reset-count").textContent = left;
      $("progress-fill").style.width = (left / RESET_SECONDS * 100) + "%";
      if (left <= 0) { resetKiosk(); } else { step(); }
    }, 1000);
  };
  step();
}

$("btn-done-now").addEventListener("click", resetKiosk);

/* ==================== ADMIN: visitor log, sign-in, dashboard ==================== */

$("logo-login").src = LOGO;

function logVisit(visitor) {
  const row = {
    first: visitor.first,
    last: visitor.last,
    host: visitor.host.name,
    planned: visitor.planned,
    reason: visitor.reason,
  };
  fetch("/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  }).catch(() => {
    // Server unreachable: stash a local backup so the visit isn't lost.
    // Retrieve later from the browser console: localStorage.getItem("csg-visit-backlog")
    try {
      const backlog = JSON.parse(localStorage.getItem("csg-visit-backlog")) || [];
      backlog.push(Object.assign({ ts: new Date().toISOString() }, row));
      localStorage.setItem("csg-visit-backlog", JSON.stringify(backlog));
    } catch (e) {}
  });
}

/* ---------- sign in / out (verified by the server) ---------- */
let adminToken = null;
let adminEmail = null;

async function adminFetch(url, opts) {
  opts = opts || {};
  opts.headers = Object.assign({}, opts.headers || {}, { "x-admin-token": adminToken });
  const res = await fetch(url, opts);
  if (res.status === 401) {
    adminToken = null;
    show("screen-admin-login");
    throw new Error("session expired");
  }
  return res;
}

$("btn-admin").addEventListener("click", () => {
  $("admin-email").value = "";
  $("admin-pass").value = "";
  $("err-login").classList.remove("show");
  show("screen-admin-login");
  $("admin-email").focus();
});
$("btn-login-back").addEventListener("click", () => show("screen-welcome"));

async function tryLogin() {
  const email = $("admin-email").value.trim();
  const password = $("admin-pass").value;
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!res.ok) { $("err-login").classList.add("show"); return; }
    const data = await res.json();
    adminToken = data.token;
    adminEmail = email.trim().toLowerCase();
    $("err-login").classList.remove("show");
    $("admin-name").textContent = data.name;
    $("admin-initials").textContent = initials(data.name);
    show("screen-admin-dash");
    showTab("history");
    applyRange();
  } catch (e) {
    $("err-login").classList.add("show");
  }
}
$("btn-login").addEventListener("click", tryLogin);
$("admin-email").addEventListener("keydown", e => { if (e.key === "Enter") $("admin-pass").focus(); });
$("admin-pass").addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });

$("btn-signout").addEventListener("click", () => {
  if (adminToken) fetch("/api/logout", { method: "POST", headers: { "x-admin-token": adminToken } });
  adminToken = null;
  show("screen-welcome");
});

/* ---------- time ranges ---------- */
const rangeSelect = $("range-select");
rangeSelect.addEventListener("change", () => {
  $("custom-range").classList.toggle("show", rangeSelect.value === "custom");
});

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function endOfDay(d)   { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }
function mondayOf(d)   { const x = startOfDay(d); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; }

function currentRange() {
  const now = new Date();
  if (rangeSelect.value === "thisweek") return [mondayOf(now), endOfDay(now)];
  if (rangeSelect.value === "lastweek") {
    const m = mondayOf(now);
    const from = new Date(m); from.setDate(from.getDate() - 7);
    const to = new Date(m); to.setMilliseconds(-1);
    return [from, to];
  }
  if (rangeSelect.value === "two") {
    const from = startOfDay(now); from.setDate(from.getDate() - 13);
    return [from, endOfDay(now)];
  }
  if (rangeSelect.value === "custom") {
    const fv = $("date-from").value, tv = $("date-to").value;
    const from = fv ? startOfDay(new Date(fv + "T00:00")) : new Date(0);
    const to = tv ? endOfDay(new Date(tv + "T00:00")) : endOfDay(now);
    return [from, to];
  }
  const from = startOfDay(now); from.setDate(from.getDate() - 29); // last 30 days
  return [from, endOfDay(now)];
}

/* ---------- dashboard rendering ---------- */
let lastRows = []; // what's currently on screen

async function fetchVisits() {
  const range = currentRange();
  const url = "/api/visits?from=" + encodeURIComponent(range[0].toISOString()) +
              "&to=" + encodeURIComponent(range[1].toISOString());
  const res = await adminFetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const rows = await res.json();
  return rows.map(r => ({
    first: r.first_name,
    last: r.last_name,
    host: r.host,
    planned: r.planned,
    reason: r.reason,
    ts: r.ts,
  }));
}

async function applyRange() {
  $("export-note").style.display = "none";
  $("visit-list").innerHTML = '<div class="card empty">Loading&hellip;</div>';
  try {
    lastRows = await fetchVisits();
    renderChart(lastRows);
    renderList(lastRows);
  } catch (e) {
    lastRows = [];
    $("chart").innerHTML = "";
    $("visit-list").innerHTML =
      '<div class="card empty">Could not reach the server. Check that the kiosk app is running, then hit Load Results.</div>';
  }
}
$("btn-load").addEventListener("click", applyRange);

function dayKey(d) {
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}
function esc(s) { const div = document.createElement("div"); div.textContent = s; return div.innerHTML; }

function renderChart(rows) {
  const byDay = {};
  rows.forEach(e => {
    const k = dayKey(new Date(e.ts));
    byDay[k] = byDay[k] || { planned: 0, dropin: 0 };
    byDay[k][e.planned ? "planned" : "dropin"]++;
  });
  const keys = Object.keys(byDay).sort();
  const chart = $("chart");
  chart.innerHTML = "";
  if (keys.length === 0) {
    chart.innerHTML = '<div class="empty" style="width:100%">No visits in this range.</div>';
    return;
  }
  const max = Math.max.apply(null, keys.map(k => byDay[k].planned + byDay[k].dropin));
  const labelStep = Math.ceil(keys.length / 12); // keep the x-axis readable
  keys.forEach((k, i) => {
    const d = byDay[k];
    const total = d.planned + d.dropin;
    const label = (i % labelStep === 0)
      ? new Date(k + "T00:00").toLocaleDateString([], { month: "short", day: "numeric" })
      : "\u00A0";
    const col = document.createElement("div");
    col.className = "chart-col";
    col.innerHTML =
      '<div class="chart-count">' + total + '</div>' +
      '<div class="chart-stack" style="height:' + Math.max(12, Math.round(total / max * 132)) + 'px">' +
        (d.dropin  ? '<div class="seg-dropin" style="flex:'  + d.dropin  + '"></div>' : "") +
        (d.planned ? '<div class="seg-planned" style="flex:' + d.planned + '"></div>' : "") +
      '</div>' +
      '<div class="chart-x">' + label + '</div>';
    chart.appendChild(col);
  });
}

function renderList(rows) {
  const wrap = $("visit-list");
  wrap.innerHTML = "";
  if (rows.length === 0) {
    wrap.innerHTML = '<div class="card empty">No check-ins in this range.</div>';
    return;
  }
  const groups = {};
  rows.forEach(e => {
    const k = dayKey(new Date(e.ts));
    (groups[k] = groups[k] || []).push(e);
  });
  Object.keys(groups).sort().reverse().forEach(k => {
    const day = new Date(k + "T00:00");
    const head = document.createElement("div");
    head.className = "day-head";
    head.innerHTML =
      '<span>' + day.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) + '</span>' +
      '<span class="cnt">' + groups[k].length + (groups[k].length === 1 ? " visitor" : " visitors") + '</span>';
    wrap.appendChild(head);
    groups[k].forEach(e => {
      const t = new Date(e.ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      const card = document.createElement("div");
      card.className = "visit";
      card.innerHTML =
        '<span class="avatar">' + esc(initials(e.first + " " + e.last)) + '</span>' +
        '<div class="v-main">' +
          '<div class="v-name">' + esc(e.first + " " + e.last) + '</div>' +
          '<div class="v-meta">Here to see <b>' + esc(e.host) + '</b> &middot; ' + esc(e.reason) + '</div>' +
        '</div>' +
        '<div class="v-right">' +
          '<span class="badge ' + (e.planned ? "planned" : "dropin") + '">' + (e.planned ? "PLANNED" : "DROP-IN") + '</span>' +
          '<span class="v-time">' + t + '</span>' +
        '</div>';
      wrap.appendChild(card);
    });
  });
}

/* ---------- export to Excel (CSV) ---------- */
function csvCell(v) {
  v = String(v == null ? "" : v);
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

$("btn-export").addEventListener("click", async () => {
  const note = $("export-note");
  let rows;
  try {
    rows = await fetchVisits(); // exact same filter as the dropdown
  } catch (e) {
    note.textContent = "Could not reach the server, so nothing was exported.";
    note.style.display = "";
    return;
  }
  if (rows.length === 0) {
    note.textContent = "Nothing to export for this time period.";
    note.style.display = "";
    return;
  }
  const lines = [["Date", "Time", "Visitor First Name", "Visitor Last Name", "Here To See", "Planned Visit", "Reason For Visit"].join(",")];
  rows.forEach(e => {
    const d = new Date(e.ts);
    lines.push([
      d.toLocaleDateString(),
      d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      e.first, e.last, e.host, e.planned ? "Yes" : "No", e.reason,
    ].map(csvCell).join(","));
  });
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "csg-visitor-log-" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  note.textContent = "Exported " + rows.length + (rows.length === 1 ? " visit" : " visits") + ". The file opens directly in Excel.";
  note.style.display = "";
});

/* ---------- tabs ---------- */
function showTab(name) {
  const history = name === "history";
  $("panel-history").classList.toggle("hide", !history);
  $("panel-settings").classList.toggle("hide", history);
  $("tab-history").classList.toggle("active", history);
  $("tab-settings").classList.toggle("active", !history);
  if (!history) { loadEmployeeAdmin(); loadAdmins(); }
}
$("tab-history").addEventListener("click", () => showTab("history"));
$("tab-settings").addEventListener("click", () => showTab("settings"));

/* ---------- manage the check-in name list ---------- */
function empSay(msg) {
  $("emp-note").textContent = msg;
  $("emp-note").style.display = "";
}
function renderEmpAdmin() {
  const wrap = $("emp-list");
  wrap.innerHTML = "";
  if (EMPLOYEES.length === 0) {
    wrap.innerHTML = '<div class="empty">No names yet. Add the first one below.</div>';
    return;
  }
  EMPLOYEES.forEach(e => {
    const row = document.createElement("div");
    row.className = "emp-row";
    row.innerHTML =
      '<span class="avatar">' + esc(initials(e.name)) + '</span>' +
      '<div class="v-main"><div class="v-name">' + esc(e.name) + '</div>' +
      '<div class="v-meta">' + (e.slackId ? "Slack ID: " + esc(e.slackId) : "No Slack ID, pings go to the whole channel") + '</div></div>' +
      '<button class="btn-remove" type="button">Remove</button>';
    row.querySelector(".btn-remove").addEventListener("click", () => removeEmployee(e));
    wrap.appendChild(row);
  });
}
async function loadEmployeeAdmin() {
  await loadEmployees();
  renderEmpAdmin();
}
async function addEmployee() {
  const name = $("emp-name").value.trim();
  const slackId = $("emp-slack").value.trim();
  if (!name) return empSay("Enter the person's full name first.");
  try {
    const res = await adminFetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, slackId: slackId }),
    });
    if (res.status === 409) return empSay("That name is already in the list.");
    if (!res.ok) return empSay("Something went wrong. Try again.");
    $("emp-name").value = "";
    $("emp-slack").value = "";
    empSay("Added " + name + ". The kiosk dropdown updates automatically.");
    loadEmployeeAdmin();
  } catch (e) {}
}
$("btn-emp-add").addEventListener("click", addEmployee);
$("emp-slack").addEventListener("keydown", e => { if (e.key === "Enter") addEmployee(); });

async function removeEmployee(emp) {
  try {
    const res = await adminFetch("/api/employees/" + emp.id, { method: "DELETE" });
    if (!res.ok) return empSay("Something went wrong. Try again.");
    empSay("Removed " + emp.name + ". Past visits keep their name in the history.");
    loadEmployeeAdmin();
  } catch (e) {}
}

/* ---------- change password ---------- */
function pwSay(msg) {
  $("pw-note").textContent = msg;
  $("pw-note").style.display = "";
}
async function changePassword() {
  const current = $("pw-current").value;
  const next = $("pw-new").value;
  const confirmed = $("pw-confirm").value;
  if (next.length < 8) return pwSay("New password must be at least 8 characters.");
  if (next !== confirmed) return pwSay("The new passwords don't match.");
  try {
    const res = await adminFetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: current, next: next }),
    });
    if (res.status === 403) return pwSay("Current password is incorrect.");
    if (!res.ok) return pwSay("Something went wrong. Try again.");
    $("pw-current").value = "";
    $("pw-new").value = "";
    $("pw-confirm").value = "";
    pwSay("Password updated. Use it next time you sign in.");
  } catch (e) {}
}
$("btn-pw-save").addEventListener("click", changePassword);

/* ---------- manage admin accounts ---------- */
function admSay(msg) {
  $("adm-note").textContent = msg;
  $("adm-note").style.display = "";
}
async function loadAdmins() {
  try {
    const res = await adminFetch("/api/admins");
    if (!res.ok) return;
    const admins = await res.json();
    const wrap = $("adm-list");
    wrap.innerHTML = "";
    admins.forEach(a => {
      const row = document.createElement("div");
      row.className = "emp-row";
      const self = a.email === adminEmail;
      row.innerHTML =
        '<span class="avatar">' + esc(initials(a.name)) + '</span>' +
        '<div class="v-main"><div class="v-name">' + esc(a.name) + (self ? " (you)" : "") + '</div>' +
        '<div class="v-meta">' + esc(a.email) + '</div></div>' +
        (self ? "" : '<button class="btn-remove" type="button">Remove</button>');
      if (!self) row.querySelector(".btn-remove").addEventListener("click", () => removeAdmin(a));
      wrap.appendChild(row);
    });
  } catch (e) {}
}
async function addAdmin() {
  const name = $("adm-name").value.trim();
  const email = $("adm-email").value.trim();
  const password = $("adm-pass").value;
  if (!name || !email) return admSay("Enter a name and an email first.");
  if (password.length < 8) return admSay("Temporary password must be at least 8 characters.");
  try {
    const res = await adminFetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    if (res.status === 409) return admSay("An admin with that email already exists.");
    if (!res.ok) return admSay("Something went wrong. Try again.");
    $("adm-name").value = "";
    $("adm-email").value = "";
    $("adm-pass").value = "";
    admSay("Added " + name + ". Have them sign in with the temporary password and change it in Settings.");
    loadAdmins();
  } catch (e) {}
}
$("btn-adm-add").addEventListener("click", addAdmin);

async function removeAdmin(a) {
  try {
    const res = await adminFetch("/api/admins/" + encodeURIComponent(a.email), { method: "DELETE" });
    if (!res.ok) return admSay("Something went wrong. Try again.");
    admSay("Removed " + a.name + ". They can no longer sign in.");
    loadAdmins();
  } catch (e) {}
}

/* Direct admin link: end the URL with #admin to jump straight to sign-in */
if (location.hash === "#admin") $("btn-admin").click();



/* ---------- check-in sound toggle ---------- */
let soundOn = true;
try { soundOn = localStorage.getItem("csg-kiosk-sound") !== "off"; } catch (e) {}

function playCheckinSound() {
  if (!soundOn) return;
  CHECKIN_SOUND.currentTime = 0;
  CHECKIN_SOUND.play().catch(() => {});
}

const ICON_SOUND_ON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3Z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_SOUND_OFF = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3Z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

function renderSoundBtn() {
  $("btn-sound").innerHTML = soundOn ? ICON_SOUND_ON : ICON_SOUND_OFF;
}
$("btn-sound").addEventListener("click", () => {
  soundOn = !soundOn;
  try { localStorage.setItem("csg-kiosk-sound", soundOn ? "on" : "off"); } catch (e) {}
  renderSoundBtn();
  if (soundOn) playCheckinSound(); // quick preview so you know it's back on
});
renderSoundBtn();
</script>
</body>
</html>
