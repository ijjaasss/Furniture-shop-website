import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
    const [userName, userNameChange] = useState(""); // Username state
    const [name, nameChange] = useState("");  // Full Name state
    const [password, passwordChange] = useState("");
    const [confirmPassword, confirmPasswordChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState(""); 
    const [contry, countryChange] = useState("");
    const [address, addressChange] = useState("");
    const [gender, genderChange] = useState("male");

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errormessage = 'Please enter the value in';

        // Username validation
        if (!userName) {
            isProceed = false;
            errormessage += ' User Name';
        }

        // Full Name validation
        if (!name) {
            isProceed = false;
            errormessage += ' Name';
        }

        // Password validation
        if (!password) {
            isProceed = false;
            errormessage += ' Password';
        }

        // Confirm Password validation
        if (!confirmPassword || confirmPassword !== password) {
            isProceed = false;
            errormessage += ' Passwords do not match';
        }

        // Email validation
        if (!email) {
            isProceed = false;
            errormessage += ' Email';
        }

        // Phone validation
        if (!phone) {
            isProceed = false;
            errormessage += ' Phone';
        }

        // Country validation
        if (!contry) {
            isProceed = false;
            errormessage += ' Country';
        }

        // Gender validation
        if (!gender) {
            isProceed = false;
            errormessage += ' Gender';
        }

        if (!isProceed) {
            toast.warning(errormessage);
        }

        return isProceed;
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (isValidate()) {
            try {
                const res = await axios.post(`/api/v1/auth/register`, {
                    userName,  // Send username in the request
                    name,      // Send full name in the request
                    email,
                    password,
                    address,
                    contry,
                    gender,
                    phone
                });

                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate('/login');
                } else {
                    toast.warning(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong, please try again later.');
            }
        }
    };

    return (
        <section className="vh-100 bg-image"
          style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                    <form onSubmit={handlesubmit}>
                                        {/* Username */}
                                        <div className="form-outline mb-4">
                                            <input type="text" 
                                                id="formUsername" 
                                                className="form-control form-control-lg"
                                                value={userName}  // Correctly linked to state
                                                onChange={(e) => userNameChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formUsername">Username</label>
                                        </div>

                                        {/* Full Name */}
                                        <div className="form-outline mb-4">
                                            <input type="text" 
                                                id="formFullName" 
                                                className="form-control form-control-lg"
                                                value={name}  // Correctly linked to state
                                                onChange={(e) => nameChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formFullName">Your Name</label>
                                        </div>

                                        {/* Email */}
                                        <div className="form-outline mb-4">
                                            <input type="email" 
                                                id="formEmail" 
                                                className="form-control form-control-lg"
                                                value={email} 
                                                onChange={(e) => emailChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formEmail">Your Email</label>
                                        </div>

                                        {/* Password */}
                                        <div className="form-outline mb-4">
                                            <input type="password" 
                                                id="formPassword" 
                                                className="form-control form-control-lg"
                                                value={password} 
                                                onChange={(e) => passwordChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formPassword">Password</label>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="form-outline mb-4">
                                            <input type="password" 
                                                id="formConfirmPassword" 
                                                className="form-control form-control-lg"
                                                value={confirmPassword} 
                                                onChange={(e) => confirmPasswordChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formConfirmPassword">Repeat your password</label>
                                        </div>

                                        {/* Phone */}
                                        <div className="form-outline mb-4">
                                            <input type="tel" 
                                                id="formPhone" 
                                                className="form-control form-control-lg"
                                                value={phone} 
                                                onChange={(e) => phoneChange(e.target.value)} 
                                                required
                                            />
                                            <label className="form-label" htmlFor="formPhone">Phone</label>
                                        </div>

                                        {/* Country */}
                                        <div className="form-outline mb-4">
                                            <select className="form-control form-control-lg"
                                                value={contry} 
                                                onChange={(e) => countryChange(e.target.value)}
                                                required>
                                                <option value="">Select Country...</option>
                                                <option value="india">India</option>
                                                <option value="usa">USA</option>
                                                <option value="singapore">Singapore</option>
                                            </select>
                                            <label className="form-label">Country</label>
                                        </div>

                                        {/* Address */}
                                        <div className="form-outline mb-4">
                                            <textarea 
                                                id="formAddress" 
                                                className="form-control form-control-lg"
                                                value={address} 
                                                onChange={(e) => addressChange(e.target.value)}
                                            ></textarea>
                                            <label className="form-label" htmlFor="formAddress">Address</label>
                                        </div>

                                        {/* Gender */}
                                        <div className="form-outline mb-4">
    <label className="form-label" htmlFor="gender">Gender</label>
    <div className="d-flex justify-content-start align-items-center">
        {/* Male Option with Icon */}
        <div className="form-check me-4">
            <input 
                className="form-check-input" 
                type="radio" 
                value="male" 
                checked={gender === 'male'} 
                onChange={(e) => genderChange(e.target.value)} 
                id="genderMale"
                required
            />
            <label className="form-check-label" htmlFor="genderMale">
                <i className="bi bi-gender-male" style={{ fontSize: '1.5rem' }}></i> Male
            </label>
        </div>

        {/* Female Option with Icon */}
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="radio" 
                value="female" 
                checked={gender === 'female'} 
                onChange={(e) => genderChange(e.target.value)} 
                id="genderFemale"
                required
            />
            <label className="form-check-label" htmlFor="genderFemale">
                <i className="bi bi-gender-female" style={{ fontSize: '1.5rem' }}></i> Female
            </label>
        </div>
    </div>
</div>
                                        {/* Terms and Conditions */}
                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" id="formTerms" required />
                                            <label className="form-check-label" htmlFor="formTerms">
                                                I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>

                                        {/* Register Button */}
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                                                Register
                                            </button>
                                        </div>

                                        {/* Already have an account */}
                                        <p className="text-center text-muted mt-5 mb-0">
                                            Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
