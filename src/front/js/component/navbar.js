import React from "react";
import logoNav from "../../img/logo_shespace_navbar.png";
import "../../styles/colors.css";
import "../../styles/navbar.css";
import { Link, useLocation   } from "react-router-dom";


export const Navbar = () => {

	const location = useLocation();

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary" >
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"} >
					<img 
						src={logoNav}
						alt="Logo" 
						width="30" 
						height="30" 
						className="d-inline-block align-text-top me-2" 
					/>
					SheSpace
				</Link>
				<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse d-flex justify-content-md-end " id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to={"/profile"}>Perfil</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname === '/forums' ? 'active' : ''}`} to={"/forums"}>Foros</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to={"/"}>Publicidad</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname === '/' ? 'active': ''}`} to={"/"}>Cerrar sesion</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
