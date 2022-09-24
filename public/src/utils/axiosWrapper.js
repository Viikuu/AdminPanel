export function axiosWrapper(response, navigate) {
	if (response.data.message !== 'Unauthorized'){
		return response;
	} else {
		navigate('/login');
	}
}