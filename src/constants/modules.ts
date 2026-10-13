import { History, Leaf, Users, Landmark, ShieldCheck, BarChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  detailsMod1,
  detailsMod2,
  detailsMod3,
  detailsMod4,
  detailsMod5,
  detailsMod6,
} from './modulesDetails';
import type { ModuleDetail } from './modulesDetails';

export type { ModuleDetail };

export interface Module {
  id: number;
  title: string;
  partner: string;
  duration: string;
  description: string;
  icon: LucideIcon;
  details: ModuleDetail[];
}

export const modulesData: Module[] = [
  {
    id: 1,
    title: 'Histórico da RSC e do ASG',
    partner: 'CRA-SP',
    duration: '4h',
    description: 'Evolução conceitual da filantropia ao ASG e a relevância do Administrador.',
    icon: History,
    details: detailsMod1,
  },
  {
    id: 2,
    title: 'Dimensão Ambiental',
    partner: 'ANGRAD',
    duration: '4h',
    description: 'Gestão de emissões, água, resíduos e metodologias GEE.',
    icon: Leaf,
    details: detailsMod2,
  },
  {
    id: 3,
    title: 'Dimensão Social',
    partner: 'PRME',
    duration: '4h',
    description: 'Capital Humano, Cadeia de Valor e Direitos Humanos.',
    icon: Users,
    details: detailsMod3,
  },
  {
    id: 4,
    title: 'Dimensão Governança',
    partner: 'IBGC',
    duration: '4h',
    description: 'Princípios de governança, conselho de administração e accountability.',
    icon: Landmark,
    details: detailsMod4,
  },
  {
    id: 5,
    title: 'Integridade Socioambiental',
    partner: 'ETHOS',
    duration: '4h',
    description: 'Ética, compliance, Lei Anticorrupção e due diligence.',
    icon: ShieldCheck,
    details: detailsMod5,
  },
  {
    id: 6,
    title: 'Mensuração e Investimento',
    partner: 'ANGRAD',
    duration: '4h',
    description: 'Estruturas de reporting, greenwashing e proposta de valor.',
    icon: BarChart,
    details: detailsMod6,
  },
];
