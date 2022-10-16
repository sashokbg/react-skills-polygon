import {createRoot} from "react-dom/client";
import React from 'react';
import {App} from "./app.jsx"

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />)

console.log('lala');


