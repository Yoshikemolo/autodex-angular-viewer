// SampleToolExtension.js

export default class SampleToolExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        console.log('SampleToolExtension loaded');
        return true;
    }

    unload() {
        console.log('SampleToolExtension unloaded');
        return true;
    }

    getDefaultGeometry() {
        return new SampleToolExtension(this.viewer);
    }
}
