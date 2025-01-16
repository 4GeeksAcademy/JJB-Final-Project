const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userToken: "",
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			registerUser: async (email, password, nickname) => {

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/register`,{
						method: "POST",
						headers: { "Content-Type": "application/json", "accept": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password,
							nickname: nickname,
						})
					})

				const data = await resp.json();
				console.log("BACK Datos devueltos:", data);

				if (!resp.ok) {
					if (resp.status == 400) {
						console.error("BACK Error en la solicitud:", data.error);
						return { error: `${data.error}` };
					}
					return { error: `${data.msg}` }; 
				}

				return data;
					
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				} 
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			sendFormLogin: async (email, password) => {
				console.log("-----------sendFormLogIn----------------")
				try {
					const resp = await fetch(`https://ominous-guide-qx6r5p4w9vj36rv-3001.app.github.dev/api/login`,{
						method: "POST",
						body: JSON.stringify({
							email: email,
							password: password,
						}),
						headers: {
						  "Content-Type": "application/json",
						  "accept": "application/json"
						}
					});
					
					const data = await resp.json();
					console.log("BACK Datos devueltos:", data);

					if (!resp.ok) {
						if (resp.status == 400) {
							console.error("BACK Error en la solicitud:", data.error);
							return { error: `${data.error}` };
						}
						return { error: `${data.msg}` }; 
					}

			
					if (data.access_token) {
						setStore({ userToken: data.access_token });
						console.log("Token guardado en el store.");
					}
			
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},
		}
	};
};

export default getState;
