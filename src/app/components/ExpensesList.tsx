// import React, { useState, useEffect } from 'react';
// import { Select, MenuItem, FormControl, InputLabel, Grid, Typography } from '@material-ui/core';
// import { useHistory, useParams } from 'react-router-dom';

// interface ExpensesListProps {}

// interface Expense {
//   id: number;
//   descricao: string;
//   categoria: string;
//   valor: number;
//   mes: string;
//   dia: string;
// }

// interface RouteParams {
//   year: string;
//   month: string;
// }

// const ExpensesList: React.FC<ExpensesListProps> = () => {
//   const history = useHistory();
//   const { year, month } = useParams<RouteParams>();
//   const [selectedYear, setSelectedYear] = useState(year || '');
//   const [selectedMonth, setSelectedMonth] = useState(month || '');
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [availableYears, setAvailableYears] = useState<string[]>([]);
//   const [availableMonths, setAvailableMonths] = useState<string[]>([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/despesas')
//       .then((response) => response.json())
//       .then((data) => {
//         const yearsSet = new Set<string>();
//         const monthsSet = new Set<string>();
//         data.forEach((expense: Expense) => {
//           const [year, month] = expense.mes.split('-');
//           yearsSet.add(year);
//           monthsSet.add(month);
//         });
//         const sortedYears = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
//         const sortedMonths = Array.from(monthsSet).sort((a, b) => parseInt(a) - parseInt(b));
//         setAvailableYears(sortedYears);
//         setAvailableMonths(sortedMonths);
//         setExpenses(data);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedYear && selectedMonth) {
//       history.push(`/${selectedYear}/${selectedMonth}`);
//     }
//   }, [selectedYear, selectedMonth, history]);

//   const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setSelectedYear(event.target.value as string);
//   };

//   const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setSelectedMonth(event.target.value as string);
//   };

//   const totalExpenses = expenses.reduce((total, expense) => total + expense.valor, 0);

//   return (
//     <Grid container spacing={2}>
//       <Grid item>
//         <FormControl>
//           <InputLabel>Ano</InputLabel>
//           <Select value={selectedYear} onChange={handleYearChange}>
//             {availableYears.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item>
//         <FormControl>
//           <InputLabel>Mês</InputLabel>
//           <Select value={selectedMonth} onChange={handleMonthChange}>
//             {availableMonths.map((month) => (
//               <MenuItem key={month} value={month}>
//                 {month}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h6">Despesas do mês:</Typography>
//         {expenses.length > 0 ? (
//           <ul>
//             {expenses.map((expense) => (
//               <li key={expense.id}>
//                 <Typography>{expense.descricao}</Typography>
//                 <Typography>{expense.categoria}</Typography>
//                 <Typography>{expense.dia}</Typography>
//                 <Typography>{expense.valor}</Typography>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <Typography>Nenhuma despesa encontrada para o mês selecionado.</Typography>
//         )}
//         <Typography variant="h6">Total: {totalExpenses}</Typography>
//       </Grid>
//     </Grid>
//   );
// };

// export default ExpensesList;

import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

interface ExpensesListProps {}

interface Expense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

interface RouteParams {
  year: string;
  month: string;
}

const ExpensesList: React.FC<ExpensesListProps> = () => {
  const history = useHistory();
  const { year, month } = useParams<RouteParams>();
  const [selectedYear, setSelectedYear] = useState(year || '');
  const [selectedMonth, setSelectedMonth] = useState(month || '');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/despesas')
      .then((response) => response.json())
      .then((data) => {
        const yearsSet = new Set<string>();
        const monthsSet = new Set<string>();
        data.forEach((expense: Expense) => {
          const [year, month] = expense.mes.split('-');
          yearsSet.add(year);
          monthsSet.add(month);
        });
        const sortedYears = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
        const sortedMonths = Array.from(monthsSet).sort((a, b) => parseInt(a) - parseInt(b));
        setAvailableYears(sortedYears);
        setAvailableMonths(sortedMonths);
        setExpenses(data);
      });
  }, []);

  // http://localhost:3001/despesas?mes=2021-01&_sort=dia
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      history.push(`?mes=${selectedYear}-${selectedMonth}&_sort=dia`);
      
    }
  }, [selectedYear, selectedMonth, history]);

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as string);
  };

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as string);
  };

  // const totalExpenses = expenses.reduce((total, expense) => total + expense.valor, 0);

  let filteredExpenses = expenses.filter((expense) => {
    const [expenseYear, expenseMonth] = expense.mes.split('-');
    return expenseYear === selectedYear && expenseMonth === selectedMonth;
  });

  filteredExpenses = filteredExpenses.sort((a,b) => a.dia.localeCompare(b.dia))
  
  let totalFilteredExpenses = filteredExpenses.reduce((total, expense) => total + expense.valor, 0);
  let teste = totalFilteredExpenses.toFixed(2)
  console.log(typeof totalFilteredExpenses)
  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormControl>
          <InputLabel>Ano</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Mês</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {availableMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Total: {teste}</Typography>
      </Grid>
      {/* <Grid item xs={12}>
        <Typography variant="h6">Despesas do mês:</Typography>
        {expenses.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Dia</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.descricao}</TableCell>
                    <TableCell>{expense.categoria}</TableCell>
                    <TableCell>{expense.dia}</TableCell>
                    <TableCell>{expense.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Nenhuma despesa encontrada para o mês selecionado.</Typography>
        )}
        <Typography variant="h6">Total: {totalFilteredExpenses}</Typography>
      </Grid> */}
      <Grid item xs={12}>
  <Typography variant="h6">Despesas do mês:</Typography>
  {filteredExpenses.length > 0 ? (
    <TableContainer component={Paper}>
      <Table>
        {/* Cabeçalho da tabela */}
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        {/* Corpo da tabela */}
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.descricao}</TableCell>
              <TableCell>{expense.categoria}</TableCell>
              <TableCell>{expense.dia}</TableCell>
              <TableCell>{expense.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Nenhuma despesa encontrada para o mês selecionado.</Typography>
  )}
  <Typography variant="h6">Total: {totalFilteredExpenses}</Typography>
</Grid>
    </Grid>
  );
};

export default ExpensesList;

