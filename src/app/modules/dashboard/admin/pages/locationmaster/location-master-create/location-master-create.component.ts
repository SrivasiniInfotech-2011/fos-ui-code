import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  IHierarchyLookupDetails,
  IFOSLookup,
  InsertLocationMaster,
  GerLoctionTypes,  
  GetEXistingLocationMasterDetails,
  GetInsertedtLocationMaster
  
} from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LocationMasterService } from '../../../../../../../data/services/feature/locationMaster/location-master.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FOSProspectService } from '../../../../../../../data/services/feature/prospectMaster/prospects.service';



@Component({
  selector: 'app-location-master-create',
  templateUrl: './location-master-create.component.html',
  styleUrls: ['./location-master-create.component.scss'],
})
export class LocationMasterCreateComponent implements OnInit {

  // public LocationCorporateDetails: FormGroup | any = new FormGroup({});
  // selectedCorporateId: number | null = null;

  selectedCorporateParentId: number = 0;
  selectedStateParentId: number = 0; // Unified Parent_ID for dynamic updates

//   selectedCorporateId: number = 0; // Store selected Corporate ID
// selectedStateTypeId: number = 0; // Store selected State Type ID



location_ID: string | null = null;
action: string | null = null;
isEditMode = false; // Flag to toggle edit mode
breadcrumbText: string = 'Location Create'; // Default value
isActive: number = 0; // Default to unchecked
isOperational: number = 0; // Default to unchecked
  
  public LocationMasterDetails: FormGroup | any = new FormGroup({});
  public LocationMasterCommunication: FormGroup | any = new FormGroup({});

  public selectedLocationType: string = '';
  public locationDescriptionLabel: string = 'Location Description';
  public locationCodeLabel: string = 'Location Code';
  public stateLookup: IFOSLookup[] = [];
  public countryLookup: IFOSLookup[] = [];
  public setHierarchyLookup: IHierarchyLookupDetails[] = [];
  public setCorporateLookup: GerLoctionTypes[] = [];
  public setStateTypeLookupLookup: GerLoctionTypes[] = [];
  public LocationStateDetails: FormGroup | any = new FormGroup({});
  public LocationBranchDetails: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public loggedInUser: any = {};
// public existingLocationMasterDetails: InsertLocationMaster = {};

public existingLocationMasterDetails: GetInsertedtLocationMaster = {};

  // Control visibility of dropdowns
  public showCorporateDropdown: boolean = false;
  public showStateDropdown: boolean = false;

  constructor(private fb: FormBuilder,
     private prospectService: FOSProspectService,
        private utilityService: UtilsService,
        private leadsService: FOSLeadMasterService,
        private loaderService: LoaderService,
        private location: Location,
        private locationMasterService: LocationMasterService,
        private toasterService: ToastrService,
         private route: ActivatedRoute 
  ) {}
  ngOnInit(): void {
    console.log('LocationMasterCreateComponent loaded');
    
    // Always initialize the forms first
    this.setLocationMaster();
  
    this.route.queryParams.subscribe((params) => {
      this.location_ID = params['location_ID'] || null;
      this.action = params['action'] || null;
      this.isEditMode = this.action === 'modify';
  
      if (this.action === 'view') {
        this.breadcrumbText = ' View';
        this.setLocationMaster();
        this.LocationMasterDetails.disable();
        this.LocationMasterCommunication.disable();
        this.LookupMasters();
      } else if (this.action === 'modify') {
        this.breadcrumbText = ' Modify';
        this.LocationMasterDetails.enable();
        this.LocationMasterCommunication.enable();
        this.LookupMasters();
      
      } else {
        this.breadcrumbText = ' Create';
        this.LocationMasterDetails.enable();
        this.LocationMasterCommunication.enable();
        this.LookupMasters();
       
      }
  
      if (this.location_ID) {
        // Ensure the form is initialized before calling this method
        this.GetLocationMasterDetails(this.location_ID);
      }
    });
  }
  

LookupMasters(){
  this.getProspectLookup();
  this.getStates();
   this.getHierarchyLookup();
  this.getCorporateLookup();
  this.getStateTypeLookup();
}


