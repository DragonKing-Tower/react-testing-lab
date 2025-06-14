import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
	const [transactions, setTransactions] = useState([]);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("");
	// console.log(search)

	useEffect(() => {
		fetch("http://localhost:6001/transactions")
			.then((r) => r.json())
			.then((data) => setTransactions(data));
	}, []);

	function postTransaction(newTransaction) {
		fetch("http://localhost:6001/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTransaction),
		})
			.then((r) => r.json())
			.then((data) => setTransactions([...transactions, data]));
	}

	// Sort function here
	function onSort(type) {
		setSortBy(type);
	}

	// Filter using search here and pass new variable down
	const filteredTransactions = transactions.filter((transaction) => {
		return (
			transaction.description
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			transaction.category.toLowerCase().includes(search.toLowerCase())
		);
	});

	const sortedTransactions = [...filteredTransactions].sort((a, b) => {
		if (!sortBy) {
			return 0;
		}
		return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
	});

	return (
		<div>
			<Search setSearch={setSearch} />
			<AddTransactionForm postTransaction={postTransaction} />
			<Sort onSort={onSort} />
			<TransactionsList transactions={sortedTransactions} />
		</div>
	);
}

export default AccountContainer;
