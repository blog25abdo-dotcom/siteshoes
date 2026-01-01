import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Headphones, ArrowRight, Zap, Award, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { state, dispatch } = useApp();

  const featuredProducts = state.products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Style Shopify */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-900 to-pink-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  Nouvelle Collection Chaussures 2024
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Style</span>
                  <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Parfait
                  </span>
                  <span className="block">& Confort</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-lg">
                  Découvrez notre collection exclusive de chaussures premium. 
                  Qualité exceptionnelle, confort absolu, style authentique.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                >
                  Découvrir nos Chaussures
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center"
                >
                  Nous Contacter
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">500+</div>
                  <div className="text-sm text-gray-300">Modèles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">10K+</div>
                  <div className="text-sm text-gray-300">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">99%</div>
                  <div className="text-sm text-gray-300">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <img
                      src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                      alt="Sneakers élégantes"
                      className="w-full h-64 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="relative group">
                    <img
                      src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                      alt="Chaussures de ville"
                      className="w-full h-48 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="relative group">
                    <img
                      src="https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg"
                      alt="Chaussures de sport"
                      className="w-full h-48 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="relative group">
                    <img
                      src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                      alt="Bottes tendance"
                      className="w-full h-64 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Style Shopify */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Shoes Paradise ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise chaussures reconnue avec des services professionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 18h20l-2-6H4l-2 6zM4 4v2h16V4H4zm0 4h16l1.5 4.5H2.5L4 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Essayage Gratuit</h3>
              <p className="text-gray-600">Essayez toutes nos chaussures en magasin gratuitement</p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Garantie 2 ans</h3>
              <p className="text-gray-600">Garantie complète sur toutes nos chaussures</p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Service Client</h3>
              <p className="text-gray-600">Conseils personnalisés et suivi après-vente</p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison gratuite dans tout le Maroc sous 48h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Style Shopify */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez Nos Catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez exactement ce que vous cherchez dans nos collections soigneusement organisées
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {state.categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full mb-4 overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${
                        index % 4 === 0 ? 'from-teal-400 to-teal-600' :
                        index % 4 === 1 ? 'from-cyan-400 to-cyan-600' :
                        index % 4 === 2 ? 'from-blue-400 to-blue-600' :
                        'from-green-400 to-green-500'
                      } rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors text-sm">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Style Shopify */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Sélection Chaussures
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Chaussures Tendance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de chaussures les plus populaires et à la mode
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-10 py-4 rounded-full font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Voir Toutes nos Chaussures
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Style Shopify */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  Notre Histoire
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Bienvenue chez Shoes Paradise
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Shoes Paradise</strong> est votre spécialiste chaussures de confiance depuis plus de 
                  <span className="font-semibold text-teal-600"> 15 ans d'expérience</span>. Nous nous engageons 
                  à vous offrir un confort parfait avec des chaussures de qualité exceptionnelle.
                </p>
                <p>
                  Notre gamme complète comprend des 
                  <span className="font-semibold text-orange-600"> sneakers, chaussures de ville, de sport</span> et 
                  accessoires pour toute la famille. Chaque paire est sélectionnée pour sa qualité et son style.
                </p>
                <p>
                  Chez Shoes Paradise, nous croyons que les chaussures doivent être 
                  <span className="font-semibold text-red-600"> confortables, durables et stylées</span>. 
                  Notre mission est de vous accompagner pour un style parfait qui révèle votre personnalité.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                  <div className="text-sm font-medium text-gray-700">Années d'expérience</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
                  <div className="text-sm font-medium text-gray-700">Clients satisfaits</div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Découvrir Nos Chaussures
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img
                    src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                    alt="Notre magasin de chaussures"
                    className="w-full h-64 object-cover rounded-2xl shadow-xl"
                  />
                  <img
                    src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                    alt="Essayage chaussures"
                    className="w-full h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="space-y-6 mt-12">
                  <img
                    src="https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg"
                    alt="Nos chaussures"
                    className="w-full h-48 object-cover rounded-2xl shadow-xl"
                  />
                  <img
                    src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                    alt="Chaussures de sport"
                    className="w-full h-64 object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;