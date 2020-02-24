import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  styles:  [`
    .main-background {
      background-image: linear-gradient(0deg,#f5f5f5 1.1px, transparent 0), linear-gradient(90deg,#f5f5f5 1.1px, transparent 0);
      background-size: 20px 20px;
      background-color: #e8e8e8;
    }
    .center {
      position: absolute;
      overflow-y: auto;
      color: #111;
      xbackground-color: yellow;
      xbackground:#f1f5f6;
      top: 50px;													/* topHeight */
      left: 225px; 												/* leftWidth */
      width: calc(100% - 225px - 0px); 		/* 100% - leftWidth - rightWidth */
      height: calc(100% - 50px - 30px); 	/* 100% - topHeight - bottomHeight */
      transition: all 0.2s ease-in-out;
    }
    .center-detail {
      width: calc(100% - 225px - 300px); 	/* 100% - leftWidth - rightWidth */
    }
  `],
  template: `

    <ExtPanel viewport="true" >
      <header></header>
      <sidebar></sidebar>
      <section [ngClass]="detail" class="main-container main-background center" [ngClass]="{sidebarPushRight: isActive}">
        <router-outlet></router-outlet>
      </section>
      <footer></footer>
    </ExtPanel>

  `
})
export class MainComponent {

      // <header></header>
      // <sidebar></sidebar>
      // <section [ngClass]="detail" class="main-container main-background center" [ngClass]="{sidebarPushRight: isActive}">
      //   <router-outlet></router-outlet>
      // </section>




  detail:any = ''

  constructor(private router: Router) {
    router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        if (this.router.routerState.snapshot.url == '/agenciesNN') {
            this.detail = 'center-detail'
          } else {
            this.detail = ''
          }
      }
    })
  }
}
