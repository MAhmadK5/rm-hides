"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  // SECURITY STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // DASHBOARD STATE
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard');
  const [loading, setLoading] = useState(false);

  // --- AUTHENTICATION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'RM2026') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setAuthError(true);
      setPasscode('');
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  // --- DATA FETCHING ---
  const fetchData = async () => {
    setLoading(true);
    const { data: orderData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    const { data: productData } = await supabase.from('products').select('*');
    
    if (orderData) setOrders(orderData);
    if (productData) setProducts(productData);
    setLoading(false);
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) fetchData(); 
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
  const recentOrders = orders.slice(0, 5);

  // ==========================================
  // SECURITY LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-sm px-6">
          <div className="bg-[#111] border border-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c4a484" strokeWidth="1.5" className="mx-auto mb-6">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-2">Restricted Access</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-8">Enter R&M Master PIN</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full bg-[#0a0a0a] border ${authError ? 'border-red-500' : 'border-white/20 focus:border-[#c4a484]'} text-center text-white p-4 tracking-[1em] font-mono outline-none transition-colors`}
                placeholder="••••••"
                autoFocus
              />
              <button type="submit" className="w-full bg-[#c4a484] text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors">
                Authorize
              </button>
            </form>
            <Link href="/" className="inline-block mt-8 text-white/30 hover:text-white text-[9px] uppercase tracking-widest border-b border-white/10 hover:border-white transition-all">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN ADMIN DASHBOARD
  // ==========================================
 return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#111] border-r border-white/5 flex flex-col h-auto md:h-screen sticky top-0 z-40">
        <div className="p-8 border-b border-white/5 text-center md:text-left">
          <h1 className="text-xl font-serif text-[#c4a484] tracking-widest uppercase mb-1">R&M Backend</h1>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Logged in as Admin</span>
        </div>
        <nav className="flex md:flex-col gap-2 p-4 md:p-6 overflow-x-auto md:overflow-visible flex-grow">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all text-left whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-[#c4a484]/10 text-[#c4a484] border-l-2 border-[#c4a484]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            Dashboard
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all text-left whitespace-nowrap ${activeTab === 'orders' ? 'bg-[#c4a484]/10 text-[#c4a484] border-l-2 border-[#c4a484]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16" y1="4" x2="16" y2="20"></line><line x1="8" y1="4" x2="8" y2="20"></line><line x1="3" y1="8" x2="21" y2="8"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg>
            Orders Ledger
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all text-left whitespace-nowrap ${activeTab === 'products' ? 'bg-[#c4a484]/10 text-[#c4a484] border-l-2 border-[#c4a484]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            Inventory
          </button>
        </nav>
        <div className="p-6 border-t border-white/5 hidden md:block">
          <Link href="/" className="flex items-center gap-3 text-white/30 hover:text-red-500 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Exit System
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 max-h-screen overflow-y-auto">
        
        {loading ? (
          <div className="flex items-center justify-center h-full text-[#c4a484] uppercase tracking-widest text-xs animate-pulse">Syncing Database...</div>
        ) : (
          <>
            {/* OVERVIEW DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-12 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-serif tracking-wide mb-6">Executive Summary</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#111] border border-white/5 p-6 shadow-xl relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 opacity-5"><svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Net Revenue</span>
                      <span className="text-3xl font-serif text-[#c4a484]">Rs. {totalRevenue.toLocaleString('en-PK')}</span>
                    </div>
                    <div className="bg-[#111] border border-white/5 p-6 shadow-xl">
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Total Orders</span>
                      <span className="text-3xl font-serif text-white">{orders.length}</span>
                    </div>
                    <div className="bg-[#111] border border-white/5 p-6 shadow-xl border-l-2 border-l-yellow-500">
                      <span className="text-[10px] uppercase tracking-widest text-yellow-500/80 block mb-2">Awaiting Action</span>
                      <span className="text-3xl font-serif text-white">{orders.filter(o => o.status?.toLowerCase() === 'pending').length}</span>
                    </div>
                    <div className="bg-[#111] border border-white/5 p-6 shadow-xl">
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Products Live</span>
                      <span className="text-3xl font-serif text-white">{products.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/5 p-8 shadow-xl">
                  <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-lg font-serif">Recent Transactions</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-[#c4a484] text-[10px] uppercase tracking-widest hover:text-white transition-colors">View All ➔</button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center bg-[#0a0a0a] p-4 border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[#c4a484] font-mono text-xs font-bold">{order.order_id}</span>
                          <span className="text-white text-sm">{order.customer_name}</span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-white font-serif">Rs. {Number(order.total_amount).toLocaleString('en-PK')}</span>
                          <span className={`px-2 py-0.5 mt-1 text-[8px] uppercase tracking-widest border ${
                            order.status?.toLowerCase() === 'pending' ? 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10' :
                            order.status?.toLowerCase() === 'shipped' ? 'text-blue-500 border-blue-500/30 bg-blue-500/10' :
                            'text-green-500 border-green-500/30 bg-green-500/10'
                          }`}>{order.status || 'pending'}</span>
                        </div>
                      </div>
                    ))}
                    {recentOrders.length === 0 && <p className="text-white/40 text-xs italic">No transactions yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-serif tracking-wide mb-6">Master Order Ledger</h2>
                <div className="bg-[#111] border border-white/5 overflow-x-auto shadow-2xl">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0a0a0a] text-[9px] uppercase tracking-widest text-white/40 border-b border-white/10">
                      <tr>
                        <th className="p-4 font-normal">Order ID</th>
                        <th className="p-4 font-normal">Customer</th>
                        <th className="p-4 font-normal">Items</th>
                        <th className="p-4 font-normal">Total</th>
                        <th className="p-4 font-normal">Status</th>
                        <th className="p-4 font-normal text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 text-[#c4a484] font-mono font-bold">{order.order_id}</td>
                          <td className="p-4">
                            {order.customer_name}<br/>
                            <span className="text-[10px] text-white/40">{order.phone}</span>
                          </td>
                          <td className="p-4 text-white/60 text-xs max-w-[200px] truncate">
                            {order.items?.map((i:any) => `${i.quantity}x ${i.name}`).join(', ')}
                          </td>
                          <td className="p-4 font-serif">Rs. {Number(order.total_amount || 0).toLocaleString('en-PK')}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-[9px] uppercase tracking-widest border ${
                              order.status?.toLowerCase() === 'pending' ? 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10' :
                              order.status?.toLowerCase() === 'shipped' ? 'text-blue-500 border-blue-500/30 bg-blue-500/10' :
                              'text-green-500 border-green-500/30 bg-green-500/10'
                            }`}>
                              {order.status || 'pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <select 
                              value={order.status || 'pending'} 
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="bg-black border border-white/20 text-[10px] uppercase tracking-widest px-2 py-1 outline-none focus:border-[#c4a484]"
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && <div className="text-center py-20 text-white/40 text-xs tracking-widest uppercase">No orders on file.</div>}
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-serif tracking-wide">Inventory Management</h2>
                  <button className="bg-[#7a0016] text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-[#9a1026] transition-colors shadow-lg shadow-[#7a0016]/20">
                    + Add Product
                  </button>
                </div>
                <div className="bg-[#111] border border-white/5 overflow-x-auto shadow-2xl">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0a0a0a] text-[9px] uppercase tracking-widest text-white/40 border-b border-white/10">
                      <tr>
                        <th className="p-4 font-normal">Asset</th>
                        <th className="p-4 font-normal">Name</th>
                        <th className="p-4 font-normal">Category</th>
                        <th className="p-4 font-normal">Price</th>
                        <th className="p-4 font-normal text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-16 bg-black border border-white/10 overflow-hidden">
                              <img src={product.images?.[0] || '/placeholder.png'} className="w-full h-full object-cover grayscale-[30%]" alt={product.name} />
                            </div>
                          </td>
                          <td className="p-4 font-serif text-base">{product.name}</td>
                          <td className="p-4 text-white/60 text-xs uppercase tracking-widest">{product.category}</td>
                          <td className="p-4 text-[#c4a484]">{product.price}</td>
                          <td className="p-4 text-right">
                            <button className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 mr-2 transition-colors">Edit</button>
                            <button className="text-[#ff4d4d]/70 hover:text-[#ff4d4d] text-[10px] uppercase tracking-widest border border-[#ff4d4d]/20 hover:border-[#ff4d4d]/50 px-3 py-1 transition-colors">Del</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}