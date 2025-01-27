import IFOSTableColumn from '../../IFOSTableColumn';
// import {IFOSButtonProps} from "../../IFOSButtonProps";
import { FOSPageViewMode } from '../../../common/enum';

/**
 * Interface for Branch Locations
 */
export interface IFOBranchLocation {
  locationId: number;
  locationName: string;
}

/**
 * Interface for Lookup.
 */
export interface IFOSLookup {
  lookupTypeId: number;
  lookupTypeDescription: string;
  lookupValueId: number;
  lookupValueDescription: string;
}

export interface IFOSUserReportingLookup {
  userID: number;
  userName: string;
}
/**
 * Interface for basic info
 */
export interface IFOSRequestBasicInfo {
  requestId: number;
  requestDate: string;
  dealNumber: string;
  dealName: string;
  lobName: string;
  industryGroup: string;
  dealStage: string;
  clientNames: string;
  subjectNames: string;
  statusName: string;
  requesterName: string;
  isIncremental: boolean;
  isNdaActive: boolean;
  isRetainedInCourt: boolean;
  hasAdverseClients: boolean;

  jobType: string; // Todo - Need to check this
  dealType: string; // Todo - Need to check this
}

/**
 * Interface for Interested Parties for New/View request
 */
export interface IFOSInterestedParty {
  tableSettings: IFOSInterestedPartyTableSettings; // Note: Filter Type and Actions needs to be set from Parent component
  data: IFOSInterestedPartyData[]; // Todo - While Integrating with API, sort the data by interested party name
  // buttons: IFOSButtonProps[];
  viewMode: FOSPageViewMode;
}

/**
 * Interface for Interested Party Table Settings
 */
export interface IFOSInterestedPartyTableSettings {
  columnConfig: IFOSTableColumn[];
  paginator: boolean;
  rowsPerPageOptions: number[];
  rowsPerPages: number;
  sortField: string;
  sortOrder: number;
}

/**
 * Interface for Interested party data
 */
export interface IFOSInterestedPartyData {
  id: number;
  companyName: string;
  individualPrefix: string;
  individualFirstName: string;
  individualLastName: string;
  individualMiddleName: string;
  individualSuffix: string;
  explanation: string;
  position: string;
  interestedPartyName: string;
}

/**
 * Interface for Matched Companies
 */
export interface IFOSMatchedCompanies extends IFOSInterestedPartyData {}

/**
 *
 */
export interface IFOSInterestedPartyPageView {
  pageNumber: number;
  pageData: IFOSInterestedPartyData[];
}

/**
 * Interface for Prev and Subsequent Conflict Checks
 */
export interface IFOSConflictCheck {
  requestTypeName: string;
  isIncremental: boolean;
  submittedDate: string;
  statusName: string;
  requestId: number;
}

/**
 * Interface for FSCG Account
 */
export interface IFOSFscgAccount {
  requestId: number;
  accountId: number;
  accountName: string;
}

/**
 * Interface for Question Answers
 */
export interface IFOSQuestionAnswer {
  questionId: number;
  questionText: string;
  answerText: string;
  answerExplanation: string;
  requestId: number;
}

/**
 * Interface for Comment History
 */
export interface IFOSCommentHistory {
  comment: string;
}

/**
 * Interface for View Request Page
 */
export interface IFOSViewRequestPage {
  prevConflictCheck: IFOSConflictCheck[];
  subsequentConflictCheck: IFOSConflictCheck[];
  interestedParties: IFOSInterestedPartyPageView[];
}

export interface IBranchLocationRequest {
  userId?: number;
  companyId?: number;
  lobId?: number;
  isActive?: boolean;
}

export interface ICustomerProspectRequest {
  userId?: number;
  companyId?: number;
  prospectId?: number;
  mobileNumber?: string;
  aadharNumber?: string;
  panNumber?: string;
}

export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: number;
  stateId: number;
  countryId: number;
  pincode: string;
}
export interface ICustomerProspectData {
  companyId?: number;
  prospectId?: number;
  prospectCode?: string;
  locationId?: number;
  locationDescription?: string;
  dateofBirth?: Date;
  prospectDate?: Date;
  prospectTypeId?: number;
  customerId?: number;
  customerCode?: string;
  genderId?: number;
  genderName?: string;
  prospectName?: string;
  mobileNumber?: string;
  alternateMobileNumber?: string;
  website?: string;
  email?: string;
  communicationAddress?: IAddress;
  permanentAddress?: IAddress;
  aadharNumber?: string;
  aadharImagePath?: string;
  panNumber?: string;
  panNumberImagePath?: string;
  prospectImagePath?: string;
}

export interface ICreateProspectRequest {
  userId: number;
  prospect: ICustomerProspectData;
}

export interface IUserLevelLookupRequest {
  userId?: number;
  companyId?: number;
}

