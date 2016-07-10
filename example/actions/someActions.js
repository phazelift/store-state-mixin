import alt from './instance/alt.js'

class SomeActions {

	setInfo( info ){
		this.dispatch( info );
	}
}

export default alt.createActions( SomeActions );
