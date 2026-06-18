<?php
// contact.php - Handles contact form submissions and sends an email
// Expected POST fields: name, email, phone, service, message

header('Content-Type: application/json; charset=utf-8');

// Helper function to sanitize input
def sanitize($data) {
    return trim(htmlspecialchars($data, ENT_QUOTES, 'UTF-8'));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Collect and sanitize inputs
$name    = sanitize($_POST['name'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone   = sanitize($_POST['phone'] ?? '');
$service = sanitize($_POST['service'] ?? '');
$message = sanitize($_POST['message'] ?? '');

// Basic validation
$errors = [];
if (empty($name))    $errors[] = 'Name is required.';
if (!$email)          $errors[] = 'A valid email address is required.';
if (empty($phone))    $errors[] = 'Phone number is required.';
if (empty($service)) $errors[] = 'Please select a service.';
if (empty($message)) $errors[] = 'Message cannot be empty.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Prepare email
$to      = 'patwaryjowel41@gmail.com'; // Replace with your actual email address
$subject = "New Consultation Request – $service";
$body    = "You have received a new consultation request from the website:\n\n".
           "Name: $name\n".
           "Email: $email\n".
           "Phone: $phone\n".
           "Service: $service\n".
           "Message:\n$message\n";
$headers = "From: $name <$email>\r\n" .
           "Reply-To: $email\r\n" .
           "Content-Type: text/plain; charset=UTF-8";

$mailSent = mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Your inquiry has been sent successfully. We will contact you soon.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
}
?>
