define(
    [
        'io'
    ],function(socketio){ 
        var instance = null;
        getInstance = function(){
            // summary:
            // Gets an instance of the singleton. It is better to use
            if(instance === null){
                instance = socketio.connect('http://localhost:3000');
            }
            return instance;
        };
        return getInstance();
});