
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure o agendamento e outras configurações do seu evento.
        </p>
      </CardContent>
    </Card>
  );
};

export default Settings;
