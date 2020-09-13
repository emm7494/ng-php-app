<?php
function sendError()
{
  http_response_code(405);
  echo json_encode(
    array(
      'message' => 'Request method not allowed!',
      'error' => true
    )
  );
  return false;
}
