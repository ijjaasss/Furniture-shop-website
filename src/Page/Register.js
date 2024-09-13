import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const Register = () => {
    const [userName,userNameChange]=useState("")
    const [name,nameChange]=useState("")
    const [password,passwordChange]=useState("")
    const [email,emailChange]=useState("")
    const [contry,contryChange]=useState("")
    const [address,addressChange]=useState("")
    const [gender,genderChange]=useState("male")
   const cart=[]
    const temp=[]
    const buy=[]
    const isBlock=false
   
    
    

    const navigate=useNavigate();
    const isValidate=()=>{
        let isProceed=true;
        let errormessage='pleas enter the value in';
        if(userName===null||userName===''){
            isProceed=false;
            errormessage+=' User name '
        }
        if(name===null||name===''){
            isProceed=false;
            errormessage+=' Name '
        }
        if(password===null||password===''){
            isProceed=false;
            errormessage+=' Password '
        }
        if(email===null||email===''){
            isProceed=false;
            errormessage+=' Email '
        }
        if(contry===null||contry===''){
            isProceed=false;
            errormessage+=' Contry '
        }
       
        if(gender===null||gender===''){
            isProceed=false;
            errormessage+=' Gender '
        }
        if(!isProceed){
            toast.warning(errormessage)
        }
        return isProceed;
    }
  
    const handlesubmit = (e) =>{
        
        e.preventDefault();
        
        let regobj={userName,name,password,email,contry,address,gender,temp,cart,buy,isBlock}
        if(isValidate()){
        // console.log(regobj);
        fetch("http://localhost:5001/users",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj)
        }).then((res)=>{
            toast.success('registerd succsesfully')
            navigate('/login');
        }).catch((err)=>{
            toast.error('Failed :');
        });
    }
        
    }
    return (  
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >User Name <span className="errmsg">*</span></label>
                                            <input  value={userName} onChange={e=>userNameChange(e.target.value)} className="form-control"></input>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Password <span className="errmsg">*</span></label>
                                            <input value={password} onChange={e=>passwordChange(e.target.value)} type="password" className="form-control"></input>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Full Name<span className="errmsg">*</span></label>
                                            <input value={name} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Email <span className="errmsg">*</span></label>
                                            <input value={email} onChange={e=>emailChange(e.target.value)} type="email" className="form-control"></input>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Country <span className="errmsg">*</span></label>
                                            <select value={contry} onChange={e=>contryChange(e.target.value)} className="form-control" >
                                            <option  >Options....</option>
                                                <option value='india' >India</option>
                                                <option value='usa'>Usa</option>
                                                <option value='singapore'>Singapore</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Address</label>
                                            <textarea value={address} onChange={e=>addressChange(e.target.value)} className="form-control"></textarea>
                                        
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label >Gender</label><br />
                                            <input type="radio" checked={gender==='male'} onChange={e=>genderChange(e.target.value)} value='male' name="gender" className="app-check"></input>
                                            <label >Male</label>
                                            <input type="radio" checked={gender==='female'} onChange={e=>genderChange(e.target.value)} value='female' name="gender" className="app-check"></input>
                                            <label >Female</label>
                                        </div>

                                    </div>
                                    
                                   
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <a className="btn btn-danger" href="/login">Back</a>
                        </div>
                    </div>

                </form>

            </div>
           
        </div>
    );
}
 
export default Register;