  // ngOnInit(): void {
  //   console.log('LocationMasterCreateComponent loaded');
  //    this.setLocationMaster();
  // //  this.getProspectLookup();
  // //   this.getStates();
  // //   this.getHierarchyLookup();
  // //   this.getCorporateLookup();
  // //   this.getStateTypeLookup();
  //   // this.GetLocationMasterDetails();



    
  //   this.route.queryParams.subscribe((params) => {
  //     this.location_ID = params['location_ID'] || null;
  //     this.action = params['action'] || null;
  //     this.isEditMode = this.action === 'modify';
  
  //     // Update the breadcrumb text based on the action
  //     if (this.action === 'view') {
  //       this.breadcrumbText = ' View';
  //       this.setLocationMaster();
  //       this.LocationMasterDetails.disable();
  //       this.LocationMasterCommunication.disable();
  //     } else if (this.action === 'modify') {
  //       this.breadcrumbText = ' Modify';
  //       this.LocationMasterDetails.enable();
  //       this.LocationMasterCommunication.enable();
  //     } else {
  //       this.breadcrumbText = ' Create';
  //       this.LocationMasterDetails.enable();
  //       this.LocationMasterCommunication.enable();
  //        this.getProspectLookup();
  //        this.getStates();
  //        this.getHierarchyLookup();
  //        this.getCorporateLookup();
  //        this.getStateTypeLookup();
  //     }
  
  //     if (this.location_ID) {
  //       this.GetLocationMasterDetails(this.location_ID);
  //     }
  //   });
    
  // }

  
// Initialize LocationCorporateDetails form
setLocationMaster = () => {
  this.LocationMasterDetails = this.fb.group({
    locationType: ['', Validators.required],
    corporate: [''],
    state: [''],
    branch: [''],
    locationDescription: ['', Validators.required],
    locationCode: ['', Validators.required],
  });
  this.LocationMasterCommunication = this.fb.group({
    address: ['', Validators.required],
    landmark: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    TelephoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    MobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    emailId: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    isActive: [false],
    isOperational: [false],
    PinCode: ['', Validators.required],
  });
};



onLocationTypeChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const locationType = target.value.trim(); // Clean the value
  this.selectedLocationType = locationType;

  // Reset dropdown visibility
  this.showCorporateDropdown = false;
  this.showStateDropdown = false;

  // Log the selected location type
  console.log('Selected Location Type:', locationType);

  switch (locationType) {
    case '1':
      this.locationDescriptionLabel = 'Corporate Name';
      this.locationCodeLabel = 'Corporate Code';
      break;

    case '2':
      this.locationDescriptionLabel = 'State Name';
      this.locationCodeLabel = 'State Code';
      this.showCorporateDropdown = true; // Show Corporate dropdown
      break;

    case '3':
      this.locationDescriptionLabel = 'Branch Name';
      this.locationCodeLabel = 'Branch Code';
      // this.showCorporateDropdown = true; // Show Corporate dropdown
      this.showStateDropdown = true;    // Show State dropdown
      break;

    default:
      this.locationDescriptionLabel = 'Location Name';
      this.locationCodeLabel = 'Location Code';
      break;
  }
}


  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Prevent non-numeric input
    }
  }
  limitMobileNumberLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Trim to 10 characters
    }
  }
  onCountrySelect(event: any): void {
    const selectedCountryId = +event.target.value; // Convert value to number
    this.LocationMasterCommunication.patchValue({
      countryID: selectedCountryId, // Update countryID in the form
    });
  }
  onStateSelect(event: any): void {
    const selectedStateId = +event.target.value; // Convert value to number
    this.LocationMasterCommunication.patchValue({
      stateID: selectedStateId, // Update stateID in the form
    });
  }
  getStates() {
    this.loaderService.showLoader();
    this.prospectService.fetchStates().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          this.stateLookup = lookItems;
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }
  getProspectLookup() {
    this.loaderService.showLoader();
    this.prospectService.fetchProspectLookup().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          localStorage.setItem('lookups', JSON.stringify(lookItems));
          this.SetLookups(lookItems);
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }
  private SetLookups(lookItems: IFOSLookup[]) {
    // this.prospectTypeLookup = lookItems.filter(
    //   (s: IFOSLookup) => s.lookupTypeId == 1
    // );
    // this.genderLookup = lookItems.filter(
    //   (s: IFOSLookup) => s.lookupTypeId == 2
    // );
    this.countryLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 22
    );
  }

  getHierarchyLookup() {
     const companyId = this.loggedInUser?.companyId || 1; // Default to 1 if companyId is missing
    this.loaderService.showLoader();
    this.locationMasterService
      .fetchHierarchyLookup({
        CompanyId: companyId,
        
      })
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          if (data && data.message) {
            let lookItems = data.message as IHierarchyLookupDetails[];
            this.setHierarchyLookup = lookItems;
          }
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
        },
      });
  }

