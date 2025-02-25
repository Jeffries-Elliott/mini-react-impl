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
import React from "./packages/react/React.js"

const root = ReactDom.createRoot(document.getElementById('root'));

function handleClick() {
  console.log('handleClick')
}
// const App = () => {
//   return (
//     <div className="container" onClick={handleClick}>
//       <ul>
//         <li>function</li>
//         <li>1</li>
//         <li>2</li>
//       </ul>
//       3
//     </div>
//   )
// }

class App extends React.Component {
  render() {
    return (
      <div className="container" onClick={handleClick}>
        <ul>
          <li>class</li>
          <li>1</li>
          <li>2</li>
        </ul>
        3
      </div>
    );
  }
}
root.render(<App />);
