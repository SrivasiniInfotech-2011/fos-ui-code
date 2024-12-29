import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSFvrService } from '../../../../../../../data/services/feature/fvr/fvr.service';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import {
  IFvrAsset,
  IFvrAssetDetail,
  IFvrDetail,
  IFvrDocument,
} from '../../../../../../../core/interfaces/app/fvr/IFvrModel';
import { MatDialog } from '@angular/material/dialog';
import { CarouselHostComponent } from '../../../../../../shared/components/carousel/carousel.host.component';

@Component({
  selector: 'app-fvr-vehicle',
  templateUrl: './fvr-vehicle.component.html',
  styleUrl: './fvr-vehicle.component.scss',
})
export class FvrVehicleComponent implements OnInit {
  public fvrVehicleLeadForm: FormGroup | any = new FormGroup({});
  public fvrVehicleProspectForm: FormGroup | any = new FormGroup({});
  public fvrVehicle1Form: FormGroup | any = new FormGroup({});
  public fvrVehicle2Form: FormGroup | any = new FormGroup({});
  private loggedInUser: any = {};
  public taxTypeLookup: IFOSLookup[] = [];
  public permitLookup: IFOSLookup[] = [];
  public permitTypeLookup: IFOSLookup[] = [];
  public defaultLookup: IFOSLookup[] = [];
  public tyreLookup: IFOSLookup[] = [];
  public bodyLookup: IFOSLookup[] = [];
  public bodyTypeLookup: IFOSLookup[] = [];
  public vehicleImages: IFvrDocument[] = [];
  constructor(
    private fvrService: FOSFvrService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService,
    private dialog: MatDialog
  ) {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
      }
    }
  }

  public ngOnInit(): void {
    this.generateForm();
  }

  private generateForm() {
    this.fvrVehicleLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
    });

    this.fvrVehicleProspectForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrVehicle1Form = new FormGroup({
      prospectName: new FormControl('', [Validators.required]),
      verifierName: new FormControl('', [Validators.required]),
      verifierId: new FormControl('', [Validators.required]),
      branchName: new FormControl('', [Validators.required]),
      dateOfVisit: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      taxExpiry: new FormControl('', [Validators.required]),
      taxExpiryDate: new FormControl('', [Validators.required]),
      permitStatus: new FormControl('', [Validators.required]),
      insuranceExpiryDate: new FormControl('', [Validators.required]),
      fieldExecutiveComment: new FormControl('', [Validators.required]),
      inspectedVehicleValue: new FormControl('', [Validators.required]),
      rcRegistrationDate: new FormControl('', [Validators.required]),
      vehicleDescription: new FormControl('', [Validators.required]),
      frontTyreCondition: new FormControl('', [Validators.required]),
      rearTyreCondition: new FormControl('', [Validators.required]),
      colour: new FormControl('', [Validators.required]),
      vehicleCondition: new FormControl('', [Validators.required]),
      inspectedVehiclePlace: new FormControl('', [Validators.required]),
      bodyType: new FormControl('', [Validators.required]),
      bodyLength: new FormControl('', [Validators.required]),
      nationalPermitValidity: new FormControl('', [Validators.required]),
      statePermitValidity: new FormControl('', [Validators.required]),
      vehiclePresentOwner: new FormControl('', [Validators.required]),
      engineCondition: new FormControl('', [Validators.required]),
      verifiedDuplicateKey: new FormControl('', [Validators.required]),
    });

    this.fvrVehicle2Form = new FormGroup({
      photos: new FormControl([]),
    });

    this.fetchAssetLookup();
  }

  fetchAssetLookup() {
    this.fvrService
      .getFvrAssetLookup(this.loggedInUser.companyId, this.loggedInUser.userId)
      .subscribe({
        next: (data: any) => {
          let assetLookups = data.message as IFOSLookup[];
          this.taxTypeLookup = assetLookups.filter((s) => s.lookupTypeId == 9);
          this.permitLookup = assetLookups.filter((s) => s.lookupTypeId == 11);
          this.permitTypeLookup = assetLookups.filter(
            (s) => s.lookupTypeId == 12
          );
          this.defaultLookup = assetLookups.filter((s) => s.lookupTypeId == 28);
          this.tyreLookup = assetLookups.filter((s) => s.lookupTypeId == 37);
          this.bodyLookup = assetLookups.filter((s) => s.lookupTypeId == 38);
          this.bodyTypeLookup = assetLookups.filter(
            (s) => s.lookupTypeId == 39
          );
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          let errorMessages = error.message.split('|');
          for (const key in errorMessages) {
            this.toasterService.error(errorMessages[key], 'Error', {
              timeOut: 2000,
            });
          }
        },
      });
  }
  searchVehiclesForLead() {
    this.loaderService.showLoader();
    this.fvrService
      .getLeadAssetDetails(
        this.loggedInUser.companyId,
        this.loggedInUser.userId,
        this.fvrVehicleLeadForm.value.leadNumber,
        this.fvrVehicleLeadForm.value.vehicleNumber
      )
      .subscribe({
        next: (data: any) => {
          let fvrDetail = data.message as IFvrAsset;

          this.fvrVehicleProspectForm
            .get('leadNumber')
            .setValue(this.fvrVehicleLeadForm.value.leadNumber);
          this.fvrVehicleProspectForm
            .get('vehicleNumber')
            .setValue(this.fvrVehicleLeadForm.value.vehicleNumber);
          this.fvrVehicleProspectForm
            .get('prospectName')
            .setValue(fvrDetail.fvrAssetDetail.prospectName);
          this.setVehicleDetails(fvrDetail.fvrAssetDetail);
          this.vehicleImages = fvrDetail.fvrDocuments;
          this.loaderService.hideLoader();
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          let errorMessages = error.message.split('|');
          for (const key in errorMessages) {
            this.toasterService.error(errorMessages[key], 'Error', {
              timeOut: 2000,
            });
          }
        },
      });
  }

  setVehicleDetails(fvrAssetDetail: IFvrAssetDetail) {
    this.fvrVehicle1Form
      .get('verifierName')
      .setValue(fvrAssetDetail.verifierName);
    this.fvrVehicle1Form
      .get('verifierId')
      .setValue(fvrAssetDetail.verifierCode);
    this.fvrVehicle1Form
      .get('dateOfVisit')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.visitDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrVehicle1Form.get('taxExpiry').setValue(fvrAssetDetail.taxType);
    this.fvrVehicle1Form
      .get('taxExpiryDate')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.taxExpiryDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrVehicle1Form
      .get('permitStatus')
      .setValue(fvrAssetDetail.permitStatus);
    this.fvrVehicle1Form
      .get('insuranceExpiryDate')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.insuranceExpiryDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrVehicle1Form
      .get('fieldExecutiveComment')
      .setValue(fvrAssetDetail.fieldExecutiveComment);
    this.fvrVehicle1Form
      .get('inspectedVehicleValue')
      .setValue(fvrAssetDetail.inspectedValueAmount);
    this.fvrVehicle1Form
      .get('rcRegistrationDate')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.registrationDate),
          'YYYY-MM-DD'
        )
      );
    // this.fvrVehicle1Form
    //   .get('vehicleDescription')
    //   .setValue(fvrAssetDetail.vehicleBodyDescription);
    this.fvrVehicle1Form
      .get('frontTyreCondition')
      .setValue(fvrAssetDetail.frontTyreStatus);
    this.fvrVehicle1Form
      .get('rearTyreCondition')
      .setValue(fvrAssetDetail.rearTyreStatus);
    this.fvrVehicle1Form.get('colour').setValue(fvrAssetDetail.vehicleColour);
    this.fvrVehicle1Form
      .get('vehicleCondition')
      .setValue(fvrAssetDetail.vehicleCondition);
    this.fvrVehicle1Form
      .get('inspectedVehiclePlace')
      .setValue(fvrAssetDetail.verificationPlace);
    this.fvrVehicle1Form.get('bodyType').setValue(fvrAssetDetail.vehicleBody);
    this.fvrVehicle1Form
      .get('bodyLength')
      .setValue(fvrAssetDetail.vehicleBodySize);
    this.fvrVehicle1Form
      .get('nationalPermitValidity')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.permitExpiryDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrVehicle1Form
      .get('statePermitValidity')
      .setValue(
        this.utilityService.transformDate(
          String(fvrAssetDetail!.permitExpiryDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrVehicle1Form
      .get('vehiclePresentOwner')
      .setValue(fvrAssetDetail.vehicleOwnerName);
    this.fvrVehicle1Form
      .get('engineCondition')
      .setValue(fvrAssetDetail.vehicleEngineCondition);
    this.fvrVehicle1Form
      .get('verifiedDuplicateKey')
      .setValue(fvrAssetDetail.duplicateKey);
  }

  clear() {
    this.loaderService.showLoader();
    this.fvrVehicleLeadForm.reset();
    this.fvrVehicleProspectForm.reset();
    this.fvrVehicle1Form.reset();
    this.loaderService.hideLoader();
  }

  openMaximizeWindow(card: IFvrDocument) {
    let index = this.vehicleImages.findIndex(
      (s) => s.documentDescription == card.documentDescription
    );
    this.dialog.open(CarouselHostComponent, {
      data: {
        images: this.vehicleImages,
        index: index,
      },
    });
  }
}
