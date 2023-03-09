import React, { Fragment } from 'react'

const Header = () => {
	return (
		<Fragment>
			<nav>
				<ul className='navigation-wrapper'>
					<li className="nav-header">
						<img src="../images/TUPT-Logo.png"
							alt="Technological University of the Philippines Taguig Logo" width="55" height="55" />
						<a href="#">
							Technological University of the Philippines - Taguig - LRC
						</a>
					</li>
				</ul>
			</nav>
		</Fragment>
	)
}
export default Header