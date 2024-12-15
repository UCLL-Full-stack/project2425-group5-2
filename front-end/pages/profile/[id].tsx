'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Layout from '@components/layout/Layout'
import ProfileOverview from '@components/profile/ProfileOverview'
import { User, Team } from '../../types'
import TeamService from '@services/TeamService'
import { Edit } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      const parsedUser = JSON.parse(user)
      setLoggedInUser(parsedUser)
    }
  }, [])

  useEffect(() => {
    if (loggedInUser) {
      getTeams()
    }
  }, [loggedInUser])

  const getTeams = async () => {
    try {
      let response
      if (loggedInUser?.role === 'admin') {
        response = await TeamService.getAllTeams()
      } else if (loggedInUser) {
        response = await TeamService.getTeamsByUserId(loggedInUser.id)
      }
      if (response) {
        const fetchedTeams = await response.json()
        setTeams(fetchedTeams)
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
    }
  }

  const editProfileRoute = () => {
    router.push(`/profile/edit/${loggedInUser?.id}`)
  }

  if (!loggedInUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold text-gray-600">Loading...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Profile - TeamTrack</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Profile Overview
            </h1>
            <button
              onClick={editProfileRoute}
              className="px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105 flex items-center"
            >
              <Edit size={24} className="mr-2" />
              Edit Profile
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ProfileOverview user={loggedInUser} teams={teams} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage

