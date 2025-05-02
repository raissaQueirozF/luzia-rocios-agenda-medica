
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for doctors
const doctors = [
  {
    id: '1',
    name: 'Dra. Ana Carvalho',
    specialty: 'gynecology',
    image: '',
    availableDays: [1, 2, 4], // Monday, Tuesday, Thursday
  },
  {
    id: '2',
    name: 'Dr. Pedro Mendes',
    specialty: 'obstetrics',
    image: '',
    availableDays: [1, 3, 5], // Monday, Wednesday, Friday
  },
  {
    id: '3',
    name: 'Dra. Marta Ribeiro',
    specialty: 'gynecology',
    image: '',
    availableDays: [2, 3, 5], // Tuesday, Wednesday, Friday
  },
  {
    id: '4',
    name: 'Dr. José Santos',
    specialty: 'obstetrics',
    image: '',
    availableDays: [1, 4, 5], // Monday, Thursday, Friday
  },
];

// Time slots for appointments
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const NewAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const isDisabledDay = (date: Date) => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPastDay = date < new Date(new Date().setHours(0, 0, 0, 0));

    // If no doctor is selected, only disable weekends and past days
    if (!selectedDoctor) {
      return isWeekend || isPastDay;
    }

    // Find the selected doctor
    const doctor = doctors.find(doc => doc.id === selectedDoctor);
    if (!doctor) return true;

    // Check if the day is available for this doctor (1 = Monday, 7 = Sunday in JS getDay)
    const availableDays = doctor.availableDays;
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
    const isDoctorAvailable = availableDays.includes(adjustedDay);
    
    return isWeekend || isPastDay || !isDoctorAvailable;
  };

  // Get the available time slots based on the date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;
    
    // Simulate some time slots being already booked
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    
    return timeSlots.filter(time => {
      const [hour, minute] = time.split(':').map(Number);
      if (isToday && (hour < currentHour || (hour === currentHour && minute <= currentMinutes))) {
        return false;
      }
      
      // Simulate random availability
      const dateStr = `${selectedDate.getDate()}-${selectedDate.getMonth()}`;
      const doctorId = selectedDoctor || '1';
      const hash = `${dateStr}-${time}-${doctorId}`.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      return Math.abs(hash) % 3 !== 0; // Roughly 2/3 of slots available
    });
  };

  const handleNext = () => {
    if (step === 1 && !specialty) {
      toast.error("Por favor, selecione uma especialidade.");
      return;
    }
    
    if (step === 2 && !selectedDoctor) {
      toast.error("Por favor, selecione um médico.");
      return;
    }
    
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Por favor, selecione uma data e horário.");
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      setConfirmationVisible(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    // In a real app, this would send the appointment data to a server
    toast.success("Consulta agendada com sucesso!");
    navigate('/appointments');
  };

  const getSelectedDoctorInfo = () => {
    return doctors.find(doc => doc.id === selectedDoctor);
  };

  const getDoctorsBySpecialty = () => {
    return doctors.filter(doc => doc.specialty === specialty);
  };

  const getDoctorInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Escolha a especialidade</h3>
        <p className="text-muted-foreground">Selecione a especialidade para sua consulta</p>
      </div>
      <RadioGroup value={specialty} onValueChange={setSpecialty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <RadioGroupItem
            value="gynecology"
            id="gynecology"
            className="peer sr-only"
          />
          <Label
            htmlFor="gynecology"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-hospital-gold peer-data-[state=checked]:bg-hospital-lightGold [&:has([data-state=checked])]:border-hospital-gold [&:has([data-state=checked])]:bg-hospital-lightGold"
          >
            <div className="mb-4 rounded-full p-4 bg-hospital-cream">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-darkBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
            </div>
            <div className="text-center space-y-1">
              <div className="font-medium">Ginecologia</div>
              <div className="text-sm text-muted-foreground">
                Cuidados e tratamentos para saúde feminina
              </div>
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="obstetrics"
            id="obstetrics"
            className="peer sr-only"
          />
          <Label
            htmlFor="obstetrics"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-hospital-gold peer-data-[state=checked]:bg-hospital-lightGold [&:has([data-state=checked])]:border-hospital-gold [&:has([data-state=checked])]:bg-hospital-lightGold"
          >
            <div className="mb-4 rounded-full p-4 bg-hospital-cream">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hospital-darkBrown" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h.01"></path>
                <path d="M15 12h.01"></path>
                <path d="M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"></path>
                <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
              </svg>
            </div>
            <div className="text-center space-y-1">
              <div className="font-medium">Obstetrícia</div>
              <div className="text-sm text-muted-foreground">
                Acompanhamento pré-natal e cuidados na gestação
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderStep2 = () => {
    const filteredDoctors = getDoctorsBySpecialty();
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Escolha o médico</h3>
          <p className="text-muted-foreground">Selecione o profissional para atendê-lo</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doctor) => (
            <Card 
              key={doctor.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedDoctor === doctor.id ? "border-2 border-hospital-gold bg-hospital-lightGold" : "border border-muted"
              )}
              onClick={() => setSelectedDoctor(doctor.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={doctor.image} />
                    <AvatarFallback className="bg-hospital-mediumBrown text-white">
                      {getDoctorInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty === 'gynecology' ? 'Ginecologia' : 'Obstetrícia'}
                    </p>
                  </div>
                  {selectedDoctor === doctor.id && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hospital-gold text-black">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const availableTimeSlots = getAvailableTimeSlots();
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Escolha a data e horário</h3>
          <p className="text-muted-foreground">Selecione a melhor data e horário para sua consulta</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="font-medium mb-2">Data</p>
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDisabledDay}
                className={cn("p-3 pointer-events-auto")}
                locale={ptBR}
              />
            </div>
          </div>
          
          <div>
            <p className="font-medium mb-2">Horário</p>
            {selectedDate ? (
              availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      className={cn(
                        "flex items-center justify-center",
                        selectedTime === time && "border-2 border-hospital-gold bg-hospital-lightGold"
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground py-4 text-center">
                  Não há horários disponíveis para esta data. Por favor, selecione outra data.
                </p>
              )
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                Selecione uma data para ver os horários disponíveis.
              </p>
            )}
          </div>
        </div>
        
        <div>
          <p className="font-medium mb-2">Observações (opcional)</p>
          <Textarea
            placeholder="Informe quaisquer detalhes importantes sobre sua consulta"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    const doctorInfo = getSelectedDoctorInfo();
    
    return (
      <Card className="border-hospital-gold/20 shadow-lg">
        <CardHeader>
          <CardTitle>Confirmação de Agendamento</CardTitle>
          <CardDescription>Revise os detalhes do seu agendamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Detalhes da Consulta</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Especialidade:</span>
                  <span>{specialty === 'gynecology' ? 'Ginecologia' : 'Obstetrícia'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Médico:</span>
                  <span>{doctorInfo?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span>{selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário:</span>
                  <span>{selectedTime}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Observações</h4>
              <p className="text-sm text-muted-foreground">
                {notes || "Nenhuma observação fornecida."}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Atenção</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Chegue com 15 minutos de antecedência.</li>
              <li>Traga documento de identidade e cartão do convênio (se aplicável).</li>
              <li>Em caso de cancelamento, avise com pelo menos 24 horas de antecedência.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setConfirmationVisible(false)}
            >
              Voltar
            </Button>
            <Button 
              className="flex-1 bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
              onClick={handleConfirm}
            >
              Confirmar Agendamento
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <RequireAuth>
      <MainLayout>
        <div className="container py-8">
          {confirmationVisible ? (
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setConfirmationVisible(false)}
                className="mb-4"
              >
                ← Voltar para editar
              </Button>
              {renderConfirmation()}
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">Agendar Consulta</h1>
              
              {/* Stepper */}
              <div className="mb-8">
                <ol className="flex items-center w-full">
                  {[1, 2, 3].map((i) => (
                    <li 
                      key={i}
                      className={cn(
                        "flex items-center",
                        i < 3 ? "w-full" : "",
                        step > i ? "text-hospital-gold" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full text-sm font-medium border-2 w-8 h-8",
                          step === i ? "border-hospital-gold bg-hospital-lightGold" : "",
                          step > i ? "bg-hospital-gold border-hospital-gold text-white" : ""
                        )}
                      >
                        {step > i ? <Check className="h-4 w-4" /> : i}
                      </div>
                      <div className="flex-1 ml-2 mr-4 text-sm">
                        {i === 1 ? 'Especialidade' : i === 2 ? 'Médico' : 'Data e Hora'}
                      </div>
                      
                      {i < 3 && (
                        <div className="flex-1 h-px bg-gray-200"></div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              
              <Card className="border-hospital-gold/20">
                <CardContent className="pt-6">
                  {renderStepContent()}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                    onClick={handleNext}
                  >
                    {step < 3 ? 'Próximo' : 'Revisar e Confirmar'}
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </MainLayout>
    </RequireAuth>
  );
};

export default NewAppointment;
