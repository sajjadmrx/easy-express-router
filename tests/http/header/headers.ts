import { Header } from '../../../lib/shared/interfaces/decorators/headers.interface';

export const customHeaders: Header[] = [
  { key: 'content-type', value: 'application/json' },
  { key: 'custom-header', value: 'hi' },
  { key: 'access-control-allow-origin', value: '*' }
];
