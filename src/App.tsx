import { useState } from 'react';
import { ShoppingCart, Search, Heart, X, Plus, Minus, Filter, ArrowRight } from 'lucide-react';
import { cn } from './utils/cn';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  color: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Oversized Hoodie",
    price: 89,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    description: "Premium cotton blend oversized hoodie with signature embroidery. Perfect for layering.",
    color: "Charcoal"
  },
  {
    id: 2,
    name: "Signature Sneakers",
    price: 129,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Handcrafted Italian leather sneakers with custom rubber sole for all-day comfort.",
    color: "White"
  },
  {
    id: 3,
    name: "Slim Denim Jeans",
    price: 75,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop",
    description: "Premium Japanese selvedge denim with a modern slim straight fit.",
    color: "Indigo"
  },
  {
    id: 4,
    name: "Leather Trucker Jacket",
    price: 249,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    description: "Genuine leather trucker jacket with wool lining and antique hardware.",
    color: "Brown"
  },
  {
    id: 5,
    name: "Minimal Baseball Cap",
    price: 35,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    description: "Structured 6-panel cap in premium twill with embroidered logo.",
    color: "Black"
  },
  {
    id: 6,
    name: "Wide Leg Trousers",
    price: 95,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    description: "Relaxed fit trousers crafted from a soft Italian wool blend.",
    color: "Beige"
  },
  {
    id: 7,
    name: "Technical Runner Shoes",
    price: 155,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
    description: "Advanced cushioning technology meets sleek minimalist design.",
    color: "Navy"
  },
  {
    id: 8,
    name: "Cashmere Crewneck",
    price: 145,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    description: "Ultra soft Mongolian cashmere sweater in a relaxed fit.",
    color: "Sand"
  },
  {
    id: 9,
    name: "Leather Card Holder",
    price: 45,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    description: "Hand-stitched vegetable tanned leather card holder.",
    color: "Cognac"
  },
  {
    id: 10,
    name: "Relaxed Oxford Shirt",
    price: 68,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    description: "Breathable organic cotton oxford shirt with button-down collar.",
    color: "Light Blue"
  },
];