export interface IUserReportingLevelLookupRequest {
  userId?: number;
  companyId?: number;
  PrefixText?: string;
  LOB_ID?:number;
  location_ID?:number;
}

export interface IUserDesignationLookupRequest {
  companyId?: number;
}

export interface IExistinghUserRequest {
  userId?: number;
  companyId?: number;
}

export interface IExistinghUserRequestTranslander {
  userId?: number;
  companyId?: number;
}

export interface IExistinghUserRequestTranslanderData {
  userID?: number;
  userCode?: string;
  userName?: string;
  emailID?: string;
  designation?: string;
  userlevel?: string;
  // mobileNumber?: string;
  // companyId?: string;
}

export interface IExistinghUserRequestData {
  companyId?: number;
  userID?: number;
  userCode?: string;
  userName?: string;
  genderId?: number;
  genderName?:string;
  password?: string;
  doj?: Date;
  relivingDate?:Date;
  mobileNumber?: string;
  emergencycontactNumber?: string;
  designation?: number;
  userLevelID?: number;
  userLevel?:string;
  reportingNextlevel?: number;
  ReportingGHigherLevel?:string;
  marutialStatusDiscription?:string;
  userGroup?: number;
  emailID?: string;
  dateofbirth?: Date;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  maritialID?: number;
  aadharNumber?: string;
  panNumber?: number;
  address?: string;
  userImagepath?: string;
  isActive?: number;
}

export interface IExistinghUserRequestDatas {
  companyId?: number;
  userID?: number;
  userCode?: string;
  userName?: string;
  genderId?: number;
  genderName?:string;
  password?: string;
  doj?: Date;
  relivingDate?:Date;
  mobileNumber?: string;
  emergencycontactNumber?: string;
  designation?: number;
  userLevelID?: number;
  userLevel?:string;
  reportingNextlevel?: number;
  ReportingGHigherLevel?:string;
  marutialStatusDiscription?:string;
  userGroup?: number;
  emailID?: string;
  dateofbirth?: Date;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  maritialID?: number;
  aadharNumber?: string;
  panNumber?: number;
  address?: string;
  userImagepath?: string;
  isActive?: number;
}
export interface IInsertUserDetails {
  companyId?: number;
  userID?: number;
  userCode?: string;
  userName?: string;
  genderId?: number;
  password?: string;
  doj?: Date;
  mobileNumber?: string;
  emergencycontactNumber?: number;
  designation?: string;
  userLevelID?: number;
  relivingDate?:Date;
  reportingNextlevel?: number;
  userGroup?: number;
  emailID?: string;
  dateofbirth?: Date;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  maritialID?: number;
  aadharNumber?: string;
  panNumber?: string;
  address?: string;
  userImagepath?: string;
  userImageContent?:string;
  isActive?: boolean;
  createdBy?: number;
  errorCode?: number;
}

export interface IHierarchyLookup {
  CompanyId?: number;
  // Location_Description?: string;
  // Is_Active?: number;
  // Hierarchy?: number;

}

export interface ICorporateLookup {
  Parent_ID?: number;
  Company_ID?: number;
  
}

export interface GetEXistingLocationMasterDetails {
  location_ID?:number;
  Company_ID?: number;
  
}

export interface IHierarchyLookup {
  CompanyId?: number;
  

}
export interface IHierarchyLookupDetails {
  company_ID?: number;
  location_Description?: string;
  created_By?: number;
  hierarchy?: number;

}

export interface GerLoctionTypes{
  hierarchy_ID?:number;
  company_ID?:number;
  location_Code?:string;
  location_Name?:string;
  location_ID?:number;
}
export interface InsertLocationMaster {
  Location_ID?: number;
  Company_ID?: number;
  Hierarchy_ID?: number;
  Parent_ID?: number;
  Location_Code?: string;
  Location_Name?: string;
  Address?: string;
  landMark?: string;
  State_ID?: number;
  Country_ID?: number;
  pincode?: string;
  Telephone_Number?: string;
  Mobile_Number?: string;
  Email_ID?: string;
  Is_Active?: number;
  Is_Operational?: number;
  createdBy?: number;
  createdOn?: number;
  modifiedBy?: number;
  errorCode?: number;

}

export interface GetInsertedtLocationMaster {
  location_ID?: number;
  company_ID?: number;
  hierarchy_ID?: number;
  parent_ID?: number;
  location_Code?: string;
  location_Name?: string;
  address?: string;
  landMark?: string;
  state_ID?: number;
  country_ID?: number;
  pincode?: string;
  telephone_Number?: string;
  mobile_Number?: string;
  email_ID?: string;
  is_Active?: number;
  is_Operational?: number;
  createdBy?: number;
  createdOn?: number;
  modifiedBy?: number;

}

