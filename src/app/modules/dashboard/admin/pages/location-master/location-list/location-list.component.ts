import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'locationType', 'locationCode', 'locationDescription', 'corporateCode',
    'address', 'country', 'state', 'stateCode', 'landmark', 'pincode',
    'telephoneNumber', 'mobileNumber', 'status'
  ];
  public locationData:any[] = [
  // USA
  {
    locationType: 'Warehouse',
    locationCode: 'USCA001',
    locationDescription: 'Los Angeles Warehouse',
    corporateCode: 'CORP001',
    address: '123 Sunset Blvd',
    country: 'USA',
    state: 'California',
    stateCode: 'CA',
    landmark: 'Near Hollywood Sign',
    pincode: '90001',
    telephoneNumber: '+1-310-555-0101',
    mobileNumber: '+1-310-555-0111',
    status: 'Active'
  },
  {
    locationType: 'Store',
    locationCode: 'USTX002',
    locationDescription: 'Houston Store',
    corporateCode: 'CORP001',
    address: '456 Main St',
    country: 'USA',
    state: 'Texas',
    stateCode: 'TX',
    landmark: 'Downtown Plaza',
    pincode: '77002',
    telephoneNumber: '+1-713-555-0202',
    mobileNumber: '+1-713-555-0222',
    status: 'Operational'
  },
  {
    locationType: 'Office',
    locationCode: 'USCA003',
    locationDescription: 'San Francisco Office',
    corporateCode: 'CORP001',
    address: '789 Market St',
    country: 'USA',
    state: 'California',
    stateCode: 'CA',
    landmark: 'Financial District',
    pincode: '94103',
    telephoneNumber: '+1-415-555-0303',
    mobileNumber: '+1-415-555-0333',
    status: 'Active'
  },

  // India
  {
    locationType: 'Warehouse',
    locationCode: 'INMH001',
    locationDescription: 'Mumbai Warehouse',
    corporateCode: 'CORP002',
    address: '12 Marine Drive',
    country: 'India',
    state: 'Maharashtra',
    stateCode: 'MH',
    landmark: 'Near Gateway of India',
    pincode: '400001',
    telephoneNumber: '+91-22-5555-0101',
    mobileNumber: '+91-98200-01001',
    status: 'Active'
  },
  {
    locationType: 'Store',
    locationCode: 'INDL002',
    locationDescription: 'Delhi Store',
    corporateCode: 'CORP002',
    address: '34 Connaught Place',
    country: 'India',
    state: 'Delhi',
    stateCode: 'DL',
    landmark: 'Central Market',
    pincode: '110001',
    telephoneNumber: '+91-11-5555-0202',
    mobileNumber: '+91-98100-02002',
    status: 'Operational'
  },
  {
    locationType: 'Office',
    locationCode: 'INKA003',
    locationDescription: 'Bangalore Office',
    corporateCode: 'CORP002',
    address: '56 MG Road',
    country: 'India',
    state: 'Karnataka',
    stateCode: 'KA',
    landmark: 'Tech Park',
    pincode: '560001',
    telephoneNumber: '+91-80-5555-0303',
    mobileNumber: '+91-98450-03003',
    status: 'Active'
  },

  // UK
  {
    locationType: 'Warehouse',
    locationCode: 'UKEN001',
    locationDescription: 'London Warehouse',
    corporateCode: 'CORP003',
    address: '100 Baker Street',
    country: 'UK',
    state: 'England',
    stateCode: 'ENG',
    landmark: 'Near Regent\'s Park',
    pincode: 'NW1 6XE',
    telephoneNumber: '+44-20-5555-0101',
    mobileNumber: '+44-7700-01001',
    status: 'Active'
  },
  {
    locationType: 'Store',
    locationCode: 'UKSC002',
    locationDescription: 'Edinburgh Store',
    corporateCode: 'CORP003',
    address: '200 Royal Mile',
    country: 'UK',
    state: 'Scotland',
    stateCode: 'SCT',
    landmark: 'Old Town',
    pincode: 'EH1 1PE',
    telephoneNumber: '+44-131-5555-0202',
    mobileNumber: '+44-7700-02002',
    status: 'Operational'
  },
  {
    locationType: 'Office',
    locationCode: 'UKWA003',
    locationDescription: 'Cardiff Office',
    corporateCode: 'CORP003',
    address: '300 Castle Street',
    country: 'UK',
    state: 'Wales',
    stateCode: 'WLS',
    landmark: 'City Centre',
    pincode: 'CF10 1BH',
    telephoneNumber: '+44-29-5555-0303',
    mobileNumber: '+44-7700-03003',
    status: 'Active'
  },
];


  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.locationData)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

