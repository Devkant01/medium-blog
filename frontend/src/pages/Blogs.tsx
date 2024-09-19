import { BlogCard } from "../components/BlogCard"
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div>
            <Appbar />
            {blogs && blogs.map((blog:any) =>
                <BlogCard authorName={blog.authorId} title={blog.title} content={blog.content} publishedDate={blog.publishedDate} />
            )}
            <BlogCard authorName="Devkant" title="This is sample tittle" content="Content regarding the sample title. It should be more than 100 words so that user can easily explain it's thoughts" publishedDate="16th sep, 2024" />

        </div>
    )
}