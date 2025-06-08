# Autodex Angular Viewer

This project is an example of integration of Autodesk Forge Viewer and Model Derivative APIs to load Revit (.rvt) and other CAD compatible formats into a 2D/3D Viewer that provides some interesting tools to explore those files.

## Features

- Upload and view Revit (.rvt) and other CAD files
- 3D/2D interactive viewer with Autodesk Forge
- Model translation and status tracking
- Support for ZIP archives with entry point specification
- Docker deployment ready
- Custom extensions and tools support

## Dev Environment Setup

1. Install Node Package Manager (npm) with `npm install -g npm`
2. Install `Node 16.13.0` or higher

Further instructions at: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

3. Install dependencies in your local environment by `npm install --force` from your project root folder. A new folder "/.node_modules" must appear with all project dependencies described in the `package.json` file.

4. In the root directory you must create the file `.env` based on `.env.example` that contains the secrets for activating your Autodesk Client Application Id and Secret. The file must have the following content:

```
APS_CLIENT_ID="YOUR_APS_CLIENT_ID"
APS_CLIENT_SECRET="YOUR_APS_CLIENT_SECRET"
APS_BUCKET="YOUR_BUCKET_NAME_OPTIONAL"
PORT=8080
``` 

5. You must have an Autodesk development user account, and add an application to it to get such client application credentials. Further info about how to register in Autodesk Services and get your APS credentials at: https://tutorials.autodesk.io/

## Project Structure

- **`.vscode`** - Visual Studio Code debug configuration for NodeJS
- **`interfaces`** - Autodesk Viewer ToolInterface examples
- **`model-examples`** - Sample Revit project files (.rvt) for testing
- **`node_modules`** - Project external dependencies
- **`routes`** - Express routes:
  - `auth.js` - Autodesk Viewer authentication integration
  - `models.js` - Model upload, get and load functions
- **`services`** - Backend services:
  - `aps.js` - Autodesk Platform Services integration (Authentication and Model Derivative)
- **`wwwroot`** - Frontend files:
  - `assets` - Static assets
  - `libs` - Autodesk Viewer JavaScript libraries
  - `extensions` - Custom Autodesk Viewer extensions
  - Frontend HTML/JS/CSS files
- **`config.js`** - Environment configuration and Autodesk credentials setup
- **`server.js`** - Express server with authentication and model upload endpoints

## Start the project using Docker

You must have installed Docker on your OS. Further instructions about how to install Docker at: https://docs.docker.com/engine/install/

1. Open the console and type the following command `docker-compose up -d`. Docker will use the `Dockerfile` and the deployment instructions of the `docker-compose.yaml` to create an image of the project and deploy it into a Docker container called `lurtis-model-viewer` exposed on `port: 8080`.

2. When deployment finishes, you must see something like this in the console:

```
[+] Running 2/2
 - Network autodex-angular-viewer_default    Created        0.6s 
 - Container lurtis-model-viewer              Started
```

## Testing the Autodex Angular Viewer

1. Open your Internet Browser and type `localhost:8080`. The UI of the Autodex Angular Viewer must be loaded. Press `F5` or reenter if it doesn't work at the first time. It takes a few seconds first time to run and load the code.

2. Press the button `Upload` at the top-right corner. Navigate and select files you want to upload. Remember you have some examples in the `model-examples` folder.

3. When uploading a file, it takes a while to be processed and converted to create a URN for loading it into the Viewer. Follow instructions on the screen. It could take about 1-2 minutes to be completed.

4. Use the selector at the top-right corner to select uploaded models and preview them. If models are not ready you will see a percentage of the processing progress. Otherwise a spinner with the Autodesk logo will appear while loading the model. Then, you will be able to interact with it.

5. **Note**: The bucket is configured with `policyKey: 'persistent'` which means the uploaded files won't expire. Data retention policy options:
   - `transient` - Objects older than 24 hours are removed automatically
   - `temporary` - Objects older than 30 days are deleted
   - `persistent` - Available until a user deletes the object

## API Endpoints

- `GET /api/auth/token` - Get Autodesk Forge access token
- `GET /api/models` - List all uploaded models
- `GET /api/models/:urn/status` - Get model translation status
- `POST /api/models` - Upload a new model

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, Autodesk Forge Viewer
- **APIs**: Autodesk Platform Services (APS)
- **Deployment**: Docker, Docker Compose
- **File Processing**: Autodesk Model Derivative API

## License

ISC

## Author

Jorge R
