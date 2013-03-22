/**
 * Cogent
 * @desc A modular programming framework that just makes sense.
 * @author Eric Bobbitt (eric@hellouser.net)
 * @version 0.0.1
 
 FreeBSD License
 
 Copyright 2013 Eric Bobbitt. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of
       conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list
       of conditions and the following disclaimer in the documentation and/or other materials
       provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY ERIC BOBBITT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of Eric Bobbitt.
 
*/

if(typeof cogent == 'undefined') { cogent = {}; }

(function() {
    
    var _f        = function() {};
    var _util     = {};
    var _modules  = {}; 
    var _constant = {};
    cogent        = _f.prototype;


    _util.combine = function( obj, update, force ) {
        if( !force )   { force = false; }
        if( !obj )     { return false;  }
        for(var x in update) {
           if(obj[x] && !force) { continue; }
           obj[x] = update[x]; 
        }
    };
    
    cogent.define = function( label, value ) {
        var base = {};
        
        if(typeof _constant[label] == 'undefined') {
            if(typeof value == 'object') {
                if(value instanceof Array) { base = []; }
                _constant[label] = _util.combine( base, value, true );
            } else {
                _constant[label] = value;
            }
        }
    };
    
    cogent.load = function() {
        
    };
    
    cogent.list = function() {
        console.log(_modules);
    };
    
    cogent.get = function( module ) {
        return _modules[module].module || false;
    };
    
    cogent.register = function( config, module ) {
        _modules[config.name] = {
            'config': config,
            'module': module()
        };
    };
    
    return cogent;
})();