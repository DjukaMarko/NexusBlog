import Authentication from '@/_components/Authentication';
import { formatDate } from '@/lib/utils';
import { serverCaller } from '@/server';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Nexus Blog',
  icons: {
    icon: '#',
  }
}

export default async function Home() {
  const fetchedPosts = await serverCaller.getBlogPosts();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className='w-full flex flex-col justify-center items-center border-b-[1px] border-black p-8'>
        <p className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 text-center">Welcome to Nexus - Where Innovation Connects</p>
        <div className='flex items-center space-x-2'>
          <Authentication />
          {/*<AddPost />*/}
        </div>
      </div>
      <div className='flex flex-col space-y-4 sm:border-x-[1px] p-6 border-black'>
        {fetchedPosts && fetchedPosts.map(post => (
          <a key={post.id} className='hover:underline flex flex-col space-y-1' href='#' target='_blank'>
            <p className='text-2xl'>{post.title}</p>
            <div className='flex space-x-2 items-center text-sm'>
              <p className='italic'>{post.author.name}</p>
              <p className='italic'>{formatDate(post.createdAt.toString())}</p>
            </div>
          </a>
        ))}
      </div>
      <div className='w-full p-8 flex justify-center items-center border-t-[1px] border-black'>
        <div className='italic'>
          Powered by <a href="https://www.github.com/DjukaMarko" className='underline font-bold' target='_blank'>Djuka</a>
        </div>
      </div>
    </div>
  );
}
