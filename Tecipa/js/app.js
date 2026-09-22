/**
 * Tecipa - Main Interactive Application Logic
 * Bilingual (PT / EN) Switcher, Napkin Dimension & Fold Visualizer, Filters & Navigation
 */

// Global language state (defaults to 'pt')
let currentLang = localStorage.getItem('tecipa_lang') || 'pt';

// Bilingual Dictionary based on Tecipa's real content
const i18n = {
  pt: {
    // Navigation
    nav_tagline: "A Magia do Tecido Não Tecido",
    nav_fold: "Dobras & Dimensões",
    nav_products: "Produtos & Sectores",
    nav_advantages: "Vantagens",
    nav_about: "A Empresa",
    nav_quote_btn: "Pedir Orçamento",
    nav_webhook: "Webhook n8n",

    // Hero
    hero_badge: "Fundada em 1998 • Figueira da Foz, Portugal",
    hero_title: "A Magia do <span class='gold'>Tecido Não Tecido</span>",
    hero_subtitle: "Consegue imaginar aquilo que o Tecido não Tecido pode fazer por si e pela sua empresa? Com características únicas, permite conciliar design e funcionalidade num só produto. Desde a Hotelaria e Restauração, à Indústria e Aviação Civil, os nossos clientes reconhecem a vantagem da Tecipa.",
    hero_cta_quote: "Pedir Orçamento",
    hero_cta_fold: "Guia de Dobras & Formatos",
    hero_trust_1: "Design Gráfico Personalizado",
    hero_trust_2: "Elevada Absorção & Resistência",
    hero_trust_3: "Aviação Civil, Hotelaria & Indústria",

    // Fold Guide
    fold_tag: "Ferramenta Interativa",
    fold_title: "Guia de Dimensões e Dobras de Guardanapos",
    fold_desc: "Em várias texturas, cores e dimensões, é possível personalizar e criar um design exclusivo adaptado à atmosfera do seu espaço ou companhia aérea.",
    fold_label_dim: "1. Dimensões",
    fold_label_dim_hint: "Tamanho Aberto",
    fold_label_fold: "2. Tipo de Dobra",
    fold_label_fold_hint: "Apresentação na Mesa",
    fold_label_mat: "3. Tecido & Textura",
    fold_label_mat_hint: "Toque e Gramagem",
    fold_label_imp: "4. Estilo de Impressão",
    fold_label_imp_hint: "Personalização",
    fold_cocktail: "Cocktail",
    fold_cocktail_sub: "25 × 25 cm",
    fold_lunch: "Almoço",
    fold_lunch_sub: "33 × 33 cm",
    fold_dinner: "Jantar",
    fold_dinner_sub: "40 × 40 cm",
    fold_1_4: "1/4 Dobra",
    fold_1_4_sub: "Quadrada Tradicional",
    fold_1_8: "1/8 Dobra",
    fold_1_8_sub: "Banquete & Aviação",
    fold_pocket: "Bolso de Talher",
    fold_pocket_sub: "Higiénico para Talheres",
    fold_mat_airlaid: "Tecido Airlaid Luxo",
    fold_mat_airlaid_sub: "Toque de Tecido • 55–65 g/m²",
    fold_mat_tissue: "Tissue Folha Múltipla",
    fold_mat_tissue_sub: "2 ou 3 Folhas • Pura Celulose",
    fold_imp_foil: "Estampa Dourada",
    fold_imp_foil_sub: "Foil Metálico",
    fold_imp_print: "Impressão a Cores",
    fold_imp_print_sub: "Tinta Alimentar",
    fold_imp_emboss: "Relevo a Seco",
    fold_imp_emboss_sub: "Sem Tinta (3D)",
    fold_label_custom: "5. Logótipo: Texto ou Imagem (SVG/PNG)",
    fold_label_custom_hint: "Pré-visualização em Tempo Real",
    fold_custom_text_lbl: "Texto / Nome da Empresa",
    fold_custom_font_lbl: "Tipo de Letra (Tipografia)",
    fold_custom_color_lbl: "Cor do Logótipo (Roda de Cores & Hex)",
    fold_mode_text: "Texto & Tipografia",
    fold_mode_logo: "Carregar Logótipo (SVG / PNG)",
    fold_mode_both: "Logótipo + Texto",
    fold_lockup_lbl: "Disposição do Conjunto",
    fold_lockup_vertical: "Vertical (Sobreposto)",
    fold_lockup_horizontal: "Horizontal (Lado a Lado)",
    fold_upload_prompt: "Clique ou arraste um ficheiro SVG ou PNG",
    fold_upload_hint: "Fundo transparente recomendado • SVG, PNG até 5MB",
    fold_logo_applied: "Aplicado na Maquete",
    fold_remove_logo: "Remover",
    fold_font_size_lbl: "Tamanho do Texto",
    fold_logo_size_lbl: "Tamanho do Logótipo",
    fold_placement_lbl: "Posicionamento na Maquete",
    pos_center: "Centro",
    pos_bottom_right: "Canto Inferior Direito",
    pos_bottom_center: "Inferior Centro",
    pos_top_center: "Superior Centro",
    fold_drag_hint: "Clique e arraste o logótipo para mover livremente no guardanapo",
    fold_upload_font_btn: "Carregar Fonte (.ttf, .otf)",
    fold_custom_font_option: "(Fonte Carregada)",
    fold_remove_font: "Remover Fonte",
    fold_invalid_font_alert: "Por favor carregue um ficheiro de fonte válido (.ttf, .otf, .woff, .woff2).",
    scale_fit_lbl: "Ajustar ao Ecrã",
    scale_real_lbl: "Tamanho Real (1:1)",
    fullscreen_btn_title: "Ecrã Inteiro",
    spec_lbl_unfolded: "Tamanho Aberto",
    spec_lbl_folded: "Tamanho Dobrado",
    spec_lbl_weight: "Gramagem do Tecido",
    spec_lbl_use: "Aplicação Recomendada",

    // Products
    prod_tag: "A Nossa Gama",
    prod_title: "Gama Variada em Tecido Não Tecido",
    prod_desc: "Produzimos e personalizamos soluções para Restauração, Hotelaria, Aviação Civil e Limpeza Industrial de acordo com as necessidades específicas de cada cliente.",
    filter_all: "Todos os Produtos",
    filter_horeca: "Hotelaria & Restauração",
    filter_aviation: "Aviação Civil",
    filter_industry: "Limpeza Industrial",
    tag_prod_1: "Restauração & Hotelaria",
    tag_prod_2: "Mesa & Design",
    tag_prod_3: "Atmosfera & Elegância",
    tag_prod_4: "Base Tradicional",
    tag_prod_5: "Aviação Civil",
    tag_prod_6: "Limpeza Industrial",

    // Advantages
    adv_tag: "Porquê a Tecipa?",
    adv_title: "As 5 Grandes Vantagens do Tecido Não Tecido",
    adv_desc: "Conciliamos design e funcionalidade num só produto, eliminando os custos e constrangimentos do tecido tradicional.",
    adv_1_title: "1. Redução de Custos",
    adv_1_desc: "Poupança significativa relativamente à manutenção, rotação, substituição de tecidos tradicionais e dispendiosos custos de lavandaria.",
    adv_2_title: "2. Personalização Total",
    adv_2_desc: "Reforço imediato da sua imagem corporativa através da personalização gráfica exclusiva desenvolvida em parceria connosco.",
    adv_3_title: "3. Design & Textura Únicos",
    adv_3_desc: "Toque de tecido através da variedade de texturas, dimensões, formatos e criação gráfica à medida do seu espaço.",
    adv_4_title: "4. Higiene de Utilização Única",
    adv_4_desc: "Produto 100% higiénico e de utilização única, garantindo a máxima segurança para clientes e passageiros.",
    adv_5_title: "5. Logística Facilitada",
    adv_5_desc: "Produto sempre disponível, mesmo em picos sazonais de consumo, evitando os inconvenientes e atrasos das falhas de lavandaria.",

    // About
    about_tag: "Desde 1998",
    about_title: "A Tecipa: Experiência & Parceria",
    about_desc_1: "A Tecipa foi fundada em 1998 e produz uma gama variada de produtos em tecido não tecido para a Restauração, Hotelaria, Indústria e Aviação Civil.",
    about_desc_2: "Estabelecemos parcerias com os nossos clientes no desenvolvimento de produto e criação gráfica de acordo com as suas necessidades específicas. Em sectores como a Restauração e Hotelaria estamos vocacionados para a personalização dos produtos por forma a criar um design único para cada cliente.",
    about_facility_badge: "Sede e Fábrica • Figueira da Foz, Portugal",
    stat_1_lbl: "Anos de experiência em produção de tecido não tecido (desde 1998)",
    stat_2_lbl: "Companhias aéreas, cadeias hoteleiras e indústrias parceiras",
    stat_3_lbl: "Desenvolvimento rápido de maquetes e criação gráfica personalizada",
    stat_4_lbl: "Resistência mecânica em húmido: não se desagrega como o papel",

    // Quote Section
    quote_tag: "Atendimento Rápido",
    quote_title: "Pedido de Orçamento & Reunião",
    quote_desc: "Selecione as especificações dos seus produtos e agende uma breve reunião com a nossa equipa. Os seus dados são enviados diretamente para o nosso fluxo n8n.",
    step1_title: "Especificação do Pedido",
    step2_title: "Agendamento & Contacto",
    industry_title: "Sector de Atividade",
    ind_horeca: "Hotelaria & Restauração",
    ind_horeca_sub: "Guardanapos, toalhetes & toalhas",
    ind_aviation: "Aviação Civil",
    ind_aviation_sub: "Tray mats anti-deslizantes",
    ind_industry: "Limpeza Industrial",
    ind_industry_sub: "Rolos de elevada absorção",
    ind_all: "Todos os Produtos",
    ind_all_sub: "Ver catálogo completo",
    prod_type_title: "Tipo de Produto",
    p_napkins: "Guardanapos Personalizados",
    p_napkins_sub: "Textura linho & personalização",
    p_placemats: "Toalhetes Individuais",
    p_placemats_sub: "Mesa coordenada & proteção de mesa",
    p_chemindetable: "Toalhetes \"Chemin de Table\"",
    p_chemindetable_sub: "Caminhos de mesa requintados",
    p_tablecloth: "Toalha de Base",
    p_tablecloth_sub: "Proteção tradicional e elegância",
    p_traymats: "Tray Mats para Aviação Civil",
    p_traymats_sub: "Anti-deslizante e toque tecido",
    p_rolls: "Rolos para Limpeza Industrial",
    p_rolls_sub: "Não se desagrega em húmido",
    volume_title: "Volume Estimado",
    branding_title: "Personalização Gráfica",
    b_custom: "Design Personalizado",
    b_custom_sub: "Criação gráfica à medida",
    b_foil: "Estampa Metálica (Foil)",
    b_foil_sub: "Dourado / Prateado",
    b_white: "Branco / Sem Impressão",
    b_white_sub: "Puro e higiénico",
    btn_to_step2: "Avançar para Agendamento →",
    btn_back: "← Voltar",
    btn_submit: "Confirmar & Enviar para n8n",

    // Unit-specific & Quote Cards
    sizefold_title: "Dimensões & Formato",
    sf_dinner_eighth: "Jantar 40×40 cm",
    sf_dinner_eighth_sub: "1/8 Dobra Banquete",
    sf_dinner_pocket: "Jantar 40×40 cm",
    sf_dinner_pocket_sub: "Com Bolso p/ Talher",
    sf_lunch_quarter: "Almoço 33×33 cm",
    sf_lunch_quarter_sub: "1/4 Dobra Tradicional",
    sf_cocktail_quarter: "Cocktail 25×25 cm",
    sf_cocktail_quarter_sub: "Bar & Bebidas",
    sf_custom: "Medida Sob Consulta",
    sf_custom_sub: "Tray mats ou rolos",

    vol_25k: "25.000 un.",
    vol_25k_sub: "Arranque / Piloto",
    vol_100k: "100.000 un.",
    vol_100k_sub: "Restauração / Hotel",
    vol_500k: "500.000 un.",
    vol_500k_sub: "Aviação / Cadeia",
    vol_1m: "1M+ un.",
    vol_1m_sub: "Grande Escala",

    meeting_section_title: "Agendar Reunião Breve com a Equipa Tecipa (15 Minutos)",
    lbl_selected_config: "Configuração Selecionada:",
    btn_edit: "Editar",
    lbl_fullname: "Nome Completo *",
    lbl_email: "Endereço Eletrónico / E-mail *",
    lbl_company: "Nome da Empresa / Organização *",
    lbl_phone: "Telefone / Contacto",
    lbl_date: "Data Preferencial",
    lbl_time: "Horário Pretendido",
    lbl_notes: "Mensagem ou Especificações Adicionais (Opcional)",
    lbl_timezone: "Fuso Horário:",

    pocket_accent_text: "Bolso p/ Talher",
    stat_1_val: "28 Anos",
    stat_1_lbl: "Anos de experiência em produção de tecido não tecido (desde 1998)",
    stat_2_val: "4 Sectores",
    stat_4_val: "Resistência",

    btn_add_product: "+ Adicionar Outro Produto",
    btn_remove_product: "Remover",
    lbl_product_item: "Produto",
    lbl_custom_qty: "Ou indique a quantidade exata:",
    ph_custom_qty: "ex: 50.000",
    lbl_units: "unidades",
    lbl_multiple_products: "produtos",
    moq_notice_global: "Produção personalizada sujeita a quantidades mínimas de encomenda (MOQ) de acordo com o formato e tipo de personalização. Lotes industriais sob consulta.",
    moq_card_notice: "Lote mínimo de produção sob consulta (MOQ)",
    lbl_selected_products: "produtos selecionados",
    lbl_select_at_least_one: "Selecione pelo menos um produto para continuar.",
    btn_proceed_multi: "Avançar para Agendamento",
    lbl_dimensions_format: "Dimensões & Formato",
    lbl_volume_qty: "Quantidade Pretendida",
    lbl_selected_tray: "Produtos Selecionados no Pedido:",
    lbl_no_products_selected: "Nenhum produto selecionado. Clique num produto para adicionar.",
    lbl_remove_item: "Remover",

    // Footer
    footer_desc: "Produção de tecido não tecido para Restauração, Hotelaria, Indústria e Aviação Civil. Fundada em 1998 na Figueira da Foz, Portugal.",
    footer_rights: "© 2026 Tecipa, Lda. Todos os direitos reservados.",
    agency_credit: "Produzido por <a href='#' class='agency-link'>BRUTO</a>"
  },

  en: {
    // Navigation
    nav_tagline: "The Magic of Non-Woven Fabric",
    nav_fold: "Folds & Sizes",
    nav_products: "Products & Sectors",
    nav_advantages: "Advantages",
    nav_about: "About Us",
    nav_quote_btn: "Request a Quote",
    nav_webhook: "n8n Webhook",

    // Hero
    hero_badge: "Founded in 1998 • Figueira da Foz, Portugal",
    hero_title: "The Magic of <span class='gold'>Non-Woven Fabric</span>",
    hero_subtitle: "Can you imagine what Non-Woven Fabric can do for you and your business? Combining unique characteristics, it unites design and functionality in a single product. From Hospitality and Dining to Industry and Civil Aviation, our clients recognize the Tecipa advantage.",
    hero_cta_quote: "Request a Quote",
    hero_cta_fold: "Interactive Fold Guide",
    hero_trust_1: "Bespoke Graphic Design",
    hero_trust_2: "High Absorption & Strength",
    hero_trust_3: "Civil Aviation, Hospitality & Industry",

    // Fold Guide
    fold_tag: "Interactive Spec Tool",
    fold_title: "Napkin Dimension & Fold Style Guide",
    fold_desc: "In various textures, colors, and dimensions, we create an exclusive design tailored to the atmosphere of your restaurant, hotel, or airline.",
    fold_label_dim: "1. Dimensions",
    fold_label_dim_hint: "Unfolded Size",
    fold_label_fold: "2. Fold Style",
    fold_label_fold_hint: "Table Presentation",
    fold_label_mat: "3. Fabric & Texture",
    fold_label_mat_hint: "Feel & Grammage",
    fold_label_imp: "4. Custom Branding",
    fold_label_imp_hint: "Finishing Style",
    fold_cocktail: "Cocktail",
    fold_cocktail_sub: "25 × 25 cm (10″ × 10″)",
    fold_lunch: "Lunch",
    fold_lunch_sub: "33 × 33 cm (13″ × 13″)",
    fold_dinner: "Dinner",
    fold_dinner_sub: "40 × 40 cm (16″ × 16″)",
    fold_1_4: "1/4 Fold",
    fold_1_4_sub: "Square 4-Ply",
    fold_1_8: "1/8 Fold",
    fold_1_8_sub: "Banquet & Airline",
    fold_pocket: "Cutlery Pocket",
    fold_pocket_sub: "Silverware Sleeve",
    fold_mat_airlaid: "Luxury Airlaid",
    fold_mat_airlaid_sub: "Cloth Feel • 55–65 GSM (g/m²)",
    fold_mat_tissue: "Multi-Ply Tissue",
    fold_mat_tissue_sub: "2 or 3-Ply Virgin Pulp",
    fold_imp_foil: "Hot Foil",
    fold_imp_foil_sub: "Metallic Gold",
    fold_imp_print: "Color Print",
    fold_imp_print_sub: "Food-Grade Ink",
    fold_imp_emboss: "Blind Emboss",
    fold_imp_emboss_sub: "Inkless 3D Relief",
    fold_label_custom: "5. Logo: Text or Image (SVG/PNG)",
    fold_label_custom_hint: "Real-time Preview",
    fold_custom_text_lbl: "Custom Text / Brand Name",
    fold_custom_font_lbl: "Typography (Font Family)",
    fold_custom_color_lbl: "Imprint Color (Color Wheel & Hex)",
    fold_mode_text: "Text & Typography",
    fold_mode_logo: "Upload Logo (SVG / PNG)",
    fold_mode_both: "Logo + Text",
    fold_lockup_lbl: "Lockup Arrangement",
    fold_lockup_vertical: "Vertical (Stacked)",
    fold_lockup_horizontal: "Horizontal (Side-by-Side)",
    fold_upload_prompt: "Click or drag & drop an SVG or PNG file",
    fold_upload_hint: "Transparent background recommended • SVG, PNG up to 5MB",
    fold_logo_applied: "Applied to Mockup",
    fold_remove_logo: "Remove",
    fold_font_size_lbl: "Text Font Size",
    fold_logo_size_lbl: "Logo Image Scale",
    fold_placement_lbl: "Position on Mockup",
    pos_center: "Center",
    pos_bottom_right: "Bottom Right Corner",
    pos_bottom_center: "Bottom Center",
    pos_top_center: "Top Center",
    fold_drag_hint: "Click and drag the logo to move freely across the napkin",
    fold_upload_font_btn: "Upload Font (.ttf, .otf)",
    fold_custom_font_option: "(Uploaded Font)",
    fold_remove_font: "Remove Font",
    fold_invalid_font_alert: "Please upload a valid font file (.ttf, .otf, .woff, .woff2).",
    scale_fit_lbl: "Fit to Screen",
    scale_real_lbl: "Real Size (1:1)",
    fullscreen_btn_title: "Fullscreen",
    spec_lbl_unfolded: "Unfolded Size",
    spec_lbl_folded: "Folded Size",
    spec_lbl_weight: "Material Weight",
    spec_lbl_use: "Recommended Application",

    // Products
    prod_tag: "Our Portfolio",
    prod_title: "Diverse Range of Non-Woven Products",
    prod_desc: "We manufacture and customize solutions for Dining, Hospitality, Civil Aviation, and Industrial Cleaning according to the specific needs of each client.",
    filter_all: "All Products",
    filter_horeca: "Hospitality & Dining",
    filter_aviation: "Civil Aviation",
    filter_industry: "Industrial Cleaning",
    tag_prod_1: "Hospitality & Dining",
    tag_prod_2: "Tabletop & Design",
    tag_prod_3: "Atmosphere & Elegance",
    tag_prod_4: "Traditional Base",
    tag_prod_5: "Civil Aviation",
    tag_prod_6: "Industrial Cleaning",

    // Advantages
    adv_tag: "Why Tecipa?",
    adv_title: "The 5 Key Advantages of Non-Woven Fabric",
    adv_desc: "We unite design and functionality in a single product, eliminating the costs and constraints of traditional linen.",
    adv_1_title: "1. Cost Reduction",
    adv_1_desc: "Substantial savings compared to traditional linen maintenance, rotation, replacement, and expensive laundry bills.",
    adv_2_title: "2. Complete Personalization",
    adv_2_desc: "Immediate reinforcement of your brand image through exclusive graphic design developed in partnership with our team.",
    adv_3_title: "3. Unique Design & Texture",
    adv_3_desc: "Linen-like feel through a rich variety of textures, dimensions, formats, and bespoke graphic printing.",
    adv_4_title: "4. Maximum Single-Use Hygiene",
    adv_4_desc: "100% hygienic, single-use product ensuring complete safety and cleanliness for every guest and airline passenger.",
    adv_5_title: "5. Streamlined Logistics",
    adv_5_desc: "Product always in stock and on hand, even during peak seasons, eliminating the disruptions of laundry turnaround delays.",

    // About
    about_tag: "Since 1998",
    about_title: "Tecipa: Experience & Partnership",
    about_desc_1: "Founded in 1998, Tecipa manufactures a diverse range of non-woven fabric products for Dining, Hospitality, Industry, and Civil Aviation.",
    about_desc_2: "We establish partnerships with our clients in product development and graphic design according to their specific needs. In sectors like Dining and Hospitality, we specialize in personalization to create a unique design for each client.",
    about_facility_badge: "Headquarters & Plant • Figueira da Foz, Portugal",
    stat_1_lbl: "Years of specialized non-woven manufacturing experience (since 1998)",
    stat_2_lbl: "Airlines, hotel chains, and industrial partners served globally",
    stat_3_lbl: "Rapid prototype mockup and custom graphic design turnaround",
    stat_4_lbl: "Superior wet tensile strength: does not tear or disintegrate like paper",

    // Quote Section
    quote_tag: "Instant Response",
    quote_title: "Quick Quote & Meeting Scheduler",
    quote_desc: "Configure your product specifications and schedule a brief consultation with our team. Your request is dispatched directly into our n8n automation pipeline.",
    step1_title: "Order Specifications",
    step2_title: "Schedule & Contact",
    industry_title: "Your Industry",
    ind_horeca: "Hospitality & Dining",
    ind_horeca_sub: "Napkins, placemats & tablecloths",
    ind_aviation: "Civil Aviation",
    ind_aviation_sub: "Anti-slip tray mats",
    ind_industry: "Industrial Cleaning",
    ind_industry_sub: "High-absorption industrial rolls",
    ind_all: "All Products",
    ind_all_sub: "Browse complete catalog",
    prod_type_title: "Product Type",
    p_napkins: "Custom Napkins",
    p_napkins_sub: "Linen texture & bespoke print",
    p_placemats: "Individual Placemats",
    p_placemats_sub: "Coordinated table design & protection",
    p_chemindetable: "Toalhetes \"Chemin de Table\"",
    p_chemindetable_sub: "Refined table runners & runners",
    p_tablecloth: "Base Tablecloth",
    p_tablecloth_sub: "Traditional protection & cloth feel",
    p_traymats: "Tray Mats for Civil Aviation",
    p_traymats_sub: "Anti-slip & cloth-like feel",
    p_rolls: "Industrial Cleaning Rolls",
    p_rolls_sub: "Does not disintegrate when wet",
    volume_title: "Estimated Volume",
    branding_title: "Graphic Customization",
    b_custom: "Custom Design",
    b_custom_sub: "Tailored graphic creation",
    b_foil: "Metallic Hot Foil",
    b_foil_sub: "Gold / Silver stamp",
    b_white: "White / Unprinted",
    b_white_sub: "Pristine & hygienic",
    btn_to_step2: "Proceed to Meeting Booking →",
    btn_back: "← Back",
    btn_submit: "Confirm & Dispatch to n8n",

    // Unit-specific & Quote Cards
    sizefold_title: "Dimensions & Fold Style",
    sf_dinner_eighth: "Dinner 40×40 cm (16″×16″)",
    sf_dinner_eighth_sub: "1/8 Banquet Fold",
    sf_dinner_pocket: "Dinner 40×40 cm (16″×16″)",
    sf_dinner_pocket_sub: "With Cutlery Pocket",
    sf_lunch_quarter: "Lunch 33×33 cm (13″×13″)",
    sf_lunch_quarter_sub: "1/4 Classic Fold",
    sf_cocktail_quarter: "Cocktail 25×25 cm (10″×10″)",
    sf_cocktail_quarter_sub: "Bar & Beverage",
    sf_custom: "Custom Dimensions",
    sf_custom_sub: "Tray mats or rolls",

    vol_25k: "25,000 units",
    vol_25k_sub: "Startup / Pilot",
    vol_100k: "100,000 units",
    vol_100k_sub: "Dining / Hotel",
    vol_500k: "500,000 units",
    vol_500k_sub: "Aviation / Chain",
    vol_1m: "1M+ units",
    vol_1m_sub: "Large Scale",

    meeting_section_title: "Schedule a Brief Consultation with the Tecipa Team (15 Minutes)",
    lbl_selected_config: "Selected Configuration:",
    btn_edit: "Edit",
    lbl_fullname: "Full Name *",
    lbl_email: "Work Email Address *",
    lbl_company: "Company / Organization Name *",
    lbl_phone: "Phone / Contact Number",
    lbl_date: "Preferred Date",
    lbl_time: "Preferred Time Slot",
    lbl_notes: "Additional Specifications or Message (Optional)",
    lbl_timezone: "Time Zone:",

    pocket_accent_text: "Cutlery Pocket",
    stat_1_val: "28 Years",
    stat_1_lbl: "Years of experience in non-woven production (since 1998)",
    stat_2_val: "4 Sectors",
    stat_4_val: "High Strength",

    btn_add_product: "+ Add Another Product",
    btn_remove_product: "Remove",
    lbl_product_item: "Product",
    lbl_custom_qty: "Or specify exact quantity:",
    ph_custom_qty: "e.g. 50,000",
    lbl_units: "units",
    lbl_multiple_products: "products",
    moq_notice_global: "Custom production is subject to minimum order quantities (MOQ) depending on format and customization. Industrial batch sizes upon request.",
    moq_card_notice: "Minimum order quantity upon request (MOQ)",
    lbl_selected_products: "selected products",
    lbl_select_at_least_one: "Please select at least one product to proceed.",
    btn_proceed_multi: "Proceed to Meeting Booking",
    lbl_dimensions_format: "Dimensions & Format",
    lbl_volume_qty: "Requested Quantity",
    lbl_selected_tray: "Products Selected for Quote:",
    lbl_no_products_selected: "No products selected. Click a product below to add.",
    lbl_remove_item: "Remove",

    // Footer
    footer_desc: "Production of non-woven fabrics for Dining, Hospitality, Industry, and Civil Aviation. Founded in 1998 in Figueira da Foz, Portugal.",
    footer_rights: "© 2026 Tecipa, Lda. All rights reserved.",
    agency_credit: "Produced by <a href='#' class='agency-link'>BRUTO</a>"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initNavigation();
  initNapkinVisualizer();
  initProductFilter();
});

