
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventType } from '@/utils/types';
import EventSelection from '@/components/EventSelection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const navigate = useNavigate();

  const handleSelectEvent = (type: EventType) => {
    setSelectedEvent(type);
    toast.success(`Evento ${type} selecionado!`);
  };

  const handleContinue = () => {
    if (!selectedEvent) {
      toast.error("Por favor, selecione um tipo de evento para continuar.");
      return;
    }
    navigate('/finance');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-16 pb-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Planeje eventos com facilidade</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 animate-scale-in">
          Celebre momentos especiais<br />com <span className="text-primary">celebr8r</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Organize casamentos, aniversários ou churrascões de forma simples e moderna. 
          Todo o planejamento em um só lugar.
        </p>
      </header>
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4">
        <EventSelection 
          selectedEvent={selectedEvent} 
          onSelectEvent={handleSelectEvent}
        />
        
        <div className="py-8 text-center">
          <Button 
            size="lg" 
            className="gap-2 text-base px-8 button-hover-effect"
            onClick={handleContinue}
            disabled={!selectedEvent}
          >
            Continuar <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2023 celebr8r. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
