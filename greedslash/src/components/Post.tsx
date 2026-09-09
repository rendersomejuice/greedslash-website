import '../App.css'
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../components/AuthProvider';

export interface PostData{
    id?:number;
    title:string;
    body:string;
    date:number;
}

interface PostProps{
    PostData: PostData;
    isDeletable: boolean;
    onPostDeleted?: (id: number) => void;
}

function Post({PostData, onPostDeleted, isDeletable} : PostProps){
    const { isLoggedIn } = useAuth();

    const DeletePost = async (id:number) =>{
        try{
            const response = await fetch(`/api/delete`,{
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({id}),
                credentials: 'include'
            });
            if(!response.ok){ throw new Error('Error deleting post'); }
            const res = await response.json();
            console.log('Server response:', res);
            onPostDeleted?.(id);
        }catch(error){
            console.error('error deleting post');
        }
    }

    return(
        <div className="PostContainer">
            <h1 className="PostTitle">{PostData.title}</h1>
            <div className="PostBody" dangerouslySetInnerHTML={{ __html: PostData.body }}></div>
            <p className="PostDate">{new Date(PostData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            { isLoggedIn && isDeletable && (<button style={{all: 'unset', cursor: 'pointer', color : '#ab1515'}} onClick={ () =>{if(PostData.id !== undefined) {DeletePost(PostData.id)}}}><FaTrash size="30px"></FaTrash></button>)}
        </div>
    );
}

export default Post