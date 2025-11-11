// تطبيق معرض الرسومات - يعمل بدون PHP
class ArtGallery {
    constructor() {
        this.storageKey = 'artGalleryData';
        this.students = this.loadFromStorage();
        this.init();
    }

    init() {
        console.log('🚀 معرض الرسومات جاهز للعمل!');
        this.setupEventListeners();
    }

    // تحميل البيانات من localStorage
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('خطأ في تحميل البيانات:', error);
        }
        
        // بيانات افتراضية إذا لم توجد بيانات محفوظة
        return [
            {
                "id": 1,
                "name": "نورة أحمد",
                "phone": "0500000001",
                "wants_drawing": true,
                "drawing_completed": false,
                "created_at": "2025-01-15T10:00:00.000Z",
                "info_completed": true,
                "hair_color": "أسود",
                "eye_color": "بني",
                "favorite_color": "#2c3e50",
                "skin_tone": "قمحي",
                "hair_style": "طويل ومستقيم",
                "clothing": "عباية سوداء",
                "additional_notes": "أحب الألوان الدافئة"
            },
            {
                "id": 2,
                "name": "فاطمة محمد",
                "phone": "0500000002",
                "wants_drawing": true,
                "drawing_completed": true,
                "created_at": "2025-01-16T11:30:00.000Z",
                "info_completed": true,
                "hair_color": "بني",
                "eye_color": "أخضر",
                "favorite_color": "#d4af37",
                "skin_tone": "فاتح",
                "hair_style": "قصير ومموج",
                "clothing": "جينس وبلوزة",
                "additional_notes": "الرسمة كانت رائعة!",
                "drawing_path": "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=رسمة+فاطمة"
            }
        ];
    }

    // حفظ البيانات في localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.students));
            console.log('💾 تم حفظ البيانات بنجاح');
            return true;
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
            return false;
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // تأثيرات الكروت
        this.setupCardEffects();
        
        // التحقق من الملفات
        this.setupFileValidation();
        
        // تأثيرات الأزرار
        this.setupButtonEffects();
    }

    // تأثيرات الكروت
    setupCardEffects() {
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.art-card, .card, .step');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // التحقق من الملفات
    setupFileValidation() {
        document.addEventListener('DOMContentLoaded', () => {
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(fileInput => {
                fileInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        if (file.size > maxSize) {
                            showMessage('حجم الملف كبير جداً. الحد الأقصى 5MB', 'error');
                            this.value = '';
                        }
                        
                        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                        if (!validTypes.includes(file.type)) {
                            showMessage('نوع الملف غير مدعوم. يرجى رفع صورة (JPEG, PNG, GIF, WebP)', 'error');
                            this.value = '';
                        }
                    }
                });
            });
        });
    }

    // تأثيرات الأزرار
    setupButtonEffects() {
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    if (this.type !== 'submit') {
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    }
                });
            });

            // تحسين تجربة النماذج
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    if (submitBtn && !submitBtn.disabled) {
                        const originalText = submitBtn.innerHTML;
                        submitBtn.innerHTML = 'جاري المعالجة... ⏳';
                        submitBtn.disabled = true;
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 3000);
                    }
                });
            });
        });
    }

    // إضافة طالبة جديدة
    addStudent(studentData) {
        const newStudent = {
            id: this.generateId(),
            name: studentData.name,
            phone: studentData.phone,
            wants_drawing: studentData.wants_drawing,
            drawing_completed: false,
            created_at: new Date().toISOString(),
            info_completed: !studentData.wants_drawing // إذا ما تبي رسمة، تعتبر المعلومات مكتملة
        };
        
        this.students.push(newStudent);
        this.saveToStorage();
        
        console.log('✅ تم إضافة طالبة جديدة:', newStudent);
        return newStudent;
    }

    // تحديث معلومات الطالبة
    updateStudent(studentId, updatedData) {
        const studentIndex = this.students.findIndex(s => s.id == studentId);
        if (studentIndex !== -1) {
            this.students[studentIndex] = {
                ...this.students[studentIndex],
                ...updatedData
            };
            this.saveToStorage();
            console.log('✏️ تم تحديث الطالبة:', this.students[studentIndex]);
            return this.students[studentIndex];
        }
        return null;
    }

    // البحث عن طالبات
    searchStudents(searchTerm) {
        return this.students.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            student.wants_drawing
        );
    }

    // الحصول على جميع الطالبات
    getAllStudents() {
        return this.students;
    }

    // الحصول على طالبة بواسطة ID
    getStudentById(id) {
        return this.students.find(student => student.id == id);
    }

    // توليد ID جديد
    generateId() {
        return this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    }

    // الحصول على إحصائيات
    getStats() {
        const totalStudents = this.students.length;
        const drawingRequests = this.students.filter(s => s.wants_drawing).length;
        const completedInfo = this.students.filter(s => s.info_completed).length;
        const completedDrawings = this.students.filter(s => s.drawing_completed).length;

        return {
            totalStudents,
            drawingRequests,
            completedInfo,
            completedDrawings
        };
    }

    // تصدير البيانات (للاستخدام المستقبلي)
    exportData() {
        return JSON.stringify(this.students, null, 2);
    }

    // استيراد البيانات (للاستخدام المستقبلي)
    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            if (Array.isArray(importedData)) {
                this.students = importedData;
                this.saveToStorage();
                return true;
            }
        } catch (error) {
            console.error('خطأ في استيراد البيانات:', error);
        }
        return false;
    }
}

// وظائف المساعدة العامة
function showMessage(message, type = 'success') {
    // البحث عن حاوية الرسائل أو إنشاؤها
    let messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        const container = document.querySelector('.container');
        if (container) {
            container.prepend(messageContainer);
        } else {
            document.body.prepend(messageContainer);
        }
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'message' : 'error';
    messageDiv.textContent = message;
    messageDiv.style.animation = 'fadeIn 0.5s ease-in';
    
    messageContainer.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 5000);
}

// إضافة أنيميشن للرسائل
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .message, .error {
        animation: fadeIn 0.5s ease-in;
    }
`;
document.head.appendChild(style);

// تحسين تجربة المستخدم على الأجهزة المحمولة
function optimizeMobileExperience() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '15px';
        
        // تحسين الأداء على الجوال
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    optimizeMobileExperience();
    
    // إضافة تأثيرات إضافية للكروت
    const cards = document.querySelectorAll('.art-card, .step');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease-out';
    });

    // إضافة أنيميشن للكروت
    const cardAnimationStyle = document.createElement('style');
    cardAnimationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .art-card, .step {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(cardAnimationStyle);
});

// إنشاء نسخة عامة من التطبيق
const galleryApp = new ArtGallery();

// جعل التطبيق متاحاً globally للاستخدام في الملفات الأخرى
window.galleryApp = galleryApp;
window.showMessage = showMessage;