const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userToken: "",
			profile: {}, 
			forums : []
		},

		actions: {

			loadProfile: async (email) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/profile/${email}`);
					const data = await response.json();
					console.log(data);
					setStore({ profile: data});
					return data.profile;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},

			loadForums: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/forum`);
					const data = await resp.json();
					console.log(data);
					if (!resp.ok) {
						return { error: `${data.error}` }; 
					}
					setStore({ forums: data});
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
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

				return { data: `${data}`,status:`${resp.ok}` }; 
					
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
					const resp = await fetch(`${process.env.BACKEND_URL}api/login`,{
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
							return { error: `${data.error}`, status: `${resp.status}` };
						}
						return { error: `${data.msg}`, status: `${resp.status}` }; 
					}

			
					if (data.access_token) {
						setStore({ userToken: data.access_token, profile: {email: email}});
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
