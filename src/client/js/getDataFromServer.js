// async function GET data from server.js
async function getDataFromServer(localServer) {
	try {
		const fetchData = await fetch(localServer);
		const dataResponse = await fetchData.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

export { getDataFromServer };
