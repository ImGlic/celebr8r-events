
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EventType } from '@/utils/types';
import { useGuestStore } from '@/store/guestStore';
import { Check, X, Mail, Phone, Share } from 'lucide-react';
import { toast } from 'sonner';

interface GuestListComponentProps {
  eventType: EventType;
}

const GuestListComponent = ({ eventType }: GuestListComponentProps) => {
  const { getGuestsByEventType, updateGuestRSVP, removeGuest } = useGuestStore();
  const guests = getGuestsByEventType(eventType);

  const handleRSVPToggle = (id: string, currentRSVP: boolean | undefined) => {
    updateGuestRSVP(id, !currentRSVP);
    toast.success('Status de confirmação atualizado');
  };

  const handleRemoveGuest = (id: string, name: string) => {
    removeGuest(id);
    toast.success(`${name} foi removido da lista de convidados`);
  };

  const handleSendWhatsApp = (phone: string, name: string) => {
    if (!phone) {
      toast.error('Este convidado não possui número de telefone cadastrado');
      return;
    }

    const eventNames = {
      [EventType.WEDDING]: 'Casamento',
      [EventType.BIRTHDAY]: 'Aniversário',
      [EventType.BARBECUE]: 'Churrasco'
    };
    
    const message = encodeURIComponent(
      `Olá ${name}! Estamos aguardando sua confirmação para o ${eventNames[eventType]} organizado no app celebr8r. Você poderá comparecer?`
    );
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (guests.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card/50">
        <p className="text-muted-foreground">
          Nenhum convidado adicionado ainda. 
          Utilize o botão "Adicionar Convidado" para começar sua lista.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Confirmado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{guest.name}</TableCell>
              <TableCell>{guest.email}</TableCell>
              <TableCell>{guest.phone || '-'}</TableCell>
              <TableCell>
                <Button 
                  variant={guest.rsvp ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleRSVPToggle(guest.id, guest.rsvp)}
                  className={guest.rsvp ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {guest.rsvp ? <Check className="h-4 w-4 mr-1" /> : null}
                  {guest.rsvp ? 'Confirmado' : 'Pendente'}
                </Button>
              </TableCell>
              <TableCell className="text-right space-x-1">
                {guest.phone && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSendWhatsApp(guest.phone || '', guest.name)}
                    title="Enviar WhatsApp"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveGuest(guest.id, guest.name)}
                  className="text-destructive"
                  title="Remover convidado"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestListComponent;
