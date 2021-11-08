import React, {useEffect, useRef, useState} from 'react';

const Post = () => {
    const [posts, setPosts] = useState([])
    const postRef = useRef();
    const loadPosts = async () => {
        const r = await fetch("https://new-worker.86naren.workers.dev/posts");
        setPosts(await r.json())
    }
    const createPost = async (title) => {
        const r = await fetch(
            "https://new-worker.86naren.workers.dev/posts",
            {method: "POST", body: JSON.stringify({title})});
        setPosts(await r.json())
    }
    useEffect(() => {
        (async () => {
            await loadPosts()
        })()
    }, [])

    const addPost = async () => {
        await createPost(postRef.current.value);
    }

    return (
        <div>
            <div>
                <h3>Add post</h3>
                <div>
                    <textarea cols="30" rows="10" ref={postRef}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Post</button>
                </div>
            </div>
            <div>
                <h3>Posts</h3>
                {posts.map((p, i) => {
                    return <div key={i}>
                        <div>{p.title}</div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Post;