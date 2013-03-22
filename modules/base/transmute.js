cogent.register(

{
    'name':     'transmute',
    'category': 'utility',
    'uid':      'transmute.eric@hellouser.net',
    'version':  '0.0.1',
    'summary':  'A utility to ease writing objects with a pseudo state'
}, 

function() {
    var transmute = function( context, states ) {

        var ObjectState = {};
        var _context    = false;
        if(context) { _context = context; }

        (function() {
            var s = function() {};
            ObjectState = s.prototype;

            ObjectState._index     = 0;
            ObjectState._states    = {};
            ObjectState._order     = [];
            ObjectState._disabled  = {};
            ObjectState._direction = 'forward';

            ObjectState.trigger = function( name, context, data ) {
                if(typeof this._disabled[name] != "undefined") { return this; }
                var _data = [];
                if((typeof data != "undefined")) { _data.push(data); }
                if((typeof context == "undefined" || !context)) { context = _context; }
                if(this._states[name]) {
                    this._state = name;
                    this.set_index();
                    if(context) {
                        this._states[name].apply(context, _data);
                    } else {
                        this._states[name](_data);
                    }
                }
                return this;
            };

            ObjectState.set_index = function( index ) {
                if(index) {
                    this._index = index;
                } else {
                    var state = this._state;
                    var order = this._order;
                    var count = 0;
                    for(var x in order) {
                        if(state == order[x]) {
                            this._index = count;
                        }
                        count++;
                    }
                }
            };

            ObjectState.order = function( order ) {
                if(order) { this._order = order; }
                return this;
            };

            ObjectState.disable = function( state ) {
                if(state) { this._disabled[state] = 1; }
            };

            ObjectState.enable = function( state ) {
                if(state) { delete this._disabled[state]; }
            };

            ObjectState.add = function( name, state, force ) {
                if(typeof state != 'function') { return false; }
                var exists = this._states[name] ? true : false;
                if(!exists || (exists && force)) { this._states[name] = state; }
                return this;
            };

            ObjectState.remove = function ( name ) {
                var exists = this._states[name] ? true : false;
                if(exists) { delete this._states[name]; }
            };

            ObjectState.context = function( context ) {
                if(context) { _context = context; }
            };

            ObjectState.get_context = function() {
                return _context;
            };

            ObjectState.get_state = function() {
                return this._state;
            };

            ObjectState.next = function() {
                this._direction = 'forward';
                var count =  0;
                var skip  = true;
                var state = false;
                while(skip && count < 1000) {
                    count++;
                    try {
                        state = this._order[(this._index + count)];
                        if(typeof this._disabled[state] == "undefined") {
                            skip = false;
                        }
                    } catch(e) {}
                }
                if(state) { this.trigger(state); }
            };

            ObjectState.previous = function() {
                this._direction = 'backward';
                var count =  0;
                var skip  = true;
                var state = false;
                while(skip && count < 1000) {
                    count++;
                    try {
                        state = this._order[(this._index - count)];
                        if(typeof this._disabled[state] == "undefined") {
                            skip = false;
                        }
                    } catch(e) {}
                }
                if(state) { this.trigger(state); }
            };

            ObjectState.forward  = ObjectState.next;
            ObjectState.backward = ObjectState.previous;
            ObjectState.back     = ObjectState.previous;

            return ObjectState;
        })();


        // inject states
        if( typeof states != void(0) ) {
            for(var x in states) {
                ObjectState.add( x, states[x] );
            }
        }

        return ObjectState;
    }; 
    
    return transmute;
});