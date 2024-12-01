import IFOSTableColumn from "../../IFOSTableColumn";
// import {IFOSButtonProps} from "../../IFOSButtonProps";
import {FOSPageViewMode} from "../../../common/enum";

/**
 * Interface for Branch Locations
 */
export interface IFOBranchLocation{
  locationId:number;
  locationName:string;
}

/**
 * Interface for Lookup.
 */
export interface IFOSLookup{
  lookupTypeId:number;
  lookupTypeDescription:string;
  lookupValueId:number;
  lookupValueDescription:string;
}



/**
 * Interface for basic info
 */
export interface IFOSRequestBasicInfo{
  requestId: number;
  requestDate: string;
  dealNumber: string;
  dealName:string;
  lobName:string;
  industryGroup:string;
  dealStage:string;
  clientNames: string;
  subjectNames: string;
  statusName:string;
  requesterName: string;
  isIncremental:boolean;
  isNdaActive: boolean;
  isRetainedInCourt: boolean;
  hasAdverseClients: boolean;

  jobType:string; // Todo - Need to check this
  dealType: string; // Todo - Need to check this
}

/**
 * Interface for Interested Parties for New/View request
 */
export interface IFOSInterestedParty{
  tableSettings:IFOSInterestedPartyTableSettings; // Note: Filter Type and Actions needs to be set from Parent component
  data: IFOSInterestedPartyData[]; // Todo - While Integrating with API, sort the data by interested party name
  // buttons: IFOSButtonProps[];
  viewMode:FOSPageViewMode;
}

/**
 * Interface for Interested Party Table Settings
 */
export interface IFOSInterestedPartyTableSettings{
  columnConfig: IFOSTableColumn[];
  paginator: boolean;
  rowsPerPageOptions: number[];
  rowsPerPages:number;
  sortField:string;
  sortOrder:number
}

/**
 * Interface for Interested party data
 */
export interface IFOSInterestedPartyData{
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
export interface IFOSMatchedCompanies extends IFOSInterestedPartyData{

}

/**
 *
 */
export interface IFOSInterestedPartyPageView{
  pageNumber:number;
  pageData:IFOSInterestedPartyData[];
}

/**
 * Interface for Prev and Subsequent Conflict Checks
 */
export interface IFOSConflictCheck{
  requestTypeName:string;
  isIncremental:boolean;
  submittedDate:string;
  statusName:string;
  requestId:number;
}

/**
 * Interface for FSCG Account
 */
export interface IFOSFscgAccount{
  requestId: number;
  accountId: number;
  accountName: string;
}

/**
 * Interface for Question Answers
 */
export interface IFOSQuestionAnswer{
  questionId: number;
  questionText:string;
  answerText:string;
  answerExplanation:string;
  requestId:number;
}

/**
 * Interface for Comment History
 */
export interface IFOSCommentHistory{
  comment:string;
}


/**
 * Interface for View Request Page
 */
export interface IFOSViewRequestPage{
  prevConflictCheck: IFOSConflictCheck[];
  subsequentConflictCheck:IFOSConflictCheck[];
  interestedParties: IFOSInterestedPartyPageView[];
}

export interface IBranchLocationRequest{
  userId?: number;
  companyId?: number;
  lobId?:number;
  isActive?:boolean;
}


export interface ICustomerProspectRequest{
  userId?: number;
  companyId?: number;
  prospectId?: number;
  mobileNumber?: string;
  aadharNumber?: string;
  panNumber?: string;
}


export interface IAddress{
  addressLine1:string;
  addressLine2:string;
  landmark:string;
  city:number;
  stateId:number;
  countryId:number;
  pincode:string;

}
export interface ICustomerProspectData{
  companyId?: number;
  prospectId?: number;
  prospectCode?: string;
  locationId?: number;
  locationDescription?: string;
  dateofBirth?: Date;
  prospectDate?:Date;
  prospectTypeId?:number;
  customerId?:number;
  customerCode?:string;
  genderId?:number;
  genderName?:string;
  prospectName?:string;
  mobileNumber?:string;
  alternateMobileNumber?:string;
  website?:string;
  email?:string;
  communicationAddress?:IAddress;
  permanentAddress?:IAddress;
  aadharNumber?:string;
  aadharImagePath?:string;
  panNumber?:string;
  panNumberImagePath?:string;
  prospectImagePath?:string;
}

export interface ICreateProspectRequest{
  userId:number,
  prospect:ICustomerProspectData
}