/* ==========================================================================
   Bilingual Language Switcher (PT / EN)
   ========================================================================== */
function initLanguageToggle() {
  const ptBtn = document.getElementById('langTogglePt');
  const enBtn = document.getElementById('langToggleEn');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tecipa_lang', lang);

    // Update active button state
    if (ptBtn && enBtn) {
      ptBtn.classList.toggle('active', lang === 'pt');
      enBtn.classList.toggle('active', lang === 'en');
    }

    // Translate all [data-i18n] elements
    const elements = document.querySelectorAll('[data-i18n]');
    const dict = i18n[lang];

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Refresh Napkin Visualizer with language units
    if (window.updateNapkinVisualizer) {
      window.updateNapkinVisualizer();
    }

    // Dispatch language change event for quote-scheduler
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  if (ptBtn) ptBtn.addEventListener('click', () => applyLanguage('pt'));
  if (enBtn) enBtn.addEventListener('click', () => applyLanguage('en'));

  // Initial application
  applyLanguage(currentLang);
}

/* ==========================================================================
   Navigation & Scroll Effects
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(69, 62, 155, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Mobile menu toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   Interactive Napkin Dimension & Fold Visual Guide
   ========================================================================== */
function initNapkinVisualizer() {
  const napkinCanvasContainer = document.getElementById('napkinCanvasContainer');
  const napkinEl = document.getElementById('interactiveNapkin');
  const imprintEl = document.getElementById('napkinImprint');
  const napkinLogoImg = document.getElementById('napkinLogoImg');
  const widthTag = document.getElementById('widthTag');
  const heightTag = document.getElementById('heightTag');

  const napkinLogoZone = document.getElementById('napkinLogoImprint');
  const napkinLogoImprint = document.getElementById('napkinLogoImprint');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const logoSizeSlider = document.getElementById('logoSizeSlider');
  const logoSizeDisplay = document.getElementById('logoSizeDisplay');
  const matrixCells = document.querySelectorAll('.matrix-cell');
  const placementPresets = document.querySelectorAll('.placement-preset-btn');

  // Stage Toolbar & 1:1 Controls
  const visualizerStage = document.getElementById('visualizerStage');
  const scaleToggleWrap = document.getElementById('scaleToggleWrap');
  const scaleFitBtn = document.getElementById('scaleFitBtn');
  const scaleRealBtn = document.getElementById('scaleRealBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Spec summary elements
  const specUnfolded = document.getElementById('specUnfolded');
  const specFolded = document.getElementById('specFolded');
  const specGrammage = document.getElementById('specGrammage');
  const specUseCase = document.getElementById('specUseCase');

  // Personalization elements: Text & Typography
  const modeTabText = document.getElementById('modeTabText');
  const modeTabImage = document.getElementById('modeTabImage');
  const modeTabBoth = document.getElementById('modeTabBoth');
  const textPersonalizationWrap = document.getElementById('textPersonalizationWrap');
  const logoUploadWrap = document.getElementById('logoUploadWrap');
  const lockupControlsWrap = document.getElementById('lockupControlsWrap');
  const lockupVerticalBtn = document.getElementById('lockupVerticalBtn');
  const lockupHorizontalBtn = document.getElementById('lockupHorizontalBtn');

  const customTextInput = document.getElementById('customTextInput');
  const customFontSelect = document.getElementById('customFontSelect');
  const imprintColorPicker = document.getElementById('imprintColorPicker');
  const imprintHexInput = document.getElementById('imprintHexInput');
  const colorWheelPreview = document.getElementById('colorWheelPreview');

  // Personalization elements: Logo File Upload
  const logoUploadZone = document.getElementById('logoUploadZone');
  const logoFileInput = document.getElementById('logoFileInput');
  const uploadPrompt = document.getElementById('uploadPrompt');
  const uploadedLogoInfo = document.getElementById('uploadedLogoInfo');
  const logoThumbPreview = document.getElementById('logoThumbPreview');
  const logoFileName = document.getElementById('logoFileName');
  const logoRemoveBtn = document.getElementById('logoRemoveBtn');

  if (!napkinEl) return;

  // Current visualizer state
  const state = {
    dimension: 'dinner',  // cocktail, lunch, dinner
    fold: 'eighth',       // quarter, eighth, pocket
    material: 'airlaid',  // airlaid, tissue
    branding: 'foil',     // foil, print, emboss
    customText: 'Tecipa',
    customFont: "'Segoe Script', cursive",
    customColor: '#C59B27',
    fontSize: 18,
    logoScale: 70,
    placement: 'center',
    customPos: null,      // { xPct: number, yPct: number } when freely dragged
    logoMode: 'text',     // 'text', 'image', or 'both'
    lockupLayout: 'vertical', // 'vertical' or 'horizontal'
    customImageSrc: null,
    customImageName: '',
    scaleMode: 'fit',     // 'fit' or 'real'
    isFullscreen: false
  };

  // Spec lookup table with language-specific units & physical centimeters
  const specData = {
    cocktail: {
      name: 'Cocktail',
      unfolded_pt: '25 × 25 cm',
      unfolded_en: '25 × 25 cm (10″ × 10″)',
      quarter: {
        folded_pt: '12,5 × 12,5 cm',
        folded_en: '12.5 × 12.5 cm (5″ × 5″)',
        wTag_pt: '12,5 cm',
        wTag_en: '12.5 cm (5″)',
        hTag_pt: '12,5 cm',
        hTag_en: '12.5 cm (5″)',
        w: 220,
        h: 220,
        cmW: 12.5,
        cmH: 12.5
      },
      eighth: {
        folded_pt: '6,25 × 12,5 cm',
        folded_en: '6.25 × 12.5 cm (2.5″ × 5″)',
        wTag_pt: '6,25 cm',
        wTag_en: '6.25 cm (2.5″)',
        hTag_pt: '12,5 cm',
        hTag_en: '12.5 cm (5″)',
        w: 140,
        h: 280,
        cmW: 6.25,
        cmH: 12.5
      },
      pocket: {
        folded_pt: '8,5 × 12,5 cm',
        folded_en: '8.5 × 12.5 cm (3.3″ × 5″)',
        wTag_pt: '8,5 cm',
        wTag_en: '8.5 cm (3.3″)',
        hTag_pt: '12,5 cm',
        hTag_en: '12.5 cm (5″)',
        w: 170,
        h: 260,
        cmW: 8.5,
        cmH: 12.5
      },
      useCase_pt: 'Aviação civil (bebidas), bares de hotel e cocktail lounges',
      useCase_en: 'Civil aviation (beverages), hotel bars and cocktail lounges'
    },
    lunch: {
      name: 'Lunch',
      unfolded_pt: '33 × 33 cm',
      unfolded_en: '33 × 33 cm (13″ × 13″)',
      quarter: {
        folded_pt: '16,5 × 16,5 cm',
        folded_en: '16.5 × 16.5 cm (6.5″ × 6.5″)',
        wTag_pt: '16,5 cm',
        wTag_en: '16.5 cm (6.5″)',
        hTag_pt: '16,5 cm',
        hTag_en: '16.5 cm (6.5″)',
        w: 270,
        h: 270,
        cmW: 16.5,
        cmH: 16.5
      },
      eighth: {
        folded_pt: '8,25 × 16,5 cm',
        folded_en: '8.25 × 16.5 cm (3.25″ × 6.5″)',
        wTag_pt: '8,25 cm',
        wTag_en: '8.25 cm (3.25″)',
        hTag_pt: '16,5 cm',
        hTag_en: '16.5 cm (6.5″)',
        w: 165,
        h: 330,
        cmW: 8.25,
        cmH: 16.5
      },
      pocket: {
        folded_pt: '11 × 16,5 cm',
        folded_en: '11 × 16.5 cm (4.3″ × 6.5″)',
        wTag_pt: '11 cm',
        wTag_en: '11 cm (4.3″)',
        hTag_pt: '16,5 cm',
        hTag_en: '16.5 cm (6.5″)',
        w: 200,
        h: 315,
        cmW: 11.0,
        cmH: 16.5
      },
      useCase_pt: 'Refeições ligeiras, classe executiva de aviação e bistros',
      useCase_en: 'Light meals, airline business class and bistros'
    },
    dinner: {
      name: 'Dinner',
      unfolded_pt: '40 × 40 cm',
      unfolded_en: '40 × 40 cm (16″ × 16″)',
      quarter: {
        folded_pt: '20 × 20 cm',
        folded_en: '20 × 20 cm (8″ × 8″)',
        wTag_pt: '20 cm',
        wTag_en: '20 cm (8″)',
        hTag_pt: '20 cm',
        hTag_en: '20 cm (8″)',
        w: 320,
        h: 320,
        cmW: 20.0,
        cmH: 20.0
      },
      eighth: {
        folded_pt: '10 × 20 cm',
        folded_en: '10 × 20 cm (4″ × 8″)',
        wTag_pt: '10 cm',
        wTag_en: '10 cm (4″)',
        hTag_pt: '20 cm',
        hTag_en: '20 cm (8″)',
        w: 190,
        h: 380,
        cmW: 10.0,
        cmH: 20.0
      },
      pocket: {
        folded_pt: '13 × 20 cm',
        folded_en: '13 × 20 cm (5.1″ × 8″)',
        wTag_pt: '13 cm',
        wTag_en: '13 cm (5.1″)',
        hTag_pt: '20 cm',
        hTag_en: '20 cm (8″)',
        w: 235,
        h: 370,
        cmW: 13.0,
        cmH: 20.0
      },
      useCase_pt: 'Restauração de topo, primeira classe e banquetes',
      useCase_en: 'Fine dining, airline first class and formal banquets'
    }
  };

  const materialData = {
    airlaid: {
      grammage_pt: '55 – 65 g/m² (Airlaid Luxo)',
      grammage_en: '55 – 65 GSM / g/m² (Luxury Airlaid)'
    },
    tissue: {
      grammage_pt: '2 ou 3 Folhas (Pura Celulose)',
      grammage_en: '2 or 3-Ply (Pure Cellulose)'
    }
  };

  function updateVisualizer() {
    const dimData = specData[state.dimension];
    const foldSpecs = dimData[state.fold];
    const matData = materialData[state.material];

    // Only allow 1:1 Real Size option if screen is large enough (>= 1024px width AND >= 650px height)
    const isScreenBigEnough = window.innerWidth >= 1024 && window.innerHeight >= 650;
    if (scaleToggleWrap) {
      scaleToggleWrap.style.display = isScreenBigEnough ? 'inline-flex' : 'none';
    }

    if (!isScreenBigEnough && state.scaleMode === 'real') {
      state.scaleMode = 'fit';
      if (scaleFitBtn) scaleFitBtn.classList.add('active');
      if (scaleRealBtn) scaleRealBtn.classList.remove('active');
    }

    // Check scale mode (Fit vs 1:1 Real Size)
    const isReal = state.scaleMode === 'real' && isScreenBigEnough;
    if (visualizerStage) {
      visualizerStage.classList.toggle('real-size-active', isReal);
    }

    let displayW = foldSpecs.w;
    let displayH = foldSpecs.h;

    if (isReal) {
      const pxPerCm = 37.795; // 1cm in standard physical CSS units
      displayW = Math.round(foldSpecs.cmW * pxPerCm);
      displayH = Math.round(foldSpecs.cmH * pxPerCm);
    }

    // Apply dimensions to container and napkin element
    if (napkinCanvasContainer) {
      napkinCanvasContainer.style.width = `${displayW}px`;
      napkinCanvasContainer.style.height = `${displayH}px`;
    }
    napkinEl.style.width = `${displayW}px`;
    napkinEl.style.height = `${displayH}px`;

    // Apply fold styling
    napkinEl.classList.remove('fold-quarter', 'fold-eighth', 'fold-pocket');
    napkinEl.classList.add(`fold-${state.fold}`);

    // Apply texture styling
    napkinEl.classList.remove('texture-airlaid', 'texture-tissue');
    napkinEl.classList.add(`texture-${state.material}`);

    // Apply placement position: Custom Dragged Position OR Preset Class
    if (napkinLogoImprint) {
      const lockupClass = state.logoMode === 'both' ? ` lockup-${state.lockupLayout}` : '';
      if (state.customPos) {
        napkinLogoImprint.className = `napkin-logo-imprint pos-custom${lockupClass}`;
        napkinLogoImprint.style.left = `${state.customPos.xPct}%`;
        napkinLogoImprint.style.top = `${state.customPos.yPct}%`;
        napkinLogoImprint.style.right = 'auto';
        napkinLogoImprint.style.bottom = 'auto';
        napkinLogoImprint.style.transform = 'translate(-50%, -50%)';
      } else {
        napkinLogoImprint.className = `napkin-logo-imprint pos-${state.placement}${lockupClass}`;
        napkinLogoImprint.style.left = '';
        napkinLogoImprint.style.top = '';
        napkinLogoImprint.style.right = '';
        napkinLogoImprint.style.bottom = '';
        napkinLogoImprint.style.transform = '';
      }
    }

    // Apply Impression Shaders to Uploaded Logo Image
    if (napkinLogoImg) {
      napkinLogoImg.classList.remove('logo-foil', 'logo-emboss', 'logo-print');
      if (state.branding === 'foil') {
        napkinLogoImg.classList.add('logo-foil');
      } else if (state.branding === 'emboss') {
        napkinLogoImg.classList.add('logo-emboss');
      } else {
        napkinLogoImg.classList.add('logo-print');
      }
    }

    // Determine what to display: Image, Text, or Both
    const showImage = (state.logoMode === 'image' || state.logoMode === 'both') && !!state.customImageSrc;
    const showText = state.logoMode === 'text' || state.logoMode === 'both' || !state.customImageSrc;

    // Configure Uploaded Logo Image
    if (napkinLogoImg) {
      if (showImage) {
        napkinLogoImg.src = state.customImageSrc;
        napkinLogoImg.style.display = 'block';

        // Responsive scaling based on logoScale slider and lockup layout
        const combinedRatio = (state.logoMode === 'both') ? 0.6 : 1.0;
        const scaleFactor = ((state.logoScale || 70) / 100) * combinedRatio;
        const maxImgW = (state.logoMode === 'both' && state.lockupLayout === 'horizontal') ? 0.45 : 0.85;
        const maxImgH = (state.logoMode === 'both' && state.lockupLayout === 'vertical') ? 0.4 : 0.65;
        napkinLogoImg.style.maxWidth = `${Math.round(displayW * maxImgW * scaleFactor)}px`;
        napkinLogoImg.style.maxHeight = `${Math.round(displayH * maxImgH * scaleFactor)}px`;
      } else {
        napkinLogoImg.style.display = 'none';
      }
    }

    // Configure Custom Typography Text
    if (imprintEl) {
      if (showText) {
        imprintEl.style.display = 'block';
        const text = (state.customText !== undefined && state.customText !== null) ? state.customText : 'Tecipa';
        const displayText = text.length > 0 ? text : 'Tecipa';

        imprintEl.textContent = displayText;
        imprintEl.style.fontFamily = state.customFont;

        // Scale font size proportionally in 1:1 real size mode
        let effectiveFontSize = isReal
          ? Math.round((state.fontSize || 18) * 1.85)
          : (state.fontSize || 18);

        // Slightly adjust font scale in combined mode for visual harmony
        if (state.logoMode === 'both' && showImage) {
          effectiveFontSize = Math.max(12, Math.round(effectiveFontSize * 0.9));
        }

        // Auto-fit safeguard: ensure words never split or overflow napkin bounds
        const maxImprintWidth = Math.max(70, Math.floor(displayW * (state.logoMode === 'both' && state.lockupLayout === 'horizontal' ? 0.52 : 0.9)));
        const words = displayText.trim().split(/\s+/);
        const longestWordLen = words.reduce((max, w) => Math.max(max, w.length), 0);
        if (longestWordLen > 0) {
          const estimatedWordWidth = longestWordLen * (effectiveFontSize * 0.62);
          if (estimatedWordWidth > maxImprintWidth) {
            const fitSize = Math.max(10, Math.floor(maxImprintWidth / (longestWordLen * 0.62)));
            effectiveFontSize = Math.min(effectiveFontSize, fitSize);
          }
        }
        imprintEl.style.fontSize = `${effectiveFontSize}px`;

        // Reset branding classes
        imprintEl.classList.remove('imprint-foil', 'imprint-emboss', 'imprint-print');

        if (state.branding === 'foil') {
          imprintEl.classList.add('imprint-foil');
          imprintEl.style.color = '';
        } else if (state.branding === 'emboss') {
          imprintEl.classList.add('imprint-emboss');
          imprintEl.style.color = '';
        } else {
          imprintEl.classList.add('imprint-print');
          imprintEl.style.color = state.customColor;
          imprintEl.style.textShadow = 'none';
        }
      } else {
        imprintEl.style.display = 'none';
      }
    }

    // Update tags with language-specific units
    if (widthTag && heightTag) {
      widthTag.textContent = currentLang === 'pt' ? foldSpecs.wTag_pt : foldSpecs.wTag_en;
      heightTag.textContent = currentLang === 'pt' ? foldSpecs.hTag_pt : foldSpecs.hTag_en;
    }

    // Update Spec Summary with language-specific units
    if (specUnfolded) specUnfolded.textContent = currentLang === 'pt' ? dimData.unfolded_pt : dimData.unfolded_en;
    if (specFolded) specFolded.textContent = currentLang === 'pt' ? foldSpecs.folded_pt : foldSpecs.folded_en;
    if (specGrammage) specGrammage.textContent = currentLang === 'pt' ? matData.grammage_pt : matData.grammage_en;
    if (specUseCase) {
      specUseCase.textContent = currentLang === 'pt' ? dimData.useCase_pt : dimData.useCase_en;
    }
  }

  // Expose function globally for language toggle
  window.updateNapkinVisualizer = updateVisualizer;

  // Centralized Custom Color Applier
  function applyCustomColor(hex) {
    if (!hex) return;
    const cleanHex = hex.startsWith('#') ? hex.toUpperCase() : '#' + hex.toUpperCase();
    state.customColor = cleanHex;
    if (imprintColorPicker) imprintColorPicker.value = cleanHex;
    if (imprintHexInput) imprintHexInput.value = cleanHex.replace('#', '');
    if (colorWheelPreview) colorWheelPreview.style.backgroundColor = cleanHex;

    // Switch to print branding so custom color is active and visible
    state.branding = 'print';
    document.querySelectorAll('[data-branding]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-branding') === 'print');
    });

    // Update swatch active state
    document.querySelectorAll('.swatch-btn').forEach(s => {
      s.classList.toggle('active', s.getAttribute('data-color').toUpperCase() === cleanHex);
    });

    updateVisualizer();
  }

  // Personalization Mode Switchers: Text vs Image Logo vs Both
  function setMode(mode) {
    state.logoMode = mode;
    if (modeTabText) modeTabText.classList.toggle('active', mode === 'text');
    if (modeTabImage) modeTabImage.classList.toggle('active', mode === 'image');
    if (modeTabBoth) modeTabBoth.classList.toggle('active', mode === 'both');

    if (textPersonalizationWrap) {
      textPersonalizationWrap.style.display = (mode === 'text' || mode === 'both') ? 'block' : 'none';
    }
    if (logoUploadWrap) {
      logoUploadWrap.style.display = (mode === 'image' || mode === 'both') ? 'block' : 'none';
    }
    if (lockupControlsWrap) {
      lockupControlsWrap.style.display = (mode === 'both') ? 'block' : 'none';
    }

    updateVisualizer();
  }

  if (modeTabText) modeTabText.addEventListener('click', () => setMode('text'));
  if (modeTabImage) modeTabImage.addEventListener('click', () => setMode('image'));
  if (modeTabBoth) modeTabBoth.addEventListener('click', () => setMode('both'));

  // Lockup Layout Switchers: Vertical vs Horizontal
  if (lockupVerticalBtn && lockupHorizontalBtn) {
    lockupVerticalBtn.addEventListener('click', () => {
      state.lockupLayout = 'vertical';
      lockupVerticalBtn.classList.add('active');
      lockupHorizontalBtn.classList.remove('active');
      updateVisualizer();
    });

    lockupHorizontalBtn.addEventListener('click', () => {
      state.lockupLayout = 'horizontal';
      lockupHorizontalBtn.classList.add('active');
      lockupVerticalBtn.classList.remove('active');
      updateVisualizer();
    });
  }

  // Logo File Upload (SVG, PNG, JPG, WEBP)
  function handleLogoFile(file) {
    if (!file) return;
    if (!file.type.match(/image\/(svg\+xml|png|jpeg|webp)/i) && !file.name.match(/\.(svg|png|jpe?g|webp)$/i)) {
      alert(currentLang === 'pt' ? 'Por favor carregue um ficheiro SVG, PNG ou JPG.' : 'Please upload an SVG, PNG, or JPG file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      state.customImageSrc = e.target.result;
      state.customImageName = file.name;
      if (state.logoMode !== 'both') {
        state.logoMode = 'image';
      }

      if (logoThumbPreview) logoThumbPreview.src = e.target.result;
      if (logoFileName) logoFileName.textContent = file.name;
      if (uploadPrompt) uploadPrompt.style.display = 'none';
      if (uploadedLogoInfo) uploadedLogoInfo.style.display = 'flex';

      setMode(state.logoMode);
    };
    reader.readAsDataURL(file);
  }

  if (logoUploadZone && logoFileInput) {
    logoUploadZone.addEventListener('click', (e) => {
      if (e.target.closest('#logoRemoveBtn')) return;
      logoFileInput.click();
    });

    logoFileInput.addEventListener('change', (e) => {
      const files = (e.target && e.target.files) || logoFileInput.files;
      if (files && files[0]) {
        handleLogoFile(files[0]);
      }
    });

    // Drag & drop handlers
    logoUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      logoUploadZone.classList.add('dragover');
    });

    logoUploadZone.addEventListener('dragleave', () => {
      logoUploadZone.classList.remove('dragover');
    });

    logoUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      logoUploadZone.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLogoFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Remove Uploaded Logo Button
  if (logoRemoveBtn) {
    logoRemoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.customImageSrc = null;
      state.customImageName = '';
      if (logoFileInput) logoFileInput.value = '';
      if (uploadPrompt) uploadPrompt.style.display = 'flex';
      if (uploadedLogoInfo) uploadedLogoInfo.style.display = 'none';

      // If in image-only mode, revert to Text mode
      if (state.logoMode === 'image') {
        setMode('text');
      } else {
        updateVisualizer();
      }
    });
  }

  // Dimension buttons
  document.querySelectorAll('[data-dimension]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-dimension]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.dimension = btn.getAttribute('data-dimension');
      updateVisualizer();
    });
  });

  // Fold buttons
  document.querySelectorAll('[data-fold]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-fold]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.fold = btn.getAttribute('data-fold');
      updateVisualizer();
    });
  });

  // Material buttons
  document.querySelectorAll('[data-material]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-material]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.material = btn.getAttribute('data-material');
      updateVisualizer();
    });
  });

  // Branding Imprint buttons
  document.querySelectorAll('[data-branding]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-branding]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.branding = btn.getAttribute('data-branding');
      updateVisualizer();
    });
  });

  // Personalization: Custom Text Input (Preserves spaces, instant live feedback)
  if (customTextInput) {
    ['input', 'keyup', 'change'].forEach(evt => {
      customTextInput.addEventListener(evt, () => {
        state.customText = customTextInput.value;
        updateVisualizer();
      });
    });
  }

  // Personalization: Custom Font Family Select
  if (customFontSelect) {
    customFontSelect.addEventListener('change', () => {
      state.customFont = customFontSelect.value;
      updateVisualizer();
    });
  }

  // Personalization: Custom Brand Font File Uploader (.ttf, .otf, .woff, .woff2)
  function initCustomFontUploader() {
    const fontUploadBtn = document.getElementById('fontUploadBtn');
    const customFontFileInput = document.getElementById('customFontFileInput');
    const uploadedFontBadge = document.getElementById('uploadedFontBadge');
    const uploadedFontName = document.getElementById('uploadedFontName');
    const fontResetBtn = document.getElementById('fontResetBtn');

    if (!fontUploadBtn || !customFontFileInput || !customFontSelect) return;

    fontUploadBtn.addEventListener('click', () => {
      customFontFileInput.click();
    });

    customFontFileInput.addEventListener('change', async (e) => {
      const file = (e.target && e.target.files && e.target.files[0]) || customFontFileInput.files[0];
      if (!file) return;

      const validExts = /\.(ttf|otf|woff|woff2)$/i;
      if (!file.name.match(validExts)) {
        const dict = i18n[currentLang] || i18n.pt;
        alert(dict.fold_invalid_font_alert || 'Por favor carregue um ficheiro de fonte válido (.ttf, .otf, .woff, .woff2).');
        customFontFileInput.value = '';
        return;
      }

      try {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').trim();
        const fontFamilyName = 'CustomFont_' + cleanName.replace(/[^a-zA-Z0-9_]/g, '_') + '_' + Date.now();

        const arrayBuffer = await file.arrayBuffer();
        const customFontFace = new FontFace(fontFamilyName, arrayBuffer);
        await customFontFace.load();
        document.fonts.add(customFontFace);

        // Check if an uploaded font option already exists, or create a new one
        let customOpt = customFontSelect.querySelector('option[data-custom-font="true"]');
        const dict = i18n[currentLang] || i18n.pt;
        const optLabel = `${cleanName} ${dict.fold_custom_font_option || '(Fonte Carregada)'}`;

        if (!customOpt) {
          customOpt = document.createElement('option');
          customOpt.setAttribute('data-custom-font', 'true');
          customFontSelect.insertBefore(customOpt, customFontSelect.firstChild);
        }

        customOpt.value = fontFamilyName;
        customOpt.textContent = optLabel;
        customFontSelect.value = fontFamilyName;

        state.customFont = fontFamilyName;

        // Show status badge
        if (uploadedFontName) uploadedFontName.textContent = file.name;
        if (uploadedFontBadge) uploadedFontBadge.style.display = 'flex';

        updateVisualizer();
      } catch (err) {
        console.error('Error loading custom font:', err);
        alert(currentLang === 'pt' ? 'Erro ao carregar a fonte. Verifique o formato do ficheiro.' : 'Error loading font. Please verify file format.');
      }
    });

    if (fontResetBtn) {
      fontResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const customOpt = customFontSelect.querySelector('option[data-custom-font="true"]');
        if (customOpt) customOpt.remove();

        customFontFileInput.value = '';
        if (uploadedFontBadge) uploadedFontBadge.style.display = 'none';

        // Revert to default font
        customFontSelect.value = "'Segoe Script', cursive";
        state.customFont = "'Segoe Script', cursive";

        updateVisualizer();
      });
    }
  }

  initCustomFontUploader();

  // Personalization: Native Color Wheel Input (mouse picking)
  if (imprintColorPicker) {
    imprintColorPicker.addEventListener('input', () => {
      applyCustomColor(imprintColorPicker.value);
    });
    imprintColorPicker.addEventListener('change', () => {
      applyCustomColor(imprintColorPicker.value);
    });
  }

  // Personalization: Hex Code Input (direct hex typing)
  if (imprintHexInput) {
    imprintHexInput.addEventListener('input', () => {
      let raw = imprintHexInput.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
      imprintHexInput.value = raw;
      if (raw.length === 6 || raw.length === 3) {
        const hex = '#' + (raw.length === 3 ? raw.split('').map(c => c + c).join('') : raw);
        applyCustomColor(hex);
      }
    });
  }

  // Personalization: Preset Swatches
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const color = btn.getAttribute('data-color');
      applyCustomColor(color);
    });
  });

  // Personalization: Font Size Slider
  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', () => {
      state.fontSize = parseInt(fontSizeSlider.value, 10) || 18;
      if (fontSizeDisplay) fontSizeDisplay.textContent = `${state.fontSize}px`;
      updateVisualizer();
    });
  }

  // Personalization: Logo Image Scale Slider
  if (logoSizeSlider) {
    logoSizeSlider.addEventListener('input', () => {
      state.logoScale = parseInt(logoSizeSlider.value, 10) || 70;
      if (logoSizeDisplay) logoSizeDisplay.textContent = `${state.logoScale}%`;
      updateVisualizer();
    });
  }

  // Personalization: Placement Matrix & Presets
  function setPlacement(pos) {
    if (!pos) return;
    state.placement = pos;
    state.customPos = null; // Reset custom dragged position to snap to preset
    matrixCells.forEach(cell => {
      cell.classList.toggle('active', cell.getAttribute('data-pos') === pos);
    });
    placementPresets.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-pos') === pos);
    });
    updateVisualizer();
  }

  matrixCells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      e.preventDefault();
      const pos = cell.getAttribute('data-pos');
      setPlacement(pos);
    });
  });

  placementPresets.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pos = btn.getAttribute('data-pos');
      setPlacement(pos);
    });
  });

  // Stage Toolbar: Scale Mode Toggle (Fit vs 1:1 Real Size)
  if (scaleFitBtn && scaleRealBtn) {
    scaleFitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.scaleMode = 'fit';
      scaleFitBtn.classList.add('active');
      scaleRealBtn.classList.remove('active');
      updateVisualizer();
    });

    scaleRealBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.scaleMode = 'real';
      scaleRealBtn.classList.add('active');
      scaleFitBtn.classList.remove('active');
      updateVisualizer();
    });
  }

  // Stage Toolbar: Fullscreen Toggle
  if (fullscreenBtn && visualizerStage) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.isFullscreen = !state.isFullscreen;
      visualizerStage.classList.toggle('stage-fullscreen', state.isFullscreen);
      fullscreenBtn.classList.toggle('active', state.isFullscreen);
    });
  }

  // Auto-detect screen resize to show/hide 1:1 option
  window.addEventListener('resize', () => {
    updateVisualizer();
  });

  // Interactive Direct Drag & Move for Napkin Logo / Imprint
  function initImprintDragController() {
    if (!napkinLogoImprint || !napkinEl) return;

    let isDragging = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let hasMoved = false;

    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();

      isDragging = true;
      hasMoved = false;
      startPointerX = e.clientX;
      startPointerY = e.clientY;

      const imprintRect = napkinLogoImprint.getBoundingClientRect();

      // Mouse offset relative to imprint center
      grabOffsetX = e.clientX - (imprintRect.left + imprintRect.width / 2);
      grabOffsetY = e.clientY - (imprintRect.top + imprintRect.height / 2);

      napkinLogoImprint.classList.add('is-dragging');
      if (napkinLogoImprint.setPointerCapture && e.pointerId !== undefined) {
        try {
          napkinLogoImprint.setPointerCapture(e.pointerId);
        } catch (err) {}
      }

      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      const deltaX = Math.abs(e.clientX - startPointerX);
      const deltaY = Math.abs(e.clientY - startPointerY);
      if (deltaX > 2 || deltaY > 2) {
        hasMoved = true;
      }

      if (!hasMoved) return;
      e.preventDefault();

      const napkinRect = napkinEl.getBoundingClientRect();

      // Target center of imprint based on pointer minus grab offset
      const targetCenterX = (e.clientX - grabOffsetX) - napkinRect.left;
      const targetCenterY = (e.clientY - grabOffsetY) - napkinRect.top;

      // Allow dragging all the way to outermost edges regardless of logo size!
      // Keep a small margin (6px) so element remains grabbable
      const edgeMargin = 6;
      const clampedX = Math.max(edgeMargin, Math.min(napkinRect.width - edgeMargin, targetCenterX));
      const clampedY = Math.max(edgeMargin, Math.min(napkinRect.height - edgeMargin, targetCenterY));

      const xPct = Math.round((clampedX / napkinRect.width) * 10000) / 100;
      const yPct = Math.round((clampedY / napkinRect.height) * 10000) / 100;

      state.customPos = { xPct, yPct };

      // Direct continuous update during drag
      napkinLogoImprint.className = 'napkin-logo-imprint pos-custom is-dragging';
      napkinLogoImprint.style.left = `${xPct}%`;
      napkinLogoImprint.style.top = `${yPct}%`;
      napkinLogoImprint.style.right = 'auto';
      napkinLogoImprint.style.bottom = 'auto';
      napkinLogoImprint.style.transform = 'translate(-50%, -50%)';

      // Clear preset active classes to indicate custom placement
      matrixCells.forEach(cell => cell.classList.remove('active'));
      placementPresets.forEach(btn => btn.classList.remove('active'));
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      napkinLogoImprint.classList.remove('is-dragging');

      if (napkinLogoImprint.releasePointerCapture && e.pointerId !== undefined) {
        try {
          napkinLogoImprint.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    }

    napkinLogoImprint.addEventListener('pointerdown', onPointerDown);
  }

  initImprintDragController();

  // Initial render
  updateVisualizer();
}

/* ==========================================================================
   Product Filter Tabs
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
