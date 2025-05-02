
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato com você em breve.",
    });
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hospital-darkBrown font-playfair">Entre em Contato</h1>
          <p className="mt-4 text-lg text-hospital-mediumBrown max-w-2xl mx-auto">
            Estamos prontos para atender você. Entre em contato por telefone, e-mail ou preencha o formulário abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-hospital-darkBrown mb-6 font-playfair">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nome completo
                  </label>
                  <Input id="name" name="name" required placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    E-mail
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="seu.email@exemplo.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Telefone
                </label>
                <Input id="phone" name="phone" placeholder="(41) 99999-9999" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Assunto
                </label>
                <Input id="subject" name="subject" required placeholder="Assunto da sua mensagem" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Digite sua mensagem aqui..."
                  className="min-h-[150px]"
                />
              </div>
              <div>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                >
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-hospital-darkBrown mb-6 font-playfair">Informações de Contato</h2>
              <div className="space-y-4">
                <Card className="border-hospital-gold/20">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-hospital-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium text-hospital-darkBrown">Telefone</h3>
                      <p className="text-muted-foreground">(41) 3333-4444</p>
                      <p className="text-muted-foreground">(41) 99999-8888 (WhatsApp)</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-hospital-gold/20">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-hospital-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium text-hospital-darkBrown">E-mail</h3>
                      <p className="text-muted-foreground">contato@santaluziarocio.com.br</p>
                      <p className="text-muted-foreground">agendamento@santaluziarocio.com.br</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-hospital-gold/20">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-hospital-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium text-hospital-darkBrown">Endereço</h3>
                      <p className="text-muted-foreground">Rua das Flores, 123</p>
                      <p className="text-muted-foreground">Centro - Curitiba/PR</p>
                      <p className="text-muted-foreground">CEP: 80000-000</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-hospital-gold/20">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-hospital-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium text-hospital-darkBrown">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 07h às 19h</p>
                      <p className="text-muted-foreground">Sábado: 08h às 12h</p>
                      <p className="text-muted-foreground">Emergência: 24 horas</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="border border-hospital-gold/20 rounded-md overflow-hidden">
              <div className="aspect-video w-full bg-gray-100">
                {/* Google Maps iframe - Replace with your own Google Maps embed code */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.7797028645855!2d-49.271775!3d-25.4290403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce4fd843b0807%3A0x6f7ab2e0bbc99bc!2sCentro%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1672567341234!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Santa Luzia do Rocio"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
