export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre o Projeto */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Meu Burnout é Nosso Dado
            </h3>
            <p className="text-sm text-gray-400">
              Uma plataforma para denunciar anonimamente condições de trabalho tóxicas 
              e transformar sofrimento individual em dados coletivos para mudança social.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Links Úteis
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Enviar Relato
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white transition">
                  Dashboard Público
                </a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-white transition">
                  Sobre o Projeto
                </a>
              </li>
            </ul>
          </div>

          {/* Privacidade e Segurança */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Privacidade e Segurança
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🔒 Anonimato total garantido</li>
              <li>🚫 Não coletamos IPs</li>
              <li>🗑️ Remoção automática de PII</li>
              <li>🔐 Dados criptografados</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} Meu Burnout é Nosso Dado. 
            Projeto de código aberto para justiça trabalhista.
          </p>
          <p className="mt-2">
            Feito com ❤️ para trabalhadores exaustos que merecem dignidade.
          </p>
        </div>
      </div>
    </footer>
  )
}
