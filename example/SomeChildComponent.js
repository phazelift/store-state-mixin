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
			</div>
		);
	}
});

export default SomeChildComponent
