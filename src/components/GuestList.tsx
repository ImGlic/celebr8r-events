
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GuestList = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Lista de Convidados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Gerencie seus convidados para o evento. Adicione, remova e organize sua lista de convidados.
        </p>
      </CardContent>
    </Card>
  );
};

export default GuestList;