// Trigger Corporate Lookup when State Type changes
// onStateTypeChange(event: any) {
//   const selectedValue = (event.target as HTMLSelectElement).value;
//   console.log('Raw Selected Value:', selectedValue);

//   if (selectedValue) {
//     this.selectedStateParentId = parseInt(selectedValue, 10); // Convert to number
//     console.log('Selected State Parent_ID:', this.selectedStateParentId);

//     // Fetch Corporate Lookup with the selected State Parent_ID
//     this.getCorporateLookup(this.selectedStateParentId);
//   } else {
//     console.warn('No state selected. Fetching default corporate lookup with Parent_ID = 0');
//     // Fetch Corporate Lookup with default Parent_ID (0)
//     this.getCorporateLookup(0);
//   }
// }

// Fetch Corporate Lookup based on State Parent_ID
// getCorporateLookup(stateParentId: number = 1) { // Default argument added
//   console.log('Fetching Corporate Lookup with Parent_ID:', stateParentId);

//   this.loaderService.showLoader();
//   this.locationMasterService
//     .fetchCorporateLookup({
//       Parent_ID: stateParentId, // Use the provided or default Parent_ID
//       Company_ID: 1,
//     })
//     .subscribe({
//       next: (data: any) => {
//         this.loaderService.hideLoader();
//         if (data && data.message) {
//           this.setCorporateLookup = data.message as GerLoctionTypes[];
//           console.log('Updated Corporate Lookup:', this.setCorporateLookup);
//         }
//       },
//       error: (error: any) => {
//         this.loaderService.hideLoader();
//         this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
//       },
//     });
// }



  getCorporateLookup() {
   this.loaderService.showLoader();
   this.locationMasterService
     .fetchCorporateLookup({
      Parent_ID: 1,
      Company_ID:1      
     })
     .subscribe({
       next: (data: any) => {
         this.loaderService.hideLoader();
         if (data && data.message) {
           let lookItems = data.message as GerLoctionTypes[];
           this.setCorporateLookup = lookItems;
         }
       },
       error: (error: any) => {
         this.loaderService.hideLoader();
         this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
       },
     });
 }



 onCorporateChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log('Raw Selected Value:', selectedValue); // Debug the raw value

  if (selectedValue) {
    this.selectedCorporateParentId = parseInt(selectedValue, 10); // Convert to number
    console.log('Selected Corporate Parent_ID:', this.selectedCorporateParentId);
  } else {
    console.error('No valid value selected');
  }
}


