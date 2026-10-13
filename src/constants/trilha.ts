import { Clock, PlayCircle, Headphones } from 'lucide-react';

export const trilhaData = {
  header: {
    title: 'Objetivos de Aprendizagem',
    subtitle:
      'Uma jornada de 24 horas passando por Histórico, Dimensão Ambiental, Social, ' +
      'Governança, Integridade Socioambiental, Mensuração e Investimento',
  },
  format: {
    title: 'Estrutura e Formato',
    description:
      'Cada módulo foi pedagogicamente estruturado com base na Taxonomia de Bloom, ' +
      'garantindo profundidade de aprendizado. A carga horária de 4 horas por módulo é composta por:',
    items: [
      {
        icon: PlayCircle,
        title: 'Videoaulas',
        desc: 'Exposições conceituais aprofundadas com especialistas do mercado.',
      },
      {
        icon: Headphones,
        title: 'Podcasts e Cases',
        desc: 'Exploração de casos reais para conectar a teoria à prática.',
      },
      {
        icon: Clock,
        title: 'Carga Horária',
        desc: '24 horas totais (6 módulos de 4 horas cada).',
      },
    ],
  },
};
