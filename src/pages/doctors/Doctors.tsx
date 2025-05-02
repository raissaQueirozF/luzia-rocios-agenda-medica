
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Doctor, Specialty } from '@/types';

// Mock data for doctors
const doctorsData: Doctor[] = [
  {
    id: '1',
    name: 'Dra. Ana Carvalho',
    specialty: ['gynecology'],
    crm: '12345-PR',
    avatarUrl: '',
    bio: 'Especialista em ginecologia com mais de 15 anos de experiência. Formada pela USP com residência no Hospital das Clínicas. Atendimento humanizado e personalizado para cada paciente.'
  },
  {
    id: '2',
    name: 'Dr. Pedro Mendes',
    specialty: ['obstetrics'],
    crm: '23456-PR',
    avatarUrl: '',
    bio: 'Especialista em obstetrícia de alto risco, com foco em gestações múltiplas. Formado pela UFPR com mais de 10 anos de experiência em acompanhamento pré-natal.'
  },
  {
    id: '3',
    name: 'Dra. Marta Ribeiro',
    specialty: ['gynecology', 'obstetrics'],
    crm: '34567-PR',
    avatarUrl: '',
    bio: 'Dupla especialização em ginecologia e obstetrícia com pós-graduação em reprodução humana. Atua com foco em saúde da mulher em todas as fases da vida.'
  },
  {
    id: '4',
    name: 'Dr. José Santos',
    specialty: ['obstetrics'],
    crm: '45678-PR',
    avatarUrl: '',
    bio: 'Especialista em obstetrícia com foco em partos humanizados. Formado pela UNICAMP com residência no Hospital Albert Einstein. Defensor do protagonismo da mulher durante o parto.'
  },
  {
    id: '5',
    name: 'Dra. Luísa Oliveira',
    specialty: ['gynecology'],
    crm: '56789-PR',
    avatarUrl: '',
    bio: 'Ginecologista especializada em saúde hormonal feminina. Mestre em endocrinologia ginecológica pela UFRJ. Atendimento integral com foco no bem-estar da mulher.'
  }
];

// Schedule availability model
const doctorSchedules: { [key: string]: { days: string[], hours: string[] } } = {
  '1': { 
    days: ['Segunda', 'Terça', 'Quinta'], 
    hours: ['08:00 - 12:00', '14:00 - 18:00'] 
  },
  '2': { 
    days: ['Segunda', 'Quarta', 'Sexta'], 
    hours: ['09:00 - 12:00', '13:00 - 17:00'] 
  },
  '3': { 
    days: ['Terça', 'Quinta'], 
    hours: ['08:00 - 14:00'] 
  },
  '4': { 
    days: ['Segunda', 'Quarta', 'Sexta'], 
    hours: ['07:00 - 13:00'] 
  },
  '5': { 
    days: ['Terça', 'Quinta', 'Sexta'], 
    hours: ['13:00 - 19:00'] 
  },
};

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | 'all'>('all');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSpecialtyFilter = (specialty: Specialty | 'all') => {
    setSpecialtyFilter(specialty);
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === 'all' || 
                            doctor.specialty.includes(specialtyFilter as Specialty);
    
    return matchesSearch && matchesSpecialty;
  });

  const getDoctorInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getSpecialtyLabel = (specialty: Specialty) => {
    return specialty === 'gynecology' ? 'Ginecologia' : 'Obstetrícia';
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hospital-darkBrown font-playfair">Nossos Médicos</h1>
          <p className="mt-4 text-lg text-hospital-mediumBrown max-w-2xl mx-auto">
            Conheça nossa equipe de especialistas em Ginecologia e Obstetrícia, dedicados a oferecer o melhor atendimento para sua saúde.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Buscar médico..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={specialtyFilter === 'all' ? 'default' : 'outline'}
              className={specialtyFilter === 'all' ? 'bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white' : ''}
              onClick={() => handleSpecialtyFilter('all')}
            >
              Todos
            </Button>
            <Button 
              variant={specialtyFilter === 'gynecology' ? 'default' : 'outline'}
              className={specialtyFilter === 'gynecology' ? 'bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white' : ''}
              onClick={() => handleSpecialtyFilter('gynecology')}
            >
              Ginecologia
            </Button>
            <Button 
              variant={specialtyFilter === 'obstetrics' ? 'default' : 'outline'}
              className={specialtyFilter === 'obstetrics' ? 'bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white' : ''}
              onClick={() => handleSpecialtyFilter('obstetrics')}
            >
              Obstetrícia
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="flex flex-col h-full border-hospital-gold/20 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-hospital-gold">
                    <AvatarImage src={doctor.avatarUrl} />
                    <AvatarFallback className="bg-hospital-mediumBrown text-white text-xl">
                      {getDoctorInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-hospital-darkBrown">{doctor.name}</CardTitle>
                    <CardDescription className="text-sm">CRM: {doctor.crm}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {doctor.specialty.map((spec) => (
                        <Badge 
                          key={spec} 
                          className={`${
                            spec === 'gynecology' 
                              ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          } border`}
                        >
                          {getSpecialtyLabel(spec)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{doctor.bio}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-hospital-mediumBrown" />
                    <span className="text-sm font-medium">Dias de Atendimento:</span>
                  </div>
                  <p className="text-sm pl-6">
                    {doctorSchedules[doctor.id]?.days.join(', ')}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-hospital-mediumBrown" />
                    <span className="text-sm font-medium">Horários:</span>
                  </div>
                  <p className="text-sm pl-6">
                    {doctorSchedules[doctor.id]?.hours.join(' | ')}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button 
                  className="w-full bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                  onClick={() => navigate('/appointments/new')}
                >
                  Agendar Consulta
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 mt-6 bg-hospital-cream/30 rounded-lg border border-hospital-gold/20">
            <h3 className="text-lg font-medium">Nenhum médico encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros de busca.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Doctors;
