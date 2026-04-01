const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const CarModel = require('./models/CarModel');
const Category = require('./models/Category');
const Option = require('./models/Option');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // مسح الداتا القديمة
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    await User.deleteMany();
    await CarModel.deleteMany();
    await Category.deleteMany();
    await Option.deleteMany();
    console.log('🗑️  تم مسح الداتا القديمة');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // إنشاء المستخدمين
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@customorder.com',
        password: '123456',
        role: 'admin'
      },
      {
        name: 'Staff User',
        email: 'staff@customorder.com',
        password: '123456',
        role: 'staff'
      },
      {
        name: 'Omar Ahmed',
        email: 'omar@customorder.com',
        password: '123456',
        role: 'customer'
      },
      {
        name: 'Sara Mohamed',
        email: 'sara@customorder.com',
        password: '123456',
        role: 'customer'
      }
    ]);
    console.log('👤 تم إنشاء المستخدمين');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // إنشاء السيارات
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const cars = await CarModel.create([
      {
        name: 'Toyota Camry',
        basePrice: 850000,
        description: 'سيارة عائلية مريحة واقتصادية بتصميم أنيق',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600',
        isAvailable: true
      },
      {
        name: 'BMW 3 Series',
        basePrice: 1500000,
        description: 'سيارة رياضية فاخرة بأداء عالي وتصميم مميز',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600',
        isAvailable: true
      },
      {
        name: 'Mercedes C-Class',
        basePrice: 1800000,
        description: 'الفخامة والأداء في سيارة واحدة مع أحدث التقنيات',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600',
        isAvailable: true
      },
      {
        name: 'Hyundai Tucson',
        basePrice: 720000,
        description: 'SUV عملي وعصري مناسب للعائلة والمغامرات',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600',
        isAvailable: true
      }
    ]);
    console.log('🚗 تم إنشاء السيارات');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Toyota Camry — Categories & Options
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const camryCatColor = await Category.create({ name: 'اللون', carModel: cars[0]._id });
    const camryCatEngine = await Category.create({ name: 'المحرك', carModel: cars[0]._id });
    const camryCatInterior = await Category.create({ name: 'الداخلية', carModel: cars[0]._id });
    const camryCatExtras = await Category.create({ name: 'إضافات', carModel: cars[0]._id });

    await Option.create([
      // ألوان
      { name: 'أبيض لؤلؤي', extraPrice: 0, category: camryCatColor._id },
      { name: 'أسود جيت', extraPrice: 5000, category: camryCatColor._id },
      { name: 'فضي معدني', extraPrice: 3000, category: camryCatColor._id },
      { name: 'أحمر ياقوت', extraPrice: 8000, category: camryCatColor._id },
      // محركات
      { name: '2.0L عادي', extraPrice: 0, category: camryCatEngine._id },
      { name: '2.5L هايبرد', extraPrice: 45000, category: camryCatEngine._id },
      // داخلية
      { name: 'قماش عادي', extraPrice: 0, category: camryCatInterior._id },
      { name: 'جلد بيج', extraPrice: 15000, category: camryCatInterior._id },
      { name: 'جلد أسود', extraPrice: 15000, category: camryCatInterior._id },
      // إضافات
      { name: 'بدون إضافات', extraPrice: 0, category: camryCatExtras._id },
      { name: 'فتحة سقف', extraPrice: 12000, category: camryCatExtras._id },
      { name: 'شاشة خلفية', extraPrice: 8000, category: camryCatExtras._id },
    ]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BMW 3 Series — Categories & Options
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const bmwCatColor = await Category.create({ name: 'اللون', carModel: cars[1]._id });
    const bmwCatEngine = await Category.create({ name: 'المحرك', carModel: cars[1]._id });
    const bmwCatInterior = await Category.create({ name: 'الداخلية', carModel: cars[1]._id });
    const bmwCatPackage = await Category.create({ name: 'الباقة', carModel: cars[1]._id });

    await Option.create([
      // ألوان
      { name: 'Alpine White', extraPrice: 0, category: bmwCatColor._id },
      { name: 'Sapphire Black', extraPrice: 8000, category: bmwCatColor._id },
      { name: 'Mineral Grey', extraPrice: 5000, category: bmwCatColor._id },
      { name: 'Portimao Blue', extraPrice: 10000, category: bmwCatColor._id },
      // محركات
      { name: '320i — 184 حصان', extraPrice: 0, category: bmwCatEngine._id },
      { name: '330i — 258 حصان', extraPrice: 80000, category: bmwCatEngine._id },
      { name: 'M340i — 374 حصان', extraPrice: 200000, category: bmwCatEngine._id },
      // داخلية
      { name: 'قماش Sport', extraPrice: 0, category: bmwCatInterior._id },
      { name: 'جلد Vernasca', extraPrice: 25000, category: bmwCatInterior._id },
      { name: 'Merino Leather', extraPrice: 45000, category: bmwCatInterior._id },
      // باقات
      { name: 'Standard', extraPrice: 0, category: bmwCatPackage._id },
      { name: 'Sport Line', extraPrice: 35000, category: bmwCatPackage._id },
      { name: 'M Sport', extraPrice: 75000, category: bmwCatPackage._id },
    ]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Mercedes C-Class — Categories & Options
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const mercCatColor = await Category.create({ name: 'اللون', carModel: cars[2]._id });
    const mercCatEngine = await Category.create({ name: 'المحرك', carModel: cars[2]._id });
    const mercCatInterior = await Category.create({ name: 'الداخلية', carModel: cars[2]._id });
    const mercCatExtras = await Category.create({ name: 'إضافات', carModel: cars[2]._id });

    await Option.create([
      // ألوان
      { name: 'Polar White', extraPrice: 0, category: mercCatColor._id },
      { name: 'Obsidian Black', extraPrice: 9000, category: mercCatColor._id },
      { name: 'Selenite Grey', extraPrice: 7000, category: mercCatColor._id },
      { name: 'Manufaktur Red', extraPrice: 15000, category: mercCatColor._id },
      // محركات
      { name: 'C200 — 204 حصان', extraPrice: 0, category: mercCatEngine._id },
      { name: 'C300 — 258 حصان', extraPrice: 95000, category: mercCatEngine._id },
      { name: 'C43 AMG — 408 حصان', extraPrice: 280000, category: mercCatEngine._id },
      // داخلية
      { name: 'قماش عادي', extraPrice: 0, category: mercCatInterior._id },
      { name: 'جلد Artico', extraPrice: 30000, category: mercCatInterior._id },
      { name: 'Nappa Leather', extraPrice: 60000, category: mercCatInterior._id },
      // إضافات
      { name: 'بدون إضافات', extraPrice: 0, category: mercCatExtras._id },
      { name: 'Burmester Sound System', extraPrice: 20000, category: mercCatExtras._id },
      { name: 'Panoramic Roof', extraPrice: 18000, category: mercCatExtras._id },
      { name: 'AMG Night Package', extraPrice: 25000, category: mercCatExtras._id },
    ]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Hyundai Tucson — Categories & Options
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    const tucsonCatColor = await Category.create({ name: 'اللون', carModel: cars[3]._id });
    const tucsonCatEngine = await Category.create({ name: 'المحرك', carModel: cars[3]._id });
    const tucsonCatDrive = await Category.create({ name: 'نظام الدفع', carModel: cars[3]._id });
    const tucsonCatExtras = await Category.create({ name: 'إضافات', carModel: cars[3]._id });

    await Option.create([
      // ألوان
      { name: 'أبيض مطفي', extraPrice: 0, category: tucsonCatColor._id },
      { name: 'رمادي داكن', extraPrice: 3000, category: tucsonCatColor._id },
      { name: 'أزرق نيلي', extraPrice: 5000, category: tucsonCatColor._id },
      { name: 'بني برونزي', extraPrice: 5000, category: tucsonCatColor._id },
      // محركات
      { name: '2.0L بنزين', extraPrice: 0, category: tucsonCatEngine._id },
      { name: '1.6T توربو', extraPrice: 30000, category: tucsonCatEngine._id },
      { name: 'هايبرد 230 حصان', extraPrice: 55000, category: tucsonCatEngine._id },
      // نظام الدفع
      { name: 'دفع أمامي FWD', extraPrice: 0, category: tucsonCatDrive._id },
      { name: 'دفع رباعي AWD', extraPrice: 25000, category: tucsonCatDrive._id },
      // إضافات
      { name: 'بدون إضافات', extraPrice: 0, category: tucsonCatExtras._id },
      { name: 'كاميرا 360', extraPrice: 10000, category: tucsonCatExtras._id },
      { name: 'شاشة 10 بوصة', extraPrice: 8000, category: tucsonCatExtras._id },
      { name: 'مقاعد مدفأة', extraPrice: 6000, category: tucsonCatExtras._id },
    ]);

    console.log('⚙️  تم إنشاء الفئات والخيارات');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ملخص
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━
    console.log('\n🎉 تم تغذية قاعدة البيانات بنجاح!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 المستخدمين:');
    console.log('   Admin  → admin@customorder.com  | 123456');
    console.log('   Staff  → staff@customorder.com  | 123456');
    console.log('   عميل 1 → omar@customorder.com   | 123456');
    console.log('   عميل 2 → sara@customorder.com   | 123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚗 السيارات:');
    console.log('   Toyota Camry    — 850,000 جنيه');
    console.log('   BMW 3 Series    — 1,500,000 جنيه');
    console.log('   Mercedes C-Class — 1,800,000 جنيه');
    console.log('   Hyundai Tucson  — 720,000 جنيه');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ حصل خطأ:', error.message);
    process.exit(1);
  }
};

seedDatabase();
