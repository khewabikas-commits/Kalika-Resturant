import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  LayoutDashboard,
  Utensils,
  LogOut,
  Edit3,
  Trash2,
  Plus,
  X,
  Phone,
  CheckCircle,
  Clock,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Save,
  AlertTriangle,
  UtensilsCrossed,
  ExternalLink,
} from 'lucide-react';
import { ImageWithFallback } from '../../components/ImageWithFallback';
import { useMenu, MenuItem, menuCategories } from '../../context/MenuContext';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'dashboard' | 'menu';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuSearch, setMenuSearch] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Auth guard
  useEffect(() => {
    const auth = sessionStorage.getItem('kalika_admin_auth');
    if (!auth) navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('kalika_admin_auth');
    navigate('/admin');
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingItem({ name: '', category: 'Starters', description: '', price: 0, veg: true, image: '' });
    setIsNew(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingItem?.name || !editingItem?.category) return;
    if (isNew) {
      addMenuItem(editingItem as Omit<MenuItem, 'id'>);
    } else {
      updateMenuItem(editingItem as MenuItem);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    deleteMenuItem(id);
    setConfirmDelete(null);
  };

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const stats = [
    { icon: Utensils,     label: 'Total Menu Items', value: menuItems.length,                   color: 'text-[#E8882A]', bg: 'rgba(232,136,42,0.12)',  border: 'rgba(232,136,42,0.25)' },
    { icon: CheckCircle,  label: 'Veg Items',         value: menuItems.filter(i => i.veg).length,  color: 'text-green-400', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.25)' },
    { icon: Utensils,     label: 'Non-Veg Items',      value: menuItems.filter(i => !i.veg).length, color: 'text-red-400',   bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.25)' },
    { icon: Users,        label: 'Categories',         value: menuCategories.length,                color: 'text-blue-400',  bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)' },
  ];

  const sidebarLinks: { icon: typeof LayoutDashboard; label: string; tab: Tab }[] = [
    { icon: LayoutDashboard, label: 'Dashboard',   tab: 'dashboard' },
    { icon: Utensils,        label: 'Manage Menu', tab: 'menu' },
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen flex" style={{ background: '#0d1b26', fontFamily: 'Inter, sans-serif', color: '#ffffff' }}>

      {/* ── SIDEBAR ── */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300 relative"
        style={{ width: sidebarOpen ? '220px' : '72px', background: '#1B3A2D', minHeight: '100vh', zIndex: 10 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10" style={{ minHeight: 72 }}>
          <div className="w-10 h-10 bg-[#E8882A] rounded-xl flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: 'Lora, serif', color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>KALIKA</div>
              <div style={{ color: '#E8882A', fontSize: '0.7rem', letterSpacing: '0.15em' }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {sidebarLinks.map(({ icon: Icon, label, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200"
              style={{
                background: activeTab === tab ? '#E8882A' : 'transparent',
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.65)',
              }}
              onMouseEnter={(e) => { if (activeTab !== tab) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { if (activeTab !== tab) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-semibold text-sm whitespace-nowrap">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium whitespace-nowrap">View Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-red-500/15"
            style={{ color: '#f87171' }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#E8882A] rounded-full flex items-center justify-center shadow-lg z-20"
        >
          {sidebarOpen
            ? <ChevronLeft className="w-3 h-3 text-white" />
            : <ChevronRight className="w-3 h-3 text-white" />
          }
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header
          className="flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0"
          style={{ background: '#141f2e', minHeight: 72 }}
        >
          <div>
            <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              Welcome back, <span style={{ color: '#E8882A' }}>Bikash</span> 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: 2 }}>{today}</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="w-9 h-9 bg-[#E8882A] rounded-lg flex items-center justify-center font-bold text-sm text-white flex-shrink-0">B</div>
            <div className="hidden sm:block">
              <p style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.2 }}>Bikash Limbu</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Administrator</p>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">

            {/* ─── DASHBOARD TAB ─── */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                  {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={i} className="rounded-2xl p-5" style={{ background: '#141f2e', border: `1px solid ${s.border}` }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg }}>
                          <Icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${s.color}`} style={{ fontFamily: 'Lora, serif' }}>{s.value}</div>
                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions — full width */}
                <div className="rounded-2xl border border-white/10 p-6" style={{ background: '#141f2e' }}>
                  <h3 style={{ fontFamily: 'Lora, serif', color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => { setActiveTab('menu'); setTimeout(openAddModal, 100); }}
                      className="flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-all duration-200 hover:opacity-90"
                      style={{ background: 'rgba(232,136,42,0.12)', border: '1px solid rgba(232,136,42,0.3)' }}
                    >
                      <Plus className="w-5 h-5 flex-shrink-0" style={{ color: '#E8882A' }} />
                      <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>Add New Menu Item</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-all duration-200 hover:bg-white/10"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <Edit3 className="w-5 h-5 flex-shrink-0 text-blue-400" />
                      <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>Edit Menu Prices</span>
                    </button>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }}>
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#E8882A' }} />
                      +91 8768 976 350
                    </div>
                    <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }}>
                      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#E8882A' }} />
                      Open Daily: 8:00 AM – 10:00 PM
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── MENU TAB ─── */}
            {activeTab === 'menu' && (
              <motion.div key="menu" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 style={{ fontFamily: 'Lora, serif', color: '#ffffff', fontSize: '1.4rem', fontWeight: 700 }}>Manage Menu</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.83rem' }}>{menuItems.length} items · Changes apply to the public menu instantly</p>
                  </div>
                  <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg flex-shrink-0"
                    style={{ background: '#E8882A' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#d17a24')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#E8882A')}
                  >
                    <Plus className="w-5 h-5" />
                    Add New Item
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-5">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search menu items..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none transition-colors text-sm"
                    style={{ background: '#141f2e', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                  />
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: '#141f2e' }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10" style={{ background: 'rgba(27,58,45,0.7)' }}>
                          {['#', 'Photo', 'Dish Name', 'Category', 'Type', 'Price', 'Actions'].map((h) => (
                            <th key={h} className="text-left px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap font-semibold"
                              style={{ color: 'rgba(255,255,255,0.45)' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMenu.map((item, index) => (
                          <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                            <td className="px-5 py-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{index + 1}</td>
                            <td className="px-5 py-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</div>
                              <div className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.description}</div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-sm px-2.5 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>
                                {item.category}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs px-2.5 py-1.5 rounded-lg font-semibold"
                                style={{
                                  background: item.veg ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                                  color: item.veg ? '#4ade80' : '#f87171',
                                }}>
                                {item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span style={{ fontFamily: 'Lora, serif', color: '#E8882A', fontWeight: 700, fontSize: '1.125rem' }}>₹{item.price}</span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openEditModal(item)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                                  style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa' }}
                                >
                                  <Edit3 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(item.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                                  style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171' }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredMenu.length === 0 && (
                    <div className="text-center py-14">
                      <Utensils className="w-10 h-10 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
                      <p style={{ color: 'rgba(255,255,255,0.35)' }}>No items found</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ─── EDIT / ADD MODAL ─── */}
      <AnimatePresence>
        {showModal && editingItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              style={{ background: '#141f2e', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10" style={{ background: 'rgba(27,58,45,0.6)' }}>
                <div>
                  <h3 style={{ fontFamily: 'Lora, serif', color: '#ffffff', fontWeight: 700, fontSize: '1.125rem' }}>
                    {isNew ? '+ Add New Dish' : '✏️ Edit Menu Item'}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem' }}>
                    {isNew ? 'Fill in the details below' : `Editing: ${editingItem.name}`}
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl transition-colors hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Dish Name *</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                    placeholder="e.g. Chicken Thukpa"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Category *</label>
                  <select
                    value={editingItem.category || 'Starters'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                  >
                    {menuCategories.map((c) => <option key={c} value={c} style={{ background: '#141f2e' }}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Description</label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                    placeholder="Short description of the dish..."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#E8882A' }}>💰 Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl" style={{ color: '#E8882A' }}>₹</span>
                    <input
                      type="number"
                      value={editingItem.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                      className="w-full pl-9 pr-4 py-4 rounded-xl text-2xl font-bold focus:outline-none transition-all"
                      style={{ background: 'rgba(232,136,42,0.1)', border: '2px solid rgba(232,136,42,0.4)', color: '#E8882A' }}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Type</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditingItem({ ...editingItem, veg: true })}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        background: editingItem.veg ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                        border: editingItem.veg ? '2px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        color: editingItem.veg ? '#4ade80' : 'rgba(255,255,255,0.35)',
                      }}>
                      🟢 Vegetarian
                    </button>
                    <button type="button" onClick={() => setEditingItem({ ...editingItem, veg: false })}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        background: !editingItem.veg ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                        border: !editingItem.veg ? '2px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        color: !editingItem.veg ? '#f87171' : 'rgba(255,255,255,0.35)',
                      }}>
                      🔴 Non-Vegetarian
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Photo URL</label>
                  <input
                    type="url"
                    value={editingItem.image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave}
                    className="flex-1 text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-colors"
                    style={{ background: '#E8882A' }}>
                    <Save className="w-5 h-5" />
                    {isNew ? 'Add to Menu' : 'Save Changes'}
                  </button>
                  <button onClick={() => setShowModal(false)}
                    className="flex-1 py-3.5 rounded-xl font-semibold transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }}>
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DELETE CONFIRM MODAL ─── */}
      <AnimatePresence>
        {confirmDelete !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 max-w-sm w-full text-center rounded-2xl shadow-2xl"
              style={{ background: '#141f2e', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.12)' }}>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 style={{ fontFamily: 'Lora, serif', color: '#ffffff', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>Delete Item?</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                This will permanently remove the dish from your menu. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <button onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-3 rounded-xl font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SAVE SUCCESS TOAST ─── */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-5 h-5" />
            Changes saved — Menu updated!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
