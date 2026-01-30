import { Calendar, CheckSquare, Layout, Smartphone, MessageSquare, AlertCircle, XCircle, CheckCircle2, UserCheck, Map, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Landing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Site Profissional para Guias Turísticos"
        description="Transforme seu negócio de turismo com um site exclusivo, agendamento online e gestão simplificada de passeios."
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.png" alt="GuiaTur Logo" className="h-12 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">O Problema</a>
              <a href="#solution" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">A Solução</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Como Funciona</a>
              <a href="#scope" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">O que inclui</a>
            </div>

            <Button onClick={scrollToContact} className="accent-gradient hover:opacity-90 transition-opacity whitespace-nowrap">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-light text-ocean-dark text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean"></span>
                </span>
                Desenvolvimento de sites personalizados
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Site profissional com <span className="text-gradient">agendamento online</span> para guias turísticos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Divulgue seus passeios, organize datas e receba agendamentos de forma profissional, sem depender apenas da bagunça do WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={scrollToContact} className="hero-gradient px-8 py-6 text-lg rounded-2xl shadow-glow hover:scale-105 transition-transform w-full sm:w-auto">
                  Quero meu site de passeios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/demo" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-2xl border-2 hover:bg-secondary transition-colors w-full sm:w-auto">
                    Ver exemplo real
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground justify-center lg:justify-start">
                <CheckCircle2 className="h-5 w-5 text-ocean" />
                Pronto para uso em 15 dias
              </div>
            </div>
            
            <div className="flex-1 relative animate-scale-in">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/landing-hero.png" 
                  alt="Tour Guide Professional Website" 
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-ocean/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-secondary/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Você ainda perde tempo com isso?</h2>
            <p className="text-muted-foreground text-lg">Administrar um negócio de turismo exige organização. Se você sofre com esses problemas, seu negócio está sendo limitado.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: XCircle, title: "Falta de Presença", desc: "Não ter um site tira sua credibilidade frente aos turistas." },
              { icon: MessageSquare, title: "Caos no WhatsApp", desc: "Perder horas respondendo as mesmas dúvidas repetidamente." },
              { icon: Calendar, title: "Desorganização", desc: "Datas perdidas, erros em agendamentos ou overbooking." },
              { icon: Layout, title: "Apresentação Pobre", desc: "Dificuldade em mostrar seus roteiros de forma atraente." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Layout, title: "Site Exclusivo", desc: "Um endereço só seu para ser referência no mercado." },
                  { icon: CheckSquare, title: "Agenda Inteligente", desc: "O turista escolhe a data e envia o pedido direto." },
                  { icon: UserCheck, title: "Área do Guia", desc: "Painel simples para gerenciar tudo sem complicação." },
                  { icon: Smartphone, title: "Foco no Mobile", desc: "Seu site abre perfeito em qualquer celular." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-sand p-6 rounded-2xl border border-border/40 hover:border-ocean/30 transition-colors">
                    <item.icon className="h-8 w-8 text-ocean mb-4" />
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-light text-coral-dark text-sm font-semibold mb-6">
                Sua vitrine 24 horas por dia
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Tudo o que você precisa para vender seus passeios</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Entregamos um site completo, personalizado com sua marca e seus roteiros. O turista acessa, se encanta com as fotos, confere as datas e faz a reserva. Simples assim.
              </p>
              <ul className="space-y-4">
                {["Página pública profissional", "Catálogo dinâmico de tours", "Sistema de pedidos direto", "Painel administrativo intuitivo"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="bg-ocean/10 p-1 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-ocean" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-ocean text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência Simples e Ágil</h2>
            <p className="opacity-90 text-lg max-w-2xl mx-auto">Veja como é fácil para você e para o seu cliente.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {[
              { step: "01", title: "Cadastro", desc: "Você cadastra os passeios e datas na Área do Guia." },
              { step: "02", title: "Visita", desc: "O turista acessa seu site pelo link na bio ou Google." },
              { step: "03", title: "Escolha", desc: "Ele seleciona o passeio, a data e o número de pessoas." },
              { step: "04", title: "Pedido", desc: "O pedido de agendamento é enviado instantaneamente." },
              { step: "05", title: "Gestão", desc: "Você recebe a notificação e gerencia tudo no seu painel." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black mb-6 backdrop-blur-sm">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
                {idx < 4 && <div className="hidden md:block absolute top-[15%] right-[-10%] w-full h-px bg-white/20 -z-10"></div>}
              </div>
            ))}
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* What's Included / Scope Section */}
      <section id="scope" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escopo do Serviço</h2>
            <p className="text-muted-foreground text-lg">Transparência total sobre o que entregamos em cada projeto.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Included */}
            <div className="bg-ocean-light/30 rounded-3xl p-8 md:p-12 border border-ocean/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ocean-dark">O que está incluso</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Site profissional personalizado",
                  "Página pública com apresentação",
                  "Cadastro de passeios ilimitado",
                  "Agenda de datas dinâmicas",
                  "Sistema de pedidos direto",
                  "Área do Guia (Administração)",
                  "Design responsivo (mobile-first)",
                  "Integração com WhatsApp/E-mail",
                  "Configuração inicial completa"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ocean-dark font-medium">
                    <CheckCircle2 className="h-5 w-5 text-ocean shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-muted-foreground">O que não está incluso</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Pagamento online direto",
                  "Marketplace de guias",
                  "Sistema de avaliações",
                  "Aplicativo mobile nativo",
                  "Integrações complexas externas",
                  "Gestão financeira ou fiscal"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground/80">
                    <XCircle className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-muted/50 rounded-xl text-sm italic">
                * Focamos na agilidade e entrega de um site funcional e objetivo para o seu dia a dia.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Para quem é este serviço?</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              {[
                { icon: Map, label: "Guias Independentes" },
                { icon: UserCheck, label: "Guias Regionais" },
                { icon: Map, label: "Roteiros Culturais" },
                { icon: Map, label: "Passeios Ecológicos" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-12 text-lg text-muted-foreground leading-relaxed">
              Se você busca profissionalismo e quer vender direto ao seu cliente final, sem depender de plataformas que cobram comissões abusivas, este projeto é para você.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-foreground text-background rounded-[40px] p-8 md:p-20 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Tenha seu site de passeios pronto para divulgar e receber agendamentos.</h2>
            <p className="text-lg md:text-xl opacity-70 mb-10 max-w-2xl mx-auto">
              Saia do amadorismo e tenha uma vitrine profissional que trabalha para você enquanto você guia seus turistas.
            </p>
            <div className="flex flex-col items-center gap-6">
              <a 
                href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o site para guias turísticos." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center accent-gradient h-16 px-12 text-xl font-bold text-white rounded-2xl shadow-glow hover:scale-105 transition-transform"
              >
                Solicitar Orçamento via WhatsApp
                <MessageSquare className="ml-3 h-6 w-6" />
              </a>
              <p className="text-sm opacity-50">Respostas em até 24 horas úteis</p>
            </div>
          </div>
        </div>
        {/* Background glow */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ocean/10 blur-[120px] rounded-full -z-0"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center">
              <img src="/logo.png" alt="GuiaTur Logo" className="h-8 w-auto grayscale opacity-70" />
            </div>
            
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GuiaTur Pro. Todos os direitos reservados.
            </div>
            
            <div className="flex gap-6">
              <Link to="/auth" className="text-sm font-medium hover:text-primary transition-colors">Acesso ao Painel</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
