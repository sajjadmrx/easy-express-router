import { EasyRouter } from '../lib/easy-router';

describe('EasyRouter', function () {
  it('should Defined', () => {
    expect(EasyRouter).toBeDefined();
  });

  it('should throw error when controllers is empty', () => {
    expect(EasyRouter.initControllers).toThrowError(
      'controllers list has empty'
    );
  });
});
