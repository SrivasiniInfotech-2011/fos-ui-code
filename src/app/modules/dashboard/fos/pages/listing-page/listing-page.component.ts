import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss'
})
export class ListingPageComponent implements AfterViewInit {

  public displayedColumns: string[] = ['serialNo', 'action', 'leadNumber', 'date', 'status'];
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router) {

    let obj: any[] =
      [
        {
          'srNo': 1,
          'leadId': 11,
          'leadNumber': 'FOSLDN011',
          'date': '22/11/2024',
          'status': 'Pending'
        },
        {
          'srNo': 2,
          'leadId': 12,
          'leadNumber': 'FOSLDN012',
          'date': '23/11/2024',
          'status': 'Approved'
        },
        {
          'srNo': 3,
          'leadId': 13,
          'leadNumber': 'FOSLDN013',
          'date': '24/11/2024',
          'status': 'Completed'
        },
        {
          'srNo': 4,
          'leadId': 14,
          'leadNumber': 'FOSLDN014',
          'date': '25/11/2024',
          'status': 'Pending'
        },
        {
          'srNo': 5,
          'leadId': 15,
          'leadNumber': 'FOSLDN015',
          'date': '26/11/2024',
          'status': 'Approved'
        },
        {
          'srNo': 6,
          'leadId': 16,
          'leadNumber': 'FOSLDN016',
          'date': '27/11/2024',
          'status': 'Completed'
        },
        {
          'srNo': 7,
          'leadId': 17,
          'leadNumber': 'FOSLDN017',
          'date': '28/11/2024',
          'status': 'Pending'
        },
        {
          'srNo': 8,
          'leadId': 18,
          'leadNumber': 'FOSLDN018',
          'date': '29/11/2024',
          'status': 'Approved'
        },
        {
          'srNo': 9,
          'leadId': 19,
          'leadNumber': 'FOSLDN019',
          'date': '30/11/2024',
          'status': 'Completed'
        },
        {
          'srNo': 10,
          'leadId': 20,
          'leadNumber': 'FOSLDN020',
          'date': '01/12/2024',
          'status': 'Pending'
        }
      ]

    this.dataSource = new MatTableDataSource(obj)

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  view(leadId: any) {
    this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { view: true }, state: { value: 0 } })
  }

  modify(leadId: any) {
    this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { view: false }, state: { value: 0 } })
  }
}
