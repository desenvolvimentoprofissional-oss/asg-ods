import { ChancelaPresidentQuote } from './ChancelaPresidentQuote';

export function ManifestoLeadParagraphs() {
  return (
    <>
      <p>
        Em novembro de 2024, o Conselho Regional de Administração de São Paulo (CRA-SP), ao lado de importantes
        parceiros institucionais como ANGRAD, IBGC, Instituto Ethos e PRME, firmou um compromisso público com o
        futuro da educação e da gestão no Brasil. Por meio de um Manifesto direcionado às autoridades
        acadêmicas, alertamos sobre a urgência de integrar a agenda ASG e os ODS na formação de líderes.
      </p>
      <p>
        A iniciativa nasceu de uma necessidade latente do mercado. Um levantamento realizado pelo CRA-SP revelou
        que 88,4% dos profissionais de Administração defendiam a inclusão do tema nas grades curriculares,
        reconhecendo-o como um diferencial competitivo indispensável.
      </p>
      <p>
        É com grande satisfação que oficializamos a entrega do{' '}
        <strong className="text-gray-900">Componente Curricular de ASG e ODS</strong>. Desenvolvido por
        especialistas e estruturado com rigor pedagógico, o material foi criado para ser incorporado — de forma
        gratuita e flexível — por todas as Instituições de Educação Superior (IES).
      </p>
    </>
  );
}

export function ChancelaManifesto() {
  return (
    <section className="bg-white py-10">
      <div className="crasp-page-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-blue-900">
            Do Manifesto à entrega do Componente Curricular de ASG e ODS
          </h2>
        </div>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
          <ManifestoLeadParagraphs />
          <ChancelaPresidentQuote />
          <p>
            O conteúdo foi cuidadosamente desenhado para oferecer uma formação robusta, alinhada às melhores
            práticas internacionais e adaptada à realidade brasileira. Convidamos todos os gestores acadêmicos a
            adotarem este componente em suas matrizes curriculares.
          </p>
        </div>
      </div>
    </section>
  );
}
