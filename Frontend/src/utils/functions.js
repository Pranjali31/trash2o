import {brandDropdownData, categoryDropdownData} from '../utils/data';

export const calculateRewardPoints = category => {
  switch (category) {
    case '2':
      return 5;
    case '9':
      return 15;
    case '12':
      return 15;
    case '14':
      return 10;
    case '15':
      return 20;
    default:
      return 1;
  }
};

export const getBrandName = value => {
  return brandDropdownData.find(item => {
    return item.value === value;
  });
};

export const getCategoryName = value => {
  return categoryDropdownData.find(item => {
    return item.value === value;
  });
};
