//
// store-state-mixin
//
//	A React mixin for easily adding (flux) stores state to a component
//
// MIT License
//
// Copyright (c) 2016 Dennis Raymondo van der Sluis
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//


var map= require( 'map-x' );


var StoreStateMixin= function( stores ){

	return {

		storeStateMixin_getState: function( name ){
			var state= {};
			state[ name ]= stores[ name ].getState();
			return state;
		}

		,storeStateMixin_onChange: function( name ){
			this.setState( this.storeStateMixin_getState(name) );
		}

		,getInitialState: function(){
			return map( stores, function(store){
				return store.getState();
			});
		}

		,componentDidMount: function(){
			map( stores, function(store, name){
				store.listen( this.storeStateMixin_onChange.bind(null, name) )
			}.bind(this) );
		}

		,componentWillUnmount: function(){
			map( stores, function(store, name){
				store.unlisten( this.storeStateMixin_onChange.bind(null, name) )
			}.bind(this) );
		}
	};

};

module.exports= StoreStateMixin;