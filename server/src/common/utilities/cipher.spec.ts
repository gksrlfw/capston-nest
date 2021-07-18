import encrypt, { oldEiMS } from '@common/utilities/cipher';
// import * as bcrypt from 'bcrypt';

describe('cipher', () => {
  it('old eims', () => {
    const encrypted = encrypt('tmxmflrtm55@@', oldEiMS);
    expect(encrypted).toEqual('*EC7CF6A49BC427D73E624A361527DE47BC377330');
  });

  it('hash', async () => {
    // const salt = await bcrypt.genSalt();
    // const hashed = await bcrypt.hash('yobi', salt);
    // const isValid = await bcrypt.compare('yobi', hashed);

    // expect(isValid).toBeTruthy();
  });
});
