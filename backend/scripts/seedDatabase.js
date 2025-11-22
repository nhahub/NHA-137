const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
// Note: Make sure your .env file has the correct MONGODB_URI
dotenv.config({ path: './.env' }); 

const User = require('../models/User');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const sampleData = {
  users: [
    {
      firstName: 'Galal',
      lastName: 'Al-Muslimani',
      email: 'admin@autologic.com',
      phone: '1234567890',
      password: 'admin123456',
      role: 'admin',
      isActive: true
    },
    {
      firstName: 'John',
      lastName: 'Technician',
      email: 'tech@autologic.com',
      phone: '0987654321',
      password: 'user123456',
      role: 'technician',
      isActive: true
    },
    {
      firstName: 'Sarah',
      lastName: 'Customer',
      email: 'sarah@example.com',
      phone: '1122334455',
      password: 'user123456',
      role: 'user',
      isActive: true
    },
    {
      firstName: 'Mike',
      lastName: 'Driver',
      email: 'mike@example.com',
      phone: '5544332211',
      password: 'user123456',
      role: 'user',
      isActive: true
    }
  ],

  services: [
    {
      name: 'Full Engine Diagnostics',
      description: 'Complete computer diagnostics check to identify engine issues, sensor failures, and performance problems.',
      category: 'Diagnostic',
      price: 80,
      duration: 60,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1487754180477-0177ec5234eb?w=800', publicId: 'seed-1', alt: 'Diagnostics' }]
    },
    {
      name: 'Synthetic Oil Change',
      description: 'Premium synthetic oil change including oil filter replacement and fluid top-up.',
      category: 'Oil',
      price: 60,
      duration: 45,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', publicId: 'seed-2', alt: 'Oil Change' }]
    },
    {
      name: 'Brake Pad Replacement',
      description: 'Front or rear brake pad replacement with ceramic pads. Includes rotor inspection.',
      category: 'Brakes',
      price: 150,
      duration: 90,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800', publicId: 'seed-3', alt: 'Brakes' }]
    },
    {
      name: 'Tire Rotation & Balance',
      description: 'Extend your tire life with professional rotation and computer balancing.',
      category: 'Tires',
      price: 40,
      duration: 45,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?w=800', publicId: 'seed-4', alt: 'Tires' }]
    },
    {
      name: 'Battery Replacement',
      description: 'Installation of a new premium battery with a 3-year warranty. Includes charging system check.',
      category: 'Electrical',
      price: 120,
      duration: 30,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1625718675738-7977c22e448d?w=800', publicId: 'seed-5', alt: 'Battery' }]
    },
    {
      name: 'AC Recharge Service',
      description: 'Refrigerant evacuation and recharge to keep your air conditioning ice cold.',
      category: 'AC',
      price: 100,
      duration: 60,
      isActive: true,
      images: [{ url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800', publicId: 'seed-6', alt: 'AC' }]
    }
  ],

  blogs: [
    {
      title: '5 Signs Your Brakes Need Replacing',
      slug: '5-signs-brakes-need-replacing',
      excerpt: 'Squeaking noises? Soft pedal? Learn the warning signs of worn brake pads.',
      content: 'Brakes are the most critical safety feature of your car. Here are the top 5 signs they need attention: 1. Squealing or grinding noises. 2. Vibration when braking. 3. Taking longer to stop. 4. The brake light is on. 5. The car pulls to one side.',
      category: 'Maintenance',
      tags: ['brakes', 'safety', 'maintenance'],
      status: 'published',
      isPublic: true,
      isFeatured: true,
      featuredImage: { url: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800', publicId: 'seed-blog-1', alt: 'Brakes' }
    },
    {
      title: 'How Often Should You Change Your Oil?',
      slug: 'how-often-oil-change',
      excerpt: 'Is the 3,000-mile rule still valid? We bust common oil change myths.',
      content: 'Modern engines and synthetic oils have changed the rules. While the old rule was every 3,000 miles, most modern cars can go 5,000 to 7,500 miles between changes. Always check your owner\'s manual for the definitive answer.',
      category: 'Tips',
      tags: ['oil', 'engine', 'tips'],
      status: 'published',
      isPublic: true,
      isFeatured: true,
      featuredImage: { url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', publicId: 'seed-blog-2', alt: 'Oil' }
    },
    {
      title: 'Winter Car Care Guide',
      slug: 'winter-car-care-guide',
      excerpt: 'Prepare your vehicle for the cold months with this essential checklist.',
      content: 'Winter can be tough on cars. Make sure to: 1. Check your battery. 2. Inspect tires (consider winter tires). 3. Check antifreeze levels. 4. Replace wiper blades. 5. Keep your gas tank at least half full.',
      category: 'Guides',
      tags: ['winter', 'safety', 'guide'],
      status: 'published',
      isPublic: true,
      isFeatured: false,
      featuredImage: { url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800', publicId: 'seed-blog-3', alt: 'Winter' }
    }
  ],

  contacts: [
    {
      name: 'John Doe',
      email: 'johndoe@test.com',
      phone: '1234567890',
      subject: 'Inquiry about tire pricing',
      message: 'Hi, do you have Michelin tires for a 2020 Honda Civic?',
      type: 'general',
      status: 'new',
      priority: 'medium'
    },
    {
      name: 'Jane Smith',
      email: 'jane@test.com',
      phone: '0987654321',
      subject: 'Appointment Cancellation',
      message: 'I need to cancel my appointment for tomorrow please.',
      type: 'support',
      status: 'resolved',
      priority: 'high'
    }
  ]
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // 1. Clear Data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Blog.deleteMany({});
    await Booking.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // 2. Create Users
    const users = [];
    for (const userData of sampleData.users) {
      const user = new User(userData);
      // Hash password manually since we might bypass pre-save if using insertMany,
      // but here we use save() so the model hook will handle hashing.
      await user.save(); 
      users.push(user);
    }
    console.log(`👤 Created ${users.length} users`);

    // 3. Create Services
    const services = await Service.insertMany(sampleData.services);
    console.log(`🔧 Created ${services.length} services`);

    // 4. Create Blogs (Assign to Admin)
    const admin = users.find(u => u.role === 'admin');
    const blogsData = sampleData.blogs.map(b => ({ ...b, author: admin._id }));
    await Blog.insertMany(blogsData);
    console.log(`📝 Created ${blogsData.length} blogs`);

    // 5. Create Contacts
    await Contact.insertMany(sampleData.contacts);
    console.log(`gu Created ${sampleData.contacts.length} contacts`);

    // 6. Create Bookings (Randomly assign users to services)
    const customer = users.find(u => u.email === 'sarah@example.com');
    const technician = users.find(u => u.role === 'technician');
    
    // Booking 1: Pending
    await Booking.create({
      customer: customer._id,
      service: services[0]._id, // Diagnostics
      appointmentDate: new Date(Date.now() + 86400000), // Tomorrow
      appointmentTime: '10:00',
      status: 'pending',
      estimatedCost: services[0].price,
      car: { make: 'Toyota', model: 'Camry', year: 2019 },
      issue: { description: 'Check engine light is on' }
    });

    // Booking 2: Confirmed (Assigned)
    await Booking.create({
      customer: customer._id,
      service: services[1]._id, // Oil Change
      appointmentDate: new Date(Date.now() + 172800000), // Day after tomorrow
      appointmentTime: '14:00',
      status: 'confirmed',
      technician: technician._id,
      estimatedCost: services[1].price,
      car: { make: 'Honda', model: 'Civic', year: 2021 },
      issue: { description: 'Regular maintenance' }
    });

    console.log(`📅 Created 2 sample bookings`);
    console.log('✅ Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// Run
const main = async () => {
  await connectDB();
  await seedDatabase();
  process.exit(0);
};

if (require.main === module) {
  main();
}