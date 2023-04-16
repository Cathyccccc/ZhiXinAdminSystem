import ajax from '../http';

export const getRewardAndPunishment = (params) => {
  return ajax.get('/rewardAndPunishment', params)
}
