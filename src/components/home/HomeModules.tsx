import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { modulesData } from '../../constants/modules';
import type { Module } from '../../constants/modules';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ModuleBadgeDuration({ partner, duration }: { partner: string; duration: string }) {
  const containerCls =
    'flex items-center justify-between w-full md:w-auto md:flex-col md:items-end ' +
    'md:justify-between md:self-stretch pt-4 md:pt-0 md:pl-6 border-t border-gray-100 md:border-t-0';

  return (
    <div className={containerCls}>
      <div className="flex md:items-start">
        <Badge variant="blue-light" className="partner-badge">{partner}</Badge>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-gray-500 md:pb-0.5">
        <Clock size={14} />
        {duration}
      </div>
    </div>
  );
}

export function HomeModuleItem({ mod }: { mod: Module }) {
  return (
    <div className="relative pl-8 md:pl-12 mb-8 last:mb-0 group">
      <div
        className={
          'absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center ' +
          'rounded-full bg-blue-900 text-white shadow-sm ring-4 ring-gray-50 ' +
          'transition-transform group-hover:scale-110'
        }
      >
        <span className="text-xs font-bold">{mod.id}</span>
      </div>

      <Card hoverable className="flex flex-col md:flex-row md:items-stretch justify-between gap-4 p-6">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
              <mod.icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{mod.title}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed md:pl-[52px]">{mod.description}</p>
        </div>
        <ModuleBadgeDuration partner={mod.partner} duration={mod.duration} />
      </Card>
    </div>
  );
}

export function HomeModulesLink() {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        to="/trilha"
        className={
          'group flex items-center gap-2 text-sm font-medium text-blue-800 ' +
          'hover:text-blue-900 transition-colors bg-blue-50/50 hover:bg-blue-50 ' +
          'px-6 py-2.5 rounded-full border border-blue-100'
        }
      >
        Saiba mais
        <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function HomeModules() {
  return (
    <section className="bg-gray-50">
      <div className="crasp-page-container py-10">
        <SectionHeader title="Objetivos de Aprendizagem" className="mb-6" />
        <p className="mb-6 text-lg text-gray-600 leading-relaxed">
          Estruturados em módulos flexíveis, o componente facilita a integração de ASG e ODS nos cursos de
          Administração e Gestão das Instituições de Educação Superior. O conteúdo pode ser adotado
          integralmente ou adaptado à realidade de cada curso e disciplina.
        </p>

        <div className="mx-auto max-w-4xl">
          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6">
            {modulesData.map((mod) => (
              <HomeModuleItem key={mod.id} mod={mod} />
            ))}
          </div>
        </div>

        <HomeModulesLink />
      </div>
    </section>
  );
}
