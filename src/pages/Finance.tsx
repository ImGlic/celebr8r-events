
import React from 'react';
import Layout from '@/components/Layout';
import FinancialPlanning from '@/components/FinancialPlanning';

const Finance = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-display font-bold tracking-tight">Planejamento Financeiro</h1>
        <p className="text-muted-foreground max-w-3xl">
          Gerencie todos os aspectos financeiros do seu evento. Adicione despesas, 
          acompanhe pagamentos e convide moderadores para ajudar.
        </p>
        
        <FinancialPlanning />
      </div>
    </Layout>
  );
};

export default Finance;
