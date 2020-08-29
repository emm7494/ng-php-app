<?php
require_once __DIR__ . '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

class Token
{

  static function getPrivateKey()
  {
    return openssl_pkey_get_private('file://../private.pem');
//     return "-----BEGIN PRIVATE KEY-----
// MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDW70J0Jb/GeQ5I
// WeDSGJRdat96WF0UlZT5TmbrdOa6PU8DJWOgJpVSwgyQpaouv8Gun1Jcya031dCb
// uJKuZGpLAKPEqyI2Sma7w4FC4E7sGtJltoFfT0/7Zu7t2hZ0rIoMIG6v9b9EGzmB
// MLrtt52LkXzxlCQnisLqY3LjVOWV176gQFxmQi0EYXCZitk6A6exF7s1RfxoN+KL
// Eyb2bdyNOpCY2sUmmwhI+OLWi9tJ+Zv5xMjTqZbXNxVE8nCl3H+CPGuo3hZiqGj1
// ERqk4G13wmQvlLQ8V9bNEcImQ3JDjEyPWFmIetHmJbDlidULSh7gbkyl/UjJe+bZ
// G02JEeJZAgMBAAECggEBAKpwvR/ht3wqDxtsuo2glDaoQ2N/owBpxeMVOyRIZZcW
// ewuhoKklL5Ca9N/Xn2bHBU32ZZfTDhuS4IQ8D4Vfd7LWZQfWNaEbyu/mjyB7Q9qT
// QnkKCvmLqX9RFvNi2B/ZmvcW2O+MTwoxFJ7QB8vuqW4+BviDY1BAB2VbS4XektkI
// 8jIIwTuLm8M+vzaXDKVyV7Ywu3ni8GRZ5DGvJuqYXVoDUOagQbJnWxhBUUMs5O8u
// dEoEjw1Y2IL5Pp0M0TBG2cilCo0MH25iZcmHteKw1MO6dzEpDp2VrfHP93GZkg3G
// N926LLd9k6YRyHuGq+tI/iXQYEA9AT5/jhADZfI3QckCgYEA+CBRYfXkTU2MJsn+
// oEK3E65sO/TII/j7QibfEgsp3vkUczk5bBpHarybf1e+IW+IC4f5RZWl6bxjlkHX
// /hEq50IYHQnywNvopy8e1k23YVZfzA+1jnHEKkM+Hs9GLUSXNrzRI/R/LN/5E6Kf
// RPHnMAqhTNN4ZckS6ZAoHmh09kMCgYEA3cFOPUMxHtIj0y2cnqd8CeKSCB7V7eo+
// 1ytzQjMFItYkn2N3fuLEMeElzpUWc6ONW99ukK48tYx34szIeCHDElPAtYDJ/jyQ
// yFM23kD160WTITRuZPpTxvu0XLRKhPyhiJi3pgnWzZDwsVU+rjx0WpIlSAN5/j6P
// uVvRoQG2MTMCgYBvDWffREKOJqsXoUiJSdLOyD5BB2mcUA+EqAkm9kAjP6/bcj01
// GP3l08x0zjyWkmh9YLo8XqIHXv3jfkzBtcVSA87vEEjJ8KLMUNaoa9grhJETr+Q+
// gMSfdcET4QkzsYNMSG4Cfad92jCMjThjjzE920QeMnesdrY0OwT5tx7CKQKBgCIX
// JIsAeF2vmnhNi8VMJCJ05VRAQU0I9M4pTNfBdimr2Ad0yBsGi3jLjv9aJhBy9TlJ
// ePre/lA+nvOL3cmyDwYTQA3nFaZy8yMIv+ec/vFDSeIR6GK3pQdzDIAv60DUgZS5
// PYpV+uKxRH9OhotMmeqOixKuDiQKxBePyQNCexrHAoGAZ2dnV+lVdvjIx/lzcOaU
// Oy5Dz20ZBI+N5+x5cbMQERhH3yW6jIDQ5HTNztJ7y6qKAWMY8e2CuMZCrwcA6aYe
// PNEZXVI5Nptqs6IKJ4JLoQ9o/DQfl0G3seU4G7HrbQ4hNJ+aoefwUjr6eWiCcE/+
// gxU4ZfVq9rt6OAo3FD0mK+8=
// -----END PRIVATE KEY-----
// ";
  }
  static function getPublicKey()
  {
    return openssl_pkey_get_public('file://../public.pem');
//     return "-----EGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1u9CdCW/xnkOSFng0hiU
// XWrfelhdFJWU+U5m63Tmuj1PAyVjoCaVUsIMkKWqLr/Brp9SXMmtN9XQm7iSrmRq
// SwCjxKsiNkpmu8OBQuBO7BrSZbaBX09P+2bu7doWdKyKDCBur/W/RBs5gTC67bed
// i5F88ZQkJ4rC6mNy41Tllde+oEBcZkItBGFwmYrZOgOnsRe7NUX8aDfiixMm9m3c
// jTqQmNrFJpsISPji1ovbSfmb+cTI06mW1zcVRPJwpdx/gjxrqN4WYqho9REapOBt
// d8JkL5S0PFfWzRHCJkNyQ4xMj1hZiHrR5iWw5YnVC0oe4G5Mpf1IyXvm2RtNiRHi
// WQIDAQAB
// -----END PUBLIC KEY-----
// ";
  }
  static function encodePayload($payload)
  {
    return JWT::encode($payload, self::getPrivateKey(), 'RS256');
  }

  static function decodeJWT($jwt)
  {
    return JWT::decode($jwt, self::getPublicKey(), array('RS256'));
  }
}
