<h3>store-state-mixin</h3>



A React mixin for easily adding (flux) stores state to a component.

- Efficiently updates component state, only for the stores that changed
- Installs listeners on componentDidMount
- Removes listeners on componentWillUnmount
- No dependencies
- Made for Alt, but might be useful with some other React stores as well

--

**Usage**:


>Install with npm: `npm install --save store-state-mixin`


A flux example with alt using store-state-mixin:

```javascript
// TopLevelComponent.js

// require the mixin and child components
const StoreStateMixin		= require( 'store-state-mixin' );
const SomeChildComponent	= require( './SomeChildComponent.js' );
const OtherChildComponent	= require( './OtherChildComponent.js' );


// create a stores init object for the mixin, using key names that will be
// used as keys in this component's state and child components props
const stores= {
	 someStore	: require( './stores/someStore.js' )
	,otherStore	: require( './stores/otherStore.js' )
};

const TopLevelComponent= React.createClass({

	 // add stores state and updates to component by mixin
	 mixins: [ StoreStateMixin(stores) ]

	,render: function(){

		// provide child components with stores state
		return (
			<div>
				<SomeChildComponent {...this.state} />
				<OtherChildComponent {...this.state} />
			</div>
		);
	}
});
export default TopLevelComponent;
```

In your child component:

```javascript
// SomeChildComponent.js

// get your actions
const someActions= require( './actions/someActions.js' );

const SomeChildComponent= React.createClass({

	componentWillMount: function(){
		if ( ! this.props.someStore.info ){
			someActions.setInfo( 'Hello World!' );
		}
	}

	,render: function(){

		return (
			<div>
				{ this.props.someStore.info }
				// Hello World!
			</div>
		);
	}
});
export default SomeChildComponent;
```

The store:

```javascript
// someStore.js

// refer to a alt instance and this store's actions
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
```

The actions:

```javascript
// someActions.js

import alt from './instance/alt.js'

class SomeActions {

	setInfo( info ){
		this.dispatch( info );
	}
}
export default alt.createActions( SomeActions );
```

A single Alt instance:

```javascript
// alt.js
const alt= new require( 'alt' );
export default alt
```

Just to complete the example:

```javascript
// OtherChildComponent.js

export default null
```

```javascript
// otherStore

import alt           from './instance/alt.js';

class OtherStore {

}

export default alt.createStore( OtherStore, 'otherStore' );
```
--
<h3>Change log:</h3>
--

<br/>

0.1.4:

- replaces map with map-x

--

0.1.3:

- added minified version
- updated the readme
- added example files

--

0.1.2:

- adds hasOwnProperty to object map
- adds es3 compatibility
