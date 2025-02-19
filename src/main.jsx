// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import ReactDom from "./packages/react-dom/ReactDom.js"

const root = ReactDom.createRoot(document.getElementById('root'));
console.log(root);

function handleClick() {
  console.log('handleClick')
}

// root.render("test")
root.render(
  <div className="container" onClick={handleClick}>
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
    3
  </div>
);
