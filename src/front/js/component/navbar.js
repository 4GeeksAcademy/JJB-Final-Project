import React from "react";
import logoNav from "../../img/logo_shespace_navbar.png";
import { Link, useNavigate  } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					<img 
						src={logoNav}
						alt="Logo" 
						width="30" 
						height="30" 
						className="d-inline-block align-text-top" 
					/>
					Bootstrap
				</Link>
			</div>
		</nav>
	);
};
