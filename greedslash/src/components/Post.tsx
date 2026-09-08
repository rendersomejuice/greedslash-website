import '../App.css'

export interface PostData{
    id?:number;
    title:string;
    body:string;
    date:number;
}

function Post({PostData}:{PostData:PostData}){
    return(
        <div className="PostContainer">
            <h1 className="PostTitle">{PostData.title}</h1>
            <div className="PostBody" dangerouslySetInnerHTML={{ __html: PostData.body }}></div>
            <p className="PostDate">{new Date(PostData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    );
}

export default Post