import { axiosInstance } from '../axiosInstance.js'

export default {
  async getSubStats(tags, user) {
    let response = await axiosInstance.post(`/api/info/submissions`)
    if (response.status !== 200) {
      return null
    } else {
      var submissions = {}
      var totalChal = 0
      tags.forEach((el) => {
        submissions[el.name] = 0
      })
      var subs
      if (user === null) {
        subs = response.data
      } else {
        subs = response.data.filter((el) => {
          return el.username === user
        })
      }
      subs.forEach((el) => {
        submissions[el.category]++
        totalChal++
      })
      return { totalChal: totalChal, category: submissions }
    }
  },

  async getUserSubs(username) {
    let response = await axiosInstance.post(`/api/info/submissions`)
    if (response.status !== 200) {
      return null
    } else {
      var data = response.data
      data = data.filter((el) => {
        return el.username === username
      })
      return data;
    }
  },
}
