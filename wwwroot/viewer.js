/// import * as Autodesk from "@types/forge-viewer";

import { DrawToolExtension } from '/extensions/DrawToolExtension.js';

async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', getAccessToken }, async function () {

            const config = {
                extensions: ['Autodesk.DocumentBrowser', 'Autodesk.DataVisualization']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            
            // Load the DrawTool extension
            // const drawTool = new DrawToolExtension(viewer);

            // try {
            //     const drawToolExtension = await viewer.loadExtension(drawTool);
            //     drawToolExtension.activate();
            
            // } catch (ex) {
            //     console.log('Error loading extension :');
            //     console.error(ex);
            // }
            

            viewer.start();
            console.log('Viewer started');

            // Set theme
            viewer.setTheme('light-theme');

            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        viewer.setLightPreset(0);
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

