
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventType, Guest } from '@/utils/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useGuestStore } from '@/store/guestStore';

interface AddGuestDialogProps {
  children: React.ReactNode;
  eventType: EventType;
}

const AddGuestDialog = ({ children, eventType }: AddGuestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const addGuest = useGuestStore(state => state.addGuest);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error('Por favor, preencha os campos obrigatórios: nome e email');
      return;
    }
    
    // Format phone if it exists
    const formattedPhone = phone ? formatPhoneForWhatsApp(phone) : '';
    
    const newGuest: Guest = {
      id: uuidv4(),
      name,
      email,
      phone: formattedPhone,
      rsvp: false,
      createdAt: new Date(),
      eventType
    };
    
    addGuest(newGuest);
    
    // Send WhatsApp message if phone is provided
    if (formattedPhone) {
      sendWhatsAppInvite(newGuest);
    }
    
    toast.success(`${name} foi adicionado à lista de convidados!`);
    
    // Reset form and close dialog
    setName('');
    setEmail('');
    setPhone('');
    setOpen(false);
  };
  
  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove non-numeric characters
    return phone.replace(/\D/g, '');
  };
  
  const sendWhatsAppInvite = (guest: Guest) => {
    const eventNames = {
      [EventType.WEDDING]: 'Casamento',
      [EventType.BIRTHDAY]: 'Aniversário',
      [EventType.BARBECUE]: 'Churrasco'
    };
    
    const message = encodeURIComponent(
      `Olá ${guest.name}! Você foi convidado para o ${eventNames[eventType]} organizado no app celebr8r. Esperamos sua presença!`
    );
    
    const whatsappUrl = `https://wa.me/${guest.phone}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Convidado</DialogTitle>
          <DialogDescription>
            Preencha os dados do convidado. Um convite será enviado por WhatsApp caso o telefone seja informado.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome*</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nome do convidado"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email@exemplo.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (WhatsApp)</Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+55 (xx) xxxxx-xxxx"
            />
            <p className="text-xs text-muted-foreground">
              Formato internacional: +55 (DDD) NÚMERO
            </p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Convidado</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestDialog;
