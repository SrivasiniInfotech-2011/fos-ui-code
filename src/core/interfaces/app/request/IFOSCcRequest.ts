import IFOSTableColumn from "../../IFOSTableColumn";
// import {IFOSButtonProps} from "../../IFOSButtonProps";
import {FOSPageViewMode} from "../../../common/enum";

/**
 * Interface for a Conflicts Check Request
 * Note: This may grow once we have other pages like (Candidate List, Search Result, Final Disposition is prepared.)
 */
export interface IFOSCcRequest{
  basicInfo : IFOSRequestBasicInfo;
  interestedParties:IFOSInterestedPartyData[];
  fscgAccounts: IFOSFscgAccount[];
  questions:IFOSQuestionAnswer[];
  comment:IFOSCommentHistory;
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
