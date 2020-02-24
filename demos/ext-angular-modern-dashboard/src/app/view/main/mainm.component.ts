import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
	styles:  [`
		.center {
			position: absolute;
			overflow-y: auto;
			color: #111;
			background-color: white;
			background:#f1f5f6;
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
		<sidebar></sidebar>
		<section [ngClass]="detail" class="main-container center" [ngClass]="{sidebarPushRight: isActive}">
			<router-outlet></router-outlet>
		</section>
	`
})
export class MainMComponent {
	private detail:any = '';

	constructor(private router: Router) {
		router.events.subscribe(value => {
			if (value instanceof NavigationEnd) {
				if (this.router.routerState.snapshot.url == '/agenciesNN') {
						this.detail = 'center-detail'
					} else {
						this.detail = '';
					}
 			}
		});
	}

}


		// <header></header>
		// <sidebar></sidebar>
		// <section [ngClass]="detail" class="main-container center" [ngClass]="{sidebarPushRight: isActive}">
		// 	<router-outlet></router-outlet>
		// </section>
		// <detail></detail>
		// <footer></footer>