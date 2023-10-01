import { fetchUser,getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import  Link  from 'next/link';
import Image from 'next/image';

async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding')

    // getActivity
    const activity = await getActivity(userInfo._id);

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section className="mt-10 flex flex-col gap-5" >
                {
                    activity.length > 0 ? (
                        <>
                            {
                                activity.map((activity) => (
                                    <Link key={activity._id} 
                                    href={`/thread/${activity.parentId}`} >
                                        
                                        <article className="activity-card">
                                            <div className="relative h-12 w-12">
                                            <Image
                                                src={activity?.author?.image}
                                                alt="Profile Picture"
                                                fill
                                                className="rounded-full object-cover cursor-pointer"
                                            />
                                            </div>

                                            <p className='!text-small-regular text-light-1'>
                                                <span className='mr-1 text-primary-500'>
                                                    {activity.author.name}
                                                </span>{" "}
                                                replied to your thread
                                            </p>
                                        </article>
                                    </Link> 
                                ))
                            }
                        </>
                    ) : 
                    <p className="!text-base-regular text-light-3" >No acivity yet</p>
                }
            </section>
        </section>
    )
}

export default Page;