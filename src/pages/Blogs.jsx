import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaNewspaper className="text-5xl text-blue-200" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Kebele News & Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest announcements, service updates, and community news from ደፈርጌ ኪቢቃሎ ቀበሌ
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, announcements, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
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

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories and Popular Tags */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaTags className="mr-2 text-blue-600" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {blogCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Digital', 'Services', 'Community', 'Technology', 'Announcement', 'Innovation', 'Security', 'Mobile'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              {selectedCategory === 'all' && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                  <div className="md:flex">
                    <div className="md:w-2/5 bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                      <FaNewspaper className="text-6xl text-gray-400" />
                    </div>
                    <div className="md:w-3/5 p-8">
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">{formatDate(featuredPost.date)}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">{featuredPost.title}</h2>
                      <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center">
                            <FaEye className="mr-1" />
                            {featuredPost.views}
                          </span>
                          <span className="flex items-center">
                            <FaComment className="mr-1" />
                            {featuredPost.comments}
                          </span>
                        </div>
                        <button className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                          Read More <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts
                  .filter(post => selectedCategory !== 'all' || post.id !== featuredPost.id)
                  .map(post => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Post Image */}
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <FaNewspaper className="text-4xl text-gray-400" />
                      </div>
                      
                      <div className="p-6">
                        {/* Category and Date */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold capitalize">
                            {post.category}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-500 text-sm flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              {formatDate(post.date)}
                            </span>
                            <button
                              onClick={() => toggleBookmark(post.id)}
                              className={`p-1 rounded transition-colors ${
                                bookmarkedPosts.includes(post.id)
                                  ? 'text-yellow-500 hover:text-yellow-600'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              <FaBookmark />
                            </button>
                          </div>
                        </div>

                        {/* Title and Excerpt */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Information and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaUser className="mr-1" />
                              {post.author}
                            </span>
                            <span>{post.readTime}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <FaShare size={14} />
                            </button>
                            <button className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">
                              Read More <FaArrowRight className="ml-1" size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>

              {/* No Results Message */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse different categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Subscribe to our newsletter and never miss important updates from your kebele
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-800 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;