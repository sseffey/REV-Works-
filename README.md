# REV Works — Backend 

## تشغيل المشروع

```bash
cd backend
npm install
npm run sefey
```

## الـ API Endpoints

### Auth
| Method | URL | الوصف |
|--------|-----|-------|
| POST | /api/auth/register | تسجيل مستخدم جديد |
| POST | /api/auth/login | تسجيل الدخول |

### Cars
| Method | URL | الوصف | الصلاحية |
|--------|-----|-------|---------|
| GET | /api/cars | كل السيارات | الجميع |
| GET | /api/cars/:id | تفاصيل سيارة | الجميع |
| POST | /api/cars | إضافة سيارة | Admin |
| PUT | /api/cars/:id | تعديل سيارة | Admin |
| DELETE | /api/cars/:id | حذف سيارة | Admin |

### Orders
| Method | URL | الوصف | الصلاحية |
|--------|-----|-------|---------|
| POST | /api/orders | إنشاء طلب | Customer |
| GET | /api/orders/my | طلباتي | Customer |
| GET | /api/orders | كل الطلبات | Staff/Admin |
| PATCH | /api/orders/:id/status | تحديث الحالة | Staff/Admin |
| DELETE | /api/orders/:id | إلغاء طلب | Customer |

## التقنيات
- Node.js + Express
- MongoDB + Mongoose
- JWT + joi + bcryptjs
