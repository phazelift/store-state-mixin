const StoreStateMixin		= require( 'store-state-mixin' );
const SomeChildComponent	= require( './SomeChildComponent.js' );
const OtherChildComponent	= require( './OtherChildComponent.js' );

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
