import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaTelegram, 
  FaTwitter,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle
} from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      details: ['ደፈርጌ ኪቢቃሎ ቀበሌ', 'Weldiya Town', 'North Wello Zone', 'Amhara Region, Ethiopia'],
      link: 'https://maps.google.com/?q=Weldiya+Town+North+Wello+Ethiopia'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['+251 91 234 5678', '+251 92 345 6789'],
      link: 'tel:+251912345678'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@kebele.gov.et', 'support@kebele.gov.et'],
      link: 'mailto:info@kebele.gov.et'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: ['Mon - Fri: 8:30 AM - 5:30 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed']
    }
  ];

  const services = [
    'ID Card Services',
    'Birth Certificates',
    'Residence Certificates',
    'Business Licenses',
    'Document Clearance',
    'Community Services'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with ደፈርጌ ኪቢቃሎ ቀበሌ. We're here to serve our community with digital excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're committed to providing excellent service to our community members. 
                  Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <item.icon className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                        ))}
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            View on Map →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form & Map */}
            <div className="space-y-8">
              {/* Google Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-4xl text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">ደፈርጌ ኪቢቃሎ ቀበሌ</h3>
                    <p className="text-gray-600">Weldiya Town, North Wello, Ethiopia</p>
                    <a 
                      href="https://maps.google.com/?q=Weldiya+Town+North+Wello+Ethiopia"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                
                {isSubmitted && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <div className="flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Thank you! Your message has been sent successfully.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-gray-700 font-semibold mb-2">
                        <FaUser className="mr-2 text-blue-600" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-gray-700 font-semibold mb-2">
                        <FaEnvelope className="mr-2 text-blue-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                      <FaComment className="mr-2 text-blue-600" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter message subject"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                      <FaComment className="mr-2 text-blue-600" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Type your message here..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Emergency Contact</h3>
          <p className="text-xl mb-4">For urgent matters outside office hours</p>
          <div className="flex justify-center items-center space-x-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Emergency Hotline</p>
              <p className="text-2xl font-bold">+251 91 000 0000</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">24/7 Support</p>
              <p className="text-2xl font-bold">911</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;