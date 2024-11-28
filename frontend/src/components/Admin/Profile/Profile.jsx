import React from 'react'

const Profile = ({ profile }) => {
  return (
      <div className="mx-auto">
        <div className=" rounded-lg p-6 ">
          <div className="flex flex-col items-center">
            <img src={profile.profile} alt="Profile Picture" className="w-24 h-24 mb-5 rounded-full mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2">{profile.fullname}</h2>
              <p className="text-gray-500 mb-5">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile
