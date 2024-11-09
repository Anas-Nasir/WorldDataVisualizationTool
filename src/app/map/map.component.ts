import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { WorldBankService } from '../services/world-bank.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  currentCountryData = {
    name: '',
    capitalCity: '',
    region: '',
    incomeLevel: '',
    longitude: '',
    latitude: ''
  };
  isTooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  isCountryClicked = false;

  constructor(
    private elementRef: ElementRef,
    private worldBankService: WorldBankService
  ) {}

  ngAfterViewInit() {
    const svgElement = this.elementRef.nativeElement.querySelector('svg');
    const pathElements = svgElement.querySelectorAll('path');
    
    pathElements.forEach((path: SVGPathElement) => {
      path.addEventListener('mouseover', (event: MouseEvent) => {
        const countryId = path.id;
        this.fetchCountryData(countryId, event);
      });
      
      path.addEventListener('click', (event: MouseEvent) => {
        const countryId = path.id;
        this.handleCountryClick(countryId, event);
      });

      path.addEventListener('mouseout', () => {
        this.isTooltipVisible = false;
      });
    });
  }

  fetchCountryData(countryId: string, event: MouseEvent) {
    this.worldBankService.getCountryDetails(countryId).subscribe(
      (data: any) => {
        const countryData = data[1][0]; 
        this.currentCountryData = {
          name: countryData.name || 'N/A',
          capitalCity: countryData.capitalCity || 'N/A',
          region: countryData.region?.value || 'N/A',
          incomeLevel: countryData.incomeLevel?.value || 'N/A',
          longitude: countryData.longitude || 'N/A',
          latitude: countryData.latitude || 'N/A'
        };

        this.isTooltipVisible = true;
        this.tooltipX = event.clientX + 10; 
        this.tooltipY = event.clientY + 10; 
      },
      (error) => {
        console.error('Error fetching country data:', error);
        this.isTooltipVisible = false;
      }
    );
  }

  handleCountryClick(countryId: string, event: MouseEvent) {
    this.isCountryClicked = !this.isCountryClicked;
    console.log(`Country clicked: ${countryId}`);
    
  }
}
