import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import loginImg from '../../assets/others/login.png'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {

    const { signIn } = useContext(AuthContext)

    const handelLogin = (event) => { // input alawy give me an event 
        event.preventDefault(); // stop page to reload
        const form = event.target; // take the value form input 
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                alert("Successfully Login ")
            })
    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            {/*degiui  */}

            <div >
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex md:flex">
                        <div className="text-center lg:text-left">
                            <img className="w-[700px]" src={loginImg} alt="" />
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <h1 className="text-2xl font-bold text-center mt-4">Login</h1>

                            <form onSubmit={handelLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>


                                <div className="form-control mt-6">
                                    {/* Make btn disable for captcha */}
                                    <input disabled={false} className="btn bg-[#D1A054]" type="submit" value="Login" />
                                </div>
                            </form>
                            <p className="p-4"><small>New Here? <Link className='text-blue-500' to="/signup">Create an account</Link></small></p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;