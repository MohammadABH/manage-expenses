const getExpensesTotal = (expenses) => {
	let totalCost = 0;
	expenses.forEach(expense => {
		totalCost += expense.amount;
	})
	return totalCost;
};

export default getExpensesTotal;