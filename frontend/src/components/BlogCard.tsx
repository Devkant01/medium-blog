interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}

export const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div className="h-30 w-full  bg-slate-400" >
            <div className="py-8 px-10">
                <div>
                    {authorName} . {publishedDate}
                </div>
                <div className="text-xl font-semibold">
                    {title}
                </div>
                <div className="text-lg font-extralight">
                    {content.slice(0, 30) + "..."}
                </div>
                <div className="text-gray-500">
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
            </div>
            <div className="bg-slate-200 h-1 "></div>
        </div>
    )
}