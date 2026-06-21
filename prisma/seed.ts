import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@techible.io" },
    update: {},
    create: { name: "Admin", email: "admin@techible.io", password: adminPassword, role: "admin" },
  });

  // Regular user
  const userPassword = await hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@techible.io" },
    update: {},
    create: { name: "Test User", email: "user@techible.io", password: userPassword, role: "user" },
  });

  // Internships
  const internships = [
    { title: "Frontend Developer Intern", slug: "frontend-developer-intern-tcs", company: "TCS", location: "Mumbai, India", type: "skill", mode: "hybrid", stipend: "15,000/month", duration: "3 months", description: "Join TCS as a Frontend Developer Intern and work on cutting-edge web applications using React, TypeScript, and modern CSS frameworks. You will collaborate with senior engineers to build user interfaces for enterprise applications.\n\nResponsibilities:\n- Develop responsive web applications\n- Write clean, maintainable code\n- Participate in code reviews\n- Collaborate with design teams", requirements: "Currently pursuing B.Tech/MCA or equivalent\nStrong fundamentals in HTML, CSS, JavaScript\nFamiliarity with React or similar frameworks", skills: "React, TypeScript, CSS, HTML, Git", openings: 5, featured: true },
    { title: "Data Science Intern", slug: "data-science-intern-infosys", company: "Infosys", location: "Bangalore, India", type: "skill", mode: "remote", stipend: "20,000/month", duration: "6 months", description: "Work with Infosys's data science team on real-world machine learning projects. Gain hands-on experience with data preprocessing, model training, and deployment.\n\nKey Areas:\n- Natural Language Processing\n- Computer Vision\n- Predictive Analytics\n- Data Visualization", requirements: "Strong Python skills\nKnowledge of ML/DL frameworks\nBasic statistics and linear algebra", skills: "Python, TensorFlow, Pandas, SQL, Machine Learning", openings: 3, featured: true },
    { title: "Backend Engineering Intern", slug: "backend-engineering-intern-wipro", company: "Wipro", location: "Hyderabad, India", type: "skill", mode: "onsite", stipend: "18,000/month", duration: "4 months", description: "Build scalable backend services using Java Spring Boot and microservices architecture. Work on API design, database optimization, and system design.\n\nYou will learn:\n- Microservices architecture\n- RESTful API design\n- Database design and optimization\n- CI/CD pipelines", requirements: "Strong Java or Python skills\nUnderstanding of REST APIs\nBasic database knowledge", skills: "Java, Spring Boot, PostgreSQL, Docker, REST APIs", openings: 4, featured: true },
    { title: "Mobile App Development Intern", slug: "mobile-app-dev-intern-flipkart", company: "Flipkart", location: "Bangalore, India", type: "skill", mode: "hybrid", stipend: "25,000/month", duration: "6 months", description: "Join Flipkart's mobile team and work on their flagship Android/iOS applications. Build features used by millions of users daily.\n\nWhat you'll work on:\n- New feature development\n- Performance optimization\n- UI/UX improvements\n- A/B testing implementation", requirements: "Experience with React Native or Flutter\nPublished apps on Play Store/App Store is a plus\nStrong UI/UX sense", skills: "React Native, Flutter, TypeScript, Mobile Development", openings: 2, featured: true },
    { title: "DevOps Engineer Intern", slug: "devops-intern-amazon", company: "Amazon", location: "Hyderabad, India", type: "skill", mode: "onsite", stipend: "30,000/month", duration: "3 months", description: "Learn cloud infrastructure and DevOps practices at Amazon. Work with AWS services, Kubernetes, and automation tools.\n\nKey responsibilities:\n- Infrastructure as Code\n- CI/CD pipeline management\n- Monitoring and alerting\n- Cloud resource optimization", requirements: "Linux fundamentals\nBasic scripting (Bash/Python)\nAWS knowledge is a plus", skills: "AWS, Docker, Kubernetes, Linux, Terraform", openings: 3, featured: false },
    { title: "UI/UX Design Intern", slug: "uiux-design-intern-google", company: "Google", location: "Bangalore, India", type: "skill", mode: "hybrid", stipend: "35,000/month", duration: "4 months", description: "Design user experiences for Google's products. Work with cross-functional teams to create intuitive, accessible, and beautiful interfaces.", requirements: "Portfolio required\nProficiency in Figma or Sketch\nUnderstanding of design systems", skills: "Figma, UI Design, UX Research, Prototyping, Design Systems", openings: 2, featured: false },
    { title: "E-commerce Web Platform", slug: "ecommerce-platform-project", company: "ShopEase", location: "Remote", type: "project", mode: "remote", stipend: "10,000/month", duration: "8 weeks", description: "Build a complete e-commerce web platform from scratch using Next.js and Stripe. This project internship will have you creating a production-ready shopping experience.", requirements: "React/Next.js experience\nBasic understanding of payment gateways", skills: "Next.js, React, Stripe, Tailwind CSS, Prisma", openings: 5, featured: false },
    { title: "AI Chatbot Development", slug: "ai-chatbot-project", company: "BotWorks AI", location: "Remote", type: "project", mode: "remote", stipend: "12,000/month", duration: "6 weeks", description: "Develop an intelligent chatbot using LLMs and RAG architecture. Build a production chatbot that can answer domain-specific questions.", requirements: "Python experience\nBasic NLP knowledge\nFamiliarity with OpenAI API or similar", skills: "Python, LangChain, OpenAI, Vector Databases, NLP", openings: 10, featured: false },
  ];

  for (const data of internships) {
    await prisma.internship.upsert({ where: { slug: data.slug }, update: {}, create: data });
  }

  // Courses
  const courses = [
    { title: "Complete Web Development Bootcamp", slug: "complete-web-development-bootcamp", instructor: "Dr. Priya Sharma", price: 4999, duration: "12 weeks", level: "beginner", category: "Web Development", description: "Master full-stack web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive bootcamp.\n\nCurriculum covers frontend and backend development, databases, authentication, deployment, and more.", syllabus: "HTML5 & CSS3 Fundamentals\nJavaScript ES6+ Deep Dive\nReact.js & State Management\nNode.js & Express.js\nMongoDB & Mongoose\nAuthentication & Security\nDeployment & DevOps\nCapstone Project", skills: "HTML, CSS, JavaScript, React, Node.js, MongoDB", featured: true, enrolled: 1250, rating: 4.8 },
    { title: "Machine Learning with Python", slug: "machine-learning-with-python", instructor: "Prof. Amit Kumar", price: 6999, duration: "16 weeks", level: "intermediate", category: "Data Science", description: "Learn machine learning algorithms, data preprocessing, model evaluation, and deployment. Hands-on projects with real-world datasets.\n\nIncludes supervised learning, unsupervised learning, deep learning fundamentals, and MLOps.", syllabus: "Python for Data Science\nNumPy & Pandas\nData Visualization with Matplotlib\nScikit-learn Algorithms\nFeature Engineering\nDeep Learning with TensorFlow\nModel Deployment\nCapstone: Real-world ML Project", skills: "Python, Scikit-learn, TensorFlow, Pandas, Data Analysis", featured: true, enrolled: 890, rating: 4.7 },
    { title: "Cloud Computing with AWS", slug: "cloud-computing-aws", instructor: "Rajesh Verma", price: 7999, duration: "10 weeks", level: "intermediate", category: "Cloud Computing", description: "Master AWS services and cloud architecture. Prepare for AWS Solutions Architect certification while building real cloud projects.", syllabus: "AWS Fundamentals\nEC2 & Lambda\nS3 & CloudFront\nRDS & DynamoDB\nVPC & Networking\nIAM & Security\nCloudFormation\nArchitecture Best Practices", skills: "AWS, Cloud Architecture, Serverless, DevOps", featured: true, enrolled: 650, rating: 4.6 },
    { title: "React Native Mobile Development", slug: "react-native-mobile-dev", instructor: "Sneha Patel", price: 3999, duration: "8 weeks", level: "intermediate", category: "Mobile Development", description: "Build cross-platform mobile applications with React Native. Learn to create iOS and Android apps from a single codebase.", syllabus: "React Native Setup\nComponents & Styling\nNavigation\nState Management\nNative APIs\nAnimations\nApp Store Deployment\nFinal Project", skills: "React Native, JavaScript, TypeScript, Mobile Development", featured: true, enrolled: 430, rating: 4.5 },
    { title: "Introduction to Cybersecurity", slug: "intro-cybersecurity", instructor: "Dr. Vikram Singh", price: 0, duration: "6 weeks", level: "beginner", category: "Cybersecurity", description: "Learn the fundamentals of cybersecurity including network security, cryptography, and ethical hacking. Free course for all students.", syllabus: "Security Fundamentals\nNetwork Security\nCryptography Basics\nWeb Application Security\nEthical Hacking\nIncident Response", skills: "Network Security, Cryptography, Ethical Hacking, Linux", featured: false, enrolled: 2100, rating: 4.4 },
    { title: "Data Structures & Algorithms in Java", slug: "dsa-java", instructor: "Prof. Meera Nair", price: 2499, duration: "14 weeks", level: "beginner", category: "Programming", description: "Master DSA concepts essential for coding interviews. Practice with 200+ problems from LeetCode and competitive programming.", syllabus: "Arrays & Strings\nLinked Lists\nStacks & Queues\nTrees & Graphs\nSorting & Searching\nDynamic Programming\nGreedy Algorithms\nMock Interviews", skills: "Java, Data Structures, Algorithms, Problem Solving", featured: false, enrolled: 3200, rating: 4.9 },
  ];

  for (const data of courses) {
    await prisma.course.upsert({ where: { slug: data.slug }, update: {}, create: data });
  }

  // Colleges
  const colleges = [
    { name: "IIT Bombay", slug: "iit-bombay", location: "Mumbai, Maharashtra", type: "IIT", ranking: 1, website: "https://www.iitb.ac.in", description: "Indian Institute of Technology Bombay is one of India's premier engineering institutions, known for excellence in research and academics.", programs: "B.Tech, M.Tech, PhD, MBA, MSc, BS-MS", established: 1958 },
    { name: "IIT Delhi", slug: "iit-delhi", location: "New Delhi", type: "IIT", ranking: 2, website: "https://www.iitd.ac.in", description: "IIT Delhi is a public research university known for its engineering, science, and technology programs.", programs: "B.Tech, M.Tech, PhD, MBA, MSc", established: 1961 },
    { name: "IIT Madras", slug: "iit-madras", location: "Chennai, Tamil Nadu", type: "IIT", ranking: 3, website: "https://www.iitm.ac.in", description: "IIT Madras consistently ranks among the top engineering institutes in India and is known for its research output.", programs: "B.Tech, Dual Degree, M.Tech, MS, PhD", established: 1959 },
    { name: "NIT Trichy", slug: "nit-trichy", location: "Tiruchirappalli, Tamil Nadu", type: "NIT", ranking: 8, website: "https://www.nitt.edu", description: "National Institute of Technology Tiruchirappalli is one of India's top NITs known for quality education.", programs: "B.Tech, M.Tech, MCA, PhD, MBA", established: 1964 },
    { name: "IIIT Hyderabad", slug: "iiit-hyderabad", location: "Hyderabad, Telangana", type: "IIIT", ranking: 12, website: "https://www.iiit.ac.in", description: "International Institute of Information Technology Hyderabad is a leading institute for IT and CS education.", programs: "B.Tech, M.Tech, PhD, MS by Research", established: 1998 },
    { name: "BITS Pilani", slug: "bits-pilani", location: "Pilani, Rajasthan", type: "Private", ranking: 15, website: "https://www.bits-pilani.ac.in", description: "Birla Institute of Technology and Science is a premier private university known for its flexible academic system.", programs: "B.E., M.E., PhD, MBA, MSc", established: 1964 },
  ];

  const createdColleges: Record<string, string> = {};
  for (const data of colleges) {
    const college = await prisma.college.upsert({ where: { slug: data.slug }, update: {}, create: data });
    createdColleges[data.slug] = college.id;
  }

  // Faculty
  const faculties = [
    { name: "Dr. Suresh Kumar", slug: "dr-suresh-kumar", designation: "Professor", department: "Computer Science", collegeSlug: "iit-bombay", email: "suresh.k@iitb.ac.in", specialization: "Artificial Intelligence & Machine Learning", publications: 85 },
    { name: "Dr. Anita Desai", slug: "dr-anita-desai", designation: "Associate Professor", department: "Electrical Engineering", collegeSlug: "iit-delhi", email: "anita.d@iitd.ac.in", specialization: "VLSI Design & Embedded Systems", publications: 52 },
    { name: "Prof. Ramesh Babu", slug: "prof-ramesh-babu", designation: "Professor & HOD", department: "Computer Science", collegeSlug: "iit-madras", email: "ramesh.b@iitm.ac.in", specialization: "Natural Language Processing", publications: 120 },
    { name: "Dr. Kavita Sharma", slug: "dr-kavita-sharma", designation: "Assistant Professor", department: "Data Science", collegeSlug: "iiit-hyderabad", email: "kavita.s@iiit.ac.in", specialization: "Computer Vision & Deep Learning", publications: 35 },
    { name: "Prof. Manoj Tiwari", slug: "prof-manoj-tiwari", designation: "Professor", department: "Mechanical Engineering", collegeSlug: "nit-trichy", email: "manoj.t@nitt.edu", specialization: "Robotics & Automation", publications: 68 },
  ];

  for (const { collegeSlug, ...data } of faculties) {
    const collegeId = createdColleges[collegeSlug];
    if (collegeId) {
      await prisma.faculty.upsert({ where: { slug: data.slug }, update: {}, create: { ...data, collegeId } });
    }
  }

  // Mentors
  const mentors = [
    { name: "Arun Krishnamurthy", slug: "arun-krishnamurthy", title: "Senior Software Engineer", company: "Google", expertise: "System Design, Distributed Systems, DSA, Interview Prep", bio: "10+ years at Google working on large-scale distributed systems. Passionate about mentoring the next generation of engineers.", experience: 10, price: 1500, rating: 4.9, sessions: 340, featured: true },
    { name: "Neha Gupta", slug: "neha-gupta", title: "Data Science Lead", company: "Microsoft", expertise: "Machine Learning, Data Science, Python, Statistics", bio: "Leading data science initiatives at Microsoft. Previously at Amazon. Love teaching ML concepts in simple terms.", experience: 8, price: 1200, rating: 4.8, sessions: 215, featured: true },
    { name: "Vikram Rao", slug: "vikram-rao", title: "Staff Engineer", company: "Meta", expertise: "React, JavaScript, Frontend Architecture, Performance", bio: "Core contributor to React ecosystem. Helping engineers build better web applications.", experience: 12, price: 2000, rating: 4.9, sessions: 180, featured: true },
    { name: "Priya Mehta", slug: "priya-mehta", title: "Product Manager", company: "Flipkart", expertise: "Product Management, Strategy, UX Design, Analytics", bio: "PM at Flipkart building commerce products for millions. Ex-Swiggy. Stanford MBA.", experience: 7, price: 1000, rating: 4.7, sessions: 120, featured: true },
    { name: "Sanjay Verma", slug: "sanjay-verma", title: "Cloud Architect", company: "AWS", expertise: "AWS, Cloud Architecture, DevOps, Microservices", bio: "AWS Certified Solutions Architect. Building cloud infrastructure for startups and enterprises.", experience: 9, price: 1500, rating: 4.6, sessions: 95, featured: false },
    { name: "Deepa Iyer", slug: "deepa-iyer", title: "Cybersecurity Analyst", company: "Palo Alto Networks", expertise: "Cybersecurity, Ethical Hacking, Network Security, CTF", bio: "Cybersecurity professional and CTF champion. Making the internet safer one bug at a time.", experience: 6, price: 800, rating: 4.5, sessions: 75, featured: false },
  ];

  for (const data of mentors) {
    await prisma.mentor.upsert({ where: { slug: data.slug }, update: {}, create: data });
  }

  // Events (future dates)
  const now = new Date();
  const futureDate = (daysFromNow: number) => new Date(now.getTime() + daysFromNow * 24 * 60 * 60 * 1000);

  const events = [
    { title: "HackIndia 2025 - National Hackathon", slug: "hackindia-2025", type: "hackathon", organizer: "TechHub India", location: "Bangalore, India", mode: "hybrid", date: futureDate(30), endDate: futureDate(32), description: "India's largest student hackathon! Build innovative solutions in 48 hours with 5000+ participants from across the country.\n\nTracks: AI/ML, Web3, HealthTech, EdTech, FinTech\n\nMentors from Google, Microsoft, Amazon will be available throughout.", eligibility: "Open to all college students in India\nTeam size: 2-4 members", prizes: "1st Place: ₹5,00,000\n2nd Place: ₹3,00,000\n3rd Place: ₹1,00,000\nBest AI Project: ₹50,000\nBest Social Impact: ₹50,000", fees: 0, maxParticipants: 5000, registrations: 3200, featured: true },
    { title: "Cloud Computing Workshop by AWS", slug: "aws-cloud-workshop-2025", type: "workshop", organizer: "Amazon Web Services", location: "Online", mode: "online", date: futureDate(14), description: "Hands-on workshop on AWS services. Learn EC2, S3, Lambda, and deploy a full-stack application on AWS.\n\nCertificate of completion provided.\nFree AWS credits for participants.", eligibility: "Basic programming knowledge required", fees: 499, maxParticipants: 200, registrations: 150, featured: true },
    { title: "AI & Future of Work Webinar", slug: "ai-future-of-work-webinar", type: "webinar", organizer: "Google Developer Groups", location: "Online", mode: "online", date: futureDate(7), description: "Join industry leaders as they discuss how AI is transforming the workplace. Panel discussion followed by Q&A.\n\nSpeakers from Google, Microsoft, OpenAI, and Indian startups.", eligibility: "Open to all", fees: 0, maxParticipants: 1000, registrations: 650, featured: true },
    { title: "Full Stack Development Bootcamp", slug: "fullstack-bootcamp-delhi", type: "workshop", organizer: "Code Academy India", location: "New Delhi, India", mode: "offline", date: futureDate(21), endDate: futureDate(23), description: "3-day intensive bootcamp covering React, Node.js, and MongoDB. Build a complete project from scratch.", eligibility: "Basic JavaScript knowledge", fees: 2999, maxParticipants: 50, registrations: 35, featured: false },
    { title: "Women in Tech Conference 2025", slug: "women-in-tech-2025", type: "conference", organizer: "She Codes India", location: "Mumbai, India", mode: "hybrid", date: futureDate(45), endDate: futureDate(46), description: "Celebrating and empowering women in technology. Keynotes, panels, workshops, and networking opportunities.", eligibility: "Open to all", fees: 999, maxParticipants: 500, registrations: 280, featured: false },
  ];

  for (const data of events) {
    await prisma.event.upsert({ where: { slug: data.slug }, update: {}, create: data });
  }

  // Posts
  const posts = [
    { title: "Top 10 Tips for Your First Tech Internship", slug: "top-10-tips-first-tech-internship", content: "Landing your first tech internship can be exciting and nerve-wracking. Here are 10 tips to help you make the most of it:\n\n1. Be Curious - Ask questions and learn from everyone around you.\n2. Take Notes - Document everything you learn.\n3. Set Goals - Define what you want to achieve during the internship.\n4. Network - Connect with colleagues and other interns.\n5. Be Proactive - Don't wait for tasks to be assigned.\n6. Learn the Codebase - Spend time understanding the existing code.\n7. Seek Feedback - Regularly ask your mentor for feedback.\n8. Work on Side Projects - Use spare time to build something.\n9. Document Your Work - Keep a portfolio of what you built.\n10. Stay in Touch - Maintain relationships after the internship ends.", excerpt: "Landing your first tech internship? Here are 10 essential tips to help you succeed and make a lasting impression.", category: "Career Tips", tags: "internship, career, tips, tech", authorId: admin.id },
    { title: "How to Prepare for DSA Interviews in 2025", slug: "prepare-dsa-interviews-2025", content: "Data Structures and Algorithms (DSA) remain the cornerstone of tech interviews. Here's a structured approach to prepare:\n\n1. Start with basics: Arrays, Strings, Linked Lists\n2. Move to Trees and Graphs\n3. Master Dynamic Programming\n4. Practice on LeetCode (aim for 200+ problems)\n5. Do mock interviews\n6. Focus on time and space complexity analysis\n7. Learn common patterns (Two Pointers, Sliding Window, etc.)\n\nRecommended timeline: 3-4 months of consistent practice.", excerpt: "A structured guide to preparing for DSA interviews at top tech companies in 2025.", category: "Interview Prep", tags: "DSA, interviews, coding, LeetCode", authorId: admin.id },
    { title: "The Rise of AI in Indian Education", slug: "rise-of-ai-indian-education", content: "Artificial Intelligence is transforming how education is delivered in India. From personalized learning platforms to automated grading systems, AI is making education more accessible and effective.\n\nKey trends:\n- Adaptive learning platforms like Byju's and Vedantu\n- AI-powered tutoring systems\n- Automated assessment and feedback\n- Virtual labs and simulations\n- Language translation for regional content\n\nThe future looks promising as more institutions adopt AI-driven solutions.", excerpt: "How AI is revolutionizing education delivery in India through personalized learning and smart tutoring.", category: "Technology", tags: "AI, education, India, EdTech", authorId: user.id },
    { title: "Remote Work Best Practices for Interns", slug: "remote-work-best-practices-interns", content: "Remote internships are becoming the norm. Here's how to stay productive and make an impact:\n\n- Set up a dedicated workspace\n- Maintain regular work hours\n- Over-communicate with your team\n- Use tools like Slack, Notion, and GitHub effectively\n- Take breaks and avoid burnout\n- Join virtual social events\n- Keep your camera on during meetings\n- Document your daily progress", excerpt: "Essential tips for remote interns to stay productive and make a lasting impression.", category: "Career Tips", tags: "remote work, internship, productivity", authorId: admin.id },
  ];

  for (const data of posts) {
    await prisma.post.upsert({ where: { slug: data.slug }, update: {}, create: { ...data, isPublished: true, views: Math.floor(Math.random() * 500) + 50, likes: Math.floor(Math.random() * 100) + 10 } });
  }

  // Summer Schools
  const summerSchools = [
    { title: "Summer School on Machine Learning", slug: "summer-ml-iitb", institute: "IIT Bombay", location: "Mumbai, India", startDate: futureDate(60), endDate: futureDate(74), description: "Two-week intensive program on Machine Learning fundamentals and applications.", eligibility: "Undergraduate students with basic programming knowledge", fees: 5000, topics: "Linear Regression, Neural Networks, Deep Learning, NLP, Computer Vision", website: "https://www.iitb.ac.in/summer" },
    { title: "Quantum Computing Workshop", slug: "quantum-computing-iitd", institute: "IIT Delhi", location: "New Delhi, India", startDate: futureDate(75), endDate: futureDate(82), description: "Week-long workshop on quantum computing fundamentals and IBM Qiskit.", eligibility: "Graduate students in CS/Physics", fees: 3000, topics: "Quantum Gates, Qubits, Quantum Algorithms, Qiskit, Quantum Error Correction", website: "https://www.iitd.ac.in/summer" },
    { title: "Cybersecurity Boot Camp", slug: "cybersecurity-bootcamp-nit", institute: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", startDate: futureDate(45), endDate: futureDate(52), description: "Intensive cybersecurity training covering ethical hacking, penetration testing, and defense strategies.", eligibility: "Students with networking knowledge", fees: 2000, topics: "Network Security, Penetration Testing, CTF, Malware Analysis", website: "https://www.nitt.edu/summer" },
  ];

  for (const data of summerSchools) {
    await prisma.summerSchool.upsert({ where: { slug: data.slug }, update: {}, create: data });
  }

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default-settings" },
    update: {},
    create: {
      id: "default-settings",
      siteName: "Techible",
      tagline: "Your Gateway to Tech Opportunities",
      contactEmail: "support@techible.io",
      contactPhone: "+91 1800-XXX-XXXX",
      address: "New Delhi, India",
      twitter: "https://twitter.com/techible",
      linkedin: "https://linkedin.com/company/techible",
      instagram: "https://instagram.com/techible",
    },
  });

  // Subscription Plans
  await prisma.subscriptionPlan.upsert({
    where: { slug: "free" },
    update: {},
    create: { name: "Free", slug: "free", price: 0, duration: 365, features: "Build resume online,Choose from 6 templates,Preview resume,Save up to 2 resumes", resumeDownloads: 0, isPopular: false },
  });
  await prisma.subscriptionPlan.upsert({
    where: { slug: "pro" },
    update: {},
    create: { name: "Pro", slug: "pro", price: 299, duration: 30, features: "Everything in Free,Download as PDF,Unlimited resumes,Priority support,Custom fonts", resumeDownloads: 0, isPopular: true },
  });
  await prisma.subscriptionPlan.upsert({
    where: { slug: "premium" },
    update: {},
    create: { name: "Premium", slug: "premium", price: 999, duration: 365, features: "Everything in Pro,Annual plan,Resume analytics,ATS optimization,Cover letter builder,LinkedIn optimization", resumeDownloads: 0, isPopular: false },
  });

  // Payment Settings (empty - admin needs to configure)
  const existingSettings = await prisma.paymentSettings.findFirst();
  if (!existingSettings) {
    await prisma.paymentSettings.create({ data: { razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", isTestMode: true, currency: "INR", taxPercentage: 18 } });
  }

  console.log("Database seeded successfully!");
  console.log(`Admin user: admin@techible.io / admin123`);
  console.log(`Test user: user@techible.io / user123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
