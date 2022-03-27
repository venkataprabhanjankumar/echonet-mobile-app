/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Result} from "./Components/result";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Result);
