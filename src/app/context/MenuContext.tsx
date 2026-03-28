import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LOCAL_UPLOADED_IMAGE_BASE_PATH, LOCAL_UPLOADED_IMAGE_FILES } from './localUploadedImages';

export type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  veg: boolean;
  image: string;
};

export type PublicMenuCategoryGroup = {
  name: string;
  emoji: string;
  categories: string[];
};

// Public Menu page groups (simplified category tabs)
// - "Main Course" includes "Biryani"
// - "Drinks" includes all alcohol categories
export const publicMenuCategoryGroups: PublicMenuCategoryGroup[] = [
  { name: 'Hot Beverage', emoji: '☕', categories: ['Hot Beverage'] },
  { name: 'Shakes', emoji: '🥤', categories: ['Shakes'] },
  { name: 'Cold Drinks', emoji: '🧊', categories: ['Cold Drinks'] },
  { name: 'Soup', emoji: '🍲', categories: ['Soup'] },
  { name: 'Sides', emoji: '🍽️', categories: ['Sides'] },
  { name: 'Bites', emoji: '🌯', categories: ['Bites'] },
  { name: 'Himalayan Delicacy', emoji: '🏔️', categories: ['Himalayan Delicacy'] },
  { name: 'Noodles', emoji: '🍜', categories: ['Noodles'] },
  { name: 'Starter Veg', emoji: '🥗', categories: ['Starter Veg'] },
  { name: 'Non-Veg', emoji: '🍗', categories: ['Non-Veg'] },
  { name: 'Main Course', emoji: '🍛', categories: ['Main Course', 'Biryani'] },
  { name: 'Extra', emoji: '➕', categories: ['Extra'] },
  { name: 'From Tawa', emoji: '🫓', categories: ['From Tawa'] },
  { name: 'Thali', emoji: '🍽️', categories: ['Thali'] },
  { name: 'Drinks', emoji: '🍻', categories: ['Rum', 'Whiskey', 'Vodka', 'Breezer', 'Beer', 'Wine', 'Can Beer', 'Brandy'] },
];

type SeedItem = {
  name: string;
  category: string;
  price: number;
  veg: boolean;
  description?: string;
  image?: string;
};

const DEFAULT_FOOD_IMG = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';
const DEFAULT_DRINK_IMG = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';

// Uploaded local images (served via Vite publicDir) live at:
// /assets/images/<filename>
// The manifest is generated from src/public/assets/images.
const LOCAL_IMAGE_BASE_PATH = LOCAL_UPLOADED_IMAGE_BASE_PATH;
const LOCAL_COMMON_DRINK_IMAGE = `${LOCAL_IMAGE_BASE_PATH}common.jpg`;

const LOCAL_UPLOADED_FILE_BY_LOWER = new Map<string, string>();
for (const file of LOCAL_UPLOADED_IMAGE_FILES) LOCAL_UPLOADED_FILE_BY_LOWER.set(file.toLowerCase(), file);

const normalizeLocalImageKey = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const LOCAL_IMAGE_BY_KEY = new Map<string, string>();
for (const file of LOCAL_UPLOADED_IMAGE_FILES) {
  const baseName = file.replace(/\.[^.]+$/i, '');
  LOCAL_IMAGE_BY_KEY.set(normalizeLocalImageKey(baseName), file);
}

// Some uploaded files have typos/inconsistent naming; map common menu names to them.
const LOCAL_IMAGE_KEY_ALIASES: Record<string, string> = {
  [normalizeLocalImageKey('Pineapple Shake')]: normalizeLocalImageKey('Pinappe Shake'),
  [normalizeLocalImageKey('Manchow Soup')]: normalizeLocalImageKey('Munchow Soup'),
  [normalizeLocalImageKey('Mushroom Soup')]: normalizeLocalImageKey('Mushromm Soup'),
  [normalizeLocalImageKey('Cheese Omelet')]: normalizeLocalImageKey('Cheese Omlet'),
  [normalizeLocalImageKey('Plain Omelet')]: normalizeLocalImageKey('Cheese Omlet'),
  [normalizeLocalImageKey('Masala Omelet')]: normalizeLocalImageKey('Masala omlrt'),
  [normalizeLocalImageKey('Paneer Roll')]: normalizeLocalImageKey('Paneere Roll'),
  [normalizeLocalImageKey('Kurkure Spring Roll')]: normalizeLocalImageKey('Kurkure  Spring Roll'),
  [normalizeLocalImageKey('Pork Thukpa')]: normalizeLocalImageKey('Pork Thupka'),
};

const toLocalImageUrl = (fileName: string) => `${LOCAL_IMAGE_BASE_PATH}${encodeURIComponent(fileName)}`;

