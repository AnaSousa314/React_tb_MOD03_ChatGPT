import { Card, CardContent, Typography } from '@material-ui/core';
import { Expense } from '../../types/types';

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3">
          {expense.descricao}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {expense.categoria}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Date: {expense.dia}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Amount: {expense.valor.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExpenseItem;
