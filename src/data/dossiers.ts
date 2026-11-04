export interface Deliverable {
  titleKey: string;
  descKey: string;
  techIconClass: string;
  techIconSvg: string;
  techIconColor: string;
  techTooltip: string;
}

export interface SpecCol {
  keyLabelKey: string;
  valLabelKey: string;
  defaultKey: string;
  defaultVal: string;
}

export interface DossierData {
  slug: string;
  titleKey: string;
  defaultTitle: string;
  taglineKey: string;
  defaultTagline: string;
  badgeKey: string;
  defaultBadge: string;
  logoSvg: string;
  logoColor: string;
  logoClass: string;
  specs: SpecCol[];
  problemTitleKey: string;
  defaultProblemTitle: string;
  problemTextKey: string;
  defaultProblemText: string;
  solutionTitleKey: string;
  defaultSolutionTitle: string;
  solutionTextKey: string;
  defaultSolutionText: string;
  deliverables: Deliverable[];
  formService: string;
}

export const dossiers: Record<string, DossierData> = {
  astro: {
    slug: 'astro',
    titleKey: 'astro_hero_title',
    defaultTitle: 'Custom Made Astro Websites',
    taglineKey: 'astro_hero_tagline',
    defaultTagline: 'Zero-JavaScript by default, sub-second delivery, and heavy-duty static architecture.',
    badgeKey: 'astro_badge',
    defaultBadge: 'STATIC / ISLAND ARCHITECTURE',
    logoSvg: '<path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z"/>',
    logoColor: '#FF5D01',
    logoClass: 'tech-icon-astro',
    specs: [
      { keyLabelKey: 'astro_spec1_k', valLabelKey: 'astro_spec1_v', defaultKey: 'ENGINE', defaultVal: 'Astro 4 / 5, TypeScript, Tailwind CSS, Island Architecture' },
      { keyLabelKey: 'astro_spec2_k', valLabelKey: 'astro_spec2_v', defaultKey: 'PERFORMANCE', defaultVal: '100/100 Core Web Vitals, < 0.2s TTFB, Zero JS Default' },
      { keyLabelKey: 'astro_spec3_k', valLabelKey: 'astro_spec3_v', defaultKey: 'CONTENT & CMS', defaultVal: 'Type-Safe Content Collections, Markdown, Decoupled CMS' },
      { keyLabelKey: 'astro_spec4_k', valLabelKey: 'astro_spec4_v', defaultKey: 'INFRASTRUCTURE', defaultVal: 'Cloudflare Pages, Edge Functions, Global CDN' }
    ],
    problemTitleKey: 'astro_prob_title',
    defaultProblemTitle: 'The JavaScript Bloat Trap: Heavy SPAs & Sluggish Mobile Load',
    problemTextKey: 'astro_prob_text',
    defaultProblemText: "Most modern web agencies build websites on bloated JavaScript frameworks that download megabytes of unnecessary code to the user's browser. The result is sluggish mobile performance, terrible Google Core Web Vitals, high server compute bills, and lost conversion opportunities.",
    solutionTitleKey: 'astro_sol_title',
    defaultSolutionTitle: 'The BRUTO Standard: Pure Static HTML & Interactive Islands',
    solutionTextKey: 'astro_sol_text',
    defaultSolutionText: "We engineer custom Astro websites that render 100% pure, lightweight HTML by default. Interactive components only hydrate as isolated 'islands' when scrolled into view. Your site loads instantly, scores perfect 100s on Google PageSpeed, and delivers uncompromising security deployed directly to Cloudflare's global edge network.",
    deliverables: [
      {
        titleKey: 'astro_d1_t',
        descKey: 'astro_d1_d',
        techIconClass: 'tech-icon-astro',
        techIconSvg: '<path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z"/>',
        techIconColor: '#FF5D01',
        techTooltip: 'Astro'
      },
      {
        titleKey: 'astro_d2_t',
        descKey: 'astro_d2_d',
        techIconClass: 'tech-icon-typescript',
        techIconSvg: '<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>',
        techIconColor: '#3178C6',
        techTooltip: 'TypeScript'
      },
      {
        titleKey: 'astro_d3_t',
        descKey: 'astro_d3_d',
        techIconClass: 'tech-icon-cloudflare',
        techIconSvg: '<path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/>',
        techIconColor: '#F38020',
        techTooltip: 'Cloudflare Pages'
      },
      {
        titleKey: 'astro_d4_t',
        descKey: 'astro_d4_d',
        techIconClass: 'tech-icon-tailwindcss',
        techIconSvg: '<path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>',
        techIconColor: '#06B6D4',
        techTooltip: 'Tailwind CSS'
      }
    ],
    formService: 'astro'
  }
};
