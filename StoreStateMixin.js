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


// a basic object map
var map= ( obj, callback ) => {
	var result= {};
	Object.keys( obj ).forEach( (key) => result[key]= callback(obj[ key ], key) );
 	return result;
};


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
			return map( stores, (store) => store.getState() );
		}

		,componentDidMount: function(){
			map( stores, (store, name) => store.listen(this.storeStateMixin_onChange.bind( this, name )) );
		}

		,componentWillUnmount: function(){
			map( stores, (store, name) => store.unlisten(this.storeStateMixin_onChange.bind( this, name )) );
		}
	};

};

module.exports= StoreStateMixin;