
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Heart, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mock data for doctors
  const doctors = [
    {
      name: "Dra. Ana Carvalho",
      specialty: "Ginecologia",
      image: "",
      experience: "15 anos",
    },
    {
      name: "Dr. Pedro Mendes",
      specialty: "Obstetrícia",
      image: "",
      experience: "12 anos",
    },
    {
      name: "Dra. Marta Ribeiro",
      specialty: "Ginecologia e Obstetrícia",
      image: "",
      experience: "20 anos",
    },
  ];

  // Services
  const services = [
    {
      icon: HeartIcon,
      title: "Ginecologia",
      description: "Exames preventivos, tratamento de infecções, orientação sobre reposição hormonal."
    },
    {
      icon: BabyIcon,
      title: "Obstetrícia",
      description: "Acompanhamento pré-natal, parto normal e cesárea, cuidados com a gestante."
    },
    {
      icon: UltrasoundIcon,
      title: "Exames",
      description: "Ultrassonografia, mamografia, papanicolau, colposcopia e outros exames."
    },
    {
      icon: SurgeryIcon,
      title: "Cirurgias",
      description: "Procedimentos cirúrgicos ginecológicos e obstétricos com tecnologia avançada."
    },
  ];

  const testimonials = [
    {
      name: "Juliana Pereira",
      text: "Excelente atendimento! Todos os profissionais são muito atenciosos e o hospital tem uma estrutura incrível.",
      role: "Paciente de Ginecologia"
    },
    {
      name: "Camila Santos",
      text: "Fiz todo meu pré-natal e parto no Hospital Santa Luzia do Rocio. Não poderia ter feito escolha melhor.",
      role: "Paciente de Obstetrícia"
    },
    {
      name: "Fernanda Lima",
      text: "Ambiente acolhedor, profissionais qualificados e atendimento humanizado. Recomendo para todas as mulheres.",
      role: "Paciente"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-hospital-cream py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-hospital-gold/20" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-hospital-darkBrown">
                Hospital Santa Luzia do Rocio
              </h1>
              <p className="text-xl text-hospital-mediumBrown">
                Especializado em ginecologia e obstetrícia, 
                com o compromisso de cuidar da saúde da mulher em todas as fases da vida.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="gold-gradient text-hospital-darkBrown text-lg px-6 py-6 shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => navigate(isAuthenticated ? '/appointments/new' : '/login')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
                <Button
                  variant="outline" 
                  className="bg-white text-hospital-mediumBrown border-hospital-gold text-lg px-6 py-6 shadow-sm hover:bg-hospital-lightGold transition-colors"
                  onClick={() => navigate('/doctors')}
                >
                  <User className="mr-2 h-5 w-5" />
                  Nossos Médicos
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-hospital-darkBrown/10 to-hospital-darkBrown/30" />
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Hospital Santa Luzia do Rocio" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full gold-gradient flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Atendimento 24h</h3>
                <p className="text-muted-foreground">
                  Nosso hospital está disponível 24 horas por dia, 7 dias por semana para atendimentos de urgência.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full gold-gradient flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Equipe Especializada</h3>
                <p className="text-muted-foreground">
                  Contamos com uma equipe de médicos e enfermeiros altamente qualificados e especializados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full gold-gradient flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Atendimento Humanizado</h3>
                <p className="text-muted-foreground">
                  Oferecemos um atendimento acolhedor e respeitoso, focando nas necessidades individuais de cada paciente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-hospital-cream/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços especializados em ginecologia e obstetrícia para cuidar da sua saúde em todas as fases da vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-full gold-gradient flex items-center justify-center">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="border-hospital-gold text-hospital-mediumBrown hover:bg-hospital-lightGold"
              onClick={() => navigate('/services')}
            >
              Ver todos os serviços
            </Button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossa Equipe Médica</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa equipe de profissionais altamente qualificados e dedicados a oferecer o melhor atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-hospital-mediumBrown/10">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-hospital-mediumBrown/20 rounded-none">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-hospital-mediumBrown">{doctor.specialty}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Experiência: {doctor.experience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="border-hospital-gold text-hospital-mediumBrown hover:bg-hospital-lightGold"
              onClick={() => navigate('/doctors')}
            >
              Ver todos os médicos
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-hospital-cream/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que dizem nossos pacientes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja os depoimentos de pacientes que confiaram em nossos serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-hospital-gold/20 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-2 text-hospital-gold">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.587-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hospital-darkBrown text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Agende sua consulta hoje mesmo</h2>
              <p className="mb-6 text-hospital-cream/80">
                Cuide da sua saúde com os melhores especialistas em ginecologia e obstetrícia. Estamos aqui para oferecer o melhor atendimento.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-hospital-gold" />
                  <span>Agendamentos rápidos e fáceis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-hospital-gold" />
                  <span>Atendimento humanizado e personalizado</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-hospital-gold" />
                  <span>Infraestrutura moderna e confortável</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-hospital-darkBrown">Contato</h3>
              <div className="space-y-4 text-hospital-darkBrown">
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-hospital-gold" />
                  <span>(41) 3333-4444</span>
                </div>
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-hospital-gold" />
                  <div>
                    <p>Horário de Atendimento:</p>
                    <p>Segunda a Sexta: 8h às 20h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Urgências: 24 horas</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  className="w-full gold-gradient text-hospital-darkBrown hover:shadow-lg transition-shadow"
                  onClick={() => navigate(isAuthenticated ? '/appointments/new' : '/login')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

// Custom Icons
const HeartIcon = (props: any) => (
  <Heart {...props} />
);

const BabyIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h.01"></path>
    <path d="M15 12h.01"></path>
    <path d="M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"></path>
    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
  </svg>
);

const UltrasoundIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h5"></path>
    <path d="M9 12h5"></path>
    <path d="M16 12h6"></path>
    <path d="M3 7h3"></path>
    <path d="M3 17h3"></path>
    <path d="M13 5.5a7.5 7.5 0 0 1 0 13"></path>
    <path d="M16 4a10 10 0 0 1 0 16"></path>
  </svg>
);

const SurgeryIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3v10"></path>
    <path d="m12 6 5-3 5 3-5 3Z"></path>
    <path d="M8 17h12"></path>
    <path d="M16 7h1"></path>
    <path d="M2 17h3"></path>
    <path d="m6 13 3-2 4 4.5-2 2L6 13Z"></path>
    <path d="M11 13.5c-.5-1-2-2-3-2"></path>
  </svg>
);

export default Index;
