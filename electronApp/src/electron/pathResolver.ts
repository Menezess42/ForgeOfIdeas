import path from 'path';
import {app} from 'electron';
import {isDev} from './util.js';


export function getPreloadPath(){
    return path.join(
        app.getAppPath(),
        isDev() ? '.' : '..',
        '/preload.cjs'
    );
}


export function getUIPath(){
    return path.join(app.getAppPath(), '/dist-react/index.html')
}
