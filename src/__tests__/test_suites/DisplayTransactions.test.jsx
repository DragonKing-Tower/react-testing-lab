import { render,screen } from "@testing-library/react";
import App from "../../components/App";


test("displays transactions on opening app",async ()=> {
    setFetchResponse({
		postResponse: {}, 
		getResponse: [
			{
				id: "1",
				date: "2019-12-01",
				description: "test description",
				category: "Income",
				amount: 1000,
			},
		],
	});
      
    
    render(<App/>)

    expect(await screen.findByText("test description")).toBeInTheDocument()
})