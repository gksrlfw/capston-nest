// import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

/**
 *
 * @param plain
 * @param algorithm
 */
const encrypt = (plain, algorithm?: (plain: string) => string): string => {
  // 전 후 처리가 필요할 경우 여기에 작성해주세요.
  if (algorithm === undefined) {
  }
  return algorithm(plain);
};

/**
 *
 */
const sha1 = (plain: string | Buffer): string => {
  const sha1 = crypto.createHash('sha1');
  sha1.update(plain);
  return sha1.digest('hex');
};

/**
 *
 * @param plain
 */
const sha1raw = (plain: string): Buffer => {
  const sha1 = crypto.createHash('sha1');
  sha1.update(plain);
  return sha1.digest();
};

/**
 * Legacy EiMS 에서 사용하던 암호화 방식
 * @param plain
 */
const oldEiMS = (plain: string): string => {
  // *EC7CF6A49BC427D73E624A361527DE47BC377330

  // 여기까지는 똑같고.
  const encrypted = sha1raw(plain);
  const reEncrypted = sha1(encrypted);

  return `*${reEncrypted.toUpperCase()}`;
};

/**
 *
 * @param plain
 */
const hash = async (plain: string) => {
  // const salt = await bcrypt.genSalt();
  // return await bcrypt.hash(plain, salt);
};

/**
 *
 */
export default encrypt;

/**
 * algorithms
 */


/**
 * 회원가입
 * salting & key stretching.
 * 
 * https://zinirun.github.io/2020/12/02/node-crypto-password/
 */
const createSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf: Buffer) => {
        if (err) reject(err);
        resolve(buf.toString('base64'));
    });
  });
}

const createHashedPassword = (password): Promise<{ password: string, salt: string }> =>
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString('base64'), salt });
    });
});

/**
 * 로그인
 */
const makePasswordHashed = (password, salt) => {
  return new Promise((res, rej) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if(err) rej(err);
      res(key.toString('base64'));
    });
  });
}

export { hash, sha1, oldEiMS, createHashedPassword, makePasswordHashed };
