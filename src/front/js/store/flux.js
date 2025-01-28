const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userToken: "",
			profile: {}, 
			forums : [],
			advertising : [],
			
			forumDetails: {},
		},

		actions: {
			// FUNCIONES TOKEN
			checkAcessToken: () => {
				console.log("-----------checkAcessToken----------------")
				const token = sessionStorage.getItem("accessToken");
				if (!token) {
					console.error("No hay token disponible");
					return null;
				}
				return token;
			},
			logOut: () => {
				console.log("-----------logOut----------------")
				sessionStorage.removeItem('accessToken');
				console.log("Token eliminado del almacenamiento local");
			},

			loadProfile: async () => {
				console.log("-----------loadProfile----------------")
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error_access_token: "No autorizado" };
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
				console.log("-----------loadForums----------------")
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error_access_token: "No autorizado" };
					}
					const resp = await fetch(`${process.env.BACKEND_URL}api/forum`,{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"accept": "application/json",
						  	"Authorization": `Bearer ${token}`, 
							"Content-Type": "application/json"
						}
					});
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

			loadAdvertising: async () => {
				console.log("-----------loadAdvertising----------------")
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error_access_token: "No autorizado" };
					}
					const resp = await fetch(`${process.env.BACKEND_URL}api/advertising`,{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"accept": "application/json",
						  	"Authorization": `Bearer ${token}`, 
							"Content-Type": "application/json"
						}
					});
					const data = await resp.json();
					console.log(data);
					if (!resp.ok) {
						return { error: `${data.error}` }; 
					}
					setStore({ advertising: data});
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},
			
			registerUser: async (email, password, nickname, checkbox) => {
				console.log("-----------registerUser----------------")
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/register`,{
						method: "POST",
						headers: { "Content-Type": "application/json", "accept": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password,
							nickname: nickname,
							es_mayor:checkbox
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
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
					console.log("id_user", getStore().profile.id_user);
					const resp = await fetch(`${process.env.BACKEND_URL}api/forum`,{
						method: "POST",
						body: JSON.stringify({
							title: forumName,
							content: forumContent
						}),
						headers: {
						  "Content-Type": "application/json",
						  "accept": "application/json",
						  "Authorization": `Bearer ${token}`, 
						  "Content-Type": "application/json"
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

			sendFormAdvertising: async (advertisingName, advertisingContent) => {
				console.log("-----------sendFormAdvertising----------------")
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
					console.log("id_user", getStore().profile.id_user);
					const resp = await fetch(`${process.env.BACKEND_URL}api/advertising`,{
						method: "POST",
						body: JSON.stringify({
							title: advertisingName,
							content: advertisingContent
						}),
						headers: {
						  "Content-Type": "application/json",
						  "accept": "application/json",
						  "Authorization": `Bearer ${token}`, 
						  "Content-Type": "application/json"
						}
					});
					const data = await resp.json();
					if (!resp.ok) {
						return { error: `${data.error}`}; 
					}
					console.log("BACK Datos devueltos:", data);
					setStore({ advertising: [...getStore().advertising, data.advertising]});
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},

			loadForumDetails: async (forum_title) => {
				console.log("-----------loadForumDetails----------------")
                try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
                    const response = await fetch(`${process.env.BACKEND_URL}api/forum/${forum_title}`,{
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`, 
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
                    if (!response.ok) {return { error: `${data.error}`}; }
					setStore({ forumDetails: data });
                    return data; 
                } catch (error) {
                    console.error("Error cargando los detalles del foro:", error);
					return { error: error.message };
                }
            },

            addCommentToForum: async (id_forum, content) => {
				console.log("-----------addCommentToForum----------------")
                try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
                    const response = await fetch(`${process.env.BACKEND_URL}api/comment`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
						body: JSON.stringify({
							id_forum: id_forum,
							content: content,
						}),
                    });
					const data = await response.json();
                    if (!response.ok) {return { error: `${data.error}`}; }
                    return data;
                } catch (error) {
                    console.error("Error al agregar el comentario:", error);
                    return { error: error.message };
                }
            },
            updateComment: async (id_comment, content, forum) => {
				console.log("-----------updateComment----------------")
				console.log("id_comment", id_comment, "content", content, "forum",  forum)
                try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
                    const response = await fetch(`${process.env.BACKEND_URL}api/comment`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
						body: JSON.stringify({
							comment_index: id_comment,
							id_forum: forum,
							content: content,
						}),
                    });
					const data = await response.json();
					console.log("data", data)

                    if (!response.ok) {return { error: `${data.error}`}; }

					const new_comment = data.new_comment;
					console.log("new_comment", new_comment)

					const store = getStore();
					const actualComments = store.forumDetails.comments;
					
					const index = actualComments.findIndex(comment => comment.id_comment === new_comment.id_comment);

					if (index !== -1) {
						actualComments[index] = new_comment;
					
						setStore({
							forumDetails: {
								...store.forumDetails,
								comments: actualComments,
							},
						});
					}
                    return data;
                } catch (error) {
                    console.error("Error al agregar el comentario:", error);
                    return { error: error.message };
                }
            },
			deleteComment: async (id_comment) => {
				console.log("-----------deleteComment----------------")
				console.log("id_comment", id_comment)
                try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
                    const response = await fetch(`${process.env.BACKEND_URL}api/comment`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
						body: JSON.stringify({
							comment_index: id_comment
						}),
                    });
					const data = await response.json();
					console.log("data", data)

                    if (!response.ok) {return { error: `${data.error}`}; }

					const store = getStore();

					
					const updatedComments = store.forumDetails.comments.filter(
						(comment) => comment.id_comment !== id_comment
					);
			
					// Actualizar el store
					setStore({
						forumDetails: {
							...store.forumDetails,
							comments: updatedComments,
						},
					});
                    return data;
                } catch (error) {
                    console.error("Error al agregar el comentario:", error);
                    return { error: error.message };
                }
            },
			
		}
	};
};




export default getState;
