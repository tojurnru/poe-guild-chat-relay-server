import { AxiosError, AxiosResponse } from 'axios';

import logger from '../controllers/logger';

export const axiosErrorHandler = (error: AxiosError) => {
  const { data = '' } = error.response as AxiosResponse;
  logger.error(`Axios Response Data: ${JSON.stringify(data, null, 2)}`);
};
