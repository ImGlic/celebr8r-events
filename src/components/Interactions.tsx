
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Interactions = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Interações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure interações pré-evento, durante e pós-evento para os participantes.
        </p>
      </CardContent>
    </Card>
  );
};

export default Interactions;
