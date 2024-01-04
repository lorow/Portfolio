/* @refresh reload */
import { render } from 'solid-js/web'

import './global.scss';

import App from './App'

const root = document.getElementById('root')

render(() => <App />, root!)
