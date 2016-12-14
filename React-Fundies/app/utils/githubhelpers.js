var axios = require('axios')

function getUserInfo (username){
	return axios.get('https://api.github.com/users/' + username)

}

function getRepos (username){
	return axios.get('https://api.github.com/users/' + username + '/repos')
}

function getTotalStars (repos){
	return repos.data.reduce(function(prev, current){
		return prev + current.stargazers_count
	}, 0)
}

function getPlayersData (player){
	return getRepos(player.login)
		.then(getTotalStars)
		.then(function (totalStars){
			return {
				followers: player.followers,
				totalStars: player.totalStars
			}
		})
}

function calculateScores (players){
	return [
		/*
		* 3 + players[0].totalStars
* 3 	+ players[1].totalStars
		*/
		players[0].followers,
		players[1].followers
	]
}

var helpers = {
	getPlayersInfo: function (players){
		return axios.all(players.map(function (username){
			//takes an array of promises and returns when they all resolve
			return getUserInfo(username)
		})).then(function (info){
			//this continues to return promises
			return info.map(function (user){
				return user.data
			})
		}).catch(function (err){
			console.warn('Error in getPlayersInfo', err)
		})
	},
	battle: function (players){
		var playerOneData = getPlayersData(players[0])
		var playerTwoData = getPlayersData(players[1])

		return axios.all([playerOneData, playerTwoData])
			.then(calculateScores)
			.catch(function (err) {console.warn("Error in getPlayersInfo: ", err)})

	}
}


module.exports = helpers