import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  veg: boolean;
  image: string;
};

const defaultMenuItems: MenuItem[] = [
  { id: 1,  name: 'Veg Spring Roll',      category: 'Starters',       description: 'Crispy rolls filled with fresh vegetables and herbs',   price: 80,  veg: true,  image: 'https://images.unsplash.com/photo-1772004839635-77804fbc7729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 2,  name: 'Chicken 65',           category: 'Starters',       description: 'Spicy deep-fried chicken bites with curry leaves',       price: 150, veg: false, image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 3,  name: 'Paneer Tikka',         category: 'Starters',       description: 'Grilled cottage cheese with bell peppers and spices',    price: 140, veg: true,  image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 4,  name: 'Veg Steam Momo',       category: 'Momos',          description: 'Classic steamed vegetable dumplings',                    price: 80,  veg: true,  image: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 5,  name: 'Chicken Fried Momo',   category: 'Momos',          description: 'Crispy fried chicken momos with dipping sauce',         price: 120, veg: false, image: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 6,  name: 'Jhol Momo',            category: 'Momos',          description: 'Momos served in spicy tomato-sesame soup',              price: 130, veg: false, image: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 7,  name: 'Tandoori Momo',        category: 'Momos',          description: 'Grilled momos with tandoori spices and chutney',        price: 140, veg: false, image: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 8,  name: 'Thukpa',               category: 'Soups',          description: 'Traditional Tibetan noodle soup with vegetables',       price: 100, veg: true,  image: 'https://images.unsplash.com/photo-1701773169812-750e47f0ab19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 9,  name: 'Wonton Soup',          category: 'Soups',          description: 'Clear soup with delicate wonton dumplings',             price: 110, veg: false, image: 'https://images.unsplash.com/photo-1763994685090-c0927ff195d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 10, name: 'Veg Fried Rice',       category: 'Rice & Noodles', description: 'Classic Asian fried rice with seasonal vegetables',     price: 120, veg: true,  image: 'https://images.unsplash.com/photo-1591814252471-068b545dff62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 11, name: 'Chicken Chow Mein',    category: 'Rice & Noodles', description: 'Stir-fried noodles with chicken and vegetables',        price: 130, veg: false, image: 'https://images.unsplash.com/photo-1609690963718-0b55905aef78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 12, name: 'Hakka Noodles',        category: 'Rice & Noodles', description: 'Indo-Chinese style hakka noodles',                      price: 110, veg: true,  image: 'https://images.unsplash.com/photo-1609690963718-0b55905aef78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 13, name: 'Dal Bhat Set',         category: 'Thali Sets',     description: 'Rice, lentils, vegetables, pickle, and papad',          price: 150, veg: true,  image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 14, name: 'Full Thali',           category: 'Thali Sets',     description: 'Complete meal with rice, roti, dal, sabzi, and dessert',price: 200, veg: true,  image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 15, name: 'Butter Chicken',       category: 'Indian Mains',   description: 'Tender chicken in rich tomato-butter sauce',            price: 180, veg: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 16, name: 'Paneer Butter Masala', category: 'Indian Mains',   description: 'Cottage cheese in creamy tomato-butter gravy',          price: 160, veg: true,  image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 17, name: 'Kung Pao Chicken',     category: 'Chinese',        description: 'Spicy chicken with peanuts and dried chilies',          price: 170, veg: false, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 18, name: 'Masala Chai',          category: 'Beverages',      description: 'Traditional spiced tea brewed with ginger and cardamom',price: 30,  veg: true,  image: 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 19, name: 'Cold Coffee',          category: 'Beverages',      description: 'Refreshing iced coffee with cream',                     price: 80,  veg: true,  image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 20, name: 'Fresh Lime Soda',      category: 'Beverages',      description: 'Chilled lime with soda, sweet or salted',               price: 50,  veg: true,  image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 21, name: 'Kheer',                category: 'Desserts',       description: 'Creamy rice pudding with saffron and cardamom',         price: 60,  veg: true,  image: 'https://images.unsplash.com/photo-1704977893815-c8e63f01a42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 22, name: 'Sikarni',              category: 'Desserts',       description: 'Sweet yogurt dessert with nuts and dry fruits',         price: 70,  veg: true,  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

type MenuContextType = {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

const STORAGE_KEY = 'kalika_menu_items';

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMenuItems;
    } catch {
      return defaultMenuItems;
    }
  });

  const persist = (items: MenuItem[]) => {
    setMenuItemsState(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const setMenuItems = (items: MenuItem[]) => persist(items);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() };
    persist([...menuItems, newItem]);
  };

  const updateMenuItem = (updated: MenuItem) => {
    persist(menuItems.map((m) => (m.id === updated.id ? updated : m)));
  };

  const deleteMenuItem = (id: number) => {
    persist(menuItems.filter((m) => m.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}

export const menuCategories = [
  'Starters', 'Momos', 'Soups', 'Rice & Noodles',
  'Thali Sets', 'Indian Mains', 'Chinese', 'Beverages', 'Desserts',
];
