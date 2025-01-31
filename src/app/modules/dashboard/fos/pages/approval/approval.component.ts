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
      title: 'Prospect Master',
      path: '/fos/prospect-master',
    },
    {
      index: 2,
      title: 'Lead Generation',
      path: '/fos/lead-generation',
    },
    {
      index: 3,
      title: 'Prospect Detail',
      path: '/fos/lead-prospect-detail',
    },
    // {
    //   index: 5,
    //   title: 'Guarantor 1',
    //   path: '/fos/lead-guarantor-1',
    // },
    // {
    //   index: 6,
    //   title: 'Guarantor 2',
    //   path: '/fos/lead-guarantor-2',
    // },
    // {
    //   index: 7,
    //   title: 'Loan Details',
    //   path: '/fos/lead-loan-details',
    // },
    // {
    //   index: 8,
    //   title: 'Individual',
    //   path: '/fos/lead-individual',
    // },
    // {
    //   index: 9,
    //   title: 'Non-Individual',
    //   path: '/fos/lead-non-individual',
    // },
    {
      index: 4,
      title: 'BM Approval',
      path: '/fos/BM-approval',
    },
    {
      index: 5,
      title: 'Create BM Approval',
      path: '/fos/BM-approvalcreate',
    },
    {
      index: 6,
      title: 'Disbursement Details',
      path: '/fos/Disbursement-details',
    },
    {
      index: 7,
      title: 'Create Disbursement',
      path: '/fos/disbursement-create',
    },
    {
      index: 8,
      title: 'Document Collection',
      path: '/fos/document-collection',
    },
    {
      index: 9,
      title: 'FVR Hirer',
      path: '/fos/fvr-hirer',
    },
    {
      index: 10,
      title: 'FVR Guarantor',
      path: '/fos/fvr-guarantor',
    },
    {
      index: 11,
      title: 'FVR Vehicle',
      path: '/fos/fvr-vehicle',
    },
    {
      index: 12,
      title: 'FVR Hirer Neighbour',
      path: '/fos/FVR-hirer-neighbour',
    },
    {
      index: 13,
      title: 'FVR Neighbour',
      path: '/fos/FVR-neighbour',
    },
    {
      index: 14,
      title: 'FVR Observation',
      path: '/fos/FVR-observation',
    },
    {
      index: 15,
      title: 'FVR Vehicle Detail',
      path: '/fos/FVR-vehicle-detail',
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
