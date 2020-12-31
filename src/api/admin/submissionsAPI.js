import { axiosInstance } from '../axiosInstance.js'

export default {
  async getSubmissions() {
    return await axiosInstance.post(`/api/info/submissions`)
  },
  async getSubStats(tags, user) {
    let response=await this.getSubmissions();
    if (response.status !== 200) {
      return null
    } else {
      var submissions = {}
      var totalChal = 0
      tags.forEach((el) => {
        submissions[el.name] = 0
      })
      if (response.data !== null) {
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
      }
      return { totalChal: totalChal, category: submissions }
    }
  },

  async getUserSubs(username) {
    let response=await this.getSubmissions();
    if (response.status !== 200) {
      return null
    } else {
      var data = response.data
      if (data === null) {
        return
      }
      data = data.filter((el) => {
        return el.username === username
      })
      return data
    }
  },
}
