/** @jsx createElement */


function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === "object" ?
                    child
                    :
                    createTextElement(child);
            }),
        },
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createDom(fiber) {
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

    return dom;
}

function commitRoot(){
    
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        }
    }

    nextUnitOfWork = wipRoot;
}


let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }


    if(!nextUnitOfWork && wipRoot){
        commitRoot();
    }

    requestIdleCallback(workLoop);

}


function performUnitOfWork(fiber) {
    // TODO add dom node
    if (!fiber.dom){
        fiber.dom = createDom(fiber);
    }


    // TODO create new fibers
    const elements = fiber.props.children;
    let index = 0;
    let prevSibling = null;

    while(index < elements.length){
        const element = elements[index];

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }

        if(index === 0){
            fiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
    // TODO return next unit of work

    if (fiber.child) {
        return fiber.child;
    }

    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}


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
