/**
 * Tecipa - 2-Step Quick Quoting & Meeting Scheduling System
 * Dynamic Industry Product Selector & Multi-Product Lead Dispatcher
 * Perfectly Aligned with Section 1 (A Nossa Gama) Filters & Products
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteScheduler();
  initWebhookConfigModal();
});

/* ==========================================================================
   Comprehensive Product Catalog by Industry (Aligned with Section 1)
   ========================================================================== */
const industryProductCatalog = {
  'Hotelaria & Restauração': {
    enIndustry: 'Hospitality & Dining',
    products: [
      // 1. Guardanapos Personalizados (Section 1 #1)
      {
        id: 'dining_napkins',
        namePt: 'Guardanapos Personalizados',
        nameEn: 'Custom Napkins',
        subPt: 'Textura linho & personalização gráfica à medida',
        subEn: 'Linen texture & bespoke graphic customization',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Jantar 40x40 cm (1/8 Dobra)', labelPt: 'Jantar 40×40 cm', labelEn: 'Dinner 40×40 cm', active: true },
          { value: 'Jantar 40x40 cm (Bolso de Talher)', labelPt: 'Jantar (Bolso Talher)', labelEn: 'Dinner (Cutlery Pocket)' },
          { value: 'Almoço 33x33 cm (1/4 Dobra)', labelPt: 'Almoço 33×33 cm', labelEn: 'Lunch 33×33 cm' },
          { value: 'Cocktail 25x25 cm (1/4 Dobra)', labelPt: 'Cocktail 25×25 cm', labelEn: 'Cocktail 25×25 cm' }
        ],
        quantities: [
          { value: '25.000', label: '25.000 un.' },
          { value: '100.000', label: '100.000 un.', active: true },
          { value: '500.000', label: '500.000 un.' },
          { value: '1.000.000+', label: '1M+ un.' }
        ],
        defaultQty: '100.000'
      },
      // 2. Toalhetes Individuais (Section 1 #2)
      {
        id: 'dining_placemats',
        namePt: 'Toalhetes Individuais',
        nameEn: 'Individual Placemats',
        subPt: 'Design coordenado com guardanapos & proteção de mesa',
        subEn: 'Coordinated table design & laundry cost reduction',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Toalhete Individual 30x40 cm', labelPt: 'Toalhete 30×40 cm', labelEn: 'Placemat 30×40 cm', active: true },
          { value: 'Toalhete Individual 35x45 cm', labelPt: 'Toalhete 35×45 cm', labelEn: 'Placemat 35×45 cm' },
          { value: 'Medida Sob Consulta', labelPt: 'Medida Sob Consulta', labelEn: 'Custom Size' }
        ],
        quantities: [
          { value: '25.000', label: '25.000 un.', active: true },
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000', label: '100.000 un.' },
          { value: '250.000+', label: '250.000+ un.' }
        ],
        defaultQty: '25.000'
      },
      // 3. Toalhetes "Chemin de Table" (Section 1 #3)
      {
        id: 'dining_runners',
        namePt: 'Toalhetes "Chemin de Table"',
        nameEn: 'Toalhetes "Chemin de Table"',
        subPt: 'Caminhos de mesa requintados para mesas corridas',
        subEn: 'Refined table runners for dining and bistros',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Chemin de Table 40x120 cm (Pré-corte)', labelPt: 'Chemin 40×120 cm', labelEn: 'Chemin 40×120 cm', active: true },
          { value: 'Rolo 40cm x 24m (Pré-cortado)', labelPt: 'Rolo 40cm × 24m', labelEn: 'Roll 40cm × 24m' },
          { value: 'Rolo Contínuo 40cm x 48m', labelPt: 'Rolo 40cm × 48m', labelEn: 'Roll 40cm × 48m' }
        ],
        quantities: [
          { value: '10.000', label: '10.000 un.' },
          { value: '25.000', label: '25.000 un.', active: true },
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000+', label: '100.000+ un.' }
        ],
        defaultQty: '25.000'
      },
      // 4. Toalha de Base (Section 1 #4)
      {
        id: 'dining_tablecloth',
        namePt: 'Toalha de Base',
        nameEn: 'Base Tablecloth',
        subPt: 'Proteção tradicional e textura de tecido para mesas',
        subEn: 'Traditional protection and cloth texture for dining tables',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Quadrada 120x120 cm', labelPt: 'Quadrada 120×120 cm', labelEn: 'Square 120×120 cm', active: true },
          { value: 'Retangular 140x240 cm', labelPt: 'Retangular 140×240 cm', labelEn: 'Rectangle 140×240 cm' },
          { value: 'Rolo Banquete 1,20m x 50m', labelPt: 'Rolo Banquete 1,20×50m', labelEn: 'Banquet Roll 1.20×50m' }
        ],
        quantities: [
          { value: '2.500', label: '2.500 un.' },
          { value: '5.000', label: '5.000 un.', active: true },
          { value: '15.000', label: '15.000 un.' },
          { value: '50.000+', label: '50.000+ un.' }
        ],
        defaultQty: '5.000'
      }
    ]
  },

  'Aviação Civil': {
    enIndustry: 'Civil Aviation',
    products: [
      // 1. Tray Mats para Aviação Civil (Section 1 #5)
      {
        id: 'aviation_traymats',
        namePt: 'Tray Mats para Aviação Civil',
        nameEn: 'Tray Mats for Civil Aviation',
        subPt: 'Comportamento anti-deslizante seguro e toque têxtil',
        subEn: 'Certified anti-slip stability and soft cloth feel',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Padrão Atlas 27x38 cm (Económica)', labelPt: 'Padrão Atlas 27×38 cm', labelEn: 'Atlas Standard 27×38 cm', active: true },
          { value: 'Primeira Classe 32x42 cm (Executiva)', labelPt: '1ª Classe 32×42 cm', labelEn: 'First Class 32×42 cm' },
          { value: 'Medida Específica Sob Consulta', labelPt: 'Medida Sob Consulta', labelEn: 'Custom Size' }
        ],
        quantities: [
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000', label: '100.000 un.', active: true },
          { value: '250.000', label: '250.000 un.' },
          { value: '1.000.000+', label: '1M+ un.' }
        ],
        defaultQty: '100.000'
      }
    ]
  },

  'Limpeza Industrial': {
    enIndustry: 'Industrial Cleaning',
    products: [
      // 1. Rolos para Limpeza Industrial (Section 1 #6)
      {
        id: 'industry_rolls',
        namePt: 'Rolos para Limpeza Industrial',
        nameEn: 'Industrial Cleaning Rolls',
        subPt: 'Não se desagrega em húmido, substitui trapos e papel com economia',
        subEn: 'Does not tear when wet, highly absorbent replacement for rags',
        unitPt: 'rolos',
        unitEn: 'rolls',
        formats: [
          { value: 'Rolo 300 Panos Pré-cortados (Alta Absorção)', labelPt: 'Rolo 300 Panos', labelEn: 'Roll 300 Cloths', active: true },
          { value: 'Rolo 500 Panos (Uso Intensivo Oficina)', labelPt: 'Rolo 500 Panos', labelEn: 'Roll 500 Cloths' },
          { value: 'Rolo 800 Panos (Linha Pesada)', labelPt: 'Rolo 800 Panos', labelEn: 'Roll 800 Cloths' }
        ],
        quantities: [
          { value: '250', label: '250 rolos' },
          { value: '500', label: '500 rolos', active: true },
          { value: '1.000', label: '1.000 rolos' },
          { value: '5.000+', label: '5.000+ rolos' }
        ],
        defaultQty: '500'
      }
    ]
  },

  'Todos os Produtos': {
    enIndustry: 'All Products',
    products: [
      // 1. Guardanapos Personalizados (Section 1 #1)
      {
        id: 'dining_napkins',
        namePt: 'Guardanapos Personalizados',
        nameEn: 'Custom Napkins',
        subPt: 'Textura linho & personalização gráfica à medida',
        subEn: 'Linen texture & bespoke graphic customization',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Jantar 40x40 cm (1/8 Dobra)', labelPt: 'Jantar 40×40 cm', labelEn: 'Dinner 40×40 cm', active: true },
          { value: 'Jantar 40x40 cm (Bolso de Talher)', labelPt: 'Jantar (Bolso Talher)', labelEn: 'Dinner (Cutlery Pocket)' },
          { value: 'Almoço 33x33 cm (1/4 Dobra)', labelPt: 'Almoço 33×33 cm', labelEn: 'Lunch 33×33 cm' },
          { value: 'Cocktail 25x25 cm (1/4 Dobra)', labelPt: 'Cocktail 25×25 cm', labelEn: 'Cocktail 25×25 cm' }
        ],
        quantities: [
          { value: '25.000', label: '25.000 un.' },
          { value: '100.000', label: '100.000 un.', active: true },
          { value: '500.000', label: '500.000 un.' },
          { value: '1.000.000+', label: '1M+ un.' }
        ],
        defaultQty: '100.000'
      },
      // 2. Toalhetes Individuais (Section 1 #2)
      {
        id: 'dining_placemats',
        namePt: 'Toalhetes Individuais',
        nameEn: 'Individual Placemats',
        subPt: 'Design coordenado com guardanapos & proteção de mesa',
        subEn: 'Coordinated table design & laundry cost reduction',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Toalhete Individual 30x40 cm', labelPt: 'Toalhete 30×40 cm', labelEn: 'Placemat 30×40 cm', active: true },
          { value: 'Toalhete Individual 35x45 cm', labelPt: 'Toalhete 35×45 cm', labelEn: 'Placemat 35×45 cm' },
          { value: 'Medida Sob Consulta', labelPt: 'Medida Sob Consulta', labelEn: 'Custom Size' }
        ],
        quantities: [
          { value: '25.000', label: '25.000 un.', active: true },
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000', label: '100.000 un.' },
          { value: '250.000+', label: '250.000+ un.' }
        ],
        defaultQty: '25.000'
      },
      // 3. Toalhetes "Chemin de Table" (Section 1 #3)
      {
        id: 'dining_runners',
        namePt: 'Toalhetes "Chemin de Table"',
        nameEn: 'Toalhetes "Chemin de Table"',
        subPt: 'Caminhos de mesa requintados para mesas corridas',
        subEn: 'Refined table runners for dining and bistros',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Chemin de Table 40x120 cm (Pré-corte)', labelPt: 'Chemin 40×120 cm', labelEn: 'Chemin 40×120 cm', active: true },
          { value: 'Rolo 40cm x 24m (Pré-cortado)', labelPt: 'Rolo 40cm × 24m', labelEn: 'Roll 40cm × 24m' },
          { value: 'Rolo Contínuo 40cm x 48m', labelPt: 'Rolo 40cm × 48m', labelEn: 'Roll 40cm × 48m' }
        ],
        quantities: [
          { value: '10.000', label: '10.000 un.' },
          { value: '25.000', label: '25.000 un.', active: true },
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000+', label: '100.000+ un.' }
        ],
        defaultQty: '25.000'
      },
      // 4. Toalha de Base (Section 1 #4)
      {
        id: 'dining_tablecloth',
        namePt: 'Toalha de Base',
        nameEn: 'Base Tablecloth',
        subPt: 'Proteção tradicional e textura de tecido para mesas',
        subEn: 'Traditional protection and cloth texture for dining tables',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Quadrada 120x120 cm', labelPt: 'Quadrada 120×120 cm', labelEn: 'Square 120×120 cm', active: true },
          { value: 'Retangular 140x240 cm', labelPt: 'Retangular 140×240 cm', labelEn: 'Rectangle 140×240 cm' },
          { value: 'Rolo Banquete 1,20m x 50m', labelPt: 'Rolo Banquete 1,20×50m', labelEn: 'Banquet Roll 1.20×50m' }
        ],
        quantities: [
          { value: '2.500', label: '2.500 un.' },
          { value: '5.000', label: '5.000 un.', active: true },
          { value: '15.000', label: '15.000 un.' },
          { value: '50.000+', label: '50.000+ un.' }
        ],
        defaultQty: '5.000'
      },
      // 5. Tray Mats para Aviação Civil (Section 1 #5)
      {
        id: 'aviation_traymats',
        namePt: 'Tray Mats para Aviação Civil',
        nameEn: 'Tray Mats for Civil Aviation',
        subPt: 'Comportamento anti-deslizante seguro e toque têxtil',
        subEn: 'Certified anti-slip stability and soft cloth feel',
        unitPt: 'unidades',
        unitEn: 'units',
        formats: [
          { value: 'Padrão Atlas 27x38 cm (Económica)', labelPt: 'Padrão Atlas 27×38 cm', labelEn: 'Atlas Standard 27×38 cm', active: true },
          { value: 'Primeira Classe 32x42 cm (Executiva)', labelPt: '1ª Classe 32×42 cm', labelEn: 'First Class 32×42 cm' },
          { value: 'Medida Específica Sob Consulta', labelPt: 'Medida Sob Consulta', labelEn: 'Custom Size' }
        ],
        quantities: [
          { value: '50.000', label: '50.000 un.' },
          { value: '100.000', label: '100.000 un.', active: true },
          { value: '250.000', label: '250.000 un.' },
          { value: '1.000.000+', label: '1M+ un.' }
        ],
        defaultQty: '100.000'
      },
      // 6. Rolos para Limpeza Industrial (Section 1 #6)
      {
        id: 'industry_rolls',
        namePt: 'Rolos para Limpeza Industrial',
        nameEn: 'Industrial Cleaning Rolls',
        subPt: 'Não se desagrega em húmido, substitui trapos e papel com economia',
        subEn: 'Does not tear when wet, highly absorbent replacement for rags',
        unitPt: 'rolos',
        unitEn: 'rolls',
        formats: [
          { value: 'Rolo 300 Panos Pré-cortados (Alta Absorção)', labelPt: 'Rolo 300 Panos', labelEn: 'Roll 300 Cloths', active: true },
          { value: 'Rolo 500 Panos (Uso Intensivo Oficina)', labelPt: 'Rolo 500 Panos', labelEn: 'Roll 500 Cloths' },
          { value: 'Rolo 800 Panos (Linha Pesada)', labelPt: 'Rolo 800 Panos', labelEn: 'Roll 800 Cloths' }
        ],
        quantities: [
          { value: '250', label: '250 rolos' },
          { value: '500', label: '500 rolos', active: true },
          { value: '1.000', label: '1.000 rolos' },
          { value: '5.000+', label: '5.000+ rolos' }
        ],
        defaultQty: '500'
      }
    ]
  }
};

