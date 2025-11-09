import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Add this import
import {  
  FaSearch,  
  FaCalendarAlt,  
  FaUser,  
  FaTags,  
  FaArrowRight, 
  FaShare, 
  FaBookmark, 
  FaEye, 
  FaComment, 
  FaFilter, 
  FaNewspaper
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const blogCategories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'announcements', name: 'Announcements', count: 4 },
    { id: 'services', name: 'Service Updates', count: 3 },
    { id: 'community', name: 'Community News', count: 3 },
    { id: 'technology', name: 'Technology', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'New Digital ID Card System Launch',
      excerpt: 'We are excited to announce the launch of our new digital ID card system that will streamline the application process for all community members.',
      content: 'Full content about the new digital ID card system...',
      author: 'Alemayehu Tesfaye',
      date: '2024-12-15',
      category: 'announcements',
      readTime: '3 min read',
      image: '/api/placeholder/400/250',
      views: 1247,
      comments: 23,
      tags: ['Digital ID', 'Innovation', 'Service']
    },
    {
      id: 2,
      title: 'Community Meeting: Digital Transformation Roadmap',
      excerpt: 'Join us for an important community meeting to discuss our digital transformation roadmap and gather your valuable feedback.',
      content: 'Full content about community meeting...',
      author: 'Sara Mohammed',
      date: '2024-12-12',
      category: 'community',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      views: 892,
      comments: 15,
      tags: ['Community', 'Meeting', 'Feedback']
    },
    {
      id: 3,
      title: 'Enhanced Security Features for Online Services',
      excerpt: 'Learn about the new security features we have implemented to protect your personal information and ensure safe digital transactions.',
      content: 'Full content about security features...',
      author: 'Meron Getachew',
      date: '2024-12-10',
      category: 'technology',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      views: 1563,
      comments: 31,
      tags: ['Security', 'Technology', 'Safety']
    },
    {
      id: 4,
      title: 'Birth Certificate Application Process Simplified',
      excerpt: 'We have simplified the birth certificate application process with new online forms and reduced processing time.',
      content: 'Full content about birth certificate process...',
      author: 'Kaleb Assefa',
      date: '2024-12-08',
      category: 'services',
      readTime: '2 min read',
      image: '/api/placeholder/400/250',
      views: 734,
      comments: 12,
      tags: ['Birth Certificate', 'Services', 'Simplified']
    },
    {
      id: 5,
      title: 'Holiday Service Schedule Announcement',
      excerpt: 'Important information about our service hours during the upcoming holiday season. Plan your visits accordingly.',
      content: 'Full content about holiday schedule...',
      author: 'Alemayehu Tesfaye',
      date: '2024-12-05',
      category: 'announcements',
      readTime: '2 min read',
      image: '/api/placeholder/400/250',
      views: 1105,
      comments: 8,
      tags: ['Holiday', 'Schedule', 'Announcement']
    },
    {
      id: 6,
      title: 'Mobile App Launch: Services at Your Fingertips',
      excerpt: 'Our new mobile application is now available, bringing kebele services directly to your smartphone.',
      content: 'Full content about mobile app...',
      author: 'Meron Getachew',
      date: '2024-12-01',
      category: 'technology',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      views: 1987,
      comments: 45,
      tags: ['Mobile App', 'Innovation', 'Technology']
    }
  ];

  const featuredPost = blogPosts[0];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-20">
        {/* Enhanced Hero Section with Framer Motion */}
        <section className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              {/* Animated Icon */}
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <FaNewspaper className="text-6xl text-emerald-200" />
                </div>
              </motion.div>

              {/* Animated Main Heading */}
              <motion.h1 
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Kebele News & Updates
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.p 
                className="text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Stay informed with the latest announcements, service updates, and community news from ደፈርጌ ኪቢቃሎ ቀበሌ
              </motion.p>
              
              {/* Animated Stats Bar */}
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex gap-12">
                  {[
                    { label: 'Articles', value: '250+' },
                    { label: 'Categories', value: '12' },
                    { label: 'Active Readers', value: '5.2K' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="text-2xl font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <motion.div 
                        className="text-emerald-200 text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      >
                        {stat.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Optional: Animated CTA Button */}
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <motion.button
                  className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaArrowRight className="text-emerald-600" />
                  Explore Latest Articles
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Rest of your component remains the same */}
        <section className="py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Search and Filter Section */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
              <div className="flex flex-col xl:flex-row gap-8 items-center">
                {/* Search Bar */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Search articles, announcements, or topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="xl:w-80">
                  <div className="relative">
                    <FaFilter className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-gray-50/50 hover:bg-white"
                    >
                      {blogCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-4 gap-10">
              {/* Enhanced Sidebar */}
              <div className="xl:col-span-1 space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaTags className="mr-3 text-emerald-600 text-xl" />
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {blogCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 group ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{category.name}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Digital ID', 'Services', 'Community', 'Technology', 'Announcement', 'Innovation', 'Security', 'Mobile App', 'Utilities', 'Events'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-base font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white hover:shadow-lg transition-all duration-300"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Main Content */}
              <div className="xl:col-span-3">
                {/* Premium Featured Post */}
                {selectedCategory === 'all' && (
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100 group hover:shadow-3xl transition-all duration-500">
                    <div className="xl:flex">
                      <div className="xl:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-600 h-80 xl:h-auto flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <FaNewspaper className="text-8xl text-white/90 z-10" />
                        <div className="absolute bottom-6 left-6">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold">
                            Featured Story
                          </span>
                        </div>
                      </div>
                      <div className="xl:w-3/5 p-10">
                        <div className="flex items-center mb-4">
                          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                            Featured
                          </span>
                          <span className="mx-3 text-gray-400">•</span>
                          <span className="text-gray-500 text-lg">{formatDate(featuredPost.date)}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-base text-gray-500">
                            <span className="flex items-center">
                              <FaUser className="mr-2 text-emerald-600" />
                              {featuredPost.author}
                            </span>
                            <span className="flex items-center">
                              <FaEye className="mr-2 text-emerald-600" />
                              {featuredPost.views}
                            </span>
                            <span className="flex items-center">
                              <FaComment className="mr-2 text-emerald-600" />
                              {featuredPost.comments}
                            </span>
                          </div>
                          <button className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                            Read Full Story <FaArrowRight className="ml-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Blog Posts Grid */}
                <div className="grid xl:grid-cols-2 gap-8">
                  {filteredPosts
                    .filter(post => selectedCategory !== 'all' || post.id !== featuredPost.id)
                    .map(post => (
                      <article key={post.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group border border-gray-100">
                        {/* Post Image */}
                        <div className="h-60 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                          <FaNewspaper className="text-5xl text-white/90 z-10 transform group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 right-4">
                            <button
                              onClick={() => toggleBookmark(post.id)}
                              className={`p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                                bookmarkedPosts.includes(post.id)
                                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                  : 'bg-white/20 text-white hover:bg-white/30'
                              }`}
                            >
                              <FaBookmark />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-8">
                          {/* Category and Date */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold capitalize">
                              {post.category}
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-500 text-lg flex items-center">
                                <FaCalendarAlt className="mr-2 text-emerald-600" />
                                {formatDate(post.date)}
                              </span>
                            </div>
                          </div>

                          {/* Title and Excerpt */}
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-lg mb-6 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium border border-emerald-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Meta Information and Actions */}
                          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <div className="flex items-center space-x-6 text-lg text-gray-500">
                              <span className="flex items-center">
                                <FaUser className="mr-2 text-emerald-600" />
                                {post.author}
                              </span>
                              <span className="bg-gray-100 px-3 py-1 rounded-lg">{post.readTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-300">
                                <FaShare size={16} />
                              </button>
                              <button className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                Read More <FaArrowRight className="ml-2" size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>

                {/* Enhanced No Results Message */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl shadow-2xl border border-gray-100">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <FaSearch className="text-4xl text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">No articles found</h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                      Try adjusting your search terms or browse different categories to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-emerald-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and never miss important updates from your kebele. Get the latest news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-lg"
              />
              <button className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                Subscribe Now
              </button>
            </div>
            <p className="text-emerald-200 mt-4 text-sm">
              Join 5,200+ community members who already receive our updates
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;