export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ['All', 'Apparel', 'Footwear', 'Accessories'];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured - original order
    });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Show brief toast effect by opening cart after a delay
    setTimeout(() => {
      setIsCartOpen(true);
    }, 800);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold tracking-tighter">N</span>
              </div>
              <div>
                <div className="font-semibold text-2xl tracking-tighter">NEXUS</div>
                <div className="text-[10px] text-white/40 -mt-1">EST 2024</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#" className="hover:text-violet-400 transition-colors">Shop</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Collections</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Journal</a>
              <a href="#" className="hover:text-violet-400 transition-colors">About</a>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-11 py-3 rounded-2xl text-sm focus:outline-none focus:border-violet-500 placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl hover:bg-white/5 transition-all active:scale-[0.985]"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-violet-600 text-white text-[10px] font-mono w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </div>
              )}
            </button>

            <div className="w-9 h-9 bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <div className="text-xs font-mono text-white/70">JD</div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(124,58,237,0.15),transparent)]"></div>
        
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-xs tracking-[2px] font-mono border border-white/20 px-4 py-2 rounded-full mb-6">
              NEW SEASON
            </div>
            
            <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter leading-none mb-4">
              TIMELESS<br />ESSENTIALS
            </h1>
            
            <p className="text-xl text-white/70 mb-10 max-w-sm">
              Curated modern wardrobe staples. 
              Designed to last. Shipped worldwide.
            </p>
            
            <button 
              onClick={() => window.scrollTo({ top: 850, behavior: 'smooth' })}
              className="group flex items-center gap-3 bg-white text-zinc-950 px-8 h-14 rounded-2xl font-semibold text-sm hover:bg-white/90 active:scale-[0.985] transition-all"
            >
              SHOP COLLECTION
              <ArrowRight className="group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute bottom-12 right-12 hidden xl:block">
          <div className="w-64 h-64 border border-white/10 rounded-[4rem] rotate-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-light text-white/30">24</div>
              <div className="text-xs tracking-widest text-white/30">NEW DROPS</div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-6 right-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between py-8 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2 text-sm rounded-3xl transition-all",
                  selectedCategory === cat 
                    ? "bg-white text-zinc-900 font-medium" 
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Filter className="h-4 w-4" />
              <span>SORT BY</span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-white/10 text-sm rounded-2xl px-5 py-2.5 focus:outline-none focus:border-white/30 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 pt-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-square mb-6 bg-zinc-900 border border-white/5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all group-hover:scale-110 duration-700"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-5 right-5 p-3 bg-black/60 hover:bg-black/80 backdrop-blur rounded-2xl transition-all"
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4 transition-colors",
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"
                    )} 
                  />
                </button>

                <div className="absolute bottom-5 left-5 bg-black/70 text-xs font-mono px-3 py-1 rounded-2xl backdrop-blur">
                  {product.color}
                </div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-medium text-lg">{product.name}</div>
                  <div className="text-white/50 text-sm">{product.category}</div>
                </div>
                <div className="font-mono text-xl tracking-tighter">${product.price}</div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="mt-6 w-full h-11 bg-white/5 hover:bg-white hover:text-zinc-900 border border-white/10 hover:border-white rounded-2xl text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.985]"
              >
                <Plus className="h-3.5 w-3.5" /> QUICK ADD
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-white/40">
            No products found matching your criteria.
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-xs font-bold">N</span>
              </div>
              <div className="font-semibold tracking-tighter text-2xl">NEXUS</div>
            </div>
            <p className="text-white/40 text-sm max-w-[190px]">
              Thoughtfully designed products for the modern individual.
            </p>
          </div>
          
          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white/30">SHOP</div>
            <div className="space-y-3 text-sm">
              <div className="text-white/70 hover:text-white cursor-pointer">New Arrivals</div>
              <div className="text-white/70 hover:text-white cursor-pointer">Best Sellers</div>
              <div className="text-white/70 hover:text-white cursor-pointer">Sale</div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white/30">EXPLORE</div>
            <div className="space-y-3 text-sm">
              <div className="text-white/70 hover:text-white cursor-pointer">Our Story</div>
              <div className="text-white/70 hover:text-white cursor-pointer">Care Guide</div>
              <div className="text-white/70 hover:text-white cursor-pointer">Sustainability</div>
              <div className="text-white/70 hover:text-white cursor-pointer">Stockists</div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white/30">CONNECT</div>
            <div className="flex gap-4">
              <div className="cursor-pointer w-8 h-8 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10">𝕏</div>
              <div className="cursor-pointer w-8 h-8 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10">📷</div>
            </div>
            
            <div className="mt-8 text-xs text-white/30">
              © {new Date().getFullYear()} NEXUS LTD.
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-6" onClick={() => setSelectedProduct(null)}>
          <div 
            className="bg-zinc-900 max-w-4xl w-full rounded-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2 bg-black p-8 flex items-center justify-center relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-8 right-8 text-white/60 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="max-h-[520px] w-full object-contain rounded-2xl"
                />
              </div>

              {/* Details */}
              <div className="lg:w-1/2 p-10 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="uppercase text-xs tracking-[1px] text-violet-400 mb-1">{selectedProduct.category}</div>
                      <h2 className="text-4xl font-semibold tracking-tighter">{selectedProduct.name}</h2>
                    </div>
                    <div className="font-mono text-4xl tracking-tighter pt-1">${selectedProduct.price}</div>
                  </div>
                  
                  <div className="mt-3 text-white/60 text-sm leading-relaxed">
                    {selectedProduct.description}
                  </div>
                  
                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-3">COLOR</div>
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-2xl">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                      <span>{selectedProduct.color}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-3">SIZE</div>
                    <div className="flex gap-3">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <div key={size} className="w-12 h-12 flex items-center justify-center border border-white/20 hover:border-white rounded-2xl cursor-pointer transition-colors text-sm font-medium">{size}</div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/10 mt-auto">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-4 bg-white text-black font-semibold rounded-2xl flex items-center justify-center gap-3 active:scale-[0.985] transition-all"
                  >
                    ADD TO CART — ${selectedProduct.price}
                  </button>
                  
                  <div className="text-center text-xs text-white/30 mt-6">Free shipping on orders over $150 • 30 day returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/70 z-[110]" onClick={() => setIsCartOpen(false)}>
          <div 
            className="absolute top-0 bottom-0 right-0 w-full max-w-md bg-zinc-900 flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <div className="font-semibold text-2xl tracking-tight">Your Cart</div>
              <button onClick={() => setIsCartOpen(false)} className="text-white/60">
                <X className="h-7 w-7" />
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="flex-1 p-8 overflow-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-5 mb-8 last:mb-0">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-white/40 text-sm">{item.color}</div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div className="flex items-center border border-white/20 rounded-2xl">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <div className="px-4 font-mono text-sm">{item.quantity}</div>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="font-mono">${(item.price * item.quantity).toFixed(0)}</div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/30 hover:text-red-400 self-start"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-8 border-t border-white/10 mt-auto">
                  <div className="flex justify-between text-sm mb-1">
                    <div className="text-white/60">SUBTOTAL</div>
                    <div className="font-medium">${cartTotal}</div>
                  </div>
                  <div className="flex justify-between text-xs text-white/30 mb-8">
                    <div>SHIPPING</div>
                    <div className="text-emerald-400">CALCULATED AT CHECKOUT</div>
                  </div>
                  
                  <button className="w-full h-14 bg-white text-zinc-950 rounded-2xl text-sm font-semibold tracking-wider hover:bg-amber-200 transition">
                    PROCEED TO CHECKOUT
                  </button>
                  
                  <div className="text-center text-[10px] text-white/30 mt-5">OR 4 PAYMENTS OF ${(cartTotal / 4).toFixed(0)} WITH</div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                  <ShoppingCart className="h-8 w-8 text-white/30" />
                </div>
                <div className="font-medium mb-2">Your cart is empty</div>
                <div className="text-sm text-white/40 max-w-[180px]">When you add products to your cart, they'll appear here</div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-8 text-xs border border-white/20 px-8 py-3.5 rounded-2xl"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
