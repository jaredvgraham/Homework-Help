import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white text-center py-24">
        <h2 className="text-4xl font-bold">
          Empower Your Students with Personalized Homework Help
        </h2>
        <p className="mt-4 text-lg">
          Revolutionize the way students learn and prepare for exams with our
          AI-powered homework assistance.
        </p>
        <button className="mt-8 bg-white text-blue-600 px-6 py-3 rounded">
          Start Your Free Trial
        </button>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center">Features</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Subject Sections</h4>
              <p>
                Detailed explanations for subjects like ELA, Math, and more.
              </p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Final Prep Tests</h4>
              <p>Automatically generated tests based on stored work.</p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">YouTube Integration</h4>
              <p>Links to educational videos that help reinforce concepts.</p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">ChatGPT Assistance</h4>
              <p>Get summaries, explanations, and quizzes created by AI.</p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Progress Tracking</h4>
              <p>
                Track comfort level and performance analytics per assignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold">What Our Users Say</h3>
          <p className="mt-4">
            Hear from the students, parents, and teachers using Homework Help.
          </p>
        </div>
      </section>

      <section id="pricing" className="py-16">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center">Pricing Plans</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Basic</h4>
              <p>$10 per student/month</p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Premium</h4>
              <p>$20 per student/month</p>
            </div>
            <div className="bg-white p-6 shadow rounded">
              <h4 className="text-xl font-bold">Enterprise</h4>
              <p>Custom pricing for schools with more than 500 students.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold">About Us</h3>
          <p className="mt-4">
            Our mission is to make learning accessible and personalized for
            every student.
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Homework Help. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
