// Sample extension for Autodesk Forge Viewer
// This extension demonstrates how to create custom tools

export class DrawToolExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.tool = null;
    }

    load() {
        console.log('DrawToolExtension loaded');
        return true;
    }

    unload() {
        if (this.tool) {
            this.viewer.toolController.deactivateTool(this.tool.getName());
            this.viewer.toolController.deregisterTool(this.tool);
            this.tool = null;
        }
        console.log('DrawToolExtension unloaded');
        return true;
    }

    activate() {
        console.log('DrawToolExtension activated');
        // Custom activation logic here
        return true;
    }

    deactivate() {
        console.log('DrawToolExtension deactivated');
        // Custom deactivation logic here
        return true;
    }
}

// Register the extension
Autodesk.Viewing.theExtensionManager.registerExtension('DrawToolExtension', DrawToolExtension);
