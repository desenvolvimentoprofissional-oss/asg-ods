export interface Signatory {
  name: string;
  logo: string;
  description: string;
  filterId?: string;
  imgClass?: string;
}

export const signatories: Signatory[] = [
  {
    name: 'CRA-SP',
    logo: 'https://crasp-frontend.vercel.app/cra-sp2.svg',
    description:
      'O Conselho Regional de Administração de São Paulo é uma autarquia federal pertencente ao ' +
      'Sistema CFA/CRAs que tem como principais funções o registro e a fiscalização do exercício ' +
      'profissional nas áreas da Administração. Com atuação social, o CRA-SP também apoia e ' +
      'participa de projetos que possam colaborar com a formação dos futuros profissionais ' +
      'e a valorização da profissão.',
    imgClass: 'max-h-[45px] max-w-[140px]',
  },
  {
    name: 'ANGRAD',
    logo: 'https://hackathonenangrad.espm.edu.br/wp-content/uploads/logo-angrad.png',
    description:
      'A Associação Nacional dos Cursos de Graduação em Administração é uma entidade que tem como ' +
      'missão promover a sinergia e o fortalecimento das escolas de Administração e Gestão, ' +
      'estimulando a formação de líderes competentes e comprometidos com um mundo economicamente ' +
      'viável, socialmente justo e ambientalmente equilibrado.',
    imgClass: 'max-h-[55px] max-w-[180px] scale-125',
  },
  {
    name: 'Instituto Ethos',
    logo: 'https://www.ethos.org.br/wp-content/uploads/2024/09/footer-logo.png',
    description:
      'O Instituto Ethos é uma organização da sociedade civil brasileira pioneira na mobilização ' +
      'de empresas por uma atuação justa e responsável. O Ethos nasceu ASG, pois desde 1998 as ' +
      'pautas da responsabilidade social, ética e sustentabilidade guiam todas as suas atividades, ' +
      'desenvolvendo indicadores para auxiliar as empresas a se tornarem mais diversas, inclusivas e éticas.',
    filterId: 'colorize-ethos',
    imgClass: 'max-h-[40px] max-w-[130px]',
  },
  {
    name: 'IBGC',
    logo:
      'https://firebasestorage.googleapis.com/v0/b/sig3-914eb.firebasestorage.app/o/banners%2F' +
      '1784744226851_logo-ibgc-com-descritivo-horizontal-RGB-negativo.png' +
      '?alt=media&token=ec4a59cb-4771-4216-aae3-dffa8258a6dd',
    description:
      'O Instituto Brasileiro de Governança Corporativa é uma organização da sociedade civil ' +
      'que atua como a maior referência no Brasil e uma das principais no mundo em governança ' +
      'corporativa. Seu objetivo é gerar e disseminar conhecimento em governança corporativa e ' +
      'influenciar os mais diversos agentes na adoção das melhores práticas, contribuindo para ' +
      'o desempenho sustentável das organizações.',
    filterId: 'colorize-ibgc',
    imgClass: 'max-h-[72px] max-w-[250px] scale-[1.45]',
  },
  {
    name: 'PRME',
    logo: 'https://ju.se/images/18.7910f38417dc32933f5f2/1639658062657/prme-stacked-solid-rgb.png',
    description:
      'O Principles for Responsible Management Education é uma iniciativa apoiada pelas Nações ' +
      'Unidas que visa inspirar e engajar o ensino de gestão, pesquisa e liderança com foco na ' +
      'sustentabilidade e responsabilidade social. O PRME atua desenvolvendo os futuros líderes ' +
      'para equilibrar objetivos econômicos e de sustentabilidade, alinhando as instituições ' +
      'acadêmicas aos ODS.',
    imgClass: 'max-h-[50px] max-w-[140px]',
  },
];
