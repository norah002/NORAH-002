<?php
// إعدادات InfinityFree
$host = 'sqlXXX.epizy.com'; // ضعي السيرفر اللي طالع لك
$dbname = 'if0_40359665_artfriends'; // ضعي اسم القاعدة
$username = 'if0_40359665'; // ضعي اسم المستخدم
$password = '8fg6PJ634A'; // ضعي كلمة المرور

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // إذا فشل الاتصال، استخدمي JSON بدلاً من MySQL
    $data_file = 'students_data.json';
    
    // تأكد من وجود المجلدات
    if (!is_dir('uploads')) mkdir('uploads', 0777, true);
    if (!is_dir('drawings')) mkdir('drawings', 0777, true);
}
?>