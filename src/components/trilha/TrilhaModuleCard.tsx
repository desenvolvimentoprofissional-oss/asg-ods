import { Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Module, ModuleDetail } from '../../constants/modules';

export function ModulePartnerBadge({ partner, duration }: { partner: string; duration: string }) {
  const containerCls =
    'flex items-center justify-between w-full md:w-auto md:flex-col md:items-end ' +
    'md:justify-between md:self-stretch border-t border-gray-100 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6';

  return (
    <div className={containerCls}>
      <div className="flex md:items-start">
        <Badge variant="blue-light">{partner}</Badge>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-gray-500 md:pb-0.5">
        <Clock size={14} />
        {duration}
      </div>
    </div>
  );
}

export function TrilhaModuleCardHeader({ mod }: { mod: Module }) {
  return (
    <div
      className={
        'flex flex-col md:flex-row md:items-stretch justify-between gap-4 p-6 ' +
        'border-b border-gray-100 bg-white'
      }
    >
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
            <mod.icon size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{mod.title}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed md:pl-[52px]">{mod.description}</p>
      </div>
      <ModulePartnerBadge partner={mod.partner} duration={mod.duration} />
    </div>
  );
}

export function ModuleTableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
        <th className="pb-3 font-semibold w-1/5">Nível de Bloom</th>
        <th className="pb-3 font-semibold w-1/5">Verbo de Ação</th>
        <th className="pb-3 font-semibold w-auto">Objetivo de Aprendizagem</th>
        <th className="pb-3 font-semibold w-20 text-right">Carga</th>
      </tr>
    </thead>
  );
}

export function ModuleDetailRow({ obj }: { obj: ModuleDetail }) {
  return (
    <tr className="hover:bg-white transition-colors">
      <td className="py-4 pr-4 align-top">
        <span
          className={
            'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ' +
            'bg-blue-50 text-blue-800 border border-blue-100'
          }
        >
          {obj.bloom}
        </span>
      </td>
      <td className="py-4 pr-4 text-sm font-medium text-gray-900 align-top">{obj.verb}</td>
      <td className="py-4 pr-4 text-sm text-gray-600 leading-relaxed align-top">{obj.obj}</td>
      <td className="py-4 text-right text-sm font-medium text-gray-500 align-top">{obj.time}</td>
    </tr>
  );
}

export function TrilhaModuleCardTable({ mod }: { mod: Module }) {
  return (
    <div className="p-6 bg-gray-50/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <ModuleTableHead />
          <tbody className="divide-y divide-gray-100">
            {mod.details.map((obj, oIdx) => (
              <ModuleDetailRow key={oIdx} obj={obj} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TrilhaModuleCard({ mod }: { mod: Module }) {
  return (
    <Card hoverable className="p-0 overflow-hidden">
      <TrilhaModuleCardHeader mod={mod} />
      <TrilhaModuleCardTable mod={mod} />
    </Card>
  );
}
