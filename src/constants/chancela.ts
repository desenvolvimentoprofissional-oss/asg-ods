export interface Signatory {
  name: string;
  logo: string;
  description: string;
  filterStyle?: string;
  filterId?: string;
  imgClass?: string;
}

export const signatories: Signatory[] = [
  {
    name: 'CRA-SP',
    logo: '/imgs/partners/crasp.svg',
    description:
      'O Conselho Regional de Administração de São Paulo é uma autarquia federal pertencente ao ' +
      'Sistema CFA/CRAs que tem como principais funções o registro e a fiscalização do exercício ' +
      'profissional nas áreas da Administração. Com atuação social, o CRA-SP também apoia e ' +
      'participa de projetos que possam colaborar com a formação dos futuros profissionais ' +
      'e a valorização da profissão.',
    imgClass: 'max-h-[48px] max-w-[140px]',
  },
  {
    name: 'ANGRAD',
    logo: '/imgs/partners/angrad.png',
    description:
      'A Associação Nacional dos Cursos de Graduação em Administração é uma entidade que tem como ' +
      'missão promover a sinergia e o fortalecimento das escolas de Administração e Gestão, ' +
      'estimulando a formação de líderes competentes e comprometidos com um mundo economicamente ' +
      'viável, socialmente justo e ambientalmente equilibrado.',
    imgClass: 'max-h-[50px] max-w-[160px]',
  },
  {
    name: 'Instituto Ethos',
    logo: '/imgs/partners/ethos.png',
    description:
      'O Instituto Ethos é uma organização da sociedade civil brasileira pioneira na mobilização ' +
      'de empresas por uma atuação justa e responsável. O Ethos nasceu ASG, pois desde 1998 as ' +
      'pautas da responsabilidade social, ética e sustentabilidade guiam todas as suas atividades, ' +
      'desenvolvendo indicadores para auxiliar as empresas a se tornarem mais diversas, inclusivas e éticas.',
    filterStyle:
      'brightness(0) invert(42%) sepia(90%) saturate(1400%) hue-rotate(165deg) ' +
      'brightness(95%) contrast(110%)',
    imgClass: 'max-h-[46px] max-w-[130px]',
  },
  {
    name: 'IBGC',
    logo: '/imgs/partners/ibgc.png',
    description:
      'O Instituto Brasileiro de Governança Corporativa é uma organização da sociedade civil ' +
      'que atua como a maior referência no Brasil e uma das principais no mundo em governança ' +
      'corporativa. Seu objetivo é gerar e disseminar conhecimento em governança corporativa e ' +
      'influenciar os mais diversos agentes na adoção das melhores práticas, contribuindo para ' +
      'o desempenho sustentável das organizações.',
    filterStyle:
      'brightness(0) invert(18%) sepia(90%) saturate(2800%) hue-rotate(205deg) ' +
      'brightness(95%) contrast(110%)',
    imgClass: 'max-h-[52px] max-w-[170px]',
  },
  {
    name: 'PRME',
    logo: '/imgs/partners/prme.png',
    description:
      'O Principles for Responsible Management Education é uma iniciativa apoiada pelas Nações ' +
      'Unidas que visa inspirar e engajar o ensino de gestão, pesquisa e liderança com foco na ' +
      'sustentabilidade e responsabilidade social. O PRME atua desenvolvendo os futuros líderes ' +
      'para equilibrar objetivos econômicos e de sustentabilidade, alinhando as instituições ' +
      'acadêmicas aos ODS.',
    filterStyle:
      'brightness(0) invert(18%) sepia(35%) saturate(2000%) hue-rotate(180deg) ' +
      'brightness(90%) contrast(110%)',
    imgClass: 'max-h-[48px] max-w-[140px]',
  },
];
