import { useStore } from '@/stores/store'

export async function fetchUserProfile() {
  const store = useStore()
  const id = store.decodedToken().user_id
  if (id) {
    await fetch(`${import.meta.env.VITE_URL_API_PROFILE}/${id}`)
      .then((response) => {
        if (response.ok == true) {
          return response.json()
        }
      })
      .then((data) => {
        const userProfile = {
          username: data.user.username,
          bio: data.user.bio,
          email: data.user.email,
          id: data.user.id_user,
        }
        store.insertDataProfile(userProfile)
    
      })
  }
}
