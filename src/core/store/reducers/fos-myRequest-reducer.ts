import {createReducer, on} from "@ngrx/store";
import {globalState} from "../globalState";
import {
  actionMyRequestClear, actionMyRequestSetColumns,
  actionMyRequestSetRecords,
  actionMyRequestSetRequester,
  actionMyRequestSetSearchParams,
  actionMyRequestSetStatus, actionMyRequestSetSubmittedDate, actionSetSearchPayload
} from "../actions/fos-myRequest-actions";
import IFOSPageState from "../../interfaces/store/IFOSPageState";
import {state} from "@angular/animations";

/*
* Reducer for MyRequest
* **/
const myRequestReducer = createReducer(
  globalState.pages.find((s: IFOSPageState) => s.key === 'myRequest')?.value,
  on(actionMyRequestSetRequester, (state, requesterData) => ({
      ...state,
    requester : requesterData.requester
  })),
  on(actionMyRequestSetStatus, (state, statusData) => ({
    ...state,
    status : statusData.status
  })),
  on(actionMyRequestSetSearchParams, (state, searchParam) => ({
   ...state,
   searchParam:{
     searchKey : searchParam.searchParam.searchKey,
     searchText: searchParam.searchParam.searchText
   }
  })),
  on(actionMyRequestSetSubmittedDate, (state, submittedDateData) =>({
    ...state,
    submittedDate :{
      startDate: submittedDateData.submittedDate.startDate,
      endDate: submittedDateData.submittedDate.endDate
    }
  })),
  on(actionMyRequestSetRecords, (state, recordData) => ({
    ...state,
    records: recordData.records
  })),
  on(actionMyRequestClear, (state, ...args) => ({
    ...state,
    //status : args[0].status, //Note : When clear action triggers, called will send the default status based on the roles
    submittedDate :{
      startDate:'',
      endDate:''
    },
    searchParam:{
      searchText:'',
      searchKey:''
    },
    requester : args[0].requester //Note : When clear action triggers, called will send the with selected false
  })),
  on(actionMyRequestSetColumns, (state, columns) =>({
    ...state,
    columns: columns
  })),
  on(actionSetSearchPayload, (state, payloadData)=>({
    ...state,
    payload: payloadData.payload
  }))
);

export default myRequestReducer;
