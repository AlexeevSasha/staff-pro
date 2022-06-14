import {get, patch, remove} from "../../baseRequest";
import {DraftForm, IDrafts} from "./draftsDto";


export const getAllDraftsService = (): Promise<IDrafts[]> => get('drafts')
export const getChangeByIDDraftService = (id: number, data: DraftForm): Promise<IDrafts> => patch(`drafts/${id}`, JSON.stringify(data))
export const deleteByIDDraftService = (id: number): Promise<void> => remove(`drafts/${id}`)