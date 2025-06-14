import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import fetch from 'node-fetch';

  
global.setFetchResponse = ({ getResponse = [] } = {}) => {
	global.fetch = vi.fn(async (url, options = {}) => {
		const method = options.method || "GET";

		if (method === "POST") {
			// Parse POST body JSON string into an object
			const body = options.body ? JSON.parse(options.body) : {};

			// Return the POSTed data back with a fake id added
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () =>
					Promise.resolve({
						id: Math.floor(Math.random() * 10000).toString(),
						...body,
					}),
			});
		}

		// GET requests return static getResponse array
		return Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve(getResponse),
		});
	});
};
  

afterEach(() => {
    cleanup();
    vi.resetAllMocks();
})