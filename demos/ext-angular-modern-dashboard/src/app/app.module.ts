import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component';

import * as d3 from 'd3'
window['d3'] = d3

//ExtAngular
import { ExtAngularModernModule } from '@sencha/ext-angular-modern'

//services
import { AgencyService } from './service/agency.service';

//in main
//import { DetailComponent } from './view/main/detail/detail.component';
import { FooterComponent } from './view/main/footer/footer.component';
import { HeaderComponent } from './view/main/header/header.component';
import { MainComponent } from './view/main/main.component';
import { SideBarComponent } from './view/main/sidebar/sidebar.component';

//menu
import { DashboardComponent } from './view/dashboard/dashboard.component';
// import { AgenciesComponent } from './view/agencies/agencies.component';
// import { AnalyzeComponent } from './view/analyze/analyze.component';
// import { SpendingDetailComponent } from './view/spendingdetail/spendingdetail.component';
// import { CandidateCalendarsComponent } from './view/candidatecalendars/candidatecalendars.component';
// import { ReportsComponent } from './view/reports/reports.component';
// import { ChartComponent } from './view/chart/chart.component';
// import { D3TreeListComponent } from './view/d3treelist/d3treelist.component';
// import { WidgetGridComponent } from './view/widgetgrid/widgetgrid.component';
import { SimpleGridComponent } from './view/simplegrid/simplegrid.component';
// import { BoilerplateComponent } from './view/boilerplate/boilerplate.component';
// import { ConfiguratorComponent } from './view/configurator/configurator.component';

import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
interface ExtAngularRoute extends Route {
  text?: string;
  iconCls?: string;
  xtype?: string;
  leaf?: boolean;
}
export declare type ExtAngularRoutes = ExtAngularRoute[];
const routes: ExtAngularRoutes = [
	{ path: '', redirectTo: '/simplegrid', pathMatch: 'full' },
	  { path: 'dashboard', component: DashboardComponent, text: 'Dashboard', iconCls: 'x-fa fa-dashboard', leaf: true },
	// { path: 'agencies', component: AgenciesComponent, text: 'Agencies', iconCls: 'x-fa fa-institution', leaf: true },
	// { path: 'analyze', component: AnalyzeComponent, text: 'Analyze', iconCls: 'x-fa fa-cog', xtype: 'homeview', leaf: true },
	// { path: 'spendingdetail', component: SpendingDetailComponent, text: 'Spending Detail', iconCls: 'x-fa fa-dollar', xtype: 'homeview', leaf: true },
	// { path: 'candidatecalendars', component: CandidateCalendarsComponent, text: 'Calendars', iconCls: 'x-fa fa-dollar', xtype: 'homeview', leaf: true },
	// { path: 'reports', component: ReportsComponent, text: 'Reports', iconCls: 'x-fa fa-dollar', xtype: 'homeview', leaf: true },
	// { path: 'chart', component: ChartComponent, text: 'Bar Chart', iconCls: 'x-fa fa-bar-chart', xtype: 'homeview', leaf: true },
	// { path: 'd3treelist', component: D3TreeListComponent, text: 'D3 TreeList', iconCls: 'x-fa fa-calendar', xtype: 'homeview', leaf: true },
	// { path: 'widgetgrid', component: WidgetGridComponent, text: 'Widget Grid', iconCls: 'x-fa fa-calendar', xtype: 'homeview', leaf: true },
	{ path: 'simplegrid', component: SimpleGridComponent, text: 'Simple Grid', iconCls: 'x-fa fa-calendar', xtype: 'homeview', leaf: true },
	// { path: 'boilerplate', component: BoilerplateComponent, text: 'Boilerplate', iconCls: 'x-fa fa-calendar', xtype: 'homeview', leaf: true },
	// { path: 'configurator', component: ConfiguratorComponent, text: 'Configurator', iconCls: 'x-fa fa-calendar', xtype: 'homeview', leaf: true }
];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});


@NgModule({
  declarations: [
		// DetailComponent,
		FooterComponent,
		HeaderComponent,
		MainComponent,
		SideBarComponent,
		// AgenciesComponent,
		// AnalyzeComponent,
		// BoilerplateComponent,
		// CandidateCalendarsComponent,
		// ChartComponent,
		// ConfiguratorComponent,
		// D3TreeListComponent,
		DashboardComponent,
		// ReportsComponent,
		SimpleGridComponent,
		// SpendingDetailComponent,
		// WidgetGridComponent
  ],
  imports: [
    BrowserModule,
    ExtAngularModernModule,
    routingModule
  ],
	providers: [
		AgencyService,
  ],
  entryComponents: [
		//SideBarComponent,
		//FooterComponent,
		//ChartComponent
	],
  bootstrap: [MainComponent]
})
export class AppModule { }
