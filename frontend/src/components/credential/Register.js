import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'


const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const Register = () => {

	const [imageFiles, setImageFiles] = useState([]);
	const [images, setImages] = useState([]);
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [contact, setContact] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm_password, setConfirm_password] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();
    let navigate = useNavigate();

	const { isAuthenticated, error, loading } = useSelector(state => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
            navigate('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

	}, [dispatch, alert, isAuthenticated, error, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();

		if(confirm_password !== password){
          // console.log("fail")
          setPassword("");
          setConfirm_password("");
          alert.error("Password does not match!")

      }
      else {
      	console.log("success")
      	const formData = new FormData();
      	formData.set('fname', fname);
      	formData.set('lname', lname);
      	formData.set('contact', contact);
      	formData.set('email', email);
        formData.set('password', password);
        // formData.set('images', images);
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(register(formData))
      }
  	}

  	const changeHandler = e => {

        const files = Array.from(e.target.files)

        setImageFiles([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImageFiles(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

  	return (
	  	<Fragment>
		  	<MetaData title={'TUP-Taguig Online Library'} />
		  	<Header />
		  	<div className="register-container">
		  		<div className="register-items">
		  			<h3>REGISTER</h3><hr width="95%"/><br/>
		  			<form className="register-wrapper" onSubmit={submitHandler} encType='multipart/form-data'>
		  				<label for="name">NAME:</label>
		  				<input className="name-width" type="text" placeholder="Enter your First Name" id="fname_field" name="fname" value={fname} onChange={(e) => setFname(e.target.value)}/>
		  				<input className="name-width" type="text" placeholder="Enter your Last Name" id="lname_field" name="lname" value={lname} onChange={(e) => setLname(e.target.value)}/>
		  				<br/>
		  				<label for="contact">CONTACT NO.:</label>
					  	<input className="input-width" type="text" placeholder="Enter your Contact Number" id="contact_field" name="contact" value={contact} onChange={(e) => setContact(e.target.value)}/>
					  	<br/>
					  	<label for="email">EMAIL:</label>
					  	<input className="input-width" type="email" placeholder="Enter your Email Address" id="email_field" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					  	<br/>
					  	<label for="password">PASSWORD:</label>
					  	<input className="password-width" type="text" placeholder="Enter your Password" id="password_field" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					  	<input className="password-width" type="text" placeholder="Confirm Password" id="confirm_password_field" name="confirm_password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)}/>
					  	<br/>
					  	<label for="images">UPLOAD ID:</label>
					  	<input type="file" 
					  	id="id_picture" 
					  	name="id_picture" 
					  	multiple
					  	accept="image/*"
					  	onChange={changeHandler}
					  	/>
					  	{
					  		images.length > 0 ?
					  		<div className="preview_container">
					  		{
					  			images.map((image, idx) => {
					  				return  <p key={idx}> <img src={image} className="preview_images" alt="" /> </p>
					  			})
					  		}
					  		</div> : null
					  	}
		  				<div className="buttons">
		  					<button  id="login_button" type="submit" className="loginbtn">Register</button>
		  					<input type="reset" value="Clear Entries"/>
		  				</div>
		  			</form>
		  		</div>
		  		<br/>
		  		<div className="forgot">
				  	<span>Do you have an account?</span>
				  	<a href="/">Sign In Here</a>
		  		</div>
		  	</div>
		  	<Footer />
	  	</Fragment>
  	)
}
export default Register