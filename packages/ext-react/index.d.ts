import { ReactElement, Component, ComponentClass, StatelessComponent } from 'react';

export function ExtReact<P>()

export interface LaunchOptions {
    debug: boolean
}

/**
 * Launches the app and renders the specified root component into the html body
 * @param rootComponent The root component to render
 */
export function launch<P>(rootComponent: ReactElement<P>, options?: Partial<LaunchOptions>): void;
export function launch<P>(callback: (viewport: HTMLElement) => void | ReactElement<P>, options?: Partial<LaunchOptions>): void;

/**
 * A HOC that returns a component that delays inital rendering until ExtReact is ready.
 * @param Component The component to wrap
 */
export function renderWhenReady<P>(component: ComponentClass<P> | StatelessComponent<P>): ComponentClass<P>;

export interface InstallOptions {
    /**
     * Adds a stylesheet that mimics an Ext JS Viewport by setting the html, body, and react root element to height: 100%.
     * Set this to true when using an Ext JS component at the root of your app.
     */
    viewport: boolean;
}

/**
 * Configures React.
 * @deprecated Use launch(<App/>) instead
 */
export function install(options?: Partial<InstallOptions>): void;

/**
 * Creates a react component for a given Ext JS component.
 * For example: const Grid = reactify('grid');
 * @param target xtype or instance of Ext.Class.
 */
export function reactify<Props, State>(target: string | (new (...args: any[]) => any)): new () => Component<Props, State>;
export function reactify<Props1, State1, Props2, State2>(target1: string | (new (...args: any[]) => any), target2: string | (new (...args: any[]) => any)): [new () => Component<Props1, State1>, new () => Component<Props2, State2>];
export function reactify<Props1, State1, Props2, State2, Props3, State3>(target1: string | (new (...args: any[]) => any), target2: string | (new (...args: any[]) => any), target3: string | (new (...args: any[]) => any)): [new () => Component<Props1, State1>, new () => Component<Props2, State2>, new () => Component<Props3, State3>];
export function reactify<Props1, State1, Props2, State2, Props3, State3, Props4, State4>(target1: string | (new (...args: any[]) => any), target2: string | (new (...args: any[]) => any), target3: string | (new (...args: any[]) => any), target4: string | (new (...args: any[]) => any)): [new () => Component<Props1, State1>, new () => Component<Props2, State2>, new () => Component<Props3, State3>, new () => Component<Props4, State4>];
export function reactify(...targets: (string | (new (...args: any[]) => any))[]): (new () => Component<any, any>)[];
