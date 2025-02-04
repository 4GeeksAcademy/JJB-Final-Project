const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userToken: "",
			profile: {}, 
			forums : [],
			advertising : [],
			forumDetails: {},
			invoices:[]
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

			updateForum: async (id_forum, forumData) => {
				console.log("-----------updateForum----------------");
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
			
					const resp = await fetch(`${process.env.BACKEND_URL}/api/forum/${id_forum}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify(forumData)
					});
			
					const data = await resp.json();
			
					if (!resp.ok) {
						console.error("Error al actualizar el foro:", data.error);
						return { error: `${data.error}` }; // Retorna el mensaje de error.
					}
			
					// Actualiza el estado global del foro modificado.
					const store = getStore();
					const updatedForums = store.forums.map(forum => 
						forum.id_forum === id_forum ? data : forum
						
					);
					setStore({ forums: updatedForums });
			
					console.log("Foro actualizado exitosamente:", data);
					return data;
				} catch (error) {
					console.error("Error en fetch:", error);
					return { error: error.message };
				}
			},
			
			deleteForum: async (id_forum) => {
				console.log("-----------deleteForum----------------");
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
			
					const resp = await fetch(`${process.env.BACKEND_URL}/api/forum/${id_forum}`, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${token}`
						}
					});
			
					const data = await resp.json();
			
					if (!resp.ok) {
						console.error("Error al eliminar el foro:", data.error);
						return { error: `${data.error}` }; // Retorna el mensaje de error.
					}
			
					// Elimina el foro del estado global.
					const store = getStore();
					const updatedForums = store.forums.filter(forum => forum.id_forum !== Number(id_forum));
					setStore({ forums: updatedForums });
			
					console.log("Foro eliminado exitosamente:", data.message);
					return { success: true };
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

			sendFormAdvertising: async (advertisingName, advertisingContent, image ) => {
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
							content: advertisingContent,
							image_url: image
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
					console.log("data", data)
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

			addCommentToComment: async (id_forum, content, replyTo) => {
				console.log("-----------addCommentToComment----------------")
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
							parent_id: replyTo,
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

			addCommentToComment: async (id_forum, content, replyTo) => {
				console.log("-----------addCommentToComment----------------")
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
							parent_id: replyTo,
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

			deleteAdvertising: async (id_advertising) => {
				console.log("-----------deleteAdvertising----------------");
				console.log("id_advertising", id_advertising);
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
					const response = await fetch(`${process.env.BACKEND_URL}/api/advertising`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify({
							id_advertising: id_advertising,
						}),
					});
					const data = await response.json();
					console.log("data", data);
			
					if (!response.ok) {
						return { error: `${data.error}` };
					}
			
					const store = getStore();
			
					const updatedAdvertising = store.advertising.filter(
						(advertising) => advertising.id_advertising !== id_advertising
					);
			
					// Actualizar el store
					setStore({
						advertising: updatedAdvertising,
					});
					return data;
				} catch (error) {
					console.error("Error al eliminar la publicidad:", error);
					return { error: error.message };
				}
			},

			updateAdvertising: async (id_advertising, title, content) => {
				console.log("-----------updateAdvertising----------------");
				console.log("id_advertising", id_advertising, "title", title, "content", content);
			
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error: "No autorizado" };
					}
			
					const response = await fetch(`${process.env.BACKEND_URL}api/advertising`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify({
							id_advertising: id_advertising,
							title: title,
							content: content,
						}),
					});
			
					const data = await response.json();
					console.log("data", data);
			
					if (!response.ok) {
						return { error: data.error || "Error desconocido" };
					}
			
					const new_advertising = data.new_advertising;
					console.log("new_advertising", new_advertising);
			
					const store = getStore();
					const actualAdvertising = store.advertising;
			
					const index = actualAdvertising.findIndex(
						(ad) => ad.id_advertising === new_advertising.id_advertising
					);
			
					if (index !== -1) {
						actualAdvertising[index] = new_advertising;
			
						setStore({
							advertising: actualAdvertising,
						});
					}
			
					return data;
				} catch (error) {
					console.error("Error al actualizar la publicidad:", error);
					return { error: error.message };
				}
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

			loadInvoices: async () => {
				console.log("-----------loadInvoices----------------")
				try {
					const token = getActions().checkAcessToken();
					if (token === null) {
						return { error_access_token: "No autorizado" };
					}
					const resp = await fetch(`${process.env.BACKEND_URL}api/invoices`,{
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
					setStore({ invoices: data});
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
