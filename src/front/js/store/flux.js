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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
			sendFormLogIn: async (email, password) => {
				//Falta probar funcionalidad
				console.log("-----------sendFormLogIn----------------")
				fetch(`https://ominous-guide-qx6r5p4w9vj36rv-3001.app.github.dev/login`, {
					method: "POST",
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					headers: {
					  "Content-Type": "application/json",
					  "accept": "application/json"
					}
				  })
				  .then(resp => {
					  console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
					  console.log("Data:", resp);
					  console.log("login realizado ");
					  return resp;
				  })
				  .catch(error => {
					  console.log(error);
				  });
			},
			addContact: (contact) => {
				console.log("-----------addContact----------------")
				console.log("contact", contact)
				fetch(`https://playground.4geeks.com/contact/agendas/bdiaz/contacts`, {
					method: "POST",
					body: JSON.stringify({
						name: contact.name,
						phone: contact.phone,
						email: contact.email,
						address: contact.address
					}),
					headers: {
					  "Content-Type": "application/json",
					  "accept": "application/json"
					}
				  })
				  .then(resp => {
					  console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
					  console.log("Data:", resp);
					  console.log("Contacto agregado");
					  getActions().getAgenda()
					  return resp;
				  })
				  .catch(error => {
					  console.log(error);
				  });
			
			},
		}
	};
};

export default getState;
