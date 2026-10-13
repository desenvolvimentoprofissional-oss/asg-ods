import { modulesData } from '../../constants/modules';
import type { Module } from '../../constants/modules';
import { TrilhaModuleCard } from './TrilhaModuleCard';

export function TimelineModuleItem({ mod }: { mod: Module }) {
  return (
    <div id={`modulo-${mod.id}`} className="relative pl-8 md:pl-12 mb-8 last:mb-0 group scroll-mt-32">
      <div
        className={
          'absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center ' +
          'rounded-full bg-blue-900 text-white shadow-sm ring-4 ring-gray-50 ' +
          'transition-transform group-hover:scale-110'
        }
      >
        <span className="text-xs font-bold">{mod.id}</span>
      </div>
      <TrilhaModuleCard mod={mod} />
    </div>
  );
}

export function TrilhaTimeline() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="crasp-page-container">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">Objetivos de Aprendizagem</h2>
          </div>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            Estruturados em módulos flexíveis, o componente facilita a integração de ASG e ODS
            nos cursos de Administração e Gestão das Instituições de Educação Superior. O conteúdo pode ser
            adotado integralmente ou adaptado à realidade de cada curso e disciplina.
          </p>

          <div className="mx-auto max-w-5xl">
            <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6">
              {modulesData.map((mod) => (
                <TimelineModuleItem key={mod.id} mod={mod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
