
import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle, 
  Circle, 
  FileText, 
  PenLine,
  UserPlus,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FinanceItem, FinanceCategory } from '@/utils/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Sample Data for demonstration
const sampleCategories: FinanceCategory[] = [
  { id: '1', name: 'Localização', icon: '🏢', color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Alimentação', icon: '🍽️', color: 'bg-orange-100 text-orange-600' },
  { id: '3', name: 'Decoração', icon: '🎨', color: 'bg-purple-100 text-purple-600' },
  { id: '4', name: 'Presentes', icon: '🎁', color: 'bg-red-100 text-red-600' },
  { id: '5', name: 'Música', icon: '🎵', color: 'bg-green-100 text-green-600' },
  { id: '6', name: 'Outros', icon: '📋', color: 'bg-gray-100 text-gray-600' },
];

const sampleExpenses: FinanceItem[] = [
  { 
    id: '1', 
    name: 'Aluguel do salão', 
    amount: 1500, 
    category: '1', 
    paid: false, 
    dueDate: new Date('2025-12-10'), 
    createdAt: new Date('2025-11-01') 
  },
  { 
    id: '2', 
    name: 'Buffet', 
    amount: 2000, 
    category: '2', 
    paid: true, 
    createdAt: new Date('2025-11-02') 
  },
  { 
    id: '3', 
    name: 'Flores e decoração', 
    amount: 800, 
    category: '3', 
    paid: false, 
    createdAt: new Date('2025-11-03') 
  },
];

const FinancialPlanning = () => {
  const [expenses, setExpenses] = useState<FinanceItem[]>(sampleExpenses);
  const [categories] = useState<FinanceCategory[]>(sampleCategories);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddModeratorOpen, setIsAddModeratorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newExpense, setNewExpense] = useState<Partial<FinanceItem>>({
    name: '',
    amount: 0,
    category: '',
    paid: false,
  });

  // Helper functions
  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);
  
  const getTotalBudget = () => expenses.reduce((sum, item) => sum + item.amount, 0);
  
  const getTotalPaid = () => expenses
    .filter(item => item.paid)
    .reduce((sum, item) => sum + item.amount, 0);
  
  // Format currency (BRL)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Handlers
  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount || !newExpense.category) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newItem: FinanceItem = {
      id: `exp-${Date.now()}`,
      name: newExpense.name,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      paid: false,
      createdAt: new Date(),
    };

    setExpenses([...expenses, newItem]);
    setNewExpense({ name: '', amount: 0, category: '', paid: false });
    setIsAddExpenseOpen(false);
    toast.success("Despesa adicionada com sucesso!");
  };

  const handleTogglePaid = (id: string) => {
    setExpenses(expenses.map(item => 
      item.id === id ? { ...item, paid: !item.paid } : item
    ));
    toast.success("Status de pagamento atualizado");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(item => item.id !== id));
    toast.success("Despesa removida com sucesso!");
  };

  const handleAddModerator = () => {
    // In a real app, this would add a moderator
    toast.success("Moderador adicionado com sucesso!");
    setIsAddModeratorOpen(false);
  };

  const filteredExpenses = activeTab === 'all' 
    ? expenses 
    : activeTab === 'paid' 
      ? expenses.filter(exp => exp.paid) 
      : expenses.filter(exp => !exp.paid);

  // Budget progress calculation
  const totalBudget = getTotalBudget();
  const totalPaid = getTotalPaid();
  const progressPercentage = totalBudget > 0 ? (totalPaid / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      {/* Header section with summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Budget Overview Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Orçamento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              {formatCurrency(totalBudget)}
            </div>
            <div className="text-sm text-muted-foreground">
              {expenses.length} itens no orçamento
            </div>
          </CardContent>
        </Card>

        {/* Paid Status Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Valor Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              {formatCurrency(totalPaid)}
            </div>
            <div className="flex w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="bg-green-500 transition-all duration-500 ease-out-expo"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {progressPercentage.toFixed(0)}% do orçamento pago
            </div>
          </CardContent>
        </Card>
        
        {/* Actions Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start gap-2" 
              onClick={() => setIsAddExpenseOpen(true)}
            >
              <Plus className="h-4 w-4" /> Adicionar Despesa
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2" 
              onClick={() => setIsAddModeratorOpen(true)}
            >
              <UserPlus className="h-4 w-4" /> Adicionar Moderador
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" /> Exportar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Expenses List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Despesas</CardTitle>
            <Tabs defaultValue="all" className="w-[400px]" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="paid">Pagos</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => {
                  const category = getCategoryById(expense.category);
                  
                  return (
                    <div 
                      key={expense.id} 
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-all",
                        expense.paid 
                          ? "bg-green-50 border-green-100" 
                          : "bg-white border-border"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <button 
                          className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                          onClick={() => handleTogglePaid(expense.id)}
                        >
                          {expense.paid ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                          )}
                        </button>
                        
                        <div>
                          <div className="font-medium">{expense.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            {category && (
                              <span className={cn("chip", category.color)}>
                                {category.icon} {category.name}
                              </span>
                            )}
                            {expense.dueDate && (
                              <span className="text-xs ml-2">
                                Vencimento: {new Date(expense.dueDate).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "text-right",
                          expense.paid ? "text-green-600" : "text-foreground"
                        )}>
                          <div className="font-semibold">
                            {formatCurrency(expense.amount)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {expense.paid ? "Pago" : "Pendente"}
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <PenLine className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive/80"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma despesa encontrada.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Despesa</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova despesa para seu evento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="expense-name">Nome da despesa</Label>
              <Input 
                id="expense-name" 
                placeholder="Ex: Aluguel do salão"
                value={newExpense.name}
                onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="expense-amount">Valor (R$)</Label>
              <Input 
                id="expense-amount" 
                type="number"
                placeholder="0,00"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border",
                      "transition-all duration-200 hover:border-primary focus:outline-none focus-visible:ring-2",
                      newExpense.category === category.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                    onClick={() => setNewExpense({...newExpense, category: category.id})}
                  >
                    <span className="text-xl mb-1">{category.icon}</span>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddExpense}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Moderator Dialog */}
      <Dialog open={isAddModeratorOpen} onOpenChange={setIsAddModeratorOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Moderador</DialogTitle>
            <DialogDescription>
              Adicione pessoas para ajudar no planejamento financeiro do seu evento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="moderator-email">Email do moderador</Label>
              <Input 
                id="moderator-email" 
                type="email"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Permissões</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Visualizar todas as despesas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Adicionar novas despesas</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Remover despesas (apenas você pode fazer isso)</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModeratorOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddModerator}>Convidar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialPlanning;
