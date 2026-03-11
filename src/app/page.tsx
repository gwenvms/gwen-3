export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          MonSite
        </div>
        <div className="flex gap-8 text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Accueil</a>
          <a href="#" className="hover:text-white transition-colors">À propos</a>
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-full text-sm font-medium transition-colors">
          Commencer
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-32 max-w-5xl mx-auto">
        <div className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-6">
          ✨ Bienvenue sur mon site
        </div>
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Créez quelque chose{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            d&apos;extraordinaire
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-10">
          Une plateforme moderne pour donner vie à vos idées. Simple, rapide et élégant.
        </p>
        <div className="flex gap-4">
          <button className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full font-medium transition-all hover:scale-105">
            Démarrer maintenant
          </button>
          <button className="border border-slate-600 hover:border-slate-400 px-8 py-3 rounded-full font-medium transition-all hover:scale-105">
            En savoir plus
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Nos fonctionnalités</h2>
        <p className="text-slate-400 text-center mb-12">Tout ce dont vous avez besoin pour réussir</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🚀",
              title: "Ultra rapide",
              desc: "Des performances optimisées pour une expérience fluide et réactive.",
            },
            {
              icon: "🎨",
              title: "Design moderne",
              desc: "Une interface élégante et intuitive qui impressionne vos visiteurs.",
            },
            {
              icon: "🔒",
              title: "Sécurisé",
              desc: "Vos données sont protégées avec les meilleures pratiques de sécurité.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 rounded-3xl p-16">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-slate-400 mb-8">Rejoignez des milliers d&apos;utilisateurs satisfaits dès aujourd&apos;hui.</p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-10 py-4 rounded-full font-medium text-lg transition-all hover:scale-105">
            Créer mon compte gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-8 max-w-7xl mx-auto flex items-center justify-between text-slate-500 text-sm">
        <div>© 2024 MonSite. Tous droits réservés.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-white transition-colors">Conditions</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
