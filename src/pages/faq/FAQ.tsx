
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Como faço para agendar uma consulta?",
    answer: "Você pode agendar uma consulta de três formas: online através do nosso site na seção 'Agendar Consulta', por telefone ligando para (41) 3333-4444 ou presencialmente na recepção do hospital.",
    category: "Agendamentos"
  },
  {
    question: "Quais documentos preciso levar na primeira consulta?",
    answer: "Para a primeira consulta, é necessário trazer documento de identidade com foto, CPF, cartão do plano de saúde (se aplicável) e exames anteriores relacionados à sua condição (se houver).",
    category: "Consultas"
  },
  {
    question: "Quanto tempo dura uma consulta?",
    answer: "As consultas têm duração média de 30 a 45 minutos, podendo variar conforme a especialidade e necessidade de cada paciente.",
    category: "Consultas"
  },
  {
    question: "O hospital aceita meu plano de saúde?",
    answer: "O Hospital Santa Luzia do Rocio atende a maioria dos convênios e planos de saúde. Para verificar se o seu plano é aceito, entre em contato com nossa central de atendimento ou consulte a lista de convênios em nossa página 'Planos e Convênios'.",
    category: "Planos e Convênios"
  },
  {
    question: "Posso cancelar ou remarcar minha consulta?",
    answer: "Sim, você pode cancelar ou remarcar sua consulta até 24 horas antes do horário agendado, sem custo adicional. Para isso, utilize nosso site, aplicativo ou entre em contato por telefone.",
    category: "Agendamentos"
  },
  {
    question: "Como funciona o acompanhamento pré-natal?",
    answer: "O acompanhamento pré-natal consiste em consultas regulares com o obstetra para monitorar a saúde da mãe e o desenvolvimento do bebê. A frequência das consultas aumenta conforme o avanço da gestação, começando com visitas mensais e chegando a semanais no último mês.",
    category: "Obstetrícia"
  },
  {
    question: "Quando devo começar o pré-natal?",
    answer: "Idealmente, o pré-natal deve ser iniciado assim que a gravidez for confirmada, preferencialmente até a 12ª semana de gestação. Quanto mais cedo começar o acompanhamento, melhor para a saúde da mãe e do bebê.",
    category: "Obstetrícia"
  },
  {
    question: "Com que frequência devo fazer o exame ginecológico?",
    answer: "Recomenda-se que mulheres sexualmente ativas ou acima de 21 anos realizem exames ginecológicos anualmente para prevenção e diagnóstico precoce de doenças. Dependendo do histórico médico, o ginecologista pode recomendar uma frequência diferente.",
    category: "Ginecologia"
  },
  {
    question: "O hospital oferece parto normal e cesárea?",
    answer: "Sim, o Hospital Santa Luzia do Rocio oferece tanto parto normal quanto cesárea, sempre priorizando a saúde da mãe e do bebê. Contamos com uma equipe especializada em partos humanizados e estrutura completa para ambos os procedimentos.",
    category: "Obstetrícia"
  },
  {
    question: "É possível conhecer a maternidade antes do parto?",
    answer: "Sim, oferecemos visitas guiadas à maternidade para gestantes e acompanhantes. Para agendar uma visita, entre em contato com nossa central de atendimento.",
    category: "Obstetrícia"
  },
  {
    question: "Quais exames são realizados no hospital?",
    answer: "Realizamos diversos exames relacionados à saúde da mulher, como ultrassonografias, mamografias, densitometria óssea, colposcopia, histeroscopia, papanicolau, entre outros. Para verificar a disponibilidade de um exame específico, consulte nossa central de atendimento.",
    category: "Exames"
  },
  {
    question: "Como receber os resultados dos meus exames?",
    answer: "Os resultados dos exames podem ser retirados presencialmente no hospital, enviados por e-mail ou acessados através do nosso portal do paciente, conforme sua preferência informada no momento da realização do exame.",
    category: "Exames"
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('Todos');
  
  // Get unique categories
  const categories = ['Todos', ...Array.from(new Set(faqItems.map(item => item.category)))];
  
  // Filter items based on search term and category
  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hospital-darkBrown font-playfair">Perguntas Frequentes</h1>
          <p className="mt-4 text-lg text-hospital-mediumBrown max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços e procedimentos.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Buscar pergunta ou resposta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={activeCategory === category ? 'bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Card className="border-hospital-gold/20">
          <Accordion type="single" collapsible className="w-full">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-hospital-darkBrown hover:text-hospital-gold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l-2 border-hospital-gold/20">
                      <p className="text-muted-foreground">{item.answer}</p>
                      <div className="mt-2">
                        <Badge className="bg-hospital-cream/50 text-hospital-mediumBrown hover:bg-hospital-cream">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">Nenhuma pergunta encontrada com os filtros atuais.</p>
              </div>
            )}
          </Accordion>
        </Card>

        <div className="mt-12 p-6 bg-hospital-cream/30 rounded-lg border border-hospital-gold/20 text-center">
          <h2 className="text-2xl font-bold text-hospital-darkBrown mb-4 font-playfair">Não encontrou o que procura?</h2>
          <p className="text-muted-foreground mb-6">
            Entre em contato conosco e ficaremos felizes em esclarecer todas as suas dúvidas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline"
              className="border-hospital-gold/50 hover:bg-hospital-lightGold"
              onClick={() => window.location.href = '/contact'}
            >
              Entre em Contato
            </Button>
            <Button 
              className="bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
              onClick={() => window.location.href = '/appointments/new'}
            >
              Agendar Consulta
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
