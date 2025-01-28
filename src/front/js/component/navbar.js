import React, {useState, useEffect, useContext } from "react";
import logoNav from "../../img/logo_shespace_navbar.png";
import "../../styles/colors.css";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { Link, useLocation   } from "react-router-dom";
import Swal from 'sweetalert2'


export const Navbar = () => {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [tokenExists, setTokenExists] = useState(false);
	const { store, actions } = useContext(Context);
	const location = useLocation();

	useEffect(()=> {
		const token = actions.checkAcessToken();
		if(token) {
			setTokenExists(true) 
			const loadProfile = async () => {
				const resp = await actions.loadProfile();
				if (resp.error_access_token) {
					console.log("resp:", resp);
					navigate('/');
				}
			};
			loadProfile();
		}else {
			setTokenExists(false)
		}
	}, []);

	const handleToggle = () => {
		setMenuOpen(!MenuOpen);
	}

	const handleLogOut = () => {
		actions.logOut()
		Swal.fire({
			position: "top",
			icon: "info",
			title: "Se ha cerrado sesion correctamente",
			showConfirmButton: false,
			timer: 2000
		});
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary" >
			<div className="container-fluid px-5">
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
				{ tokenExists && (
				<>
					<button
					className="navbar-toggler"
					type="button"
					aria-expanded={MenuOpen} 
					onClick={handleToggle} 
					aria-label="Toggle navigation"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown" 
					>
						<span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
					</button>
					<div
					className={`collapse navbar-collapse d-flex justify-content-md-end ${MenuOpen ? 'show' : ''}`}
					id="navbarNavDropdown" 
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}  to={"/profile"}>Perfil</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link ${location.pathname === '/forums' ? 'active' : ''}`} to={"/forums"}>Foros</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link  ${location.pathname === '/advertising' ? 'active' : ''}`} to={"/advertising"}>Publicidad</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link btn rounded" to={"/"} onClick={handleLogOut}>Cerrar sesion</Link>
							</li>
						</ul>
					</div>
				</>
				)}
			</div>
		</nav>
	);
};
