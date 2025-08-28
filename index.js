/** @jsx createElement */

//Step I: The createElement Function
function createElement(type, props, ...children){
    return {
        type,
        props:{
            ...props,
            children: children.map(child =>{
                return typeof child === "object" ?
                child
                :
                createTextElement(child);
            }),
        },
    };
}

function createTextElement(text){
    return{
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
//Step I: The createElement Function

//Step II: The render Function
function render(element, container){
    const dom = element.type == "TEXT_ELEMENT" ?
    document.createTextNode("")
    : 
    document.createElement(element.type)

    const isProperty = key => key !== "children"
    Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
        dom[name] = element.props[name]
    })

    element.props.children.forEach(child => {
        render(child, dom);
    });

    container.appendChild(dom)
}
//Step II: The render Function


//Step III: Concurrent Mode

let nextUnitOfWork = null;

function workLoop(deadline){
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);

}


function performUnitOfWork(){

}

//Step III: Concurrent Mode


const reactLight = {
    createElement,
    render
}


const element = (
  <div className="container" style="padding: 20px; font-family: sans-serif; color: #333;">
    <h1 style="color: darkblue;">React Light Demo</h1>
    <input type="text" placeholder="Unesi nešto..." style="margin-bottom: 10px; padding: 5px;" />
    <button style="padding: 5px 10px; margin-left: 5px;">Klikni me</button>

    <ul style="margin-top: 20px;">
      <li>Stavka 1</li>
      <li>Stavka 2</li>
      <li>Stavka 3</li>
    </ul>

    <footer style="margin-top: 30px; font-size: 0.8rem;">
      &copy; 2025 React Light
    </footer>
  </div>
);

const container = document.getElementById("root")
reactLight.render(element, container)
