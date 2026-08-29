export type Cidade = {
  slug: string;
  nome: string;
  regiao: 'Norte' | 'Sul';
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string[];
};

export const cidades: Cidade[] = [
  {
    slug: 'sao-sebastiao',
    nome: 'São Sebastião',
    regiao: 'Norte',
    metaTitle: 'IA para corretores em São Sebastião — PraiaDigital',
    metaDescription:
      'Modelos, scripts e automações de IA para corretores de imóveis em São Sebastião. Capture mais leads no litoral norte de SP.',
    ogImage: '/img/og/sao-sebastiao.jpg',
    keywords: [
      'IA corretores São Sebastião',
      'automação imobiliária São Sebastião',
      'marketing imobiliário litoral norte'
    ]
  },
  {
    slug: 'ubatuba',
    nome: 'Ubatuba',
    regiao: 'Norte',
    metaTitle: 'IA para corretores em Ubatuba — PraiaDigital',
    metaDescription:
      'Ferramentas de IA para corretores em Ubatuba: atendimento, follow-up e conteúdo local para aluguel temporada e venda.',
    ogImage: '/img/og/ubatuba.jpg',
    keywords: [
      'IA corretores Ubatuba',
      'corretor Ubatuba IA',
      'marketing imobiliário Ubatuba'
    ]
  },
  {
    slug: 'caraguatatuba',
    nome: 'Caraguatatuba',
    regiao: 'Norte',
    metaTitle: 'IA para corretores em Caraguatatuba — PraiaDigital',
    metaDescription:
      'Soluções de IA para imobiliárias e corretores em Caraguatatuba: leads qualificados, WhatsApp e anúncios no litoral.',
    ogImage: '/img/og/caraguatatuba.jpg',
    keywords: [
      'IA corretores Caraguatatuba',
      'marketing Caraguatatuba',
      'imobiliária Caraguatatuba'
    ]
  },
  {
    slug: 'ilhabela',
    nome: 'Ilhabela',
    regiao: 'Norte',
    metaTitle: 'IA para corretores em Ilhabela — PraiaDigital',
    metaDescription:
      'Inteligência artificial para corretores em Ilhabela: captação, conteúdo e conversão para imóveis de temporada e venda.',
    ogImage: '/img/og/ilhabela.jpg',
    keywords: [
      'IA corretores Ilhabela',
      'corretor Ilhabela',
      'imóveis Ilhabela IA'
    ]
  }
];

export function cidadePorSlug(slug: string): Cidade | undefined {
  return cidades.find((c) => c.slug === slug);
}

export function metaCidade(slug: string) {
  const cidade = cidadePorSlug(slug);
  if (!cidade) return null;

  return {
    title: cidade.metaTitle,
    description: cidade.metaDescription,
    image: cidade.ogImage,
    canonical: `https://praia.digital/hub/ia-corretores-litoral.html?cidade=${cidade.slug}`,
    keywords: cidade.keywords.join(', ')
  };
}
