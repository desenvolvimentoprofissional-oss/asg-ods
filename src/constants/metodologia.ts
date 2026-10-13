import {
  Brain,
  Video,
  Headphones,
  Briefcase,
  Layers,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Puzzle,
  Library,
} from 'lucide-react';

export const metodologiaData = {
  header: {
    title: 'Metodologia Dinâmica',
    subtitle:
      'Uma abordagem pedagógica moderna, multiformato e orientada para a prática, ' +
      'desenhada para engajar os estudantes da nova geração.',
  },
  intro: {
    title: "Por que 'Dinâmica'?",
    description:
      'Nossa metodologia rompe com o modelo tradicional de ensino passivo. ' +
      'Combinamos pílulas de conhecimento em vídeo com estudos de caso imersivos em áudio, ' +
      'criando um ecossistema que respeita o ritmo do aluno e facilita a adoção pelo professor.',
  },
  pillars: [
    {
      icon: Brain,
      title: 'Taxonomia de Bloom',
      desc:
        'Evolução cognitiva intencional: do conhecimento básico (identificar, listar) ' +
        'até a alta complexidade (analisar, criar, avaliar).',
    },
    {
      icon: Layers,
      title: 'Microlearning',
      desc:
        'Conteúdos divididos em blocos de 30 a 60 minutos, otimizando a retenção de atenção ' +
        'e facilitando o encaixe na rotina de estudos.',
    },
    {
      icon: Briefcase,
      title: 'Conexão com o Mercado',
      desc:
        'Cases reais trazidos por instituições de referência (CRA-SP, ANGRAD, ETHOS, IBGC e PRME), ' +
        'unindo a teoria acadêmica à realidade corporativa.',
    },
    {
      icon: RefreshCw,
      title: 'Sala de Aula Invertida',
      desc:
        'O aluno consome o conteúdo multimídia previamente, liberando o tempo em sala para ' +
        'debates ricos e resolução de problemas com o professor.',
    },
  ],
  formats: {
    title: 'Formatos de Aprendizagem',
    description:
      'Conheça os formatos desenvolvidos para maximizar o engajamento e a retenção do aprendizado. ' +
      'Cada recurso foi desenhado para oferecer uma experiência imersiva, unindo teoria sólida e ' +
      'aplicação prática no dia a dia dos futuros gestores.',
    items: [
      {
        icon: Video,
        title: 'Videoaulas',
        duration: '30 a 60 minutos',
        desc:
          'Exposições dinâmicas conduzidas por especialistas de mercado, projetadas para solidificar ' +
          'a base teórica e os conceitos fundamentais de cada dimensão do ASG.',
      },
      {
        icon: Headphones,
        title: 'Podcasts',
        duration: '30 a 60 minutos',
        desc:
          'Formato em áudio imersivo que explora dilemas corporativos reais, crises de imagem e casos ' +
          'de sucesso, estimulando o pensamento crítico e a escuta ativa.',
      },
      {
        icon: BookOpen,
        title: 'Material de Apoio',
        duration: 'Guia do Professor',
        desc:
          'Guias práticos, sugestões de debates e roteiros de dinâmicas em sala, oferecendo suporte ' +
          'completo para o professor mediar o conteúdo com excelência.',
      },
    ],
  },
  implementation: {
    title: 'Flexibilidade de Implementação',
    description:
      'O Componente Curricular de ASG e ODS possui arquitetura modular, permitindo que as IES adotem ' +
      'o material da forma que melhor se adequar às suas matrizes, seja como disciplina completa ou apoio docente.',
    options: [
      {
        icon: GraduationCap,
        title: 'Adoção Integral (24h)',
        desc:
          'Implementação integral de todos os objetivos de aprendizagem como disciplina optativa, ' +
          'curso de extensão ou atividade complementar.',
        badge: 'Carga Horária Integral',
      },
      {
        icon: Puzzle,
        title: 'Inserção Modular',
        desc:
          'Uso de módulos específicos (ex: Governança) dentro de disciplinas já existentes ' +
          '(ex: Direito Empresarial ou Ética).',
        badge: 'Módulos Avulsos',
      },
      {
        icon: Library,
        title: 'Material de Apoio',
        desc:
          'Utilização dos podcasts e videoaulas como bibliografia complementar ou material ' +
          'para metodologias ativas em sala.',
        badge: 'Suporte Docente',
      },
    ],
  },
};
