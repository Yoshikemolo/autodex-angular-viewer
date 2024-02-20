<<<<<<< HEAD
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
=======
// Based on example from https://aps.autodesk.com/blog/custom-tools-forge-viewer
// Full project at: https://github.com/petrbroz/forge-hello-world/tree/master

import DrawTool from './DrawTool.js';

const BoxDrawToolName = 'box-draw-tool';
const SphereDrawToolName = 'sphere-draw-tool';
const DrawToolOverlay = 'draw-tool-overlay';

//*  Wrap the DrawTool into a viewer extension
export class DrawToolExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.tool = new DrawTool();
        console.log('DrawToolExtension constructor');
    }
 
    load() {
        this.viewer.toolController.registerTool(this.tool);
        this.viewer.impl.createOverlayScene(DrawToolOverlay);
        console.log('DrawToolExtension loaded.');
        return true;
    }
 
    unload() {
        this.viewer.toolController.deregisterTool(this.tool);
        this.viewer.impl.removeOverlayScene(DrawToolOverlay);
        console.log('DrawToolExtension unloaded.');
        return true;
    }
 
    onToolbarCreated(toolbar) {
        const controller = this.viewer.toolController;
        this.button1 = new Autodesk.Viewing.UI.Button('box-draw-tool-button');
        this.button1.onClick = (ev) => {
            if (controller.isToolActivated(BoxDrawToolName)) {
                controller.deactivateTool(BoxDrawToolName);
                this.button1.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
            } else {
                controller.deactivateTool(SphereDrawToolName);
                controller.activateTool(BoxDrawToolName);
                this.button2.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
                this.button1.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
            }
        };
        this.button1.setToolTip('Box Draw Tool');
 
        this.button2 = new Autodesk.Viewing.UI.Button('sphere-draw-tool-button');
        this.button2.onClick = (ev) => {
            if (controller.isToolActivated(SphereDrawToolName)) {
                controller.deactivateTool(SphereDrawToolName);
                this.button2.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
            } else {
                controller.deactivateTool(BoxDrawToolName);
                controller.activateTool(SphereDrawToolName);
                this.button1.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
                this.button2.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
            }
        };
        this.button2.setToolTip('Sphere Draw Tool');
 
        this.group = new Autodesk.Viewing.UI.ControlGroup('draw-tool-group');
        this.group.addControl(this.button1);
        this.group.addControl(this.button2);
        toolbar.addControl(this.group);
    }
}
>>>>>>> bdee01e (POC)
