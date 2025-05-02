
import React, { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User, Upload, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const profileFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user?.avatarUrl || null);

  if (!user) return null;

  const defaultValues: Partial<ProfileFormValues> = {
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    birthDate: user.birthDate || '',
    address: user.address || '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateUserProfile({
      ...data,
      avatarUrl: imagePreview || undefined,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const userInitials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <RequireAuth>
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="profile">Informações</TabsTrigger>
              <TabsTrigger value="appointments">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <Card className="col-span-1 border-hospital-gold/20">
                  <CardHeader>
                    <CardTitle>Foto de Perfil</CardTitle>
                    <CardDescription>Clique na imagem para alterar</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div 
                      className="relative cursor-pointer group"
                      onClick={handleImageClick}
                    >
                      <Avatar className="w-40 h-40 border-4 border-hospital-gold/20 shadow-md">
                        <AvatarImage src={imagePreview || undefined} />
                        <AvatarFallback className="bg-hospital-mediumBrown text-white text-4xl">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200">
                        <Upload className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <h3 className="font-bold text-xl">{user.name}</h3>
                      <p className="text-muted-foreground">{user.role === 'admin' ? 'Administrador' : user.role === 'staff' ? 'Funcionário' : 'Paciente'}</p>
                    </div>
                    <div className="w-full mt-6 space-y-4">
                      <div className="flex items-center">
                        <User className="text-muted-foreground w-5 h-5 mr-3" />
                        <span>CPF: {user.cpf || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-muted-foreground w-5 h-5 mr-3" />
                        <span>Cadastrado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-2 border-hospital-gold/20">
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize seus dados pessoais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="Seu nome completo" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="seu.email@exemplo.com" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input className="pl-10" placeholder="(00) 00000-0000" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input className="pl-10" type="date" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Endereço</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="Rua, número, bairro, cidade, estado" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="bg-hospital-gold hover:bg-hospital-mediumBrown text-hospital-darkBrown hover:text-white">
                          Salvar Alterações
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="mt-6 border-hospital-gold/20">
                <CardHeader>
                  <CardTitle>Histórico de Consultas</CardTitle>
                  <CardDescription>Confira suas consultas anteriores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Nenhuma consulta anterior</h3>
                    <p className="text-muted-foreground">
                      Quando você realizar consultas, elas aparecerão aqui.
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/appointments/new'} 
                      className="mt-4 bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                    >
                      Agendar Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </RequireAuth>
  );
};

export default Profile;
