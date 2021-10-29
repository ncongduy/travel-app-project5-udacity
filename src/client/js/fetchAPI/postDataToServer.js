// async function POST data to server
async function postDataToServer(data, localServer) {
	try {
		const postDataToServer = await fetch(localServer, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data),
		});

		return localServer;
	} catch (error) {
		console.log(':::error connection:::', error);
		return localServer;
	}
}

export { postDataToServer };
