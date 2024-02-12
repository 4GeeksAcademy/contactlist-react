import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import "../../styles/demo.css";
import { ContactCard } from "../component/ContactCard";

export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		async function loadContact() {
			await actions.getContacts()
			// await window.location.reload(false);
		}
		loadContact()
	}, [])
	return (
		<div className="p-5">
			<h1 className="display-1 text-center p-5">Take a look at your contacts</h1>
			{store.contact.map((contact) => {
				return (
					<div key={contact.id} >
						<ContactCard name={contact.full_name} email={contact.email} phone={contact.phone} address={contact.address} id={contact.id} />
					</div>
				)
			})}
		</div>
	)
};
