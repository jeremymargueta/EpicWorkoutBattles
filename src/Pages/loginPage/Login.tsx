import React from 'react';
import './LoginStyles.css';

const Login: React.FC = () => {
    return(
        <div className='login'>
            <h1 className='h1'> Epic Workout Battles</h1>
             <div className='container'>
                <form>
                <div>
                    <h2>Username</h2>
                    <input className='input'></input>
                </div>
                

                <h2>Password</h2>
                <div>
                    <input className='input'></input>
                </div>
                

                <button type='submit'>Login</button>
                <input type="button" id='register' value="register"></input>
                </form>
            </div>
        </div>
       
    )
}

export default Login;