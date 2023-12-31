'use client'

import Image from 'next/image'
import {Button} from '../ui/button'

interface Props{
    id: string,
    name: string,
    username: string,
    imageUrl: string,
    personType: string
}
import {useRouter} from 'next/navigation'

const UserCard = ({
    id, name, username, imageUrl, personType
}: Props) => {

    const router = useRouter();
    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <div className='relative h-11 w-11'>
                    <Image
                        src={imageUrl}
                        alt="logo"
                        fill
                        className="rounded-full cursor-pointer object-cover"
                    />
                </div>
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-small-medium text-gray-1" >
                        @{username}
                    </p>
                </div>
            </div>

            <Button className="user-card_btn" onClick={()=> 
                router.push(`/profile/${id}`) }>
                View
            </Button>
        </article>
    )
} 

export default UserCard;