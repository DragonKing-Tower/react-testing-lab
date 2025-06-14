import userEvent from "@testing-library/user-event";
import AccountContainer from "../../components/AccountContainer"; 
import { render,waitFor,screen } from "@testing-library/react";


test("filters transactions when search input changes", async () => {
	//define page for laoding and setup
	setFetchResponse({
		getResponse: [
			{
				id: 1,
				description: "Groceries",
				category: "Food",
				amount: 25,
				date: "2025-06-01",
			},
			{
				id: 2,
				description: "Salary",
				category: "Income",
				amount: 2000,
				date: "2025-06-02",
			},
		],
	});

	render(<AccountContainer />);

	// Wait for initial data to be visible
	await waitFor(() => {
		expect(screen.getByText("Groceries")).toBeInTheDocument();
		expect(screen.getByText("Salary")).toBeInTheDocument();
	});

	const searchInput = screen.getByPlaceholderText(
		"Search your Recent Transactions"
	);

	// Input user search
	await userEvent.type(searchInput, "sal");

	// Check Results
	await waitFor(() => {
		expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
		expect(screen.getByText("Salary")).toBeInTheDocument();
	});
})