// app/about/page.tsx
const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        About This Blog
      </h1>

      {/* Intro Section */}
      <p className="text-gray-700 text-lg mb-6">
        Welcome to our blog! Here, we share articles, tutorials, and insights
        about web development, technology trends, and coding best practices.
      </p>

      {/* Mission Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to provide high-quality, easy-to-understand content
          for developers of all skill levels. We aim to inspire, educate, and
          help you grow in your coding journey.
        </p>
      </div>

      {/* About the Author */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-6">  
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            About the Author
          </h2>
          <p className="text-gray-700">
            Hi! I’m Masud, a web developer passionate about React, Next.js,
            and modern frontend development. I started this blog to share my
            knowledge and help others learn faster.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact</h2>
        <p className="text-gray-700">
          Have questions or suggestions? Reach out at{" "}
          <a
            href="mailto:lalalala@example.com"
            className="text-blue-600 hover:underline"
          >
            lalalala@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
