import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phoneNumber: "",
    email: "",
    registerSpecificEntity: "no",
    specificEntity: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send this data to a server
    console.log("Form submitted:", formData);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your request has been submitted successfully. We will contact you shortly to discuss the next steps for your Abu Dhabi vendor registration.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">GoVendor</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium">Home</a>
              <a href="#overview" className="text-gray-700 hover:text-emerald-600 font-medium">Services</a>
              <a href="#entities" className="text-gray-700 hover:text-emerald-600 font-medium">Entities</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Abu Dhabi Vendor Registration Services
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional vendor registration services for businesses seeking to become approved suppliers with Abu Dhabi government departments and private sector entities.
          </p>
          
          {/* Statistics Block */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-gray-700 font-medium">Abu Dhabi Entities Supported</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get Started with Your Abu Dhabi Vendor Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Owner's Name *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    UAE Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email Address *
                  </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                  placeholder="your.business@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Register with Specific Abu Dhabi Entity? *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="registerSpecificEntity"
                      value="no"
                      checked={formData.registerSpecificEntity === "no"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    No - General Registration
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="registerSpecificEntity"
                      value="yes"
                      checked={formData.registerSpecificEntity === "yes"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Yes - Specific Entity
                  </label>
                </div>
              </div>

              {formData.registerSpecificEntity === "yes" && (
                <div>
                  <label htmlFor="specificEntity" className="block text-sm font-medium text-gray-700 mb-2">
                    Specify Abu Dhabi Government or Private Entity *
                  </label>
                  <textarea
                    id="specificEntity"
                    name="specificEntity"
                    value={formData.specificEntity}
                    onChange={handleChange}
                    required={formData.registerSpecificEntity === "yes"}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                    placeholder="e.g., Abu Dhabi Municipality, ADNOC, Aldar Properties, etc."
                  ></textarea>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                >
                  Submit Registration Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SEO Optimized Services Section */}
      <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Abu Dhabi Vendor Registration Services</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Expert assistance for businesses seeking vendor registration with Abu Dhabi government entities and private sector organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Abu Dhabi Vendor Registration Service?</h3>
              <p className="text-gray-700 mb-6 text-lg">
                GoVendor provides specialized vendor registration services for businesses looking to become approved suppliers with Abu Dhabi government departments, municipalities, and leading private sector companies. Our expertise ensures your business meets all requirements for successful vendor registration.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Whether you're a small business, SME, or large corporation, our team understands the specific documentation, compliance, and procedural requirements needed for vendor approval across various Abu Dhabi entities including ADNOC, Abu Dhabi Municipality, Ministry of Finance, and major private sector organizations.
              </p>
              <p className="text-gray-700 text-lg">
                We streamline the entire vendor registration process, saving you time and ensuring your application meets all Abu Dhabi government and private sector vendor requirements from the start.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Abu Dhabi Expertise</h4>
                    <p className="text-gray-600">Specialized knowledge of Abu Dhabi government and private entity vendor requirements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast Processing</h4>
                    <p className="text-gray-600">Expedited vendor registration process for Abu Dhabi entities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Compliance Assurance</h4>
                    <p className="text-gray-600">Ensure your business meets all Abu Dhabi vendor compliance standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abu Dhabi Entities Section */}
      <section id="entities" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Abu Dhabi Government & Private Entities</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We assist with vendor registration for leading Abu Dhabi government departments and private sector organizations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Abu Dhabi City Municipality */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=ABU+DHABI+CITY+MUNICIPALITY" 
                  alt="Abu Dhabi City Municipality - Government Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Ministry of Finance */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=MINISTRY+OF+FINANCE" 
                  alt="Ministry of Finance UAE - Government Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* ADNOC */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=ADNOC" 
                  alt="ADNOC - Abu Dhabi National Oil Company Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Aldar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=ALDAR" 
                  alt="Aldar Properties - Abu Dhabi Real Estate Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* MÜDON */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=MÜDON" 
                  alt="MÜDON - Abu Dhabi Construction Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* TAQA */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="https://placehold.co/250x250/ffffff/000000?text=TAQA" 
                  alt="TAQA - Abu Dhabi Energy Company Vendor Registration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Abu Dhabi Vendor Registration Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive vendor registration support for Abu Dhabi government and private sector entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Government Vendor Registration</h3>
              <p className="text-gray-600">
                Complete assistance with vendor registration for Abu Dhabi government departments, municipalities, and federal entities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Private Sector Vendor Registration</h3>
              <p className="text-gray-600">
                Expert support for vendor registration with leading Abu Dhabi private sector companies and organizations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance & Documentation</h3>
              <p className="text-gray-600">
                Ensure your business meets all Abu Dhabi vendor compliance requirements and documentation standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-xl font-bold">GoVendor</h3>
              </div>
              <p className="text-gray-400">
                Professional Abu Dhabi vendor registration services for government and private sector entities. Your trusted partner for business growth in Abu Dhabi.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400">
                <p>Email: info@govendor.ae</p>
                <p>Phone: +971 2 123 4567</p>
                <p>Business Hours: Mon-Fri, 9AM-5PM GST</p>
                <p>Location: Abu Dhabi, UAE</p>
              </address>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Abu Dhabi Government Vendor Registration</li>
                <li>✓ Abu Dhabi Private Sector Vendor Registration</li>
                <li>✓ UAE Business Compliance Assistance</li>
                <li>✓ Abu Dhabi Supplier Registration Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GoVendor - Abu Dhabi Vendor Registration Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
