export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Sobre o Projeto
      </h1>

      <div className="prose prose-lg max-w-none space-y-6">
        {/* Missão */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nossa Missão
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Meu Burnout é Nosso Dado</strong> é uma plataforma criada para transformar 
            o sofrimento individual de trabalhadores em burnout em dados coletivos que possam 
            pressionar empresas e setores a mudarem suas práticas.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Acreditamos que <strong>sua exaustão não é um fracasso pessoal — é um dado</strong>. 
            Quando agregamos relatos anônimos, criamos evidências irrefutáveis de condições 
            de trabalho tóxicas que precisam ser transformadas.
          </p>
        </section>

        {/* Como Funciona */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-3xl mr-4">1️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900">Você relata anonimamente</h3>
                <p className="text-gray-700">
                  Preencha um formulário sobre suas condições de trabalho. Não coletamos 
                  IP, email ou qualquer informação que possa identificá-lo.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-3xl mr-4">2️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900">Dados são anonimizados</h3>
                <p className="text-gray-700">
                  Seu relato passa por múltiplas camadas de anonimização. Informações 
                  pessoais são automaticamente removidas.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-3xl mr-4">3️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900">Dados são agregados</h3>
                <p className="text-gray-700">
                  Seu relato é combinado com milhares de outros para criar estatísticas 
                  por setor, tamanho de empresa e sintomas.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-3xl mr-4">4️⃣</span>
              <div>
                <h3 className="font-bold text-gray-900">Dados geram pressão</h3>
                <p className="text-gray-700">
                  Publicamos dashboards públicos que podem ser usados por jornalistas, 
                  sindicatos e ativistas para pressionar por mudanças.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Garantias de Privacidade */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🔒 Garantias de Privacidade
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Não coletamos endereços IP:</strong> Usamos um proxy de anonimização que remove todos os metadados de rede.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Remoção automática de PII:</strong> Emails, telefones, CPFs e outros dados pessoais são automaticamente detectados e removidos.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Hashing de empresas:</strong> Nomes de empresas são convertidos em códigos anônimos que não podem ser revertidos.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Zero-Knowledge Architecture:</strong> Nem mesmo os administradores do sistema podem identificar quem enviou um relato.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Código aberto:</strong> Todo o código é público e pode ser auditado por especialistas em segurança.</span>
            </li>
          </ul>
        </section>

        {/* Por Que Isso Importa */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Por Que Isso Importa
          </h2>
          <p className="text-gray-700 leading-relaxed">
            O burnout não é uma falha individual — é um problema sistêmico causado por 
            condições de trabalho insustentáveis. Mas quando cada trabalhador sofre em 
            silêncio, as empresas podem continuar negando o problema.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Quando transformamos relatos individuais em dados agregados, criamos evidências 
            que não podem ser ignoradas. Jornalistas podem expor setores tóxicos. Sindicatos 
            podem negociar com dados concretos. Legisladores podem criar políticas baseadas 
            em evidências.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4 font-bold">
            Sua história importa. Seus dados podem mudar o sistema.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para fazer parte da mudança?
          </h2>
          <p className="text-gray-700 mb-6">
            Seu relato anônimo pode ajudar milhares de trabalhadores que estão passando 
            pela mesma situação.
          </p>
          <a
            href="/"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            Enviar Relato Anônimo
          </a>
        </section>
      </div>
    </div>
  )
}
