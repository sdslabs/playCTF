import { axiosInstance } from '../axiosInstance.js'

export default {
  async getChalCategory(tags) {
    let response = await axiosInstance.post(`/api/info/available`)
    if (response.status !== 200) {
      return null
    } else {
      var submissionsCategory = {}
      tags.forEach((tag) => {
        var challenges = response.data.filter((el) => {
          return el.Category === tag.name
        })
        var totalChallenges = challenges.length
        var userSolves = []
        challenges.forEach((el) => {
          if (el.Solves !== null) {
            el.Solves.forEach((solve) => {
              if (
                userSolves.findIndex((el) => {
                  el.username === solve.username
                }) === -1
              ) {
                userSolves.push({
                  username: solve.username,
                  solves: 1,
                })
              } else {
                userSolves[
                  userSolves.findIndex((el) => {
                    el.username === solve.username
                  })
                ].solves++
              }
            })
          }
        })
        userSolves = userSolves.sort((a, b) => {
          return a.solves < b.solves ? 1 : -1
        })
        submissionsCategory[tag.name] = {}
        submissionsCategory[tag.name].solves = userSolves
        submissionsCategory[tag.name].total = totalChallenges
      })
      return submissionsCategory
    }
  },
  async getChalStats() {
    let response = await axiosInstance.post(`/api/info/available`)
    if (response.status !== 200) {
      return null
    } else {
      var deployedChal = 0
      var undeployedChal = 0
      var purgedChal = 0
      var maxSolves = 0
      var leastSolves = 1000000000000000
      var leastSolvedChal = {name:"-",solves:"-"}
      var maxSolvedChal = {name:"-",solves:"-"}
      response.data.forEach((el) => {
        switch (el.Status) {
          case 'Deployed':
            deployedChal++
            break
          case 'Undeployed':
            undeployedChal++
            break
          case 'Purged':
            purgedChal++
        }
        if (el.SolvesNumber <= leastSolves) {
          leastSolves = el.SolvesNumber
          leastSolvedChal = {
            name: el.Name,
            solves: leastSolves,
          }
        }
        if (el.SolvesNumber >= maxSolves) {
          maxSolves = el.SolvesNumber
          maxSolvedChal = {
            name: el.Name,
            solves: maxSolves,
          }
        }
      })
      return {
        deployedChal,
        undeployedChal,
        purgedChal,
        leastSolvedChal,
        maxSolvedChal,
      }
    }
  },

  async getChallenges() {
    let response = await axiosInstance.post(`/api/info/available`)
    if (response.status !== 200) {
      return null
    } else {
      var challenges = response.data
      var allTags = []
      var categoryFilterOptions = []
      var displayChallenges = []
      challenges.forEach((el) => {
        allTags.push(el.Category)
      })
      allTags = allTags.filter((item, pos) => {
        return allTags.indexOf(item) == pos
      })
      var id = 2
      allTags.forEach((el) => {
        categoryFilterOptions.push({ id: id, name: el })
        id++
      })
      displayChallenges = challenges.sort((a, b) => {
        return a.Name > b.Name ? 1 : -1
      })
      return {
        challenges,
        allTags,
        categoryFilterOptions,
        displayChallenges,
      }
    }
  },
}
