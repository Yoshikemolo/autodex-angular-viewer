//* DrawTool Extension functionality
export default class DrawTool extends Autodesk.Viewing.ToolInterface {
    constructor() {
        console.log('DrawTool constructor');
        super();
        this.names = ['box-drawing-tool', 'sphere-drawing-tool'];
 
        // Hack: delete functions defined *on the instance* of the tool.
        // We want the tool controller to call our class methods instead.
        delete this.register;
        delete this.deregister;
        delete this.activate;
        delete this.deactivate;
        delete this.getPriority;
        delete this.handleMouseMove;
        delete this.handleButtonDown;
        delete this.handleButtonUp;
        delete this.handleSingleClick;
    }
 
    register() {
        console.log('DrawTool registered.');
    }
 
    deregister() {
        console.log('DrawTool unregistered.');
    }

    // When tool is activated, store a reference to the viewer for later use,
    // a "drawing mode" (box vs sphere) based on which of our two tool names was activated,
    // and a "drawing state" that will help us keep track of what stage of the drawing we're currently in.

    activate(name, viewer) {
        this.viewer = viewer;
        this.mode = (name === 'box-drawing-tool') ? 'box' : 'sphere';
        this.state = ''; // can be '' (not drawing anything), 'xy' (drawing in the XY plane), or 'z' (specifying the height)
        console.log('DrawTool', name, 'activated.');
    }
     
    deactivate(name) {
        this.viewer = null;
        this.state = '';
        console.log('DrawTool', name, 'deactivated.');
    }

    getPriority() {
        return 42; // Or feel free to use any number higher than 0 (which is the priority of all the default viewer tools)
    }
 
    update(highResTimestamp) {
        return false;
    }
 
    handleMouseMove(event) {
        // Update the 2nd corner of our geometry in the XY plane, or its height, depending on which drawing state:
        if (!this.bypassed && this.state === 'xy') {
            // If we're in the "XY plane drawing" state, and not bypassed by another tool
            this.corner2 = this.viewer.impl.intersectGround(event.clientX, event.clientY);
            this._update();
            return true;
        } else if (!this.bypassed && this.state === 'z') {
            // If we're in the "height drawing" state, and not bypassed by another tool
            this.height = this.lastClientY - event.clientY;
            this._update();
            return true;
        }
        // Otherwise let another tool handle the event
        return false;
    }
 
    // Implement the first stage of the drawing - specifying the geometry's extent in the XY plane - we will want to update the handleButtonDown and handleButtonUp methods:

    handleButtonDown(event, button) {
        // If left button is pressed and we're not drawing already
        if (button === 0 && this.state === '') {
            // Create new geometry and add it to an overlay
            if (this.mode === 'box') {
                const geometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1, 1, 1));
                const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
                this.mesh = new THREE.Mesh(geometry, material);
            } else {
                const geometry = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(0.5, 16, 16));
                const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
                this.mesh = new THREE.Mesh(geometry, material);
            }
            this.viewer.impl.addOverlay('draw-tool-overlay', this.mesh);
     
            // Initialize the 3 values that will control the geometry's size (1st corner in the XY plane, 2nd corner in the XY plane, and height)
            this.corner1 = this.corner2 = this.viewer.impl.intersectGround(event.clientX, event.clientY);
            this.height = 0.1;
            this._update();
            this.state = 'xy'; // Now we're drawing in the XY plane
            return true; // Stop the event from going to other tools in the stack
        }
        // Otherwise let another tool handle the event, and make note that our tool is now bypassed
        this.bypassed = true;
        return false;
    }
     
    handleButtonUp(event, button) {
        // If left button is released and we're currently drawing in the XY plane
        if (button === 0 && this.state === 'xy') {
            // Update the 2nd corner in the XY plane and switch to the "height drawing"
            this.corner2 = this.viewer.impl.intersectGround(event.clientX, event.clientY);
            this._update();
            this.state = 'z';
            this.lastClientY = event.clientY; // Store the current mouse Y coordinate to compute height later on
            return true; // Stop the event from going to other tools in the stack
        }
        // Otherwise let another tool handle the event, and make note that our tool is no longer bypassed
        this.bypassed = false;
        return false;
    }
 
    handleSingleClick(event, button) {
        // Handle the mouse single click event in order to finalize the placement of a geometry:
        // If left button is clicked and we're currently in the "height drawing" state
        if (button === 0 && this.state === 'z') {
            this.state = '';
            return true; // Stop the event from going to other tools in the stack
        }
        // Otherwise let another tool handle the event
        return false;
    }
 
    _update() {
        // Update the actual geometry
        // Position and scale the current geometry based on the corner1, corner2, and height values:
        const { corner1, corner2, height, mesh } = this;
        const minX = Math.min(corner1.x, corner2.x), maxX = Math.max(corner1.x, corner2.x);
        const minY = Math.min(corner1.y, corner2.y), maxY = Math.max(corner1.y, corner2.y);
        mesh.position.x = minX + 0.5 * (maxX - minX);
        mesh.position.y = minY + 0.5 * (maxY - minY);
        mesh.position.z = 0.5 * height;
        mesh.scale.x = maxX - minX;
        mesh.scale.y = maxY - minY;
        mesh.scale.z = height;
        this.viewer.impl.invalidate(true, true, true);
    }
}


