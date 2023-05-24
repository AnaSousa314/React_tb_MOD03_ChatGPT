import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

interface Expense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [mes, setMes] = useState('');
  const [dia, setDia] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Math.random(),
      descricao,
      categoria,
      valor: Number(valor),
      mes,
      dia,
    };
    onAddExpense(newExpense);
    setDescricao('');
    setCategoria('');
    setValor('');
    setMes('');
    setDia('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mês"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar Despesa
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;
