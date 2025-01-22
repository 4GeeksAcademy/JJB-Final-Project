const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userToken: "",
			profile: {}, 
			forums : []
		},

		actions: {

			loadProfile: async () => {
				console.log("-----------loadProfile----------------")
				try {
					const token = sessionStorage.getItem("accessToken");
					if (!token) {
						console.error("No hay token disponible");
						return { error: "No autorizado" };
					}
					const response = await fetch(`${process.env.BACKEND_URL}api/profile`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`, 
							"Content-Type": "application/json"
						}
					});
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


					sessionStorage.setItem("accessToken", data.access_token);
					console.log("Token guardado en el localStore.");
			
					return { data: data, ok: true };
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},
			sendFormForum: async (forumName, forumContent) => {
				console.log("-----------sendFormForum----------------")
				try {
					console.log("id_user", getStore().profile.id_user)
					const resp = await fetch(`${process.env.BACKEND_URL}api/forum`,{
						method: "POST",
						body: JSON.stringify({
							title: forumName,
							content: forumContent,
							id_user: getStore().profile.id_user
						}),
						headers: {
						  "Content-Type": "application/json",
						  "accept": "application/json"
						}
					});
					const data = await resp.json();
					if (!resp.ok) {
						return { error: `${data.error}`}; 
					}
					console.log("BACK Datos devueltos:", data);
					setStore({ forums: [...getStore().forums, data.forum]});
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},
			logOut: () => {
				console.log("-----------logOut----------------")
				sessionStorage.removeItem('accessToken');
				console.log("Token eliminado del almacenamiento local");
			},
		}
	};
};

export default getState;