const getLocalImageForItem = (name: string) => {
  const candidates = [name, name.replace(/\s*\([^)]*\)\s*/g, ' ').trim()].filter(Boolean);
  for (const candidate of candidates) {
    const key = normalizeLocalImageKey(candidate);
    const resolvedKey = LOCAL_IMAGE_KEY_ALIASES[key] ?? key;
    const file = LOCAL_IMAGE_BY_KEY.get(resolvedKey);
    if (file) return toLocalImageUrl(file);
  }

  // Shared fallback: biryani photo for both veg/non-veg biryani.
  // NOTE: Keep this above the generic chicken fallback so "Chicken Biryani"
  // uses biriyani.jpg (not chicken.jpg).
  const genericBiryaniFile = LOCAL_UPLOADED_FILE_BY_LOWER.get('biriyani.jpg');
  if (genericBiryaniFile) {
    const tokens = normalizeLocalImageKey(name).split(' ');
    if (tokens.includes('biryani') || tokens.includes('biriyani')) return toLocalImageUrl(genericBiryaniFile);
  }

  // Shared fallback: if the repo has a generic chicken image uploaded, use it
  // for chicken items that don't yet have a dedicated per-item file.
  const genericChickenFile = LOCAL_UPLOADED_FILE_BY_LOWER.get('chicken.jpg');
  if (genericChickenFile) {
    const tokens = normalizeLocalImageKey(name).split(' ');
    if (tokens.includes('chicken')) return toLocalImageUrl(genericChickenFile);
  }

  return undefined;
};

const extractLocalUploadedFileFromUrl = (url: string) => {
  const marker = '/assets/images/';
  const idx = url.toLowerCase().lastIndexOf(marker);
  if (idx === -1) return undefined;

  const raw = url.slice(idx + marker.length).split('?')[0]?.split('#')[0] ?? '';
  if (!raw) return undefined;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // If it's not valid URI encoding, fall back to raw
  }

  // Enforce the exact filename case that exists in the manifest.
  return LOCAL_UPLOADED_FILE_BY_LOWER.get(decoded.toLowerCase());
};

const isTeaOrCoffeeFileName = (fileName: string | undefined) => {
  if (!fileName) return false;
  const base = fileName.replace(/\.[^.]+$/i, '');
  const tokens = normalizeLocalImageKey(base).split(' ');
  return tokens.includes('tea') || tokens.includes('coffee');
};

const DRINK_CATEGORIES = new Set(['Rum', 'Whiskey', 'Vodka', 'Breezer', 'Beer', 'Wine', 'Can Beer', 'Brandy']);
const BEVERAGE_CATEGORIES = new Set(['Hot Beverage', 'Shakes', 'Cold Drinks', ...Array.from(DRINK_CATEGORIES)]);

// These URLs are already used elsewhere in the site, so they are known-good
// in the deployment/network environment.
const IMG_MOMO = 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_THUKPA = 'https://images.unsplash.com/photo-1701773169812-750e47f0ab19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_DAL_BHAT = 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_WAIWAI = 'https://images.unsplash.com/photo-1591814252471-068b545dff62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_CHAI = 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG_INTERIOR = 'https://images.unsplash.com/photo-1669043962012-a5b8496cd664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const hashString = (value: string) => {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) hash = (hash * 33) ^ value.charCodeAt(i);
  return hash >>> 0;
};

const pickFromPool = (pool: string[], seed: string) => {
  if (pool.length === 0) return DEFAULT_FOOD_IMG;
  return pool[hashString(seed) % pool.length];
};

const FOOD_GENERIC_POOL = [DEFAULT_FOOD_IMG, IMG_THUKPA, IMG_MOMO, IMG_DAL_BHAT, IMG_WAIWAI];
// Use a single neutral placeholder for beverages unless a specific image is set.
// This avoids showing one drink's photo for another drink.
const DRINK_GENERIC_POOL = [DEFAULT_DRINK_IMG];

const CATEGORY_IMAGE_POOLS: Record<string, string[]> = {
  // Beverages
  'Hot Beverage': [IMG_CHAI, ...DRINK_GENERIC_POOL],
  Shakes: [...DRINK_GENERIC_POOL],
  'Cold Drinks': [...DRINK_GENERIC_POOL],
  Rum: [...DRINK_GENERIC_POOL],
  Whiskey: [...DRINK_GENERIC_POOL],
  Vodka: [...DRINK_GENERIC_POOL],
  Breezer: [...DRINK_GENERIC_POOL],
  Beer: [...DRINK_GENERIC_POOL],
  Wine: [...DRINK_GENERIC_POOL],
  'Can Beer': [...DRINK_GENERIC_POOL],
  Brandy: [...DRINK_GENERIC_POOL],

  // Food (category-appropriate)
  Soup: [IMG_THUKPA, ...FOOD_GENERIC_POOL],
  Noodles: [IMG_WAIWAI, IMG_THUKPA, ...FOOD_GENERIC_POOL],
  'Himalayan Delicacy': [IMG_MOMO, IMG_THUKPA, IMG_WAIWAI, ...FOOD_GENERIC_POOL],
};

