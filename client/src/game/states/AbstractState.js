export class AbstractState {
    preload() {
        console.log("Preload not specified for " + this);
    }

    create() {
        console.log("Create not specified for " + this);
    }

    update() {
    }

    render() {
    }
}