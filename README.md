<h3>store-state-mixin</h3>



A React mixin for easily adding (flux) stores state to a component.

- Efficiently updates component state, only for the store that changed
- Installs listeners on componentDidMount
- Removes listeners on componentWillUnmount
- No dependencies
- Made for Alt, but might be useful with some other React stores as well

--

**Usage**:


>Install with npm: `npm install --save store-state-mixin`

```javascript

// require the mixin
var StoreStateMixin= require( 'store-state-mixin' );

// create a stores init object for the mixin, using key names that will be
// set as keys in this component's state
var stores= {
	 someStore		: require( '../stores/someStore.js' )
	,otherStore		: require( '../stores/otherStore.js' )
};

var MyTopLevelComponent= React.createClass({
	
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
```