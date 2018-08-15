import { Children } from 'react';

/**
 * Converts both ExtReact and DOM components to json for Jest snapshots
 * @param {React.Component} component
 * @returns {Object}
 */
export default function toJSON(component) {
    const element = component._currentElement;
    const renderedChildren = component._renderedChildren;
    if (typeof element === 'string') return element;
    const { children, ...props } = element.props;
    let jsonChildren = null;

    if (typeof children === 'string') {
        // inner text
        jsonChildren = [children];
    } else if (renderedChildren) {
        // child components
        jsonChildren = Object.keys(renderedChildren).map(key => {
            let child = renderedChildren[key];
            child = getHostComponentFromComposite(child) || child;
            return child.toJSON ? child.toJSON() : toJSON(child);
        })
    }

    const object = {
        type: typeof element.type === 'string' ? element.type : element.type.name,
        props: includeSerializable(props),
        children: jsonChildren
    };

    Object.defineProperty(object, '$$typeof', {
        value: Symbol['for']('react.test.json')
    });

    return object;
}

/**
 * Returns an object containing only the serializable keys from the source object.
 * @param {Object} obj The source object
 * @returns {Object}
 */
function includeSerializable(obj) {
    if (Array.isArray(obj)) {
        const result = [];

        for (let item of obj) {
            if (typeof item === 'object') {
                const jsonItem = includeSerializable(item);

                if (jsonItem !== undefined) {
                    result.push(jsonItem);
                }
            } else {
                result.push(item);
            }
        }

        return result;
    } else if (typeof obj === 'object') {
        if (obj.constructor !== Object) {
            // include only the class name for complex objects
            return { $className: obj.$className || obj.constructor.name || 'unknown' };
        }

        const result = { };

        for (let key in obj) {
            result[key] = includeSerializable(obj[key]);
        }

        return result;
    } else {
        return obj;
    }
}

// borrowed from react-test-renderer

/**
 * Gets the inner ExtReact or DOM component from the specified component
 * @param {React.Component} inst A component instance
 * @returns {React.Component}
 */
function getHostComponentFromComposite(inst) {
    var type;

    while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
        inst = inst._renderedComponent;
    }

    if (type === ReactNodeTypes.HOST) {
        return inst._renderedComponent;
    } else if (type === ReactNodeTypes.EMPTY) {
        return null;
    }
}

export const ReactNodeTypes = {
    HOST: 0,
    COMPOSITE: 1,
    EMPTY: 2
};