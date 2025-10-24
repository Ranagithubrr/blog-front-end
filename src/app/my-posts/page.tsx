import CreatePost from '@/app/(blog)/posts/CreatePost'
import UsersPosts from '@/app/(blog)/posts/UsersPosts'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
    return (
        <ProtectedRoute>
            <div className='max-w-7xl mx-auto px-6'>
                <CreatePost />
                <UsersPosts />
            </div>
        </ProtectedRoute>
    )
}

export default page