import React, { Fragment } from 'react'

const Header = () => {
	return (
		<Fragment>
			<nav className="nav-header">
				<div className="nav_header-link">
					<img src="../images/TUPT-Logo.png"
					alt="Technological University of the Philippines Taguig Logo" width="55" height="55">
					</img>
					<h4 className="header">Technological University of the Philippines - Taguig Campus
						<br></br>
						<span>Learning Resource Center</span>
					</h4>
				</div>
			</nav>
		</Fragment>
	)
}
export default Header