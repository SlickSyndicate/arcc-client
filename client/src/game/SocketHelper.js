export class SocketHelper {
    static connectToInstance(instanceURL, connectionCallback) {
        const socket = io.connect(instanceURL);
        console.log("Connecting to", instanceURL);
        socket.on('connect', function () {
            connectionCallback(socket)
        });
    }
}