import '../App.css'

export interface PostData{
    Title:string;
    Body:string;
    Date:number;
}

function Post({PostData}:{PostData:PostData}){
    return(
        <div className="PostContainer">
            <h1 className="PostTitle">{PostData.Title}</h1>
            <div className="PostBody" dangerouslySetInnerHTML={{ __html: PostData.Body }}></div>
            <p className="PostDate">{new Date(PostData.Date).toISOString()}</p>
        </div>
    );
}

export default Post