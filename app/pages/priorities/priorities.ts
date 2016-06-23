import {Component} from '@angular/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
	templateUrl: 'build/pages/priorities/priorities.html',
	providers: [],
	directives: [Dragula],
	viewProviders: [DragulaService]
})
export class PrioritiesPage {
	public items: any = [
		{
			text: "priority 1"
		}, {
			text: "priority 2"
		}, {
			text: "priority 3"
		}
	];

	constructor(private dragulaService: DragulaService) {
		dragulaService.setOptions('mainBag', {
			removeOnSpill: false,
			revertOnSpill: true
		});
		dragulaService.drag.subscribe((value) => {
			console.log(`drag: ${value[0]}`);
		//	this.onDrag(value.slice(1));
		});
		dragulaService.drop.subscribe((value) => {
			console.log(`drop: ${value[0]}`);
		//	this.onDrop(value.slice(1));
		});
		dragulaService.over.subscribe((value) => {
			console.log(`over: ${value[0]}`);
		//	this.onOver(value.slice(1));
		});
		dragulaService.out.subscribe((value) => {
			console.log(`out: ${value[0]}`);
			console.log(items);
		//	this.onOut(value.slice(1));
		});
	}
}