
import React from 'react';
import { Calendar, Cake, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EventType } from '@/utils/types';
import { cn } from '@/lib/utils';

interface EventCardProps {
  type: EventType;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

const EventCard = ({ type, title, description, icon, isSelected, onSelect }: EventCardProps) => (
  <Card 
    className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-elevation cursor-pointer border-2",
      isSelected ? "border-primary" : "border-transparent"
    )}
    onClick={onSelect}
  >
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className={cn(
        "h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
        isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
      )}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button 
        variant={isSelected ? "default" : "outline"} 
        className="mt-auto"
      >
        {isSelected ? "Selecionado" : "Selecionar"}
      </Button>
    </CardContent>
  </Card>
);

interface EventSelectionProps {
  selectedEvent: EventType | null;
  onSelectEvent: (type: EventType) => void;
}

const EventSelection = ({ selectedEvent, onSelectEvent }: EventSelectionProps) => {
  const eventCards = [
    {
      type: EventType.WEDDING,
      title: "Casamento",
      description: "Planeje o seu dia especial com todos os detalhes.",
      icon: <Calendar size={28} />,
    },
    {
      type: EventType.BIRTHDAY,
      title: "Aniversário",
      description: "Organize sua festa de aniversário inesquecível.",
      icon: <Cake size={28} />,
    },
    {
      type: EventType.BARBECUE,
      title: "Churrascão",
      description: "Prepare um churrasco de domingo perfeito.",
      icon: <Utensils size={28} />,
    },
  ];

  return (
    <div className="py-6">
      <h2 className="section-title text-center mb-2">Selecione o tipo de evento</h2>
      <p className="section-subtitle text-center mb-8">
        Escolha o tipo de evento que você quer organizar
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventCards.map((event) => (
          <EventCard
            key={event.type}
            type={event.type}
            title={event.title}
            description={event.description}
            icon={event.icon}
            isSelected={selectedEvent === event.type}
            onSelect={() => onSelectEvent(event.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSelection;
