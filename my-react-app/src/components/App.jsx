import React from "react";
import Card from "./Card";
import contacts from "./contact.js";
import Avatar from "./Avatar";

function createCard(contact) {
    return (
        <Card
            key={contact.id}
            name={contact.name}
            img={contact.imgURL}
            tel={contact.phone}
            email={contact.email}
        />
    );
}

function App() {
    return (
        <div>
            <h1 className="heading">My Contacts</h1>
            <Avatar img="https://media.licdn.com/dms/image/C4D03AQEbJfB8yK8w6Q/profile-displayphoto-shrink_800_800/0/1636460051304?e=2147483647&v=beta&t=hpsO-uqINPJwosC23pqZvjd4Fcc3ZBxvg6g2PC5hnGg" />

            {
                contacts.map(createCard)
            }

            {/* <Card
                name={contacts[0].name}
                img={contacts[0].imgURL}
                tel={contacts[0].phone}
                email={contacts[0].email}
            />
            <Card
                name={contacts[1].name}
                img={contacts[1].imgURL}
                tel={contacts[1].phone}
                email={contacts[1].email}
            />
            <Card
                name={contacts[2].name}
                img={contacts[2].imgURL}
                tel={contacts[2].phone}
                email={contacts[2].email}
            /> */}
        </div>
    );
}

export default App;
