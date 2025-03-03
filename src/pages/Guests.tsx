
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GuestList from '@/components/GuestList';
import AddGuestDialog from '@/components/AddGuestDialog';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { EventType } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Guests = () => {
  const [selectedEventType, setSelectedEventType] = useState<EventType>(EventType.WEDDING);

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-display font-bold tracking-tight">Lista de Convidados</h1>
        <p className="text-muted-foreground max-w-3xl">
          Gerencie seus convidados, envie convites e acompanhe as confirmações. 
          Selecione o tipo de evento para visualizar a lista correspondente.
        </p>
        
        <Tabs defaultValue={EventType.WEDDING} className="w-full" onValueChange={(value) => setSelectedEventType(value as EventType)}>
          <TabsList className="mb-4">
            <TabsTrigger value={EventType.WEDDING}>Casamento</TabsTrigger>
            <TabsTrigger value={EventType.BIRTHDAY}>Aniversário</TabsTrigger>
            <TabsTrigger value={EventType.BARBECUE}>Churrasco</TabsTrigger>
          </TabsList>
          
          {Object.values(EventType).map((eventType) => (
            <TabsContent key={eventType} value={eventType} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">
                  {eventType === EventType.WEDDING ? 'Convidados do Casamento' : 
                   eventType === EventType.BIRTHDAY ? 'Convidados do Aniversário' : 
                   'Convidados do Churrasco'}
                </h2>
                <AddGuestDialog eventType={eventType}>
                  <Button size="sm" className="gap-2">
                    <UserPlus size={16} />
                    Adicionar Convidado
                  </Button>
                </AddGuestDialog>
              </div>
              
              <GuestList eventType={eventType} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Guests;
