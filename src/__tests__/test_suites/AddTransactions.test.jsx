import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountContainer from "../../components/AccountContainer"; 


// Setup fetch mocks before each test
beforeEach(() => {
	setFetchResponse({
		getResponse: [
			{
				id: "1",
				date: "2006-06-06",
				description: "test description",
				category: "waste",
				amount: 99,
			},
		],
	});
});
  

test("allows user to add a transaction using POST", async () => {
	render(<AccountContainer />);

	const dateInput = screen.getByLabelText(/date/i);
	const descriptionInput = screen.getByPlaceholderText(/description/i);
	const categoryInput = screen.getByPlaceholderText(/category/i);
	const amountInput = screen.getByPlaceholderText(/amount/i);
	const submitBtn = screen.getByRole("button", { name: /add transaction/i });

	// Fill out form 
	await userEvent.clear(dateInput);
	await userEvent.type(dateInput, "2024-01-01");
	await userEvent.type(descriptionInput, "new description");
	await userEvent.type(categoryInput, "groceries");
	await userEvent.type(amountInput, "25");

	// Submit the form
	await userEvent.click(submitBtn);

	// Wait for new transaction to appear 
	expect(await screen.findByText(/new description/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
		expect.any(String),
		expect.objectContaining({ method: "POST" })
	);
});
