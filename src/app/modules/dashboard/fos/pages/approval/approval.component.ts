import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent {
  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" }
  ];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  fosComponents = [
    // {
    //   index: 1,
    //   title: 'Individual Details',
    //   path: '/fos/individual-details'
    // },
    {
      index: 1,
      title: 'Lead Master',
    },
    {
      index: 2,
      title: 'Prospect Master',
    },
    {
      index: 3,
      title: 'Prospect Detail',
    },
    {
      index: 4,
      title: 'Loan Details',
    },
    {
      index: 5,
      title: 'Individual',
    },
    {
      index: 6,
      title: 'Non-Individual',
    },
    {
      index: 7,
      title: 'Guarantor 1',
    },
    {
      index: 8,
      title: 'Guarantor 2',
    },
    {
      index: 9,
      title: 'Create BM Approval',
    },
    {
      index: 10,
      title: 'BM Approval',
    },
    {
      index: 11,
      title: 'Create Disbursement',
    },
    {
      index: 12,
      title: 'Disbursement Details',
    },

    {
      index: 13,
      title: 'Document Collection',
    },
    {
      index: 14,
      title: 'FVR Hirer',
    },
    {
      index: 15,
      title: 'FVR Neighbour',
    },
    {
      index: 16,
      title: 'FVR Hirer Neighbour',
    },
    {
      index: 17,
      title: 'FVR Guarantor',
    },
    {
      index: 18,
      title: 'FVR Vehicle',
    },
    {
      index: 19,
      title: 'FVR Vehicle Detail',
    },
    {
      index: 20,
      title: 'FVR Observation',
    }
  ];
  activeSlide = 1
  constructor(private router:Router){}

  displaySelectedComponent(index:any){
    this.activeSlide = index
    console.log(this.activeSlide)
    // this.router.navigateByUrl(path)
  }

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
