import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Star, Award, Shield, Truck, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContactMessage } from '../types';

const ContactPage: React.FC = () => {
  const { state, dispatch, addMessage } = useApp();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const selectedSize = searchParams.get('size');
  const isCartOrder = searchParams.get('cart') === 'true';
  const prefilledMessage = searchParams.get('message');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: prefilledMessage ? decodeURIComponent(prefilledMessage) : productId ? `Bonjour, je suis intéressé(e) par le produit: ${
      state.products.find(p => p.id === productId)?.name || ''
    }${selectedSize ? ` - Taille: ${selectedSize}` : ''}` : '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    setIsSubmitting(true);

    const newMessage: Omit<ContactMessage, 'id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      productId: productId,
      createdAt: new Date(),
      read: false,
    };

    try {
      await addMessage(newMessage);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const product = productId ? state.products.find(p => p.id === productId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white mb-6">
              <Mail className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {isCartOrder ? 'Finaliser votre commande' : 'Votre style, notre expertise'}
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              {isCartOrder ? 'Votre Commande' : 'Contactez-nous'}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              {isCartOrder 
                ? 'Remplissez vos informations pour finaliser votre commande de chaussures'
                : 'Besoin d\'un conseil chaussures ? Notre équipe de spécialistes diplômés est à votre disposition pour vous accompagner.'
              }
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              {isCartOrder ? 'Finaliser la Commande' : product ? `Demande d'information chaussures` : 'Contactez votre spécialiste'}
            </h2>

            {isCartOrder && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 text-green-600 mr-2" />
                  Commande de {state.cart.length} article{state.cart.length > 1 ? 's' : ''}
                </h3>
                <div className="space-y-3">
                  {state.cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.product.name}</p>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">Taille: {item.selectedSize}</p>
                        )}
                        <p className="text-sm text-green-600 font-medium">
                          {item.product.price.toFixed(2)} DH × {item.quantity} = {(item.product.price * item.quantity).toFixed(2)} DH
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-green-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-800">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)} DH
                    </span>
                  </div>
                </div>
              </div>
            )}

            {product && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-amber-500 mr-2" />
                  Chaussures sélectionnées:
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 text-lg">{product.name}</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {product.price} DH
                    </p>
                    {selectedSize && (
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        Taille sélectionnée: {selectedSize}
                      </p>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-slate-600 mb-1">Tailles disponibles:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.filter(s => s.available).map((size, index) => (
                            <span key={index} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                              {size.size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-pulse">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-green-600 mb-4 animate-slide-up">
                  Message envoyé avec succès !
                </h3>
                <p className="text-lg text-slate-700 mb-3 animate-slide-up-delay-1">
                  Merci pour votre demande.
                </p>
                <p className="text-slate-600 mb-10 animate-slide-up-delay-2">
                  Notre équipe vous contactera dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 animate-slide-up-delay-3 font-semibold"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-base"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-base"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-3">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-base"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none transition-all duration-300 text-base"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 sm:py-5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <Phone className="w-6 h-6 text-blue-600 mr-3" />
                Informations de Contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Adresse</h4>
                    <p className="text-slate-600 leading-relaxed">
                      123 Avenue Mohammed V<br />
                      Rabat, Maroc<br />
                      <span className="text-sm text-slate-500">Magasin et atelier sur place</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Téléphone</h4>
                    <p className="text-slate-600">
                      +212 537 XX XX XX<br />
                      <span className="text-sm text-slate-500">Lun-Sam 9h-19h</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Email</h4>
                    <p className="text-slate-600">
                      contact@shoesparadise.ma<br />
                      <span className="text-sm text-slate-500">Réponse sous 2h</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Horaires</h4>
                    <p className="text-slate-600">
                      Lundi - Samedi: 9h00 - 19h00<br />
                      <span className="text-sm text-slate-500">Dimanche: Sur rendez-vous</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Award className="w-6 h-6 mr-3" />
                Nos Services Chaussures
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 18h20l-2-6H4l-2 6zM4 4v2h16V4H4zm0 4h16l1.5 4.5H2.5L4 8z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Essayage Gratuit</h4>
                    <p className="text-orange-100">Essayage complet par spécialiste diplômé</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Garantie 2 ans</h4>
                    <p className="text-orange-100">Garantie complète sur toutes nos chaussures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Suivi Personnalisé</h4>
                    <p className="text-orange-100">Accompagnement et conseils gratuits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">
                Questions Fréquentes
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-slate-800 mb-2">
                    Proposez-vous des essayages ?
                  </h4>
                  <p className="text-slate-600">
                    Oui, nos spécialistes diplômés réalisent des essayages complets sur rendez-vous.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-slate-800 mb-2">
                    Quelle est votre garantie ?
                  </h4>
                  <p className="text-slate-600">
                    Nous offrons une garantie de 2 ans sur toutes nos chaussures.
                  </p>
                </div>
                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-slate-800 mb-2">
                    Faites-vous des retouches ?
                  </h4>
                  <p className="text-slate-600">
                    Oui, tous les ajustements et réparations mineures sont gratuits à vie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;