onStateTypeChange(event: any) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log('Raw Selected Value:', selectedValue); // Debug the raw value
  if (selectedValue) {
    this.selectedStateParentId = parseInt(selectedValue, 10); // Convert to number
    console.log('Selected Corporate Parent_ID:', this.selectedStateParentId);
  } else {
    console.error('No valid value selected');
  }
  // this.selectedStateParentId = +event.target.value; // Update Parent_ID based on State Type selection
  // console.log('Selected State Type Parent_ID:', this.selectedStateParentId);
}

 getStateTypeLookup() {
  this.loaderService.showLoader();
  this.locationMasterService
    .fetchCorporateLookup({
     Parent_ID: 2,
     Company_ID:1      
    })
    .subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as GerLoctionTypes[];
          this.setStateTypeLookupLookup = lookItems;
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
}

  onIsActiveChange(event: any): void {
    this.isActive = event.target.checked ? 1 : 0;
  }
  
  onIsOperationalChange(event: any): void {
    this.isOperational = event.target.checked ? 1 : 0;
  }

 

  

  insertLocationMasterDetails(): void {
    // Perform validation checks for required fields
    if (!this.LocationMasterDetails.valid || !this.LocationMasterCommunication.valid) {
      this.toasterService.error('Please complete all required fields before submitting.', 'Validation Error', {
        timeOut: 3000,
      });
  
      // Mark all form controls as touched to display validation errors
      this.LocationMasterDetails.markAllAsTouched();
      this.LocationMasterCommunication.markAllAsTouched();
  
      // Scroll to the first invalid field and focus on it
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstInvalidControl as HTMLElement).focus(); // Focus the field
      }
      return;
    }
  
    // Determine hierarchyID and parentID dynamically
    const hierarchyID = this.selectedLocationType ? parseInt(this.selectedLocationType, 10) : null;
     let parentID = 0;
  
    if (hierarchyID === 2) {
      parentID = this.selectedCorporateParentId ?? 0; 
      
   
    } else if (hierarchyID === 3) {
      parentID = this.selectedStateParentId ?? 0;
    
    } else {
      parentID = 0;
    }
    
    // Prepare the data object
    const locationDetails = {
      Location_ID: this.existingLocationMasterDetails?.location_ID ?? 0, // Assuming it's auto-generated
      
      Company_ID: 1, // Default to 1 if companyID is missing
      Hierarchy_ID: this.LocationMasterDetails.value.locationType,
      // Parent_ID: this.selectedParentId, // Dynamically set Parent_ID
      Parent_ID: parentID, // Set dynamically based on hierarchyID
      Location_Code: this.LocationMasterDetails.value.locationCode,
      Location_Name: this.LocationMasterDetails.value.locationDescription,
      Address: this.LocationMasterCommunication.value.address,
      landMark: this.LocationMasterCommunication.value.landmark,
      State_ID: this.LocationMasterCommunication.value.state,
      Country_ID: this.LocationMasterCommunication.value.country,
      pincode: this.LocationMasterCommunication.value.PinCode,
      Telephone_Number: this.LocationMasterCommunication.value.TelephoneNumber,
      Mobile_Number: this.LocationMasterCommunication.value.MobileNumber,
      Email_ID: this.LocationMasterCommunication.value.emailId,
      Is_Active: this.isActive, // Dynamically set value
      Is_Operational: this.isOperational, // Dynamically set value
      createdBy: 0,
      modifiedBy: 0,
    } as InsertLocationMaster;
  
    // Log the entire object
    console.log('Prepared Data for Location Master Insertion:', JSON.stringify(locationDetails, null, 2));
  
    // API call to insert data
    this.loaderService.showLoader();
    this.locationMasterService.insertLocationMasterDeytails(locationDetails).subscribe({
      next: (response: any) => {
        this.loaderService.hideLoader();
        console.log('API Response:', response); // Debugging line
  
        // Check response structure for success
        if (response && response.status === 0) {
          // Success message based on response
          this.toasterService.success(response.message || 'Location details inserted successfully!', 'Success', {
            timeOut: 3000,
          });
  
          // Optionally reset the form after successful insertion
          this.LocationMasterDetails.reset();
          this.LocationMasterCommunication.reset();
        } else {
          // Failure message based on response
          this.toasterService.error('Failed to insert location details. Please try again.', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }
  
//   GetLocationMasterDetails(location_ID: string): void {
//     const userIdAsNumber = Number(location_ID);
  
//     if (this.location_ID) {
//       this.loaderService.showLoader();
//       this.locationMasterService
//         .GetLocationMasterDetails({
//           location_ID: userIdAsNumber,
//           Company_ID: 1,
//         })
//         .subscribe({
//           next: (data: any) => {
//             if (data && data.message && data.message.length > 0) {
//               // Extract the first object from the 'message' array
//               const messageItem = data.message[0];
//               console.log('Extracted Message Item:', messageItem);
  
//               // Assign to 'existingLocationMasterDetails'
//               this.existingLocationMasterDetails = messageItem as GetInsertedtLocationMaster;
  
//               // Check if Location_Code exists and set the form value
//               const locationCode = this.existingLocationMasterDetails?.location_Code ?? null;
//               console.log('Final Location_Code:', locationCode);
  
//               this.LocationMasterDetails.get('locationCode')?.setValue(locationCode);
//               console.log('Form Value Set:', locationCode);
              
//               this.LocationMasterDetails
//               .get('locationType')!
//               .setValue(this.existingLocationMasterDetails.hierarchy_ID ?? '');
//               this.LocationMasterDetails
//               .get('locationDescription')!
//               .setValue(this.existingLocationMasterDetails.location_Name ?? '');
//               this.LocationMasterCommunication
//               .get('address')!
//               .setValue(this.existingLocationMasterDetails.address ?? '');
//               this.LocationMasterCommunication
//               .get('landmark')!
//               .setValue(this.existingLocationMasterDetails.landMark ?? '');
//               this.LocationMasterCommunication
//               .get('country')!
//               .setValue(this.existingLocationMasterDetails.country_ID ?? '');
//               this.LocationMasterCommunication
//               .get('state')!
//               .setValue(this.existingLocationMasterDetails.state_ID ?? '');
//               this.LocationMasterCommunication
//               .get('TelephoneNumber')!
//               .setValue(this.existingLocationMasterDetails.telephone_Number ?? '');
//               this.LocationMasterCommunication
//               .get('MobileNumber')!
//               .setValue(this.existingLocationMasterDetails.mobile_Number ?? '');
//               this.LocationMasterCommunication
//               .get('emailId')!
//               .setValue(this.existingLocationMasterDetails. email_ID?? '');
//               this.LocationMasterCommunication
//               .get('PinCode')!
//               .setValue(this.existingLocationMasterDetails. pincode?? '');
//               this.LocationMasterCommunication
//   .get('isActive')!
//   .setValue(!!this.existingLocationMasterDetails.is_Active); // Convert to boolean

// this.LocationMasterCommunication
//   .get('isOperational')!
//   .setValue(!!this.existingLocationMasterDetails.is_Operational); // Convert to boolean
             
//             } else {
//               console.error('Message array is empty or undefined.');
//             }
//           },
//           error: (error: Error) => {
//             this.loaderService.hideLoader();
//             const errorMessages = error.message.split('|');
//             for (const key in errorMessages) {
//               this.toasterService.error(errorMessages[key], 'Error', { timeOut: 2000 });
//             }
//           },
//           complete: () => {
//             this.loaderService.hideLoader();
//           },
//         });
//     }
//   }
  
  
 
GetLocationMasterDetails(location_ID: string): void {
  const userIdAsNumber = Number(location_ID);

  if (location_ID) {
    this.loaderService.showLoader();

    this.locationMasterService
      .GetLocationMasterDetails({ location_ID: userIdAsNumber, Company_ID: 1 })
      .subscribe({
        next: (data: any) => {
          if (data && data.message && data.message.length > 0) {
            const messageItem = data.message[0]; // Extract data
            console.log('Extracted Data:', messageItem);

            // Assign to model
            this.existingLocationMasterDetails = messageItem as GetInsertedtLocationMaster;

            // Set form values
            this.LocationMasterDetails.get('locationCode')?.setValue(this.existingLocationMasterDetails.location_Code ?? '');
            this.LocationMasterDetails.get('locationType')?.setValue(this.existingLocationMasterDetails.hierarchy_ID ?? '');
            this.LocationMasterDetails.get('locationDescription')?.setValue(this.existingLocationMasterDetails.location_Name ?? '');

            this.LocationMasterCommunication.get('address')?.setValue(this.existingLocationMasterDetails.address ?? '');
            this.LocationMasterCommunication.get('landmark')?.setValue(this.existingLocationMasterDetails.landMark ?? '');
            this.LocationMasterCommunication.get('country')?.setValue(this.existingLocationMasterDetails.country_ID ?? '');
            this.LocationMasterCommunication.get('state')?.setValue(this.existingLocationMasterDetails.state_ID ?? '');
            this.LocationMasterCommunication.get('TelephoneNumber')?.setValue(this.existingLocationMasterDetails.telephone_Number ?? '');
            this.LocationMasterCommunication.get('MobileNumber')?.setValue(this.existingLocationMasterDetails.mobile_Number ?? '');
            this.LocationMasterCommunication.get('emailId')?.setValue(this.existingLocationMasterDetails.email_ID ?? '');
            this.LocationMasterCommunication.get('PinCode')?.setValue(this.existingLocationMasterDetails.pincode ?? '');
            this.LocationMasterCommunication.get('isActive')?.setValue(!!this.existingLocationMasterDetails.is_Active);
            this.LocationMasterCommunication.get('isOperational')?.setValue(!!this.existingLocationMasterDetails.is_Operational);

            console.log('Hierarchy ID Set:', this.existingLocationMasterDetails.hierarchy_ID);
          } else {
            console.error('No data found or empty message array.');
          }
        },
        error: (error: Error) => {
          console.error('API Error:', error.message);
          const errorMessages = error.message.split('|');
          errorMessages.forEach(msg => this.toasterService.error(msg, 'Error', { timeOut: 2000 }));
        },
        complete: () => {
          this.loaderService.hideLoader();
        },
      });
  } else {
    console.warn('Invalid Location ID provided.');
  }
}

back() {
  this.location.back();
}

}
