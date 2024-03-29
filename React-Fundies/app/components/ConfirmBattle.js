var React = require('react')
var PropTypes = React.PropTypes
var styles = require('../styles')
var Link = require('react-router').Link
var UserDetails = require('./UserDetails')
var UserDetailsWrapper = require('./UserDetailsWrapper')
var MainContainer = require('./MainContainer')
var Loading = require('./Loading')


function puke (obj){
	return <pre>{JSON.stringify(obj, null, ' ')}</pre>
}

function ConfirmBattle (props){
	return props.isLoading === true
		? <Loading text='Chill homie' speed={500}/>
		: <MainContainer>
			<h1>Confirm Playersss</h1>
			<div className="col-sm-8 col-sm-offset-2">
				<UserDetailsWrapper header='Player 1'>
					<UserDetails info={props.playerInfo[0]} />
				</UserDetailsWrapper>
				<UserDetailsWrapper header='Player 2'>
					<UserDetails info={props.playerInfo[1]} />
				</UserDetailsWrapper>
			</div>
			<div className="col-sm-8 col-sm-offset-2">
				<div className="col-sm-12" style={styles.space}>
					<button type="button" className="btn btn-lg btn-success" onClick={props.onInitiateBattle}> 
					Initiate Battle
					</button>
				</div>
				<div className="col-sm-12" style={styles.space}>
					<Link to="/playerOne">
						<button type="button" className="btn btn-lg btn-danger">Reselect Players</button>
				 	</Link>
				</div>
			</div>
		</MainContainer>
}

ConfirmBattle.PropTypes = {
	isLoading: PropTypes.bool.isRequired,
	playerInfo: PropTypes.array.isRequired,
	onInitiateBattle: PropTypes.func.isRequired,
}

module.exports = ConfirmBattle