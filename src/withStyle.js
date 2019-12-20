import React from 'react'
// 高阶组件，用来存放共同的代码
export default (DecoratedComponent, styles) => {
    return (props) => {
        // props.staticContext 只有在服务端渲染时才有值。
        // 在class组件的内，这段要写在componentWillMount()里
        if (props.staticContext) {
            props.staticContext.css.push(styles._getCss());
        }

        return <DecoratedComponent {...props}/>
    }
}