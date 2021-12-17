import { useState } from 'react';

const useHttp = () => {

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
		setIsLoading(true);
		const response = await fetch(url, { method, body, headers });
		if (!response.ok) {
			console.log('something is wrong with the fetch request');
		};

		const responseData = await response.json();
		return responseData;
	};


	const clearError = () => {
		setError(null);
	};

	return { error, isLoading, sendRequest, clearError }

}

export default useHttp
