import {createReducer, on} from "@ngrx/store";
import {globalState} from "../globalState";
import {
  actionCcRequestSetBasicInfo,
  actionCcRequestSetComment,
  actionCcRequestSetFscgAccounts,
  actionCcRequestSetInterestedParties,
  actionCcRequestSetQuestionAnswers,
  actionCcRequestViewSetInterestedParties,
  actionCcRequestViewSetPrevConflictChecks,
  actionCcRequestViewSetSubsequentConflictChecks
} from "../actions/fos-ccRequest-actions";
import IFOSPageState from "../../interfaces/store/IFOSPageState";



/**
 * Reducer for storing Page level info for CC Request
 */
export const ccRequestViewReducer = createReducer(
  globalState.pages.find((s: IFOSPageState) => s.key === 'viewRequest')?.value,
  on(actionCcRequestViewSetPrevConflictChecks, (state, prevConflictCheckData)=>({
    ...state,
    prevConflictCheck: [...prevConflictCheckData.prevConflictChecks]
  })),
  on(actionCcRequestViewSetSubsequentConflictChecks, (state, subsequentConflictCheckData)=>({
    ...state,
    subsequentConflictCheck:[...subsequentConflictCheckData.subsequentConflictChecks]
  })),
  on(actionCcRequestViewSetInterestedParties, (state, interestedPartyDate)=>({
    ...state,
    interestedParties:[...interestedPartyDate.interestedParties]
  })),
)
