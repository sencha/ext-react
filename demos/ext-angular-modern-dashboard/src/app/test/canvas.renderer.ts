// import {Inject, Injectable, OpaqueToken, RenderComponentType, Renderer, RootRenderer, ViewEncapsulation} from '@angular/core';
// //import { Renderer } from '@angular/core';
// import {DomRenderer, DomRootRenderer} from 'angular2/src/platform/dom/dom_renderer';
// //import {provide, Renderer, Provider, RenderComponentType, RootRenderer} from '@angular/core';
// import {ChangeDetectorGenConfig} from 'angular2/src/core/change_detection/interfaces';

// class CanvasRootRenderer extends DomRootRenderer {
//   constructor(_eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, animate: AnimationBuilder) {
//     super(document, _eventManager, sharedStylesHost, animate);
//   }

//   renderComponent(componentProto: RenderComponentType): Renderer {
//     // create a new canvas renderer
//     return new CanvasRenderer(this, componentProto);
//   }
// }

// class CanvasRenderer extends DomRenderer {
//   constructor(_rootRenderer: CanvasRootRenderer, componentProto: RenderComponentType) {
//     super(_rootRenderer, componentProto);
//   }

//   createElement(parent: Element, name: string): Node {
//     // this is called for every HTML element in the template
//   }

//   createViewRoot(hostElement: any): any {
//     // this is called for the component root
//   }

//   createText(parentElement: any, value: string): any {
//     // this is called for every text node in the template
//   }

//   setText(renderNode: any, text: string): void {
//     // this is called when a binding sets its text value
//   }

//   attachViewAfter(node: any, viewRootNodes: any[]) {
//     // this is called when nodes are inserted dynamically (ngFor, ngIf, etc...)
//   }
// }

// // this your actual application
// import {MyApp} from './my-app/my-app';
// bootstrap(MyApp, [
//   // bind the renderer to the application
//   provide(RootRenderer, { useClass: CanvasRootRenderer }),

//   // this is only here to not have Angular2 do code generation (which is something
//   // that may get in the way when creating a custom component since we won't
//   // creating our own code generation per renderer)
//   provide(ChangeDetectorGenConfig, {
//     useValue: new ChangeDetectorGenConfig(true, false, false)
//   })
// ]);