function initQuoteScheduler() {
  // Form and Stepper Elements
  const step1View = document.getElementById('step1View');
  const step2View = document.getElementById('step2View');
  const successView = document.getElementById('quoteSuccessView');

  const stepIndicator1 = document.getElementById('indicatorStep1');
  const stepIndicator2 = document.getElementById('indicatorStep2');

  const toStep2Btn = document.getElementById('toStep2Btn');
  const toStep2BtnText = document.getElementById('toStep2BtnText');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const submitQuoteBtn = document.getElementById('submitQuoteBtn');
  const restartBtn = document.getElementById('restartQuoteBtn');

  // Summary elements for step 2 & confirmation
  const summaryBox = document.getElementById('quoteSummaryBox');
  const viewPayloadBtn = document.getElementById('viewPayloadBtn');

  // Multi-grid container and tray
  const productMultiGrid = document.getElementById('productMultiGrid');
  const selectedProductsTray = document.getElementById('selectedProductsTray');
  const trayChipsContainer = document.getElementById('trayChipsContainer');
  const trayCountBadge = document.getElementById('trayCountBadge');

  // Progressive Disclosure Groups
  const group1 = document.getElementById('quoteGroup1');
  const group2 = document.getElementById('quoteGroup2');
  const group3 = document.getElementById('quoteGroup3');
  const groupSubmit = document.getElementById('quoteGroupSubmit');

  // State object
  const quoteData = {
    industry: 'Hotelaria & Restauração',
    items: [],
    branding: 'Design Gráfico Personalizado',
<<<<<<< HEAD
    meetingDate: '',
    meetingTime: '11:30',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Lisbon',
=======
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
    contactName: '',
    contactEmail: '',
    companyName: '',
    phone: '',
    notes: ''
  };

  // Map of selected products: productId -> { productId, industry, productLine, sizeAndFold, quantity, moqNotice }
  let selectedProducts = {};
  let userHasManuallySelected = false;

  function isPtLang() {
    const lang = document.documentElement.lang || 'pt';
    return lang !== 'en';
  }

<<<<<<< HEAD
  // Pre-fill default meeting date (tomorrow)
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

=======
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
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

  function collapseGroup(groupEl) {
    if (!groupEl) return;
    groupEl.classList.remove('is-expanded');
    groupEl.classList.add('is-collapsed');
  }

  /* --- Update Button, Tray & Progress --- */
  function updateTrayAndProgress() {
    const isPt = isPtLang();
    const selectedKeys = Object.keys(selectedProducts);
    const count = selectedKeys.length;

    // Update button text
    if (toStep2BtnText) {
      if (count > 1) {
        toStep2BtnText.textContent = isPt
<<<<<<< HEAD
          ? `Avançar para Agendamento (${count}) →`
          : `Proceed to Meeting (${count}) →`;
      } else {
        toStep2BtnText.textContent = isPt
          ? 'Avançar para Agendamento →'
          : 'Proceed to Meeting →';
=======
          ? `Avançar para Pedido de Orçamento (${count}) →`
          : `Proceed to Quote Request (${count}) →`;
      } else {
        toStep2BtnText.textContent = isPt
          ? 'Avançar para Pedido de Orçamento →'
          : 'Proceed to Quote Request →';
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
      }
    }

    // Update Selected Products Tray
    if (selectedProductsTray && trayChipsContainer) {
      if (count > 0) {
        selectedProductsTray.style.display = 'block';
        if (trayCountBadge) trayCountBadge.textContent = count;

        trayChipsContainer.innerHTML = selectedKeys.map(key => {
          const item = selectedProducts[key];
          return `
            <span class="tray-chip">
              <strong>${item.productLine}</strong>: ${item.quantity} (${item.sizeAndFold})
              <button type="button" class="tray-chip-remove" data-remove-product="${key}" title="${isPt ? 'Remover' : 'Remove'}">&times;</button>
            </span>
          `;
        }).join('');

        // Wire remove buttons in tray
        trayChipsContainer.querySelectorAll('[data-remove-product]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const prodId = btn.getAttribute('data-remove-product');
            delete selectedProducts[prodId];
            userHasManuallySelected = true;

            // Uncheck visible card if present in current grid
            const card = document.querySelector(`.product-multi-card[data-product-id="${prodId}"]`);
            if (card) {
              card.classList.remove('is-selected');
            }

            updateTrayAndProgress();
          });
        });
      } else {
        selectedProductsTray.style.display = 'none';
      }
    }

    if (count > 0) {
      expandGroup(group3);
      expandGroup(groupSubmit);
    } else {
      collapseGroup(group3);
      collapseGroup(groupSubmit);
    }
  }

  /* --- Render Products for Selected Industry --- */
  function renderProductsForIndustry(industryName) {
    if (!productMultiGrid) return;
    const isPt = isPtLang();
    const catalogEntry = industryProductCatalog[industryName] || industryProductCatalog['Hotelaria & Restauração'];
    const products = catalogEntry.products;

    productMultiGrid.innerHTML = products.map(prod => {
      const isSelected = !!selectedProducts[prod.id];
      const savedConfig = selectedProducts[prod.id];

      const activeFormatVal = savedConfig ? savedConfig.sizeAndFold : (prod.formats.find(f => f.active)?.value || prod.formats[0].value);
      const activeQtyStr = savedConfig ? savedConfig.quantity : `${prod.defaultQty} ${isPt ? prod.unitPt : prod.unitEn}`;
      // Extract numeric quantity
      const matchQtyNum = activeQtyStr.match(/^[\d.,+]+/);
      const currentQtyVal = matchQtyNum ? matchQtyNum[0] : prod.defaultQty;

      const formatPillsHtml = prod.formats.map(fmt => {
        const isActive = fmt.value === activeFormatVal;
        const label = isPt ? fmt.labelPt : fmt.labelEn;
        return `<button type="button" class="pill-option ${isActive ? 'active' : ''}" data-value="${fmt.value}">${label}</button>`;
      }).join('');

      const qtyPillsHtml = prod.quantities.map(q => {
        const isActive = q.value === currentQtyVal;
        return `<button type="button" class="pill-option ${isActive ? 'active' : ''}" data-value="${q.value}">${q.label}</button>`;
      }).join('');

      return `
        <div class="product-multi-card ${isSelected ? 'is-selected' : ''}" data-product-id="${prod.id}">
          <div class="product-multi-header">
            <div class="product-checkbox">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="product-multi-info">
              <span class="product-multi-title">${isPt ? prod.namePt : prod.nameEn}</span>
              <span class="product-multi-sub">${isPt ? prod.subPt : prod.subEn}</span>
            </div>
          </div>
          <div class="product-drawer">
            <span class="drawer-section-label">${isPt ? 'Dimensões & Formato' : 'Dimensions & Format'}</span>
            <div class="pill-select-group" data-pill-format>
              ${formatPillsHtml}
            </div>

            <span class="drawer-section-label">${isPt ? 'Quantidade Pretendida' : 'Requested Quantity'}</span>
            <div class="pill-select-group" data-pill-qty>
              ${qtyPillsHtml}
            </div>

            <div class="drawer-qty-row">
              <label class="custom-qty-label" style="margin: 0;">${isPt ? 'Ou exata:' : 'Or exact:'}</label>
              <input type="text" class="drawer-qty-input" data-multi-custom-qty value="${currentQtyVal}" placeholder="ex: ${currentQtyVal}">
              <span class="drawer-qty-suffix">${isPt ? prod.unitPt : prod.unitEn}</span>
            </div>

            <div class="moq-notice-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>${isPt ? 'Lote mínimo de produção sob consulta (MOQ)' : 'Minimum order quantity upon request (MOQ)'}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Wire events for newly rendered cards
    const renderedCards = productMultiGrid.querySelectorAll('.product-multi-card');
    renderedCards.forEach(card => {
      const prodId = card.getAttribute('data-product-id');
      const prodData = products.find(p => p.id === prodId);
      const header = card.querySelector('.product-multi-header');

      function syncProductState() {
        if (!card.classList.contains('is-selected')) {
          delete selectedProducts[prodId];
        } else {
          const activeFmtBtn = card.querySelector('[data-pill-format] .pill-option.active');
          const fmtVal = activeFmtBtn ? activeFmtBtn.getAttribute('data-value') : prodData.formats[0].value;

          const customInp = card.querySelector('[data-multi-custom-qty]');
          const activeQtyBtn = card.querySelector('[data-pill-qty] .pill-option.active');
          const suffix = card.querySelector('.drawer-qty-suffix')?.textContent?.trim() || (isPt ? prodData.unitPt : prodData.unitEn);
          
          let qtyVal = customInp && customInp.value.trim().length > 0 ? customInp.value.trim() : (activeQtyBtn ? activeQtyBtn.getAttribute('data-value') : prodData.defaultQty);
          const fullQty = `${qtyVal} ${suffix}`;

          selectedProducts[prodId] = {
            productId: prodId,
            industry: industryName,
            productLine: isPt ? prodData.namePt : prodData.nameEn,
            sizeAndFold: fmtVal,
            quantity: fullQty,
            moqNotice: isPt ? 'Sujeito a quantidade mínima de produção (MOQ sob consulta)' : 'Subject to minimum order quantity (MOQ upon request)'
          };
        }
        updateTrayAndProgress();
      }

      // Card Header Click (toggle selection)
      header.addEventListener('click', () => {
        card.classList.toggle('is-selected');
        userHasManuallySelected = true;
        syncProductState();
      });

      // Format pills
      const formatPills = card.querySelectorAll('[data-pill-format] .pill-option');
      formatPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          formatPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          if (card.classList.contains('is-selected')) {
            syncProductState();
          }
        });
      });

      // Quantity pills
      const qtyPills = card.querySelectorAll('[data-pill-qty] .pill-option');
      const customQtyInput = card.querySelector('[data-multi-custom-qty]');
      qtyPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          qtyPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          if (customQtyInput) {
            customQtyInput.value = pill.getAttribute('data-value');
          }
          if (card.classList.contains('is-selected')) {
            syncProductState();
          }
        });
      });

      // Custom Quantity Input
      if (customQtyInput) {
        customQtyInput.addEventListener('input', (e) => {
          e.stopPropagation();
          qtyPills.forEach(p => p.classList.remove('active'));
          if (card.classList.contains('is-selected')) {
            syncProductState();
          }
        });
        customQtyInput.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
    });
  }

  /* --- 1. Sector Selection Click Handler --- */
  const indCards = document.querySelectorAll('[data-quote-industry]');
  indCards.forEach(card => {
    card.addEventListener('click', () => {
      const newIndustry = card.getAttribute('data-value');
      if (newIndustry === quoteData.industry && productMultiGrid.children.length > 0) {
        expandGroup(group2);
        return;
      }

      indCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      quoteData.industry = newIndustry;

      renderProductsForIndustry(newIndustry);
      updateTrayAndProgress();
      expandGroup(group2);
    });
  });

  /* --- Section 1 "Pedir Cotação" Interactivity --- */
  const section1Triggers = document.querySelectorAll('[data-quote-trigger]');
  section1Triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetIndustry = btn.getAttribute('data-target-industry');
      const targetProductId = btn.getAttribute('data-target-product');

      if (targetIndustry) {
        // Find and select corresponding industry card
        indCards.forEach(c => {
          if (c.getAttribute('data-value') === targetIndustry) {
            c.classList.add('selected');
          } else {
            c.classList.remove('selected');
          }
        });
        quoteData.industry = targetIndustry;
        renderProductsForIndustry(targetIndustry);

        // Select the specific product card
        if (targetProductId) {
          const card = productMultiGrid.querySelector(`.product-multi-card[data-product-id="${targetProductId}"]`);
          if (card) {
            card.classList.add('is-selected');
            const prodData = (industryProductCatalog[targetIndustry] || industryProductCatalog['Hotelaria & Restauração']).products.find(p => p.id === targetProductId);
            if (prodData) {
              const isPt = isPtLang();
              const activeFmtBtn = card.querySelector('[data-pill-format] .pill-option.active');
              const fmtVal = activeFmtBtn ? activeFmtBtn.getAttribute('data-value') : prodData.formats[0].value;
              const activeQtyBtn = card.querySelector('[data-pill-qty] .pill-option.active');
              const qtyVal = activeQtyBtn ? activeQtyBtn.getAttribute('data-value') : prodData.defaultQty;
              const suffix = isPt ? prodData.unitPt : prodData.unitEn;

              selectedProducts[targetProductId] = {
                productId: targetProductId,
                industry: targetIndustry,
                productLine: isPt ? prodData.namePt : prodData.nameEn,
                sizeAndFold: fmtVal,
                quantity: `${qtyVal} ${suffix}`,
                moqNotice: isPt ? 'Sujeito a quantidade mínima de produção (MOQ sob consulta)' : 'Subject to minimum order quantity (MOQ upon request)'
              };
            }
          }
        }

        updateTrayAndProgress();
        expandGroup(group2);
        expandGroup(group3);
        expandGroup(groupSubmit);
      }
    });
  });

  /* --- Initial Setup on Page Load --- */
  // Strictly collapsed initial state for groups 2, 3, and submit
  selectedProducts = {};
  userHasManuallySelected = false;

  [group2, group3, groupSubmit].forEach(g => {
    if (g) {
      g.classList.remove('is-expanded');
      g.classList.add('is-collapsed');
    }
  });

  if (group1) {
    group1.classList.remove('is-collapsed');
    group1.classList.add('is-expanded');
  }

  updateTrayAndProgress();

  /* --- 3. Branding Selection --- */
  const brandCards = document.querySelectorAll('[data-quote-branding]');
  brandCards.forEach(card => {
    card.addEventListener('click', () => {
      brandCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      quoteData.branding = card.querySelector('.card-name')?.textContent?.trim() || card.getAttribute('data-value');
    });
  });

  /* --- Helper: Collect all selected products --- */
  function collectSelectedProducts() {
    return Object.values(selectedProducts).map((item, idx) => ({
      ...item,
      itemNumber: idx + 1
    }));
  }

  /* --- Step Navigation --- */
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      const items = collectSelectedProducts();
      if (items.length === 0) {
        const isPt = isPtLang();
        alert(isPt ? 'Por favor, selecione pelo menos um produto para continuar.' : 'Please select at least one product to proceed.');
        return;
      }

      quoteData.items = items;
      const selBrand = document.querySelector('[data-quote-branding].selected .card-name')?.textContent?.trim();
      if (selBrand) quoteData.branding = selBrand;

      step1View.style.display = 'none';
      step2View.style.display = 'block';

      stepIndicator1.classList.remove('active');
      stepIndicator1.classList.add('completed');
      stepIndicator2.classList.add('active');

      // Update summary preview in step 2 header
      const previewEl = document.getElementById('step2SpecPreview');
      if (previewEl) {
        if (quoteData.items.length === 1) {
          const item = quoteData.items[0];
          previewEl.textContent = `${quoteData.industry} • ${item.productLine} (${item.quantity})`;
        } else {
          const summaryStr = quoteData.items.map(i => `${i.productLine} (${i.quantity})`).join(' + ');
          previewEl.textContent = `${quoteData.industry} • ${quoteData.items.length} Produtos: ${summaryStr}`;
        }
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
      [group1, group2, group3, groupSubmit].forEach(g => {
        if (g) {
          g.classList.remove('is-collapsed');
          g.classList.add('is-expanded');
        }
      });
    });
  }

  // Listen for language switch to update placeholders, products & button texts
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
    } else {
      if (nameInp) nameInp.placeholder = 'ex: Manuel Silva';
      if (emailInp) emailInp.placeholder = 'nome@empresa.pt';
      if (compInp) compInp.placeholder = 'ex: Restaurante / Hotel / Companhia Aérea';
      if (phoneInp) phoneInp.placeholder = '233 000 000 ou +351 900 000 000';
      if (notesInp) notesInp.placeholder = 'Indique detalhes sobre as dimensões pretendidas, envio de logótipo para amostras, ou datas limite...';
    }

    // Re-render product grid in current language if already populated
    if (quoteData.industry && productMultiGrid && productMultiGrid.children.length > 0) {
      renderProductsForIndustry(quoteData.industry);
    }
    updateTrayAndProgress();
  });

<<<<<<< HEAD
  /* --- Step 2 Time Slot Buttons --- */
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');
  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeSlotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quoteData.meetingTime = btn.getAttribute('data-time');
    });
  });

=======
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
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
<<<<<<< HEAD
      quoteData.meetingDate = document.getElementById('meetingDateInput')?.value || quoteData.meetingDate;

      // Basic Validation
      if (!quoteData.contactName || !quoteData.contactEmail || !quoteData.companyName) {
        alert('Please fill in your Name, Work Email, and Company Name to schedule your consultation.');
=======

      // Basic Validation
      if (!quoteData.contactName || !quoteData.contactEmail || !quoteData.companyName) {
        alert(isPtLang()
          ? 'Por favor preencha o seu Nome, Email profissional e Nome da Empresa para solicitar o seu orçamento.'
          : 'Please fill in your Name, Work Email, and Company Name to request your quote.');
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(quoteData.contactEmail)) {
<<<<<<< HEAD
        alert('Please provide a valid business email address.');
=======
        alert(isPtLang()
          ? 'Por favor indique um endereço de email profissional válido.'
          : 'Please provide a valid business email address.');
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
        return;
      }

      // Prepare structured n8n payload with multiple items and MOQ notice
      const payload = {
        source: 'tecipa_b2b_website',
        submittedAt: new Date().toISOString(),
        quote: {
          industry: quoteData.industry,
          totalProducts: quoteData.items.length,
          brandingMethod: quoteData.branding,
          moqNotice: 'Produção personalizada sujeita a quantidades mínimas de encomenda (MOQ) de acordo com o formato e tipo de personalização. Lotes industriais sob consulta.',
          items: quoteData.items.map(item => ({
            itemNumber: item.itemNumber,
            productLine: item.productLine,
            sizeAndFold: item.sizeAndFold,
            requestedQuantity: item.quantity,
            moqNotice: item.moqNotice
          })),
          // Backward compatibility summary strings:
          productLine: quoteData.items.map(i => `${i.productLine} (${i.quantity})`).join(' + '),
          sizeAndFold: quoteData.items.map(i => i.sizeAndFold).join(', '),
          estimatedMonthlyVolume: quoteData.items.map(i => i.quantity).join(', ')
        },
<<<<<<< HEAD
        meeting: {
          scheduledDate: quoteData.meetingDate,
          scheduledTime: quoteData.meetingTime,
          clientTimezone: quoteData.timezone
        },
=======
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
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
            const itemsSummaryHtml = quoteData.items.map((item, idx) => `
              <div class="summary-row" style="background: var(--slate-100); padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-left: 3px solid var(--primary); display: block;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.95rem; margin-bottom: 0.35rem;">
                  ${quoteData.items.length > 1 ? `Produto ${idx + 1}: ` : ''}${item.productLine}
                </div>
                <div style="font-size: 0.85rem; color: var(--slate-700); line-height: 1.5;">
                  <strong>Quantidade Pretendida:</strong> ${item.quantity}<br>
                  <strong>Dimensões & Formato:</strong> ${item.sizeAndFold}<br>
                  <em style="color: var(--slate-500); font-size: 0.78rem;">ℹ️ ${item.moqNotice}</em>
                </div>
              </div>
            `).join('');

            summaryBox.innerHTML = `
              <div class="summary-row">
<<<<<<< HEAD
                <span class="label">Reunião / Consulta:</span>
                <span class="val">${quoteData.meetingDate} às ${quoteData.meetingTime} (${quoteData.timezone})</span>
              </div>
              <div class="summary-row">
                <span class="label">Representante / Contacto:</span>
                <span class="val">${quoteData.contactName} (${quoteData.companyName})</span>
              </div>
              <div class="summary-row">
                <span class="label">Sector de Atividade:</span>
                <span class="val">${quoteData.industry}</span>
              </div>
              <div class="summary-row">
                <span class="label">Personalização:</span>
                <span class="val">${quoteData.branding}</span>
              </div>
              <div style="margin-top: 0.75rem; margin-bottom: 0.75rem;">
                <span class="label" style="display: block; margin-bottom: 0.5rem; font-weight: 700;">Produtos Pretendidos (${quoteData.items.length}):</span>
=======
                <span class="label">${isPt ? 'Representante / Contacto:' : 'Representative / Contact:'}</span>
                <span class="val">${quoteData.contactName} (${quoteData.companyName})</span>
              </div>
              <div class="summary-row">
                <span class="label">${isPt ? 'Email / Telefone:' : 'Email / Phone:'}</span>
                <span class="val">${quoteData.contactEmail}${quoteData.phone ? ` • ${quoteData.phone}` : ''}</span>
              </div>
              <div class="summary-row">
                <span class="label">${isPt ? 'Sector de Atividade:' : 'Industry:'}</span>
                <span class="val">${quoteData.industry}</span>
              </div>
              <div class="summary-row">
                <span class="label">${isPt ? 'Personalização:' : 'Customization:'}</span>
                <span class="val">${quoteData.branding}</span>
              </div>
              ${quoteData.notes ? `
              <div class="summary-row">
                <span class="label">${isPt ? 'Notas / Especificações:' : 'Notes / Specifications:'}</span>
                <span class="val">${quoteData.notes}</span>
              </div>
              ` : ''}
              <div style="margin-top: 0.75rem; margin-bottom: 0.75rem;">
                <span class="label" style="display: block; margin-bottom: 0.5rem; font-weight: 700;">${isPt ? `Produtos Pretendidos (${quoteData.items.length}):` : `Requested Products (${quoteData.items.length}):`}</span>
>>>>>>> d374175 (feat(tecipa): add Tecipa B2B website with configurator and quote system)
                ${itemsSummaryHtml}
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

      // Reset selection state
      userHasManuallySelected = false;
      selectedProducts = {};

      // Reset industry selection
      indCards.forEach(c => c.classList.remove('selected'));
      quoteData.industry = '';

      if (productMultiGrid) productMultiGrid.innerHTML = '';
      updateTrayAndProgress();

      // Re-collapse progressive groups 2, 3, submit
      [group2, group3, groupSubmit].forEach(g => {
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
          <pre style="background: #0b1120; color: #38bdf8; padding: 1.25rem; border-radius: 0; font-size: 0.82rem; overflow-x: auto; max-height: 360px;" id="payloadCode"></pre>
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
