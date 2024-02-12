const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			contact: [],
			idStore: null,
		},
		actions: {
			createContact: async (name, email, address, phone) => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							full_name: name,
							email: email,
							agenda_slug: "leilanta",
							address: address,
							phone: phone,
						})
					});
					
					if (!response.ok) {
						throw new Error('Failed to create contact');
					}
					
					const data = await response.json();
					
					setStore((prevState) => {
						const updatedContacts = [...prevState.contact, data];
						return { contact: updatedContacts };
					});
				} catch (error) {
					console.error('Error creating contact:', error);
				}
			},
			
			getContacts: async () => {
				const store = getStore()
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/leilanta")
				const data = await response.json()
				console.log(data, "this is getContact data");
				setStore({ contact: data })
				console.log(store.contact, "this is store data")
			},
			manageForm: (name, email, phone, address, id) => {
				setStore({
					stage: {
						full_name: "",
						email: "",
						address: "",
						phone: "",
					}
				});
			},

			updateContact: async (name, email, address, phone, id) => {
				const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							full_name: name,
							email: email,
							agenda_slug: "leilanta",
							address: address,
							phone: phone,
						})
				})
				const data = await response.json()
			},

			selectContactID: (contact_id) => {
				setStore({
					idStore: contact_id,
				})
			},

			updateContactAttribute: (contactId, attribute, value) => {
				const store = getStore()
				const updatedContact = store.contact.map((contact) => {
					if (contact.id === contactId) {
						return {
							...contact,
							[attribute]: value,
						}
					}
					return contact;
				})
				setStore(
					{ contact: updatedContact }
				)

			},

			updateFinal: () => {
				method: "PUT"
				body: JSON.stringify(
					{
						full_name: value,
						email: email,
						agenda_slug: "leilanta",
						address: address,
						phone: phone,
					})
			},

			deleteContact: async (id) => {
				const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
				const data = await response.json()
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
			}
		}
	};
};

export default getState;