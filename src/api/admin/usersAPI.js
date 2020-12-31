import { axiosInstance } from '../axiosInstance.js'

export default {
  async getUsers() {
    let response = await axiosInstance.get(`/api/info/user/available`)
    var allUsers = []
    if (response.status !== 200) {
      console.log(response.data)
    } else {
      var users = response.data
      users = users.filter((el) => {
        return el.role === 'contestant'
      })
      users = users.sort((a, b) => {
        return a.score <= b.score
          ? a.score === b.score
            ? a.username > b.username
              ? 1
              : -1
            : 1
          : -1
      })
      var rank = 0
      users.forEach((el) => {
        rank++
        allUsers.push({
          rank: rank,
          username: el.username,
          email: el.email,
          score: el.score,
          status: el.status === 0 ? 'Active' : 'Banned',
        })
      })
    }
    return allUsers
  },

  async getUserByUsername(username) {
    var postData = new FormData()
    postData.append('username', username)
    return await axiosInstance({
      method: 'post',
      url: `/api/info/user`,
      data: postData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  async getUserStats() {
    return await axiosInstance.post(`/api/admin/statistics`)
  },

  async manageUser(userId, action) {
    return await axiosInstance({
      method: 'post',
      url: `/api/admin/users/${action}/${userId}`,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
