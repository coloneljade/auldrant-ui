import { render } from 'preact';
import '@styles/tokens.css';
import './dev.css';
import { TestPage } from './TestPage';

const app = document.getElementById('app');
if (app) {
	render(<TestPage />, app);
}
