import React from "react";
import logoNav from "../../img/logo_shespace_navbar.png";
import { Link, useNavigate  } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
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
				<div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to={"/profile"}>Perfil</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={"/forums"}>Foros</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={"/"}>Publicidad</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link btn btn-danger" to={"/"}>Cerrar sesion</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
