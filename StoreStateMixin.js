//
// store-state-mixin
//
//	A React mixin for easily adding (flux) stores state to a component
//
//
// Copyright (c) 2015 Dennis Raymondo van der Sluis
//
// This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>
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