const getAutoImageUrl = (name: string, category: string) => {
  // Prefer any uploaded local image that matches by name.
  const local = getLocalImageForItem(name);
  if (local) return local;

  // For drinks, fall back to a neutral common photo.
  if (DRINK_CATEGORIES.has(category)) return LOCAL_COMMON_DRINK_IMAGE;

  const pool = CATEGORY_IMAGE_POOLS[category] ?? (BEVERAGE_CATEGORIES.has(category) ? DRINK_GENERIC_POOL : FOOD_GENERIC_POOL);
  return pickFromPool(pool, `${category}|${name}`);
};

const seedItems: SeedItem[] = [
  // Hot Beverage
  { name: 'Milk Tea', category: 'Hot Beverage', price: 30, veg: true },
  { name: 'Black Tea', category: 'Hot Beverage', price: 20, veg: true },
  { name: 'Milk Coffee', category: 'Hot Beverage', price: 60, veg: true },
  { name: 'Black Coffee', category: 'Hot Beverage', price: 40, veg: true },
  { name: 'Lemon Tea', category: 'Hot Beverage', price: 40, veg: true },
  { name: 'Ginger Tea', category: 'Hot Beverage', price: 40, veg: true },
  { name: 'Ginger Lemon Tea', category: 'Hot Beverage', price: 50, veg: true },
  { name: 'Ginger Honey Tea', category: 'Hot Beverage', price: 60, veg: true },
  { name: 'Masala Tea', category: 'Hot Beverage', price: 60, veg: true },

  // Shakes
  { name: 'Mango Shake', category: 'Shakes', price: 110, veg: true },
  { name: 'Pineapple Shake', category: 'Shakes', price: 110, veg: true },
  { name: 'Blue Berry Shake', category: 'Shakes', price: 130, veg: true },
  { name: 'Watermelon Shake', category: 'Shakes', price: 140, veg: true },
  { name: 'Vanilla Shake', category: 'Shakes', price: 110, veg: true },
  { name: 'Banana Shake', category: 'Shakes', price: 110, veg: true },
  { name: 'Strawberry Shake', category: 'Shakes', price: 110, veg: true },
  { name: 'Cold Coffee', category: 'Shakes', price: 110, veg: true },

  // Cold Drinks
  { name: 'Red Bull', category: 'Cold Drinks', price: 150, veg: true },
  { name: 'Hell', category: 'Cold Drinks', price: 80, veg: true },
  { name: 'Predator', category: 'Cold Drinks', price: 80, veg: true },
  { name: 'Coke', category: 'Cold Drinks', price: 30, veg: true },
  { name: 'Fanta', category: 'Cold Drinks', price: 30, veg: true },
  { name: 'Sprite', category: 'Cold Drinks', price: 30, veg: true },

  // Soup
  { name: 'Hot & Sour Soup (Veg)', category: 'Soup', price: 180, veg: true },
  { name: 'Sweet Corn Soup', category: 'Soup', price: 190, veg: true },
  { name: 'Mushroom Soup', category: 'Soup', price: 170, veg: true },
  { name: 'Hot & Sour Soup (Chicken)', category: 'Soup', price: 220, veg: false },
  { name: 'Coriander Soup', category: 'Soup', price: 170, veg: true },
  { name: 'Cream of Mushroom Soup', category: 'Soup', price: 180, veg: true },
  { name: 'Manchow Soup', category: 'Soup', price: 210, veg: true },

  // Sides
  { name: 'Papad Masala', category: 'Sides', price: 110, veg: true },
  { name: 'Peanut Masala', category: 'Sides', price: 210, veg: true },
  { name: 'Cheese Omelet', category: 'Sides', price: 160, veg: true },
  { name: 'Plain Omelet', category: 'Sides', price: 50, veg: true },
  { name: 'Sadheko Wai Wai', category: 'Sides', price: 80, veg: true },
  { name: 'Masala Omelet', category: 'Sides', price: 40, veg: true },
  { name: 'Sunny Side Up', category: 'Sides', price: 25, veg: true },

  // Bites
  { name: 'Egg Roll', category: 'Bites', price: 140, veg: true },
  { name: 'Chicken Roll', category: 'Bites', price: 160, veg: false },
  { name: 'Paneer Roll', category: 'Bites', price: 140, veg: true },
  { name: 'Veg Roll', category: 'Bites', price: 110, veg: true },
  { name: 'Spring Roll', category: 'Bites', price: 180, veg: true },
  { name: 'Kurkure Spring Roll', category: 'Bites', price: 200, veg: true },

  // Himalayan Delicacy
  { name: 'Aloo Dum', category: 'Himalayan Delicacy', price: 120, veg: true },
  { name: 'Chicken Taipo', category: 'Himalayan Delicacy', price: 70, veg: false },
  { name: 'Chicken Jhol Momo', category: 'Himalayan Delicacy', price: 150, veg: false },
  { name: 'Chicken Thukpa', category: 'Himalayan Delicacy', price: 100, veg: false },
  { name: 'Chicken Momo', category: 'Himalayan Delicacy', price: 100, veg: false },
  { name: 'Chicken Fry Momo', category: 'Himalayan Delicacy', price: 140, veg: false },
  { name: 'Chicken Chilli Momo', category: 'Himalayan Delicacy', price: 150, veg: false },
  { name: 'Pork Momo', category: 'Himalayan Delicacy', price: 130, veg: false },
  { name: 'Pork Thukpa', category: 'Himalayan Delicacy', price: 120, veg: false },
  { name: 'Pork Taipo', category: 'Himalayan Delicacy', price: 70, veg: false },

  // Noodles
  { name: 'Chicken Chowmein', category: 'Noodles', price: 110, veg: false },
  { name: 'Chicken Hakka Noodles', category: 'Noodles', price: 170, veg: false },
  { name: 'Chicken Burnt Garlic Noodles', category: 'Noodles', price: 190, veg: false },
  { name: 'Chicken Brown Noodles', category: 'Noodles', price: 190, veg: false },
  { name: 'Chicken Chilli Garlic Noodles', category: 'Noodles', price: 160, veg: false },
  { name: 'Pork Chowmein', category: 'Noodles', price: 140, veg: false },
  { name: 'Chicken Fry Rice', category: 'Noodles', price: 140, veg: false },
  { name: 'Chicken Brown Rice', category: 'Noodles', price: 210, veg: false },
  { name: 'Chicken Burnt Garlic Rice', category: 'Noodles', price: 140, veg: false },
  { name: 'Chicken Chilli Garlic Rice', category: 'Noodles', price: 150, veg: false },
  { name: 'Pork Fry Rice', category: 'Noodles', price: 150, veg: false },
  { name: 'Schezwan Fried Rice', category: 'Noodles', price: 210, veg: false },

  // Starter Veg
  { name: 'Paneer Chilli', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Paneer Pakoda', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Paneer Dry Fry', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Corn Salt & Pepper', category: 'Starter Veg', price: 210, veg: true },
  { name: 'French Fry', category: 'Starter Veg', price: 200, veg: true },
  { name: 'French Fry Piri Piri', category: 'Starter Veg', price: 230, veg: true },
  { name: 'Chilli Potato', category: 'Starter Veg', price: 210, veg: true },
  { name: 'Honey Chilli Potato', category: 'Starter Veg', price: 240, veg: true },
  { name: 'Crispy Potato Dzegden', category: 'Starter Veg', price: 220, veg: true },
  { name: 'Mushroom Chilli', category: 'Starter Veg', price: 250, veg: true },
  { name: 'Veg Pakoda', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Golden Baby Corn', category: 'Starter Veg', price: 210, veg: true },
  { name: 'Corn Chilli', category: 'Starter Veg', price: 240, veg: true },
  { name: 'Onion Pakora', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Cheese Ball', category: 'Starter Veg', price: 200, veg: true },
  { name: 'Onion Ring', category: 'Starter Veg', price: 180, veg: true },
  { name: 'Paneer Finger', category: 'Starter Veg', price: 220, veg: true },

  // Non-Veg
  { name: 'Chicken Chilli', category: 'Non-Veg', price: 310, veg: false },
  { name: 'Chicken Popcorn', category: 'Non-Veg', price: 300, veg: false },
  { name: 'Chicken 65', category: 'Non-Veg', price: 310, veg: false },
  { name: 'Chicken Lollipop (6 pcs)', category: 'Non-Veg', price: 300, veg: false },
  { name: 'Chicken Dry Fry', category: 'Non-Veg', price: 260, veg: false },
  { name: 'BBQ Wings', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Oyster Chilli Chicken', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Pepper Chicken', category: 'Non-Veg', price: 310, veg: false },
  { name: 'Drums of Heaven', category: 'Non-Veg', price: 320, veg: false },
  { name: 'Kalika Special Chicken', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Ginger Chicken', category: 'Non-Veg', price: 260, veg: false },
  { name: 'Pork Chilli', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Pork Dry Fry', category: 'Non-Veg', price: 300, veg: false },
  { name: 'Prawn Chilli', category: 'Non-Veg', price: 380, veg: false },
  { name: 'Prawn Dry Fry', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Fish Finger', category: 'Non-Veg', price: 310, veg: false },
  { name: 'Fish Fry', category: 'Non-Veg', price: 280, veg: false },
  { name: 'Fish Chilli', category: 'Non-Veg', price: 310, veg: false },
  { name: 'Crispy Chicken', category: 'Non-Veg', price: 210, veg: false },
  { name: 'Hot Garlic Chicken', category: 'Non-Veg', price: 300, veg: false },
  { name: 'Teriyaki Chicken', category: 'Non-Veg', price: 300, veg: false },
  { name: 'Golden Fry Prawn', category: 'Non-Veg', price: 350, veg: false },
  { name: 'Grill Chicken', category: 'Non-Veg', price: 450, veg: false },
  { name: 'Piri Piri Chicken', category: 'Non-Veg', price: 300, veg: false },

  // Main Course
  { name: 'Steam Rice', category: 'Main Course', price: 80, veg: true },
  { name: 'Veg Pulao', category: 'Main Course', price: 200, veg: true },
  { name: 'Jeera Rice', category: 'Main Course', price: 130, veg: true },
  { name: 'Kadai Paneer', category: 'Main Course', price: 210, veg: true },
  { name: 'Kashmiri Pulao', category: 'Main Course', price: 170, veg: true },
  { name: 'Ghee Rice', category: 'Main Course', price: 150, veg: true },
  { name: 'Chicken Masala', category: 'Main Course', price: 210, veg: false },
  { name: 'Chicken Kosa', category: 'Main Course', price: 210, veg: false },
  { name: 'Chicken Do Pyaza', category: 'Main Course', price: 230, veg: false },
  { name: 'Paneer Malai Kofta', category: 'Main Course', price: 350, veg: true },
  { name: 'Sai Paneer', category: 'Main Course', price: 300, veg: true },
  { name: 'Fish Curry (2 pcs)', category: 'Main Course', price: 200, veg: false },
  { name: 'Chicken Curry', category: 'Main Course', price: 250, veg: false },
  { name: 'Pepper Chicken', category: 'Main Course', price: 310, veg: false },
  { name: 'Pork Curry', category: 'Main Course', price: 300, veg: false },
  { name: 'Mutton Curry', category: 'Main Course', price: 400, veg: false },
  { name: 'Buff Curry', category: 'Main Course', price: 400, veg: false },
  { name: 'Kadai Chicken', category: 'Main Course', price: 320, veg: false },
  { name: 'Chicken Butter Masala', category: 'Main Course', price: 350, veg: false },
  { name: 'Mix Veg (1 plate)', category: 'Main Course', price: 80, veg: true },
  { name: 'Matar Paneer (1 plate)', category: 'Main Course', price: 200, veg: true },
  { name: 'Kadhai Paneer (1 plate)', category: 'Main Course', price: 210, veg: true },
  { name: 'Paneer Butter Masala', category: 'Main Course', price: 250, veg: true },
  { name: 'Aloo Jeera Masala', category: 'Main Course', price: 100, veg: true },
  { name: 'Aloo Matar', category: 'Main Course', price: 100, veg: true },
  { name: 'Egg Curry', category: 'Main Course', price: 100, veg: false },
  { name: 'Plain Dal', category: 'Main Course', price: 50, veg: true },
  { name: 'Dal Fry', category: 'Main Course', price: 70, veg: true },
  { name: 'Dal Tadka', category: 'Main Course', price: 100, veg: true },

  // Biryani
  { name: 'Veg Biryani', category: 'Biryani', price: 200, veg: true },
  { name: 'Chicken Biryani', category: 'Biryani', price: 300, veg: false },

  // Extra
  { name: 'Puri Sabji with Curd', category: 'Extra', price: 140, veg: true },
  { name: 'Roti Sabji with Curd', category: 'Extra', price: 160, veg: true },

  // From Tawa
  { name: 'Tawa Roti (1 pc)', category: 'From Tawa', price: 20, veg: true },
  { name: 'Butter Roti (1 pc)', category: 'From Tawa', price: 25, veg: true },
  { name: 'Aloo Paratha with Curd', category: 'From Tawa', price: 130, veg: true },
  { name: 'Paneer Paratha with Curd', category: 'From Tawa', price: 150, veg: true },
  { name: 'Plain Paratha (1 pc)', category: 'From Tawa', price: 30, veg: true },
  { name: 'Lachha Paratha (1 pc)', category: 'From Tawa', price: 60, veg: true },

  // Thali
  { name: 'Veg Thali', category: 'Thali', price: 140, veg: true },
  { name: 'Chicken Thali', category: 'Thali', price: 180, veg: false },
  { name: 'Pork Thali', category: 'Thali', price: 200, veg: false },
  { name: 'Fish Thali', category: 'Thali', price: 180, veg: false },
  { name: 'Paneer Thali', category: 'Thali', price: 150, veg: true },

  // Drinks — Rum
  { name: 'Old Monk (30ml)', category: 'Rum', price: 30, veg: true },
  { name: 'Old Monk (60ml)', category: 'Rum', price: 40, veg: true },
  { name: 'XXX Rum (30ml)', category: 'Rum', price: 30, veg: true },
  { name: 'XXX Rum (60ml)', category: 'Rum', price: 40, veg: true },
  { name: 'Bacardi Lemon (30ml)', category: 'Rum', price: 50, veg: true },
  { name: 'Bacardi Lemon (60ml)', category: 'Rum', price: 90, veg: true },
  { name: 'Bacardi Mango (30ml)', category: 'Rum', price: 50, veg: true },
  { name: 'Bacardi Mango (60ml)', category: 'Rum', price: 90, veg: true },
  { name: 'Bacardi Plain (30ml)', category: 'Rum', price: 50, veg: true },
  { name: 'Bacardi Plain (60ml)', category: 'Rum', price: 90, veg: true },
  { name: 'McDowells (30ml)', category: 'Rum', price: 40, veg: true },
  { name: 'McDowells (60ml)', category: 'Rum', price: 50, veg: true },
  { name: 'Black Bacardi (30ml)', category: 'Rum', price: 40, veg: true },
  { name: 'Black Bacardi (60ml)', category: 'Rum', price: 80, veg: true },
  { name: 'Old Monk Coffee (30ml)', category: 'Rum', price: 50, veg: true },
  { name: 'Old Monk Coffee (60ml)', category: 'Rum', price: 90, veg: true },

  // Drinks — Whiskey
  { name: 'Royal Stag (30ml)', category: 'Whiskey', price: 40, veg: true },
  { name: 'Royal Stag (60ml)', category: 'Whiskey', price: 50, veg: true },
  { name: 'Royal Blue (30ml)', category: 'Whiskey', price: 30, veg: true },
  { name: 'Royal Blue (60ml)', category: 'Whiskey', price: 45, veg: true },
  { name: 'Blenders Pride (30ml)', category: 'Whiskey', price: 50, veg: true },
  { name: 'Blenders Pride (60ml)', category: 'Whiskey', price: 90, veg: true },
  { name: 'Signature (30ml)', category: 'Whiskey', price: 50, veg: true },
  { name: 'Signature (60ml)', category: 'Whiskey', price: 90, veg: true },
  { name: '100 Piper (30ml)', category: 'Whiskey', price: 120, veg: true },
  { name: '100 Piper (60ml)', category: 'Whiskey', price: 170, veg: true },
  { name: "Teacher's 50 (30ml)", category: 'Whiskey', price: 140, veg: true },
  { name: "Teacher's 50 (60ml)", category: 'Whiskey', price: 210, veg: true },
  { name: 'Black Dog I (30ml)', category: 'Whiskey', price: 140, veg: true },
  { name: 'Black Dog I (60ml)', category: 'Whiskey', price: 220, veg: true },
  { name: 'Black Dog II (30ml)', category: 'Whiskey', price: 110, veg: true },
  { name: 'Black Dog II (60ml)', category: 'Whiskey', price: 170, veg: true },
  { name: 'Red Label (30ml)', category: 'Whiskey', price: 140, veg: true },
  { name: 'Red Label (60ml)', category: 'Whiskey', price: 170, veg: true },
  { name: '8PM Black (30ml)', category: 'Whiskey', price: 40, veg: true },
  { name: '8PM Black (60ml)', category: 'Whiskey', price: 50, veg: true },
  { name: 'Antiquity Blue (30ml)', category: 'Whiskey', price: 70, veg: true },
  { name: 'Antiquity Blue (60ml)', category: 'Whiskey', price: 120, veg: true },
  { name: 'Teesta (30ml)', category: 'Whiskey', price: 40, veg: true },
  { name: 'Teesta (60ml)', category: 'Whiskey', price: 60, veg: true },
  { name: 'Black Piper (30ml)', category: 'Whiskey', price: 30, veg: true },
  { name: 'Black Piper (60ml)', category: 'Whiskey', price: 45, veg: true },
  { name: 'Green Label (30ml)', category: 'Whiskey', price: 30, veg: true },
  { name: 'Green Label (60ml)', category: 'Whiskey', price: 50, veg: true },
  { name: 'Ocean Blue (30ml)', category: 'Whiskey', price: 30, veg: true },
  { name: 'Ocean Blue (60ml)', category: 'Whiskey', price: 45, veg: true },
  { name: "Ballantine's (30ml)", category: 'Whiskey', price: 110, veg: true },
  { name: "Ballantine's (60ml)", category: 'Whiskey', price: 170, veg: true },
  { name: 'Momentum (30ml)', category: 'Whiskey', price: 40, veg: true },
  { name: 'Momentum (60ml)', category: 'Whiskey', price: 60, veg: true },
  { name: 'Vat 69 (30ml)', category: 'Whiskey', price: 110, veg: true },
  { name: 'Vat 69 (60ml)', category: 'Whiskey', price: 170, veg: true },
  { name: 'Black Label (30ml)', category: 'Whiskey', price: 200, veg: true },
  { name: 'Black Label (60ml)', category: 'Whiskey', price: 320, veg: true },
  { name: 'Jameson (30ml)', category: 'Whiskey', price: 140, veg: true },
  { name: 'Jameson (60ml)', category: 'Whiskey', price: 200, veg: true },

  // Drinks — Vodka
  { name: 'Magic Moment Plain (30ml)', category: 'Vodka', price: 40, veg: true },
  { name: 'Magic Moment Plain (60ml)', category: 'Vodka', price: 60, veg: true },
  { name: 'Magic Moment Apple (30ml)', category: 'Vodka', price: 40, veg: true },
  { name: 'Magic Moment Apple (60ml)', category: 'Vodka', price: 60, veg: true },
  { name: 'White Mischief (30ml)', category: 'Vodka', price: 40, veg: true },
  { name: 'White Mischief (60ml)', category: 'Vodka', price: 60, veg: true },
  { name: 'Smirnoff (30ml)', category: 'Vodka', price: 50, veg: true },
  { name: 'Smirnoff (60ml)', category: 'Vodka', price: 90, veg: true },
  { name: 'Blue Sapphire (30ml)', category: 'Vodka', price: 40, veg: true },
  { name: 'Blue Sapphire (60ml)', category: 'Vodka', price: 60, veg: true },

  // Drinks — Breezer (275ml)
  { name: 'Black Berry (275ml)', category: 'Breezer', price: 140, veg: true },
  { name: 'Jamaican (275ml)', category: 'Breezer', price: 140, veg: true },
  { name: 'Cranberry Bacardi (275ml)', category: 'Breezer', price: 150, veg: true },

  // Drinks — Beer (750ml)
  { name: 'Hit (750ml)', category: 'Beer', price: 140, veg: true },
  { name: 'Kingfisher Stag (750ml)', category: 'Beer', price: 150, veg: true },
  { name: 'Kingfisher Premium (750ml)', category: 'Beer', price: 150, veg: true },
  { name: 'Dansberg Strong (750ml)', category: 'Beer', price: 150, veg: true },
  { name: 'Old Monk Strong (750ml)', category: 'Beer', price: 140, veg: true },
  { name: 'Red Semo Strong (750ml)', category: 'Beer', price: 150, veg: true },
  { name: 'Red Semo Premium (750ml)', category: 'Beer', price: 150, veg: true },

  // Drinks — Wine
  { name: 'Zang Wine (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Zang Wine (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Red Wine (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Red Wine (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Red Saino (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Red Saino (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Vasco Red (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Vasco Red (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Vasco Peach (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Vasco Peach (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Arucha (30ml)', category: 'Wine', price: 30, veg: true },
  { name: 'Arucha (60ml)', category: 'Wine', price: 50, veg: true },
  { name: 'Samara (30ml)', category: 'Wine', price: 40, veg: true },
  { name: 'Samara (60ml)', category: 'Wine', price: 60, veg: true },

  // Drinks — Can Beer (500ml)
  { name: 'Kingfisher Strong (500ml)', category: 'Can Beer', price: 170, veg: true },
  { name: 'Kingfisher Premium (500ml)', category: 'Can Beer', price: 160, veg: true },
  { name: 'Old Monk Strong (500ml)', category: 'Can Beer', price: 140, veg: true },
  { name: 'Budweiser Magnum (500ml)', category: 'Can Beer', price: 210, veg: true },
  { name: 'Budweiser Premium (500ml)', category: 'Can Beer', price: 200, veg: true },
  { name: 'Red Semo Strong (500ml)', category: 'Can Beer', price: 140, veg: true },
  { name: 'Red Semo Premium (500ml)', category: 'Can Beer', price: 140, veg: true },

  // Drinks — Brandy
  { name: 'Honey Bee (30ml)', category: 'Brandy', price: 30, veg: true },
  { name: 'Honey Bee (60ml)', category: 'Brandy', price: 50, veg: true },
  { name: 'Mansion House (30ml)', category: 'Brandy', price: 40, veg: true },
  { name: 'Mansion House (60ml)', category: 'Brandy', price: 60, veg: true },
  { name: 'Morpheus (30ml)', category: 'Brandy', price: 50, veg: true },
  { name: 'Morpheus (60ml)', category: 'Brandy', price: 80, veg: true },
];

const getDefaultImage = (category: string) => (BEVERAGE_CATEGORIES.has(category) ? DEFAULT_DRINK_IMG : DEFAULT_FOOD_IMG);

const defaultMenuItems: MenuItem[] = seedItems.map((item, index) => ({
  id: index + 1,
  name: item.name,
  category: item.category,
  description: item.description ?? '',
  price: item.price,
  veg: item.veg,
  image: item.image ?? getAutoImageUrl(item.name, item.category),
}));

type MenuContextType = {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

// Stored menu can be edited in Admin. We migrate placeholder images in-place
// instead of bumping the key (which would wipe admin edits).
const STORAGE_KEY = 'kalika_menu_items_v2';

const migrateMenuImages = (items: MenuItem[]) =>
  items.map((item) => {
    // Migrations for naming consistency
    const canonicalName = item.category === 'Cold Drinks' && item.name === 'Red Blue' ? 'Red Bull' : item.name;

    if (canonicalName !== item.name) {
      item = { ...item, name: canonicalName };
    }

    const matchingLocal = getLocalImageForItem(item.name);
    const currentLocalFile = item.image ? extractLocalUploadedFileFromUrl(item.image) : undefined;
    const expectedLocalFile = matchingLocal ? extractLocalUploadedFileFromUrl(matchingLocal) : undefined;
    const hasLocalCommon = currentLocalFile?.toLowerCase() === 'common.jpg';
    const hasBrokenLocal = item.image?.includes('/assets/images/') && !currentLocalFile;
    const hasTeaOrCoffeeLocal = DRINK_CATEGORIES.has(item.category) && isTeaOrCoffeeFileName(currentLocalFile);
    const hasChaiPlaceholder =
      DRINK_CATEGORIES.has(item.category) &&
      !!item.image &&
      (item.image === IMG_CHAI || item.image.includes('photo-1648192312898-838f9b322f47'));

    // Categories with dedicated uploaded photos; ensure each item uses its own.
    if (
      item.category === 'Thali' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'From Tawa' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Hot Beverage' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Shakes' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Cold Drinks' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Soup' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Sides' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Bites' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Himalayan Delicacy' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Main Course' &&
      /^chicken\b/i.test(item.name) &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    if (
      item.category === 'Biryani' &&
      matchingLocal &&
      expectedLocalFile &&
      (currentLocalFile?.toLowerCase() ?? '') !== expectedLocalFile.toLowerCase()
    ) {
      return { ...item, image: matchingLocal };
    }

    const hasPlaceholderImage =
      !item.image ||
      item.image.includes('source.unsplash.com') ||
      item.image === DEFAULT_FOOD_IMG ||
      item.image === DEFAULT_DRINK_IMG ||
      item.image === getDefaultImage(item.category) ||
      item.image.includes('/assets/images/common.jpg') ||
      hasLocalCommon ||
      hasBrokenLocal ||
      hasChaiPlaceholder ||
      hasTeaOrCoffeeLocal;

    if (!hasPlaceholderImage) return item;

    // If a local uploaded image exists for this item name, always prefer it over
    // placeholders and broken/incorrect local URLs.
    if (matchingLocal) return { ...item, image: matchingLocal };

    // If a drink somehow has a tea/coffee photo, force it to common.jpg.
    if (DRINK_CATEGORIES.has(item.category)) return { ...item, image: LOCAL_COMMON_DRINK_IMAGE };

    return { ...item, image: getAutoImageUrl(item.name, item.category) };
  });

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? migrateMenuImages(JSON.parse(stored)) : defaultMenuItems;
    } catch {
      return defaultMenuItems;
    }
  });

  // Ensure any previously saved placeholder/broken image URLs are upgraded
  // and persisted even if state was already initialized.
  useEffect(() => {
    const migrated = migrateMenuImages(menuItems);
    const changed = migrated.some((m, idx) => m.image !== menuItems[idx]?.image);
    if (changed) {
      setMenuItemsState(migrated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  'Hot Beverage',
  'Shakes',
  'Cold Drinks',
  'Soup',
  'Sides',
  'Bites',
  'Himalayan Delicacy',
  'Noodles',
  'Starter Veg',
  'Non-Veg',
  'Main Course',
  'Biryani',
  'Extra',
  'From Tawa',
  'Thali',
  'Rum',
  'Whiskey',
  'Vodka',
  'Breezer',
  'Beer',
  'Wine',
  'Can Beer',
  'Brandy',
];
