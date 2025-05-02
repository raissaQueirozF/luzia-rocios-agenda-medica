
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const ServiceCard = ({ title, description, icon, link }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-hospital-gold/20 shadow-md hover:shadow-lg transition-all h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="bg-hospital-cream rounded-full w-16 h-16 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-hospital-darkBrown">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {link && (
        <CardFooter className="pt-2">
          <Button 
            variant="outline"
            className="w-full border-hospital-gold/50 hover:bg-hospital-lightGold"
            onClick={() => navigate(link)}
          >
            Saiba mais
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const Services = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hospital-darkBrown font-playfair">Nossos Serviços</h1>
          <p className="mt-4 text-lg text-hospital-mediumBrown max-w-2xl mx-auto">
            O Hospital Santa Luzia do Rocio oferece atendimento especializado em saúde da mulher, com foco em ginecologia e obstetrícia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ServiceCard
            title="Consultas Ginecológicas"
            description="Atendimento completo com especialistas em ginecologia para prevenção, diagnóstico e tratamento de doenças do sistema reprodutor feminino."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
            }
            link="/services/gynecology"
          />
          <ServiceCard
            title="Pré-Natal"
            description="Acompanhamento completo durante toda a gestação, com foco na saúde da mãe e do bebê, incluindo exames, orientações e preparação para o parto."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h.01"></path>
                <path d="M15 12h.01"></path>
                <path d="M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"></path>
                <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
              </svg>
            }
            link="/services/prenatal"
          />
          <ServiceCard
            title="Parto Humanizado"
            description="Assistência ao parto com respeito à fisiologia e aos desejos da mulher, com equipe multidisciplinar e ambiente acolhedor."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16v-6a2 2 0 0 0-2-2h-2.5"></path>
                <path d="M13.5 8H8m0 0V6"></path>
                <path d="M8 8v2"></path>
                <circle cx="18" cy="18" r="2"></circle>
                <circle cx="8" cy="18" r="2"></circle>
                <path d="M8 10v6"></path>
                <path d="M11 18h5"></path>
              </svg>
            }
            link="/services/childbirth"
          />
          <ServiceCard
            title="Cirurgias Ginecológicas"
            description="Procedimentos cirúrgicos ginecológicos realizados por equipe altamente especializada, com tecnologia de ponta e foco na rápida recuperação."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 6a2 2 0 0 1-2 2"></path>
                <path d="M18 6a2 2 0 0 1-2 2"></path>
                <path d="M10 6a2 2 0 0 1 2-2"></path>
                <path d="M6 6a2 2 0 0 1 2 2"></path>
                <path d="m11 6 1 9"></path>
                <path d="m19 12-7 3"></path>
                <path d="m13 15-1 5"></path>
              </svg>
            }
            link="/services/surgery"
          />
          <ServiceCard
            title="Exames Diagnósticos"
            description="Ampla variedade de exames para diagnóstico e acompanhamento, incluindo ultrassonografias, mamografias, colposcopias e mais."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v2"></path>
                <path d="M12 3v2"></path>
                <path d="M16 3v2"></path>
                <path d="M6.5 14h1"></path>
                <path d="M6.5 18h1"></path>
                <path d="M13.3 14h.7m3.5 0h.485M13.3 18h.7m3.5 0h.485"></path>
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M3 9a2 2 0 0 0 2-2"></path>
                <path d="M21 9a2 2 0 0 1-2-2"></path>
                <path d="M3 11v2"></path>
                <path d="M21 11v2"></path>
                <path d="M21 15a2 2 0 0 1-2 2"></path>
                <path d="M3 15a2 2 0 0 0 2 2"></path>
                <path d="m12 8-2 2 2 2 2-2-2-2Z"></path>
              </svg>
            }
            link="/services/exams"
          />
          <ServiceCard
            title="Planejamento Familiar"
            description="Orientação sobre métodos contraceptivos, aconselhamento para casais que desejam engravidar e tratamentos de infertilidade."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-mediumBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20"></path>
                <path d="M18 22H8a2 2 0 0 1-2-2V4"></path>
                <circle cx="15" cy="12" r="2"></circle>
                <path d="M15 2v4"></path>
                <path d="M15 18v4"></path>
                <path d="M9 11h3"></path>
                <path d="M18 11h3"></path>
                <path d="M9 12.5V9"></path>
                <path d="M19.5 12.5V9"></path>
              </svg>
            }
            link="/services/family-planning"
          />
        </div>

        <div className="bg-hospital-cream/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-hospital-darkBrown mb-6 font-playfair text-center">Planos e Convênios</h2>
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              O Hospital Santa Luzia do Rocio atende a diversos convênios e planos de saúde para proporcionar acesso a um atendimento de qualidade.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {/* Placeholder boxes for health insurance logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <div 
                key={index} 
                className="h-16 w-32 bg-white rounded border border-hospital-gold/20 flex items-center justify-center shadow-sm"
              >
                <span className="text-sm text-muted-foreground">Convênio {index}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Não encontrou seu convênio? Entre em contato para verificar a cobertura.
            </p>
          </div>
        </div>

        <div className="text-center bg-hospital-lightGold border border-hospital-gold/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-hospital-darkBrown mb-4 font-playfair">Agende sua Consulta</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Estamos prontos para cuidar da sua saúde. Agende uma consulta com nossos especialistas e receba um atendimento personalizado e de qualidade.
          </p>
          <Button 
            className="bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
            onClick={() => window.location.href = '/appointments/new'}
          >
            Agendar Consulta Online
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Ou ligue para (41) 3333-4444
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
