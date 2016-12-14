var React = require('react')
var PropTypes = React.PropTypes
var styles = require('../styles')
var UserDetails = require('./UserDetails')
var UserDetailsWrapper = require('./UserDetailsWrapper')
var Link = require('react-router').Link
var MainContainer = require('./MainContainer')
var Loading = require('./Loading')


function StartOver (){
	return (
		<MainContainer>
			<Link to='playerOne'>
				<button className="btn btn-lg btn-danger">AGAIN?</button>
			</Link>
		</MainContainer>
	)
}

function Tie (props){
	return (
		<MainContainer>
			<h1>DRAW!</h1>
			<StartOver />
		</MainContainer>
	)
}

function Results (props){
	if (props.isLoading === true){
		return <Loading />
	}
	if (props.scores[0] === props.scores[1]){
		return <Tie />
	}
	var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1
	var losingIndex = winningIndex === 0 ? 1 : 0
	return (
		<MainContainer>
			<h1>Results</h1>
			<div className="col-sm-8 col-sm-offset-2">
				<UserDetailsWrapper header="Winner">
					<UserDetails score={props.scores[winningIndex]} info={props.playerInfo[winningIndex]} />
				</UserDetailsWrapper>
				<UserDetailsWrapper header="Loserr">
					<UserDetails score={props.scores[losingIndex]} info={props.playerInfo[losingIndex]} />
				</UserDetailsWrapper>
			</div>
			<StartOver />
		</MainContainer>
	)
}

Results.PropTypes = {
	isLoading: PropTypes.bool.isRequired,
	playerInfo: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired
}

module.exports = Results