import React, { Fragment } from 'react'

const Footer = () => {

	return (
		<Fragment>
			<footer>
				<div className="footer-wrapper">
					<div className="contact-us">
						<h3>Contact Us</h3>
						<p>
							<i className="fa-solid fa-location-dot"></i>
							<span>Km 14 East Service Road, Western Bicutan Taguig City</span>
						</p>
						<p>
							<i className="fa-solid fa-phone"></i>
							<span>(+632) 823-2456(7)</span>
						</p>
						<p>
							<i className="fa-solid fa-envelope"></i>
							<span>lrc.tup@tup.edu.ph</span>
						</p>
					</div>
					<div className="service-hours">
						<h3>Service Hours</h3>
						<p>
							<i className="fa-regular fa-clock"></i>
							<span>7:00 AM - 7:00 PM - (On Weekdays) </span>
						</p>
						<p>
							<i className="fa-regular fa-clock"></i>
							<span>8:00 AM - 5:00 PM - (Vacation period)</span>
						</p>
						<span>Closed on Weekends, Special or Legal Holidays and calamity time.</span>
					</div>
					<div className="quick-links">
						<h3>Quick Links</h3>
						<div>
							<a href="#">FAQ</a>
							<a href="#">Download Mobile</a>
							<a href="#">Sign in</a>
							<a href="#">Our team</a>
						</div>
						<div>
							<a href=" #">Learning Resource Center</a>
							<a href="#">Learning Areas</a>
							<a href="#">Learning Services</a>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					Copyright © 2023, Technological University of the Philippines - Taguig. All rights reserved.
				</div>
			</footer>
		</Fragment>
	)
}
export default Footer