import alt           from './instance/alt.js';
import someActions	from './actions/someActions.js';

class SomeStore {

	constructor(){
		this.bindListeners({
			 setInfo: someActions.SET_INFO
		});
	}

	setInfo( info ){
		this.info= info;
	}
}

export default alt.createStore( SomeStore, 'someStore' );
