
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { EventType } from '@/utils/types';

const EventConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventType = location.state?.eventType as EventType || EventType.WEDDING;
  
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const getEventTypeName = (type: EventType) => {
    switch (type) {
      case EventType.WEDDING:
        return 'Casamento';
      case EventType.BIRTHDAY:
        return 'Aniversário';
      case EventType.BARBECUE:
        return 'Churrascão';
      default:
        return 'Evento';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventName || !eventDate || !eventTime || !eventLocation) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Aqui você pode salvar os dados do evento em seu estado global ou backend
    toast.success('Evento configurado com sucesso!');
    
    // Navegar para o painel
    navigate('/dashboard', { 
      state: { 
        eventType, 
        eventName, 
        eventDate, 
        eventTime, 
        eventLocation 
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Configurar {getEventTypeName(eventType)}</h1>
        <p className="text-muted-foreground">Defina os detalhes do seu evento</p>
      </header>
      
      <Card className="max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Detalhes do Evento</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Nome do Evento</Label>
              <div className="relative">
                <Input
                  id="eventName"
                  placeholder="Digite o nome do evento"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventDate">Data</Label>
              <div className="relative">
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventTime">Horário</Label>
              <div className="relative">
                <Input
                  id="eventTime"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="pl-10"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Local</Label>
              <div className="relative">
                <Input
                  id="eventLocation"
                  placeholder="Endereço do evento"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
            
            <Button type="submit" className="gap-2">
              Continuar <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EventConfig;
