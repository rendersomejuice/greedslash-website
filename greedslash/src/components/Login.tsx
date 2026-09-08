import {useState} from 'react'
import { useAuth } from '../components/AuthProvider';

function Login (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const HandleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Invalid credentials');
            }
            login();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className="LoginFormContainer">
            <form onSubmit={HandleSubmit}>
                <input type="text" placeholder="user" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login