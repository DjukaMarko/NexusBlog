import Authentication from '@/_components/Authentication';
import { truncateString } from '@/lib/utils';
import { serverClient } from './_trpc/serverClient';

export default async function Home() {
  const fetchedPosts = await serverClient.getBlogPosts();
  
  return (
    <div className="p-6">
      <p className="text-5xl sm:text-7xl font-bold mb-4">Welcome to Nexus - Where Innovation Connects</p>
      <Authentication />
      {fetchedPosts && fetchedPosts.map(post => (
        <a key={post.id} className='hover:underline flex flex-col space-y-1' href='#' target='_blank'>
          <p className='text-2xl'>{post.title}</p>
          <div className='flex space-x-2 items-center'>
            <p className='italic'>Author: {post.author.name}</p>
            <p className='italic'>{post.createdAt.toLocaleString()}</p>
          </div>
          <p className='text-lg'>{truncateString(post.content, 15)}</p>
        </a>
      ))}
    </div>
  );
}
