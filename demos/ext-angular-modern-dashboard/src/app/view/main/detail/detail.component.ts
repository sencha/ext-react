import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';
//import { AgencyService } from '../../service/agency.service';


@Component({
	styleUrls: ['./detail.component.css'],
	//styles:[require('./detail.component.css').toString()],
	selector: 'detail',
	templateUrl: 'detail.component.html',
	changeDetection: ChangeDetectionStrategy.Default
})
export class DetailComponent implements OnInit{ 
	agency: any = {};
	
	// subscription: Subscription;
	// agency: any;
	// constructor(private agencyService: AgencyService) {

	// 	this.subscription = agencyService.agencyAnnounced$.subscribe(agency => {
	// 			this.agency = agency;
	// 	});

	// }

	ngOnInit():any {
		this.agency.agencyCode = "code";
		this.agency.agencyAbbreviation = "abbreviation";
		this.agency.agencyName = "name";
//		this.agency = this.agencyService.agency;
	}
}
