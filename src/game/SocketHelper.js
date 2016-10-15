export class SocketHelper {
    static connectToInstance(instanceURL, connectionCallback) {
        const socket = io(instanceURL);
        socket.on('connect', function () {
            connectionCallback(socket)
        });
    }
}