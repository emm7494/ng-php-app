<?php
$configargs = array(
  'digest_alg' => 'sha256',
  'private_key_bits' => 2048,
  'private_key_type' => OPENSSL_KEYTYPE_RSA,
);
$privateKey = openssl_pkey_new($configargs);
openssl_pkey_export_to_file($privateKey, 'private.key');
$publicKey = openssl_pkey_get_details($privateKey);
print_r($publicKey['key']);
file_put_contents('public.key', $publicKey);
openssl_free_key($privateKey);
