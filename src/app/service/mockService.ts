import * as _ from 'lodash';
import { dataList } from '../mock_data';

const findDataByRequest = (body) => {
  const { pageNumber, pageSize, sortBy, sortOrder, groupBy } = body;
  const fromIndex = pageNumber * pageSize;
  const toIndex = (pageNumber + 1) * pageSize;
  const finalData = mockService.getListByFilters(sortBy, sortOrder, groupBy);
  return finalData.slice(fromIndex, toIndex)
};

const mockService = {
  cacheSize: 100,
  getMockData: () => {
    return dataList;
  },
  getListByFilters: (sortBy, sortOrder, groupBy) => {
    // appy groupby, sort and filters here
    return dataList;
  },
  getDataAPI: (request) => {
    return new Promise((resolve, reject) => {
      let wait = setTimeout(() => {
        if(wait) {
          clearTimeout(wait);
        }
        const finalData = findDataByRequest(request.body);
        return resolve(finalData)
      }, 2000)
    });
  }
};

export default mockService;