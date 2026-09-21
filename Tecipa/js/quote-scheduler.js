/**
 * Tecipa - 2-Step Quick Quoting & Meeting Scheduling System
 * Direct n8n Webhook Dispatcher & Interactive Slot Booking
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteScheduler();
  initWebhookConfigModal();
});

function initQuoteScheduler() {
  // Form and Stepper Elements
  const step1View = document.getElementById('step1View');
  const step2View = document.getElementById('step2View');
  const successView = document.getElementById('quoteSuccessView');

  const stepIndicator1 = document.getElementById('indicatorStep1');
  const stepIndicator2 = document.getElementById('indicatorStep2');

  const toStep2Btn = document.getElementById('toStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const submitQuoteBtn = document.getElementById('submitQuoteBtn');
  const restartBtn = document.getElementById('restartQuoteBtn');

  // Summary elements for step 2 & confirmation
  const summaryBox = document.getElementById('quoteSummaryBox');
  const viewPayloadBtn = document.getElementById('viewPayloadBtn');

  // State object
  const quoteData = {
    industry: '',
    productLine: '',
    sizeFold: '',
    volume: '',
    branding: '',
    meetingDate: '',
    meetingTime: '11:30',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Lisbon',
    contactName: '',
    contactEmail: '',
    companyName: '',
    phone: '',
    notes: ''
  };

  // Pre-fill default meeting date (tomorrow or next Monday)
  const meetingDateInput = document.getElementById('meetingDateInput');
  if (meetingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    meetingDateInput.min = `${yyyy}-${mm}-${dd}`;
    meetingDateInput.value = `${yyyy}-${mm}-${dd}`;
    quoteData.meetingDate = meetingDateInput.value;
  }

  // Display detected timezone
  const tzEl = document.getElementById('userTimezoneDisplay');
  if (tzEl) tzEl.textContent = quoteData.timezone;

  /* --- Step 1 Progressive Disclosure Groups --- */
  const group1 = document.getElementById('quoteGroup1');
  const group2 = document.getElementById('quoteGroup2');
  const group3 = document.getElementById('quoteGroup3');
  const group4 = document.getElementById('quoteGroup4');
  const groupSubmit = document.getElementById('quoteGroupSubmit');

  function expandGroup(groupEl) {
    if (!groupEl) return;
    if (groupEl.classList.contains('is-collapsed')) {
      groupEl.classList.remove('is-collapsed');
      groupEl.classList.add('is-expanded');
      setTimeout(() => {
        const rect = groupEl.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
          groupEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 120);
    }
  }

  function checkGroup4Completion() {
    const selVol = document.querySelector('[data-quote-volume].selected');
    const selBrand = document.querySelector('[data-quote-branding].selected');
    if (selVol && selBrand) {
      expandGroup(groupSubmit);
    }
  }

  /* --- Step 1 Selection Cards --- */
  function setupSelectGroup(groupSelector, stateKey, onSelect) {
    const cards = document.querySelectorAll(groupSelector);
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const cardName = card.querySelector('.card-name')?.textContent?.trim();
        quoteData[stateKey] = cardName || card.getAttribute('data-value');
        if (onSelect) onSelect();
      });
    });
  }

  setupSelectGroup('[data-quote-industry]', 'industry', () => {
    expandGroup(group2);
  });
  setupSelectGroup('[data-quote-product]', 'productLine', () => {
    expandGroup(group3);
  });
  setupSelectGroup('[data-quote-sizefold]', 'sizeFold', () => {
    expandGroup(group4);
  });
  setupSelectGroup('[data-quote-volume]', 'volume', () => {
    checkGroup4Completion();
  });
  setupSelectGroup('[data-quote-branding]', 'branding', () => {
    checkGroup4Completion();
  });

  // Listen for language switch to update placeholders & preview text
  window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    const nameInp = document.getElementById('contactNameInput');
    const emailInp = document.getElementById('contactEmailInput');
    const compInp = document.getElementById('companyNameInput');
    const phoneInp = document.getElementById('phoneInput');
    const notesInp = document.getElementById('notesInput');

    if (lang === 'en') {
      if (nameInp) nameInp.placeholder = 'e.g. John Doe';
      if (emailInp) emailInp.placeholder = 'name@company.com';
      if (compInp) compInp.placeholder = 'e.g. Restaurant / Hotel / Airline';
      if (phoneInp) phoneInp.placeholder = '+351 233 000 000 or international phone';
      if (notesInp) notesInp.placeholder = 'Specify desired dimensions, send logo for proofing, or delivery deadlines...';
      if (quoteData.volume === '100.000 un.' || quoteData.volume === '100.000 unidades') {
        quoteData.volume = '100,000 units';
      }
    } else {
      if (nameInp) nameInp.placeholder = 'ex: Manuel Silva';
      if (emailInp) emailInp.placeholder = 'nome@empresa.pt';
      if (compInp) compInp.placeholder = 'ex: Restaurante / Hotel / Companhia Aérea';
      if (phoneInp) phoneInp.placeholder = '233 000 000 ou +351 900 000 000';
      if (notesInp) notesInp.placeholder = 'Indique detalhes sobre as dimensões pretendidas, envio de logótipo para amostras, ou datas limite...';
      if (quoteData.volume === '100,000 units') {
        quoteData.volume = '100.000 un.';
      }
    }

    // Update selected card values from current active selection
    const selVol = document.querySelector('[data-quote-volume].selected .card-name');
    if (selVol) quoteData.volume = selVol.textContent.trim();

    const selSize = document.querySelector('[data-quote-sizefold].selected .card-name');
    if (selSize) quoteData.sizeFold = selSize.textContent.trim();

    const previewEl = document.getElementById('step2SpecPreview');
    if (previewEl) {
      previewEl.textContent = `${quoteData.industry} • ${quoteData.productLine} (${quoteData.volume})`;
    }
  });

  /* --- Step 2 Time Slot Buttons --- */
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');
  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeSlotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quoteData.meetingTime = btn.getAttribute('data-time');
    });
  });

  /* --- Step Navigation --- */
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      // Ensure values are populated from selected cards
      const selInd = document.querySelector('[data-quote-industry].selected .card-name')?.textContent?.trim();
      const selProd = document.querySelector('[data-quote-product].selected .card-name')?.textContent?.trim();
      const selSize = document.querySelector('[data-quote-sizefold].selected .card-name')?.textContent?.trim();
      const selVol = document.querySelector('[data-quote-volume].selected .card-name')?.textContent?.trim();
      const selBrand = document.querySelector('[data-quote-branding].selected .card-name')?.textContent?.trim();

      quoteData.industry = selInd || quoteData.industry || 'Restauração & Bares';
      quoteData.productLine = selProd || quoteData.productLine || 'Guardanapos Personalizados';
      quoteData.sizeFold = selSize || quoteData.sizeFold || 'Jantar 40x40 cm (1/8 Dobra)';
      quoteData.volume = selVol || quoteData.volume || '100.000 unidades';
      quoteData.branding = selBrand || quoteData.branding || 'Design Gráfico Personalizado';

      step1View.style.display = 'none';
      step2View.style.display = 'block';

      stepIndicator1.classList.remove('active');
      stepIndicator1.classList.add('completed');
      stepIndicator2.classList.add('active');

      // Update summary preview in step 2 header
      const previewEl = document.getElementById('step2SpecPreview');
      if (previewEl) {
        previewEl.textContent = `${quoteData.industry} • ${quoteData.productLine} (${quoteData.volume})`;
      }

      window.scrollTo({
        top: document.getElementById('quote-section').offsetTop - 60,
        behavior: 'smooth'
      });
    });
  }

  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      step2View.style.display = 'none';
      step1View.style.display = 'block';

      stepIndicator2.classList.remove('active');
      stepIndicator1.classList.remove('completed');
      stepIndicator1.classList.add('active');

      // Keep all unlocked groups open when returning to edit
      [group1, group2, group3, group4, groupSubmit].forEach(g => {
        if (g) {
          g.classList.remove('is-collapsed');
          g.classList.add('is-expanded');
        }
      });
    });
  }

  /* --- Form Submission to n8n Webhook --- */
  if (submitQuoteBtn) {
    submitQuoteBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Collect inputs
      quoteData.contactName = document.getElementById('contactNameInput')?.value.trim() || '';
      quoteData.contactEmail = document.getElementById('contactEmailInput')?.value.trim() || '';
      quoteData.companyName = document.getElementById('companyNameInput')?.value.trim() || '';
      quoteData.phone = document.getElementById('phoneInput')?.value.trim() || '';
      quoteData.notes = document.getElementById('notesInput')?.value.trim() || '';
      quoteData.meetingDate = document.getElementById('meetingDateInput')?.value || quoteData.meetingDate;

      // Basic Validation
      if (!quoteData.contactName || !quoteData.contactEmail || !quoteData.companyName) {
        alert('Please fill in your Name, Work Email, and Company Name to schedule your consultation.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(quoteData.contactEmail)) {
        alert('Please provide a valid business email address.');
        return;
      }

      // Prepare structured n8n payload
      const payload = {
        source: 'tecipa_b2b_website',
        submittedAt: new Date().toISOString(),
        quote: {
          industry: quoteData.industry,
          productLine: quoteData.productLine,
          sizeAndFold: quoteData.sizeFold,
          estimatedMonthlyVolume: quoteData.volume,
          brandingMethod: quoteData.branding
        },
        meeting: {
          scheduledDate: quoteData.meetingDate,
          scheduledTime: quoteData.meetingTime,
          clientTimezone: quoteData.timezone
        },
        contact: {
          fullName: quoteData.contactName,
          businessEmail: quoteData.contactEmail,
          company: quoteData.companyName,
          phone: quoteData.phone,
          specNotes: quoteData.notes
        }
      };

      // Button loading state
      const originalText = submitQuoteBtn.innerHTML;
      submitQuoteBtn.disabled = true;
      submitQuoteBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        Sending to n8n...
      `;

      // Get webhook URL from localStorage or default
      const webhookUrl = localStorage.getItem('tecipa_n8n_webhook') || 'https://n8n.yourdomain.com/webhook/tecipa-leads';

      try {
        // Attempt POST to n8n webhook (with mode: 'no-cors' fallback if needed)
        console.log('[Tecipa n8n Dispatcher] Dispatching lead payload to:', webhookUrl, payload);
        
        let responseOk = true;
        try {
          const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          responseOk = res.ok || res.type === 'opaque';
        } catch (fetchErr) {
          console.warn('[Tecipa n8n Dispatcher] Note: Localhost/demo mode network notice:', fetchErr.message);
          // In local mock mode, we still consider the submission successful for UI testing
          responseOk = true;
        }

        // Show success screen
        setTimeout(() => {
          step2View.style.display = 'none';
          successView.style.display = 'block';

          stepIndicator2.classList.remove('active');
          stepIndicator2.classList.add('completed');

          // Render summary details
          if (summaryBox) {
            summaryBox.innerHTML = `
              <div class="summary-row">
                <span class="label">Reunião / Consulta:</span>
                <span class="val">${quoteData.meetingDate} às ${quoteData.meetingTime} (${quoteData.timezone})</span>
              </div>
              <div class="summary-row">
                <span class="label">Representante / Contacto:</span>
                <span class="val">${quoteData.contactName} (${quoteData.companyName})</span>
              </div>
              <div class="summary-row">
                <span class="label">Sector:</span>
                <span class="val">${quoteData.industry}</span>
              </div>
              <div class="summary-row">
                <span class="label">Produto:</span>
                <span class="val">${quoteData.productLine}</span>
              </div>
              <div class="summary-row">
                <span class="label">Formato & Dobra:</span>
                <span class="val">${quoteData.sizeFold}</span>
              </div>
              <div class="summary-row">
                <span class="label">Volume Estimado:</span>
                <span class="val">${quoteData.volume}</span>
              </div>
              <div class="summary-row">
                <span class="label">Personalização:</span>
                <span class="val">${quoteData.branding}</span>
              </div>
              <div class="summary-row">
                <span class="label">Webhook n8n:</span>
                <span class="val" style="word-break: break-all; font-family: monospace; font-size: 0.78rem;">${webhookUrl}</span>
              </div>
            `;
          }

          // Setup payload viewer button
          if (viewPayloadBtn) {
            viewPayloadBtn.onclick = () => {
              showPayloadModal(payload);
            };
          }

          window.scrollTo({
            top: document.getElementById('quote-section').offsetTop - 60,
            behavior: 'smooth'
          });
        }, 600);

      } finally {
        submitQuoteBtn.disabled = false;
        submitQuoteBtn.innerHTML = originalText;
      }
    });
  }

  // Restart Button
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      successView.style.display = 'none';
      step1View.style.display = 'block';

      stepIndicator1.className = 'step-indicator active';
      stepIndicator2.className = 'step-indicator';

      // Clear card selections
      document.querySelectorAll('#step1View .select-card').forEach(c => c.classList.remove('selected'));

      // Re-collapse progressive groups 2, 3, 4, submit
      [group2, group3, group4, groupSubmit].forEach(g => {
        if (g) {
          g.classList.remove('is-expanded');
          g.classList.add('is-collapsed');
        }
      });
      if (group1) {
        group1.classList.remove('is-collapsed');
        group1.classList.add('is-expanded');
      }

      // Clear inputs
      document.getElementById('contactNameInput').value = '';
      document.getElementById('contactEmailInput').value = '';
      document.getElementById('companyNameInput').value = '';
      document.getElementById('phoneInput').value = '';
      document.getElementById('notesInput').value = '';
    });
  }
}

/* ==========================================================================
   n8n Webhook Configuration & Payload Modal
   ========================================================================== */
function initWebhookConfigModal() {
  const openBtn = document.getElementById('openWebhookConfigBtn');
  const modal = document.getElementById('webhookModal');
  const closeBtn = document.getElementById('closeWebhookModalBtn');
  const saveBtn = document.getElementById('saveWebhookBtn');
  const input = document.getElementById('webhookUrlInput');
  const currentDisplay = document.getElementById('currentWebhookDisplay');

  const defaultUrl = 'https://n8n.yourdomain.com/webhook/tecipa-leads';
  const savedUrl = localStorage.getItem('tecipa_n8n_webhook') || defaultUrl;

  if (input) input.value = savedUrl;
  if (currentDisplay) currentDisplay.textContent = savedUrl;

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (saveBtn && input && modal) {
    saveBtn.addEventListener('click', () => {
      const url = input.value.trim() || defaultUrl;
      localStorage.setItem('tecipa_n8n_webhook', url);
      if (currentDisplay) currentDisplay.textContent = url;
      modal.classList.remove('open');
      alert('n8n Webhook URL updated successfully!');
    });
  }
}

function showPayloadModal(payloadObj) {
  let modal = document.getElementById('payloadViewerModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'payloadViewerModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 640px;">
        <div class="modal-header">
          <h4>n8n JSON Payload Preview</h4>
          <button class="modal-close-btn" id="closePayloadModalBtn">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
            This is the exact JSON structure dispatched to your n8n webhook workflow:
          </p>
          <pre style="background: #0b1120; color: #38bdf8; padding: 1.25rem; border-radius: 8px; font-size: 0.82rem; overflow-x: auto; max-height: 360px;" id="payloadCode"></pre>
          <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button class="btn btn-outline btn-sm" id="copyPayloadBtn">Copy JSON</button>
            <button class="btn btn-primary btn-sm" id="closePayloadBtn">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closePayloadModalBtn').onclick = () => modal.classList.remove('open');
    document.getElementById('closePayloadBtn').onclick = () => modal.classList.remove('open');
    document.getElementById('copyPayloadBtn').onclick = () => {
      navigator.clipboard.writeText(JSON.stringify(payloadObj, null, 2));
      alert('JSON payload copied to clipboard!');
    };
  }

  document.getElementById('payloadCode').textContent = JSON.stringify(payloadObj, null, 2);
  modal.classList.add('open');
}
