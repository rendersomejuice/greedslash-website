import {useState} from 'react'

const serverURL = 'http://localhost:3000'

interface LoginProps {
    onLoginSuccess: () => void; 
}

function Login ({ onLoginSuccess }: (LoginProps)){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${serverURL}/api/login`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Invalid credentials');
            }
            onLoginSuccess();
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