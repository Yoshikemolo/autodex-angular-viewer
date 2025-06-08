/**
 * Base class for new interaction tools.
 *
 * Can also be used simply as a template for creating a new tool.
 * @constructor
 * @see Autodesk.Viewing.ToolController
 * @alias Autodesk.Viewing.ToolInterface
 */
export function ToolInterface()
{
    this.names = [ "unnamed" ];
 
    /**
     * This method should return an array containing the names of all tools implemented by this class.
     * Often this would be a single name but it is possible to support multiple interactions with a single tool.
     * When this tool is registered with the ToolController each name gets registered as an available tool.
     * @returns {array} Array of strings. Should not be empty.
     */
    this.getNames = function() {
        return this.names;
    };
 
    /**
     * This is an optional convenience method to obtain the first name of this tool.
     * @returns {string} The tools default name.
     */
    this.getName = function() {
        return this.names[0];
    };
 
    /**
     * This method should return the priority of the tool inside the tool stack.
     * A tool with higher priority will get events first.
     * @returns {number} The tool's priority.
     */
    this.getPriority = function() {
        return 0;
    };
 
    /**
     * This method is called by {@link Autodesk.Viewing.ToolController#registerTool}.
     * Use this for initialization.
     */
    this.register = function() {
    };
 
    /**
     * This method is called by {@link Autodesk.Viewing.ToolController#deregisterTool}.
     * Use this to clean up your tool.
     */
    this.deregister = function() {
    };

    /**
     * The activate method is called by the ToolController when it adds this tool to the list of those
     * to receive event handling calls.
     * @param {string} name - The name under which the tool has been activated.
     * @param {Autodesk.Viewing.Viewer3D} viewerApi - Viewer instance.
     */
    this.activate = function(name, viewerApi) {
    };
 
    /**
     * The deactivate method is called by the ToolController when it removes this tool from the list.
     * @param {string} name - The name under which the tool has been deactivated.
     */
    this.deactivate = function(name) {
    };
 
    /**
     * The update method is called by the ToolController once per frame.
     * @param {number} highResTimestamp - The process timestamp.
     * @returns {boolean} True if tool has modified the view or scene.
     */
    this.update = function(highResTimestamp) {
        return false;
    };
 
    /**
     * This method is called when a single mouse button click occurs.
     * @param {MouseEvent} event - The event object.
     * @param {number} button - The button number (0, 1, 2 for Left, Middle, Right).
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleSingleClick = function( event, button ) {
        return false;
    };
 
    /**
     * This method is called when a double mouse button click occurs.
     * @param {MouseEvent} event - The event object.
     * @param {number} button - The button number (0, 1, 2 for Left, Middle, Right).
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleDoubleClick = function( event, button ) {
        return false;
    };
 
    /**
     * This method is called when a keyboard button is depressed.
     * @param {KeyboardEvent} event - The event object.
     * @param {number} keyCode - The numerical key code.
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleKeyDown = function( event, keyCode ) {
        return false;
    };
 
    /**
     * This method is called when a keyboard button is released.
     * @param {KeyboardEvent} event - The event object.
     * @param {number} keyCode - The numerical key code.
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleKeyUp = function( event, keyCode ) {
        return false;
    };
 
    /**
     * This method is called when a mouse motion event occurs.
     * @param {MouseEvent} event - The event object.
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleMouseMove = function(event) {
        return false;
    };

    /**
     * This method is called when a mouse button is depressed.
     * @param {MouseEvent} event - The event object.
     * @param {Number} button - The button number (0, 1, 2 for Left, Middle, Right).
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleButtonDown = function(event, button) {
        return false;
    };
 
    /**
     * This method is called when a mouse button is released.
     * @param {MouseEvent} event - The event object.
     * @param {number} button - The button number (0, 1, 2 for Left, Middle, Right).
     * @returns {boolean} True if this tool consumes the event.
     */
    this.handleButtonUp = function(event, button) {
        return false;
    };
}