
import React from 'react';
import { Users, Check, X, Trash2 } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventType, Guest } from '@/utils/types';
import { useGuestStore } from '@/store/guestStore';
import { toast } from 'sonner';

interface GuestListProps {
  eventType: EventType;
}

const GuestList = ({ eventType }: GuestListProps) => {
  const { getGuestsByEventType, updateGuestRSVP, removeGuest } = useGuestStore();
  
  const guests = getGuestsByEventType(eventType);
  
  const handleRSVPUpdate = (id: string, newRSVP: boolean) => {
    updateGuestRSVP(id, newRSVP);
    toast.success('Status de confirmação atualizado!');
  };
  
  const handleRemoveGuest = (id: string, name: string) => {
    removeGuest(id);
    toast.success(`${name} foi removido da lista de convidados.`);
  };
  
  if (guests.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Nenhum Convidado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Você ainda não adicionou nenhum convidado para este evento. Clique em "Adicionar Convidado" para começar.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Email: {guest.email}</span>
                    {guest.phone && (
                      <span className="text-xs text-muted-foreground">Tel: {guest.phone}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {guest.rsvp === true ? (
                    <Badge variant="success" className="bg-green-500">Confirmado</Badge>
                  ) : guest.rsvp === false ? (
                    <Badge variant="destructive">Pendente</Badge>
                  ) : (
                    <Badge variant="outline">Não respondido</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleRSVPUpdate(guest.id, true)}
                      title="Marcar como confirmado"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleRSVPUpdate(guest.id, false)}
                      title="Marcar como pendente"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleRemoveGuest(guest.id, guest.name)}
                      title="Remover convidado"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GuestList;
