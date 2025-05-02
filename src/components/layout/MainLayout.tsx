
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Calendar, Heart, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const mobileMenuItems = [
    { label: 'Início', href: '/', icon: Heart },
    { label: 'Agendamentos', href: '/appointments', icon: Calendar },
    { label: 'Perfil', href: '/profile', icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <div className="absolute inset-0 gold-gradient" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-playfair font-bold">SL</div>
              </div>
              <span className="font-playfair text-xl font-bold text-hospital-darkBrown">
                Santa Luzia do Rocio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium hover:text-hospital-mediumBrown transition-colors">
              Início
            </Link>
            <Link to="/services" className="font-medium hover:text-hospital-mediumBrown transition-colors">
              Serviços
            </Link>
            <Link to="/doctors" className="font-medium hover:text-hospital-mediumBrown transition-colors">
              Médicos
            </Link>
            <Link to="/about" className="font-medium hover:text-hospital-mediumBrown transition-colors">
              Sobre
            </Link>
            <Link to="/contact" className="font-medium hover:text-hospital-mediumBrown transition-colors">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/appointments" className="hidden md:flex">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendamentos
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full overflow-hidden border-2 border-hospital-gold hover:bg-transparent"
                    >
                      <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-hospital-mediumBrown text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/appointments')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Meus Agendamentos</span>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Administração</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hidden md:flex"
                >
                  Entrar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="hidden md:flex bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                >
                  Cadastrar
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="grid gap-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <div className="absolute inset-0 gold-gradient" />
                      <div className="absolute inset-0 flex items-center justify-center text-white font-playfair font-bold text-xs">SL</div>
                    </div>
                    <span className="font-playfair font-bold text-lg">
                      Santa Luzia do Rocio
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-2 py-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.avatarUrl} />
                            <AvatarFallback className="bg-hospital-mediumBrown text-white">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : user?.role === 'staff' ? 'Funcionário' : 'Paciente'}</p>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          {mobileMenuItems.map((item, index) => (
                            <Link key={index} to={item.href}>
                              <Button variant="ghost" className="w-full justify-start">
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                              </Button>
                            </Link>
                          ))}
                          {user?.role === 'admin' && (
                            <Link to="/admin">
                              <Button variant="ghost" className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                Administração
                              </Button>
                            </Link>
                          )}
                          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid gap-2">
                          <Link to="/">
                            <Button variant="ghost" className="w-full justify-start">
                              <Heart className="mr-2 h-4 w-4" />
                              Início
                            </Button>
                          </Link>
                          <Link to="/services">
                            <Button variant="ghost" className="w-full justify-start">
                              Serviços
                            </Button>
                          </Link>
                          <Link to="/doctors">
                            <Button variant="ghost" className="w-full justify-start">
                              Médicos
                            </Button>
                          </Link>
                          <Link to="/about">
                            <Button variant="ghost" className="w-full justify-start">
                              Sobre
                            </Button>
                          </Link>
                          <Link to="/contact">
                            <Button variant="ghost" className="w-full justify-start">
                              Contato
                            </Button>
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" onClick={() => navigate('/login')}>
                            Entrar
                          </Button>
                          <Button 
                            className="bg-hospital-gold text-hospital-darkBrown hover:bg-hospital-mediumBrown hover:text-white"
                            onClick={() => navigate('/register')}
                          >
                            Cadastrar
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 md:py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <div className="absolute inset-0 gold-gradient" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-playfair font-bold text-xs">SL</div>
                </div>
                <span className="font-playfair font-bold text-lg">
                  Hospital Santa Luzia do Rocio
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Hospital especializado em ginecologia e obstetrícia, oferecendo atendimento de excelência para mulheres em todas as fases da vida.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Links Rápidos</h3>
              <div className="grid gap-1 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Início
                </Link>
                <Link to="/services" className="text-muted-foreground hover:text-foreground">
                  Serviços
                </Link>
                <Link to="/doctors" className="text-muted-foreground hover:text-foreground">
                  Médicos
                </Link>
                <Link to="/appointments" className="text-muted-foreground hover:text-foreground">
                  Agendamentos
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contato</h3>
              <div className="grid gap-1 text-sm">
                <p className="text-muted-foreground">Rua das Flores, 123</p>
                <p className="text-muted-foreground">Curitiba - PR, CEP 80000-000</p>
                <p className="text-muted-foreground">(41) 3333-4444</p>
                <p className="text-muted-foreground">contato@santaluziarocio.com.br</p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hospital Santa Luzia do Rocio. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
