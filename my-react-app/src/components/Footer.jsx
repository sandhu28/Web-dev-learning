import React from "react";

const currDate = new Date();
const year = currDate.getFullYear();

function Footer() {
    return <footer>
        <p>CopyRight © {year}</p>
    </footer>
};

export default Footer;