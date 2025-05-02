
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hospital-darkBrown font-playfair">Sobre Nós</h1>
          <p className="mt-4 text-lg text-hospital-mediumBrown max-w-2xl mx-auto">
            Conheça o Hospital Santa Luzia do Rocio, referência em saúde da mulher em Curitiba e região.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-hospital-darkBrown mb-4 font-playfair">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fundado em 1985, o Hospital Santa Luzia do Rocio nasceu do sonho de um grupo de médicos em criar um centro de excelência dedicado exclusivamente à saúde da mulher em todas as fases da vida.
              </p>
              <p>
                Ao longo de mais de 35 anos, construímos uma trajetória sólida baseada no atendimento humanizado, investimento constante em tecnologia de ponta e capacitação contínua de nossa equipe multidisciplinar.
              </p>
              <p>
                Hoje, somos reconhecidos como instituição de referência em ginecologia e obstetrícia no Paraná, atendendo milhares de mulheres anualmente, desde o planejamento familiar até o acompanhamento gestacional, partos e tratamentos ginecológicos especializados.
              </p>
            </div>
          </div>
          <div className="bg-hospital-cream rounded-lg p-8 h-full flex items-center justify-center">
            <div className="w-full h-64 bg-hospital-mediumBrown/20 rounded-md flex items-center justify-center">
              <div className="text-center text-hospital-mediumBrown">
                <p className="font-playfair text-xl mb-2">Imagem do Hospital</p>
                <p className="text-sm">(Fachada do Hospital Santa Luzia do Rocio)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-hospital-cream/50 border-hospital-gold/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-2xl font-bold text-hospital-darkBrown mb-4">Missão</h3>
              <p className="text-muted-foreground">
                Proporcionar atendimento médico de excelência em ginecologia e obstetrícia, aliando conhecimento técnico, tecnologia de ponta e acolhimento humanizado, garantindo o bem-estar integral da mulher em todas as fases de sua vida.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-hospital-cream/50 border-hospital-gold/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-2xl font-bold text-hospital-darkBrown mb-4">Visão</h3>
              <p className="text-muted-foreground">
                Ser reconhecido como o hospital de referência em saúde feminina no sul do Brasil, estabelecendo novos padrões de qualidade no atendimento médico, inovação tecnológica e satisfação das pacientes.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-hospital-cream/50 border-hospital-gold/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-2xl font-bold text-hospital-darkBrown mb-4">Valores</h3>
              <ul className="text-left text-muted-foreground space-y-2">
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-hospital-gold" />
                  Excelência técnica
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-hospital-gold" />
                  Ética e transparência
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-hospital-gold" />
                  Atendimento humanizado
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-hospital-gold" />
                  Inovação constante
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-hospital-gold" />
                  Respeito à individualidade
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-hospital-cream/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-hospital-darkBrown mb-6 font-playfair text-center">Nossa Estrutura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                O Hospital Santa Luzia do Rocio conta com instalações modernas e acolhedoras, projetadas para oferecer o máximo conforto e segurança às nossas pacientes.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consultórios equipados com tecnologia de ponta</li>
                <li>Centro cirúrgico especializado</li>
                <li>Salas de parto humanizado</li>
                <li>UTI Neonatal e Materna</li>
                <li>Laboratório de análises clínicas</li>
                <li>Equipe multidisciplinar completa</li>
                <li>Estacionamento amplo e seguro</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-hospital-mediumBrown/20 rounded-md h-40 flex items-center justify-center">
                <span className="text-hospital-mediumBrown text-sm">Consultórios</span>
              </div>
              <div className="bg-hospital-mediumBrown/20 rounded-md h-40 flex items-center justify-center">
                <span className="text-hospital-mediumBrown text-sm">Centro Cirúrgico</span>
              </div>
              <div className="bg-hospital-mediumBrown/20 rounded-md h-40 flex items-center justify-center">
                <span className="text-hospital-mediumBrown text-sm">Sala de Parto</span>
              </div>
              <div className="bg-hospital-mediumBrown/20 rounded-md h-40 flex items-center justify-center">
                <span className="text-hospital-mediumBrown text-sm">Recepção</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-hospital-darkBrown mb-6 font-playfair">Depoimentos de Pacientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-hospital-gold/20">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-4">
                  "Tive minha filha no Hospital Santa Luzia e só tenho a agradecer pelo atendimento excepcional. Toda equipe foi muito atenciosa e me senti acolhida em todos os momentos."
                </p>
                <p className="font-medium text-hospital-darkBrown">Ana L., 32 anos</p>
              </CardContent>
            </Card>
            <Card className="border-hospital-gold/20">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-4">
                  "Faço acompanhamento ginecológico há mais de 10 anos no Santa Luzia. A qualidade do atendimento e o cuidado dos médicos fazem toda diferença na minha saúde."
                </p>
                <p className="font-medium text-hospital-darkBrown">Mariana S., 45 anos</p>
              </CardContent>
            </Card>
            <Card className="border-hospital-gold/20">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-4">
                  "O pré-natal de alto risco que realizei no hospital foi fundamental para que minha gravidez transcorresse bem, apesar das complicações iniciais. Profissionais excepcionais."
                </p>
                <p className="font-medium text-hospital-darkBrown">Patrícia M., 28 anos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
