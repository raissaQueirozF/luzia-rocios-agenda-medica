
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for appointments
const upcomingAppointments = [
  {
    id: 'apt-1',
    doctor: 'Dra. Ana Carvalho',
    doctorAvatar: '',
    specialty: 'Ginecologia',
    date: '2025-05-10',
    time: '14:30',
    status: 'scheduled'
  },
  {
    id: 'apt-2',
    doctor: 'Dr. Pedro Mendes',
    doctorAvatar: '',
    specialty: 'Obstetrícia',
    date: '2025-05-15',
    time: '10:00',
    status: 'scheduled'
  },
];

const pastAppointments = [
  {
    id: 'apt-3',
    doctor: 'Dra. Ana Carvalho',
    doctorAvatar: '',
    specialty: 'Ginecologia',
    date: '2025-04-20',
    time: '11:15',
    status: 'completed'
  },
  {
    id: 'apt-4',
    doctor: 'Dra. Marta Ribeiro',
    doctorAvatar: '',
    specialty: 'Ginecologia',
    date: '2025-03-05',
    time: '09:30',
    status: 'completed'
  },
  {
    id: 'apt-5',
    doctor: 'Dr. Pedro Mendes',
    doctorAvatar: '',
    specialty: 'Obstetrícia',
    date: '2025-02-15',
    time: '16:00',
    status: 'cancelled'
  },
];

const Appointments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Agendada</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelada</Badge>;
      default:
        return <Badge>Indefinido</Badge>;
    }
  };

  const filteredUpcoming = upcomingAppointments.filter(appointment => 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(appointment.date).includes(searchTerm)
  );

  const filteredPast = pastAppointments.filter(appointment => 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(appointment.date).includes(searchTerm)
  );

  const getDoctorInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <RequireAuth>
      <MainLayout>
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Meus Agendamentos</h1>
            <Button 
              onClick={() => navigate('/appointments/new')}
              className="bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Buscar por médico, especialidade ou data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
              <TabsTrigger value="past">Anteriores</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {filteredUpcoming.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredUpcoming.map((appointment) => (
                    <Card key={appointment.id} className="border-hospital-gold/20 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="mr-2 h-10 w-10">
                              <AvatarImage src={appointment.doctorAvatar} />
                              <AvatarFallback className="bg-hospital-mediumBrown text-white">
                                {getDoctorInitials(appointment.doctor)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                              <CardDescription>{appointment.specialty}</CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full border-hospital-gold/50 hover:bg-hospital-lightGold"
                          onClick={() => navigate(`/appointments/${appointment.id}`)}
                        >
                          Detalhes
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 mt-6 bg-hospital-cream/30 rounded-lg border border-hospital-gold/20">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhuma consulta agendada</h3>
                  <p className="text-muted-foreground">
                    Você não tem consultas agendadas no momento.
                  </p>
                  <Button 
                    onClick={() => navigate('/appointments/new')} 
                    className="mt-4 bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar Consulta
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {filteredPast.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredPast.map((appointment) => (
                    <Card key={appointment.id} className="border-hospital-gold/20 shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="mr-2 h-10 w-10">
                              <AvatarImage src={appointment.doctorAvatar} />
                              <AvatarFallback className="bg-hospital-mediumBrown/70 text-white">
                                {getDoctorInitials(appointment.doctor)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                              <CardDescription>{appointment.specialty}</CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full border-hospital-gold/50 hover:bg-hospital-lightGold"
                          onClick={() => navigate(`/appointments/${appointment.id}`)}
                        >
                          Detalhes
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 mt-6 bg-hospital-cream/30 rounded-lg border border-hospital-gold/20">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhuma consulta anterior</h3>
                  <p className="text-muted-foreground">
                    Seu histórico de consultas aparecerá aqui.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </RequireAuth>
  );
};

export default Appointments;
