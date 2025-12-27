import codeProviderList from './items/codeProviderList';
import countryList from './items/countryList';
import passwordResetQuestions from './items/passwordResetQuestionList';
import readNumberList from './items/readNumberList';
import regionList, { IRegions } from './items/regionList';
import strandDiscriminatorList from './items/strandDiscriminatorList';
import strandList from './items/strandList';

export { codeProviderList };
export { countryList };
export { passwordResetQuestions };
export { readNumberList };
export { regionList };
export { strandDiscriminatorList };
export { strandList };
export const JOB_TYPES = ['Report', 'Score', 'Summary', 'Umap'] as const;
export const STATUS_TYPES = ['Queued', 'Started', 'Completed', 'Failed', 'Canceled'] as const;

export type { IRegions };
