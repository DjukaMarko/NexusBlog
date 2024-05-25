import { handleForm } from "./actions/SendBlogAction"

export default function AddPost() {

    return (
        <form action={handleForm} className="mb-4">
            <input name="title" type="text" placeholder="Title" />
            <input name="content" type="text" placeholder="Content" />
            <button type="submit">Post</button>
        </form>
    )
}